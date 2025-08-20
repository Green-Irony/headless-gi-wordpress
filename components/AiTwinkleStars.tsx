'use client';

import React, { useMemo } from 'react';

type Side = 'left' | 'right' | 'both';

type AiTwinkleStarsProps = {
  sides?: Side;
  /** Stars per side (when both sides are enabled). */
  countPerSide?: number;
  /** Colors for stars (rgba or hex with alpha recommended). */
  colors?: string[];
  /** Extra className for the outer container. */
  className?: string;
};

type StarSpec = {
  topPercent: number;
  leftPercent: number; // relative within the side strip
  sizePx: number;
  color: string;
  durationSec: number;
  delaySec: number;
};

function generateStars(count: number, colors: string[]): StarSpec[] {
  const result: StarSpec[] = [];
  for (let i = 0; i < count; i++) {
    const topPercent = Math.random() * 100; // 0..100
    const leftPercent = Math.random() * 100; // 0..100 within side strip
    const sizePx = 2 + Math.round(Math.random() * 4); // 2..4px
    const color = colors[i % colors.length];
    const durationSec = 1.6 + Math.random() * 2.2; // 1.6..3.8s
    const delaySec = Math.random() * 2.5; // 0..2.5s
    result.push({ topPercent, leftPercent, sizePx, color, durationSec, delaySec });
  }
  return result;
}

export default function AiTwinkleStars({
  sides = 'both',
  countPerSide = 14,
  colors = ['rgba(34,197,94,0.75)', 'rgba(236,72,153,0.75)'], // GI green and pink tints
  className,
}: AiTwinkleStarsProps) {
  const leftStars = useMemo(() => generateStars(countPerSide, colors), [countPerSide, colors]);
  const rightStars = useMemo(() => generateStars(countPerSide, colors.slice().reverse()), [countPerSide, colors]);

  const showLeft = sides === 'left' || sides === 'both';
  const showRight = sides === 'right' || sides === 'both';

  return (
    <div className={`pointer-events-none absolute inset-0 z-[12] ${className ?? ''}`} aria-hidden>
      {/* Left side strip */}
      {showLeft && (
        <div className="absolute inset-y-0 left-0 w-[18%] sm:w-[22%]">
          {leftStars.map((s, idx) => (
            <span
              key={`l-${idx}`}
              className="absolute block rounded-full"
              style={{
                top: `${s.topPercent}%`,
                left: `${s.leftPercent}%`,
                width: `${s.sizePx}px`,
                height: `${s.sizePx}px`,
                background: s.color,
                boxShadow: `0 0 ${Math.max(10, s.sizePx * 6)}px ${s.color}`,
                animation: `gi-twinkle ${s.durationSec}s ease-in-out ${s.delaySec}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Right side strip */}
      {showRight && (
        <div className="absolute inset-y-0 right-0 w-[18%] sm:w-[22%]">
          {rightStars.map((s, idx) => (
            <span
              key={`r-${idx}`}
              className="absolute block rounded-full"
              style={{
                top: `${s.topPercent}%`,
                left: `${s.leftPercent}%`,
                width: `${s.sizePx}px`,
                height: `${s.sizePx}px`,
                background: s.color,
                boxShadow: `0 0 ${Math.max(10, s.sizePx * 6)}px ${s.color}`,
                animation: `gi-twinkle ${s.durationSec}s ease-in-out ${s.delaySec}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes gi-twinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}


