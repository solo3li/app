import { create } from 'zustand';
import { Product, BundleOffer } from '../constants/dummyData';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  trackingSteps: { title: string; date: string; completed: boolean }[];
}

interface ShopState {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
}

export const useShopStore = create<ShopState>((set) => ({
  cart: [],
  orders: [
    {
      id: 'ord_123',
      items: [], // Mocking past items if needed
      totalAmount: 250,
      status: 'shipped',
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      trackingSteps: [
        { title: 'تم استلام الطلب', date: new Date(Date.now() - 86400000 * 2).toISOString(), completed: true },
        { title: 'قيد التجهيز', date: new Date(Date.now() - 86400000 * 1.5).toISOString(), completed: true },
        { title: 'تم الشحن', date: new Date(Date.now() - 86400000 * 0.5).toISOString(), completed: true },
        { title: 'في الطريق إليك', date: '', completed: false },
        { title: 'تم التوصيل', date: '', completed: false },
      ]
    }
  ],

  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.cart.find(item => item.product.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      };
    }
    return { cart: [...state.cart, { id: 'ci_' + Date.now(), product, quantity }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.product.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item => item.product.id === productId ? { ...item, quantity } : item)
  })),

  clearCart: () => set({ cart: [] }),

  placeOrder: () => set((state) => {
    if (state.cart.length === 0) return state;
    
    const totalAmount = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const newOrder: Order = {
      id: 'ord_' + Math.random().toString(36).substr(2, 9),
      items: [...state.cart],
      totalAmount,
      status: 'pending',
      date: new Date().toISOString(),
      trackingSteps: [
        { title: 'تم استلام الطلب', date: new Date().toISOString(), completed: true },
        { title: 'قيد التجهيز', date: '', completed: false },
        { title: 'تم الشحن', date: '', completed: false },
        { title: 'في الطريق إليك', date: '', completed: false },
        { title: 'تم التوصيل', date: '', completed: false },
      ]
    };

    return {
      orders: [newOrder, ...state.orders],
      cart: []
    };
  })
}));
