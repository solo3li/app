import { create } from 'zustand';

interface BookingState {
  selectedShop: any | null;
  selectedBarber: any | null;
  selectedService: any | null;
  selectedTime: string | null;
  bookingHistory: any[];
  setShop: (shop: any) => void;
  setBarber: (barber: any) => void;
  setService: (service: any) => void;
  setTime: (time: string) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedShop: null,
  selectedBarber: null,
  selectedService: null,
  selectedTime: null,
  bookingHistory: [],
  setShop: (shop) => set({ selectedShop: shop }),
  setBarber: (barber) => set({ selectedBarber: barber }),
  setService: (service) => set({ selectedService: service }),
  setTime: (time) => set({ selectedTime: time }),
  confirmBooking: () => set((state) => {
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      shop: state.selectedShop,
      barber: state.selectedBarber,
      service: state.selectedService,
      time: state.selectedTime,
      date: new Date().toISOString(),
      status: 'Confirmed'
    };
    return {
      bookingHistory: [newBooking, ...state.bookingHistory],
      selectedShop: null,
      selectedBarber: null,
      selectedService: null,
      selectedTime: null,
    };
  }),
  resetBooking: () => set({
    selectedShop: null,
    selectedBarber: null,
    selectedService: null,
    selectedTime: null,
  }),
}));
