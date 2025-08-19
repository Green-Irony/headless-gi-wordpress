'use client';
import React, { useEffect, useRef } from 'react';

type StarsProps = {
  /** Approximate stars spawned per second on desktop (mobile is ~40% of this). */
  density?: number; // default 1.2
  /** Hex or CSS color for stars. */
  color?: string; // default brand green
  /** Maximum simultaneous active stars (desktop). */
  maxStars?: number; // default 28
  /** Trail half-life in seconds; lower = faster fade. */
  trailHalfLifeSec?: number; // default 0.8
  /** Maximum tail length in pixels (peak). */
  tailMaxPx?: number; // default 110
};

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  active: boolean;
};

export default function BackgroundStarsCanvas({ density = 1.2, color = '#22c55e', maxStars = 28, trailHalfLifeSec = 0.8, tailMaxPx = 110 }: StarsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);
  const lastTsRef = useRef<number>(0);
  const spawnAccRef = useRef<number>(0);
  const visibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: true })!;

    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    const limit = Math.max(6, Math.floor((isMobile ? 0.4 : 1) * maxStars));
    starsRef.current = new Array(limit).fill(0).map(() => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, size: 0, active: false }));

    const resize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const parent = canvas.parentElement as HTMLElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    // Observe parent size changes
    const parent = canvas.parentElement as HTMLElement;
    const ro = new ResizeObserver(() => resize());
    if (parent) ro.observe(parent);
    // Observe visibility within viewport
    const io = new IntersectionObserver((entries) => {
      const e = entries[0];
      visibleRef.current = !!e && e.isIntersecting && e.intersectionRatio > 0.01;
    }, { threshold: [0, 0.01, 0.1, 1] });
    io.observe(canvas);

    const spawnStar = () => {
      const stars = starsRef.current;
      const s = stars.find((p) => !p.active);
      if (!s) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Spawn from a random edge (top or left) for a diagonal travel.
      const fromTop = Math.random() < 0.55;
      const startX = fromTop ? Math.random() * w : -20;
      const startY = fromTop ? -20 : Math.random() * h * 0.9;
      const angle = fromTop ? (15 + Math.random() * 25) * (Math.PI / 180) : (5 + Math.random() * 20) * (Math.PI / 180);
      const speed = (isMobile ? 80 : 120) + Math.random() * 60; // px/s within hero
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const maxLife = (w + h) / speed * (0.5 + Math.random() * 0.35); // seconds
      const size = 2 + Math.random() * 2; // px head size

      Object.assign(s, { x: startX, y: startY, vx, vy, life: 0, maxLife, size, active: true });
    };

    const step = (ts: number) => {
      if (prefersReduced || document.hidden) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(step);
        return;
      }
      const dt = Math.min(0.05, Math.max(0, (ts - lastTsRef.current) / 1000 || 0));
      lastTsRef.current = ts;

      // Fade previous frame to transparent (so trails do not accumulate forever)
      // Use destination-out to reduce alpha by fade amount → proper dissolving
      ctx.globalCompositeOperation = 'destination-out';
      const clampedHalfLife = Math.max(0.1, trailHalfLifeSec);
      const fadeAlpha = 1 - Math.pow(2, -dt / clampedHalfLife); // exponential decay
      ctx.fillStyle = `rgba(0,0,0,${fadeAlpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Switch back to normal drawing for stars
      ctx.globalCompositeOperation = 'source-over';

      // Spawn logic (pause when off-screen)
      const spawnRate = visibleRef.current ? (isMobile ? 0.5 : 1) * density : 0; // approx per second
      spawnAccRef.current += dt * spawnRate;
      while (spawnAccRef.current >= 1) {
        spawnStar();
        spawnAccRef.current -= 1;
      }

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!s.active) continue;
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.life > s.maxLife) {
          s.active = false;
          continue;
        }

        // Tail length grows then shrinks over life to avoid long continuous lines
        const lifeProgress = Math.max(0, Math.min(1, s.life / s.maxLife));
        const tailScale = Math.sin(Math.PI * lifeProgress); // 0→1→0
        const tailLen = Math.max(20, tailScale * tailMaxPx);
        const tx = s.x - (s.vx / Math.hypot(s.vx, s.vy)) * tailLen;
        const ty = s.y - (s.vy / Math.hypot(s.vx, s.vy)) * tailLen;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, 'rgba(34,197,94,0)');
        grad.addColorStop(1, 'rgba(34,197,94,0.5)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Draw glowing head
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame((t) => {
      lastTsRef.current = t;
      step(t);
    });

    const onVis = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame((t) => {
          lastTsRef.current = t;
          step(t);
        });
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVis);
      ro.disconnect();
      io.disconnect();
    };
  }, [density, color, maxStars, trailHalfLifeSec, tailMaxPx]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden />;
}


