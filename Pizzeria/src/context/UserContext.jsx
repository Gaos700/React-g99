import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar token del localStorage al inicializar
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedEmail = localStorage.getItem('email');
    
    if (savedToken) {
      setToken(savedToken);
      setEmail(savedEmail);
    }
    setLoading(false);
  }, []);

  // Método para hacer login
  const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        return { success: true, message: 'Login exitoso' };
      } else {
        return { success: false, message: data.message || 'Error en el login' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  };

  // Método para hacer register
  const registerUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        return { success: true, message: 'Registro exitoso' };
      } else {
        return { success: false, message: data.message || 'Error en el registro' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  };

  // Método para obtener perfil del usuario
  const getProfile = async () => {
    if (!token) return { success: false, message: 'No hay token' };

    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Error obteniendo perfil' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    }
  };

  // Método para hacer logout
  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  const value = {
    token: !!token, // Convertir a boolean para compatibilidad
    email,
    loading,
    loginUser,
    registerUser,
    getProfile,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};