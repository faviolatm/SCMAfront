// hooks/useAuthFromUrl.js

import { useEffect } from 'react';

/**
 * Hook para capturar token de la URL cuando vienes desde LMS
 */
export const useAuthFromUrl = () => {
  useEffect(() => {
    // Obtener params de la URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    // Si hay token, guardarlo en localStorage
    if (token) {
      localStorage.setItem('dash_token', token);
      
      // Decodificar el token para obtener user_id
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.sub;
        
        // Guardar también el user_id
        if (userId) {
          localStorage.setItem('dash_user', userId);
        }
        
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      
      // Limpiar URL (quitar params)
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);
};