import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router'; 
import LoadingScreen from '../components/LoadingScreen';
import * as SplashScreen from 'expo-splash-screen';

// 1. Mantenemos esto para evitar destellos blancos antes del render
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 2. Ocultamos el Splash nativo APENAS el layout se monta.
    // Esto libera la pantalla para que tu LoadingScreen sea la protagonista.
    async function hideNative() {
      await SplashScreen.hideAsync();
    }
    hideNative();
  }, []);

  // 3. Tu pantalla de carga personalizada toma el control total
  if (!isReady) {
    return <LoadingScreen onFinish={() => setIsReady(true)} />;
  }

  // 4. App lista
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}