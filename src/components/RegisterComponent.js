import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import APIREST from '../services/apirest'; // Importa la función crearUsuario

const RegisterComponent = () => {
  const [nombre, setNombre] = useState(''); // Agrega el estado para el nombre
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      const nuevoUsuario = { nombre, email, password }; // Incluye el nombre en el nuevo usuario
      const resultado = await APIREST.crearUsuario(nuevoUsuario); // Utiliza la función crearUsuario
      if (resultado) {
        // Handle success
        console.log('Usuario creado:', resultado);
      } else {
        // Handle error
        console.log('Error al crear el usuario');
      }
    } else {
      // Handle password mismatch
      console.log('Las contraseñas no coinciden');
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
