import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput, FlatList, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import APIREST from '../services/apirest'; // Asegúrate de importar tus servicios API

const HomeScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [search, setSearch] = useState('');

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

      // Fetch businesses from API
      const fetchedBusinesses = await APIREST.obtenerNegocios();
      setBusinesses(fetchedBusinesses);
    })();
  }, []);

  const handleSearch = () => {
    const filteredBusinesses = businesses.filter(business => 
      business.nombre.toLowerCase().includes(search.toLowerCase()) ||
      business.descripcion.toLowerCase().includes(search.toLowerCase())
    );
    setBusinesses(filteredBusinesses);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar negocios o productos"
        value={search}
        onChangeText={setSearch}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {region && (
        <MapView
          style={styles.map}
          region={region}
        >
          {businesses.map((business, index) => (
            <Marker
              key={index}
              coordinate={{ 
                latitude: business.latitude || region.latitude, 
                longitude: business.longitude || region.longitude 
              }}
              title={business.nombre}
              description={business.descripcion}
            />
          ))}
        </MapView>
      )}
      <FlatList
        data={businesses}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.businessItem}>
            <Text>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
          </View>
        )}
      />
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 10,
  },
  businessItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;
