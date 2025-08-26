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
		<article className={`relative overflow-hidden rounded-3xl bg-white py-8 sm:py-10 ${className ?? ''}`}>
			{/* Curved image header */}
			{(logoSrc || imageSrc) ? (
				<div className="relative h-[120px] sm:h-[160px] lg:h-[180px] w-full bg-white">
					<div className="absolute inset-0 rounded-[24%_56%_40%_50%/50%_42%_58%_45%] bg-gi-fog/25" aria-hidden />
					<div className="absolute inset-0 flex items-center justify-center">
						{imageSrc ? (
							<Image src={imageSrc} alt={`${brand}`} fill className="object-contain object-center p-6 sm:p-8 rounded-[24%_56%_40%_50%/50%_42%_58%_45%]" />
						) : (
							<Image src={logoSrc as string} alt={`${brand} logo`} fill className="object-contain p-8" />
						)}
					</div>
				</div>
			) : null}

			{/* Glass content panel */}
			<div className="mt-4 sm:mt-6 lg:mt-8 px-4 pb-6 md:px-6">
				<div className="mx-auto max-w-5xl">
					<div className="flex flex-wrap items-center gap-2">
						<span className="inline-flex items-center rounded-full bg-gi-green/15 px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">{brand}</span>
						{vertical ? <span className="h-px w-6 bg-gi-line" /> : null}
						{vertical ? <span className="text-xs text-gi-gray">{vertical}</span> : null}
						{proofTag ? <span className="ml-auto inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold text-gi-text ring-1 ring-gi-fog">{proofTag}</span> : null}
					</div>
					<h3 className="mt-3 text-[1.4rem] font-semibold text-gi-text">{title}</h3>

					<div className="mt-4 grid gap-4 md:grid-cols-2">
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

					{quote ? (
						<blockquote className="mt-4 border-l-2 border-gi-fog pl-3 text-sm italic text-gi-text">“{quote}”</blockquote>
					) : null}

					{(primaryCta || secondaryCta) ? (
						<div className="mt-6 flex flex-wrap items-center gap-3">
							{primaryCta ? <a href={primaryCta.href} className="btn-primary">{primaryCta.label}</a> : null}
							{secondaryCta ? <a href={secondaryCta.href} className="btn-secondary">{secondaryCta.label}</a> : null}
						</div>
					) : null}
				</div>
			</div>
		</article>
	);
} 