import React, { useState } from 'react';
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi';

function FullscreenToggleButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      // Entra en modo pantalla completa
      document.documentElement.requestFullscreen?.() ||
        document.documentElement.mozRequestFullScreen?.() ||
        document.documentElement.webkitRequestFullscreen?.() ||
        document.documentElement.msRequestFullscreen?.();
    } else {
      // Sale del modo pantalla completa
      document.exitFullscreen?.() ||
        document.mozCancelFullScreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
  };

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  // Escucha los cambios en el estado de pantalla completa
  React.useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  return (
    <button
      onClick={toggleFullscreen}
      className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition"
    >
      {isFullscreen ? (
        <FiMinimize2 className="text-xl" />
      ) : (
        <FiMaximize2 className="text-xl" />
      )}
    </button>
  );
}

export default FullscreenToggleButton;
