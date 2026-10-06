export type ProductCategory =
  | "Flower"
  | "Pre-Rolls"
  | "Vapes"
  | "Edibles"
  | "Concentrates"
  | "Tinctures"
  | "Topicals";

export type StrainType = "Indica" | "Sativa" | "Hybrid" | "CBD";

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  strain: StrainType;
  /** Percent for flower, vapes and concentrates; milligrams per package otherwise. */
  thc: number;
  cbd: number;
  potencyUnit: "%" | "mg";
  price: number;
  size: string;
  effects: string[];
  inStock: boolean;
  staffPick?: boolean;
  medicalOnly?: boolean;
}
