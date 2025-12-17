import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useCreateBooking } from '../hooks/useQueries';
import useBookingStore from '../stores/bookingStore';
import { COLORS } from '../constants/config';

export default function BookingScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tickets, setTickets] = useState('1');
  
  const { mutate: createBooking, isPending } = useCreateBooking();
  const addBooking = useBookingStore((state) => state.addBooking);

  const handleSubmit = () => {
    if (!name || !email || !phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const bookingData = {
      fullName: name,
      email,
      phone,
      tickets: parseInt(tickets),
    };

    createBooking(bookingData, {
      onSuccess: (data) => {
        addBooking(data);
        Alert.alert(
          'Succès! 🎉',
          `Réservation confirmée!\nCode: ${data.confirmation_code}`,
          [
            {
              text: 'Voir mes billets',
              onPress: () => navigation.navigate('MyBookings'),
            },
          ]
        );
        setName('');
        setEmail('');
        setPhone('');
        setTickets('1');
      },
      onError: (error) => {
        Alert.alert('Erreur', error.message || 'Erreur lors de la réservation');
      },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Réserver vos billets</Text>
        
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Votre nom"
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+212 6XX XXX XXX"
              keyboardType="phone-pad"
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de billets</Text>
            <TextInput
              style={styles.input}
              value={tickets}
              onChangeText={setTickets}
              keyboardType="number-pad"
              placeholderTextColor={COLORS.textLight}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isPending}
          >
            <Text style={styles.buttonText}>
              {isPending ? 'Envoi en cours...' : 'Confirmer la réservation'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 20 },
  form: { backgroundColor: COLORS.white, padding: 20, borderRadius: 15 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
  input: { borderWidth: 2, borderColor: '#E5E7EB', borderRadius: 10, padding: 15, fontSize: 16 },
  button: { backgroundColor: COLORS.accent, padding: 18, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: COLORS.white, fontSize: 18, fontWeight: 'bold' },
});
