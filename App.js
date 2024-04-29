import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from './src/screens/InicioScreen';

const Stack = createStackNavigator();

export default function App() {
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={InicioScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
    /* <View style={styles.container}>
      <Text>Open up App.js to start working on your app! cambio</Text>
      <StatusBar style="auto" />
    </View> ;*/
  );
}


