import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useAuth } from '../services/AuthContext';
import APIREST from '../services/apirest';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
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

    const handleCrearNegocio = () => {
        navigation.navigate('Negocio');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Perfil Usuario" />
            <ScrollView style={styles.container}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}></View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>INFORMACION USUARIO</Text>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>NOMBRE</Text>
                        <Text>{userInfo.nombre}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitle}>CORREO</Text>
                        <Text>{userInfo.email}</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>INFORMACION NEGOCIO</Text>
                    {negocioInfo ? (
                        <>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoTitle}>NOMBRE</Text>
                                <Text>{negocioInfo.nombre}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoTitle}>UBICACION</Text>
                                <Text>{negocioInfo.ubicacion.type} - {JSON.stringify(negocioInfo.ubicacion.coordinates)}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoTitle}>DESCRIPCION</Text>
                                <Text>{negocioInfo.descripcion}</Text>
                            </View>
                        </>
                    ) : (
                        <Button title="Crear Negocio" onPress={handleCrearNegocio} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#3F51B5', // Mismo color que la cabecera para una transición más suave
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        backgroundColor: '#CCCCCC',
        borderRadius: 50,
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        backgroundColor: '#3F51B5',
        color: '#FFFFFF',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    infoTitle: {
        color: '#333333',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
