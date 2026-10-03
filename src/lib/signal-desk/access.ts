/**
 * Access control for the Signal Desk.
 *
 * The desk is an internal operations surface, not a marketing page. It is
 * gated in three independent layers, each of which can deny on its own:
 *
 *   1. Kill switch  - absent SIGNAL_DESK_ENABLED, the route does not exist.
 *   2. Network      - optional CIDR/IP allowlist for office or VPN egress.
 *   3. Credentials  - HTTP Basic auth compared in constant time.
 *
 * Everything runs in the edge middleware, so an unauthorised request never
 * reaches the page, the data loaders, or the upstream feed providers.
 */

export const SIGNAL_DESK_REALM = 'Secure Sense Signal Desk';

export type AccessDecision =
  | { outcome: 'allow' }
  | { outcome: 'not-found' }
  | { outcome: 'unauthorized'; reason: string }
  | { outcome: 'forbidden'; reason: string };

/** The desk is opt-in. Without the flag the route behaves as if it were never built. */
export function isDeskEnabled(env: Record<string, string | undefined>): boolean {
  return env.SIGNAL_DESK_ENABLED === 'true';
}

/**
 * Length-independent constant-time string comparison.
 *
 * Hashing both sides first means the comparison runs over fixed-width digests,
 * so neither the credential length nor its content leaks through timing.
 */
export async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(a)),
    crypto.subtle.digest('SHA-256', encoder.encode(b)),
  ]);

  const viewA = new Uint8Array(digestA);
  const viewB = new Uint8Array(digestB);

  let mismatch = 0;
  for (let index = 0; index < viewA.length; index += 1) {
    mismatch |= viewA[index] ^ viewB[index];
  }

  return mismatch === 0;
}

function ipToBytes(ip: string): number[] | null {
  // Checked before the IPv4 branch: the "::ffff:a.b.c.d" form proxies emit
  // contains dots, so it would otherwise be misparsed as a dotted quad.
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/i.exec(ip);
  if (mapped) return ipToBytes(mapped[1]);

  if (ip.includes('.')) {
    const parts = ip.split('.');
    if (parts.length !== 4) return null;

    const bytes = parts.map((part) => (/^\d{1,3}$/.test(part) ? Number.parseInt(part, 10) : Number.NaN));
    return bytes.every((byte) => Number.isInteger(byte) && byte >= 0 && byte <= 255) ? bytes : null;
  }

  const halves = ip.split('::');
  if (halves.length > 2) return null;

  const head = halves[0] ? halves[0].split(':') : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const fill = 8 - head.length - tail.length;
  if (fill < 0 || (halves.length === 1 && head.length !== 8)) return null;

  const groups = [...head, ...Array.from({ length: halves.length === 2 ? fill : 0 }, () => '0'), ...tail];
  if (groups.length !== 8) return null;

  const bytes: number[] = [];
  for (const group of groups) {
    const value = Number.parseInt(group || '0', 16);
    if (!Number.isInteger(value) || value < 0 || value > 0xffff) return null;
    bytes.push((value >> 8) & 0xff, value & 0xff);
  }

  return bytes;
}

/** True when `ip` falls inside `rule`, which may be a bare address or CIDR. */
export function ipMatches(ip: string, rule: string): boolean {
  const [network, prefixText] = rule.trim().split('/');
  const target = ipToBytes(ip.trim());
  const base = ipToBytes(network);
  if (!target || !base || target.length !== base.length) return false;

  const maxPrefix = base.length * 8;
  const prefix = prefixText === undefined ? maxPrefix : Number.parseInt(prefixText, 10);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > maxPrefix) return false;

  const wholeBytes = Math.floor(prefix / 8);
  for (let index = 0; index < wholeBytes; index += 1) {
    if (target[index] !== base[index]) return false;
  }

  const remainingBits = prefix % 8;
  if (remainingBits === 0) return true;

  const mask = (0xff << (8 - remainingBits)) & 0xff;
  return (target[wholeBytes] & mask) === (base[wholeBytes] & mask);
}

/** Decode a `Basic base64(user:pass)` header into its parts. */
export function parseBasicAuth(header: string | null): { user: string; password: string } | null {
  if (!header?.toLowerCase().startsWith('basic ')) return null;

  try {
    const decoded = atob(header.slice(6).trim());
    const separator = decoded.indexOf(':');
    if (separator < 0) return null;

    return { user: decoded.slice(0, separator), password: decoded.slice(separator + 1) };
  } catch {
    return null;
  }
}

export async function authorizeSignalDesk(options: {
  env: Record<string, string | undefined>;
  authorization: string | null;
  clientIp: string | null;
}): Promise<AccessDecision> {
  const { env, authorization, clientIp } = options;

  if (!isDeskEnabled(env)) {
    return { outcome: 'not-found' };
  }

  const allowlist = (env.SIGNAL_DESK_ALLOWED_IPS ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (allowlist.length > 0) {
    if (!clientIp) {
      return { outcome: 'forbidden', reason: 'client address unavailable for allowlist check' };
    }

    if (!allowlist.some((rule) => ipMatches(clientIp, rule))) {
      return { outcome: 'forbidden', reason: 'client address outside the allowlist' };
    }
  }

  const expectedUser = env.SIGNAL_DESK_USER;
  const expectedPassword = env.SIGNAL_DESK_PASSWORD;

  // Enabling the desk without credentials must not expose it. Fail closed.
  if (!expectedUser || !expectedPassword) {
    return { outcome: 'forbidden', reason: 'SIGNAL_DESK_USER and SIGNAL_DESK_PASSWORD are not configured' };
  }

  const presented = parseBasicAuth(authorization);
  if (!presented) {
    return { outcome: 'unauthorized', reason: 'credentials required' };
  }

  // Both comparisons always run, so a wrong username and a wrong password
  // cannot be told apart by response timing.
  const [userOk, passwordOk] = await Promise.all([
    timingSafeEqual(presented.user, expectedUser),
    timingSafeEqual(presented.password, expectedPassword),
  ]);

  return userOk && passwordOk
    ? { outcome: 'allow' }
    : { outcome: 'unauthorized', reason: 'invalid credentials' };
}
