import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useArtists } from '../hooks/useQueries';
import { COLORS } from '../constants/config';

export default function ArtistsScreen({ navigation }) {
  const { data: artists, isLoading } = useArtists();

  const renderArtist = ({ item }) => (
    <TouchableOpacity 
      style={styles.artistCard}
      onPress={() => navigation.navigate('ArtistDetail', { artistId: item.id })}
    >
      <Image source={{ uri: item.photo }} style={styles.artistPhoto} />
      <View style={styles.artistInfo}>
        <Text style={styles.artistName}>{item.name}</Text>
        <Text style={styles.artistBio} numberOfLines={2}>{item.bio}</Text>
        <Text style={styles.performance}>⏰ {item.performance_time}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={artists}
        renderItem={renderArtist}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 15 },
  artistCard: { backgroundColor: COLORS.white, borderRadius: 15, marginBottom: 15, flexDirection: 'row', overflow: 'hidden' },
  artistPhoto: { width: 100, height: 100 },
  artistInfo: { flex: 1, padding: 15 },
  artistName: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 5 },
  artistBio: { fontSize: 14, color: COLORS.textLight, marginBottom: 8 },
  performance: { fontSize: 14, color: COLORS.primary, fontWeight: 'bold' },
});