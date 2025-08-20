'use client';
import React from 'react';

export type TickerItem = { src: string; alt?: string; href?: string };

export default function LogoTicker({ items, speedSeconds = 40, className }: { items: TickerItem[]; speedSeconds?: number; className?: string }) {
	const safeItems = Array.isArray(items) ? items : [];
	const duplicate = [...safeItems, ...safeItems];
	const duration = `${speedSeconds}s`;

	return (
		<section className={`overflow-hidden ${className ?? ''}`} aria-label="Customer logos">
			<div className="mx-auto max-w-7xl px-6 py-8">
				<div>
					<div className="gi-marquee flex items-center gap-16 md:gap-24 whitespace-nowrap will-change-transform" style={{ animationDuration: duration }}>
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