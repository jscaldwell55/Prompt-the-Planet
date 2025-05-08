import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Set default headers for axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user data
      axios.get('http://localhost:5000/api/auth/me')
        .then(response => {
          setCurrentUser(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Auth error:', err);
          localStorage.removeItem('authToken');
          setError('Authentication failed. Please log in again.');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Handle successful Google OAuth login
  const handleAuthSuccess = (token) => {
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    // Fetch user data
    return axios.get('http://localhost:5000/api/auth/me')
      .then(response => {
        setCurrentUser(response.data);
        return response.data;
      });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    handleAuthSuccess,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}