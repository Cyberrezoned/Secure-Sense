# Claude QA brief: Sule Zeen rebrand

Independently test the current uncommitted Sule Zeen website rebrand in this workspace. Act as a QA reviewer: execute checks and report evidence-based findings. Do not rely on previous testing claims. Do not edit application source, change dependencies, commit, publish, deploy, or submit valid enquiries. Return the report in your final response; the calling process will save it.

## Expected behaviour

- Sule Zeen is the Nigerian parent company with Supply Chain and Cybersecurity practices.
- ZeenTheCyber remains a distinct cybersecurity product brand under Sule Zeen.
- The main public CTA is Book a consultation.
- Supply Chain describes farmers, SEC-accredited warehouses, NCX-framework deliveries, operator-signed and cryptographically verified e-WRs, offtake orders, invoice underwriting, escrow advances, and a tamper-evident hash-chained ledger. It mentions six roles, a mobile PWA and web console, low connectivity, and no blockchain or app-store dependency.
- Cybersecurity covers offensive security, MDR, Wazuh, Suricata, Sigma, ISO 27001, SOC 2, PCI DSS, and NDPR.
- This repository is the company website, not the operational commodity platform. Test the copy against this brief; do not certify the underlying operational claims.
- The existing canonical origin https://www.zeenthecyber.online and current contact details intentionally remain until replacements are supplied.

## Execution

Inspect applicable repository instructions, package.json, git status, starting commit, and the relevant diff. Read the new untracked source files too. Do not read .env files, credentials, authentication stores, or files outside this workspace. Do not disclose secrets or personal information.

Run these checks sequentially and record commands, exit codes, and relevant output:

1. npm run typecheck
2. npm run test:access
3. npm run build

Do not run lint or install dependencies. The existing access-control suite contains 38 assertions. The build configuration skips type validation, so the standalone typecheck is required.

After a successful build, start an owned local production server on an available port, e.g. npm run start -- --port 9013. If that port is occupied, select another; do not terminate an existing process. You may use node scripts via the Bash tool to orchestrate a temporary server, make local HTTP requests, inspect responses, and stop only the process you started. Do not create source/test files or change configuration. Clean up your owned server before completing.

Test HTTP status and rendered content for /, /supply-chain, /cybersecurity, /products, /company, /contact, /request-a-quote, /services, /platform, /solutions, /integrations, and /community. Check:

- Header/footer identity, company and practice copy, titles, social metadata, and product preservation.
- /cybersecurity and /services both render; /cybersecurity has its own metadata.
- Products links reach /platform, /integrations, and /community.
- Navigation and CTA destinations are valid. Review desktop/mobile navigation, drawer close behaviour, active states, keyboard focus, and responsive layout implementation.
- Both enquiry forms offer Commodity Supply-Chain Infrastructure and ZeenTheCyber Products; industries include Agriculture / Commodities, Warehousing / Logistics, and Trade Finance.
- Inspect form validation and submission code without submitting valid data to email/CRM services. Explicitly mark runtime submission as untested.
- /sitemap.xml includes /supply-chain, /cybersecurity, /products and excludes /signal-desk.
- /robots.txt excludes /signal-desk and /api/. Signal Desk remains absent from public navigation and should return 404 when disabled. Use synthetic access-control tests; never access real credentials.
- Check stale branding and text encoding errors in changed files.

Only claim visual or interaction verification if you actually run it in a browser. You have a restricted command/source-review tool set; if browser tools are unavailable, report that limitation rather than equating HTTP/source inspection with browser verification. Do not install or configure browser integrations. Distinguish external-feed or environment failures from application defects.

## Final report

Return Markdown with overall verdict, revision/worktree state, exact executed commands and exit codes, test counts, routes checked, and findings ordered by severity. Each finding needs evidence, expected/actual behaviour, reproduction steps, and file/line references when useful. Separate regressions, pre-existing issues, and optional improvements. Identify all untested areas and environmental blockers. End with git status and confirmation that you stopped your own server and did not alter application source.
