import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventInfo, getArtists, getArtistById, createBooking, getBookingsByEmail } from '../services/api';

export const useEvent = () => {
  return useQuery({
    queryKey: ['event'],
    queryFn: getEventInfo,
    staleTime: 1000 * 60 * 30, 
  });
};

export const useArtists = () => {
  return useQuery({
    queryKey: ['artists'],
    queryFn: getArtists,
    staleTime: 1000 * 60 * 15, 
  });
};

export const useArtist = (id) => {
  return useQuery({
    queryKey: ['artist', id],
    queryFn: () => getArtistById(id),
    enabled: !!id,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

export const useUserBookings = (email) => {
  return useQuery({
    queryKey: ['bookings', email],
    queryFn: () => getBookingsByEmail(email),
    enabled: !!email,
  });
};
