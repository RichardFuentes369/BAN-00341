import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useTheme } from '@/context/ThemeContext';

// Definimos la interfaz para que el componente sepa qué esperar
interface ProductResultProps {
  data: {
    encontrado: boolean;
    nombre?: string;
    codigo_barras: string;
    marca?: string;
    medida?: string;
  } | null;
}

export default function ProductResult({ data }: ProductResultProps) {
  const { isDarkMode, toggleTheme } = useTheme();
  if (!data) return null;

  return (
    <>
      <View style={[styles.card, { borderColor: data.encontrado ? '#3ce78c' : '#e74c3c',  backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
        {data.encontrado ? (
          <>
            <Feather name="check" size={40} color="#3ce78c" />
            <Text style={[styles.title, { color: '#3ce78c' }]}>{data.nombre}</Text>
            <Text style={{color: isDarkMode ? '#ffffff': '#121212'}}>Marca: {data.marca || 'N/A'}</Text>
            <Text style={{color: isDarkMode ? '#ffffff': '#121212'}}>Código: {data.codigo_barras}</Text>
          </>
        ) : (
          <>
            <Feather name="alert-circle" size={40} color="#e74c3c" />
            <Text style={[styles.title, { color: '#e74c3c' }]}>No registrado</Text>
            <Text style={{color: isDarkMode ? '#ffffff': '#121212'}}>Código: {data.codigo_barras}</Text>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    backgroundColor: '#1e1e1e', // Ajusta según tu tema
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  title: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginVertical: 10 },
});