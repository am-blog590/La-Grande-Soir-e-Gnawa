import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import useBookingStore from '../stores/bookingStore';
import { useUserBookings } from '../hooks/useQueries';
import { COLORS } from '../constants/config';

export default function MyBookingsScreen() {
  const bookings = useBookingStore((state) => state.bookings);
  const userEmail = useBookingStore((state) => state.userEmail);
  const loadBookings = useBookingStore((state) => state.loadBookings);

  useEffect(() => {
    loadBookings();
  }, []);

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.codeHeader}>
        <Text style={styles.codeLabel}>Code de confirmation</Text>
        <Text style={styles.code}>{item.confirmation_code}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>👤 {item.fullName}</Text>
        <Text style={styles.detailText}>📧 {item.email}</Text>
        <Text style={styles.detailText}>📱 {item.phone}</Text>
        <Text style={styles.detailText}>🎫 {item.tickets} billet(s)</Text>
      </View>
    </View>
  );

  if (bookings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎫</Text>
        <Text style={styles.emptyText}>Aucune réservation</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={(item) => item.id?.toString() || item.confirmation_code}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 10 },
  emptyText: { fontSize: 18, color: COLORS.textLight },
  list: { padding: 15 },
  bookingCard: { backgroundColor: COLORS.white, borderRadius: 15, marginBottom: 15, overflow: 'hidden' },
  codeHeader: { backgroundColor: COLORS.purple, padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  codeLabel: { color: COLORS.white, fontSize: 14, fontWeight: 'bold' },
  code: { color: COLORS.white, fontSize: 20, fontWeight: 'bold', letterSpacing: 2 },
  details: { padding: 15 },
  detailText: { fontSize: 16, color: COLORS.text, marginBottom: 8 },
});
