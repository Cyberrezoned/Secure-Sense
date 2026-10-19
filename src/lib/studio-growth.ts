export const earningPaths = [
  {
    id: 'creator-services', name: 'Content services & UGC', category: 'Sell a skill',
    promise: 'Make useful content for someone else’s business.',
    buyer: 'Businesses, agencies, and creators who need videos, edits, scripts, photographs, or user-generated-style product content.',
    offer: 'A defined package: for example, three edited vertical videos from client-approved footage, with one revision round.',
    needs: 'A skill you can demonstrate, a small portfolio, clear deliverables, usage permissions, and a reliable delivery process. A large personal following is not the product here.',
    steps: ['Create three original samples for one kind of customer. Label unpaid practice work clearly.', 'Write a package with scope, turnaround, revision limits, and usage rights.', 'Identify relevant businesses and send a personalised introduction with a useful sample.', 'Agree the work and payment terms before delivery; ask for feedback after the project.'],
    channel: 'Use your channel as a living portfolio: show your process, explain a creative decision, and direct interested clients to your offer.',
    watch: 'Do not present practice work as a real client campaign. Separate content-production fees from rights to use it in advertising.',
    help: 'Portfolio review, production practice, offer packaging, and outreach preparation.',
  },
  {
    id: 'social-management', name: 'Social media management', category: 'Build a client service',
    promise: 'Help a business plan, publish, and look after its online presence.',
    buyer: 'Businesses or organisations that need a repeatable content and community workflow.',
    offer: 'A monthly service with agreed channels, content volume, approval steps, reporting, and response boundaries.',
    needs: 'Planning and copy skills, scheduling-tool practice, account-permission discipline, and a way to report useful outcomes.',
    steps: ['Choose one business type and audit a public page without requesting account access.', 'Build a sample two-week calendar and a reporting template.', 'Define the scope: production, publishing, community responses, and escalation.', 'Propose a limited pilot, then review effort and results before discussing ongoing work.'],
    channel: 'Publish practical breakdowns and sample calendars so potential clients can see how you think and work.',
    watch: 'Use role-based account access and approvals. Agree who handles complaints, sensitive messages, and paid advertising.',
    help: 'Calendar development, management-tool training, client onboarding, and reporting practice.',
  },
  {
    id: 'digital-products', name: 'Digital products & teaching', category: 'Package useful knowledge',
    promise: 'Turn a problem you can solve into something people can buy and use.',
    buyer: 'People who need a specific template, guide, resource, workshop, or learning outcome.',
    offer: 'A focused product such as a content-calendar template with instructions, or a workshop teaching a skill you can demonstrate.',
    needs: 'A real audience need, useful original material, a clear product description, delivery arrangements, and customer support.',
    steps: ['Speak with potential users and identify one recurring problem.', 'Make a small sample and test whether people can use it.', 'Describe exactly what the buyer receives, the price, delivery, and support terms.', 'Launch a small version and improve it using customer questions and feedback.'],
    channel: 'Teach useful parts of the problem publicly and explain where the paid resource provides additional help.',
    watch: 'Use material you own or have permission to sell. Avoid promising expertise, certificates, or outcomes you cannot support.',
    help: 'Product scoping, instructional content, launch content, and feedback-led improvement.',
  },
  {
    id: 'brand-partnerships', name: 'Sponsorships & brand deals', category: 'Work with relevant brands',
    promise: 'Connect a relevant brand with an audience that trusts your work.',
    buyer: 'Brands whose products and audience fit your channel and editorial standards.',
    offer: 'An agreed integration, sponsored explainer, or campaign with specific deliverables and usage terms.',
    needs: 'A consistent body of work, genuine audience information, a media kit, and clear brand-fit criteria.',
    steps: ['Build a channel with a clear audience and collect real performance evidence.', 'Prepare a media kit using your own current analytics and examples.', 'Identify relevant partners and propose a specific audience-led idea.', 'Agree scope, fee, rights, disclosure, reporting, and payment terms before production.'],
    channel: 'A focused channel helps a partner assess audience fit. Use real analytics rather than purchased followers or invented reach.',
    watch: 'Disclose paid relationships clearly and check that the offer and sender are genuine. Never promise a brand a guaranteed result.',
    help: 'Media-kit preparation, brand-fit assessment, proposal structure, and sponsored-content planning.',
  },
  {
    id: 'affiliate-content', name: 'Affiliate content', category: 'Earn from relevant referrals',
    promise: 'Explain useful products and earn a commission on eligible tracked actions.',
    buyer: 'An affiliate programme pays for qualifying referrals under its own terms; your audience chooses whether to act.',
    offer: 'An honest tutorial, comparison, or review with a relevant tracked link and a clear commission disclosure.',
    needs: 'A suitable programme, first-hand knowledge or well-supported research, audience trust, and an understanding of commission and payout terms.',
    steps: ['Find a product that genuinely fits a question your audience asks.', 'Check programme availability, acceptance, qualifying actions, returns, and payout terms.', 'Create original, useful content and clearly disclose the commercial relationship.', 'Track actual clicks and approved conversions, then improve the content’s usefulness.'],
    channel: 'Build searchable, useful demonstrations around audience problems. A link alone is not a content strategy.',
    watch: 'Commissions can be declined or reversed. Avoid promoting tools you cannot evaluate or hiding the relationship.',
    help: 'Audience-fit research, comparison content, disclosure practice, and a simple tracking worksheet.',
  },
  {
    id: 'channel-revenue', name: 'Channel revenue & memberships', category: 'Develop an audience asset',
    promise: 'Build original content and explore the revenue features your channel becomes eligible for.',
    buyer: 'Depending on the feature, revenue can come through platform advertising, subscription viewing, or eligible audience-support features.',
    offer: 'An original recurring series, supported by a channel promise and a sustainable publishing routine.',
    needs: 'Original content, audience value, account security, and the platform’s current country, age, policy, and eligibility requirements.',
    steps: ['Choose one audience, a clear channel promise, and three repeatable content themes.', 'Publish original episodes and review retention, returning viewers, and audience questions.', 'Check the Earn area in YouTube Studio and the official eligibility guidance.', 'Apply only when eligible; continue improving the channel while the platform reviews it.'],
    channel: 'A channel can also introduce your services or products while you work toward platform eligibility. Treat each income stream as its own offer.',
    watch: 'Reaching a numerical threshold does not guarantee approval or income. Repetitive, mass-produced, and insufficiently original content can be ineligible.',
    help: 'Channel positioning, original series development, analytics review, and monetization-readiness planning.',
  },
] as const;

export const channelSprints = [
  { weeks: 'Weeks 1–2', title: 'Choose your audience and income path', objective: 'Decide who the channel helps and why someone would watch or buy.', tasks: ['Write a one-sentence channel promise: I help [audience] achieve [outcome] through [format].', 'Research ten audience questions and review how other creators address them without copying their work.', 'Choose one primary platform, three content themes, and one earning path to test.'], deliverable: 'Channel brief, ten topic ideas, and one earning hypothesis.', review: 'Can someone describe who your channel is for after reading the brief?' },
  { weeks: 'Weeks 3–4', title: 'Set up and make your first useful series', objective: 'Build a secure channel and a small body of original work.', tasks: ['Set up the profile, channel description, enquiry route, two-step verification, and recovery options.', 'Script and produce two original anchor pieces using the equipment you already have.', 'Create titles, thumbnails or covers, captions, and one clear next step for each piece.'], deliverable: 'A complete channel profile and two ready-to-publish pieces.', review: 'Do you own or have permission to use the footage, music, visuals, and other source material?' },
  { weeks: 'Weeks 5–6', title: 'Publish, listen, and learn', objective: 'Find out which topics and formats help your intended audience.', tasks: ['Choose a publishing rhythm you can sustain and adapt each anchor piece into a supporting format.', 'Review available analytics: viewing retention, relevant interactions, and returning viewers.', 'Keep a question log. Record what viewers ask, and distinguish evidence from your assumptions.'], deliverable: 'A publishing log, a question bank, and notes on what to improve.', review: 'Which topic earned meaningful attention, and where did people lose interest?' },
  { weeks: 'Weeks 7–8', title: 'Build an offer people can understand', objective: 'Connect your content to a specific paid service, product, or partnership idea.', tasks: ['Use your chosen earning path to define the buyer, problem, deliverables, and delivery method.', 'Prepare a portfolio, useful product sample, or media kit with only genuine evidence.', 'Work out the time, direct costs, price, revision limits, and support involved.'], deliverable: 'A one-page offer and a sample that demonstrates what you can deliver.', review: 'Is it clear what the buyer receives, what it costs, and what is outside the scope?' },
  { weeks: 'Weeks 9–10', title: 'Test demand and handle enquiries', objective: 'Have real conversations about the offer and learn from the response.', tasks: ['Publish a relevant demonstration and a clear invitation to ask about your offer.', 'Approach a small set of suitable prospects with personalised messages; avoid mass unsolicited outreach.', 'Discuss needs, agree deliverables and payment terms, and document feedback whether or not a sale happens.'], deliverable: 'An enquiry log, offer feedback, and a next step for each suitable conversation.', review: 'Are people asking to buy, asking for something different, or not understanding the offer?' },
  { weeks: 'Weeks 11–12', title: 'Review the business and refine the channel', objective: 'Choose what to repeat, improve, or stop based on actual evidence.', tasks: ['Compare content effort, direct costs, enquiries, paid work, and actual receipts; separate revenue from profit.', 'Ask customers for feedback and permission before sharing their work or comments.', 'Review official platform monetization requirements and plan the next cycle around your strongest evidence.'], deliverable: 'A channel review, an updated offer, and a realistic next-month plan.', review: 'What can you repeat sustainably? A completed plan does not guarantee monetization or earnings.' },
] as const;

export function studioContactHref(pathId: string) {
  return `/contact?studioPath=${encodeURIComponent(pathId)}#engagement-form`;
}

export function studioInterest(pathId: unknown) {
  if (typeof pathId !== 'string') return undefined;
  if (pathId === 'channel-launch') return 'Channel building and a 12-week creator plan';
  if (pathId === 'youth-program') return 'Youth creator training and digital earning skills';
  return earningPaths.find(path => path.id === pathId)?.name;
}
