'use client';
import { useEffect, useMemo, useState } from 'react';

export type ContactFormValues = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
};

const DEFAULT_VALUES: ContactFormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  source: undefined,
};

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(DEFAULT_VALUES);
  const [submitted, setSubmitted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Capture source attribution from URL
    const usp = new URLSearchParams(window.location.search);
    const src = usp.get('src') || usp.get('utm_source') || undefined;
    if (src) setValues((v) => ({ ...v, source: src }));
  }, []);

  function update<K extends keyof ContactFormValues>(key: K, val: ContactFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Minimal validation
    if (!values.name || !values.email) {
      alert('Please provide your name and email.');
      return;
    }
    // Simulate a submission; hook up to API/CRM later
    try {
      setDownloading(true);
      await new Promise((r) => setTimeout(r, 600));
      setSubmitted(true);
    } finally {
      setDownloading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
        <h3 className="text-xl font-semibold text-gi-text">Thanks!</h3>
        <p className="mt-2 max-w-2xl text-gi-gray">Well be in touch within one business dayoften the same day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gi-fog bg-white p-6 shadow-gi">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="cf-name">Name</label>
          <input id="cf-name" className="form-input" type="text" value={values.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div>
          <label className="form-label" htmlFor="cf-company">Company</label>
          <input id="cf-company" className="form-input" type="text" value={values.company} onChange={(e) => update('company', e.target.value)} />
        </div>
        <div>
          <label className="form-label" htmlFor="cf-email">Email</label>
          <input id="cf-email" className="form-input" type="email" value={values.email} onChange={(e) => update('email', e.target.value)} required />
        </div>
        <div>
          <label className="form-label" htmlFor="cf-phone">Phone <span className="text-gi-gray">(optional)</span></label>
          <input id="cf-phone" className="form-input" type="tel" value={values.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <label className="form-label" htmlFor="cf-message">How can we help?</label>
        <textarea id="cf-message" className="form-textarea" rows={5} value={values.message} onChange={(e) => update('message', e.target.value)} />
      </div>

      <div className="mt-4">
        {/* Hidden source field for attribution */}
        <input type="hidden" name="source" value={values.source || ''} readOnly />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={downloading} data-gi-analytics="contact-submit">
          {downloading ? 'Submitting…' : 'Start the Conversation'}
        </button>
        <a className="btn-secondary" href="#calendar/">Schedule Strategy Call</a>
        <a className="btn-secondary" href="/agentforce-job-description/">Get the 8-Week Agent Launch Plan</a>
      </div>

      <p className="mt-3 text-xs text-gi-gray">We respond within one business day—often the same day.</p>
    </form>
  );
} 