import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useAuth } from '../services/AuthContext';
import APIREST from '../services/Apirest';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener esto instalado: expo install @expo/vector-icons

const NegocioScreen = ({ navigation }) => {
    const { user } = useAuth();
    const [negocioInfo, setNegocioInfo] = useState(null);
    const [region, setRegion] = useState(null);

    useEffect(() => {
        const fetchLocationAndNegocioInfo = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso de ubicación denegado');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });

            if (user && user.userId) {
                try {
                    const negocioData = await APIREST.obtenerNegocioPorPropietarioId(user.userId);
                    if (negocioData.message) {
                        setNegocioInfo(null);
                    } else {
                        setNegocioInfo(negocioData);
                        if (negocioData.ubicacion) {
                            setRegionFromUbicacion(negocioData.ubicacion);
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener el negocio por propietarioId:', error);
                }
            }
        };

        const setRegionFromUbicacion = (ubicacion) => {
            setRegion({
                latitude: ubicacion.latitude,
                longitude: ubicacion.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        };

        fetchLocationAndNegocioInfo();
    }, [user]);

    const handleCrearNegocio = async (latitude, longitude) => {
        try {
            const nuevoNegocio = {
                nombre: 'Nuevo Negocio',
                ubicacion: { coordinates: [longitude, latitude] },
                descripcion: 'Descripción de Prueba',
                propietarioId: user.userId,
            };
            const negocioCreado = await APIREST.crearNegocio(nuevoNegocio);
            setNegocioInfo(negocioCreado);
            navigation.goBack();
        } catch (error) {
            console.error('Error al crear el negocio:', error);
        }
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Negocio Usuario</Text>
        </View>
    );

    if (negocioInfo) {
        return (
            <View style={styles.container}>
                {renderHeader()}
                <Text>Nombre del Negocio: {negocioInfo.nombre}</Text>
                <Text>Ubicación: {`${negocioInfo.ubicacion}`}</Text>
                <Text>Descripción: {negocioInfo.descripcion}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            <View style={styles.selectionContainer}>
                <Text style={styles.selectionText}>Seleccionar Ubicación del Negocio</Text>
            </View>
            {region && (
                <MapView
                    style={styles.map}
                    region={region}
                    onPress={(e) => {
                        const { latitude, longitude } = e.nativeEvent.coordinate;
                        handleCrearNegocio(latitude, longitude);
                    }}
                >
                    <Marker coordinate={region} title="Ubicación Actual" />
                </MapView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#3F51B5',
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    selectionContainer: {
        backgroundColor: '#E3F2FD',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    selectionText: {
        color: '#1E88E5',
        fontSize: 18,
        fontWeight: 'bold',
    },
    map: {
        flex: 1,
    },
});

export default NegocioScreen;
