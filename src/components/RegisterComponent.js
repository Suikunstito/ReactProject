import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import APIREST from '../services/Apirest';
import Toast from 'react-native-toast-message';

const RegisterComponent = () => {
  const [nombre, setNombre] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!nombre || !email || !password || !confirmPassword) {
      console.log('Todos los campos son obligatorios');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = { nombre, email, password };
    try {
      const resultado = await APIREST.crearUsuario(nuevoUsuario);
      if (resultado.status === 201) {
        // Handle success
        console.log('Usuario creado:', resultado.data);
        Toast.show({
          type: 'success',
          text1: 'Usuario creado',
          text2: 'Registro exitoso',
        });
      } else if (resultado.status === 'error') {
        // Handle specific error message
        console.log('Error al crear el usuario:', resultado.message);
        Toast.show({
          type: 'error',
          text1: 'Error al crear el usuario',
          text2: resultado.message,
        });
      } else {
        // Handle unexpected errors
        console.log('Error al crear el usuario:', resultado.message || 'Error desconocido');
        Toast.show({
          type: 'error',
          text1: 'Error al crear el usuario',
          text2: resultado.message || 'Error desconocido',
        });
      }
    } catch (error) {
      console.error('Error inesperado al crear el usuario:', error);
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'Ocurrió un error al crear el usuario',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse!</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name" // Agrega un campo para el nombre
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Your Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#00bfa6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});

export default RegisterComponent;
