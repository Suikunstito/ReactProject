import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useAuth } from '../services/AuthContext';
import APIREST from '../services/apirest';

const NegocioScreen = () => {
    const { user } = useAuth();
    const [negocioInfo, setNegocioInfo] = useState(null);
    const [region, setRegion] = useState(null);

    const DEFAULT_LATITUDE = 0; // Define la latitud predeterminada
    const DEFAULT_LONGITUDE = 0; // Define la longitud predeterminada

    useEffect(() => {
        const fetchNegocioInfo = async () => {
            if (user && user.userId) {
                try {
                    const negocioData = await APIREST.obtenerNegocioPorPropietarioId(user.userId);
                    if (negocioData.message) {
                        setNegocioInfo(null); // No hay negocio
                        setDefaultRegion(); // Establecer una región predeterminada
                    } else {
                        setNegocioInfo(negocioData);
                        if (negocioData.ubicacion) {
                            setRegionFromUbicacion(negocioData.ubicacion);
                        } else {
                            setDefaultRegion(); // Establecer una región predeterminada
                        }
                    }
                } catch (error) {
                    console.error('Error al obtener el negocio por propietarioId:', error);
                }
            }
        };

        const setDefaultRegion = () => {
            setRegion({
                latitude: DEFAULT_LATITUDE,
                longitude: DEFAULT_LONGITUDE,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        };

        const setRegionFromUbicacion = (ubicacion) => {
            setRegion({
                latitude: ubicacion.latitude,
                longitude: ubicacion.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        };

        fetchNegocioInfo();
    }, [user]);

    const handleCrearNegocio = async (latitude, longitude) => {
        console.log("latitude y longitude: ", longitude, latitude);
        try {
            const nuevoNegocio = {
                nombre: 'Nuevo Negocio',
                ubicacion: { coordinates: [longitude, latitude] },
                descripcion: 'Descripción de Prueba',
                propietarioId: user.userId,
              };
              console.log('Solicitud al servidor:', nuevoNegocio); // Agrega esta línea para verificar el formato de la solicitud
              const negocioCreado = await APIREST.crearNegocio(nuevoNegocio);
            setNegocioInfo(negocioCreado);
        } catch (error) {
            console.error('Error al crear el negocio:', error);
        }
    };

    if (negocioInfo) {
        return (
            <View style={styles.container}>
                <Text>Nombre del Negocio: {negocioInfo.nombre}</Text>
                <Text>Ubicación: {`${negocioInfo.ubicacion}`}</Text>
                <Text>Descripción: {negocioInfo.descripcion}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text>No tienes un negocio registrado</Text>
            <MapView
                style={styles.map}
                region={region? region : {}} // Agrega esto para establecer la región del mapa
                onPress={(e) => {
                    const { latitude, longitude } = e.nativeEvent.coordinate;
                    handleCrearNegocio(latitude, longitude);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '50%',
    },
});

export default NegocioScreen;