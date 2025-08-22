'use client';
import { motion as m, useReducedMotion } from 'framer-motion';

export type WhyUsBannerProps = { title?: string; body?: string; bullets?: string[]; className?: string };

export default function WhyUsBanner({ title = 'Why Green Irony', body, bullets, className }: WhyUsBannerProps) {
	return (
		<section className={`relative w-full overflow-hidden ${className ?? ''}`}>
			{/* Full-bleed background */}
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-gi-navy" />
				<div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-gi-pink/35 blur-[90px]" />
				<div className="absolute right-[-10%] top-1/3 h-72 w-72 rounded-full bg-gi-green/30 blur-[110px]" />
				<div
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage:
							'radial-gradient(60rem 30rem at 10% 20%, rgba(255,255,255,.08) 0%, transparent 60%), radial-gradient(50rem 26rem at 90% 80%, rgba(255,255,255,.06) 0%, transparent 60%)',
					}}
				/>
			</div>

			<div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
				<div className="mb-6 h-[3px] w-20 bg-gradient-to-r from-white/80 to-white/40" />
				<h3 className="text-3xl md:text-4xl font-semibold text-white">{title}</h3>
				{body && (
					<p className="mt-4 max-w-3xl text-base md:text-lg text-white/85">
						{body}
					</p>
				)}
				{Array.isArray(bullets) && bullets.length > 0 && (
					<ul className="mt-8 grid gap-4 sm:grid-cols-2">
						{bullets.map((b) => (
							<li key={b} className="flex items-start gap-3 text-white/90">
								<span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30">
									<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
										<path d="M4 12l6 6L20 6" />
									</svg>
								</span>
								<span className="text-base leading-7">{b}</span>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	);
}
