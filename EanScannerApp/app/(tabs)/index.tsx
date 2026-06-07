import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { io, Socket } from 'socket.io-client';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KeepAwake from 'expo-keep-awake';

const { width } = Dimensions.get('window');

export default function TabIndexScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [view, setView] = useState<'config' | 'camera'>('config');
  const [url, setUrl] = useState('');
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  const connectToSocket = useCallback((serverUrl: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }
    const newSocket = io(serverUrl, { transports: ['websocket'], reconnectionAttempts: 5, timeout: 15000 });
    newSocket.on('connect', () => setSocketConnected(true));
    newSocket.on('disconnect', () => setSocketConnected(false));
    newSocket.on('connect_error', () => setSocketConnected(false));
    socketRef.current = newSocket;
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        await KeepAwake.activateKeepAwakeAsync();
        const savedUrl = await AsyncStorage.getItem('SERVER_URL');
        if (savedUrl) {
          setUrl(savedUrl);
          connectToSocket(savedUrl);
          setView('camera');
        }
      } catch (e) { console.error(e); }
      setLoading(false);
    };
    init();
    return () => { KeepAwake.deactivateKeepAwake(); socketRef.current?.disconnect(); };
  }, [connectToSocket]);

  const playSuccessSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(require('../../assets/sounds/scanner.mp3'));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => { if (status.isLoaded && status.didJustFinish) sound.unloadAsync(); });
    } catch (e) { console.error(e); }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!permission?.granted) return <View style={styles.center}><Text>Permiso necesario</Text><Button onPress={requestPermission} title="Conceder" /></View>;

  if (view === 'config') return (
    <View style={styles.container}>
      <SafeAreaView style={styles.configSafeArea}>
        <View style={styles.configContent}>
          <Text style={styles.configTitle}>Configurar Servidor</Text>
          <Text style={styles.configSubtitle}>Ingresa la dirección IP del servidor para conectar el escáner.</Text>

          <TextInput
            style={styles.input}
            placeholder="Ej: http://192.168.1.50:3000"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[styles.customButton, { width: '100%' }]}
            onPress={async () => {
              if (!url.trim()) return Alert.alert("Error", "La URL no puede estar vacía");
              await AsyncStorage.setItem('SERVER_URL', url.trim());
              connectToSocket(url.trim());
              setView('camera');
            }}
          >
            <Text style={styles.buttonText}>Guardar y Conectar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

          <View style={[styles.serverStatus, { backgroundColor: socketConnected ? '#2ecc71' : '#e74c3c' }]}>
            <Text style={styles.statusText}>{socketConnected ? '● Servidor Conectado' : '○ Desconectado'}</Text>
          </View>

          <View style={styles.screenScanner}>
            {socketConnected ? (
              <View style={styles.fullWidth}>
                <View style={styles.scannerFrame}>
                  <CameraView key="cam" style={StyleSheet.absoluteFillObject} facing="back" barcodeScannerSettings={{ barcodeTypes: ["ean13"] }} onBarcodeScanned={scanned ? undefined : ({ data }) => {
                    setScanned(true);
                    socketRef.current?.emit('scan', data);
                    setLogs(prev => [`✅ ${data}`, ...prev].slice(0, 10));
                    playSuccessSound();
                    setTimeout(() => setScanned(false), 1500);
                  }} />
                </View>
                <TouchableOpacity style={styles.customButton} onPress={() => setView('config')}><Text style={styles.buttonText}>Cambiar Servidor</Text></TouchableOpacity>
              </View>
            ) : (
              <View>
                <ActivityIndicator size="large" />
                <TouchableOpacity style={styles.customButton} onPress={() => setView('config')}><Text style={styles.buttonText}>Cambiar Servidor</Text></TouchableOpacity>
              </View>
            )}
          </View>

          {socketConnected && logs.length > 0 && (
            <View style={styles.screenLog}>
              <Text style={styles.logsTitle}>Historial:</Text>
              <ScrollView style={styles.logsContainer} nestedScrollEnabled={true}>
                {logs.map((log, i) => <View key={i} style={styles.logItem}><Text style={styles.logText}>{log}</Text></View>)}
              </ScrollView>
              <TouchableOpacity style={styles.customButton} onPress={() => setLogs([])}><Text style={styles.buttonText}>Limpiar</Text></TouchableOpacity>
            </View>
          )}

          {socketConnected && (
            <View style={styles.screenResultScanner}>
              <View style={styles.productCard}>
                <Text style={styles.productTitle}>Producto detectado</Text>
                <Text style={styles.productPrice}>$2850</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  interfaceContainer: { flex: 1, padding: 20 },
  scrollContent: { flexGrow: 1 },
  fullWidth: { width: '100%', alignItems: 'center' },
  serverStatus: { padding: 15, alignItems: 'center', width: '100%' },
  statusText: { color: '#fff', fontWeight: 'bold' },
  screenScanner: { width: '100%', alignItems: 'center', marginVertical: 10, padding: 10 },
  scannerFrame: { width: width, height: 250, backgroundColor: '#000' },
  customButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, marginTop: 10, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  screenLog: { width: '100%', padding: 20 },
  logsTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  logsContainer: { backgroundColor: '#f0f0f0', maxHeight: 100, padding: 10, borderRadius: 8 },
  logItem: { paddingVertical: 5 },
  logText: { fontSize: 14 },
  screenResultScanner: { width: '100%', padding: 20 },
  productCard: { padding: 20, backgroundColor: '#fff', borderRadius: 10, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 },
  productTitle: { fontSize: 18, fontWeight: 'bold' },
  productPrice: { fontSize: 24, color: '#2ecc71', marginTop: 10 },

  configSafeArea: {
    flex: 1,
    justifyContent: 'center', // Centra verticalmente
    padding: 20,
  },
  configContent: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 4, // Sombra para dar profundidad
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  configTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  configSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
});