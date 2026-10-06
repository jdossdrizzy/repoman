import type { Metadata } from "next";
import { BadgePercent, CalendarCheck, PackageOpen, ShieldCheck, Video } from "lucide-react";

import { MedCardForm } from "@/components/sites/greenhaven/med-card-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apply for a Medical Card",
  description: "Apply for your medical cannabis card online and book a telehealth or in-person evaluation with a licensed provider.",
};

const benefits = [
  { icon: BadgePercent, title: "Patient pricing", text: "Many states reduce or waive taxes for registered patients." },
  { icon: PackageOpen, title: "Medical-only products", text: "Access higher-CBD formulas and products reserved for patients." },
  { icon: ShieldCheck, title: "Higher limits", text: "Patients are often allowed larger purchase and possession limits." },
  { icon: CalendarCheck, title: "Priority service", text: "Dedicated patient support from our team." },
];

const conditions = [
  "Chronic pain", "Anxiety", "Insomnia", "PTSD", "Migraines", "Arthritis",
  "Cancer", "Epilepsy", "Glaucoma", "Multiple sclerosis", "Crohn's disease", "Nausea",
];

const faqs = [
  {
    q: "Do I qualify?",
    a: "Each state sets its own list of qualifying conditions. Common ones include chronic pain, anxiety, PTSD, insomnia and cancer. A licensed provider will review your history and decide during your evaluation.",
  },
  {
    q: "How long does it take?",
    a: "The application takes about 3 minutes. Telehealth evaluations are usually available within the week, and many states issue a card or temporary certificate shortly after approval.",
  },
  {
    q: "What do I need for my appointment?",
    a: "A valid government-issued ID showing your current address, and any medical records you have for your condition. Records help but aren't always required.",
  },
  {
    q: "Is my information private?",
    a: "Your details are shared only with the licensed provider and the state program you're applying to. We never sell patient information.",
  },
];

export default function MedCardPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-forest-foreground">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background:radial-gradient(60%_80%_at_90%_0%,oklch(0.55_0.12_140)_0%,transparent_60%)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-sage">
            <Video className="size-3.5" /> Telehealth & in-person evaluations
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] font-semibold text-balance sm:text-6xl">
            Apply for your medical card
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-forest-foreground/80">
            Tell us a little about yourself and we&apos;ll match you with a licensed provider. No paperwork maze, no waiting room.
          </p>
        </div>
      </section>

      <section aria-label="Patient benefits" className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
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

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div id="apply" className="min-w-0 scroll-mt-32">
          <MedCardForm />
          <p className="mt-4 px-1 text-xs text-muted-foreground">
            Submitting this form requests an evaluation; it does not guarantee approval. Eligibility, fees and card
            benefits are set by your state&apos;s medical cannabis program.
          </p>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold">Commonly qualifying conditions</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {conditions.map((c) => (
                <li key={c} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{c}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Lists vary by state. Not sure? Choose “Other / not sure” and a provider will help.</p>
          </div>
          <div className="rounded-2xl bg-secondary p-6">
            <h2 className="text-xl font-semibold">Prefer to talk?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Our patient care team can walk you through the process.</p>
            <a href={site.phoneHref} className="mt-4 inline-block font-semibold text-primary underline underline-offset-4">{site.phone}</a>
          </div>
        </aside>
      </div>

      <section className="border-t border-border bg-muted/50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-4xl font-semibold">Questions, answered</h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-xl text-primary transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
