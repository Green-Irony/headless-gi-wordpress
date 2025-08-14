import Image from 'next/image';

export type CaseStudyTileProps = {
	brand: string;
	title: string;
	vertical?: string;
	logoSrc?: string;
	imageSrc?: string;
	challenge: string;
	solution: string;
	outcomes: string[];
	proofTag?: string;
	quote?: string;
	primaryCta?: { label: string; href: string };
	secondaryCta?: { label: string; href: string };
	className?: string;
	mediaSide?: 'left' | 'right';
};

export default function CaseStudyTile(props: CaseStudyTileProps) {
	const {
		brand,
		title,
		vertical,
		logoSrc,
		imageSrc,
		challenge,
		solution,
		outcomes,
		proofTag,
		quote,
		primaryCta,
		secondaryCta,
		className,
		mediaSide = 'left',
	} = props;

	const mediaOrderClass = mediaSide === 'right' ? 'md:order-2' : 'md:order-1';
	const contentOrderClass = mediaSide === 'right' ? 'md:order-1' : 'md:order-2';

	return (
		<article className={`relative overflow-hidden rounded-2xl border border-gi-fog bg-white shadow-gi ${className ?? ''}`}>
			<div className="absolute inset-0 bg-gradient-to-br from-gi-green/10 via-transparent to-gi-pink/10" aria-hidden />
			<div className="relative grid gap-6 p-6 md:grid-cols-12 md:gap-8 md:p-8">
				{/* Media + title column */}
				<div className={`flex flex-col gap-4 ${mediaOrderClass} md:col-span-5`}>
					{logoSrc || imageSrc ? (
						<div className="relative w-full overflow-hidden rounded-xl bg-white ring-1 ring-gi-fog">
							{imageSrc ? (
								<Image src={imageSrc} alt={`${brand}`} width={640} height={360} className="h-auto w-full object-cover" />
							) : (
								<div className="relative h-[200px]">
									<Image src={logoSrc as string} alt={`${brand} logo`} fill className="object-contain p-6" sizes="340px" />
								</div>
							)}
						</div>
					) : null}
					{proofTag && (
						<div className="self-start rounded-full bg-white px-3 py-1 text-xs font-medium text-gi-text ring-1 ring-gi-fog">
							{proofTag}
						</div>
					)}
					<h3 className="mt-1 text-2xl font-semibold text-gi-text">{title}</h3>
				</div>

				{/* Content column */}
				<div className={`min-w-0 ${contentOrderClass} md:col-span-7`}>
					<div className="flex flex-wrap items-center gap-3">
						<span className="text-xs font-semibold uppercase tracking-wide text-gi-gray">{brand}</span>
						{vertical && <span className="h-px w-8 bg-gi-line" />}
						{vertical && <span className="text-xs text-gi-gray">{vertical}</span>}
					</div>

					<div className="mt-4 grid gap-4 sm:grid-cols-2">
						<div>
							<div className="text-sm font-semibold text-gi-text">Challenge</div>
							<p className="mt-1 text-sm text-gi-gray">{challenge}</p>
						</div>
						<div>
							<div className="text-sm font-semibold text-gi-text">Solution</div>
							<p className="mt-1 text-sm text-gi-gray">{solution}</p>
						</div>
					</div>

					<div className="mt-4">
						<div className="text-sm font-semibold text-gi-text">Outcomes</div>
						<ul className="mt-2 grid list-disc pl-5 text-sm text-gi-gray marker:text-gi-green/80">
							{outcomes.map((o, i) => (
								<li key={i} className="mb-1">{o}</li>
							))}
						</ul>
					</div>

					{quote && (
						<blockquote className="mt-4 border-l-2 border-gi-fog pl-3 text-sm italic text-gi-text">“{quote}”</blockquote>
					)}

					{(primaryCta || secondaryCta) && (
						<div className="mt-6 flex flex-wrap items-center gap-3">
							{primaryCta && <a href={primaryCta.href} className="btn-primary">{primaryCta.label}</a>}
							{secondaryCta && <a href={secondaryCta.href} className="btn-secondary">{secondaryCta.label}</a>}
						</div>
					)}
				</div>
			</div>
		</article>
	);
} 