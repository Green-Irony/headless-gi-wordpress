import React, { useRef } from 'react';

export default function InsightsHeroSearch({
  value,
  onChange,
  onClear,
  onOpenFilters,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear?: () => void;
  onOpenFilters?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    onClear?.();
    onChange('');
    inputRef.current?.focus();
  }
  return (
    <section className="bg-gradient-to-b from-gi-subtle to-white py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gi-text sm:text-4xl">Clarity in the age of AI</h1>
        <p className="mt-2 text-center text-gi-gray">Practical plays for integrating AI into your business—from MuleSoft‑powered foundations to agent deployment and scale.</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
          <div className="relative w-full flex-1">
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') handleClear();
              }}
              type="text"
              placeholder="Search insights..."
              className="w-full rounded-xl border border-gi-fog bg-white px-4 py-3 pr-16 text-base text-gi-text shadow-gi/20 outline-none ring-0 placeholder:text-gi-gray focus:border-gi-green"
              aria-label="Search insights"
            />
            {value ? (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-gi-gray hover:bg-gi-fog/60"
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>
          {onOpenFilters ? (
            <button type="button" onClick={onOpenFilters} className="btn-secondary whitespace-nowrap">Filters</button>
          ) : null}
        </div>
      </div>
    </section>
  );
}


