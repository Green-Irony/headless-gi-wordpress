"use client";
import React, { useEffect, useId } from 'react';

type HubSpotFormProps = {
  portalId: string;
  formId: string;
  region?: string; // optional region for EU data centers
  targetId?: string; // optional custom target container id
  cssClass?: string; // optional css class applied to container
};

export default function HubSpotForm({ portalId, formId, region, targetId, cssClass }: HubSpotFormProps) {
  const autoId = useId().replace(/:/g, '');
  const containerId = targetId || `hs-form-${autoId}`;

  useEffect(() => {
    const embeddedCss = `
      /* Base layout and spacing */
      form.hs-form.gi-overrides { display: grid; gap: 16px; }
      form.hs-form.gi-overrides fieldset { border: 0; padding: 0; margin: 0; max-width: 100%; }
      form.hs-form.gi-overrides .hs-form-field { width: 100%; }
      form.hs-form.gi-overrides .hs-form-field .input { margin: 0; }

      /* Labels */
      form.hs-form.gi-overrides .hs-form-field label:not(.hs-error-msg) {
        display: block; font-size: 0.95rem; font-weight: 600; color: #061E4B !important;
      }

      /* Inputs */
      form.hs-form.gi-overrides .hs-input {
        margin-top: 4px; width: 100%; border-radius: 12px !important; border: 1px solid #EEF1F6 !important;
        background: #FFFFFF !important; color: #061E4B !important; padding: 10px 12px !important; line-height: 1.4;
      }
      form.hs-form.gi-overrides .hs-input:focus { outline: none; border-color: #061E4B !important; box-shadow: 0 0 0 2px rgba(6,30,75,0.15); }
      form.hs-form.gi-overrides textarea.hs-input { min-height: 140px; }

      /* Error text */
      form.hs-form.gi-overrides .hs-error-msgs label { color: #DC2626; font-size: 0.875rem; }

      /* Consent / helper text */
      form.hs-form.gi-overrides .legal-consent-container, form.hs-form.gi-overrides .hs-field-desc { color: #58595B; font-size: 0.875rem; }

      /* Submit button */
      form.hs-form.gi-overrides .hs-submit input[type="submit"],
      form.hs-form.gi-overrides input.hs-button,
      form.hs-form.gi-overrides .actions .hs-button {
        background: #5AAD5A !important; border-color: #5AAD5A !important; color: #FFFFFF !important; border-radius: 12px !important;
        padding: 12px 20px !important; font-weight: 600 !important; font-size: 1rem !important; line-height: 1rem !important;
      }
      form.hs-form.gi-overrides .hs-submit input[type="submit"]:hover,
      form.hs-form.gi-overrides input.hs-button:hover,
      form.hs-form.gi-overrides .actions .hs-button:hover {
        background: rgba(90,173,90,0.85) !important; border-color: rgba(90,173,90,0.85) !important;
      }

      /* Two-column rows */
      form.hs-form.gi-overrides fieldset.form-columns-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
      @media (min-width: 768px) { form.hs-form.gi-overrides fieldset.form-columns-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    `;
    function loadScript() {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).hbspt?.forms) {
          resolve();
          return;
        }
        const existing = document.querySelector<HTMLScriptElement>('script[src^="https://js.hsforms.net/forms/"]');
        if (existing) {
          existing.addEventListener('load', () => resolve());
          existing.addEventListener('error', () => reject(new Error('HubSpot script failed to load')));
          return;
        }
        const s = document.createElement('script');
        s.async = true;
        s.defer = true;
        s.src = 'https://js.hsforms.net/forms/v2.js';
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('HubSpot script failed to load'));
        document.body.appendChild(s);
      });
    }

    async function create() {
      try {
        await loadScript();
        const hbspt = (window as any).hbspt;
        if (!hbspt?.forms?.create) return;
        hbspt.forms.create({
          portalId,
          formId,
          target: `#${containerId}`,
          region,
          css: embeddedCss,
          onFormReady: (form: any) => {
            try {
              const formEl: HTMLFormElement | null = (form && (form[0] || form)) as HTMLFormElement;
              if (formEl) {
                formEl.classList.add('gi-overrides');
              }
            } catch {}
          },
        });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    create();
  }, [portalId, formId, region, containerId]);

  return <div id={containerId} className={cssClass} />;
}


