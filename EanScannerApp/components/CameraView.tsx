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
  onCameraReady?: () => void;
}

export default function CameraComponent({ 
  onScanned, 
  isEnabled, 
  flash, 
  isConnected,
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
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={flash}
        onBarcodeScanned={({ data }) => onScanned(data)}
        onCameraReady={onCameraReady}
        barcodeScannerSettings={{ barcodeTypes: ['ean13'] }}
      />
      
      <View style={[styles.statusBadge, { backgroundColor: isConnected ? '#2ecc71' : '#e74c3c' }]}>
        <Feather name={isConnected ? "wifi" : "wifi-off"} size={12} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... tus otros estilos
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

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

});