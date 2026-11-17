import { parseBasicAuth, timingSafeEqual, type AccessDecision } from '@/lib/signal-desk/access';

export const ADMIN_REALM = 'SuleZeen Document Admin';

export async function authorizeAdmin(env: Record<string, string | undefined>, authorization: string | null): Promise<AccessDecision> {
  // Never expose an admin screen before its owner explicitly enables it.
  if (env.DOCUMENT_ADMIN_ENABLED !== 'true') return { outcome: 'not-found' };
  const user = env.DOCUMENT_ADMIN_USER?.trim();
  const password = env.DOCUMENT_ADMIN_PASSWORD;
  if (!user || user.includes(':') || !password || password.trim().length < 24) {
    return { outcome: 'forbidden', reason: 'Document admin credentials are missing or too short' };
  }
  const presented = parseBasicAuth(authorization);
  if (!presented) return { outcome: 'unauthorized', reason: 'credentials required' };
  const [userOk, passwordOk] = await Promise.all([
    timingSafeEqual(presented.user, user), timingSafeEqual(presented.password, password),
  ]);
  return userOk && passwordOk ? { outcome: 'allow' } : { outcome: 'unauthorized', reason: 'invalid credentials' };
}
