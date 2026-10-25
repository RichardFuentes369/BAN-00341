import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Feather from '@expo/vector-icons/Feather';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Empezamos un poco más pequeño

  useEffect(() => {
    // Animación de entrada combinada (Aparición + Escala suave)
    Animated.parallel([
      Animated.timing(fadeAnim, { 
        toValue: 1, 
        duration: 3000, 
        useNativeDriver: true 
      }),
      Animated.timing(scaleAnim, { 
        toValue: 1, 
        duration: 1000, 
        easing: Easing.out(Easing.back(1.5)), // Efecto rebote suave al final
        useNativeDriver: true 
      }),
    ]).start();

    // Finalizar tras 3.5 segundos (tiempo UX recomendado)
    const timer = setTimeout(onFinish, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient 
      colors={['#e6fcf5', '#c3fae8', '#96f2d7']} // Degradado verde menta muy suave y limpio
      style={styles.container}
    >
      <Animated.View style={[
        styles.content, 
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}>
        
        {/* Contenedor del Icono con Sombra */}
        <View style={styles.iconBackground}>
          <Feather name="box" size={50} color="#0ca678" /> 
        </View>

        {/* Título Moderno */}
        <Text style={styles.title}>
          <Text style={styles.brandTitle}>Mermas</Text> Scanner
        </Text>
        
        {/* Subtítulo Descriptivo */}
        <Text style={styles.subtitle}>Gestión eficiente de inventario</Text>

      </Animated.View>

      {/* Indicador de Carga y Texto de Estado en la parte inferior */}
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#0ca678" style={{ marginBottom: 10 }} />
        <Text style={styles.loadingText}>Preparando tu escáner...</Text>
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20
  },
  content: { 
    alignItems: 'center',
    marginBottom: 100 // Espacio para el footer
  },
  iconBackground: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 35,
    marginBottom: 25,
    // Sombras profesionales (iOS & Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, 
  },
  title: { 
    fontSize: 32, 
    fontWeight: '300', // Más ligero
    color: '#1c7c54',
    textAlign: 'center',
    letterSpacing: 0.5
  },
  brandTitle: {
    fontWeight: 'bold', // Resaltamos la marca
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontWeight: '400',
    textAlign: 'center'
  },
  footerContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center'
  },
  loadingText: {
    color: '#1c7c54',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8
  }
});