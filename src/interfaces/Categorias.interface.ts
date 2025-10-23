
export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  bannerUrl: string;
  subcategories: Subcategory[];
}