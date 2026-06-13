import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

import CameraComponent from '@/components/CameraView';
import ProductResult from '@/components/ProductRestult';
import ScanHistory from '@/components/ScanHistory';
import { useSocketScanner } from '@/hooks/useSocketScanner';
import { useTheme } from '../../context/ThemeContext'; // Ajusta según tu estructura

export default function TabIndexScreen() {
  const { isDarkMode } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [url, setUrl] = useState('');
  const [view, setView] = useState<'config' | 'camera'>('config');
  const [cameraActive, setCameraActive] = useState(true);
  const { socketConnected, producto, emitScan, connect, clearProducto } = useSocketScanner(url);
  const [flash, setFlash] = useState(false);
  const [sound, setSound] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  // Recuperar URL
  useEffect(() => {
    AsyncStorage.getItem('SERVER_URL').then(savedUrl => {
      if (savedUrl) {
        setUrl(savedUrl);
        connect(savedUrl);
        setView('camera');
      }
    });
  }, []);

  // Lógica de Historial
  useEffect(() => {
    if (producto) {
      const nuevoEscaneo = {
        ...producto,
        horaEscaneo: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setHistory(prev => [
        nuevoEscaneo,
        ...prev
      ].slice(0, 10));
    }
  }, [producto]);

  const playSuccessSound = async () => {
    try {
      const { sound: s } = await Audio.Sound.createAsync(require('../../assets/sounds/scanner.mp3'));
      await s.playAsync();
      s.setOnPlaybackStatusUpdate(status => { if (status.isLoaded && status.didJustFinish) s.unloadAsync(); });
    } catch (e) { console.error(e); }
  };

  const limpiarInfo = async () => {
    setHistory([])
    clearProducto();
  }

  if (!permission?.granted) {
    return (
      <View style={styles.center}><Text>Necesitamos permiso de cámara</Text><Button title="Conceder" onPress={requestPermission} /></View>
    );
  }

  if (view === 'config') {
    return (
      <View style={[styles.container, { padding: 20 }]}>
        <TextInput value={url} onChangeText={setUrl} placeholder="URL del servidor" style={styles.input} />
        <Button title="Guardar y Conectar" onPress={() => { AsyncStorage.setItem('SERVER_URL', url); connect(url); setView('camera'); }} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.scannerFrame}>
        <CameraComponent
          isEnabled={cameraActive}
          flash={flash}
          isConnected={socketConnected}
          onScanned={(data) => {
            if (!scanned) {
              setScanned(true);
              emitScan(data);
              if (sound) playSuccessSound();
              setTimeout(() => setScanned(false), 2500);
            }
          }}
        />

        <TouchableOpacity style={styles.floatBtn} onPress={() => setFlash(!flash)}><Feather name={flash ? "zap" : "zap-off"} size={20} color="white" /></TouchableOpacity>
        <TouchableOpacity style={[styles.floatBtn, { top: 60 }]} onPress={() => setSound(!sound)}><Feather name={sound ? "volume-2" : "volume-x"} size={20} color="white" /></TouchableOpacity>

        <TouchableOpacity
          style={styles.cameraToggleBtn}
          onPress={() => setCameraActive(!cameraActive)}
        >
          <Feather name={cameraActive ? "camera" : "camera-off"} size={24} color="white" />
        </TouchableOpacity>
      </View>



      {/* Fila de botones */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.customButton, { flex: 1, margin: 0, marginRight: 5 }]} onPress={() => setView('config')}>
          <Feather name="settings" size={18} color="white" />
          <Text style={styles.buttonText}> Servidor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.customButtonI, { flex: 1, margin: 0, marginLeft: 5 }]} onPress={() => limpiarInfo()}>
          <Feather name="trash-2" size={18} color="white" />
          <Text style={styles.buttonText}> Limpiar</Text>
        </TouchableOpacity>
      </View>
      <ProductResult data={producto} />
      <Text style={styles.historyTitle}>Últimos 10 escaneos</Text>
      <View style={{ flex: 1, position: 'relative' }}>
        <LinearGradient
          colors={isDarkMode ? ['#121212', 'transparent'] : ['#f5f5f5', 'transparent']}
          style={styles.fadeOverlayTop}
          pointerEvents="none"
        />
        <ScrollView
          style={styles.historyScrollView}
          contentContainerStyle={styles.historyContent}
          showsVerticalScrollIndicator={true}
        >
          <ScanHistory items={history} />
        </ScrollView>
        <LinearGradient
          colors={isDarkMode ? ['transparent', '#121212'] : ['transparent', '#f5f5f5']}
          style={styles.fadeOverlayBottom}
          pointerEvents="none"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scannerFrame: { width: '89%', height: 200, alignSelf: 'center', backgroundColor: '#000', borderRadius: 24, overflow: 'hidden', marginTop: 20 },
  floatBtn: { position: 'absolute', top: 15, right: 15, padding: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1 },
  historyTitle: { color: '#888', marginTop: 10, marginLeft: '5%', fontWeight: 'bold' },

  historyScrollView: {
    flex: 1,
    marginTop: 5,
  },

  historyContent: {
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  customButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row', // Para alinear icono y texto
    justifyContent: 'center',
    alignItems: 'center'
  },
  customButtonI: {
    backgroundColor: '#db3434',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8 // Espacio entre icono y texto
  },

  cameraToggleBtn: {
    position: 'absolute',
    bottom: 15,            // Distancia del borde inferior
    alignSelf: 'center',   // Centrado horizontal
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo oscuro semitransparente
    borderRadius: 30,      // Botón circular
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },

  fadeOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Ajusta esta altura para controlar qué tanto se desvanece
  },
  fadeOverlayTop: {
    position: 'absolute',
    top: 0,      // Lo anclamos al borde superior
    left: 0,
    right: 0,
    height: 40,  // Define qué tanto "borroso" quieres que se vea
    zIndex: 10,  // Asegura que esté por encima del contenido del ScrollView
  },

  historyWrapper: {
    flex: 1,
    position: 'relative', // Necesario para que el gradiente se posicione dentro
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40, // Altura del efecto de desvanecimiento
    zIndex: 10,  // Asegura que esté por encima del contenido del scroll
  },
});