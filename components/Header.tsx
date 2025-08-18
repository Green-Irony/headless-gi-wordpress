import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gql } from '@apollo/client';
import { motion as m, useReducedMotion } from 'framer-motion';

export type MenuItem = {
  id: string;
  databaseId?: number;
  uri: string;
  label: string;
  parentId?: string | number | null;
  cssClasses?: string[] | null;
  childItems?: { nodes?: MenuItem[] } | null;
};

const FALLBACK_NAV: Array<{ label: string; href: string }> = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Customer Stories', href: '/customer-stories' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
];

const DEFAULT_SERVICES_CHILDREN = [
  { href: '/services#agentforce', title: 'AI & Digital Labor', desc: 'Jobs, safe actions, and KPIs.' },
  { href: '/services#mulesoft', title: 'MuleSoft Integration (AI-led)', desc: 'Pipelines & events for agents.' },
  { href: '/services#salesforce', title: 'Salesforce Optimization', desc: 'Control room for humans + agents.' },
  { href: '/services#data', title: 'Data & Migrations', desc: 'Trusted knowledge and real-time context.' },
];

// Default Solutions submenu links if WP is not populated
const DEFAULT_SOLUTIONS_CHILDREN = [
  { href: '/solutions/travel', title: 'Travel & Transportation' },
  { href: '/solutions/higher-education', title: 'Higher Education' },
  { href: '/solutions/smb', title: 'Small & Midsized Business' },
];

function toServicesAnchor(href: string): string {
  try {
    if (!href) return href;
    if (href.startsWith('/services#')) return href;
    if (href.startsWith('/services/')) {
      const seg = href.split('/')[2] || '';
      if (['agentforce', 'mulesoft', 'salesforce', 'data'].includes(seg)) return `/services#${seg}`;
    }
    return href;
  } catch {
    return href;
  }
}

// Small inline SVG icons for Solutions submenu
function TravelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-gi-green">
      <path d="M2 12l8-2 3-6h2v6l5 1-1 2-4-1-3 6h-2l1-6H5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HigherEdIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-gi-green">
      <path d="M3 9l9-5 9 5-9 5-9-5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12v4c0 1.1 2.7 2 5 2s5-.9 5-2v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SmbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 text-gi-green">
      <path d="M3 20h18M4 20v-9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9M8 9V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 14h2M12 14h2M16 14h2" strokeLinecap="round" />
    </svg>
  );
}
function renderSolutionIcon(label: string) {
  const l = (label || '').toLowerCase();
  if (l.includes('travel')) return <TravelIcon />;
  if (l.includes('higher')) return <HigherEdIcon />;
  if (l.includes('smb') || l.includes('small')) return <SmbIcon />;
  return <SmbIcon />;
}

// Small inline SVG icons for Services submenu
export function AiIcon({ className = 'h-4 w-4 text-gi-green' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3a4 4 0 0 1 4 4v1h1a3 3 0 0 1 0 6h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1 0-6h1V7a4 4 0 0 1 4-4z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12h4M9 9h6" strokeLinecap="round" />
    </svg>
  );
}
export function MuleIcon({ className = 'h-4 w-4 text-gi-green' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <circle cx="6" cy="12" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M8 12h6M18 8v8M12 12l4-6M12 12l4 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function SalesforceIcon({ className = 'h-4 w-4 text-gi-green' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M7 14a4 4 0 0 1 0-8 4.5 4.5 0 0 1 8.5-1.5A4 4 0 1 1 17 14H7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function DataIcon({ className = 'h-4 w-4 text-gi-green' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function renderServiceIcon(label: string) {
  const l = (label || '').toLowerCase();
  if (l.includes('agent') || l.includes('digital')) return <AiIcon />;
  if (l.includes('mule')) return <MuleIcon />;
  if (l.includes('salesforce')) return <SalesforceIcon />;
  if (l.includes('data') || l.includes('migration')) return <DataIcon />;
  return <AiIcon />;
}

function buildMenuTree(items: MenuItem[]): MenuItem[] {
  const idToItem = new Map<string, MenuItem>();
  const dbIdToItem = new Map<string, MenuItem>();
  const roots: MenuItem[] = [];

  items.forEach((it) => {
    idToItem.set(String(it.id), { ...it, childItems: it.childItems ?? { nodes: [] } });
    if (typeof it.databaseId !== 'undefined') {
      dbIdToItem.set(String(it.databaseId), idToItem.get(String(it.id))!);
    }
  });

  items.forEach((it) => {
    const parentKey = it.parentId != null ? String(it.parentId) : '';
    const parent = parentKey ? idToItem.get(parentKey) || dbIdToItem.get(parentKey) : undefined;

    if (parent) {
      if (!parent.childItems) parent.childItems = { nodes: [] };
      parent.childItems.nodes = parent.childItems.nodes ?? [];
      parent.childItems.nodes.push(idToItem.get(String(it.id))!);
    } else {
      roots.push(idToItem.get(String(it.id))!);
    }
  });

  return roots;
}

export default function Header({
  siteTitle,
  siteDescription,
  menuItems,
}: {
  siteTitle?: string;
  siteDescription?: string;
  menuItems?: MenuItem[] | null;
}) {
  const hasWpMenu = Array.isArray(menuItems) && menuItems.length > 0;
  const tree = useMemo(() => (hasWpMenu ? buildMenuTree(menuItems!) : []), [hasWpMenu, menuItems]);

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const [openDesktopIdx, setOpenDesktopIdx] = useState<number | null>(null);
  const prefersReduced = useReducedMotion();
  const closeTimerRef = useRef<number | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }
  function scheduleClose(delayMs = 180) {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpenDesktopIdx(null), delayMs);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  return (
    <>
             <header className="fixed inset-x-0 top-0 z-50">
                 <div className={`supports-[backdrop-filter]:backdrop-blur bg-white/85 transition-shadow ${scrolled ? 'shadow-gi' : ''}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" aria-label={(siteTitle ?? 'Green Irony') + ' — Home'} className="flex items-center gap-2">
                <Image src="/logos/green-irony/green-logo-long.png" alt={siteTitle ?? 'Green Irony'} width={160} height={32} priority className="h-9 w-auto" />
                <span id="gi-fallback" className="hidden items-center rounded-md px-2 py-1 text-sm font-semibold text-gi-text ring-1 ring-gi-fog">
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-gi-green" /> {siteTitle ?? 'Green Irony'}
                </span>
              </Link>
            </div>

            {/* Right-side: desktop nav + CTAs + mobile trigger */}
            <div className="ml-auto flex items-center gap-4">
              <nav className="relative hidden xl:flex xl:items-center xl:gap-8" aria-label="Primary">
                {(hasWpMenu ? tree : FALLBACK_NAV.map((n, i) => ({ id: String(i), uri: n.href, label: n.label })) as any[]).map((rawItem: any, idx) => {
                  const item: MenuItem = rawItem as MenuItem;
                  const isServices = (item.label || '').toLowerCase().includes('services') || (item.uri ?? '').startsWith('/services');
                  const isSolutions = (item.label || '').toLowerCase().includes('solutions') || (item.uri ?? '').startsWith('/solutions');
                  const children = (item.childItems && item.childItems.nodes) ? item.childItems.nodes : [];
                  const mappedChildren = isServices ? children.map(c => ({ ...c, uri: toServicesAnchor(c.uri) })) : children;
                  const hasChildren = isServices ? (mappedChildren.length > 0 || DEFAULT_SERVICES_CHILDREN.length > 0) : (isSolutions ? (mappedChildren.length > 0 || DEFAULT_SOLUTIONS_CHILDREN.length > 0) : mappedChildren.length > 0);
                  const effectiveChildren = mappedChildren.length > 0 ? mappedChildren.map(c => ({ href: c.uri, title: c.label })) : (isServices ? DEFAULT_SERVICES_CHILDREN : (isSolutions ? DEFAULT_SOLUTIONS_CHILDREN : []));

                  return (
                    <div
                      key={item.id || item.label}
                      className="relative"
                      onMouseEnter={() => { clearCloseTimer(); setOpenDesktopIdx(idx); }}
                      onMouseLeave={() => scheduleClose(180)}
                    >
                      <Link href={item.uri} className="relative px-1 text-sm font-medium text-gi-gray hover:text-gi-text">
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <m.div
                          onMouseEnter={clearCloseTimer}
                          onMouseLeave={() => scheduleClose(180)}
                          initial={false}
                          animate={{
                            opacity: openDesktopIdx === idx ? 1 : 0,
                            y: prefersReduced ? 0 : openDesktopIdx === idx ? 0 : -6,
                            pointerEvents: openDesktopIdx === idx ? ('auto' as const) : ('none' as const),
                          }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="absolute left-0 top-8 z-40"
                        >
                          {(isServices || isSolutions) ? (
                            <div className="w-[720px] rounded-2xl bg-white p-4 ring-1 ring-gi-fog shadow-gi">
                              <ul className="grid grid-cols-2 gap-3">
                                {effectiveChildren.slice(0,4).map((c) => (
                                  <li key={c.title}>
                                    <Link href={c.href} className="group flex items-start gap-3 rounded-md p-3 hover:bg-gi-fog/60">
                                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
                                        {isSolutions ? renderSolutionIcon(c.title) : (isServices ? renderServiceIcon(c.title) : <span className="h-4 w-4" />)}
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-sm font-semibold text-gi-text">{c.title}</span>
                                        {null}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="w-56 rounded-2xl bg-white p-2 ring-1 ring-gi-fog shadow-gi">
                              <ul className="flex flex-col gap-1">
                                {effectiveChildren.map((c) => (
                                  <li key={c.title}>
                                    <Link href={c.href} className="block rounded-md px-3 py-2 text-sm text-gi-text hover:bg-gi-fog/60">
                                      {c.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </m.div>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="hidden xl:flex items-center gap-3">
                <Link href="/plan" className="btn-secondary">Get the 8-Week Plan</Link>
                <Link href="/contact" className="btn-primary">Talk to an Expert</Link>
              </div>
              <div className="flex xl:hidden items-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md px-2 py-2 text-gi-text ring-1 ring-gi-fog hover:bg-gi-fog/60"
                  aria-label={openMobile ? 'Close menu' : 'Open menu'}
                  onClick={() => setOpenMobile((v) => !v)}
                >
                  {openMobile ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6l-12 12" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`h-px w-full ${scrolled ? 'bg-gi-fog' : 'bg-gi-line'}`} />
      </div>
      {/* Mobile overlay panel */}
      <div
        className={`xl:hidden fixed inset-x-0 top-16 z-40 bg-white ring-1 ring-gi-fog shadow-gi transition-[opacity,transform] duration-200 ${openMobile ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 -translate-y-2'}`}
        aria-hidden={!openMobile}
      >
        <div className="mx-auto max-w-7xl px-6 pb-4 pt-2">
          <nav className="mt-2 flex flex-col gap-1" aria-label="Mobile">
            {(hasWpMenu ? tree : FALLBACK_NAV.map((n, i) => ({ id: String(i), uri: n.href, label: n.label })) as any[]).map((rawItem: any) => {
              const item: MenuItem = rawItem as MenuItem;
              const isServices = (item.label || '').toLowerCase().includes('services') || (item.uri ?? '').startsWith('/services');
              const isSolutions = (item.label || '').toLowerCase().includes('solutions') || (item.uri ?? '').startsWith('/solutions');
              const children = (item.childItems && item.childItems.nodes) ? item.childItems.nodes : [];
              const mappedChildren = isServices ? children.map(c => ({ ...c, uri: toServicesAnchor(c.uri) })) : children;
              const effectiveChildren = mappedChildren.length > 0 ? mappedChildren.map(c => ({ href: c.uri, title: c.label })) : (isServices ? DEFAULT_SERVICES_CHILDREN : (isSolutions ? DEFAULT_SOLUTIONS_CHILDREN : []));

              return (
                <div key={item.id || item.label} className="rounded-md">
                  <Link href={item.uri} className="block rounded-md px-2 py-2 text-sm font-medium text-gi-text hover:bg-gi-fog/60" onClick={() => setOpenMobile(false)}>
                    {item.label}
                  </Link>
                  {effectiveChildren.length > 0 && (
                    <ul className="ml-2 border-l border-gi-fog pl-2">
                      {effectiveChildren.map((c) => (
                        <li key={c.title}>
                          <Link href={c.href} className="block rounded-md px-2 py-2 text-sm text-gi-gray hover:bg-gi-fog/60" onClick={() => setOpenMobile(false)}>
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <div className="mt-2 flex gap-2">
              <Link href="/plan" className="btn-secondary flex-1" onClick={() => setOpenMobile(false)}>
                Get the 8-Week Plan
              </Link>
              <Link href="/contact" className="btn-primary flex-1" onClick={() => setOpenMobile(false)}>
                Talk to an Expert
              </Link>
            </div>
          </nav>
        </div>
      </div>
      </header>
    </>
  );
}

// GraphQL fragment preserved for WP menu + settings
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(Header as any).fragments = {
  entry: gql`
    fragment HeaderFragment on RootQuery {
      generalSettings {
        title
        description
      }
      primaryMenuItems: menuItems(where: { location: PRIMARY }, first: 100) {
        nodes {
          id
          databaseId
          uri
          path
          label
          parentId
          cssClasses
          menu {
            node {
              name
            }
          }
        }
      }
    }
  `,
}; 