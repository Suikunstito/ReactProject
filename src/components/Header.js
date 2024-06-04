import React from 'react';
import { View, Text, Button, StyleSheet, Platform, StatusBar } from 'react-native';
import { useAuth } from '../services/AuthContext';

const Header = ({ title }) => {
    const { logout } = useAuth();

    return (
        <View style={styles.header}>
            <StatusBar
                barStyle="light-content"
                backgroundColor={Platform.OS === 'android' ? '#3F51B5' : undefined}
            />
            <Text style={styles.headerText}>{title}</Text>
            <Button title="LOGOUT" onPress={logout} color="#2196F3" />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#3F51B5',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;
