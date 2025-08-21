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
      .hs-form { display: grid; gap: 16px; }
      .hs-form fieldset { border: 0; padding: 0; margin: 0; max-width: 100%; }
      .hs-form .hs-form-field { width: 100%; }
      .hs-form .hs-form-field .input { margin: 0; }

      /* Labels */
      .hs-form .hs-form-field label:not(.hs-error-msg) {
        display: block; font-size: 0.95rem; font-weight: 600; color: #061E4B;
      }

      /* Inputs */
      .hs-form .hs-input {
        margin-top: 4px; width: 100%; border-radius: 12px; border: 1px solid #EEF1F6;
        background: #FFFFFF; color: #061E4B; padding: 10px 12px; line-height: 1.4;
      }
      .hs-form .hs-input:focus { outline: none; border-color: #061E4B; box-shadow: 0 0 0 2px rgba(6,30,75,0.15); }
      .hs-form textarea.hs-input { min-height: 140px; }

      /* Error text */
      .hs-error-msgs label { color: #DC2626; font-size: 0.875rem; }

      /* Consent / helper text */
      .legal-consent-container, .hs-field-desc { color: #58595B; font-size: 0.875rem; }

      /* Submit button */
      .hs-submit input[type="submit"], input.hs-button, .actions .hs-button {
        background: #5AAD5A; border-color: #5AAD5A; color: #FFFFFF; border-radius: 12px;
        padding: 12px 20px; font-weight: 600; font-size: 1rem; line-height: 1rem;
      }
      .hs-submit input[type="submit"]:hover, input.hs-button:hover, .actions .hs-button:hover {
        background: rgba(90,173,90,0.85); border-color: rgba(90,173,90,0.85);
      }

      /* Two-column rows */
      fieldset.form-columns-2 { display: grid; grid-template-columns: 1fr; gap: 16px; }
      @media (min-width: 768px) { fieldset.form-columns-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
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


