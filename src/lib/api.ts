export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  display_order: number;
}

export interface ProductDto {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  recommended_uses?: string;
  properties?: string;
  price: number;
  iva?: number;
  image_url: string;
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  discount_percent?: number;
  price_with_discount?: number;
}

export interface OrderCreateDto {
  customer_id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  items: Array<{ product_id: number; quantity: number }>;
}

export interface LoginDto { email: string; password: string }
export interface RegisterDto { firstName: string; lastName: string; email: string; phone?: string; password: string }

let authToken: string | null = null;

const json = (res: Response) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const Api = {
  setToken(token: string | null) { authToken = token },
  async listCategories(): Promise<CategoryDto[]> {
    return fetch('/api/categories').then(json);
  },
  async listProducts(params?: { category_slug?: string; is_featured?: boolean; is_new?: boolean; search?: string }): Promise<ProductDto[]> {
    const url = new URL('/api/products', window.location.origin);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (typeof v !== 'undefined' && v !== null && v !== '') {
          url.searchParams.set(k, String(v));
        }
      });
    }
    return fetch(url.toString()).then(json);
  },
  async listDiscounts(): Promise<any[]> {
    return fetch('/api/discounts').then(json);
  },
  // Orders listing for MyOrders page
  async listMyOrders(customerId: number) {
    return fetch(`/api/orders/my/${customerId}`).then(json);
  },
  async getProductBySlug(slug: string): Promise<ProductDto> {
    return fetch(`/api/products/slug/${slug}`).then(json);
  },
  async createOrder(payload: OrderCreateDto) {
    return fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}) },
      body: JSON.stringify(payload),
    }).then(json);
  },
  async login(payload: LoginDto) {
    const data = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(json);
    this.setToken(data.token);
    return data;
  },
  async register(payload: RegisterDto) {
    const data = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(json);
    this.setToken(data.token);
    return data;
  },
  async me() {
    if (!authToken) return null;
    return fetch('/api/auth/me', { headers: { Authorization: `Bearer ${authToken}` } }).then(json);
  }
};
