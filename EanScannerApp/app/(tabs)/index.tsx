import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
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
  const [sound, setSound] = useState<boolean>(true);
  const [cameraActive, setCameraActive] = useState<boolean>(true);
  const [isCameraLoading, setIsCameraLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  const [productoRecibido, setProductoRecibido] = useState<any>(null);
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
    newSocket.on('socket_result_product_react', (data) => {
      setProductoRecibido(data.data);
    });
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

  if (!permission?.granted) return (
    <View style={[styles.center, { backgroundColor: theme.background }]}>
      <View style={styles.permissionCard}>
        <Feather name="camera" size={24} color="white" />
        <Text style={styles.permissionTitle}>Acceso a Cámara</Text>
        <Text style={styles.permissionText}>
          Para poder escanear tus productos, necesitamos acceder a tu cámara.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (view === 'config') return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView style={styles.configSafeArea}>
        <View style={[styles.configContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.configTitle, { color: theme.text }]}>Configurar Servidor</Text>
          <TextInput style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text, borderColor: theme.border }]} placeholder="Ej: http://192.168.1.50:3000" placeholderTextColor="#888" value={url} onChangeText={setUrl} autoCapitalize="none" />
          <TouchableOpacity style={styles.customButton} onPress={async () => { await AsyncStorage.setItem('SERVER_URL', url); connectToSocket(url); setView('camera'); }}>
            <Text style={styles.buttonText}>Guardar y Conectar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.scannerFrame}>
            {isCameraLoading && <View style={styles.loadingOverlay}><ActivityIndicator color="#fff" /></View>}
            {cameraActive ? (
              <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                enableTorch={flash}
                onCameraReady={() => setIsCameraLoading(false)}
                onBarcodeScanned={scanned ? undefined : ({ data }) => {
                  setScanned(true);
                  socketRef.current?.emit('scan', data);
                  setLogs(prev => [`✅ ${data}`, ...prev].slice(0, 10));
                  (sound) ? playSuccessSound() : '';
                  setTimeout(() => setScanned(false), 1500);
                }}
              />
            ) : (
              <View style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }
              ]}>
                <Text style={{ color: '#fff' }}>Cámara Apagada</Text>
              </View>
            )}
            <View style={[styles.statusOverlay, { backgroundColor: socketConnected ? '#2ecc71' : '#e74c3c' }]}>
              <Text style={styles.statusText}>{socketConnected ? '● ONLINE' : '● OFFLINE'}</Text>
            </View>

            {cameraActive && (
              <TouchableOpacity style={styles.flashButton} onPress={() => setFlash(!flash)}>
                <Feather
                  name={flash ? "zap" : "zap-off"}
                  size={24}
                  color={flash ? "white" : "white"}
                />
              </TouchableOpacity>
            )}

            {cameraActive && (
              <TouchableOpacity style={styles.soundButton} onPress={() => setSound(!sound)}>
                <Feather
                  name={sound ? "volume-2" : "volume-x"}
                  size={24}
                  color={sound ? "white" : "white"}
                />
              </TouchableOpacity>
            )}

            {socketConnected && (
              <TouchableOpacity style={styles.cameraControlBtn} onPress={() => setCameraActive(!cameraActive)}>
                <Feather name={cameraActive ? "camera-off" : "camera"} size={24} color={cameraActive ? "white" : "gray"} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={[styles.customButton, { marginTop: 20 }]} onPress={() => setView('config')}><Text style={styles.buttonText}>Cambiar Servidor</Text></TouchableOpacity>

          {socketConnected && productoRecibido && (
            <View style={styles.screenResultScanner}>
              <Text style={{ color: theme.text, fontWeight: 'bold', marginBottom: 10 }}>
                {productoRecibido ? "Resultado del escaneo:" : "Esperando producto..."}
              </Text>

              {productoRecibido.encontrado === false ? (
                // Estado: Producto NO encontrado o no escaneado
                <View style={[styles.productCard, { backgroundColor: theme.card, borderColor: '#e74c3c', borderWidth: 1 }]}>
                  <Feather name="alert-circle" size={40} color="#e74c3c" />
                  <Text style={{ 
                    color: '#e74c3c', 
                    fontSize: 18, 
                    fontWeight: 'bold', 
                    marginTop: 10, 
                    textAlign: 'center' 
                  }}>
                    Producto{'\n'}
                    ({productoRecibido.codigo_barras}){'\n'}
                    no registrado
                  </Text>
                  <Text style={{ color: theme.text, fontSize: 14, textAlign: 'center', marginTop: 5 }}>
                    El código escaneado no existe en la base de datos.
                  </Text>
                </View>
              ) : (
                // Estado: Producto encontrado
                <View style={[styles.productCard, { backgroundColor: theme.card, borderColor: '#3ce78c', borderWidth: 1 }]}>
                  <Feather name="check" size={40} color="#3ce78c" />
                  <Text style={{ color: '#2ecc71', fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
                    {productoRecibido.nombre || "Producto sin nombre"}
                  </Text>
                  
                  <View style={{ width: '100%', marginTop: 15 }}>
                    {[
                      { label: 'Codigo de barras', value: productoRecibido.codigo_barras },
                      { label: 'Marca', value: productoRecibido.marca },
                      { label: 'Medida', value: productoRecibido.medida },
                      { label: 'Es Perecedero', value: productoRecibido.es_perecedero ? 'Sí' : 'No' },
                      { label: 'Estado', value: productoRecibido.estado }
                    ].map((item, index) => (
                      <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
                        <Text style={{ color: theme.text, opacity: 0.7 }}>{item.label}:</Text>
                        <Text style={{ color: theme.text, fontWeight: '600' }}>{item.value || "N/A"}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          )}

          {socketConnected && (
            <View style={styles.screenLog}>
              <Text style={{ color: theme.text, fontWeight: 'bold', marginBottom: 10 }}>Historial:</Text>
              <ScrollView style={[styles.logsContainer, { backgroundColor: theme.logBg }]} nestedScrollEnabled={true} contentContainerStyle={{ flexGrow: 1 }}>
                {logs.map((log, i) => <Text key={i} style={{ color: theme.text, paddingVertical: 2 }}>{log}</Text>)}
              </ScrollView>
              {logs.length > 0 && (
                <TouchableOpacity style={[styles.customButton, { marginTop: 10, backgroundColor: '#e74c3c' }]} onPress={() => setLogs([])}><Text style={styles.buttonText}>Limpiar Historial</Text></TouchableOpacity>
              )}
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
  scannerFrame: { width: '95%', height: 220, alignSelf: 'center', backgroundColor: '#000', borderRadius: 20, overflow: 'hidden', position: 'relative', marginTop: 20, marginBottom: 10 },
  statusOverlay: { position: 'absolute', top: 10, left: 10, padding: 5, borderRadius: 10, zIndex: 1 },
  statusText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  flashButton: { position: 'absolute', top: 10, right: 10, padding: 4, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, zIndex: 1 },
  flashButtonText: { color: '#fff', fontSize: 10 },

  soundButton: { position: 'absolute', top: 50, right: 10, padding: 4, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, zIndex: 1 },
  soundButtonText: { color: '#fff', fontSize: 10 },

  cameraControlBtn: { position: 'absolute', bottom: 8, alignSelf: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 30, zIndex: 2 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  customButton: { backgroundColor: '#3498db', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  screenLog: { marginTop: 20 },
  logsContainer: { height: 150, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#444' },
  screenResultScanner: { marginTop: 20, paddingBottom: 20 },
  productCard: { padding: 20, borderRadius: 10, alignItems: 'center' },
  configSafeArea: { flex: 1, justifyContent: 'center', padding: 20 },
  configContent: { padding: 20, borderRadius: 15 },
  configTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  input: { borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 15 },

  permissionCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 30,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(238, 207, 161, 0.2)',
    width: '85%',
  },
  permissionTitle: {
    color: '#eecfa1',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'DancingScript_700Bold', // Usamos la misma fuente elegante
  },
  permissionText: {
    color: '#bdc3c7',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#eecfa1',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
  },
});