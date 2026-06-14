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
  const [auto, setAuto] = useState(false);
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
      <View style={[styles.configContainer, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
        
        <View style={[styles.configCard, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
          
          <Feather name="camera" size={64} color="#3498db" style={{ marginBottom: 20 }} />

          <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000', marginBottom: 8 }]}>
            Acceso a la Cámara
          </Text>
          
          <Text style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#666', textAlign: 'center', marginBottom: 30 }]}>
            Para poder escanear tus productos, necesitamos que nos permitas acceder a tu cámara.
          </Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={requestPermission}
          >
            <Text style={styles.saveButtonText}>Conceder Permisos</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    );
  }

  if (view === 'config') {
    return (
    <View style={[styles.configContainer, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      
      <View style={[styles.configCard, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
        
        <Feather name="server" size={50} color="#3498db" style={{ marginBottom: 15 }} />

        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000', marginBottom: 8 }]}>
          Configuración
        </Text>
        <Text style={[styles.subtitle, { color: isDarkMode ? '#aaa' : '#666', textAlign: 'center', marginBottom: 10 }]}>
          Ingresa la IP del servidor local para iniciar
        </Text>

        <TextInput
          value={url}
          onChangeText={setUrl}
          placeholder="http://192.168.1.50:3000"
          placeholderTextColor={isDarkMode ? '#555' : '#aaa'}
          style={[styles.input, { 
            backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9', 
            color: isDarkMode ? '#fff' : '#000', 
            borderColor: isDarkMode ? '#333' : '#eee' 
          }]}
          autoCapitalize="none"
          keyboardType="url"
        />

        <TouchableOpacity style={styles.saveButton} onPress={() => { AsyncStorage.setItem('SERVER_URL', url); connect(url); setView('camera'); }}>
          <Text style={styles.saveButtonText}>Guardar y Conectar</Text>
        </TouchableOpacity>
        
      </View>
    </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Marco de Cámara con botones internos */}
      <View style={styles.scannerFrame}>
        <CameraComponent
          isEnabled={cameraActive}
          flash={flash}
          isConnected={socketConnected}
          urlConnected={url}
          onScanned={(data) => {
            if (auto) {
              if (!scanned) {
                setScanned(true); emitScan(data); if (sound) playSuccessSound();
                setTimeout(() => setScanned(false), 2500);
              }
            } else if (scanned) {
              emitScan(data); if (sound) playSuccessSound(); setScanned(false);
            }
          }}
        />

        {/* Botones de control DENTRO del frame, abajo */}
        {cameraActive && socketConnected && (
          <View style={[styles.controlsContainer, { justifyContent: 'center' }]}>
            <TouchableOpacity style={styles.cameraCaptureBtn} onPress={() => setSound(!sound)}>
              <Feather name={sound ? "volume-2" : "volume-x"} size={15} color="white" />
            </TouchableOpacity>

            {auto === false && (
              <TouchableOpacity style={styles.cameraCaptureBtn} onPress={() => setScanned(!scanned)}>
                <Feather name='aperture' size={25} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.cameraCaptureBtn} onPress={() => setFlash(!flash)}>
              <Feather name={flash ? "zap" : "zap-off"} size={15} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {/* Botones flotantes superiores */}
        <TouchableOpacity style={[styles.floatBtn, { top: 10 }]} onPress={() => setCameraActive(!cameraActive)}>
          <Feather name={cameraActive ? "camera" : "camera-off"} size={15} color="white" />
        </TouchableOpacity>

        {cameraActive && socketConnected && (
          <TouchableOpacity style={[styles.floatBtn, { top: 11, right: 50 }]} onPress={() => setAuto(!auto)}>
            <Text style={{ color: auto ? '#2ecc71' : '#e74c3c', fontWeight: 'bold' }}>{auto ? 'AUTO' : 'AUTO'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Resto de la UI */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.customButton} onPress={() => setView('config')}><Feather name="settings" size={18} color="white" /><Text style={styles.buttonText}> Servidor</Text></TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity style={styles.customButtonI} onPress={limpiarInfo}><Feather name="trash-2" size={18} color="white" /><Text style={styles.buttonText}> Limpiar</Text></TouchableOpacity>
      </View>

      <ProductResult data={producto} />
      <ScrollView style={styles.historyScrollView}><ScanHistory items={history} /></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scannerFrame: {
    width: '89%', height: 200, alignSelf: 'center', backgroundColor: '#000',
    borderRadius: 24, overflow: 'hidden', marginTop: 20, position: 'relative'
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  cameraCaptureBtn: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 10,
  },
  floatBtn: {
    position: 'absolute', top: 15, right: 15, padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 20, zIndex: 10
  },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, marginTop: 20, marginBottom: 20 },
  customButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 12, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  customButtonI: { backgroundColor: '#db3434', padding: 15, borderRadius: 12, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  historyScrollView: { flex: 1, marginTop: 10, paddingHorizontal: 10 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 20, borderWidth: 1 },
  

  configContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  
  // La "Tarjeta" que contiene el formulario
  configCard: {
    padding: 32,
    borderRadius: 32, // Bordes muy redondeados para un look moderno
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8, // Sombra para Android
  },
  
  input: {
    width: '100%',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1.5,
    fontSize: 16,
    marginTop: 25,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  saveButton: {
    width: '100%',
    backgroundColor: '#3498db',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 5,
  },
  
  saveButtonText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16 
  }
});