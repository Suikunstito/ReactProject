import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

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
    })();
  }, []);

  const handleSearch = () => {
    const filteredBusinesses = businesses.filter(business => 
      business.name.toLowerCase().includes(search.toLowerCase()) ||
      business.description.toLowerCase().includes(search.toLowerCase())
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
              coordinate={{ latitude: business.latitude, longitude: business.longitude }}
              title={business.name}
              description={business.description}
            />
          ))}
        </MapView>
      )}
      <Button title="Agregar Negocio" onPress={() => navigation.navigate('AddBusiness', { setBusinesses })} />
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
});

export default HomeScreen;
