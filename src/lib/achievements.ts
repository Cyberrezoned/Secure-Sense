// Company-reported 2026 year-to-date achievements, as of 17 November 2026.
// Keep the reporting period fixed until the company supplies updated figures.
// Keep VAPT delivery and ISMS implementation separate from certification claims.
export const achievements = [
  {
    id: 'software',
    value: '4+',
    label: 'Business applications built',
    description: 'In 2026 so far, our software team has successfully built more than four functional business web applications and CRM tools.',
    href: '/contact',
    link: 'Discuss a software project',
  },
  {
    id: 'vapt',
    value: '6+',
    label: 'VAPT engagements completed',
    description: 'In 2026 so far, our engineers have completed more than six vulnerability assessment and penetration testing engagements.',
    href: '/cybersecurity#delivery',
    link: 'Explore our security work',
  },
  {
    id: 'isms',
    value: 'ISMS',
    label: 'ISO/IEC 27001 implementation',
    description: 'In 2026 so far, our engineers have completed information security management system setups to support ISO/IEC 27001 readiness.',
    href: '/cybersecurity#security-scope',
    link: 'Explore compliance engineering',
  },
] as const;
