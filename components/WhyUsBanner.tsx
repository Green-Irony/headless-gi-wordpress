'use client';
import { motion as m, useReducedMotion } from 'framer-motion';

export type WhyUsBannerProps = { title?: string; body: string; className?: string };

export default function WhyUsBanner({ title = 'Why Green Irony', body, className }: WhyUsBannerProps) {
	return (
		<section className={`mx-auto max-w-7xl px-6 py-10 ${className ?? ''}`}>
			<div className="relative overflow-hidden rounded-2xl border border-gi-fog bg-gi-pink/10 p-6 shadow-gi">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-gi-pink/20 blur-[60px]" />
					<div className="absolute -right-16 -bottom-16 h-44 w-44 rounded-full bg-gi-green/20 blur-[60px]" />
				</div>
				<h3 className="relative z-10 text-xl font-semibold text-gi-text">{title}</h3>
				<p className="relative z-10 mt-2 max-w-3xl text-sm text-gi-text/80">{body}</p>
				<div className="relative z-10 mt-4 h-[2px] w-24 bg-gradient-to-r from-gi-pink to-gi-green/60" />
			</div>
		</section>
	);
}
