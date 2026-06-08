import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { ThemeProvider, useTheme } from '../../context/ThemeContext'; // Asegúrate de que esta ruta sea correcta
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// Botón para alternar el tema en el Header
function ThemeToggleBtn() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Text style={{ fontSize: 22 }}>{isDarkMode ? '☀️' : '🌙'}</Text>
    </TouchableOpacity>
  );
}

function StackLayoutContent() {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: true,
          headerRight: () => <ThemeToggleBtn />,
          headerStyle: {
            backgroundColor: isDarkMode ? '#121212' : '#ffffff',
          },
          headerTitle: () => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ 
                color: isDarkMode ? '#e0e0e0' : '#000000', 
                fontSize: 18, 
                fontWeight: 'bold' 
              }}>
                Mermas scanner
              </Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StackLayoutContent />
    </ThemeProvider>
  );
}