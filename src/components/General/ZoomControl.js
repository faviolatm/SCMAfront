import { useState } from "react";

const ZoomControl = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState(0.70);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
  };
  
  const handleReset = () => {
    setZoomLevel(0.7);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="relative w-full h-full">
      <div className="fixed top-2 right-72 z-50">
        <button
          className="px-3 py-2 bg-gray-200 text-gray-800 rounded shadow border border-gray-300 flex items-center justify-center"
          onClick={toggleMenu}
          title="Zoom Controls"
        >
          <span className="text-sm font-medium">🔍︎</span>
        </button>
        
        {/* Dropdown menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-1 bg-white rounded shadow-md border border-gray-300 overflow-hidden">
            <div className="flex flex-col w-40">
              <button
                 className="px-4 py-2 text-sm text-left hover:bg-gray-100 border-b border-gray-200 flex items-center"
                 onClick={handleZoomIn}
              >
                <span className="mr-2">+</span> Zoom In
              </button>
              <button
                 className="px-4 py-2 text-sm text-left hover:bg-gray-100 border-b border-gray-200 flex items-center"
                 onClick={handleZoomOut}
              >
                <span className="mr-2">−</span> Zoom Out
              </button>
              <button
                 className="px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center"
                 onClick={handleReset}
              >
                <span className="mr-2">↺</span> Reset
               </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-full">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "top left",
            width: `${100 / zoomLevel}%`,
            minHeight: `${100 / zoomLevel}%`,
            display: "inline-block"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ZoomControl;