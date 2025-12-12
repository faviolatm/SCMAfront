// src/components/General/TokenHandler.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const TokenHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get('token');
    
    if (urlToken) {
      try {
        // Save token to localStorage
        localStorage.setItem('dash_token', urlToken);
        
        // Decode JWT to extract user_id
        const payload = JSON.parse(atob(urlToken.split('.')[1]));
        
        const userId = payload.sub;
        if (userId) {
          localStorage.setItem('dash_user', userId);
        }
        
        // Optional: Save AccessLevel if exists
        if (payload.AccessLevel) {
          localStorage.setItem('dash_access_level', payload.AccessLevel);
        }
        
        // Optional: Save warehouse if exists
        if (payload.Warehouse) {
          localStorage.setItem('dash_warehouse', payload.Warehouse);
        }
        
      } catch (error) {
        console.error('Error decoding token:', error);
      }
      
      // Clean URL (remove token from address bar)
      searchParams.delete('token');
      setSearchParams(searchParams, { replace: true });
    }
    
  }, [searchParams, setSearchParams]);

  return null;
};

export default TokenHandler;