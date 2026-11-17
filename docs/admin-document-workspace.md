# Private document workspace

`/admin` creates letterheads and invoices for SuleZeen, ZeenTheCyber and Creative Studio. Each template uses its own identity. It supports editable sender/recipient details, invoice line items, discounts, a manually specified tax rate, payments already received, and payment instructions. Export uses the browser's Print / Save as PDF dialog with A4 paper. Disable browser headers and footers in that dialog.

## Enable access

In the hosting project's server environment variables, set:

```text
DOCUMENT_ADMIN_ENABLED=true
DOCUMENT_ADMIN_USER=<your private admin username>
DOCUMENT_ADMIN_PASSWORD=<a unique randomly generated password, at least 24 characters>
```

Use a password manager to generate and store the password. Use ASCII characters for the username and password; the username must not contain a colon. Never prefix these variables with `NEXT_PUBLIC_`, commit real credentials, or share them through chat. On Vercel, set them for the intended environment and redeploy. For local development, use an untracked `.env.local` and restart the server.

Open `https://<your-domain>/admin` and enter these credentials in the browser authentication prompt. This is a single-operator workspace using HTTP Basic authentication over HTTPS. It has no public registration. Browsers cache Basic credentials, so use a private browser window on shared computers and close that window when finished. Rotating the server password and redeploying revokes the old credential.

The workspace defaults to disabled (404). Enabling it with missing or short credentials fails closed (403). Missing or invalid supplied credentials receive 401. Both the request proxy and the server-rendered page verify access. `/admin/*` and `/api/admin/*` are covered by the proxy; future data routes must also verify authorization in their handlers. Responses disable caching and indexing. The route is absent from public navigation and the sitemap; robots exclusions supplement authentication and are not the access boundary.

## Documents and storage

- Details stay in browser memory; refreshing or closing loses unsaved changes.
- Download draft creates a local JSON file; Load draft restores a validated file. Treat downloaded drafts and PDFs as private client documents.
- There is no cloud document database, auto-numbering, payment processing or email delivery. Assign a unique invoice number from your existing records.
- Enter the correct legal issuer, address, payment details and applicable tax rate. Selecting a brand changes artwork and colors, preserving the editable document details for review.
- Amounts support two decimal places; quantities support three. Line amounts round to the nearest currency cent; discounts apply before tax. Tax rounds once on the discounted subtotal. Overpayments and discounts exceeding the subtotal are rejected.
- The public website's light/dark mode and product branding remain separate from the white print templates.

For multiple staff members or persistent customer records, extend this with individual identity-provider accounts, MFA, server-side roles, private storage and an audit log before adding shared records.

## Verification

`npm run test:documents` exercises fail-closed access, route matching, cache/index headers, validation and invoice calculations. `npm run test:access` covers the existing internal Signal Desk gate. Run `npm run build` and `npm run typecheck` before deployment. After building, `npm run test:documents:http` checks actual production-server requests with temporary test credentials, including anonymous requests and bypass attempts.
