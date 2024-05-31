import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../services/AuthContext';
import APIREST from '../services/apirest';

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user && user.userId) {
                const data = await APIREST.obtenerUsuarioPorId(user.userId);
                setUserInfo(data);
            }
        };
        fetchUserInfo();
    }, [user]);

    if (!userInfo) {
        return <Text>Cargando información del usuario...</Text>;
    }

    return (
        <View>
            <Text>Página de Perfil</Text>
            <Text>Nombre: {userInfo.nombre}</Text>
            <Text>Email: {userInfo.email}</Text>
            <Button title="Cerrar sesión" onPress={logout} />
        </View>
    );
};

export default ProfileScreen;
