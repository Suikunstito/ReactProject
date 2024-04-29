import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';

const InicioScreen = () => {
  const [cambiarComponent, setCambiarComponent] = useState(false);

  return (
    <View>
      {/* Logo de la app */}
      {cambiarComponent ? (
        <RegisterComponent />
      ) : (
        <LoginComponent />
      )}
      <Button
        title={cambiarComponent ? "¿Tienes perfil? Ingresar" : "¿No tienes perfil? Regístrate"}
        onPress={() => setCambiarComponent(!cambiarComponent)}
      />
    </View>
  );
};

export default InicioScreen;