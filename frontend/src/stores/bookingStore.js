import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useBookingStore = create((set, get) => ({
  bookings: [],
  userEmail: null,

  loadBookings: async () => {
    try {
      const stored = await AsyncStorage.getItem('bookings');
      const email = await AsyncStorage.getItem('userEmail');
      if (stored) {
        set({ bookings: JSON.parse(stored), userEmail: email });
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  },

  addBooking: async (booking) => {
    const newBookings = [...get().bookings, booking];
    set({ bookings: newBookings, userEmail: booking.email });
    try {
      await AsyncStorage.setItem('bookings', JSON.stringify(newBookings));
      await AsyncStorage.setItem('userEmail', booking.email);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  },

  clearBookings: async () => {
    set({ bookings: [], userEmail: null });
    try {
      await AsyncStorage.removeItem('bookings');
      await AsyncStorage.removeItem('userEmail');
    } catch (error) {
      console.error('Error clearing bookings:', error);
    }
  },
}));

export default useBookingStore;
