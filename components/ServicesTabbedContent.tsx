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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [fixedStyle, setFixedStyle] = useState<React.CSSProperties>({});
  const [spacerH, setSpacerH] = useState(0);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash?.replace('#', '');
      if (h && tabIds.includes(h)) {
        setActiveId(h);
        pushHashAndScroll(h);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [tabIds]);

  useEffect(() => {
    const h = window.location.hash?.replace('#', '');
    if (h && tabIds.includes(h)) {
      pushHashAndScroll(h);
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
    const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gi-header-offset')) || 64;
    const container = containerRef.current;
    if (container) {
      const top = container.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
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

  useEffect(() => {
    const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gi-header-offset')) || 64;
    const handle = () => {
      const list = listRef.current;
      const container = containerRef.current;
      if (!list || !container) return;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top + window.scrollY;
      const scrollTop = window.scrollY;
      const shouldFix = scrollTop + headerOffset >= containerTop;
      if (shouldFix) {
        const cStyle = getComputedStyle(container);
        const padL = cStyle.paddingLeft;
        const padR = cStyle.paddingRight;
        setIsFixed(true);
        setSpacerH(list.offsetHeight);
        setFixedStyle({
          position: 'fixed',
          top: `var(--gi-header-offset, ${headerOffset}px)`,
          left: `${containerRect.left + window.scrollX}px`,
          width: `${containerRect.width}px`,
          zIndex: 30,
          //background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'saturate(180%) blur(6px)',
          boxSizing: 'border-box',
          paddingLeft: padL,
          paddingRight: padR
        });
      } else if (isFixed) {
        setIsFixed(false);
        setSpacerH(0);
        setFixedStyle({});
      }
    };
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle);
      window.removeEventListener('resize', handle);
    };
  }, [isFixed]);

  return (
    <section id={id} className={className ?? ''}>
      <div ref={containerRef} className="mx-auto max-w-7xl px-6">
        {/* Spacer to avoid layout jump when fixed */}
        {spacerH > 0 && <div style={{ height: spacerH }} />}
        <div
          ref={listRef}
          role="tablist"
          aria-label="Services"
          className="flex flex-wrap items-center gap-2 border-b border-gi-line pb-4 pt-4"
          onKeyDown={onKeyDown}
          style={fixedStyle}
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