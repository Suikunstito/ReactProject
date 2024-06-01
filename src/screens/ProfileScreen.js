import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../services/AuthContext';
import APIREST from '../services/apirest';

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [negocioInfo, setNegocioInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (user && user.userId) {
                const data = await APIREST.obtenerUsuarioPorId(user.userId);
                setUserInfo(data);

                if (data.negocioId) {
                    try {
                        const negocioData = await APIREST.obtenerNegocioPorPropietarioId(user.userId);
                        if (negocioData.message) {
                            setNegocioInfo(null); // No hay negocio
                        } else {
                            setNegocioInfo(negocioData);
                        }
                    } catch (error) {
                        console.error('Error al obtener el negocio por propietarioId:', error);
                    }
                }
            }
        };
        fetchUserInfo();
    }, [user]);

    if (!userInfo) {
        return <Text>Cargando información del usuario...</Text>;
    }

    const handleCrearNegocio = async () => {
        try {
            const nuevoNegocio = {
                nombre: 'Nuevo Negocio',
                ubicacion: { type: 'Point', coordinates: [0, 0] }, // Ejemplo de coordenadas
                descripcion: 'Descripción de Prueba',
                propietarioId: user.userId
            };
            const negocioCreado = await APIREST.crearNegocio(nuevoNegocio);
            setNegocioInfo(negocioCreado);
        } catch (error) {
            console.error('Error al crear el negocio:', error);
        }
    };

    return (
        <View>
            <Text>Página de Perfil</Text>
            <Text>Nombre: {userInfo.nombre}</Text>
            <Text>Email: {userInfo.email}</Text>
            {negocioInfo ? (
                <View>
                    <Text>Negocio: {negocioInfo.nombre}</Text>
                    <Text>Ubicación: {negocioInfo.ubicacion.type} - {JSON.stringify(negocioInfo.ubicacion.coordinates)}</Text>
                    <Text>Descripción: {negocioInfo.descripcion}</Text>
                </View>
            ) : (
                <Button title="Crear Negocio" onPress={handleCrearNegocio} />
            )}
            <Button title="Cerrar sesión" onPress={logout} />
        </View>
    );
};

export default ProfileScreen;