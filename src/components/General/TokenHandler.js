// src/components/General/TokenHandler.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const TokenHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log('🔍 ===== TokenHandler: Checking for auth data =====');
    
    // Capturar token de la URL
    const urlToken = searchParams.get('token');
    
    console.log('🔍 Token in URL:', urlToken ? `EXISTS (length: ${urlToken.length})` : 'NOT FOUND');
    
    if (urlToken) {
      console.log('✅ Token found in URL, processing...');
      
      try {
        // 🔹 Guardar token en dash_token (no analytics_token)
        localStorage.setItem('dash_token', urlToken);
        console.log('✅ Token saved to dash_token');
        
        // 🔹 Decodificar JWT para obtener user_id
        const payload = JSON.parse(atob(urlToken.split('.')[1]));
        console.log('🔍 Decoded JWT payload:', payload);
        
        const userId = payload.sub;  // Tu JWT tiene user_id en 'sub'
        
        if (userId) {
          localStorage.setItem('dash_user', userId);
          console.log(`✅ User ID saved to dash_user: ${userId}`);
        } else {
          console.warn('⚠️ No "sub" field found in JWT');
        }
        
        // 🔹 OPCIONAL: Guardar AccessLevel si existe
        if (payload.AccessLevel) {
          localStorage.setItem('dash_access_level', payload.AccessLevel);
          console.log(`✅ Access level saved: ${payload.AccessLevel}`);
        }
        
        // 🔹 OPCIONAL: Guardar warehouse si existe
        if (payload.Warehouse) {
          localStorage.setItem('dash_warehouse', payload.Warehouse);
          console.log(`✅ Warehouse saved: ${payload.Warehouse}`);
        }
        
      } catch (error) {
        console.error('❌ Error decoding token:', error);
      }
      
      // Limpiar la URL (quitar token de la barra de direcciones)
      searchParams.delete('token');
      setSearchParams(searchParams, { replace: true });
      console.log('✅ URL cleaned, token param removed');
      
    } else {
      console.log('ℹ️ No token in URL, checking existing localStorage...');
      
      const existingToken = localStorage.getItem('dash_token');
      const existingUser = localStorage.getItem('dash_user');
      
      console.log('📦 Existing localStorage:', {
        dash_token: existingToken ? `EXISTS (length: ${existingToken.length})` : 'NOT FOUND',
        dash_user: existingUser || 'NOT FOUND'
      });
      
      if (!existingToken) {
        console.warn('⚠️ No token found - User is not authenticated');
      }
    }
    
    console.log('🔍 ===== TokenHandler: Complete =====');
    
  }, [searchParams, setSearchParams]);

  return null;
};

export default TokenHandler;