export const COMPANY_DESCRIPTION =
  'SuleZeen helps Nigerian agricultural marketplaces dispatch vehicles, track produce in transit and confirm handover with the buyer. Web3 and planned on-chain milestones on Base support its vision for verifiable trust.';

export const cybersecurityCommunity = {
  name: 'ZeenTheCyber',
  href: '/cybersecurity',
  description: 'ZeenTheCyber is a Nigerian cybersecurity community. Explore threat research, learn how to defend digital systems, and use practical security tools.',
} as const;

export const COMPANY_NEXT_CHAPTER =
  'SuleZeen Studio brings together content creation, social media management, AI-assisted production, and digital awareness for people building online.';

export const COMPANY_TAGLINE = 'See where it is. Know it arrived.';
export const COMPANY_TITLE = 'SuleZeen | Dispatch, Tracking and Verified Handover';

export const COMPANY_PURPOSE =
  'SuleZeen secures the infrastructure that trade runs on — and builds the digital rails that Nigerian commerce moves across.';

export const studio = {
  name: 'SuleZeen Studio',
  tagline: 'Create. Build a channel. Learn to earn.',
  description: 'Learn to create content, build a channel, and explore ways to earn online with SuleZeen Studio. Practical creator skills, AI, social media services, digital products, and online awareness for young people and emerging creators.',
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
    description: 'SuleZeen puts Web3 at the core of its agricultural trade vision: dispatch, produce tracking, and verified handover for Nigerian marketplaces, with Base as the intended network for on-chain milestones. Commodity workflows connect smallholder farmers, warehouses, merchants, and financiers through signed delivery records, electronic warehouse receipts, offtake orders, and financing coordination. The current workflow illustration uses hash-chained records; it does not demonstrate a live Base transaction. Mobile PWA and web-console access are designed for low-connectivity Nigerian environments without an app-store installation.',
  },
  {
    name: cybersecurityCommunity.name,
    href: cybersecurityCommunity.href,
    summary: 'Cybersecurity research, learning, practical tools and expertise.',
    description: 'ZeenTheCyber is SuleZeen\'s cybersecurity community, bringing together research, practical tools, learning and awareness for people building their security knowledge. Alongside these resources, SuleZeen offers penetration testing, detection and response, security engineering, and audit-readiness support across commercial, open-source, and mixed environments. Open-source options include Wazuh, Suricata and Sigma. Service hours and response commitments are agreed for each engagement.',
  },
] as const;
