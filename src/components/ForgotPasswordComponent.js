import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { handleForgotPassword } from '../services/firebase';

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState('');

    return (
        <View>
            <Text>Recuperar contraseña</Text>
            <TextInput
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
            />
            <Button title="Enviar" onPress={() => handleForgotPassword(email)} />
        </View>
    );
}
    

export default ForgotPasswordComponent;