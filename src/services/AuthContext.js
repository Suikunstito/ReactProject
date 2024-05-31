import React, { createContext, useState, useContext } from 'react';
import APIREST from '../services/apirest'; // Importa la función loginUser del servicio APIREST

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    try {
      const resultado = await APIREST.loginUser({ email, password }); // Llama a la función loginUser del servicio APIREST
      if (resultado) {
        setIsLoggedIn(true);
      } else {
        throw new Error('Credenciales incorrectas, authcontext');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
