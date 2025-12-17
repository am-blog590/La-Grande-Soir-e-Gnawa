import axios from 'axios';
import { API_BASE_URL } from '../constants/config';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEventInfo = async () => {
  const response = await api.get('/event');
  return response.data;
};

export const getArtists = async () => {
  const response = await api.get('/artists');
  return response.data;
};

export const getArtistById = async (id) => {
  const response = await api.get(`/artists/${id}`);
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export const getBookingByCode = async (code) => {
  const response = await api.get(`/bookings/${code}`);
  return response.data;
};

export const getBookingsByEmail = async (email) => {
  const response = await api.get(`/bookings/email/${email}`);
  return response.data;
};

export default api;
