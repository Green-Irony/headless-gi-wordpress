import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { gql } from '@apollo/client';

export type MenuItem = {
  id: string;
  uri: string;
  label: string;
  parentId?: string | null;
  cssClasses?: string[] | null;
};

const FALLBACK_NAV: Array<{ label: string; href: string }> = [
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Customer Stories', href: '/customer-stories' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({
  siteTitle,
  siteDescription,
  menuItems,
}: {
  siteTitle?: string;
  siteDescription?: string;
  menuItems?: MenuItem[] | null;
}) {
  const items = (Array.isArray(menuItems) && menuItems.length > 0)
    ? menuItems.map((i) => ({ label: i.label, href: i.uri }))
    : FALLBACK_NAV;

  const [scrolled, setScrolled] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

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

            {/* Desktop nav */}
            <nav className="relative hidden md:flex md:items-center md:gap-8" aria-label="Primary">
              {items.map((item) => (
                <Link key={item.label} href={item.href} className="px-1 text-sm font-medium text-gi-gray hover:text-gi-text">
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right-side CTAs + mobile trigger */}
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
        <div className={`h-px w-full ${scrolled ? 'bg-gi-fog' : 'bg-gi-line'}`} />
      </div>

      {/* Mobile panel */}
      {(
        <div
          className={`md:hidden overflow-hidden bg-white transition-all ${openMobile ? 'opacity-100' : 'opacity-0'} ${openMobile ? 'max-h-[480px]' : 'max-h-0'}`}
          aria-hidden={!openMobile}
        >
          <div className="mx-auto max-w-7xl px-6 pb-4 pt-2">
            <nav className="mt-2 flex flex-col gap-2" aria-label="Mobile">
              {items.map((item) => (
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
      )}
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
      primaryMenuItems: menuItems(where: { location: PRIMARY }) {
        nodes {
          id
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