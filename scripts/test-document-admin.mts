import 'next/dist/server/node-environment-baseline';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { unstable_doesMiddlewareMatch } from 'next/experimental/testing/server';
import { authorizeAdmin } from '../src/lib/admin/access';
import { blankDocument, documentSchema, invoiceTotals } from '../src/lib/admin/documents';
import { config, proxy } from '../src/proxy';

const basic = (user: string, password: string) => `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
const env = { DOCUMENT_ADMIN_ENABLED: 'true', DOCUMENT_ADMIN_USER: 'test-admin', DOCUMENT_ADMIN_PASSWORD: 'test-only-long-random-password-123456' };
const valid = basic(env.DOCUMENT_ADMIN_USER, env.DOCUMENT_ADMIN_PASSWORD);
assert.equal((await authorizeAdmin({}, valid)).outcome, 'not-found');
assert.equal((await authorizeAdmin({ ...env, DOCUMENT_ADMIN_ENABLED: 'false' }, valid)).outcome, 'not-found');
for (const override of [{ DOCUMENT_ADMIN_USER: '' }, { DOCUMENT_ADMIN_PASSWORD: '' }, { DOCUMENT_ADMIN_PASSWORD: 'short' }]) {
  assert.equal((await authorizeAdmin({ ...env, ...override }, valid)).outcome, 'forbidden');
}
for (const auth of [null, 'Bearer wrong', 'Basic !!!', basic('wrong', env.DOCUMENT_ADMIN_PASSWORD), basic(env.DOCUMENT_ADMIN_USER, 'wrong')]) {
  assert.equal((await authorizeAdmin(env, auth)).outcome, 'unauthorized');
}
assert.equal((await authorizeAdmin(env, valid)).outcome, 'allow');
assert.equal((await authorizeAdmin({ SIGNAL_DESK_ENABLED: 'true', SIGNAL_DESK_USER: env.DOCUMENT_ADMIN_USER, SIGNAL_DESK_PASSWORD: env.DOCUMENT_ADMIN_PASSWORD }, valid)).outcome, 'not-found');

const previous = Object.fromEntries(Object.keys(env).map(key => [key, process.env[key]]));
try {
  Object.assign(process.env, env);
  for (const path of ['/admin', '/admin/', '/admin/nested', '/admin?_rsc=example', '/api/admin/documents']) {
    assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url: path }), true, path);
    const denied = await proxy(new NextRequest(`https://example.test${path}`));
    assert.equal(denied.status, 401);
    assert.match(denied.headers.get('www-authenticate')!, /Basic/);
    assert.match(denied.headers.get('cache-control')!, /no-store/);
    assert.match(denied.headers.get('x-robots-tag')!, /noindex/);
    const allowed = await proxy(new NextRequest(`https://example.test${path}`, { headers: { authorization: valid } }));
    assert.equal(allowed.headers.get('x-middleware-next'), '1');
    assert.match(allowed.headers.get('cache-control')!, /no-store/);
  }
  for (const path of ['/', '/cybersecurity', '/admin-public', '/api/admin-public']) {
    assert.equal(unstable_doesMiddlewareMatch({ config, nextConfig: {}, url: path }), false, path);
  }
  delete process.env.DOCUMENT_ADMIN_PASSWORD;
  assert.equal((await proxy(new NextRequest('https://example.test/admin'))).status, 403);
  process.env.DOCUMENT_ADMIN_ENABLED = 'false';
  assert.equal((await proxy(new NextRequest('https://example.test/admin'))).status, 404);
} finally {
  for (const [key, value] of Object.entries(previous)) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
}

const draft = documentSchema.parse({ ...blankDocument(), kind: 'invoice', items: [{ description: 'A', quantity: '1', price: '0.10' }, { description: 'B', quantity: '1', price: '0.20' }] });
assert.equal(invoiceTotals(draft).total, 30);
assert.equal(invoiceTotals({ ...draft, items: [{ description: 'Fraction', quantity: '0.125', price: '1' }] }).total, 13);
const standard = { ...draft, items: [{ description: 'Service', quantity: '2.5', price: '1000' }], discount: '100', tax: '7.5', paid: '1000' };
assert.deepEqual(invoiceTotals(standard), { lines: [250000], subtotal: 250000, discount: 10000, tax: 18000, total: 258000, paid: 100000, due: 158000 });
assert.throws(() => invoiceTotals({ ...draft, discount: '1' }), /Discount/);
assert.throws(() => invoiceTotals({ ...draft, paid: '1' }), /paid/);
for (const invalid of [{ tax: '101' }, { date: '2026-02-30' }, { paid: '-1' }, { currency: 'INVALID' }, { items: [] }, { items: [{ description: '', quantity: '0', price: '1' }] }, { items: [{ description: '', quantity: '1', price: '1.001' }] }, { unexpected: 'field' }]) {
  assert.equal(documentSchema.safeParse({ ...draft, ...invalid }).success, false);
}
assert.throws(() => invoiceTotals({ ...draft, items: Array.from({ length: 100 }, () => ({ description: 'Maximum', quantity: '10000', price: '999999999.99' })) }), /supported amount/);
for (const brand of ['sulezeen', 'cyber', 'studio']) assert.equal(documentSchema.safeParse({ ...draft, brand }).success, true);
console.log('PASS: document authorization, route coverage, private response headers, validation and invoice arithmetic.');
