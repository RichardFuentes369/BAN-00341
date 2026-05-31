import { Tabs } from 'expo-router';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export default function TabLayout() {
  // Definimos las opciones con el tipo correcto para evitar el error
  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#000', // Ejemplo de configuración válida
  };

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2f95dc',
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Escanear',
        }} 
      />
    </Tabs>
  );
}