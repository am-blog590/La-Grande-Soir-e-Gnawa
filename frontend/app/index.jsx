import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Linking from 'expo-linking';

import HomeScreen from '../src/screens/HomeScreen.js';
import ArtistsScreen from '../src/screens/ArtistsScreen.js';
import ArtistDetailScreen from '../src/screens/ArtistDetailScreen.js';
import BookingScreen from '../src/screens/BookingScreen.js';
import MyBookingsScreen from '../src/screens/MyBookingsScreen.js';
import useBookingStore from '../src/stores/bookingStore.js';
import { COLORS } from '../src/constants/config.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const prefix = Linking.createURL('/');

function ArtistsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ArtistsList" 
        component={ArtistsScreen}
        options={{ title: 'Artistes', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }}
      />
      <Stack.Screen 
        name="ArtistDetail" 
        component={ArtistDetailScreen}
        options={{ title: 'Détails', headerStyle: { backgroundColor: COLORS.primary }, headerTintColor: COLORS.white }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const bookings = useBookingStore((state) => state.bookings);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: COLORS.white,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Accueil', tabBarLabel: 'Accueil', tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tab.Screen 
        name="Artists" 
        component={ArtistsStack}
        options={{ headerShown: false, tabBarLabel: 'Artistes', tabBarIcon: () => <Text>🎵</Text> }}
      />
      <Tab.Screen 
        name="Booking" 
        component={BookingScreen}
        options={{ title: 'Réserver', tabBarLabel: 'Réserver', tabBarIcon: () => <Text>🎫</Text> }}
      />
      {bookings.length > 0 && (
        <Tab.Screen 
          name="MyBookings" 
          component={MyBookingsScreen}
          options={{ 
            title: 'Mes Billets', 
            tabBarLabel: 'Mes Billets', 
            tabBarIcon: () => <Text>✅</Text>,
            tabBarBadge: bookings.length
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default function App() {
  const loadBookings = useBookingStore((state) => state.loadBookings);

  useEffect(() => {
    loadBookings();
  }, []);

  const linking = {
    prefixes: [prefix, 'gnawa://'],
    config: {
      screens: {
        Home: 'home',
        Artists: {
          screens: {
            ArtistsList: 'artists',
            ArtistDetail: 'artist/:artistId',
          },
        },
        Booking: 'booking',
        MyBookings: 'my-bookings',
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
        <MainTabs />
    </QueryClientProvider>
  );
}
