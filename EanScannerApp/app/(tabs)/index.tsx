import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { io, Socket } from 'socket.io-client';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KeepAwake from 'expo-keep-awake';
import { useTheme } from '../../context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';

const colors = {
  light: { background: '#ffffff', text: '#333333', card: '#ffffff', inputBg: '#f9f9f9', logBg: '#f0f0f0', border: '#ddd' },
  dark: { background: '#121212', text: '#e0e0e0', card: '#1e1e1e', inputBg: '#2c2c2c', logBg: '#1e1e1e', border: '#444' }
};

export default function TabIndexScreen() {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? colors.dark : colors.light;

  const [permission, requestPermission] = useCameraPermissions();
  const [view, setView] = useState<'config' | 'camera'>('config');
  const [flash, setFlash] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const init = async () => {
      const savedUrl = await AsyncStorage.getItem('SERVER_URL');
      if (savedUrl) { setUrl(savedUrl); connectToSocket(savedUrl); setView('camera'); }
      await KeepAwake.activateKeepAwakeAsync();
      setLoading(false);
    };
    init();
    return () => { KeepAwake.deactivateKeepAwake(); socketRef.current?.disconnect(); };
  }, []);

  const connectToSocket = useCallback((serverUrl: string) => {
    if (socketRef.current) { socketRef.current.disconnect(); }
    const newSocket = io(serverUrl, { transports: ['websocket'], reconnectionAttempts: 5, timeout: 15000 });
    newSocket.on('connect', () => setSocketConnected(true));
    newSocket.on('disconnect', () => setSocketConnected(false));
    socketRef.current = newSocket;
  }, []);

  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/scanner.mp3'));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => { if (status.isLoaded && status.didJustFinish) sound.unloadAsync(); });
    } catch (e) { console.error(e); }
  };

  if (loading) return <View style={[styles.center, { backgroundColor: theme.background }]}><ActivityIndicator size="large" /></View>;
  if (!permission?.granted) return <View style={[styles.center, { backgroundColor: theme.background }]}><Text style={{ color: theme.text }}>Permiso necesario</Text><Button onPress={requestPermission} title="Conceder" /></View>;

  if (view === 'config') return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.configSafeArea}>
        <View style={[styles.configContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.configTitle, { color: theme.text }]}>Configurar Servidor</Text>
          <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="Ej: http://192.168.1.50:3000" value={url} onChangeText={setUrl} autoCapitalize="none" />
          <TouchableOpacity style={styles.customButton} onPress={async () => { await AsyncStorage.setItem('SERVER_URL', url); connectToSocket(url); setView('camera'); }}>
            <Text style={styles.buttonText}>Guardar y Conectar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.scannerFrame}>
            {isCameraLoading && <View style={styles.loadingOverlay}><ActivityIndicator color="#fff" /></View>}
            {cameraActive ? (
              <CameraView style={StyleSheet.absoluteFillObject} facing="back" enableTorch={flash} onCameraReady={() => setIsCameraLoading(false)} onBarcodeScanned={scanned ? undefined : ({ data }) => { setScanned(true); socketRef.current?.emit('scan', data); setLogs(prev => [`✅ ${data}`, ...prev].slice(0, 10)); playSuccessSound(); setTimeout(() => setScanned(false), 1500); }} />
            ) : (<View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }]}><Text style={{ color: '#fff' }}>Cámara Apagada</Text></View>)}
            
            <View style={[styles.statusOverlay, { backgroundColor: socketConnected ? '#2ecc71' : '#e74c3c' }]}>
                <Text style={styles.statusText}>
                  {socketConnected ? '● ONLINE' : '● OFFLINE'}
                </Text>
              </View>
            {cameraActive && <TouchableOpacity style={styles.flashButton} onPress={() => setFlash(!flash)}><Text style={styles.flashButtonText}>{flash ? '⚡ On' : '⚡ Off'}</Text></TouchableOpacity>}
            {socketConnected && (
              <TouchableOpacity 
                style={styles.cameraControlBtn} 
                onPress={() => setCameraActive(!cameraActive)}
              >
                <Feather 
                  name={cameraActive ? "camera-off" : "camera"} 
                  size={24} 
                  color="white" 
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={[styles.customButton, { marginTop: 20 }]} onPress={() => setView('config')}><Text style={styles.buttonText}>Cambiar Servidor</Text></TouchableOpacity>

          {socketConnected && (
            <View style={styles.screenLog}>
              <Text style={{ color: theme.text, fontWeight: 'bold', marginBottom: 10 }}>Historial:</Text>
              
              <ScrollView 
                style={[styles.logsContainer, { backgroundColor: theme.logBg }]} 
                nestedScrollEnabled={true}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {logs.map((log, i) => (
                  <Text key={i} style={{ color: theme.text, paddingVertical: 2 }}>{log}</Text>
                ))}
              </ScrollView>

              {/* AQUÍ ESTÁ EL CAMBIO: Evaluamos si la longitud del array es mayor a 0 */}
              {logs.length > 0 && (
                <TouchableOpacity 
                  style={[styles.customButton, { marginTop: 10, backgroundColor: '#e74c3c' }]} 
                  onPress={() => setLogs([])}
                >
                  <Text style={styles.buttonText}>Limpiar Historial</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {socketConnected && (
            <View style={styles.screenResultScanner}>
              <View style={[styles.productCard, { backgroundColor: theme.card }]}>
                <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>Producto detectado</Text>
                <Text style={{ color: '#2ecc71', fontSize: 24, marginTop: 10 }}>$2850</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { padding: 10 },
  scannerFrame: { width: '100%', height: 300, backgroundColor: '#000', borderRadius: 10, overflow: 'hidden', position: 'relative' },
  statusOverlay: { position: 'absolute', top: 10, left: 10, padding: 5, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1 },
  statusText: { color: '#fff', fontSize: 10 },
  flashButton: { position: 'absolute', top: 10, right: 10, padding: 8, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, zIndex: 1 },
  flashButtonText: { color: '#fff', fontSize: 10 },
  cameraControlBtn: { position: 'absolute', bottom: 15, alignSelf: 'center', padding: 15, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 30, zIndex: 2 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  customButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  screenLog: { marginTop: 20 },
  logsContainer: { 
    height: 150, 
    padding: 10, 
    borderRadius: 8,
    borderWidth: 1, 
    borderColor: '#444' 
   },
  screenResultScanner: { marginTop: 20, paddingBottom: 20 },
  productCard: { padding: 20, borderRadius: 10, alignItems: 'center' },
  configSafeArea: { flex: 1, justifyContent: 'center', padding: 20 },
  configContent: { padding: 20, borderRadius: 15 },
  configTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 15 }
});