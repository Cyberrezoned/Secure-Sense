'use client';

import { useEffect } from 'react';
import { ComplianceChatbot } from '@/components/compliance-chatbot';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll<HTMLElement>('.skill-card, .project-card, .timeline-item');

    elements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag fade-up">// Cyber Lead · Red Team · Full-Stack Engineer · Certified Audit Network</div>
          <h1 className="fade-up delay-1">
            Victor<br />
            <span className="accent">Arinze</span><br />
            Chidiebere
          </h1>
          <p className="hero-subtitle fade-up delay-2">
            Penetration Tester &amp; Red Team Lead&nbsp; <span className="highlight">×</span> &nbsp;Python/Django Engineer<br />
            Based in <span className="highlight">Lagos, Nigeria</span> &mdash; Breaking systems, then building them better.
          </p>
          <p className="hero-subtitle fade-up delay-2">
            Purpose-built to close the systemic compliance gap with a scalable platform that automates mapping, risk, and controls for ISO 27001, NDPR, PCI-DSS, SOC 2, and critical sector mandates — backed by professional body certified auditors: <strong>CISA</strong>, <strong>CEH</strong>, and <strong>CompTIA+</strong>.
          </p>
          <div className="hero-cta fade-up delay-3">
            <a href="#projects" className="btn filled">View Work</a>
            <a href="#contact" className="btn">Get in Touch</a>
            <a href="https://github.com/Cyberrezoned" className="btn" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <div className="cert-row fade-up delay-4">
            <span className="cert-badge">ISC2 CC</span>
            <span className="cert-badge">CNSP</span>
            <span className="cert-badge">CCEP</span>
            <span className="cert-badge">CISA</span>
            <span className="cert-badge">CEH</span>
            <span className="cert-badge">CompTIA+</span>
            <span className="cert-badge">Cyber Lead @ ITSkillsCenter</span>
          </div>
        </div>
        <div className="hero-accent">PENETRATION TESTING · RED TEAM · DEVSECOPS · API SECURITY</div>
      </section>

      <section id="about">
        <div className="section-header">
          <span className="section-num">01</span>
          <h2 className="section-title">About</h2>
          <div className="section-line"></div>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              I'm Victor — Cyber Lead and Red Team Lead at <strong>ITSkillsCenter Cyber Division</strong>, Lagos. I lead a penetration testing team with a mandate to find what defenders miss.
            </p>
            <p>
              My work spans the full attack surface: web applications, APIs, cloud infrastructure (AWS, Azure, GCP), and internal network security. I map findings to <strong>CVSS v3.1</strong>, PCI-DSS v4.0, CBN Cybersecurity Framework, and NDPR 2019.
            </p>
            <p>
              I also lead a professional audit team with certified bodies in <strong>CISA</strong>, <strong>CEH</strong>, and <strong>CompTIA+</strong>, delivering assurance that combines technical red teaming with formal compliance auditing.
            </p>
            <p>
              On the engineering side, I build with Python/Django, React, and Next.js — and I bring a security-first mindset into every line of code. I'm also developing <strong>ForexEdge</strong>, an AI-powered forex trading platform.
            </p>
            <p>
              B.Eng. Petroleum Engineering — FUPRE (2025). Currently enrolled at <strong>University of the People</strong>.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-block">
              <span className="stat-num">3+</span>
              <span className="stat-label">Certs Held</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">OWASP</span>
              <span className="stat-label">Top 10 Specialist</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">NG</span>
              <span className="stat-label">Lagos, Nigeria</span>
            </div>
          </div>
        </div>
      </section>

      <section id="compliance">
        <div className="section-header">
          <span className="section-num">02</span>
          <h2 className="section-title">Compliance Platform</h2>
          <div className="section-line"></div>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p>
              We are purpose-built to address the systemic compliance gap affecting organizations across multiple industry verticals.
            </p>
            <p>
              Our platform provides a scalable compliance infrastructure that automates regulatory mapping, risk assessment, and control implementation — enabling businesses to maintain continuous compliance posture against frameworks such as <strong>ISO 27001</strong>, <strong>NDPR</strong>, <strong>PCI-DSS</strong>, <strong>SOC 2</strong>, and sector-specific mandates.
            </p>
            <p>
              With increasing regulatory pressure across fintech, healthcare, and critical infrastructure, we built a unified, technology-driven compliance layer that reduces operational overhead while ensuring audit readiness at all times.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-block">
              <span className="stat-num">Unified</span>
              <span className="stat-label">Compliance Layer</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">Automated</span>
              <span className="stat-label">Risk & Controls</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">Continuous</span>
              <span className="stat-label">Audit Readiness</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">Sector</span>
              <span className="stat-label">Fintech · Healthcare · Infrastructure</span>
            </div>
          </div>
        </div>
      </section>

      <ComplianceChatbot />

      <section id="skills">
        <div className="section-header">
          <span className="section-num">04</span>
          <h2 className="section-title">Skills</h2>
          <div className="section-line"></div>
        </div>
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-card-icon">OFFENSIVE_SEC</div>
            <h3>Penetration Testing</h3>
            <div className="skill-tags">
              <span className="tag">Burp Suite Pro</span>
              <span className="tag">Nmap</span>
              <span className="tag">Metasploit</span>
              <span className="tag">BloodHound</span>
              <span className="tag">CrackMapExec</span>
              <span className="tag">OWASP Top 10</span>
              <span className="tag">API Security</span>
              <span className="tag">CVSS v3.1</span>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-card-icon">CLOUD_SEC</div>
            <h3>Cloud & DevSecOps</h3>
            <div className="skill-tags">
              <span className="tag">AWS</span>
              <span className="tag">Azure</span>
              <span className="tag">GCP</span>
              <span className="tag">ScoutSuite</span>
              <span className="tag">Docker</span>
              <span className="tag">CI/CD Security</span>
              <span className="tag">IaC Auditing</span>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-card-icon">FULLSTACK</div>
            <h3>Web Engineering</h3>
            <div className="skill-tags">
              <span className="tag">Python</span>
              <span className="tag">Django</span>
              <span className="tag">React</span>
              <span className="tag">Next.js</span>
              <span className="tag">REST APIs</span>
              <span className="tag">GraphQL</span>
              <span className="tag">Supabase</span>
              <span className="tag">PostgreSQL</span>
            </div>
          </div>
          <div className="skill-card">
            <div className="skill-card-icon">COMPLIANCE</div>
            <h3>Frameworks & Standards</h3>
            <div className="skill-tags">
              <span className="tag">PCI-DSS v4.0</span>
              <span className="tag">CBN Framework</span>
              <span className="tag">NDPR 2019</span>
              <span className="tag">ISO 27001</span>
              <span className="tag">NIST</span>
              <span className="tag">Red Teaming</span>
              <span className="tag">Threat Modeling</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="section-header">
          <span className="section-num">05</span>
          <h2 className="section-title">Experience</h2>
          <div className="section-line"></div>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-date">2024 — Present</div>
            <div className="timeline-role">Cyber Lead / Red Team Lead</div>
            <div className="timeline-org">ITSkillsCenter Cyber Division — Lagos, NG</div>
            <ul className="timeline-desc">
              <li>Lead penetration testing engagements across web, API, cloud, and internal network environments</li>
              <li>Authored full pentest report suites: SoW, NDA, tax invoices, and post-remediation closure reports</li>
              <li>Completed Treegarx Corporation engagement (ISC-PENTEST-SOW-2026-001) — critical TLS/cipher, API key exposure, and header misconfiguration findings mapped to PCI-DSS v4.0 &amp; NDPR</li>
              <li>Manage and mentor a junior penetration testing team</li>
            </ul>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2023 — 2024</div>
            <div className="timeline-role">Full-Stack Developer / Tech Lead</div>
            <div className="timeline-org">SEQHER NGO — Nigeria &amp; Canada</div>
            <ul className="timeline-desc">
              <li>Built and deployed the SEQHER platform using Next.js and Supabase</li>
              <li>Implemented role-based access, secure auth flows, and data integrity controls</li>
              <li>Led digital transformation strategy across Nigeria and Canada operations</li>
            </ul>
          </div>
          <div className="timeline-item">
            <div className="timeline-date">2022 — 2023</div>
            <div className="timeline-role">Security Trainer / Consultant</div>
            <div className="timeline-org">Enugu State Tech Hub &amp; WIN-VIC International</div>
            <ul className="timeline-desc">
              <li>Delivered cybersecurity training programs to junior professionals</li>
              <li>Conducted network security assessments and remediation consulting</li>
              <li>Supported Tech4Dev network security curriculum delivery</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="section-header">
          <span className="section-num">06</span>
          <h2 className="section-title">Projects</h2>
          <div className="section-line"></div>
        </div>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-type">// AI · Fintech</div>
            <h3>ForexEdge</h3>
            <p>AI-powered forex trading platform with real-time SMC/ICT methodology integration for XAUUSD analysis. Built with agent-based prompting via Google Agentic App Builder and Python/MT5 backend.</p>
            <div className="project-stack">
              <span className="stack-item">Python</span>
              <span className="stack-item">MT5</span>
              <span className="stack-item">Google Agentic</span>
              <span className="stack-item">SMC/ICT</span>
              <span className="stack-item">XAUUSD</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-type">// Pentest · Enterprise</div>
            <h3>Treegarx Engagement</h3>
            <p>End-to-end penetration test of Nexus platform and API infrastructure (IIS 10.0). Delivered critical findings on TLS configuration, API key exposure, and header misconfigurations with full remediation closure.</p>
            <div className="project-stack">
              <span className="stack-item">Burp Suite Pro</span>
              <span className="stack-item">Nmap</span>
              <span className="stack-item">PCI-DSS v4.0</span>
              <span className="stack-item">NDPR</span>
              <span className="stack-item">CVSS v3.1</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-type">// NGO · Full-Stack</div>
            <h3>SEQHER Platform</h3>
            <p>Full-stack web platform for an NGO operating across Nigeria and Canada. Features secure authentication, role-based access control, and real-time data management with Supabase.</p>
            <div className="project-stack">
              <span className="stack-item">Next.js</span>
              <span className="stack-item">Supabase</span>
              <span className="stack-item">PostgreSQL</span>
              <span className="stack-item">TypeScript</span>
              <span className="stack-item">RBAC</span>
            </div>
          </div>
          <div className="project-card">
            <div className="project-type">// Tool · Security</div>
            <h3>XAU/USD Scalping Bot</h3>
            <p>Python-based algorithmic trading bot with MT5 integration and SMC/ICT framework logic. Explores automated entry/exit based on market structure analysis and liquidity sweeps.</p>
            <div className="project-stack">
              <span className="stack-item">Python</span>
              <span className="stack-item">MetaTrader 5</span>
              <span className="stack-item">SMC</span>
              <span className="stack-item">ICT</span>
              <span className="stack-item">Algo Trading</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="section-header">
          <span className="section-num">07</span>
          <h2 className="section-title">Contact</h2>
          <div className="section-line"></div>
        </div>
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>Open to penetration testing engagements, red team contracts, full-stack projects, and security consulting. Based in Lagos — working globally.</p>
            <div className="contact-links">
              <a href="mailto:zenethecyber@icloud.com" className="contact-link">
                <span className="link-label">Email</span>
                zenethecyber@icloud.com
              </a>
              <a href="https://github.com/Cyberrezoned" className="contact-link" target="_blank" rel="noreferrer">
                <span className="link-label">GitHub</span>
                github.com/Cyberrezoned
              </a>
              <a href="#" className="contact-link">
                <span className="link-label">Location</span>
                Lagos, Nigeria
              </a>
            </div>
          </div>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot dot-r"></span>
              <span className="dot dot-a"></span>
              <span className="dot dot-g"></span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="cmd">whoami</span>
                <span className="output ok">victor_arinze — cyber_lead, fullstack_engineer</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="cmd">cat certifications.txt</span>
                <span className="output ok">ISC2 CC | CNSP | CCEP</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="cmd">nmap --status availability</span>
                <span className="output ok">[OPEN] Available for engagements</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="cmd">ping zenethecyber@icloud.com</span>
                <span className="output warn">PING ... 64 bytes: response_time=fast</span>
              </div>
              <div className="terminal-line">
                <span className="prompt">$</span>
                <span className="cmd">_</span>
                <span className="cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
