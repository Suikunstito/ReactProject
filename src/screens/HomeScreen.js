import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -33.4372, // Latitud de Santiago de Chile
          longitude: -70.6506, // Longitud de Santiago de Chile
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{ latitude: -33.4372, longitude: -70.6506 }} // Coordenadas para el marcador en Santiago de Chile
          title="Santiago de Chile"
          description="¡Bienvenido a Santiago!"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
