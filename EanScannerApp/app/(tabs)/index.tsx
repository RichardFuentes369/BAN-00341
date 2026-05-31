import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabIndexScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [view, setView] = useState<'config' | 'camera'>('config');
  const [url, setUrl] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Cargar configuración al iniciar
  useEffect(() => {
    const checkConfig = async () => {
      const savedUrl = await AsyncStorage.getItem('SERVER_URL');
      if (savedUrl) {
        setUrl(savedUrl);
        setSocket(io(savedUrl));
        setView('camera');
      }
      setLoading(false);
    };
    checkConfig();
  }, []);

  // 2. Guardar configuración
  const saveConfig = async () => {
    if (!url.startsWith('http')) {
      Alert.alert("Error", "La URL debe comenzar con http://");
      return;
    }
    await AsyncStorage.setItem('SERVER_URL', url);
    setSocket(io(url));
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

  // VISTA DE CONFIGURACIÓN
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
        />
        <Button title="Guardar y Conectar" onPress={saveConfig} />
      </View>
    );
  }

  // VISTA DE CÁMARA
  return (
    <View style={styles.container}>
      <CameraView 
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={scanned ? undefined : ({ data }) => {
          setScanned(true); // Bloquea escaneos nuevos
          
          socket?.emit('scan', data);

          Alert.alert(
            "Producto Escaneado",
            `Código: ${data}`,
            [{ text: "OK", onPress: () => setScanned(false) }],
            { cancelable: false }
          );
        }}
        barcodeScannerSettings={{ barcodeTypes: ["ean13"] }}
      />
      
      <View style={styles.overlay}>
        <Button title="Cambiar Servidor" onPress={() => setView('config')} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  text: { textAlign: 'center', marginBottom: 10 },
  overlay: { position: 'absolute', bottom: 50, alignSelf: 'center' }
});