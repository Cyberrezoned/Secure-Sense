'use client';

import { useRef, useState, type CSSProperties, type ChangeEvent } from 'react';
import Image from 'next/image';
import { blankDocument, documentBrands, documentSchema, formatMoney, invoiceTotals, type DocumentDraft } from '@/lib/admin/documents';
import styles from './document-workspace.module.css';

function Field({ label, value, onChange, multiline = false, type = 'text', maxLength = 300 }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; type?: string; maxLength?: number }) {
  return <label className={styles.field}><span>{label}</span>{multiline
    ? <textarea value={value} maxLength={maxLength} onChange={e => onChange(e.target.value)} rows={4} />
    : <input type={type} value={value} maxLength={maxLength} onChange={e => onChange(e.target.value)} />}</label>;
}

type TextField = Exclude<keyof DocumentDraft, 'version' | 'brand' | 'kind' | 'currency' | 'items'>;

function DocumentLogo({ brand }: { brand: DocumentDraft['brand'] }) {
  if (brand === 'sulezeen') return <Image src="/images/brand/sulezeen-logo.png" width={1664} height={388} alt="SuleZeen" className={styles.suleLogo} unoptimized />;
  if (brand === 'cyber') return <div className={styles.cyberLogo}><Image src="/images/zeenthecyber/shield.svg" width={72} height={80} alt="" unoptimized /><span>ZeenThe<b>Cyber</b><small>SECURE TODAY. STRONGER TOMORROW.</small></span></div>;
  return <div className={styles.studioLogo}>Creative Studio<span>BY SULEZEEN</span></div>;
}

export function DocumentWorkspace() {
  const [draft, setDraft] = useState<DocumentDraft>(blankDocument);
  const [notice, setNotice] = useState('');
  const [printing, setPrinting] = useState(false);
  const paper = useRef<HTMLElement>(null);
  const upload = useRef<HTMLInputElement>(null);
  const brand = documentBrands[draft.brand];
  const parsed = documentSchema.safeParse(draft);
  let totals: ReturnType<typeof invoiceTotals> | undefined;
  let error = parsed.success ? '' : `${parsed.error.issues[0].path.join(' / ')}: ${parsed.error.issues[0].message}`;
  if (parsed.success && draft.kind === 'invoice') {
    try { totals = invoiceTotals(parsed.data); } catch (e) { error = (e as Error).message; }
  }
  const update = <K extends keyof DocumentDraft>(key: K, value: DocumentDraft[K]) => setDraft(previous => ({ ...previous, [key]: value }));
  const field = (key: TextField, label: string, multiline = false, type = 'text', maxLength = 300) => <Field key={key} label={label} value={draft[key]} onChange={value => update(key, value)} multiline={multiline} type={type} maxLength={maxLength} />;

  function saveDraft() {
    if (!parsed.success || error) { setNotice('Correct the validation error before downloading this draft.'); return; }
    const url = URL.createObjectURL(new Blob([JSON.stringify(parsed.data, null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url; link.download = `${draft.brand}-${draft.kind}-draft.json`; link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Draft downloaded. It includes the details you entered; store it privately.');
  }
  async function loadDraft(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    if (file.size > 1000000) { setNotice('Choose a document draft smaller than 1 MB.'); return; }
    try {
      const restored = documentSchema.parse(JSON.parse(await file.text()));
      if (restored.kind === 'invoice') invoiceTotals(restored);
      if (!window.confirm('Replace the current document with this saved draft?')) return;
      setDraft(restored); setNotice('Draft loaded. Review its details before exporting.');
    } catch { setNotice('This file is not a valid document draft. The current document has been kept.'); }
  }
  async function printDocument() {
    if (error) return;
    if (!draft.issuer.trim()) { setNotice('Enter the legal issuer or sender name before exporting.'); return; }
    if (draft.kind === 'invoice' && (!draft.recipient.trim() || !draft.reference.trim() || !draft.dueDate || draft.items.some(item => !item.description.trim()))) {
      setNotice('An invoice needs a customer, reference, due date and a description for every item.'); return;
    }
    if (draft.kind === 'invoice' && draft.dueDate < draft.date) { setNotice('The due date cannot be before the issue date.'); return; }
    setPrinting(true); setNotice('');
    try {
      await document.fonts.ready;
      await Promise.all(Array.from(paper.current?.querySelectorAll('img') ?? []).map(img => img.decode()));
      const previousTitle = document.title;
      document.title = `${brand.name} - ${draft.kind === 'invoice' ? 'Invoice' : 'Letter'} - ${draft.reference || draft.date}`;
      window.addEventListener('afterprint', () => { document.title = previousTitle; }, { once: true });
      window.print();
    } catch { setNotice('A document asset could not load. Refresh and try exporting again.'); }
    finally { setPrinting(false); }
  }

  return <div className={styles.workspace}>
    <header className={styles.toolbar}><div><span className={styles.private}>PRIVATE / DOCUMENT WORKSPACE</span><h1>Make it official.</h1><p>Letterheads and invoices, in each brand’s own identity.</p></div><div className={styles.actions}>
      <button onClick={() => { if (window.confirm('Clear this document and start again? Download it first if you want to keep it.')) { setDraft(blankDocument()); setNotice('New document started.'); } }}>New document</button>
      <button onClick={saveDraft}>Download draft</button><button onClick={() => upload.current?.click()}>Load draft</button>
      <input ref={upload} type="file" accept=".json,application/json" onChange={loadDraft} hidden />
      <button className={styles.primary} disabled={Boolean(error) || printing} onClick={printDocument}>{printing ? 'Preparing…' : 'Print / Save as PDF'}</button>
    </div></header>
    <div className={styles.help}>Choose “Save as PDF” in the print dialog. Use A4 and turn off browser headers and footers. Changes are not automatically saved; download a draft before leaving.</div>
    {(notice || error) && <p role="status" className={styles.notice}>{error || notice}</p>}
    <div className={styles.columns}>
      <aside className={styles.editor} aria-label="Document editor">
        <section><h2>01 / Document</h2><label className={styles.field}><span>Brand</span><select value={draft.brand} onChange={e => update('brand', e.target.value as DocumentDraft['brand'])}>{Object.entries(documentBrands).map(([key, item]) => <option key={key} value={key}>{item.name}</option>)}</select></label>
          <label className={styles.field}><span>Document type</span><select value={draft.kind} onChange={e => update('kind', e.target.value as DocumentDraft['kind'])}><option value="letter">Letterhead</option><option value="invoice">Invoice</option></select></label>
          {field('reference', draft.kind === 'invoice' ? 'Invoice number (unique reference)' : 'Reference (optional)')}{field('date', 'Issue date', false, 'date')}
        </section>
        <section><h2>02 / Sender</h2>{field('issuer', 'Legal issuer / sender name')}{field('address', 'Business address', true, 'text', 1000)}{field('email', 'Email')}{field('phone', 'Phone')}{field('website', 'Website')}</section>
        <section><h2>03 / Recipient</h2>{field('recipient', draft.kind === 'invoice' ? 'Bill to: name and address' : 'Recipient name and address', true, 'text', 1500)}</section>
        {draft.kind === 'letter' ? <section><h2>04 / Letter</h2>{field('subject', 'Subject')}{field('salutation', 'Greeting')}{field('body', 'Letter body (leave blank for a blank letterhead)', true, 'text', 20000)}{field('signatory', 'Signatory name')}{field('role', 'Signatory role')}</section> : <>
          <section><h2>04 / Invoice items</h2><label className={styles.field}><span>Currency</span><select value={draft.currency} onChange={e => update('currency', e.target.value as DocumentDraft['currency'])}>{['NGN','USD','GBP','EUR'].map(value => <option key={value}>{value}</option>)}</select></label>{field('dueDate', 'Due date', false, 'date')}
            {draft.items.map((item, index) => <fieldset className={styles.item} key={index}><legend>Item {index + 1}</legend>{(['description', 'quantity', 'price'] as const).map(key => <Field key={key} label={key === 'price' ? 'Unit price (before tax)' : key === 'quantity' ? 'Quantity' : 'Description'} value={item[key]} maxLength={key === 'description' ? 1000 : 15} onChange={value => update('items', draft.items.map((row, i) => i === index ? { ...row, [key]: value } : row))} />)}<button disabled={draft.items.length === 1} onClick={() => update('items', draft.items.filter((_, i) => i !== index))}>Remove item {index + 1}</button></fieldset>)}
            <button disabled={draft.items.length >= 100} onClick={() => update('items', [...draft.items, { description: '', quantity: '1', price: '0' }])}>+ Add item</button>
          </section>
          <section><h2>05 / Totals &amp; payment</h2>{field('discount', 'Discount amount (before tax)')}{field('tax', 'Tax rate % (applied after discount)')}{field('paid', 'Amount already paid')}{field('payment', 'Payment instructions / bank details', true, 'text', 2000)}{field('notes', 'Terms and notes', true, 'text', 3000)}<p className={styles.hint}>Choose the tax rate applicable to this invoice. No rate is assumed. Invoice references are assigned manually.</p></section>
        </>}
      </aside>
      <div className={styles.preview}><p className={styles.previewLabel}>LIVE PREVIEW / A4 DOCUMENT</p>
        <article ref={paper} className={`${styles.paper} ${draft.brand === 'sulezeen' ? styles.sulePaper : ''}`} style={{ '--document-accent': brand.accent, '--document-highlight': brand.highlight } as CSSProperties} aria-label="Document preview">
          <header className={styles.letterhead}><DocumentLogo brand={draft.brand} /><div className={styles.sender}><strong>{draft.issuer || 'Sender / legal issuer'}</strong><div>{draft.address}</div><div>{[draft.email, draft.phone].filter(Boolean).join(' · ')}</div><div>{draft.website}</div></div></header>
          <div className={styles.meta}><span>{draft.kind === 'invoice' ? 'INVOICE' : brand.tagline}</span><span>{draft.reference && `${draft.reference} · `}{draft.date}</span></div>
          {draft.kind === 'letter' ? <div className={styles.letter}>
            {draft.recipient && <p className={styles.recipient}>{draft.recipient}</p>}{draft.subject && <h2>{draft.subject}</h2>}
            {draft.body && <><p>{draft.salutation}</p><div className={styles.body}>{draft.body}</div></>}
            {draft.signatory && <div className={styles.signature}><strong>{draft.signatory}</strong><div>{draft.role}</div></div>}
          </div> : <div className={styles.invoice}>
            <div className={styles.billing}><div><small>BILL TO</small><p>{draft.recipient || 'Customer name and address'}</p></div><div><small>DUE DATE</small><p>{draft.dueDate || '—'}</p><small>CURRENCY</small><p>{draft.currency}</p></div></div>
            <table><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>{draft.items.map((item, index) => <tr key={index}><td>{item.description || 'Item description'}</td><td>{item.quantity}</td><td>{parsed.success ? formatMoney(Number(item.price) * 100, draft.currency) : '—'}</td><td>{totals ? formatMoney(totals.lines[index], draft.currency) : '—'}</td></tr>)}</tbody></table>
            {totals ? <dl className={styles.totals}>{[['Subtotal', totals.subtotal], ['Discount', -totals.discount], [`Tax (${draft.tax}%)`, totals.tax], ['Total', totals.total], ['Amount paid', totals.paid], ['Balance due', totals.due]].map(([label, amount]) => <div key={label}><dt>{label}</dt><dd>{formatMoney(Number(amount), draft.currency)}</dd></div>)}</dl> : <p>Correct the highlighted values to calculate totals.</p>}
            {draft.payment && <section className={styles.payment}><h3>Payment instructions</h3><p>{draft.payment}</p></section>}{draft.notes && <section className={styles.payment}><h3>Terms &amp; notes</h3><p>{draft.notes}</p></section>}
          </div>}
          <footer className={styles.documentFooter}><span>{brand.name}</span><span>{brand.tagline}</span></footer>
        </article>
      </div>
    </div>
  </div>;
}
