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
  walletBalance: number;
  loyaltyPoints: number;
  referralCode: string;
  wishlistProductIds: string[];
  isDarkMode: boolean;
  language: 'ar' | 'en';
  isLoggedIn: boolean;
  login: (phone: string, name?: string) => void;
  logout: () => void;
  toggleFavorite: (shopId: string) => void;
  toggleProductWishlist: (productId: string) => void;
  toggleTheme: () => void;
  setLanguage: (lang: 'ar' | 'en') => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: 'u_dummy',
    name: 'مستخدم تجريبي',
    phone: '01012345678',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  walletBalance: 350.50,
  loyaltyPoints: 1200,
  referralCode: 'SAVO2026',
  wishlistProductIds: ['p1', 'p3'],
  isDarkMode: false,
  language: 'ar',
  favoriteShopIds: ['shop_0', 'shop_2'],
  notifications: [
    {
      id: 'n1',
      title: 'أهلاً بك في بربر!',
      message: 'استمتع بأفضل خدمات الحلاقة في منطقتك.',
      date: new Date().toISOString(),
      read: false,
      type: 'system'
    },
    {
      id: 'n2',
      title: 'خصم خاص لك 🎁',
      message: 'استخدم كود WELCOME للحصول على خصم 20% على حجزك القادم!',
      date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false,
      type: 'offer'
    },
    {
      id: 'n3',
      title: 'تأكيد الحجز ✔️',
      message: 'تم تأكيد حجزك مع الحلاق أحمد محمود غداً الساعة 02:00 PM.',
      date: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      read: true,
      type: 'booking'
    },
    {
      id: 'n4',
      title: 'تذكير بموعدك ⏰',
      message: 'موعدك اليوم في صالون "الرجل الأنيق" يبدأ خلال ساعتين.',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      read: true,
      type: 'reminder'
    },
    {
      id: 'n5',
      title: 'كيف كانت تجربتك؟ ⭐',
      message: 'الرجاء تقييم زيارتك الأخيرة لصالون "المقص الذهبي" لمساعدتنا على تحسين الخدمة.',
      date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      read: false,
      type: 'system'
    },
    {
      id: 'n6',
      title: 'عرض الويك إند 🔥',
      message: 'احجز الآن واستفد من خصم 50% على تنظيف البشرة العميق.',
      date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      read: true,
      type: 'offer'
    },
    {
      id: 'n7',
      title: 'إلغاء حجز ❌',
      message: 'تم إلغاء حجزك بناءً على طلبك. نأمل رؤيتك قريباً.',
      date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      read: true,
      type: 'booking'
    },
    {
      id: 'n8',
      title: 'حلاقك المفضل متاح ✂️',
      message: 'الحلاق طارق حسام لديه مواعيد متاحة اليوم، احجز الآن!',
      date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
      read: true,
      type: 'reminder'
    },
    {
      id: 'n9',
      title: 'صالون جديد انضم إلينا! 📍',
      message: 'تم افتتاح صالون "ذا ماستر باربر" بالقرب منك، تصفح خدماتهم الآن.',
      date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 days ago
      read: true,
      type: 'system'
    },
    {
      id: 'n10',
      title: 'نقاط الولاء 🌟',
      message: 'لقد حصلت على 50 نقطة من حجزك الأخير. استخدمها لخصومات إضافية!',
      date: new Date(Date.now() - 86400000 * 14).toISOString(), // 14 days ago
      read: true,
      type: 'offer'
    }
  ],
  isLoggedIn: true,
  
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

  toggleProductWishlist: (productId) => set((state) => {
    const isWished = state.wishlistProductIds.includes(productId);
    return {
      wishlistProductIds: isWished
        ? state.wishlistProductIds.filter(id => id !== productId)
        : [...state.wishlistProductIds, productId]
    };
  }),

  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  
  setLanguage: (lang) => set({ language: lang }),

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
