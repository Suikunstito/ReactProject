import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/services/AuthContext';
import InicioScreen from './src/screens/InicioScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { obtenerSaludo } from './src/services/apirest';

const Stack = createStackNavigator();

const AppContent = () => {
  const { isLoggedIn } = useAuth();
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    obtenerSaludo()
      .then(mensaje => {
        setSaludo(mensaje);
        console.log('Mensaje de saludo recibido:', mensaje);
      })
      .catch(error => console.error('Error al obtener el saludo:', error));
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={InicioScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}