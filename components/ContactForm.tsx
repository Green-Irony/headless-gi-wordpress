'use client';
import { useEffect, useMemo, useState } from 'react';

export type ContactFormValues = {
  name: string;
  email: string;
  role: 'IT Leader' | 'Ops Leader' | 'Salesforce/MuleSoft AE (indirect)' | 'Product/Revenue Ops' | 'Other' | '';
  organization: string;
  systems: { mulesoft: boolean; salesforce: boolean; knowledge: boolean; other: boolean; };
  priorityOutcome: 'delivery speed' | 'deflection' | 'capacity' | 'customer experience' | 'onboarding' | 'other' | '';
  description: string;
  nextStep: 'calendar booking' | 'expert call' | 'receive plan' | '';
  source?: string;
  urgency?: number;
};

const DEFAULT_VALUES: ContactFormValues = {
  name: '',
  email: '',
  role: '',
  organization: '',
  systems: { mulesoft: false, salesforce: false, knowledge: false, other: false },
  priorityOutcome: '',
  description: '',
  nextStep: '',
  source: undefined,
  urgency: 3,
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

  const selectedSystems = useMemo(() => Object.entries(values.systems).filter(([, v]) => v).map(([k]) => k), [values.systems]);

  function update<K extends keyof ContactFormValues>(key: K, val: ContactFormValues[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function updateSystems(key: keyof ContactFormValues['systems'], val: boolean) {
    setValues((v) => ({ ...v, systems: { ...v.systems, [key]: val } }));
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
        <p className="mt-2 max-w-2xl text-gi-gray">Check your inbox for the 8-Week Agent Launch Plan. Someone will reach out with next steps and prep questions.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="btn-primary" href="#calendar">Schedule Strategy Call</a>
          <a className="btn-secondary" href="#quiz">Self-score your first win</a>
        </div>
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
          <label className="form-label" htmlFor="cf-email">Email</label>
          <input id="cf-email" className="form-input" type="email" value={values.email} onChange={(e) => update('email', e.target.value)} required />
        </div>
        <div>
          <label className="form-label" htmlFor="cf-role">Role / Title</label>
          <select id="cf-role" className="form-select" value={values.role} onChange={(e) => update('role', e.target.value as any)}>
            <option value="">Select...</option>
            <option>IT Leader</option>
            <option>Ops Leader</option>
            <option>Salesforce/MuleSoft AE (indirect)</option>
            <option>Product/Revenue Ops</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="cf-org">Organization</label>
          <input id="cf-org" className="form-input" type="text" value={values.organization} onChange={(e) => update('organization', e.target.value)} />
        </div>
      </div>

      <div className="mt-4">
        <div className="form-label">Systems in scope</div>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="form-checkbox" checked={values.systems.mulesoft} onChange={(e) => updateSystems('mulesoft', e.target.checked)} /> MuleSoft</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="form-checkbox" checked={values.systems.salesforce} onChange={(e) => updateSystems('salesforce', e.target.checked)} /> Salesforce</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="form-checkbox" checked={values.systems.knowledge} onChange={(e) => updateSystems('knowledge', e.target.checked)} /> Data/Knowledge</label>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="form-checkbox" checked={values.systems.other} onChange={(e) => updateSystems('other', e.target.checked)} /> Other</label>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="cf-outcome">Priority outcome</label>
          <select id="cf-outcome" className="form-select" value={values.priorityOutcome} onChange={(e) => update('priorityOutcome', e.target.value as any)}>
            <option value="">Select...</option>
            <option value="delivery speed">Delivery speed</option>
            <option value="deflection">Deflection</option>
            <option value="capacity">Capacity</option>
            <option value="customer experience">Customer experience</option>
            <option value="onboarding">Onboarding</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="form-label" htmlFor="cf-next">Preferred next step</label>
          <select id="cf-next" className="form-select" value={values.nextStep} onChange={(e) => update('nextStep', e.target.value as any)}>
            <option value="">Select...</option>
            <option value="calendar booking">Calendar booking</option>
            <option value="expert call">Expert call</option>
            <option value="receive plan">Receive plan</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="form-label" htmlFor="cf-desc">Brief description of your current challenge</label>
        <textarea id="cf-desc" className="form-textarea" rows={5} value={values.description} onChange={(e) => update('description', e.target.value)} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="form-label" htmlFor="cf-urg">How soon do you need results? <span className="text-gi-gray">(optional)</span></label>
          <input id="cf-urg" type="range" min={1} max={5} step={1} value={values.urgency} onChange={(e) => update('urgency', Number(e.target.value))} className="w-full" />
          <div className="mt-1 text-xs text-gi-gray">{values.urgency === 1 ? 'Not urgent' : values.urgency === 5 ? 'ASAP' : 'Soon'}</div>
        </div>
        <div>
          {/* Hidden source field for attribution */}
          <input type="hidden" name="source" value={values.source || ''} readOnly />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={downloading} data-gi-analytics="contact-submit">
          {downloading ? 'Submitting…' : 'Map My First Win'}
        </button>
        <a className="btn-secondary" href="#calendar">Schedule Strategy Call</a>
        <a className="btn-secondary" href="#plan">Get the 8-Week Agent Launch Plan</a>
      </div>

      <p className="mt-3 text-xs text-gi-gray">We respect your time—one focused outcome in eight weeks. No boilerplate proposals.</p>
    </form>
  );
} 