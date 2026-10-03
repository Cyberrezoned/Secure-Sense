import { authorizeSignalDesk, ipMatches, parseBasicAuth, timingSafeEqual } from '../src/lib/signal-desk/access';

let pass = 0;
let fail = 0;

function check(label: string, actual: unknown, expected: unknown) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) { pass += 1; } else { fail += 1; console.log(`  FAIL ${label}: got ${JSON.stringify(actual)} want ${JSON.stringify(expected)}`); }
}

const basic = (u: string, p: string) => `Basic ${Buffer.from(`${u}:${p}`).toString('base64')}`;

const enabled = {
  SIGNAL_DESK_ENABLED: 'true',
  SIGNAL_DESK_USER: 'soc-lead',
  SIGNAL_DESK_PASSWORD: 'correct-horse-battery',
};

console.log('--- kill switch ---');
check('disabled -> 404', (await authorizeSignalDesk({ env: {}, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: '10.0.0.1' })).outcome, 'not-found');
check('flag not exactly true -> 404', (await authorizeSignalDesk({ env: { ...enabled, SIGNAL_DESK_ENABLED: '1' }, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: null })).outcome, 'not-found');

console.log('--- credentials ---');
check('valid creds -> allow', (await authorizeSignalDesk({ env: enabled, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: null })).outcome, 'allow');
check('no header -> 401', (await authorizeSignalDesk({ env: enabled, authorization: null, clientIp: null })).outcome, 'unauthorized');
check('wrong password -> 401', (await authorizeSignalDesk({ env: enabled, authorization: basic('soc-lead', 'nope'), clientIp: null })).outcome, 'unauthorized');
check('wrong user -> 401', (await authorizeSignalDesk({ env: enabled, authorization: basic('intruder', 'correct-horse-battery'), clientIp: null })).outcome, 'unauthorized');
check('empty password rejected', (await authorizeSignalDesk({ env: enabled, authorization: basic('soc-lead', ''), clientIp: null })).outcome, 'unauthorized');
check('enabled but unconfigured -> forbidden (fails closed)', (await authorizeSignalDesk({ env: { SIGNAL_DESK_ENABLED: 'true' }, authorization: basic('a', 'b'), clientIp: null })).outcome, 'forbidden');
check('password in username field rejected', (await authorizeSignalDesk({ env: enabled, authorization: basic('soc-lead:correct-horse-battery', ''), clientIp: null })).outcome, 'unauthorized');

console.log('--- ip allowlist ---');
const withAllow = { ...enabled, SIGNAL_DESK_ALLOWED_IPS: '203.0.113.0/24, 10.8.0.5' };
check('in cidr -> allow', (await authorizeSignalDesk({ env: withAllow, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: '203.0.113.42' })).outcome, 'allow');
check('outside cidr -> forbidden', (await authorizeSignalDesk({ env: withAllow, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: '198.51.100.7' })).outcome, 'forbidden');
check('exact ip -> allow', (await authorizeSignalDesk({ env: withAllow, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: '10.8.0.5' })).outcome, 'allow');
check('allowlist set but ip unknown -> forbidden', (await authorizeSignalDesk({ env: withAllow, authorization: basic('soc-lead', 'correct-horse-battery'), clientIp: null })).outcome, 'forbidden');
check('allowlist passes but creds wrong -> 401', (await authorizeSignalDesk({ env: withAllow, authorization: basic('soc-lead', 'bad'), clientIp: '203.0.113.9' })).outcome, 'unauthorized');

console.log('--- ipMatches ---');
check('/32 exact', ipMatches('192.168.1.10', '192.168.1.10'), true);
check('/32 differing', ipMatches('192.168.1.11', '192.168.1.10'), false);
check('/16 inside', ipMatches('172.16.99.4', '172.16.0.0/16'), true);
check('/16 outside', ipMatches('172.17.0.1', '172.16.0.0/16'), false);
check('/0 matches all v4', ipMatches('8.8.8.8', '0.0.0.0/0'), true);
check('/20 boundary inside', ipMatches('10.1.15.255', '10.1.0.0/20'), true);
check('/20 boundary outside', ipMatches('10.1.16.0', '10.1.0.0/20'), false);
check('ipv6 exact', ipMatches('2001:db8::1', '2001:db8::1'), true);
check('ipv6 /32 inside', ipMatches('2001:db8:dead:beef::9', '2001:db8::/32'), true);
check('ipv6 /32 outside', ipMatches('2001:db9::1', '2001:db8::/32'), false);
check('v4-mapped v6 vs v4 rule', ipMatches('::ffff:203.0.113.5', '203.0.113.0/24'), true);
check('v4 vs v6 rule mismatch', ipMatches('203.0.113.5', '2001:db8::/32'), false);
check('garbage rule', ipMatches('10.0.0.1', 'not-an-ip'), false);
check('bad prefix', ipMatches('10.0.0.1', '10.0.0.0/99'), false);
check('malformed octet', ipMatches('10.0.0.300', '10.0.0.0/8'), false);

console.log('--- parseBasicAuth ---');
check('decodes', parseBasicAuth(basic('u', 'p:with:colons')), { user: 'u', password: 'p:with:colons' });
check('case-insensitive scheme', parseBasicAuth(basic('u', 'p').replace('Basic', 'basic')), { user: 'u', password: 'p' });
check('bearer rejected', parseBasicAuth('Bearer abc'), null);
check('null rejected', parseBasicAuth(null), null);
check('non-base64 rejected', parseBasicAuth('Basic !!!!'), null);

console.log('--- timingSafeEqual ---');
check('equal', await timingSafeEqual('abc', 'abc'), true);
check('unequal', await timingSafeEqual('abc', 'abd'), false);
check('different lengths', await timingSafeEqual('abc', 'abcdef'), false);
check('empty equal', await timingSafeEqual('', ''), true);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
