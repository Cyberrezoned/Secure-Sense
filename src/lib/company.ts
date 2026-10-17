export const COMPANY_DESCRIPTION =
  'Sule Zeen is a Nigerian technology company operating across two practices: commodity supply-chain infrastructure and cybersecurity.';

export const COMPANY_NEXT_CHAPTER =
  'Through the proposed Sule Zeen Studio, we plan to turn that expertise into practical digital-safety media and learning for emerging creators and small online businesses.';

export const COMPANY_TAGLINE = 'Trade infrastructure. Cybersecurity. Built in Nigeria.';
export const COMPANY_TITLE = 'Sule Zeen | Trade Infrastructure and Cybersecurity';

export const COMPANY_PURPOSE =
  'Sule Zeen secures the infrastructure that trade runs on — and builds the digital rails that Nigerian commerce moves across.';

export const studio = {
  name: 'Sule Zeen Studio',
  status: 'In development',
  tagline: 'Digital safety for people building online.',
  description: 'A media and learning venture in development, translating cybersecurity practice into useful lessons for creators, freelancers, and small online businesses.',
  audience: 'The first programme is being designed for Nigerian creators, freelancers, and small businesses whose work depends on online accounts, customer information, and digital payments.',
  formats: ['Short demonstrations', 'Downloadable field guides', 'Creator interviews', 'Facilitated workshops'],
  series: [
    { title: 'Account ownership', description: 'Account access, recovery options, and the decisions that determine whether a creator can regain control after an incident.', example: 'Who can recover your account if you lose your phone?' },
    { title: 'The business inbox', description: 'How to examine unfamiliar partnership requests, payment instructions, and files before acting on them.', example: 'A brand deal arrives. What should you check first?' },
    { title: 'Customer information', description: 'Practical ways to decide what information a small business needs, who can access it, and when to remove it.', example: 'Your customer list is in a shared spreadsheet. Who has access?' },
  ],
} as const;

export const practices = [
  {
    name: 'Supply Chain',
    href: '/supply-chain',
    summary: 'Commodity receipts, trade coordination, and financing workflows.',
    description: 'Sule Zeen runs a digital commodity platform that connects smallholder farmers, SEC-accredited warehouses, merchants, and financiers. Farmers deposit produce at NCX-framework warehouses; each delivery is graded, operator-signed, and converted into a cryptographically verified Electronic Warehouse Receipt (e-WR). Merchants place offtake orders against those receipts, financiers underwrite the invoices, and the platform disburses advances to farmers through escrow — all recorded on a tamper-evident, hash-chained ledger. It serves six roles across a mobile PWA and web console, built for low-connectivity Nigerian environments with no blockchain or app-store dependency.',
  },
  {
    name: 'Cybersecurity',
    href: '/cybersecurity',
    summary: 'Offensive testing, detection engineering, and compliance evidence.',
    description: 'Sule Zeen delivers offensive security, managed detection and response, and audit-ready compliance on an open-source defensive stack. Services cover penetration testing and red teaming across web, API, cloud, and identity; 24/7 detection engineering built on Wazuh, Suricata, and Sigma; and compliance programmes for ISO 27001, SOC 2, PCI DSS, and NDPR — run as engineering work, not paperwork. The stack is fully open-source and independently auditable, with no licence lock-in.',
  },
] as const;
