// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import BaseApiService from '../services/BaseApiService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    console.log('🔄 AuthContext - Initializing...');
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('scma_user');
        console.log('💾 Saved user in localStorage:', savedUser);
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          console.log('✅ User loaded from localStorage:', userData);
          setCurrentUser(userData);
        } else {
          console.log('⚠️ No user in localStorage');
        }
      } catch (error) {
        console.error('❌ Error loading user from localStorage:', error);
        localStorage.removeItem('scma_user');
      } finally {
        setLoading(false);
        console.log('🏁 AuthContext - Initialization complete');
      }
    };

    loadUser();
  }, []);

  const login = async (userid) => {
    console.log('🔐 Login attempt for:', userid);
    
    try {
      const response = await BaseApiService.post('/users/login', { userid });
      console.log('📨 Login response:', response);
      
      if (response && response.success && response.user) {
        const userData = {
          ...response.user,
          stats: response.stats
        };
        
        console.log('✅ Login successful:', userData);
        setCurrentUser(userData);
        localStorage.setItem('scma_user', JSON.stringify(userData));
        
        return { success: true, user: userData };
      }
      
      console.log('❌ Login failed - invalid response:', response);
      return { success: false, message: 'Login failed - invalid response' };
    } catch (error) {
      console.error('❌ Login error:', error);
      return { 
        success: false, 
        message: 'Error connecting to server' 
      };
    }
  };

  const logout = () => {
    console.log('🚪 Logging out...');
    setCurrentUser(null);
    localStorage.removeItem('scma_user');
  };

  const refreshStats = async () => {
    if (!currentUser) return;
    
    try {
      const response = await BaseApiService.get(`/users/me/${currentUser.userid}`);
      if (response && response.user && response.stats) {
        const updatedUser = {
          ...currentUser,
          stats: response.stats
        };
        setCurrentUser(updatedUser);
        localStorage.setItem('scma_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error refreshing stats:', error);
    }
  };

  const isAdmin = currentUser?.is_admin || false;
  const isAuthenticated = !!currentUser;

  console.log('📊 AuthContext state:', { currentUser, isAdmin, isAuthenticated, loading });

  const value = {
    currentUser,
    isAdmin,
    isAuthenticated,
    loading,
    login,
    logout,
    refreshStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
