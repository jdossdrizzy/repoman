import Link from "next/link";

import { navLinks, site } from "@/lib/site";
import { LeafMark } from "./brand";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-forest text-forest-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-sage">
            <LeafMark />
            <span className="font-heading text-xl font-semibold text-forest-foreground">{site.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-forest-foreground/75">
            A neighborhood dispensary for adult-use customers and medical patients. Lab-tested products and staff who take time to help.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-forest-foreground/80 hover:text-forest-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">Hours</h2>
          <ul className="mt-4 space-y-2 text-sm text-forest-foreground/80">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="tabular-nums">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-sage uppercase">Contact</h2>
          <address className="mt-4 space-y-2 text-sm text-forest-foreground/80 not-italic">
            <p>
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p>
              <a href={site.phoneHref} className="hover:text-forest-foreground">{site.phone}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-forest-foreground">{site.email}</a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs text-forest-foreground/60 sm:px-6">
          <p>
            For use only by adults 21 and older or registered medical patients. Keep out of reach of children and pets.
            Do not drive or operate machinery after use. Cannabis may be habit forming. Products have not been evaluated
            by the FDA and are not intended to diagnose, treat, cure or prevent any disease.
          </p>
          <p>
            © {new Date().getFullYear()} {site.name} {site.tagline} · {site.licenseNumber}
          </p>
        </div>
      </div>
    </footer>
  );
}
