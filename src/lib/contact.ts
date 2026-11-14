/** Public contact destinations shared by the website and enquiry delivery. */
export const CONTACT_EMAIL = 'admin@zeenthecyber.online';
export const WHATSAPP_NUMBER = '2348144036429';
export const WHATSAPP_DISPLAY = '+234 814 403 6429';

export function emailHref(subject = 'Sule Zeen enquiry', body?: string): string {
  const fields = [`subject=${encodeURIComponent(subject)}`];
  if (body) fields.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${CONTACT_EMAIL}?${fields.join('&')}`;
}

export function whatsappHref(message = 'Hello Sule Zeen, I would like to enquire about: '): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Only an actual Google Meet room is accepted; an email address is not a room. */
export function googleMeetHref(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.hostname !== 'meet.google.com' || url.username || url.password || url.port) return null;
    if (!/^\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/.test(url.pathname)) return null;
    return `${url.origin}${url.pathname.replace(/\/$/, '')}`;
  } catch {
    return null;
  }
}

export const GOOGLE_MEET_HREF = googleMeetHref(process.env.NEXT_PUBLIC_GOOGLE_MEET_URL);
export const CONTACT_EMAIL_HREF = emailHref();
export const WHATSAPP_HREF = whatsappHref();
export const CALL_HREF = GOOGLE_MEET_HREF ?? whatsappHref('Hello Sule Zeen, I would like to arrange a call. My enquiry is about: ');
export const SECURITY_REVIEW_WHATSAPP_HREF = whatsappHref('Hello Sule Zeen, I would like a free 15-minute introductory call about a buyer security review. What the buyer needs: ');
export const SECURITY_REVIEW_EMAIL_HREF = emailHref('Security review enquiry', 'Hello Sule Zeen,\n\nI would like to discuss a buyer security review.\nWhat the buyer is asking for:\nDecision deadline:\nKnown gaps:\n\nPlease let me know a suitable time for a 15-minute introductory call.');
