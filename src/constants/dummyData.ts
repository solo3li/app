export interface Service {
  id: string;
  name: string;
  duration: string;
  price: number;
  category: 'hair' | 'beard' | 'skin' | 'dye' | 'package' | 'extra';
}

export interface Barber {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  works: string[];
  availableTimes: string[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
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
  discount: number;
  image: string;
  validUntil: string;
}

const generateTimes = () => {
  const times = [];
  for (let i = 10; i <= 22; i++) {
    times.push(`${i > 12 ? i - 12 : i}:00 ${i >= 12 ? 'PM' : 'AM'}`);
    times.push(`${i > 12 ? i - 12 : i}:30 ${i >= 12 ? 'PM' : 'AM'}`);
  }
  // Randomly remove some times to simulate booked slots
  return times.filter(() => Math.random() > 0.3);
};

const extendedBarbers: Barber[] = [
  { id: 'b1', name: 'أحمد محمود', rating: 4.9, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', works: ['https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b2', name: 'طارق حسام', rating: 4.7, avatar: 'https://randomuser.me/api/portraits/men/44.jpg', works: ['https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b3', name: 'يوسف جمال', rating: 4.8, avatar: 'https://randomuser.me/api/portraits/men/68.jpg', works: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b4', name: 'كريم سعيد', rating: 4.5, avatar: 'https://randomuser.me/api/portraits/men/22.jpg', works: ['https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b5', name: 'مصطفى كمال', rating: 5.0, avatar: 'https://randomuser.me/api/portraits/men/55.jpg', works: ['https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b6', name: 'عمر ياسين', rating: 4.6, avatar: 'https://randomuser.me/api/portraits/men/11.jpg', works: ['https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b7', name: 'حسن علي', rating: 4.2, avatar: 'https://randomuser.me/api/portraits/men/33.jpg', works: ['https://images.unsplash.com/photo-1521590832167-7bfcbaa63640?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b8', name: 'وليد سامي', rating: 4.8, avatar: 'https://randomuser.me/api/portraits/men/77.jpg', works: ['https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b9', name: 'زياد طارق', rating: 4.9, avatar: 'https://randomuser.me/api/portraits/men/88.jpg', works: ['https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
  { id: 'b10', name: 'رامي ممدوح', rating: 4.4, avatar: 'https://randomuser.me/api/portraits/men/99.jpg', works: ['https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80'], availableTimes: generateTimes() },
];

const extendedServices: Service[] = [
  { id: 's1', name: 'قص شعر كلاسيك', duration: '30 min', price: 100, category: 'hair' },
  { id: 's2', name: 'تدريج (Fade)', duration: '45 min', price: 150, category: 'hair' },
  { id: 's3', name: 'قص أطفال', duration: '30 min', price: 80, category: 'hair' },
  { id: 's4', name: 'حلاقة دقن خفيفة', duration: '15 min', price: 50, category: 'beard' },
  { id: 's5', name: 'دقن بالبخار والفوطة الساخنة', duration: '30 min', price: 100, category: 'beard' },
  { id: 's6', name: 'تحديد دقن ليزر', duration: '20 min', price: 70, category: 'beard' },
  { id: 's7', name: 'تنظيف بشرة عميق (VIP)', duration: '45 min', price: 250, category: 'skin' },
  { id: 's8', name: 'ماسك فحم', duration: '15 min', price: 50, category: 'skin' },
  { id: 's9', name: 'ماسك ذهب', duration: '20 min', price: 100, category: 'skin' },
  { id: 's10', name: 'إزالة الرؤوس السوداء', duration: '20 min', price: 80, category: 'skin' },
  { id: 's11', name: 'صبغة شعر كاملة', duration: '60 min', price: 300, category: 'dye' },
  { id: 's12', name: 'إخفاء الشيب', duration: '30 min', price: 150, category: 'dye' },
  { id: 's13', name: 'صبغة لحية', duration: '30 min', price: 120, category: 'dye' },
  { id: 's14', name: 'باكدج العريس (شامل)', duration: '120 min', price: 1000, category: 'package' },
  { id: 's15', name: 'باكدج التوفير (قص + دقن + ماسك)', duration: '60 min', price: 250, category: 'package' },
  { id: 's16', name: 'غسيل واستشوار', duration: '20 min', price: 70, category: 'extra' },
  { id: 's17', name: 'بروتين فرد الشعر', duration: '120 min', price: 600, category: 'extra' },
  { id: 's18', name: 'مساج رأس', duration: '15 min', price: 100, category: 'extra' },
];

const extendedReviews: Review[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `r${i}`,
  userId: `u${i}`,
  userName: `مستخدم ${i + 1}`,
  userAvatar: `https://randomuser.me/api/portraits/men/${i % 100}.jpg`,
  rating: Math.floor(Math.random() * 2) + 4,
  barberRating: Math.floor(Math.random() * 2) + 4,
  qualityRating: Math.floor(Math.random() * 2) + 4,
  commitmentRating: Math.floor(Math.random() * 2) + 4,
  comment: ['خدمة ممتازة كالعادة', 'المكان نظيف جداً', 'الحلاق محترف لكن تأخر قليلاً', 'أفضل صالون في المنطقة', 'تجربة رائعة وتدريج عالمي'][Math.floor(Math.random() * 5)],
  date: new Date(Date.now() - Math.random() * 10000000000).toISOString()
}));

const shopNames = [
  'صالون المقص الذهبي', 'الرجل الأنيق', 'باربر شوب كلاسيك', 'صالون VIP للرجال', 'صالون النخبة', 
  'اللمسة السحرية', 'صالون الأبطال', 'صالون الشباب', 'تدريج احترافي', 'صالون العمدة',
  'لوردز باربرشوب', 'صالون الكينج', 'رويال للرجال', 'ذا جنتلمان', 'صالون ستايل',
  'صالون الأمراء', 'صالون الباشا', 'ذا ماستر باربر', 'ألفا باربرشوب', 'صالون الجوكر'
];

const locations = [
  'مدينة نصر، مكرم عبيد', 'مصر الجديدة، الكوربة', 'المعادي، شارع 9', 'التجمع الخامس، التسعين', 
  'الدقي، مصدق', 'المهندسين، جامعة الدول', 'الشيخ زايد، المحور', 'الرحاب، السوق القديم',
  'شبرا، الدوران', 'الهرم، المساحة'
];

const amenitiesList = ['WiFi', 'مكيف', 'مشروبات مجانية', 'موقف سيارات', 'موسيقى', 'PS5 انتظار', 'VIP Room', 'قهوة مختصة', 'مساج'];
const imagesList = [
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bfcbaa63640?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593702295094-aea22597af65?auto=format&fit=crop&w=800&q=80'
];

const extendedShops: Shop[] = Array.from({ length: 20 }).map((_, i) => {
  const shopBarbers = extendedBarbers.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
  const shopServices = extendedServices.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 10) + 8);
  const shopAmenities = amenitiesList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 4) + 2);
  const shopImages = imagesList.sort(() => 0.5 - Math.random()).slice(0, 3);
  const shopReviews = extendedReviews.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 10) + 5);
  
  return {
    id: `shop_${i}`,
    name: shopNames[i],
    subtitle: ['أحدث القصات العالمية', 'عناية متكاملة بالبشرة والشعر', 'خبراء التدريج', 'صالون فاخر', 'تجربة حلاقة لا تنسى'][Math.floor(Math.random() * 5)],
    rating: Number((Math.random() * 1 + 4).toFixed(1)), // 4.0 to 5.0
    reviewsCount: Math.floor(Math.random() * 500) + 50,
    distance: `${(Math.random() * 10 + 0.5).toFixed(1)} km`,
    location: locations[i % locations.length],
    lat: 30.0626 + (Math.random() * 0.1 - 0.05),
    lng: 31.3400 + (Math.random() * 0.1 - 0.05),
    images: shopImages,
    description: 'صالون مجهز بأحدث المعدات لتقديم أفضل خدمات الحلاقة والعناية بالرجل. نقدم تجربة متكاملة تبدأ من الاستقبال حتى الانتهاء من الحلاقة.',
    services: shopServices,
    barbers: shopBarbers,
    priceLevel: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)] as any,
    amenities: shopAmenities,
    reviews: shopReviews
  };
});

const extendedOffers: Offer[] = [
  { id: 'o1', title: 'خصم 20% على باكدج العريس', code: 'GROOM20', discount: 20, image: imagesList[0], validUntil: '2024-12-31' },
  { id: 'o2', title: 'أول حجز لك؟ احصل على تنظيف بشرة مجاناً', code: 'WELCOME', discount: 100, image: imagesList[1], validUntil: '2024-11-30' },
  { id: 'o3', title: 'خصم 50% على صبغة الشعر', code: 'COLOR50', discount: 50, image: imagesList[2], validUntil: '2024-10-15' },
  { id: 'o4', title: 'باكدج التوفير: قص ودقن بـ 120 جنيه فقط', code: 'SAVE120', discount: 30, image: imagesList[3], validUntil: '2024-09-30' },
  { id: 'o5', title: 'احجز مرتين واحصل على الثالثة مجاناً', code: 'FREE3', discount: 100, image: imagesList[4], validUntil: '2024-12-01' },
];

export const dummyData = {
  shops: extendedShops,
  offers: extendedOffers,
  barbers: extendedBarbers,
  services: extendedServices
};
