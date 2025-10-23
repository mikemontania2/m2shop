import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { Product, Category, Subcategory } from '../interfaces/interfaces';



class ProductService {
  private readProducts(): Product[] {
    const saved = localStorage.getItem('products');
    return saved ? (JSON.parse(saved) as Product[]) : (productsData as Product[]);
  }

  private writeProducts(list: Product[]): void {
    localStorage.setItem('products', JSON.stringify(list));
  }

  private readCategories(): Category[] {
    const saved = localStorage.getItem('categories');
    return saved ? (JSON.parse(saved) as Category[]) : (categoriesData as Category[]);
  }

  private writeCategories(list: Category[]): void {
    localStorage.setItem('categories', JSON.stringify(list));
  }

  getProducts(): Product[] {
    return this.readProducts();
  }

  getProductById(id: number): Product | undefined {
    return this.readProducts().find(p => p.id === id) as Product | undefined;
  }

  getProductsByCategory(category: string, subcategory?: string): Product[] {
    let products = this.readProducts().filter(p => p.category === category) as Product[];

    if (subcategory) {
      products = products.filter(p => p.subcategory === subcategory);
    }

    return products;
  }

  getFeaturedProducts(): Product[] {
    return this.readProducts().filter(p => p.featured) as Product[];
  }

  searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this.readProducts().filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(lowerQuery))
    ) as Product[];
  }

  getCategories(): Category[] {
    //return this.readCategories();
    return [];
  }

  getCategoryById(id: string): Category | undefined {
    return this.readCategories().find(c => c.id === id) as Category | undefined;
  }

  getSubcategoriesByCategory(categoryId: string): Subcategory[] {
    const category = this.getCategoryById(categoryId);
    return category?.subcategories || [];
  }

  // Mutations for admin (examples)
  upsertProduct(product: Product): void {
    const list = this.readProducts();
    const idx = list.findIndex(p => p.id === product.id);
    if (idx >= 0) list[idx] = product; else list.push(product);
    this.writeProducts(list);
  }

  deleteProduct(productId: number): void {
    const list = this.readProducts().filter(p => p.id !== productId);
    this.writeProducts(list);
  }

  upsertCategory(category: Category): void {
    const list = this.readCategories();
    const idx = list.findIndex(c => c.id === category.id);
    if (idx >= 0) list[idx] = category; else list.push(category);
    this.writeCategories(list);
  }

  deleteCategory(categoryId: string): void {
    const list = this.readCategories().filter(c => c.id !== categoryId);
    this.writeCategories(list);
  }
}

export default new ProductService();
