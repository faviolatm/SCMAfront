// hooks/useAuthFromUrl.js

import { useEffect } from 'react';

/**
 * Hook para capturar token de la URL cuando vienes desde LMS
 */
export const useAuthFromUrl = () => {
  useEffect(() => {
    console.log('🔍 ===== Checking URL for auth token =====');
    
    // Obtener params de la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    console.log('🔍 Token in URL:', token ? 'EXISTS (length: ' + token.length + ')' : 'NOT FOUND');
    
    // Si hay token, guardarlo en localStorage
    if (token) {
      console.log('✅ Saving token to localStorage...');
      
      localStorage.setItem('dash_token', token);
      
      // 🔹 OPCIONAL: Decodificar el token para obtener user_id
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;
        
        console.log('✅ Decoded token - User ID:', userId);
        console.log('✅ Token payload:', payload);
        
        // Guardar también el user_id
        if (userId) {
          localStorage.setItem('dash_user', userId);
        }
        
      } catch (error) {
        console.error('❌ Error decoding token:', error);
      }
      
      console.log('✅ Token saved to localStorage');
      
      // Limpiar URL (quitar params)
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
      
      console.log('✅ URL cleaned');
    } else {
      console.log('ℹ️ No token in URL, checking localStorage...');
      
      const existingToken = localStorage.getItem('dash_token');
      const existingUser = localStorage.getItem('dash_user');
      
      console.log('📦 Existing localStorage:', {
        dash_token: existingToken ? 'EXISTS' : 'NOT FOUND',
        dash_user: existingUser || 'NOT FOUND'
      });
    }
    
    console.log('🔍 ===== Auth check complete =====');
  }, []);
};