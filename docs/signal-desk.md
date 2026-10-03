# Signal Desk

Internal threat-intelligence console at `/signal-desk`. It is not part of the
public site and must never be linked from it.

## What it shows

Four panels, each backed by a public upstream feed and each failing
independently:

| Panel | Source | Contents |
| --- | --- | --- |
| KEV catalogue growth | CISA KEV | Monthly additions, ransomware-linked subset, catalogue version |
| Highest exploitation probability | FIRST EPSS | Top-scoring CVEs in the current model run |
| Newest KEV entries | CISA KEV | Most recent additions with federal remediation deadlines |
| Stack health | GitHub REST API | Stars and commit recency for the deployed open-source stack |

Headline counters additionally use NIST NVD for total CVE records and the
30-day publication mean.

## Access control

Enforced in `src/proxy.ts` for both `/signal-desk/*` and
`/api/signal-desk/*`, so the data route cannot be read directly. Three layers,
each able to deny on its own:

1. **Kill switch.** Unless `SIGNAL_DESK_ENABLED` is exactly `true`, every
   request returns `404`. The route is indistinguishable from one that was
   never deployed.
2. **Network.** If `SIGNAL_DESK_ALLOWED_IPS` is set, the client address must
   match one of its entries (bare IPv4/IPv6 addresses or CIDR ranges). A
   request whose address cannot be determined is refused.
3. **Credentials.** HTTP Basic auth against `SIGNAL_DESK_USER` and
   `SIGNAL_DESK_PASSWORD`. Both comparisons run over SHA-256 digests in
   constant time and both always execute, so a wrong username and a wrong
   password cannot be distinguished by response timing.

Enabling the desk without configuring credentials returns `403`. It fails
closed by design — there is no unauthenticated path to the data.

Responses carry `x-robots-tag: noindex, nofollow, noarchive` and
`cache-control: no-store`. The route is excluded from `sitemap.ts` and
disallowed in `robots.txt`, though those are courtesy measures; the proxy is
the control that matters.

### Configuration

```bash
SIGNAL_DESK_ENABLED=true
SIGNAL_DESK_USER=soc-lead
SIGNAL_DESK_PASSWORD=<generated, stored in the password manager>
# optional
SIGNAL_DESK_ALLOWED_IPS=203.0.113.0/24,10.8.0.5
```

Leave `SIGNAL_DESK_ENABLED` unset in preview and public environments.

### Tests

```bash
npm run test:access
```

38 cases covering the kill switch, credential handling, the allowlist, CIDR
matching (including IPv6 and v4-mapped addresses), header parsing, and the
constant-time comparison.

## Data integrity

Every loader in `src/lib/intel/` returns a `FeedResult`, a discriminated union
of success and failure. Callers must branch on `ok` before reading `data`, so
"the feed is down" can never be rendered as a zero or an invented figure. When
a feed fails, the UI names the upstream and links to it.

Two deliberate presentation choices:

- **EPSS** saturates at `0.99999`. That is displayed as `>99.9%`, not `100%`,
  because the model does not assert certainty.
- **KEV deadlines** are reported as "entries due within 7 days", not as a count
  of all past-due entries. Nearly every historical entry is past its deadline,
  so the latter is noise.

## Caching

The KEV catalogue is ~2.4MB, above the 2MB Next data-cache ceiling. The raw
response is therefore fetched with `no-store` and the *derived summary* is
wrapped in `unstable_cache` for one hour. That keeps the large transfer to at
most once per hour regardless of how many panels read it.

The desk itself is `force-dynamic` and polls `/api/signal-desk/feed` every 120
seconds through SWR.
