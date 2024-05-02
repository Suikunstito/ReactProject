import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './src/screens/InicioScreen';
import React, { useEffect, useState } from 'react';
import { obtenerSaludo } from './src/services/apirest';

const Stack = createStackNavigator();

export default function App() {
  const isLoggedIn = false;
  const [saludo, setSaludo] = useState('');

  useEffect(() => {
    obtenerSaludo()
      .then(mensaje => {
        setSaludo(mensaje);
        console.log('Mensaje de saludo recibido:', mensaje); // Imprimir el mensaje en la consola
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
    /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app! cambio</Text>
      <StatusBar style="auto" />
    </View> ;*/
  );
}


