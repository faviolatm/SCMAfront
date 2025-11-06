// src/components/TokenHandler.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const TokenHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Capturar token de la URL
    const urlToken = searchParams.get('token');
    
    if (urlToken) {
      console.log('✅ Token recibido:', urlToken);
      
      // Guardar en localStorage
      localStorage.setItem('analytics_token', urlToken);
      
      // Limpiar la URL (quitar token de la barra de direcciones)
      searchParams.delete('token');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return null;
};

export default TokenHandler;