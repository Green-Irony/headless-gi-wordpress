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
  { label: 'Contact', href: '/contact' },
];

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
    const parent = parentKey
      ? idToItem.get(parentKey) || dbIdToItem.get(parentKey)
      : undefined;

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
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDesktopIdx(null);
    }, delayMs);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className={`supports-[backdrop-filter]:backdrop-blur bg-white/85 transition-shadow ${scrolled ? 'shadow-gi' : ''}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link href="/" aria-label={(siteTitle ?? 'Green Irony') + ' — Home'} className="flex items-center gap-2">
                <Image src="/img/gi-logo-green.svg" alt={siteTitle ?? 'Green Irony'} width={140} height={28} priority className="h-7 w-auto" />
                <span id="gi-fallback" className="hidden items-center rounded-md px-2 py-1 text-sm font-semibold text-gi-text ring-1 ring-gi-fog">
                  <span className="mr-1 inline-block h-2 w-2 rounded-full bg-gi-green" /> {siteTitle ?? 'Green Irony'}
                </span>
              </Link>
            </div>

            {/* Right-side: desktop nav + CTAs + mobile trigger */}
            <div className="ml-auto flex items-center gap-4">
              {/* Desktop nav */}
              <nav className="relative hidden md:flex md:items-center md:gap-8" aria-label="Primary">
                {hasWpMenu
                  ? tree.map((item, idx) => {
                      const children = item.childItems?.nodes ?? [];
                      const hasChildren = children.length > 0;
                      return (
                        <div
                          key={item.id}
                          className="relative"
                          onMouseEnter={() => {
                            clearCloseTimer();
                            setOpenDesktopIdx(idx);
                          }}
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
                              <div className="w-56 rounded-2xl bg-white p-2 ring-1 ring-gi-fog shadow-gi">
                                <ul className="flex flex-col gap-1">
                                  {children.map((c) => (
                                    <li key={c.id}>
                                      <Link href={c.uri} className="block rounded-md px-3 py-2 text-sm text-gi-text hover:bg-gi-fog/60">
                                        {c.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </m.div>
                          )}
                        </div>
                      );
                    })
                  : FALLBACK_NAV.map((item) => (
                      <Link key={item.label} href={item.href} className="px-1 text-sm font-medium text-gi-gray hover:text-gi-text">
                        {item.label}
                      </Link>
                    ))}
              </nav>

              {/* CTAs + mobile trigger */}
              <div className="flex items-center gap-3">
                <Link href="#plan" className="btn-secondary hidden lg:inline-flex">Get the 8-Week Plan</Link>
                <Link href="#contact" className="btn-primary hidden md:inline-flex">Talk to an Expert</Link>
                <button
                  type="button"
                  className="md:hidden inline-flex items-center justify-center rounded-md px-2 py-2 text-gi-text ring-1 ring-gi-fog hover:bg-gi-fog/60"
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

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden bg-white transition-all ${openMobile ? 'opacity-100' : 'opacity-0'} ${openMobile ? 'max-h-[560px]' : 'max-h-0'}`}
        aria-hidden={!openMobile}
      >
        <div className="mx-auto max-w-7xl px-6 pb-4 pt-2">
          <nav className="mt-2 flex flex-col gap-1" aria-label="Mobile">
            {hasWpMenu
              ? tree.map((item) => {
                  const children = item.childItems?.nodes ?? [];
                  return (
                    <div key={item.id} className="rounded-md">
                      <Link
                        href={item.uri}
                        className="block rounded-md px-2 py-2 text-sm font-medium text-gi-text hover:bg-gi-fog/60"
                        onClick={() => setOpenMobile(false)}
                      >
                        {item.label}
                      </Link>
                      {children.length > 0 && (
                        <ul className="ml-2 border-l border-gi-fog pl-2">
                          {children.map((c) => (
                            <li key={c.id}>
                              <Link
                                href={c.uri}
                                className="block rounded-md px-2 py-2 text-sm text-gi-gray hover:bg-gi-fog/60"
                                onClick={() => setOpenMobile(false)}
                              >
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })
              : FALLBACK_NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-2 py-2 text-sm font-medium text-gi-text hover:bg-gi-fog/60"
                    onClick={() => setOpenMobile(false)}
                  >
                    {item.label}
                  </Link>
                ))}
            <div className="mt-2 flex gap-2">
              <Link href="#plan" className="btn-secondary flex-1" onClick={() => setOpenMobile(false)}>
                Get the 8-Week Plan
              </Link>
              <Link href="#contact" className="btn-primary flex-1" onClick={() => setOpenMobile(false)}>
                Talk to an Expert
              </Link>
            </div>
          </nav>
        </div>
        <div className="h-px w-full bg-gi-line" />
      </div>
    </header>
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