import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NegocioScreen from '../screens/NegocioScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = ({ navigation, route }) => {
    // This will check the current route name and hide the tab bar if the screen is 'Negocio'
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Negocio') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Negocio" component={NegocioScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Negocios Cercanos' }} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Perfil Usuario' }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
