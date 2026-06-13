import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard'; // Importar Clipboard
import { useTheme } from '@/context/ThemeContext';
import Feather from '@expo/vector-icons/Feather';

export default function ScanHistory({ items }: { items: any[] }) {
  const { isDarkMode } = useTheme();

  const copyToClipboard = async (code: string) => {
    await Clipboard.setStringAsync(code);
    Alert.alert("Copiado", `Código ${code} copiado al portapapeles`);
  };

  if (items.length === 0) return null;

  return (
    <View style={styles.historyContainer}>
      {items.map((item, index) => (
        <View key={index} style={[styles.historyItem, { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }]}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.itemName, { color: isDarkMode ? '#ffffff' : '#121212' }]}>
              {item.nombre || "Código no registrado"}
            </Text>
            <View style={styles.codeRow}>
              <Text style={styles.itemCode}>{item.codigo_barras}</Text>

              {/* Botón de copiar */}
              <TouchableOpacity
                onPress={() => copyToClipboard(item.codigo_barras)}
                style={styles.copyButton}
              >
                <Feather name="copy" size={12} color="#3498db" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.itemTime}>{item.horaEscaneo}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    paddingHorizontal: 10,
    marginBottom: 20
  },
  historyItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  codeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  copyButton: { marginLeft: 10, padding: 4 },
  itemName: { fontSize: 14, fontWeight: 'bold' },
  itemCode: { fontSize: 12, color: '#888' },
  itemTime: { fontSize: 12, color: '#3498db', fontWeight: 'bold' }
});