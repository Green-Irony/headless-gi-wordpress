'use client';
import Link from 'next/link';

export type SimpleHeroProps = {
	title: string;
	subhead?: string;
	cta?: { label: string; href: string };
	id?: string;
	className?: string;
};

export default function HeroSimple({ title, subhead, cta, id, className }: SimpleHeroProps) {
	return (
		<section id={id} className={`relative isolate bg-white ${className ?? ''}`}>
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 h-[460px] w-[460px] rounded-full bg-gi-green opacity-[0.10] blur-[140px]" />
			</div>

			<div className="mx-auto max-w-7xl px-6 py-20 md:py-16">
				<h1 className="mx-auto max-w-3xl text-center text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-gi-text">
					{title}
				</h1>
				{subhead && (
					<p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gi-gray">
						{subhead}
					</p>
				)}
				{cta && (
					<div className="mt-8 flex justify-center">
						<Link href={cta.href} className="btn-primary">
							{cta.label}
						</Link>
					</div>
				)}
			</div>
		</section>
	);
} 