import { create } from 'zustand';
import { Shop, Barber, Service } from '../constants/dummyData';

export interface Booking {
  id: string;
  shop: Shop;
  barber: Barber;
  services: Service[];
  time: string; // e.g. "10:00 AM"
  date: string; // ISO date
  paymentMethod: 'cash' | 'online' | 'deposit';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  totalPrice: number;
}

interface BookingState {
  // Wizard State
  selectedShop: Shop | null;
  selectedBarber: Barber | null;
  selectedServices: Service[];
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedPaymentMethod: 'cash' | 'online' | 'deposit' | null;

  // History State
  bookingHistory: Booking[];

  // Actions
  setShop: (shop: Shop) => void;
  setBarber: (barber: Barber) => void;
  toggleService: (service: Service) => void;
  setDate: (date: Date) => void;
  setTime: (time: string) => void;
  setPaymentMethod: (method: 'cash' | 'online' | 'deposit') => void;
  
  confirmBooking: () => void;
  resetWizard: () => void;
  cancelBooking: (bookingId: string) => void;
  rebook: (booking: Booking) => void; // Populates wizard from old booking
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedShop: null,
  selectedBarber: null,
  selectedServices: [],
  selectedDate: null,
  selectedTime: null,
  selectedPaymentMethod: null,
  
  // Dummy initial history
  bookingHistory: [],

  setShop: (shop) => set({ selectedShop: shop, selectedBarber: null, selectedServices: [], selectedTime: null }),
  setBarber: (barber) => set({ selectedBarber: barber, selectedTime: null }),
  
  toggleService: (service) => set((state) => {
    const exists = state.selectedServices.find(s => s.id === service.id);
    if (exists) {
      return { selectedServices: state.selectedServices.filter(s => s.id !== service.id) };
    }
    return { selectedServices: [...state.selectedServices, service] };
  }),

  setDate: (date) => set({ selectedDate: date }),
  setTime: (time) => set({ selectedTime: time }),
  setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  confirmBooking: () => set((state) => {
    if (!state.selectedShop || !state.selectedBarber || state.selectedServices.length === 0 || !state.selectedTime || !state.selectedDate || !state.selectedPaymentMethod) {
      return state; // Should not happen if UI validation is correct
    }

    const totalPrice = state.selectedServices.reduce((sum, s) => sum + s.price, 0);

    const newBooking: Booking = {
      id: 'bkg_' + Math.random().toString(36).substr(2, 9),
      shop: state.selectedShop,
      barber: state.selectedBarber,
      services: state.selectedServices,
      time: state.selectedTime,
      date: state.selectedDate.toISOString(),
      paymentMethod: state.selectedPaymentMethod,
      status: 'Upcoming',
      totalPrice,
    };

    return {
      bookingHistory: [newBooking, ...state.bookingHistory],
      // Reset wizard
      selectedShop: null,
      selectedBarber: null,
      selectedServices: [],
      selectedDate: null,
      selectedTime: null,
      selectedPaymentMethod: null,
    };
  }),

  resetWizard: () => set({
    selectedShop: null,
    selectedBarber: null,
    selectedServices: [],
    selectedDate: null,
    selectedTime: null,
    selectedPaymentMethod: null,
  }),

  cancelBooking: (bookingId) => set((state) => ({
    bookingHistory: state.bookingHistory.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    )
  })),

  rebook: (booking) => set({
    selectedShop: booking.shop,
    selectedBarber: booking.barber,
    selectedServices: booking.services,
    selectedDate: new Date(), // Default to today
    selectedTime: null, // User must pick new time
    selectedPaymentMethod: booking.paymentMethod,
  })
}));
