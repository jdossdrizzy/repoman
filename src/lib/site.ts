// Business details used across the site. Replace these placeholders with
// the dispensary's real name, license number, address and hours.
export const site = {
  name: "Greenhaven",
  tagline: "Dispensary & Wellness",
  licenseNumber: "License #XXXX-0000",
  phone: "(555) 010-4200",
  phoneHref: "tel:+15550104200",
  email: "hello@greenhaven.example",
  address: {
    line1: "1200 Placeholder Ave, Suite 4",
    line2: "Your City, ST 00000",
  },
  hours: [
    { days: "Mon – Thu", time: "9:00 AM – 9:00 PM" },
    { days: "Fri – Sat", time: "9:00 AM – 10:00 PM" },
    { days: "Sunday", time: "10:00 AM – 7:00 PM" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Menu" },
  { href: "/med-card", label: "Medical Card" },
  { href: "/#visit", label: "Visit" },
] as const;
