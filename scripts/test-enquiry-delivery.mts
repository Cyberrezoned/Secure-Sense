import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';

// Execute the production modules with an in-memory Resend replacement. These
// checks never instantiate the real provider or send mail.
const require = createRequire(import.meta.url);
const root = new URL('../', import.meta.url);
type Environment = Record<string, string | undefined>;
type StubModules = Record<string, unknown>;

function loadModule(path: string, env: Environment, stubs: StubModules = {}, logs: unknown[][] = []) {
  const filename = fileURLToPath(new URL(path, root));
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
    fileName: filename,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });
  const module = { exports: {} as Record<string, any> };
  const run = vm.runInNewContext(`(function(exports, require, module) { ${outputText}\n})`, {
    process: { env },
    console: { log: (...args: unknown[]) => logs.push(args), error: (...args: unknown[]) => logs.push(args) },
    URL,
  }, { filename });
  run(module.exports, (id: string) => Object.hasOwn(stubs, id) ? stubs[id] : require(id), module);
  return module.exports;
}

function fixture(env: Environment = {}) {
  const payloads: any[] = [];
  const logs: unknown[][] = [];
  const analysisInputs: unknown[] = [];
  let response: any = { data: { id: 'accepted-test-message' }, error: null };
  let rejection: Error | undefined;
  class StubResend {
    constructor(key: string) { assert.equal(key, 'test-key-no-network'); }
    emails = {
      send: async (payload: unknown) => {
        payloads.push(payload);
        if (rejection) throw rejection;
        return response;
      },
    };
  }
  const contact = loadModule('src/lib/contact.ts', env);
  const resend = loadModule('src/lib/resend.ts', env, { resend: { Resend: StubResend } });
  const email = loadModule('src/emails/PricingRequestEmail.tsx', env);
  const actions = loadModule('src/lib/actions.ts', env, {
    '@/lib/contact': contact,
    '@/lib/resend': resend,
    '@/emails/PricingRequestEmail': email,
    '@/ai/flows/analyze-article-flow': {
      analyzeArticle: async (input: unknown) => {
        analysisInputs.push(input);
        return { summary: 'Analysis fixture' };
      },
    },
  }, logs);
  return {
    actions, resend, payloads, logs, analysisInputs,
    setResponse: (value: unknown) => { response = value; },
    setRejection: (value: Error) => { rejection = value; },
  };
}

function validForm() {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    companyName: 'Example Company', contactName: 'Test Visitor',
    email: 'visitor@example.com', phone: '+1234567890', industry: 'Technology',
    employees: '11-50', timeline: 'This quarter', message: 'A security review enquiry.',
  })) form.set(key, value);
  form.append('services', 'Security review');
  form.append('services', 'Training');
  return form;
}

const env = {
  RESEND_API_KEY: 'test-key-no-network',
  ADMIN_EMAIL: 'stale-admin@example.com', NOTIFY_TO: 'stale-notify@example.com',
  RESEND_FROM: 'verified-sender@example.com', EMAIL_FROM: 'legacy-sender@example.com',
};
const accepted = fixture(env);
const success = await accepted.actions.requestPricing(null, validForm());
assert.ok(success.success);
assert.equal(accepted.payloads.length, 1);
assert.equal(accepted.payloads[0].to, 'admin@zeenthecyber.online');
assert.equal(accepted.payloads[0].from, env.RESEND_FROM);
assert.equal(accepted.payloads[0].headers['Reply-To'], 'visitor@example.com');
assert.equal(accepted.payloads[0].react.props.services, 'Security review, Training');
assert.equal(accepted.payloads[0].html, undefined);
assert.equal(accepted.logs.length, 0, 'Successful enquiries must not log visitor data');

const legacySender = fixture({ RESEND_API_KEY: env.RESEND_API_KEY, EMAIL_FROM: env.EMAIL_FROM });
await legacySender.actions.requestPricing(null, validForm());
assert.equal(legacySender.payloads[0].from, env.EMAIL_FROM);
assert.equal(legacySender.payloads[0].to, 'admin@zeenthecyber.online');

const defaultSender = fixture({ RESEND_API_KEY: env.RESEND_API_KEY });
await defaultSender.actions.requestPricing(null, validForm());
assert.equal(defaultSender.payloads[0].from, 'no-reply@zeenthecyber.online');

const unsafeForm = validForm();
unsafeForm.set('companyName', '<img src=x onerror="alert(1)">');
unsafeForm.set('message', '<script>alert("visitor text")</script>');
await accepted.actions.requestPricing(null, unsafeForm);
const html = renderToStaticMarkup(accepted.payloads[1].react);
assert.ok(html.includes('&lt;img'));
assert.ok(html.includes('&lt;script&gt;'));
assert.ok(!html.includes('<script>'));
assert.ok(!html.includes('<img src=x'));

const invalidForm = validForm();
invalidForm.set('email', 'invalid');
invalidForm.delete('services');
const invalid = fixture(env);
const validation = await invalid.actions.requestPricing(null, invalidForm);
assert.ok(validation.error);
assert.ok(validation.fieldErrors.email);
assert.ok(validation.fieldErrors.services);
assert.equal(invalid.payloads.length, 0);

for (const providerResponse of [
  { data: null, error: { name: 'validation_error', message: 'Provider rejection' } },
  { data: null, error: null },
]) {
  const rejected = fixture(env);
  rejected.setResponse(providerResponse);
  const result = await rejected.actions.requestPricing(null, validForm());
  assert.ok(result.error.includes('admin@zeenthecyber.online'));
  assert.equal(result.success, undefined);
}

const transportFailure = fixture(env);
transportFailure.setRejection(new Error('Transport failure containing sensitive details'));
const failed = await transportFailure.actions.requestPricing(null, validForm());
assert.ok(failed.error);
assert.equal(failed.success, undefined);
assert.ok(!JSON.stringify(transportFailure.logs).includes('sensitive details'));

const unconfigured = fixture({ ADMIN_EMAIL: 'stale-admin@example.com' });
const unavailable = await unconfigured.actions.requestPricing(null, validForm());
assert.ok(unavailable.error.includes('admin@zeenthecyber.online'));
assert.equal(unavailable.success, undefined);
assert.equal(unconfigured.payloads.length, 0);
await assert.rejects(() => unconfigured.resend.sendResendEmail({
  from: 'sender@example.com', to: 'admin@zeenthecyber.online', subject: 'Test', html: 'Test',
}), /RESEND_API_KEY not configured/);

const shortContent = new FormData();
shortContent.set('content', 'Too short');
assert.ok((await accepted.actions.analyzeContent(null, shortContent)).error);
assert.equal(accepted.analysisInputs.length, 0);
shortContent.set('content', 'An article to analyze. '.repeat(5));
assert.ok((await accepted.actions.analyzeContent(null, shortContent)).result);
assert.equal(accepted.analysisInputs.length, 1);

const contact = loadModule('src/lib/contact.ts', {});
const call = new URL(contact.CALL_HREF);
assert.equal(call.origin, 'https://wa.me');
assert.equal(call.pathname, '/2348144036429');
assert.match(call.searchParams.get('text') || '', /arrange a call/);
const draft = new URL(contact.emailHref('Security & Studio enquiry', 'Name: Ada\nEnquiry: café + audit?'));
assert.equal(draft.pathname, 'admin@zeenthecyber.online');
assert.equal(draft.searchParams.get('subject'), 'Security & Studio enquiry');
assert.equal(draft.searchParams.get('body'), 'Name: Ada\nEnquiry: café + audit?');
for (const invalid of [undefined, '', 'admin@zeenthecyber.online', 'javascript:alert(1)', 'https://example.com/abc-defg-hij', 'https://meet.google.com/admin@zeenthecyber.online', 'https://user@meet.google.com/abc-defg-hij']) {
  assert.equal(contact.googleMeetHref(invalid), null);
}
assert.equal(contact.googleMeetHref(' https://meet.google.com/abc-defg-hij/?authuser=0 '), 'https://meet.google.com/abc-defg-hij');
const withRoom = loadModule('src/lib/contact.ts', { NEXT_PUBLIC_GOOGLE_MEET_URL: 'https://meet.google.com/abc-defg-hij' });
assert.equal(withRoom.CALL_HREF, 'https://meet.google.com/abc-defg-hij');

console.log('Enquiry checks passed: recipient, sender, reply-to, escaping, validation, provider failures, contact links, Meet fallback and analysis API. No emails sent.');
