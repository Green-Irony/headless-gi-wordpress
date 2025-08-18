import React, { useMemo } from 'react';

export type HowStep = {
  k: string; // 01, 02, ...
  title: string;
  caption?: string;
  icon?: React.ReactNode;
};

type Props = {
  title?: string;
  subhead?: string;
  steps: HowStep[];
  accentColor?: string; // hex or css var
  showNumbers?: boolean;
  progressIndex?: number | null; // 0-based
  variant?: 'serpentine' | 'linear';
  className?: string;
};

export default function HowWeWorkSerpentine({
  title = 'How We Work',
  subhead,
  steps,
  accentColor = 'rgb(22 163 74)', // gi-green ~ tailwind green-600
  showNumbers = true,
  progressIndex = null,
  variant = 'serpentine',
  className,
}: Props) {
  const items = useMemo(() => (Array.isArray(steps) ? steps.filter(Boolean) : []), [steps]);
  const stepCount = Math.max(0, items.length);

  // Build SVG serpentine anchors (desktop only)
  const anchors = useMemo(() => {
    const pts: Array<{ x: number; y: number }> = [];
    if (stepCount === 0) return pts;
    for (let i = 0; i < stepCount; i += 1) {
      const x = (i / (stepCount - 1 || 1)) * 1000; // 0..1000
      const y = i % 2 === 0 ? 100 : 300; // alternate lanes (top/bottom within svg 400 height)
      pts.push({ x, y });
    }
    return pts;
  }, [stepCount]);

  function buildSmoothPath(points: Array<{ x: number; y: number }>): string {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;
    const d: string[] = [];
    d.push(`M ${points[0].x},${points[0].y}`);
    for (let i = 0; i < points.length - 1; i += 1) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const dx = (p1.x - p0.x) / 2;
      // cubic bezier control points halfway
      const c1x = p0.x + dx;
      const c1y = p0.y;
      const c2x = p1.x - dx;
      const c2y = p1.y;
      d.push(`C ${c1x},${c1y} ${c2x},${c2y} ${p1.x},${p1.y}`);
    }
    return d.join(' ');
  }

  const pathD = buildSmoothPath(anchors);

  // For grid placement (desktop), map each step to a column start in 12-col grid
  function colStartForIndex(i: number, cols = 12): number {
    if (stepCount <= 1) return 1;
    const fraction = i / (stepCount - 1);
    const start = Math.round(1 + fraction * (cols - 4)); // distribute across columns
    return Math.min(Math.max(start, 1), cols - 3);
  }

  return (
    <section className={["relative overflow-hidden bg-white", className || ''].join(' ')} role="region" aria-label={title}>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mx-auto mb-6 h-px w-16 bg-gi-line" />
        <h2 className="text-2xl font-semibold text-gi-text">{title}</h2>
        {subhead ? <h3 className="mt-2 text-lg font-semibold text-gi-text">{subhead}</h3> : null}

        {/* Mobile: vertical linear flow */}
        <div className="mt-6 lg:hidden">
          <ol className="relative border-l border-gi-fog pl-4">
            {items.map((s, i) => {
              const done = typeof progressIndex === 'number' && i <= progressIndex;
              return (
                <li key={s.k} className="mb-6 ml-2 last:mb-0">
                  <span
                    className="absolute -left-2 mt-1 h-3 w-3 -translate-x-1/2 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: done ? accentColor : 'rgb(209 213 219)' }}
                    aria-hidden="true"
                  />
                  <div className="rounded-xl bg-white ring-1 ring-gi-fog p-4 shadow-gi/10">
                    <div className="flex items-center gap-2">
                      {showNumbers ? (
                        <span className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
                          Step {s.k}
                        </span>
                      ) : null}
                      <span className="text-sm font-semibold text-gi-text">{s.title}</span>
                    </div>
                    {s.caption ? <p className="mt-1 text-sm text-gi-gray">{s.caption}</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop: serpentine with SVG background */}
        <div className="relative mt-8 hidden lg:block">
          {/* Background serpentine path */}
          {variant === 'serpentine' && stepCount > 1 ? (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <marker id="arrow" markerWidth="14" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse">
                  <polygon points="0 0, 10 5, 0 10" fill={accentColor} />
                </marker>
              </defs>
              <path d={pathD} fill="none" stroke={accentColor} strokeWidth={12} strokeLinecap="round" markerEnd="url(#arrow)" />
            </svg>
          ) : null}

          {/* Tiles */}
          <ol className="relative grid grid-cols-12 gap-y-8">
            {items.map((s, i) => {
              const colStart = colStartForIndex(i);
              const isTopRow = i % 2 === 0; // alternate lanes
              const done = typeof progressIndex === 'number' && i <= progressIndex;
              return (
                <li
                  key={s.k}
                  className={`${isTopRow ? 'row-start-1' : 'row-start-2'} col-span-4`}
                  style={{ gridColumnStart: colStart }}
                  aria-posinset={i + 1}
                  aria-setsize={stepCount}
                >
                  <div className={`rounded-2xl bg-white p-4 ring-1 ring-gi-fog transition-shadow ${done ? 'shadow-gi' : 'shadow-gi/0'}`}>
                    <div className="flex items-center gap-2">
                      {showNumbers ? (
                        <span className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">
                          Step {s.k}
                        </span>
                      ) : null}
                      <span className="text-sm font-semibold text-gi-text">{s.title}</span>
                    </div>
                    {s.caption ? <p className="mt-1 text-sm text-gi-gray">{s.caption}</p> : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}


