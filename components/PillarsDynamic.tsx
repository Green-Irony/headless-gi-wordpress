'use client';
import { motion as m, useReducedMotion } from 'framer-motion';
import React from 'react';

export type DynamicPillar = { title: string; body: string; accentStrength?: number };
export type PillarsDynamicProps = {
	id?: string;
	className?: string;
	heading?: string;
	subhead?: string;
	items: DynamicPillar[];
	mode?: 'grid' | 'carousel';
};

const DEFAULT_HEADING = 'What we do';

export default function PillarsDynamic({ id, className, heading = DEFAULT_HEADING, subhead, items, mode = 'grid' }: PillarsDynamicProps) {
	const prefersReduced = useReducedMotion();
	const enterY = prefersReduced ? 0 : 8;

	return (
		<m.section
			id={id}
			className={`relative isolate ${className ?? ''}`}
			initial={{ opacity: 0, y: enterY }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{ duration: 0.24, ease: 'easeOut' }}
		>
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-gi-green opacity-[0.14] blur-[140px]" />
				<div className="absolute left-[20%] top-[20%] h-[280px] w-[280px] rounded-full bg-gi-pink/20 opacity-[0.14] blur-[120px]" />
			</div>

			<div className="mx-auto max-w-7xl px-6 py-20">
				<div className="mx-auto mb-8 h-px w-16 bg-gi-line" />
				<h2 className="text-center text-3xl md:text-4xl font-semibold text-gi-text tracking-tight text-balance">{heading}</h2>
				{subhead && <p className="mx-auto mt-4 max-w-3xl text-center text-gi-gray text-balance">{subhead}</p>}

				<m.ul
					className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, amount: 0.2 }}
					variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
				>
					{items.map(({ title, body }) => (
						<m.li
							key={title}
							className="relative overflow-visible h-full"
							variants={{ hidden: { opacity: 0, y: enterY }, show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } } }}
						>
							<div className="h-full rounded-2xl bg-gradient-to-r from-gi-green/35 via-gi-pink/20 to-gi-green/35 p-[1px]">
								<div className="flex h-full flex-col rounded-[16px] bg-white p-6 shadow-gi">
									<div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gi-green/15 ring-1 ring-gi-fog">
										<span className="h-5 w-5" />
									</div>
									<h3 className="text-base font-semibold text-gi-text">{title}</h3>
									<p className="mt-2 text-sm text-gi-gray">{body}</p>
									<div className="mt-auto" />
								</div>
							</div>
							<div aria-hidden className="pointer-events-none absolute left-3 right-3 -bottom-3 h-6 rounded-b-[18px] bg-gradient-to-r from-gi-green/30 via-gi-pink/20 to-gi-green/30 blur-[10px] opacity-80 md:opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black_40%)]" />
						</m.li>
					))}
				</m.ul>
			</div>
		</m.section>
	);
}

