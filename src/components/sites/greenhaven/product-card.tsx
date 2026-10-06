import type { ReactNode } from "react";

import { formatPotency } from "@/lib/inventory";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { ProductArt, strainStyles } from "./brand";

export function ProductCard({ product, action }: { product: Product; action?: ReactNode }) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-0.5 hover:shadow-lg",
        !product.inStock && "opacity-70",
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductArt category={product.category} strain={product.strain} className="size-full transition duration-500 group-hover:scale-105" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.staffPick && (
            <span className="rounded-full bg-amber px-2.5 py-1 text-[0.7rem] font-semibold text-forest">Staff pick</span>
          )}
          {product.medicalOnly && (
            <span className="rounded-full bg-forest px-2.5 py-1 text-[0.7rem] font-semibold text-forest-foreground">Medical</span>
          )}
        </div>
        {!product.inStock && (
          <span className="absolute right-3 bottom-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.7rem] font-semibold">
            Sold out
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-medium text-muted-foreground">{product.category}</span>
          <span className={cn("rounded-full px-2 py-0.5 font-semibold", strainStyles[product.strain].badge)}>
            {product.strain}
          </span>
        </div>
        <div>
          <h3 className="font-heading text-lg leading-snug font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </div>
        <p className="text-sm font-medium tabular-nums">{formatPotency(product)}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Effects">
          {product.effects.map((e) => (
            <li key={e} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{e}</li>
          ))}
        </ul>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p>
            <span className="font-heading text-2xl font-semibold tabular-nums">${product.price}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ {product.size}</span>
          </p>
          {action}
        </div>
      </div>
    </article>
  );
}
