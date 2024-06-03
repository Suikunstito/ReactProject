import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NegocioScreen from '../screens/NegocioScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Negocios Cercanos' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ title: 'User Profile' }} 
      />
      <Tab.Screen 
        name="Negocio" 
        component={NegocioScreen} 
        options={{ title: 'Negocio' }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
