import Config from 'react-native-config';

const API_URL = Config.API_URL || '';  // URL de tu API

const APIREST = {
    obtenerSaludo: async () => {
        try {
            const response = await fetch(API_URL); // Usar la variable API_URL
            const data = await response.json();
            return data.mensaje;
        } catch (error) {
            console.error('Error al obtener el saludo:', error);
            console.error('URL de la API:', API_URL);
            return null;
        }
    },
    
    
};

export default APIREST;