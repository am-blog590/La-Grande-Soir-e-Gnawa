import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useEvent } from '../hooks/useQueries';
import { COLORS } from '../constants/config';
import useBookingStore from '../stores/bookingStore';

export default function HomeScreen({ navigation }) {
    const { data: event, isLoading, error } = useEvent();
    const bookings = useBookingStore((state) => state.bookings);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Erreur de chargement</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: event?.image || 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800' }}
                style={styles.banner}
            />

            <View style={styles.content}>
                <Text style={styles.title}>{event?.title || 'La Grande Soirée Gnawa'}</Text>
                <Text style={styles.date}>📅 {event?.date}</Text>
                <Text style={styles.location}>📍 {event?.location}</Text>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>À propos</Text>
                    <Text style={styles.description}>{event?.description}</Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={() => navigation.navigate('Artists')}
                    >
                        <Text style={styles.buttonIcon}>🎵</Text>
                        <Text style={styles.buttonText}>Artistes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.accentButton]}
                        onPress={() => navigation.navigate('Booking')}
                    >
                        <Text style={styles.buttonIcon}>🎫</Text>
                        <Text style={styles.buttonText}>Réserver</Text>
                    </TouchableOpacity>
                </View>

                {bookings.length > 0 && (
                    <TouchableOpacity
                        style={styles.bookingsButton}
                        onPress={() => navigation.navigate('MyBookings')}
                    >
                        <Text style={styles.bookingsButtonText}>
                            ✅ Mes Réservations ({bookings.length})
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    banner: { width: '100%', height: 250 },
    content: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
    date: { fontSize: 16, color: COLORS.textLight, marginBottom: 5 },
    location: { fontSize: 16, color: COLORS.textLight, marginBottom: 20 },
    card: { backgroundColor: COLORS.white, padding: 20, borderRadius: 15, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
    cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    description: { fontSize: 16, color: COLORS.textLight, lineHeight: 24 },
    buttonRow: { flexDirection: 'row', gap: 15, marginBottom: 15 },
    button: { flex: 1, padding: 20, borderRadius: 15, alignItems: 'center' },
    primaryButton: { backgroundColor: COLORS.primary },
    accentButton: { backgroundColor: COLORS.accent },
    buttonIcon: { fontSize: 32, marginBottom: 8 },
    buttonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    bookingsButton: { backgroundColor: COLORS.purple, padding: 15, borderRadius: 15, alignItems: 'center' },
    bookingsButtonText: { color: COLORS.white, fontSize: 16, fontWeight: 'bold' },
    errorText: { fontSize: 16, color: COLORS.error },
});
