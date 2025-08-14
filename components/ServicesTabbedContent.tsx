'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type TabDef = { id: string; label: string };

export default function ServicesTabbedContent({
  id = 'services-tabs',
  tabs,
  panes,
  defaultId,
  className,
}: {
  id?: string;
  tabs: TabDef[];
  panes: Record<string, React.ReactNode>;
  defaultId?: string;
  className?: string;
}) {
  const tabIds = useMemo(() => tabs.map((t) => t.id), [tabs]);
  const initialId = useMemo(() => {
    if (typeof window !== 'undefined') {
      const fromHash = window.location.hash?.replace('#', '');
      if (fromHash && tabIds.includes(fromHash)) return fromHash;
    }
    return defaultId && tabIds.includes(defaultId) ? defaultId : tabIds[0];
  }, [defaultId, tabIds]);

  const [activeId, setActiveId] = useState<string>(initialId);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash?.replace('#', '');
      if (h && tabIds.includes(h)) {
        setActiveId(h);
        const el = document.getElementById(h);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [tabIds]);

  useEffect(() => {
    // If user lands with a hash, ensure we scroll to the tab list (no hash is added if absent)
    const h = window.location.hash?.replace('#', '');
    if (h && tabIds.includes(h)) {
      const el = document.getElementById(h);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [tabIds]);

  const focusTab = (idx: number) => {
    const container = listRef.current;
    if (!container) return;
    const buttons = container.querySelectorAll<HTMLAnchorElement>('[role="tab"]');
    const btn = buttons[idx];
    if (btn) btn.focus();
  };

  const pushHashAndScroll = (id: string) => {
    history.pushState(null, '', `#${id}`);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const currentIdx = tabIds.indexOf(activeId);
    if (e.key === 'ArrowRight') {
      const next = (currentIdx + 1) % tabIds.length;
      setActiveId(tabIds[next]);
      focusTab(next);
      pushHashAndScroll(tabIds[next]);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      const prev = (currentIdx - 1 + tabIds.length) % tabIds.length;
      setActiveId(tabIds[prev]);
      focusTab(prev);
      pushHashAndScroll(tabIds[prev]);
      e.preventDefault();
    } else if (e.key === 'Home') {
      setActiveId(tabIds[0]);
      focusTab(0);
      pushHashAndScroll(tabIds[0]);
      e.preventDefault();
    } else if (e.key === 'End') {
      const last = tabIds.length - 1;
      setActiveId(tabIds[last]);
      focusTab(last);
      pushHashAndScroll(tabIds[last]);
      e.preventDefault();
    }
  };

  return (
    <section id={id} className={className ?? ''}>
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Services"
          className="flex flex-wrap items-center gap-2 border-b border-gi-line pb-4"
          onKeyDown={onKeyDown}
        >
          {tabs.map((t) => (
            <a
              key={t.id}
              role="tab"
              id={t.id}
              aria-selected={activeId === t.id}
              aria-controls={`panel-${t.id}`}
              href={`#${t.id}`}
              className={`rounded-full px-4 py-2 text-sm transition-colors ring-1 scroll-mt-24 ${
                activeId === t.id
                  ? 'bg-gi-text text-white ring-transparent'
                  : 'bg-white text-gi-text ring-gi-fog hover:bg-gi-fog/60'
              }`}
              onClick={(e) => {
                e.preventDefault();
                if (activeId !== t.id) setActiveId(t.id);
                pushHashAndScroll(t.id);
              }}
            >
              {t.label}
            </a>
          ))}
        </div>

        <div className="mt-6">
          {tabs.map((t) => (
            <div
              key={t.id}
              role="tabpanel"
              id={`panel-${t.id}`}
              aria-labelledby={t.id}
              hidden={activeId !== t.id}
              className="outline-none"
              tabIndex={-1}
            >
              {panes[t.id]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 