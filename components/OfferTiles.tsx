'use client';
import Image from 'next/image';
import React from 'react';

export type OfferTileItem = {
	/** Title shown on the front of the tile */
	title: string;
	/** Optional small blurb shown on the back when flipped */
	description?: string;
	/** Icon shown on the front. Provide either a React node or an image src */
	icon?: React.ReactNode;
	iconSrc?: string;
	iconAlt?: string;
	/** Optional link around the tile */
	href?: string;
};

export type OfferTilesProps = {
	items: OfferTileItem[]; // 2–6
	title?: string;
	className?: string;
};

/**
 * Responsive grid of offer tiles (2–6).
 * - Desktop: distributed across 1 row when <=3 items, or 2 rows otherwise (3 per row for 5–6, 2 per row for 4)
 * - Mobile: single column; Tablet: two columns
 * - Hover/focus: card flips to reveal description
 */
export default function OfferTiles({ items, title, className }: OfferTilesProps) {
	const safeItems = Array.isArray(items) ? items.slice(0, 6) : [];
	if (safeItems.length < 2) {
		console.warn('OfferTiles expects between 2 and 6 items.');
	}

	// Determine desktop column count: 1 row for <=3, otherwise 2 rows with ceil(n/2) columns (max 3)
	const n = safeItems.length;
	const lgCols = n <= 3 ? n : Math.min(3, Math.ceil(n / 2)); // 4->2, 5->3, 6->3
	const lgColsClass = colClass(lgCols);

	return (
		<section className={className ?? ''}>
			<div className="mx-auto max-w-7xl px-6">
				{title && (
					<h2 className="mb-6 text-center text-3xl font-semibold tracking-tight text-gi-text">
						{title}
					</h2>
				)}
				<div
					className={`grid gap-6 sm:grid-cols-2 ${lgColsClass}`}
					style={{ gridAutoRows: '1fr' }}
				>
					{safeItems.map((it, idx) => (
						<Tile key={idx} item={it} />
					))}
				</div>
			</div>
		</section>
	);
}

function colClass(cols: number): string {
	switch (cols) {
		case 1:
			return 'lg:grid-cols-1';
		case 2:
			return 'lg:grid-cols-2';
		case 3:
			return 'lg:grid-cols-3';
		case 4:
			return 'lg:grid-cols-4';
		default:
			return 'lg:grid-cols-3';
	}
}

function Tile({ item }: { item: OfferTileItem }) {
	const Content = (
		<div
			className="group relative h-full w-full cursor-pointer rounded-2xl border border-gi-fog bg-white p-6 shadow-gi outline-none transition-colors hover:bg-gi-subtle focus-visible:ring-2 focus-visible:ring-gi-green"
			tabIndex={0}
		>
			{/* 3D flip container */}
			<div
				className="relative h-56 w-full transform-gpu [transform-style:preserve-3d] transition-transform duration-500 ease-out group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
			>
				{/* Front */}
				<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 [backface-visibility:hidden]">
					{item.icon ? (
						<div className="text-gi-green">{React.cloneElement(item.icon as any, { className: 'h-24 w-24 text-gi-green' })}</div>
					) : item.iconSrc ? (
						<Image src={item.iconSrc} alt={item.iconAlt ?? ''} width={72} height={72} />
					) : null}
					<h3 className="text-center text-lg font-semibold text-gi-text">{item.title}</h3>
				</div>

				{/* Back */}
				<div className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center [backface-visibility:hidden]">
					<p className="mx-auto max-w-xs text-center text-lg text-gi-text/80">{item.description ?? ''}</p>
				</div>
			</div>
		</div>
	);

	if (item.href) {
		return (
			<a href={item.href} className="block h-full">
				{Content}
			</a>
		);
	}
	return Content;
}

// Small utility class for rotateY with Tailwind using arbitrary variants is defined inline via className.
// However, we still need a convenience CSS class to flip the back face; we can lean on arbitrary utility for rotate.
// Tailwind does not provide rotate-y by default, so we encode it using an arbitrary value class name below.
declare module 'react' { // keep TS happy when using rotate-y-180 class name
	interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		// no-op, just ensuring TS doesn't complain about unknown class names
	}
}


