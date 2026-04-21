'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

const initialMessages: Message[] = [
  {
    role: 'assistant',
    text: 'Welcome to the Cybersecurity Compliance AI bot. Ask me about compliance frameworks, audit readiness, or control mapping for PCI-DSS, ISO 27001, NDPR, SOC 2, and more.',
  },
];

const replyTemplates: { keyword: RegExp; response: string }[] = [
  {
    keyword: /iso|27001/i,
    response:
      'ISO 27001 focuses on information security controls. I can help you map controls to clauses, identify risk areas, and recommend documentation practices for a stronger audit posture.',
  },
  {
    keyword: /pci|dss/i,
    response:
      'PCI-DSS requires strong cardholder data protection and security controls. Ask me about network segmentation, encryption, logging, or how to manage compliance across payment systems.',
  },
  {
    keyword: /soc\s*2/i,
    response:
      'SOC 2 centers on trust service criteria like security, availability, and confidentiality. I can help you understand control categories and prepare for readiness reviews.',
  },
  {
    keyword: /ndpr/i,
    response:
      'NDPR is Nigeria’s data protection regulation. I can help explain obligations around data privacy, consent, breach notification, and responsibilities for both controllers and processors.',
  },
  {
    keyword: /audit|readiness|auditor/i,
    response:
      'Audit readiness means documented controls, evidence trails, and a repeatable compliance workflow. I can help you define the next steps for continuous monitoring and control validation.',
  },
  {
    keyword: /risk|assessment/i,
    response:
      'A strong risk assessment starts with identifying assets, threats, and control gaps. I can help you prioritize remediation by impact and likelihood for a pragmatic compliance program.',
  },
  {
    keyword: /control/i,
    response:
      'Controls should be mapped to your regulatory requirements and verified regularly. Tell me which framework or domain you want to strengthen, and I’ll suggest a control category and focus areas.',
  },
];

function getAssistantResponse(query: string) {
  if (!query.trim()) {
    return 'Please provide a compliance question or scenario so I can help.';
  }

  const match = replyTemplates.find((template) => template.keyword.test(query));
  if (match) {
    return match.response;
  }

  return 'I can help with cybersecurity compliance frameworks, controls, audit readiness, and regulation mapping. Try asking about PCI-DSS, ISO 27001, NDPR, SOC 2, or compliance risk management.';
}

export function ComplianceChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [query, setQuery] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuery('');
    setSending(true);

    window.setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        text: getAssistantResponse(trimmed),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setSending(false);
    }, 600);
  };

  return (
    <section id="chatbot">
      <div className="section-header">
        <span className="section-num">03</span>
        <h2 className="section-title">AI Compliance Chat</h2>
        <div className="section-line"></div>
      </div>
      <div className="chatbot-grid">
        <div className="chatbot-card">
          <div className="chatbot-card-title">Cybersecurity Compliance AI</div>
          <p className="chatbot-card-copy">
            Get instant guidance on compliance frameworks, audit readiness, and control mapping. This AI assistant is tailored for PCI-DSS, ISO 27001, NDPR, SOC 2, and sector-specific security requirements.
          </p>
          <div className="chatbot-highlights">
            <span>Certified audit support</span>
            <span>Framework mapping</span>
            <span>Risk & control guidance</span>
          </div>
        </div>
        <div className="chatbot-card chatbot-window-card">
          <div className="chatbot-window">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'message message-user' : 'message message-assistant'}
              >
                <div className="message-role">{message.role === 'user' ? 'You' : 'Compliance AI'}</div>
                <div className="message-text">{message.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-form" onSubmit={handleSubmit}>
            <Input
              placeholder="Ask about compliance, controls, or audit readiness..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={sending}
            />
            <Button type="submit" disabled={sending} className="chatbot-send">
              {sending ? 'Thinking…' : 'Send'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
