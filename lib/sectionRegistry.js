import React from 'react';
import HeroCenterPro from '../components/HeroCenterPro';
import TrustStrip from '../components/TrustStrip';
import ValuePillars from '../components/ValuePillars';
import FeaturedOffers from '../components/FeaturedOffers';
import HowItWorksLinear from '../components/HowItWorksLinear';
import CustomerStoriesProof from '../components/CustomerStoriesProof';
import LeadMagnetCTA from '../components/LeadMagnetCTA';
import PreFooterCTA from '../components/PreFooterCTA';

// Simple registry; for now our sections are largely presentational and read their own copy.
// We still expose a hook point to pass props when we start binding WP content.

const registry = {
  Page_Sections_Hero: (s) => <HeroCenterPro key={s.fieldGroupName} />, // later: map title/body/CTAs
  Page_Sections_TrustStrip: (s) => <TrustStrip key={s.fieldGroupName} />,
  Page_Sections_ValuePillars: (s) => <ValuePillars key={s.fieldGroupName} />,
  Page_Sections_FeaturedOffers: (s) => <FeaturedOffers key={s.fieldGroupName} />,
  Page_Sections_HowItWorks: (s) => <HowItWorksLinear key={s.fieldGroupName} />,
  Page_Sections_CustomerStories: (s) => <CustomerStoriesProof key={s.fieldGroupName} />,
  Page_Sections_LeadMagnetCta: (s) => <LeadMagnetCTA key={s.fieldGroupName} />,
  Page_Sections_PreFooterCta: (s) => <PreFooterCTA key={s.fieldGroupName} />,
};

export function renderSections(sections) {
  if (!Array.isArray(sections)) return null;
  return sections
    .map((s, idx) => {
      const r = registry[s.__typename];
      if (!r) return null;
      // ensure key uniqueness when fieldGroupName is missing
      const node = r({ ...s, fieldGroupName: s.fieldGroupName ?? `${s.__typename}-${idx}` });
      return node;
    })
    .filter(Boolean);
} 