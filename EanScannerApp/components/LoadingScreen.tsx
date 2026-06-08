import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useFonts, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';
import { Ionicons } from '@expo/vector-icons';

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [text, setText] = useState('');
  const fullText = "Mermas scanner";
  const fadeAnim = useState(new Animated.Value(0))[0];

  let [fontsLoaded] = useFonts({ DancingScript_700Bold });

  useEffect(() => {
    if (!fontsLoaded) return;

    // Animación de aparición
    Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

    // Efecto de escritura
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(onFinish, 2000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        {/* Título */}
        <Text style={styles.title}>{text}</Text>
        
        {/* Icono de scanner */}
        <View style={styles.iconContainer}>
          <Ionicons name="barcode-outline" size={50} color="#eecfa1" />
        </View>

        {/* Indicador de carga */}
        <View style={styles.loadingDots}>
          <Text style={styles.dots}>. . .</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#0b1626' // Azul marino profundo de la imagen
  },
  title: { 
    color: '#eecfa1', // Color crema elegante de la imagen
    fontSize: 48,
    fontFamily: 'DancingScript_700Bold',
    textAlign: 'center',
    textShadowColor: 'rgba(238, 207, 161, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15
  },
  iconContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eecfa1',
    borderRadius: 50
  },
  loadingDots: {
    marginTop: 30
  },
  dots: {
    color: '#eecfa1',
    fontSize: 24,
    letterSpacing: 5
  }
});