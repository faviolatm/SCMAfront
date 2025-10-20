// src/components/General/EmptyState.js
import React from 'react';

const EmptyState = ({ 
  dashboardType = "dashboards",
  title = "Such an empty place",
  description 
}) => {
  // Descripción por defecto basada en el tipo de dashboard
  const defaultDescription = description || 
    `It looks like you don't have access to any ${dashboardType.toLowerCase()} at the moment. Please contact your administrator if you believe this is an error.`;

  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 text-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-purple-200 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-pink-200 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-green-200 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Enhanced SVG Cat Icon */}
      <div className="mb-8 relative">
        {/* Cat container with subtle shadow */}
          <svg 
            width="140" 
            height="140" 
            viewBox="0 0 200 200" 
            className="text-gray-400 drop-shadow-sm"
            fill="currentColor"
          >
            {/* Cat shadow */}
            <ellipse cx="102" cy="185" rx="35" ry="8" fill="rgba(0,0,0,0.1)" />
            
            {/* Cat body - cream colored */}
            <ellipse cx="100" cy="140" rx="45" ry="35" fill="#f5f5dc" className="animate-pulse" style={{ animationDuration: '3s' }} />
            
            {/* Cat head - cream colored */}
            <circle cx="100" cy="80" r="40" fill="#f5f5dc" />
            
            {/* Siamese face mask - darker points */}
            <path d="M 70 60 Q 85 45 100 50 Q 115 45 130 60 L 125 85 Q 115 95 100 95 Q 85 95 75 85 Z" fill="#5D4037" />
            
            {/* Cat ears - darker points */}
            <polygon points="70,50 80,30 90,50" fill="#5D4037" />
            <polygon points="110,50 120,30 130,50" fill="#5D4037" />
            
            {/* Inner ears */}
            <polygon points="73,47 78,35 83,47" fill="#d2b48c" />
            <polygon points="117,47 122,35 127,47" fill="#d2b48c" />
            
            {/* Cat eyes - blue like Siamese */}
            <ellipse cx="85" cy="75" rx="7" ry="9" fill="white" />
            <ellipse cx="115" cy="75" rx="7" ry="9" fill="white" />
            <ellipse cx="85" cy="75" rx="4" ry="6" fill="#4169e1" />
            <ellipse cx="115" cy="75" rx="4" ry="6" fill="#4169e1" />
            <ellipse cx="85" cy="75" rx="2" ry="4" fill="black" />
            <ellipse cx="115" cy="75" rx="2" ry="4" fill="black" />
            
            {/* Cat nose */}
            <polygon points="100,85 96,89 104,89" fill="#ff69b4" />
            
            {/* Cat mouth */}
            <path d="M 100 92 Q 95 95 90 92" stroke="#5D4037" strokeWidth="2" fill="none" />
            <path d="M 100 92 Q 105 95 110 92" stroke="#5D4037" strokeWidth="2" fill="none" />
            
            {/* Cat whiskers */}
            <line x1="60" y1="80" x2="75" y2="82" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="60" y1="88" x2="75" y2="88" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="125" y1="82" x2="140" y2="80" stroke="#5D4037" strokeWidth="1.5" />
            <line x1="125" y1="88" x2="140" y2="88" stroke="#5D4037" strokeWidth="1.5" />
            
            {/* Cat tail - darker point */}
            <path d="M 145 140 Q 160 120 155 100 Q 150 90 160 85" 
                  stroke="#5D4037" 
                  strokeWidth="10" 
                  fill="none" 
                  strokeLinecap="round"
                  className="animate-pulse"
                  style={{ animationDuration: '4s', animationDelay: '1s' }} />
            
            {/* Cat paws - darker points */}
            <ellipse cx="80" cy="170" rx="8" ry="12" fill="#5D4037" />
            <ellipse cx="120" cy="170" rx="8" ry="12" fill="#5D4037" />
          </svg>
        </div>

      {/* Enhanced empty state text */}
      <div className="space-y-4 z-10 relative">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-500 max-w-lg text-lg leading-relaxed">
          {defaultDescription}
        </p>
      </div>

      {/* Additional visual enhancement - subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), 
                                radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
             }}>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;