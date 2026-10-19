export const COMPANY_DESCRIPTION =
  'Sule Zeen is a Nigerian technology company operating across two practices: commodity supply-chain infrastructure and cybersecurity.';

export const COMPANY_NEXT_CHAPTER =
  'Sule Zeen Studio brings together content creation, social media management, AI-assisted production, and digital awareness for people building online.';

export const COMPANY_TAGLINE = 'Trade infrastructure. Cybersecurity. Built in Nigeria.';
export const COMPANY_TITLE = 'Sule Zeen | Trade Infrastructure and Cybersecurity';

export const COMPANY_PURPOSE =
  'Sule Zeen secures the infrastructure that trade runs on — and builds the digital rails that Nigerian commerce moves across.';

export const studio = {
  name: 'Sule Zeen Studio',
  tagline: 'Create. Build a channel. Learn to earn.',
  description: 'Learn to create content, build a channel, and explore ways to earn online with Sule Zeen Studio. Practical creator skills, AI, social media services, digital products, and online awareness for young people and emerging creators.',
  audience: 'For young people, emerging creators, freelancers, and small businesses turning creativity into useful skills and income opportunities.',
  formats: ['Practical tutorials', 'Content production', 'Workshops and training', 'Awareness programs'],
  series: [
    { title: 'Create with AI', description: 'Turn a brief into ideas, scripts, visuals, and edits. Learn to give useful instructions, check outputs, and keep your own voice.', example: 'From a rough idea to a publishable story.', output: 'A creative brief, script, and reviewed draft' },
    { title: 'Build for each platform', description: 'Develop YouTube videos, short-form clips, carousels, and website articles. Adapt the story, pacing, framing, and next step to the audience.', example: 'One idea. Different ways to tell it.', output: 'A video outline and a cross-platform content plan' },
    { title: 'Manage social media', description: 'Work with social media management tools to plan calendars, organise assets, schedule approved posts, respond to a community, and review performance.', example: 'Give your content a working rhythm.', output: 'A content calendar and approval workflow' },
    { title: 'Understand monetization', description: 'Explore sponsorships, services, digital products, and platform revenue. Learn to shape an offer, prepare a media kit, and assess which model fits your work.', example: 'Connect what you create to what you offer.', output: 'An offer outline and a media-kit structure' },
    { title: 'Stay informed and secure', description: 'Create and learn through cybersecurity education, information cues, scam awareness, account safety, and AI awareness, including how to question synthetic content.', example: 'Know what to trust. Know what to protect.', output: 'An awareness brief and an account-safety checklist' },
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
