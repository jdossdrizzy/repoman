import type { ProductCategory, StrainType } from "@/types/product";
import { cn } from "@/lib/utils";

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <circle cx="16" cy="16" r="16" fill="currentColor" opacity="0.14" />
      <path
        d="M16 5c-1.6 3.2-2.4 6.4-2.2 9.7-2.3-1.9-5-3-8-3.2 1 3 2.9 5.4 5.6 6.8-2 .4-3.8 1.2-5.4 2.6 3 .9 6 .7 8.6-.7L13.6 27h4.8l-1-6.8c2.6 1.4 5.6 1.6 8.6.7-1.6-1.4-3.4-2.2-5.4-2.6 2.7-1.4 4.6-3.8 5.6-6.8-3 .2-5.7 1.3-8 3.2.2-3.3-.6-6.5-2.2-9.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const strainStyles: Record<StrainType, { badge: string; from: string; to: string }> = {
  Indica: { badge: "bg-[oklch(0.92_0.05_300)] text-[oklch(0.35_0.12_300)]", from: "oklch(0.82 0.07 300)", to: "oklch(0.55 0.12 300)" },
  Sativa: { badge: "bg-[oklch(0.93_0.07_75)] text-[oklch(0.42_0.11_60)]", from: "oklch(0.9 0.1 85)", to: "oklch(0.7 0.15 55)" },
  Hybrid: { badge: "bg-[oklch(0.92_0.07_140)] text-[oklch(0.36_0.09_150)]", from: "oklch(0.88 0.09 130)", to: "oklch(0.55 0.1 155)" },
  CBD: { badge: "bg-[oklch(0.92_0.05_220)] text-[oklch(0.38_0.09_230)]", from: "oklch(0.88 0.06 210)", to: "oklch(0.58 0.09 235)" },
};

function CategoryGlyph({ category }: { category: ProductCategory }) {
  const common = { fill: "none", stroke: "white", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (category) {
    case "Flower":
      return (
        <g {...common}>
          <path d="M50 22c-5 9-6 18-3 27-6-5-13-7-20-7 3 8 9 13 17 15-6 1-10 4-13 8 8 2 15 0 19-4v13" />
          <path d="M50 22c5 9 6 18 3 27 6-5 13-7 20-7-3 8-9 13-17 15 6 1 10 4 13 8-8 2-15 0-19-4" />
        </g>
      );
    case "Pre-Rolls":
      return (
        <g {...common}>
          <path d="M28 66 66 28l6 6-38 38z" />
          <path d="M60 34l6 6" />
          <path d="M70 22c3 2 4 5 2 8M76 18c4 3 5 8 2 12" />
        </g>
      );
    case "Vapes":
      return (
        <g {...common}>
          <rect x="42" y="30" width="16" height="44" rx="5" />
          <path d="M46 30v-8h8v8M42 44h16" />
          <circle cx="50" cy="62" r="3" />
        </g>
      );
    case "Edibles":
      return (
        <g {...common}>
          <path d="M34 44c0-9 7-14 16-14s16 5 16 14v16c0 6-5 10-10 10H44c-5 0-10-4-10-10z" />
          <path d="M42 40c0-3 2-5 4-5M56 46h0M44 54h0M58 58h0" />
        </g>
      );
    case "Concentrates":
      return (
        <g {...common}>
          <path d="M50 24c8 12 14 20 14 28a14 14 0 0 1-28 0c0-8 6-16 14-28z" />
          <path d="M44 54a6 6 0 0 0 6 6" />
        </g>
      );
    case "Tinctures":
      return (
        <g {...common}>
          <path d="M40 42h20v28a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z" />
          <path d="M44 42v-8h12v8M47 34v-8a3 3 0 0 1 6 0v8" />
          <path d="M40 56h20" />
        </g>
      );
    case "Topicals":
      return (
        <g {...common}>
          <path d="M30 50h40v14a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z" />
          <path d="M28 44h44v6H28z" />
          <path d="M44 60c2-4 10-4 12 0" />
        </g>
      );
  }
}

/** Illustrated product thumbnail: strain-coloured gradient with a category glyph. */
export function ProductArt({
  category,
  strain,
  className,
}: {
  category: ProductCategory;
  strain: StrainType;
  className?: string;
}) {
  const { from, to } = strainStyles[strain];
  const id = `g-${category}-${strain}`.replace(/\W/g, "");
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("block", className)} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${id})`} />
      <circle cx="82" cy="18" r="26" fill="white" opacity="0.12" />
      <circle cx="12" cy="92" r="30" fill="white" opacity="0.08" />
      <CategoryGlyph category={category} />
    </svg>
  );
}

/** Category glyph on its own, for overlaying on coloured surfaces. */
export function CategoryIcon({ category, className }: { category: ProductCategory; className?: string }) {
  return (
    <svg viewBox="18 14 64 64" aria-hidden="true" className={cn("block", className)}>
      <CategoryGlyph category={category} />
    </svg>
  );
}
