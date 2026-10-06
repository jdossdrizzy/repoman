"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LeafMark } from "./brand";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="bg-forest px-4 py-2 text-center text-xs text-forest-foreground/90 sm:text-sm">
        Medical patients save on every visit.{" "}
        <Link href="/med-card" className="font-semibold underline underline-offset-4 hover:text-amber">
          Get your card →
        </Link>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-primary" onClick={() => setOpen(false)}>
          <LeafMark />
          <span className="leading-none">
            <span className="block font-heading text-xl font-semibold">{site.name}</span>
            <span className="block text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">{site.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                  active ? "bg-secondary text-secondary-foreground" : "text-foreground/80",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/inventory"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:inline-flex"
          >
            Shop the menu
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full hover:bg-secondary md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <ul className="flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/inventory"
            onClick={() => setOpen(false)}
            className="block rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Shop the menu
          </Link>
        </nav>
      )}
    </header>
  );
}
