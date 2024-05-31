import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, Text } from 'react-native'; // Importa Text
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useBusinesses } from '../services/BusinessContext';

const AddBusinessScreen = ({ navigation }) => {
  const { setBusinesses } = useBusinesses();
  const [region, setRegion] = useState(null);
  const [marker, setMarker] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const handleLongPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

  const handleSave = () => {
    if (!name || !description || !marker) {
      Alert.alert('Error', 'Por favor complete todos los campos y seleccione una ubicación.');
      return;
    }
    setBusinesses(prevBusinesses => [
      ...prevBusinesses,
      { name, description, latitude: marker.latitude, longitude: marker.longitude }
    ]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          onLongPress={handleLongPress}
        >
          {marker && (
            <Marker
              coordinate={marker}
              title={name}
              description={description}
            />
          )}
        </MapView>
      )}
      <TextInput
        style={styles.input}
        placeholder="Nombre del negocio"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del negocio"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Guardar" onPress={handleSave} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 10,
  },
});

export default AddBusinessScreen;
