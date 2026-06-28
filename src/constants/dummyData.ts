export const dummyData = {
  shops: [
    {
      id: '1',
      name: 'The Daily Grind',
      subtitle: 'Classic Cuts & Shaves',
      rating: 4.9,
      reviews: 120,
      distance: '1.2 km',
      image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Experience the ultimate grooming session in a vintage atmosphere. The Daily Grind offers precision cuts, hot towel shaves, and top-tier customer service.',
      services: ['Haircut', 'Hot Towel Shave', 'Beard Trim'],
      priceLevel: '$$$',
    },
    {
      id: '2',
      name: "Razor's Edge",
      subtitle: 'Hot Towel Shave',
      rating: 4.8,
      reviews: 95,
      distance: '2.5 km',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Precision fading and classic styling in a relaxed, old-school environment.',
      services: ['Haircut', 'Fade', 'Line Up'],
      priceLevel: '$$',
    },
    {
      id: '3',
      name: 'Gentleman\'s Quarters',
      subtitle: 'Premium Grooming',
      rating: 5.0,
      reviews: 310,
      distance: '3.0 km',
      image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Luxury grooming services for the modern gentleman.',
      services: ['Haircut', 'Facial', 'Coloring'],
      priceLevel: '$$$$',
    }
  ],
  services: [
    { id: 's1', name: 'Classic Haircut', duration: '30 min', price: '$35' },
    { id: 's2', name: 'Hot Towel Shave', duration: '45 min', price: '$40' },
    { id: 's3', name: 'Beard Trim & Shape', duration: '20 min', price: '$25' },
    { id: 's4', name: 'Executive Package', duration: '75 min', price: '$85' },
    { id: 's5', name: 'Skin Care Facial', duration: '30 min', price: '$50' }
  ],
  barbers: [
    { id: 'b1', name: 'Arthur', rating: 4.9, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'b2', name: 'Thomas', rating: 4.7, avatar: 'https://randomuser.me/api/portraits/men/44.jpg' },
    { id: 'b3', name: 'John', rating: 4.8, avatar: 'https://randomuser.me/api/portraits/men/68.jpg' }
  ],
  offers: [
    {
      id: 'o1',
      title: 'First Timers: 20% Off Shave & Cut',
      code: 'WELCOME20'
    }
  ]
};
