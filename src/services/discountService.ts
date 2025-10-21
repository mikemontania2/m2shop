import productsData from '../data/products.json';

export interface Discount {
  id: string;
  name: string;
  percentage: number; // 0-100
  active: boolean;
  productIds?: number[]; // optional product scoping
}

class DiscountService {
  private readDiscounts(): Discount[] {
    const saved = localStorage.getItem('discounts');
    return saved ? (JSON.parse(saved) as Discount[]) : [];
  }

  private writeDiscounts(list: Discount[]): void {
    localStorage.setItem('discounts', JSON.stringify(list));
  }

  getDiscounts(): Discount[] {
    return this.readDiscounts();
  }

  upsertDiscount(discount: Discount): void {
    const list = this.readDiscounts();
    const idx = list.findIndex(d => d.id === discount.id);
    if (idx >= 0) list[idx] = discount; else list.push(discount);
    this.writeDiscounts(list);
  }

  deleteDiscount(id: string): void {
    const list = this.readDiscounts().filter(d => d.id !== id);
    this.writeDiscounts(list);
  }
}

export default new DiscountService();
