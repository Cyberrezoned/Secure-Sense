import { z } from 'zod';

export const documentBrands = {
  sulezeen: { name: 'SuleZeen', accent: '#0C5040', highlight: '#C5EB62', tagline: 'See where it is. Know it arrived.' },
  cyber: { name: 'ZeenTheCyber', accent: '#08233f', highlight: '#008cff', tagline: 'Secure today. Stronger tomorrow.' },
  studio: { name: 'Creative Studio', accent: '#192820', highlight: '#bdf35c', tagline: 'Create. Build a channel. Learn to earn.' },
} as const;

const short = z.string().max(300);
const money = z.string().regex(/^\d{1,9}(\.\d{1,2})?$/, 'Use an amount below 1,000,000,000 with at most two decimal places.');
const quantity = z.string().regex(/^\d{1,5}(\.\d{1,3})?$/).refine(v => Number(v) > 0 && Number(v) <= 10000, 'Quantity must be between 0.001 and 10,000.');
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0, 10) === v, 'Enter a valid date.');
export const documentSchema = z.object({
  version: z.literal(1), brand: z.enum(['sulezeen', 'cyber', 'studio']), kind: z.enum(['letter', 'invoice']),
  issuer: short, address: z.string().max(1000), email: short, phone: short, website: short,
  recipient: z.string().max(1500), reference: short, date,
  subject: short, salutation: short, body: z.string().max(20000), signatory: short, role: short,
  currency: z.enum(['NGN', 'USD', 'GBP', 'EUR']), dueDate: z.union([z.literal(''), date]),
  items: z.array(z.object({ description: z.string().max(1000), quantity, price: money }).strict()).min(1).max(100),
  discount: money, tax: z.string().regex(/^\d{1,3}(\.\d{1,2})?$/).refine(v => Number(v) <= 100, 'Tax must be between 0 and 100%.'),
  paid: money, payment: z.string().max(2000), notes: z.string().max(3000),
}).strict();
export type DocumentDraft = z.infer<typeof documentSchema>;

export function blankDocument(): DocumentDraft {
  return { version: 1, brand: 'sulezeen', kind: 'letter', issuer: '', address: '', email: 'admin@zeenthecyber.online', phone: '', website: 'www.zeenthecyber.online', recipient: '', reference: '', date: new Date().toISOString().slice(0, 10), subject: '', salutation: 'Dear Sir/Madam,', body: '', signatory: '', role: '', currency: 'NGN', dueDate: '', items: [{ description: '', quantity: '1', price: '0' }], discount: '0', tax: '0', paid: '0', payment: '', notes: '' };
}

function scaled(value: string, places: number) {
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * BigInt(10 ** places) + BigInt(fraction.padEnd(places, '0'));
}
export function invoiceTotals(draft: DocumentDraft) {
  const lines = draft.items.map(item => Number((scaled(item.price, 2) * scaled(item.quantity, 3) + BigInt(500)) / BigInt(1000)));
  const subtotal = lines.reduce((sum, line) => sum + line, 0);
  if (!Number.isSafeInteger(subtotal) || subtotal > Number.MAX_SAFE_INTEGER / 2) throw new Error('Invoice total exceeds the supported amount. Split it into separate invoices.');
  const discount = Number(scaled(draft.discount, 2));
  if (discount > subtotal) throw new Error('Discount cannot exceed the subtotal.');
  const taxable = subtotal - discount;
  const tax = Number((BigInt(taxable) * scaled(draft.tax, 2) + BigInt(5000)) / BigInt(10000));
  const total = taxable + tax;
  const paid = Number(scaled(draft.paid, 2));
  if (paid > total) throw new Error('Amount paid cannot exceed the invoice total.');
  return { lines, subtotal, discount, tax, total, paid, due: total - paid };
}
export function formatMoney(cents: number, currency: DocumentDraft['currency']) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(cents / 100);
}
