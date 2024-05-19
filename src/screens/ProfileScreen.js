import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../services/AuthContext';

const ProfileScreen = () => {
  const { logout } = useAuth();

  return (
    <View>
      <Text>Página de Perfil</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;
