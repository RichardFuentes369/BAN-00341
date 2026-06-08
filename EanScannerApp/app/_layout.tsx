import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router'; // Slot renderiza la ruta actual (TabLayout)
import LoadingScreen from '../components/LoadingScreen';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  if (!isReady) {
    return <LoadingScreen onFinish={() => setIsReady(true)} />;
  }

  return (
    <ThemeProvider>
      {/* Slot renderiza automáticamente lo que esté en tu app/TabLayout.tsx */}
      <Slot />
    </ThemeProvider>
  );
}