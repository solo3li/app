export interface Service {
  id: string;
  name: string;
  duration: string; // e.g. "30 min"
  price: number;
  category: 'hair' | 'beard' | 'skin' | 'dye' | 'package' | 'extra';
}

export interface Barber {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  works: string[]; // URLs to images of their work
  availableTimes: string[]; // e.g. ["10:00 AM", "11:30 AM"]
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number; // overall
  barberRating: number;
  qualityRating: number;
  commitmentRating: number;
  comment: string;
  date: string;
}

export interface Shop {
  id: string;
  name: string;
  subtitle: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  location: string;
  lat: number;
  lng: number;
  images: string[];
  description: string;
  services: Service[];
  barbers: Barber[];
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  amenities: string[];
  reviews: Review[];
}

export interface Offer {
  id: string;
  title: string;
  code: string;
  discount: number; // percentage
  image: string;
  validUntil: string;
}

const defaultBarbers: Barber[] = [
  {
    id: 'b1',
    name: 'Ahmed',
    rating: 4.9,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    works: [
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80'
    ],
    availableTimes: ['10:00 AM', '11:00 AM', '02:00 PM', '04:30 PM']
  },
  {
    id: 'b2',
    name: 'Tarek',
    rating: 4.7,
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    works: [
      'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80'
    ],
    availableTimes: ['01:00 PM', '03:00 PM', '06:00 PM']
  },
  {
    id: 'b3',
    name: 'Youssef',
    rating: 4.8,
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
    works: [
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80'
    ],
    availableTimes: ['09:00 AM', '12:30 PM', '05:00 PM', '07:00 PM']
  }
];

const defaultServices: Service[] = [
  { id: 's1', name: 'قص شعر كلاسيك', duration: '30 min', price: 100, category: 'hair' },
  { id: 's2', name: 'تدريج (Fade)', duration: '45 min', price: 150, category: 'hair' },
  { id: 's3', name: 'حلاقة دقن', duration: '20 min', price: 50, category: 'beard' },
  { id: 's4', name: 'دقن بالبخار والفوطة الساخنة', duration: '30 min', price: 80, category: 'beard' },
  { id: 's5', name: 'تنظيف بشرة عميق', duration: '45 min', price: 200, category: 'skin' },
  { id: 's6', name: 'ماسك فحم', duration: '15 min', price: 40, category: 'skin' },
  { id: 's7', name: 'صبغة شعر', duration: '60 min', price: 300, category: 'dye' },
  { id: 's8', name: 'باكدج العريس (VIP)', duration: '120 min', price: 800, category: 'package' },
  { id: 's9', name: 'غسيل واستشوار', duration: '20 min', price: 70, category: 'extra' },
];

const defaultReviews: Review[] = [
  {
    id: 'r1',
    userId: 'u1',
    userName: 'Kareem Ali',
    userAvatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
    barberRating: 5,
    qualityRating: 5,
    commitmentRating: 5,
    comment: 'شغل ممتاز جداً ومواعيد مظبوطة بالدقيقة.',
    date: '2023-10-12T10:00:00Z'
  },
  {
    id: 'r2',
    userId: 'u2',
    userName: 'Omar Hassan',
    userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 4,
    barberRating: 5,
    qualityRating: 4,
    commitmentRating: 4,
    comment: 'الحلاق شاطر بس المحل كان زحمة شوية.',
    date: '2023-10-10T14:30:00Z'
  }
];

export const dummyData = {
  shops: [
    {
      id: '1',
      name: 'The Daily Grind (كلاسيك)',
      subtitle: 'قصات كلاسيكية وعناية بالدقن',
      rating: 4.9,
      reviewsCount: 120,
      distance: '1.2 km',
      location: 'مدينة نصر، شارع مكرم عبيد',
      lat: 30.0626,
      lng: 31.3400,
      images: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'استمتع بتجربة حلاقة كلاسيكية في جو هادئ. نقدم خدمات حلاقة الشعر، الدقن بالفوطة الساخنة، وتنظيف البشرة.',
      services: defaultServices.slice(0, 5),
      barbers: defaultBarbers,
      priceLevel: '$$',
      amenities: ['WiFi', 'مكيف', 'مشروبات مجانية', 'موقف سيارات'],
      reviews: defaultReviews
    },
    {
      id: '2',
      name: "Razor's Edge (شبابي)",
      subtitle: 'أحدث القصات والتدريج',
      rating: 4.7,
      reviewsCount: 95,
      distance: '2.5 km',
      location: 'المعادي، شارع 9',
      lat: 29.9602,
      lng: 31.2612,
      images: [
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'متخصصون في التدريج والقصات الشبابية الحديثة.',
      services: [defaultServices[1], defaultServices[2], defaultServices[6], defaultServices[8]],
      barbers: [defaultBarbers[1], defaultBarbers[2]],
      priceLevel: '$',
      amenities: ['WiFi', 'موسيقى', 'PS5 انتظار'],
      reviews: [defaultReviews[0]]
    },
    {
      id: '3',
      name: 'VIP Gentleman Lounge',
      subtitle: 'عناية فائقة للرجال',
      rating: 5.0,
      reviewsCount: 310,
      distance: '3.0 km',
      location: 'التجمع الخامس، شارع التسعين',
      lat: 30.0166,
      lng: 31.4285,
      images: [
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521590832167-7bfcbaa63640?auto=format&fit=crop&w=800&q=80'
      ],
      description: 'صالون حلاقة فاخر يقدم تجربة عناية متكاملة للرجال من قص وتلوين وتنظيف بشرة.',
      services: defaultServices,
      barbers: defaultBarbers,
      priceLevel: '$$$$',
      amenities: ['WiFi', 'VIP Room', 'قهوة مختصة', 'مساج'],
      reviews: defaultReviews
    }
  ] as Shop[],
  offers: [
    {
      id: 'o1',
      title: 'خصم 20% على باكدج العريس',
      code: 'GROOM20',
      discount: 20,
      image: 'https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=800&q=80',
      validUntil: '2023-12-31'
    },
    {
      id: 'o2',
      title: 'أول حجز لك؟ احصل على تنظيف بشرة مجاناً',
      code: 'WELCOME',
      discount: 100,
      image: 'https://images.unsplash.com/photo-1521590832167-7bfcbaa63640?auto=format&fit=crop&w=800&q=80',
      validUntil: '2023-11-30'
    }
  ] as Offer[]
};
