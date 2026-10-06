import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, FlaskConical, HeartPulse, MapPin, Phone, Stethoscope } from "lucide-react";

import { CategoryIcon, ProductArt, strainStyles } from "@/components/sites/greenhaven/brand";
import { ProductCard } from "@/components/sites/greenhaven/product-card";
import { categories, categoryBlurbs, products } from "@/lib/inventory";
import { site } from "@/lib/site";
import type { ProductCategory, StrainType } from "@/types/product";

const categoryArt: Record<ProductCategory, StrainType> = {
  Flower: "Hybrid",
  "Pre-Rolls": "Sativa",
  Vapes: "Indica",
  Edibles: "Sativa",
  Concentrates: "Hybrid",
  Tinctures: "CBD",
  Topicals: "CBD",
};

const trust = [
  { icon: FlaskConical, title: "Lab-tested", text: "Every product passes third-party testing for potency and purity." },
  { icon: BadgeCheck, title: "State-licensed", text: "Fully licensed for adult-use and medical sales." },
  { icon: Stethoscope, title: "Patient-first", text: "Knowledgeable staff and medical-only products for card holders." },
  { icon: Clock, title: "Fast pickup", text: "Build your list online, call ahead, skip the wait." },
];

export default function Home() {
  const picks = products.filter((p) => p.staffPick && p.inStock).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-forest text-forest-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background:radial-gradient(60%_80%_at_85%_10%,oklch(0.55_0.12_140)_0%,transparent_60%),radial-gradient(50%_60%_at_10%_100%,oklch(0.6_0.13_75/0.6)_0%,transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-sage">
              <span className="size-1.5 rounded-full bg-amber" /> Open today until 9 PM
            </p>
            <h1 className="mt-6 text-5xl leading-[1.05] font-semibold text-balance sm:text-6xl">
              Thoughtfully grown. <em className="font-normal text-sage">Carefully chosen.</em>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-forest-foreground/80">
              Small-batch flower, precisely dosed edibles and wellness products, with staff who take the time to help you find what works.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/inventory"
                className="inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3.5 font-semibold text-forest transition hover:brightness-105"
              >
                Browse the menu <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/med-card"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-semibold transition hover:bg-white/10"
              >
                <HeartPulse className="size-4" /> Get your medical card
              </Link>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-sm grid-cols-2 gap-4 md:max-w-none">
            <div className="space-y-4 pt-10">
              <ProductArt category="Flower" strain="Hybrid" className="aspect-square w-full rounded-3xl shadow-2xl" />
              <ProductArt category="Tinctures" strain="CBD" className="aspect-[4/5] w-full rounded-3xl shadow-2xl" />
            </div>
            <div className="space-y-4">
              <ProductArt category="Edibles" strain="Indica" className="aspect-[4/5] w-full rounded-3xl shadow-2xl" />
              <ProductArt category="Pre-Rolls" strain="Sativa" className="aspect-square w-full rounded-3xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="Why shop with us" className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Shop by category</p>
            <h2 className="mt-2 text-4xl font-semibold">Find your kind</h2>
          </div>
          <Link href="/inventory" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            View full menu <ArrowRight className="size-4" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c, i) => (
            <li key={c} className={i === 0 ? "col-span-2 row-span-2 sm:col-span-1 lg:col-span-2" : undefined}>
              <Link
                href={`/inventory?category=${encodeURIComponent(c)}`}
                className="group relative flex h-full min-h-40 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 transition duration-500 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${strainStyles[categoryArt[c]].from}, ${strainStyles[categoryArt[c]].to})` }}
                />
                <CategoryIcon
                  category={c}
                  className={`absolute top-4 right-4 opacity-90 transition duration-500 group-hover:rotate-6 ${i === 0 ? "size-28 sm:size-36" : "size-14 sm:size-16"}`}
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="relative">
                  <span className="block font-heading text-2xl font-semibold">{c}</span>
                  <span className="block text-sm text-white/85">{categoryBlurbs[c]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Staff picks */}
      <section className="bg-muted/60 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">This week</p>
          <h2 className="mt-2 text-4xl font-semibold">Staff picks</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">Favorites our budtenders keep recommending, from first-timers to connoisseurs.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                action={
                  <Link href={`/inventory?category=${encodeURIComponent(p.category)}`} className="text-sm font-semibold text-primary hover:underline">
                    Shop {p.category.toLowerCase()}
                  </Link>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Med card promo */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid overflow-hidden rounded-3xl bg-secondary md:grid-cols-2">
          <div className="p-8 sm:p-12">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Medical patients</p>
            <h2 className="mt-2 text-4xl font-semibold text-balance">Your medical card, without the runaround</h2>
            <p className="mt-4 text-muted-foreground">
              Apply online in about three minutes. We&apos;ll connect you with a licensed provider for a telehealth or in-person evaluation.
            </p>
            <Link
              href="/med-card"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Start my application <ArrowRight className="size-4" />
            </Link>
          </div>
          <ol className="grid gap-px bg-border/60">
            {[
              ["Apply online", "Share a few details and choose a time."],
              ["Meet a provider", "A licensed provider reviews your history."],
              ["Shop as a patient", "Use your card for patient pricing and medical-only products."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4 bg-card/70 p-6 sm:p-8">
                <span className="font-heading text-4xl font-semibold text-primary/40 tabular-nums">0{i + 1}</span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="scroll-mt-32 border-t border-border bg-card py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">Visit us</p>
            <h2 className="mt-2 text-4xl font-semibold">Stop by the shop</h2>
            <p className="mt-4 text-muted-foreground">
              Bring a valid government ID showing you&apos;re 21+, or your medical card and ID. Cash and debit accepted.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 text-primary" />
                <span>{site.address.line1}<br />{site.address.line2}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 text-primary" />
                <a href={site.phoneHref} className="hover:underline">{site.phone}</a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-2xl font-semibold"><Clock className="size-5 text-primary" /> Hours</h3>
            <dl className="mt-6 divide-y divide-border">
              {site.hours.map((h) => (
                <div key={h.days} className="flex justify-between py-3">
                  <dt className="font-medium">{h.days}</dt>
                  <dd className="text-muted-foreground tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
