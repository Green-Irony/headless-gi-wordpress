import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { gql } from '@apollo/client';

export type MenuItem = {
  id: string;
  uri: string;
  label: string;
  parentId?: string | null;
  cssClasses?: string[] | null;
};

export default function Header({
  siteTitle,
  siteDescription,
  menuItems,
}: {
  siteTitle?: string;
  siteDescription?: string;
  menuItems?: MenuItem[] | null;
}) {
  const items = Array.isArray(menuItems) ? menuItems : [];

  return (
    <header className="sticky top-0 z-50">
      <div className="supports-[backdrop-filter]:backdrop-blur bg-white/85 shadow-gi">
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
              {siteDescription && (
                <span className="hidden md:inline-block text-xs text-gi-gray">{siteDescription}</span>
              )}
            </div>

            {/* Primary nav */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
              {items.map((item) => (
                <Link key={item.id} href={item.uri} className="text-sm font-medium text-gi-gray hover:text-gi-text">
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* CTAs (optional) */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="#plan" className="btn-secondary">Get the 8-Week Plan</Link>
              <Link href="#contact" className="btn-primary">Talk to an Expert</Link>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gi-line" />
      </div>
    </header>
  );
}

// Attach existing GraphQL fragment for WP menu + settings
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