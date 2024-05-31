import Config from 'react-native-config';

const API_URL = Config.API_URL || 'https://sharing-driving-albacore.ngrok-free.app';  // URL de tu API

const APIREST = {
    obtenerSaludo: async () => {
        try {
            const response = await fetch(`${API_URL}/saludo`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.mensaje;
        } catch (error) {
            console.error('Error al obtener el saludo:', error);
            return null;
        }
    },

    loginUser: async (credenciales) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciales),
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
                status: response.status,
                token: data.token,   // Store the token
                userId: data.userId  // Store the user ID
            };
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return {
                status: 'error',
                message: error.message
            };
        }
    },

    crearUsuario: async (usuario) => {
        try {
            const response = await fetch(`${API_URL}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            return {
                status: response.status,
                data: data
            };
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            return {
                status: 'error',
                message: error.message
            };
        }
    },

    obtenerUsuarios: async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            return null;
        }
    },
    obtenerUsuarioPorId: async (id) => {
        try {
            const response = await fetch(`${API_URL}/usuarios/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            return null;
        }
    },
    actualizarUsuario: async (id, usuario) => {
        try {
            const response = await fetch(`${API_URL}/usuarios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            return null;
        }
    },
    eliminarUsuario: async (id) => {
        try {
            const response = await fetch(`${API_URL}/usuarios/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            return null;
        }
    },
    crearNegocio: async (negocio) => {
        try {
            const response = await fetch(`${API_URL}/negocios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(negocio),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al crear el negocio:', error);
            return null;
        }
    },
    obtenerNegocios: async () => {
        try {
            const response = await fetch(`${API_URL}/negocios`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener los negocios:', error);
            return null;
        }
    },
    obtenerNegocioPorId: async (id) => {
        try {
            const response = await fetch(`${API_URL}/negocios/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al obtener el negocio:', error);
            return null;
        }
    },
    actualizarNegocio: async (id, negocio) => {
        try {
            const response = await fetch(`${API_URL}/negocios/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(negocio),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al actualizar el negocio:', error);
            return null;
        }
    },
    eliminarNegocio: async (id) => {
        try {
            const response = await fetch(`${API_URL}/negocios/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error al eliminar el negocio:', error);
            return null;
        }
    },
};


export default APIREST;