'use client';
import React from 'react';

export type TickerItem = { src: string; alt?: string; href?: string };

export default function LogoTicker({ items, speedSeconds = 40, className }: { items: TickerItem[]; speedSeconds?: number; className?: string }) {
	const safeItems = Array.isArray(items) ? items : [];
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const trackRef = React.useRef<HTMLDivElement | null>(null);
	const [renderItems, setRenderItems] = React.useState<TickerItem[]>(safeItems);
	const duration = `${Math.max(1, speedSeconds * 0.8)}s`;

	// Compute how many repeats are needed to fill at least one viewport width
	React.useEffect(() => {
		function recompute() {
			const containerW = containerRef.current?.clientWidth || 0;
			const baseTrackW = trackRef.current?.scrollWidth || 0; // width of current renderItems
			if (!containerW || !baseTrackW) return;
			// Ensure the single sequence is at least as wide as the container
			const repeats = Math.max(1, Math.ceil(containerW / baseTrackW) + 1);
			const next = Array.from({ length: repeats }, () => safeItems).flat();
			const same = next.length === renderItems.length && next.every((v, i) => v.src === renderItems[i]?.src);
			if (!same) setRenderItems(next);
		}
		recompute();
		const onLoad = () => recompute();
		window.addEventListener('resize', recompute, { passive: true } as any);
		window.addEventListener('load', onLoad);
		const t = window.setTimeout(recompute, 300);
		return () => {
			window.removeEventListener('resize', recompute as any);
			window.removeEventListener('load', onLoad);
			window.clearTimeout(t);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items]);

	const duplicate = React.useMemo(() => [...renderItems, ...renderItems], [renderItems]);

	return (
		<section className={`overflow-hidden ${className ?? ''}`} aria-label="Customer logos">
			<div ref={containerRef} className="mx-auto px-6 py-8">
				<div>
					<div ref={trackRef} className="gi-marquee flex items-center gap-16 md:gap-24 whitespace-nowrap will-change-transform" style={{ animationDuration: duration }}>
						{duplicate.map((it, idx) => (
							<Logo key={`${it.src}-${idx}`} {...it} />
						))}
					</div>
				</div>
			</div>

			{/* Local styles for marquee (not styled-jsx) */}
			<style>{`
			@keyframes gi-marquee-kf { from { transform: translateX(0); } to { transform: translateX(-50%); } }
			.gi-marquee { animation: gi-marquee-kf linear infinite; }
			`}</style>
		</section>
	);
}

function Logo({ src, alt, href }: TickerItem) {
	const image = (
		<img
			src={src}
			alt={alt || inferAltFromSrc(src)}
			loading="lazy"
			className="h-8 md:h-10 w-auto opacity-80 hover:opacity-100 transition-opacity"
		/>
	);
	if (href) {
		return (
			<a href={href} className="inline-flex items-center" aria-label={alt || inferAltFromSrc(src)}>
				{image}
			</a>
		);
	}
	return image;
}

function inferAltFromSrc(src: string) {
	try {
		const p = src.split('/').pop() || '';
		return p.replace(/[-_]/g, ' ').replace(/\.[a-zA-Z0-9]+$/, '').trim();
	} catch {
		return 'logo';
	}
} 