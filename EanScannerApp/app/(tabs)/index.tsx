import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabIndexScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [view, setView] = useState<'config' | 'camera'>('config');
  const [url, setUrl] = useState('');
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<string[]>([]);
  
  // NUEVO: Estado para saber en tiempo real si el socket está conectado
  const [socketConnected, setSocketConnected] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);


  const addLog = (message: string) => {
    setLogs(prev => [message, ...prev].slice(0, 5));
  };

  const connectToSocket = useCallback((serverUrl: string) => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current.removeAllListeners();
    }

    console.log('Intentando conectar a:', serverUrl);

    // Configuración robusta para APK nativa
    const newSocket = io(serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      timeout: 15000,
      forceNew: true, // Fuerza una nueva instancia limpia
    });

    newSocket.on('connect', () => {
      // addLog('✅ Conectado'); // <--- AHORA SÍ APARECERÁ EN PANTALLA
      setSocketConnected(true);
    });

    newSocket.on('disconnect', (reason) => {
      // addLog('⚠️ Desconectado: ' + reason); // <--- AHORA SÍ APARECERÁ
      setSocketConnected(false);
    });

    newSocket.on('connect_error', (err) => {
      // addLog('❌ Error: ' + err.message); 
      setSocketConnected(false);
    });
    
    socketRef.current = newSocket;
  }, []);

  useEffect(() => {
    const checkConfig = async () => {
      const savedUrl = await AsyncStorage.getItem('SERVER_URL');
      if (savedUrl) {
        setUrl(savedUrl);
        connectToSocket(savedUrl);
        setView('camera');
      }
      setLoading(false);
    };
    checkConfig();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.removeAllListeners();
      }
    };
  }, [connectToSocket]);

  const saveConfig = async () => {
    if (!url.startsWith('http')) {
      Alert.alert("Error", "La URL debe comenzar con http://");
      return;
    }
    // Limpiamos espacios que a veces se van en el teclado del celular
    const cleanUrl = url.trim(); 
    await AsyncStorage.setItem('SERVER_URL', cleanUrl);
    connectToSocket(cleanUrl);
    setView('camera');
  };

  if (loading) return <View style={styles.container}><ActivityIndicator size="large" /></View>;

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Se requiere permiso de cámara</Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  if (view === 'config') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Configurar Servidor</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: http://192.168.1.6:3000"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          keyboardType="url"
        />
        <Button title="Guardar y Conectar" onPress={saveConfig} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Indicador visual de estado del servidor en la cámara */}
      <View style={[styles.statusBadge, { backgroundColor: socketConnected ? '#4CAF50' : '#F44336' }]}>
        <Text style={styles.statusText}>
          {socketConnected ? `● Servidor Conectado: \n ${url}` : '○ Servidor Desconectado'}
        </Text>
      </View>

      <CameraView 
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : ({ data }) => {
          setScanned(true);
          
          // Usamos el estado sincronizado en lugar de la propiedad directa del ref
          if (socketConnected && socketRef.current) {
            socketRef.current.emit('scan', data);
            console.log('Código enviado a NestJS:', data);
            addLog(`✅ ${data}`)
            Alert.alert(
              "Enviado con Éxito",
              `Código: ${data}`,
              [{ text: "OK", onPress: () => setScanned(false) }],
              { cancelable: false }
            );
          } else {
            Alert.alert(
              "Error de Red", 
              "No estás conectado al servidor NestJS. Verifica que el servidor esté corriendo en " + url,
              [{ text: "Reintentar", onPress: () => setScanned(false) }]
            );
          }
        }}
        barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
      />

      { logs.length > 0 && (
        <>
          <View style={styles.clearlog}>
            <Button title="Limpiar log" onPress={() => setLogs([])} color="#76797c" />
          </View>

          <View style={styles.logsOverlay}>
            <View style={styles.logsContainer}>
              {logs.map((log, i) => (
                <Text key={i} style={styles.logText}>{log}</Text>
              ))}
            </View>
          </View>
        </>
      )}

      <View style={styles.overlay}>
        <Button title="Cambiar Servidor" onPress={() => setView('config')} color="#2196F3" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  text: { textAlign: 'center', marginBottom: 10 },
  overlay: { position: 'absolute', bottom: 50, alignSelf: 'center', width: '80%' },
  clearlog: { position: 'absolute', bottom: 10, alignSelf: 'center', width: '80%' },
  statusBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusText: { color: '#fff', fontWeight: 'bold' },
  logsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20, // Asegura que esté por encima de la cámara
    pointerEvents: 'none', // Permite que los toques pasen a través hacia la cámara
  },
  // La cajita negra donde van los textos
  logsContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 180,
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  logText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
    textAlign: 'center'
  }
});