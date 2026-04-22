'use client';

import { useEffect, useRef, useState } from 'react';
import { Bot, RotateCcw, SendHorizonal, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  text: string;
};

type ComplianceChatbotProps = {
  className?: string;
};

const starterPrompts = [
  'Map ISO 27001 controls for a fintech product.',
  'What evidence should we prepare for SOC 2 readiness?',
  'How do we approach NDPR risk assessment for customer data?',
  'Explain PCI DSS priorities for a payment workflow.',
];

const initialMessages: Message[] = [
  {
    role: 'assistant',
    text: 'Compliance Copilot is ready. Ask about frameworks, control mapping, audit evidence, or program priorities across ISO 27001, PCI DSS, SOC 2, and NDPR.',
  },
];

const replyTemplates: { keyword: RegExp; response: string }[] = [
  {
    keyword: /iso|27001/i,
    response:
      'For ISO 27001, start with scope, asset context, risk treatment, and evidence-backed controls. I can help you break that into policies, technical safeguards, ownership, and audit artifacts.',
  },
  {
    keyword: /pci|dss/i,
    response:
      'For PCI DSS, focus first on cardholder-data flow, segmentation, access control, vulnerability management, and logging. I can help convert those into a readiness checklist.',
  },
  {
    keyword: /soc\s*2/i,
    response:
      'SOC 2 readiness usually means control design plus evidence discipline. We should map trust service criteria, identify system boundaries, and define repeatable proof for each control.',
  },
  {
    keyword: /ndpr/i,
    response:
      'NDPR programs should address lawful processing, consent and privacy notices, breach handling, retention, and controller-processor obligations. I can translate that into a remediation plan.',
  },
  {
    keyword: /audit|evidence|artifact/i,
    response:
      'Audit evidence should be organized by control owner, review cadence, source system, and proof type. Good workflows reduce last-minute scrambling by keeping evidence collection continuous.',
  },
  {
    keyword: /risk|assessment/i,
    response:
      'A usable risk assessment should tie business assets to realistic threats, current controls, and remediation ownership. We can prioritize by likelihood, impact, and dependency risk.',
  },
  {
    keyword: /control|mapping/i,
    response:
      'Control mapping works best when one operating control can satisfy multiple frameworks. We can group by identity, logging, change management, incident response, and vendor oversight.',
  },
];

function getAssistantResponse(query: string) {
  if (!query.trim()) {
    return 'Provide a compliance question, framework, or control problem so I can respond with a useful direction.';
  }

  const match = replyTemplates.find((template) => template.keyword.test(query));
  if (match) {
    return match.response;
  }

  return 'I can help with compliance frameworks, readiness planning, control design, evidence workflows, and security governance. Ask about ISO 27001, PCI DSS, SOC 2, NDPR, audits, or risk.';
}

export function ComplianceChatbot({ className }: ComplianceChatbotProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [query, setQuery] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const submitPrompt = (prompt: string) => {
    const trimmed = prompt.trim();
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
    }, 500);
  };

  return (
    <div className={cn('panel overflow-hidden', className)}>
      <div className="border-b border-border/70 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <p className="font-headline text-xl font-semibold text-foreground">Compliance Copilot</p>
              <p className="text-sm text-muted-foreground">Interactive guidance for frameworks, controls, and evidence planning.</p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            onClick={() => setMessages(initialMessages)}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-border/70 px-6 py-6 lg:border-b-0 lg:border-r">
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Suggested Workflows</p>
          <div className="mt-5 grid gap-3">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => submitPrompt(prompt)}
                className="rounded-2xl border border-border/70 bg-background/70 px-4 py-4 text-left text-sm leading-7 text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-background/70 p-4">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              What this widget is for
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Use it to guide security leaders, GRC teams, and auditors toward the right frameworks,
              artifacts, and remediation priorities without forcing them to read a wall of static text.
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="h-[340px] space-y-4 overflow-y-auto rounded-3xl border border-border/70 bg-background/60 p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={cn(
                  'max-w-[90%] rounded-3xl px-4 py-3 text-sm leading-7',
                  message.role === 'assistant'
                    ? 'border border-border/70 bg-card text-muted-foreground'
                    : 'ml-auto bg-primary text-primary-foreground'
                )}
              >
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
                  {message.role === 'assistant' ? 'Copilot' : 'You'}
                </p>
                <p>{message.text}</p>
              </div>
            ))}
            {sending ? (
              <div className="max-w-[90%] rounded-3xl border border-border/70 bg-card px-4 py-3 text-sm text-muted-foreground">
                Preparing response...
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="mt-4 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              submitPrompt(query);
            }}
          >
            <Input
              placeholder="Ask about audit readiness, controls, or framework priorities..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={sending}
              className="h-12 rounded-full border-border/70 bg-background/70 px-5"
            />
            <Button type="submit" disabled={sending} className="h-12 rounded-full px-5">
              <SendHorizonal className="h-4 w-4" />
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
