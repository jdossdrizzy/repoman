import type { Product, ProductCategory, StrainType } from "@/types/product";

// Sample menu. Replace with a live feed from the store's POS or menu
// provider (e.g. Dutchie, Jane, Leafly) when one is available.
export const products: Product[] = [
  { id: "f-01", name: "Blue Dream", brand: "Coastline Farms", category: "Flower", strain: "Hybrid", thc: 22.4, cbd: 0.1, potencyUnit: "%", price: 38, size: "3.5 g", effects: ["Creative", "Uplifted", "Calm"], inStock: true, staffPick: true },
  { id: "f-02", name: "Granddaddy Purple", brand: "Highland Grown", category: "Flower", strain: "Indica", thc: 24.1, cbd: 0.2, potencyUnit: "%", price: 42, size: "3.5 g", effects: ["Sleepy", "Relaxed", "Hungry"], inStock: true },
  { id: "f-03", name: "Jack Herer", brand: "Coastline Farms", category: "Flower", strain: "Sativa", thc: 20.8, cbd: 0.1, potencyUnit: "%", price: 36, size: "3.5 g", effects: ["Energetic", "Focused", "Happy"], inStock: true },
  { id: "f-04", name: "Harlequin", brand: "Valley Wellness", category: "Flower", strain: "CBD", thc: 6.2, cbd: 11.5, potencyUnit: "%", price: 32, size: "3.5 g", effects: ["Clear-headed", "Calm"], inStock: true, medicalOnly: true },
  { id: "f-05", name: "Wedding Cake", brand: "Highland Grown", category: "Flower", strain: "Hybrid", thc: 26.3, cbd: 0.1, potencyUnit: "%", price: 48, size: "3.5 g", effects: ["Relaxed", "Euphoric"], inStock: false },
  { id: "p-01", name: "Sunset Sherbet Pre-Roll 5-Pack", brand: "Roll Co.", category: "Pre-Rolls", strain: "Indica", thc: 21.0, cbd: 0.1, potencyUnit: "%", price: 30, size: "5 × 0.5 g", effects: ["Relaxed", "Happy"], inStock: true, staffPick: true },
  { id: "p-02", name: "Durban Poison Pre-Roll", brand: "Roll Co.", category: "Pre-Rolls", strain: "Sativa", thc: 19.5, cbd: 0.1, potencyUnit: "%", price: 9, size: "1 g", effects: ["Energetic", "Creative"], inStock: true },
  { id: "v-01", name: "Pineapple Express Live Resin Cart", brand: "Cloudline", category: "Vapes", strain: "Sativa", thc: 84.2, cbd: 0.3, potencyUnit: "%", price: 45, size: "1 g", effects: ["Uplifted", "Focused"], inStock: true },
  { id: "v-02", name: "Northern Lights Disposable", brand: "Cloudline", category: "Vapes", strain: "Indica", thc: 88.0, cbd: 0.2, potencyUnit: "%", price: 35, size: "0.5 g", effects: ["Sleepy", "Relaxed"], inStock: true },
  { id: "e-01", name: "Wild Berry Gummies", brand: "Kind Kitchen", category: "Edibles", strain: "Hybrid", thc: 100, cbd: 0, potencyUnit: "mg", price: 20, size: "10 × 10 mg", effects: ["Happy", "Relaxed"], inStock: true, staffPick: true },
  { id: "e-02", name: "Midnight Chocolate Bar", brand: "Kind Kitchen", category: "Edibles", strain: "Indica", thc: 100, cbd: 0, potencyUnit: "mg", price: 24, size: "10 pieces", effects: ["Sleepy", "Calm"], inStock: true },
  { id: "e-03", name: "1:1 Calm Mints", brand: "Valley Wellness", category: "Edibles", strain: "CBD", thc: 50, cbd: 50, potencyUnit: "mg", price: 22, size: "20 mints", effects: ["Calm", "Clear-headed"], inStock: true, medicalOnly: true },
  { id: "c-01", name: "Gelato Live Rosin", brand: "Alpine Extracts", category: "Concentrates", strain: "Hybrid", thc: 76.5, cbd: 0.4, potencyUnit: "%", price: 60, size: "1 g", effects: ["Euphoric", "Relaxed"], inStock: true },
  { id: "c-02", name: "Sour Diesel Badder", brand: "Alpine Extracts", category: "Concentrates", strain: "Sativa", thc: 79.1, cbd: 0.2, potencyUnit: "%", price: 40, size: "1 g", effects: ["Energetic", "Uplifted"], inStock: false },
  { id: "t-01", name: "Restore 3:1 CBD Tincture", brand: "Valley Wellness", category: "Tinctures", strain: "CBD", thc: 250, cbd: 750, potencyUnit: "mg", price: 55, size: "30 ml", effects: ["Calm", "Clear-headed"], inStock: true, staffPick: true, medicalOnly: true },
  { id: "t-02", name: "Night Drops", brand: "Kind Kitchen", category: "Tinctures", strain: "Indica", thc: 300, cbd: 30, potencyUnit: "mg", price: 45, size: "30 ml", effects: ["Sleepy"], inStock: true },
  { id: "o-01", name: "Cooling Relief Balm", brand: "Valley Wellness", category: "Topicals", strain: "CBD", thc: 100, cbd: 400, potencyUnit: "mg", price: 38, size: "2 oz", effects: ["Soothing"], inStock: true },
  { id: "o-02", name: "Warming Muscle Rub", brand: "Valley Wellness", category: "Topicals", strain: "Hybrid", thc: 200, cbd: 200, potencyUnit: "mg", price: 42, size: "2 oz", effects: ["Soothing"], inStock: true },
];

export const categories: ProductCategory[] = [
  "Flower",
  "Pre-Rolls",
  "Vapes",
  "Edibles",
  "Concentrates",
  "Tinctures",
  "Topicals",
];

export const strainTypes: StrainType[] = ["Indica", "Sativa", "Hybrid", "CBD"];

export const categoryBlurbs: Record<ProductCategory, string> = {
  Flower: "Hand-trimmed, small-batch buds",
  "Pre-Rolls": "Ready when you are",
  Vapes: "Clean carts & disposables",
  Edibles: "Precisely dosed treats",
  Concentrates: "Rosin, badder & more",
  Tinctures: "Measured, smoke-free relief",
  Topicals: "Balms & rubs for the body",
};

export function formatPotency(p: Product) {
  const thc = `THC ${p.thc}${p.potencyUnit}`;
  return p.cbd > 0 ? `${thc} · CBD ${p.cbd}${p.potencyUnit}` : thc;
}
