import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { handleRegister } from '../services/firebase';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text>Inicio de Sesión</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar sesión" onPress={() => handleRegister(email, password)} />
    </View>
  );
};

export default LoginComponent;
