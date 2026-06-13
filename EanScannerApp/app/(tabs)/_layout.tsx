import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, BackHandler } from 'react-native';
import { ThemeProvider, useTheme } from '../../context/ThemeContext'; // Asegúrate de que esta ruta sea correcta
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// Botón para alternar el tema en el Header
function ThemeToggleBtn() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <TouchableOpacity onPress={toggleTheme} style={ [styles.darkButton, {marginLeft: 15}] }>
      <Feather 
        name={isDarkMode ? "sun" : "moon"} 
        size={22} 
        color={isDarkMode ? "#FFD700" : "#333333"}
      />
    </TouchableOpacity>
  );
}

function ExitBtn() {
  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <TouchableOpacity onPress={handleExit} style={[styles.darkButton, { marginRight: 15 }]}>
      <Feather 
        name="power" 
        size={22} 
        color="#ac0404" 
      />
    </TouchableOpacity>
  );
}

function StackLayoutContent() {
  const { isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: 0, backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: true,
          headerLeft: () => <ThemeToggleBtn />,
          headerRight: () => <ExitBtn />,
          headerStyle: {
            backgroundColor: isDarkMode ? '#121212' : '#ffffff',
          },
          headerTitle: () => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ 
                color: isDarkMode ? '#e0e0e0' : '#000000', 
                fontSize: 20, 
                fontWeight: 'bold', 
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

const styles = StyleSheet.create({
  darkButton: {  },
});