import { CartItem } from './cartService';
import { User } from './authService';

export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  total: number;
  status: string;
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}

class OrderService {
  private orders: Order[] = [];

  constructor() {
    this.loadOrders();
  }

  private loadOrders(): void {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  private saveOrders(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  createOrder(user: User, items: CartItem[], shippingAddress: string, paymentMethod: string): Order {
    const order: Order = {
      id: `ORD-${Date.now()}`,
      user,
      items,
      total: items.reduce((total, item) => total + (item.product.price * item.quantity), 0),
      status: 'Pendiente',
      date: new Date().toISOString(),
      shippingAddress,
      paymentMethod
    };

    this.orders.push(order);
    this.saveOrders();
    return order;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrdersByUser(userId: number): Order[] {
    return this.orders.filter(order => order.user.id === userId);
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }
}

export default new OrderService();
