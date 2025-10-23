export interface ProductCompleto {
  id: number;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number;
  image: string;
  images: string[];
  description: string;
  descripcion?: string;
  propiedades?: string[];
  usosRecomendados?: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  stock: number;
}
