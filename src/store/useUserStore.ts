import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'offer' | 'reminder' | 'booking' | 'system';
}

interface UserState {
  user: User | null;
  favoriteShopIds: string[];
  notifications: Notification[];
  isLoggedIn: boolean;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  toggleFavorite: (shopId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  favoriteShopIds: [],
  notifications: [
    {
      id: 'n1',
      title: 'أهلاً بك في بربر!',
      message: 'استمتع بأفضل خدمات الحلاقة في منطقتك.',
      date: new Date().toISOString(),
      read: false,
      type: 'system'
    }
  ],
  isLoggedIn: false,
  
  login: (phone, name = 'مستخدم جديد') => set({
    user: {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name,
      phone,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    isLoggedIn: true
  }),
  
  logout: () => set({ user: null, isLoggedIn: false, favoriteShopIds: [] }),
  
  toggleFavorite: (shopId) => set((state) => {
    const isFav = state.favoriteShopIds.includes(shopId);
    return {
      favoriteShopIds: isFav 
        ? state.favoriteShopIds.filter(id => id !== shopId)
        : [...state.favoriteShopIds, shopId]
    };
  }),

  addNotification: (notif) => set((state) => ({
    notifications: [
      {
        ...notif,
        id: 'n_' + Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        read: false
      },
      ...state.notifications
    ]
  })),

  markNotificationRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    )
  }))
}));
