import React from 'react';

type FaqItem = { question: string; answer: string };

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What does “AI-native” mean for delivery?',
    answer: 'AI accelerates the entire lifecycle—research, solutioning, config/build, validation—while senior engineers own quality and outcomes.',
  },
  {
    question: 'How quickly can we see results?',
    answer: 'Projects can go live in as little as 3 weeks. Timelines vary by scope, but the goal is always speed without surprises.',
  },
  {
    question: 'Do you work with small teams?',
    answer: 'Yes. We specialize in SMB/MM and divisional enterprise teams that want enterprise-grade outcomes at accessible price points.',
  },
  {
    question: 'How do you ensure AI actions are safe?',
    answer: 'Clear jobs, strict guardrails, approvals, auditability, and fallback behaviors—plus integration patterns that provide accurate, fresh context.',
  },
];

export default function FaqSimple() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: it.answer,
      },
    })),
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12" aria-labelledby="faq-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
      <h2 id="faq-heading" className="text-2xl font-semibold text-gi-text">FAQ</h2>

      <div className="mt-4 divide-y divide-gi-fog rounded-2xl border border-gi-fog bg-white shadow-gi">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group relative">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 text-left text-gi-text rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gi-green hover:bg-gi-subtle ">
              <span className="flex items-center gap-3">
                <span aria-hidden className="hidden h-4 w-1 rounded bg-gi-green group-open:block" />
                <span className="text-base font-medium group-open:font-semibold">{item.question}</span>
              </span>
              <svg
                className="h-5 w-5 shrink-0 text-gi-gray transition-transform group-open:rotate-180 group-open:text-gi-green"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="px-5 pb-5 text-sm text-gi-gray">{item.answer}</div>
          </details>
        ))}
      </div>
    </section>
  );
}


