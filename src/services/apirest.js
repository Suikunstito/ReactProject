const API_URL = 'http://192.168.100.27:3000/saludo'; // URL de tu API

const obtenerSaludo = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        return data.mensaje;
    } catch (error) {
        console.error('Error al obtener el saludo:', error);
        return null;
    }
};

export { obtenerSaludo };