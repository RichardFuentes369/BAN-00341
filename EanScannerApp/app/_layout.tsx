import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router'; 
import LoadingScreen from '../components/LoadingScreen';
import * as SplashScreen from 'expo-splash-screen';

// Mantenemos el splash nativo visible hasta que estemos listos
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  // Cuando la app termina de cargar (isReady cambia a true), ocultamos el splash
  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Si no está listo, mostramos la pantalla de carga (LoadingScreen)
  if (!isReady) {
    return <LoadingScreen onFinish={() => setIsReady(true)} />;
  }

  // Si está listo, renderizamos el contenido real
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}