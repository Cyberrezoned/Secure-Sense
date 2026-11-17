// Run after npm run build. Uses temporary test credentials only.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { createServer } from 'node:net';
import { setTimeout as delay } from 'node:timers/promises';

async function withServer(enabled, check) {
  const reservation = createServer();
  await new Promise(resolve => reservation.listen(0, '127.0.0.1', resolve));
  const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  const password = randomBytes(32).toString('hex');
  const authorization = `Basic ${Buffer.from(`http-test:${password}`).toString('base64')}`;
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], {
    windowsHide: true,
    env: { ...process.env, DOCUMENT_ADMIN_ENABLED: String(enabled), DOCUMENT_ADMIN_USER: 'http-test', DOCUMENT_ADMIN_PASSWORD: password },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { output += chunk; });
  let startupError;
  child.on('error', error => { startupError = error; });
  const url = `http://127.0.0.1:${port}`;
  try {
    let ready = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      if (startupError) throw startupError;
      if (child.exitCode !== null) throw new Error(`Test server exited: ${output}`);
      try { await fetch(`${url}/robots.txt`); ready = true; break; } catch { await delay(200); }
    }
    assert.ok(ready, 'server becomes ready');
    await check(url, authorization);
  } finally {
    if (child.exitCode === null) {
      const closed = new Promise(resolve => child.once('exit', resolve));
      child.kill();
      await closed;
    }
  }
}

await withServer(false, async (url, authorization) => {
  const response = await fetch(`${url}/admin`, { headers: { authorization } });
  assert.equal(response.status, 404);
  assert.match(response.headers.get('cache-control'), /no-store/);
});
await withServer(true, async (url, authorization) => {
  for (const path of ['/admin', '/admin?_rsc=test', '/admin/nested', '/api/admin/documents']) {
    for (const headers of [{}, { authorization: 'Basic invalid' }, { 'x-middleware-subrequest': 'src/proxy:src/proxy:src/proxy:src/proxy:src/proxy' }]) {
      const response = await fetch(`${url}${path}`, { headers });
      assert.equal(response.status, 401, path);
      assert.match(response.headers.get('cache-control'), /no-store/);
      assert.match(response.headers.get('x-robots-tag'), /noindex/);
      assert.doesNotMatch(await response.text(), /Make it official/);
    }
  }
  const response = await fetch(`${url}/admin`, { headers: { authorization } });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control'), /no-store/);
  const html = await response.text();
  for (const text of ['Make it official', 'SuleZeen', 'ZeenTheCyber', 'Creative Studio', 'Print / Save as PDF']) assert.ok(html.includes(text), text);
  assert.ok(!html.includes(authorization), 'credentials are never serialized');
  for (const asset of ['/images/brand/sulezeen-logo.png', '/images/zeenthecyber/shield.svg']) {
    assert.equal((await fetch(`${url}${asset}`)).status, 200, asset);
  }
  assert.equal((await fetch(url)).status, 200, 'public homepage remains available');
  assert.ok(!(await (await fetch(`${url}/sitemap.xml`)).text()).includes('/admin'));
});
console.log('PASS: production server blocks anonymous, invalid and bypass attempts; authorized workspace and logo assets render.');
