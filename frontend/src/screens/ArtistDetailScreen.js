import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useArtist } from '../hooks/useQueries';
import { COLORS } from '../constants/config';

export default function ArtistDetailScreen({ route, navigation }) {
  const { artistId } = route.params;
  const { data: artist, isLoading } = useArtist(artistId);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: artist?.photo }} style={styles.banner} />
      
      <View style={styles.content}>
        <Text style={styles.name}>{artist?.name}</Text>
        <Text style={styles.performance}>⏰ {artist?.performance_time}</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Biographie</Text>
          <Text style={styles.bio}>{artist?.bio}</Text>
        </View>

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={styles.bookButtonText}>Réserver un billet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  banner: { width: '100%', height: 300 },
  content: { padding: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 10 },
  performance: { fontSize: 18, color: COLORS.primary, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: COLORS.white, padding: 20, borderRadius: 15, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  bio: { fontSize: 16, color: COLORS.textLight, lineHeight: 24 },
  bookButton: { backgroundColor: COLORS.accent, padding: 18, borderRadius: 15, alignItems: 'center' },
  bookButtonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});
