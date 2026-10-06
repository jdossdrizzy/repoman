import type { Metadata } from "next";

import { InventoryBrowser } from "@/components/sites/greenhaven/inventory-browser";
import { categories } from "@/lib/inventory";
import type { ProductCategory } from "@/types/product";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse our full cannabis menu: flower, pre-rolls, vapes, edibles, concentrates, tinctures and topicals.",
};

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const { category } = await searchParams;
  const requested = Array.isArray(category) ? category[0] : category;
  const initialCategory = categories.find((c) => c === requested) as ProductCategory | undefined;

  return (
    <>
      <section className="border-b border-border bg-secondary/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Our menu</p>
          <h1 className="mt-2 text-5xl font-semibold">Today&apos;s inventory</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Filter by category, strain type or effect. Add products to your pickup list, then give us a call and we&apos;ll have them ready.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <InventoryBrowser key={initialCategory ?? "all"} initialCategory={initialCategory} />
      </div>
    </>
  );
}
