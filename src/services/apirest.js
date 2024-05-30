import Config from 'react-native-config';

const IP = Config.IP_SERVER || '';
console.log('ip conexion:', IP);
const API_URL = `https://e645-2803-c180-2601-7756-ddf6-4b57-65ab-3e79.ngrok-free.app/saludo`;  // URL de tu API

const obtenerSaludo = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        return data.mensaje;
    } catch (error) {
        console.error('Error al obtener el saludo:', error);
        console.error('ip conexion:', API_URL);
        return null;
    }
};

export { obtenerSaludo };