import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/services/AuthContext';
import InicioScreen from './src/screens/InicioScreen';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import APIREST from './src/services/Apirest';
import ErrorHandler from './src/components/ErrorHandler';

const Stack = createStackNavigator();

const AppContent = () => {
  const { user } = useAuth();
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    APIREST.obtenerSaludo()
      .then(mensaje => {
        setSaludo(mensaje);
        console.log('Mensaje de saludo recibido:', mensaje);
      })
      .catch(error => console.error('Error al obtener el saludo:', error));
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
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
      <ErrorHandler>
        <AppContent />
      </ErrorHandler>
    </AuthProvider>
  );
}
