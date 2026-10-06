"use client";

import { useMemo, useState } from "react";
import { Minus, Phone, Plus, Search, ShoppingBag, X } from "lucide-react";

import { categories, products, strainTypes } from "@/lib/inventory";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { ProductCategory, StrainType } from "@/types/product";
import { ProductCard } from "./product-card";

type SortKey = "featured" | "price-asc" | "price-desc" | "thc-desc" | "name";

const sortLabels: Record<SortKey, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  "thc-desc": "Potency: highest THC",
  name: "Name A–Z",
};

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function InventoryBrowser({ initialCategory }: { initialCategory?: ProductCategory }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">(initialCategory ?? "All");
  const [strain, setStrain] = useState<StrainType | "All">("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [medicalOnly, setMedicalOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [bag, setBag] = useState<Record<string, number>>({});

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (strain !== "All" && p.strain !== strain) return false;
      if (inStockOnly && !p.inStock) return false;
      if (medicalOnly && !p.medicalOnly) return false;
      if (!q) return true;
      return [p.name, p.brand, p.category, p.strain, ...p.effects].some((s) => s.toLowerCase().includes(q));
    });
    const sorted = [...filtered];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "thc-desc":
        // Compare like with like: percentage products first, then milligram products.
        sorted.sort((a, b) => (a.potencyUnit === b.potencyUnit ? b.thc - a.thc : a.potencyUnit === "%" ? -1 : 1));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(b.inStock) - Number(a.inStock) || Number(!!b.staffPick) - Number(!!a.staffPick));
    }
    return sorted;
  }, [query, category, strain, inStockOnly, medicalOnly, sort]);

  const bagItems = Object.entries(bag)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
    .filter((i) => i.product && i.qty > 0);
  const bagCount = bagItems.reduce((n, i) => n + i.qty, 0);
  const bagTotal = bagItems.reduce((n, i) => n + i.qty * i.product.price, 0);

  const changeQty = (id: string, delta: number) =>
    setBag((b) => {
      const next = { ...b, [id]: Math.max(0, (b[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });

  const hasFilters = query || category !== "All" || strain !== "All" || inStockOnly || medicalOnly;
  const clearFilters = () => {
    setQuery("");
    setCategory("All");
    setStrain("All");
    setInStockOnly(false);
    setMedicalOnly(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        <div className="space-y-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Search the menu</span>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search strains, brands or effects (e.g. “sleepy”)"
                className="h-11 w-full rounded-full border border-input bg-background pr-4 pl-10 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-11 rounded-full border border-input bg-background px-4 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                {(Object.keys(sortLabels) as SortKey[]).map((k) => (
                  <option key={k} value={k}>{sortLabels[k]}</option>
                ))}
              </select>
            </label>
          </div>

          <div role="group" aria-label="Category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            <Chip active={category === "All"} onClick={() => setCategory("All")}>All products</Chip>
            {categories.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</Chip>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-4">
            <div role="group" aria-label="Strain type" className="flex flex-wrap gap-2">
              {(["All", ...strainTypes] as const).map((s) => (
                <Chip key={s} active={strain === s} onClick={() => setStrain(s)}>{s === "All" ? "Any type" : s}</Chip>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="size-4 accent-[var(--primary)]" />
                In stock only
              </label>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input type="checkbox" checked={medicalOnly} onChange={(e) => setMedicalOnly(e.target.checked)} className="size-4 accent-[var(--primary)]" />
                Medical products
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground" aria-live="polite">
          <p>
            Showing <strong className="text-foreground">{visible.length}</strong> of {products.length} products
          </p>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="font-medium text-primary underline-offset-4 hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {visible.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((p) => {
              const qty = bag[p.id] ?? 0;
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  action={
                    !p.inStock ? null : qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => changeQty(p.id, 1)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        aria-label={`Add ${p.name} to pickup list`}
                      >
                        <Plus className="size-4" /> Add
                      </button>
                    ) : (
                      <div className="inline-flex items-center rounded-full border border-primary" role="group" aria-label={`${p.name} quantity`}>
                        <button type="button" onClick={() => changeQty(p.id, -1)} className="p-2 text-primary" aria-label="Remove one">
                          <Minus className="size-4" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                        <button type="button" onClick={() => changeQty(p.id, 1)} className="p-2 text-primary" aria-label="Add one">
                          <Plus className="size-4" />
                        </button>
                      </div>
                    )
                  }
                />
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-heading text-xl font-semibold">Nothing matches those filters</p>
            <p className="mt-2 text-sm text-muted-foreground">Try a different search or clear your filters.</p>
            <button type="button" onClick={clearFilters} className="mt-4 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              Clear filters
            </button>
          </div>
        )}
      </div>

      <aside id="pickup-list" aria-label="Pickup list" className="scroll-mt-32 lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="size-5 text-primary" />
            <h2 className="font-heading text-xl font-semibold">Pickup list</h2>
            {bagCount > 0 && (
              <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground tabular-nums">{bagCount}</span>
            )}
          </div>
          {bagItems.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">
              Add products to build a list, then call us and we&apos;ll have it ready at the counter.
            </p>
          ) : (
            <>
              <ul className="mt-4 divide-y divide-border">
                {bagItems.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-start gap-2 py-3 text-sm">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground tabular-nums">{qty} × ${product.price}</p>
                    </div>
                    <span className="font-semibold tabular-nums">${qty * product.price}</span>
                    <button
                      type="button"
                      onClick={() => changeQty(product.id, -qty)}
                      className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={`Remove ${product.name}`}
                    >
                      <X className="size-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex justify-between border-t border-border pt-3 font-semibold">
                <span>Estimated total</span>
                <span className="tabular-nums">${bagTotal}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Before tax. Medical patients may pay less tax where state law allows.</p>
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <Phone className="size-4" /> Call to reserve
              </a>
              <p className="mt-2 text-center text-xs text-muted-foreground tabular-nums">{site.phone}</p>
            </>
          )}
        </div>
        <p className="mt-3 px-1 text-xs text-muted-foreground">
          Bring a valid government ID (21+) or your medical card. Availability and prices may change.
        </p>
      </aside>

      {bagCount > 0 && (
        <a
          href="#pickup-list"
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl lg:hidden"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="size-4" /> {bagCount} {bagCount === 1 ? "item" : "items"} in pickup list
          </span>
          <span className="tabular-nums">${bagTotal}</span>
        </a>
      )}
    </div>
  );
}
