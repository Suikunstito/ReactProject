import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import LoginComponent from '../components/LoginComponent';
import RegisterComponent from '../components/RegisterComponent';
import ForgotPasswordComponent from '../components/ForgotPasswordComponent';

const InicioScreen = () => {
  const [cambiarComponent, setCambiarComponent] = useState('login'); // Usa 'login' como valor inicial
  
  const switchComponent = () => {
    switch (cambiarComponent) {
      case 'login':
        return <LoginComponent />;
      case 'register':
        return <RegisterComponent />;
      case 'forgotPassword':
        return <ForgotPasswordComponent />;
      default:
        return <LoginComponent />;
    }
  };

  return (
    <View>
      {/* Logo de la app */}
      {switchComponent()}
      <Button
        title={cambiarComponent === 'login' ? "¿No tienes perfil? Regístrate" : "¿Tienes perfil? Ingresar"}
        onPress={() => setCambiarComponent(cambiarComponent === 'login' ? 'register' : 'login')}
      />
      <Button
        title="¿Has olvidado la contraseña?"
        onPress={() => setCambiarComponent('forgotPassword')}
      />
    </View>
  );
};

export default InicioScreen;