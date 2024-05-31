import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

const InicioScreen = () => {
  const [cambiarComponent, setCambiarComponent] = useState(false);

  return (
    <View>
      {cambiarComponent ? (
        <RegisterComponent />
      ) : (
        <LoginComponent />
      )}

      <TouchableOpacity style={styles.switchButton} onPress={() => setCambiarComponent(!cambiarComponent)}>
        <Text style={styles.switchButtonText}>
          {cambiarComponent ? "¿Tienes perfil? Ingresar" : "¿No tienes perfil? Regístrate"}
        </Text>
      </TouchableOpacity> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff'
  },
  switchButton: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center'
  },
  switchButtonText: {
    color: '#00bfa6',
    fontWeight: 'bold'
  }
});



export default InicioScreen;