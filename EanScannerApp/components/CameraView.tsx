import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { CameraView, CameraViewProps } from 'expo-camera';
import { Feather } from '@expo/vector-icons';
import { Text } from '@react-navigation/elements';

interface CameraComponentProps {
  onScanned: (data: string) => void;
  isEnabled: boolean;
  flash: boolean;
  isConnected: boolean; // <-- Nueva prop
  urlConnected: string; 
  onCameraReady?: () => void;
}

export default function CameraComponent({
  onScanned,
  isEnabled,
  flash,
  isConnected,
  urlConnected,
  onCameraReady
}: CameraComponentProps) {

  if (!isEnabled) {
    return (
      <View style={styles.disabledContainer}>
        <Feather name="camera-off" size={48} color="#666" />
        <Text style={styles.disabledText}>Cámara Apagada</Text>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>

      <View style={[styles.statusBadge]}>
        <View style={[styles.dot, { backgroundColor: isConnected ? '#2ecc71' : '#e74c3c' }]} />
        {/* <Text style={styles.urlInfo}>{urlConnected}</Text> */}
      </View>

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={flash}
        onBarcodeScanned={({ data }) => onScanned(data)}
        onCameraReady={onCameraReady}
        barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  disabledContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    opacity: 0.8,
  },

statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro semitransparente
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', // Borde muy sutil
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8, // Un poco más de espacio respecto al texto
  },

  urlInfo: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    // Sombra sutil al texto para mejorar contraste
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});