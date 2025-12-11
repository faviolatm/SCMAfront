// components/cards/MainCard.js
import React from 'react';
import AnalyticsSuiteService from '../../../services/AnalyticsSuite_service';

const MainCard = ({ title, subtitle, imageKey, onClick }) => {
  const imageUrls = AnalyticsSuiteService.getImageUrls();
  const imageUrl = imageUrls[imageKey.toLowerCase()];
  const isContactCard = title === "Contact";
 
  return (
    <div
      onClick={onClick}
      className="group relative w-[450px] h-80 cursor-pointer overflow-hidden rounded-3xl
                 transform transition-all duration-500 hover:-translate-y-4 hover:scale-105
                 shadow-xl hover:shadow-2xl"
      style={!isContactCard ? {
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : {
        background: 'linear-gradient(135deg, #fb923c 0%, #f97316 25%, #ea580c 75%, #c2410c 100%)',
        boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.4)'
      }}
    >
      {/* Overlay para mejor contraste - solo para cards con imagen */}
      {!isContactCard && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
      )}
      
      {/* Efecto glassmorphism para Contact */}
      {isContactCard && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 backdrop-blur-sm"></div>
      )}
      
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700
                      transform -skew-x-12 group-hover:translate-x-full duration-1000"></div>
      
      {/* Borde brillante */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/30 via-transparent to-white/30
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[2px]">
        <div className="w-full h-full bg-transparent rounded-3xl"></div>
      </div>
      
      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
        {/* Icono elegante para Contact */}
        {isContactCard && (
          <div className="mb-6 relative">
            <div className="absolute inset-0 w-24 h-24 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 w-20 h-20 bg-white bg-opacity-30 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative w-24 h-24 bg-white bg-opacity-25 rounded-full flex items-center justify-center
                            group-hover:bg-opacity-40 transition-all duration-300 backdrop-blur-sm
                            border border-white border-opacity-30">
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
              </svg>
            </div>
          </div>
        )}
        
        <h2 className={`font-bold mb-4 drop-shadow-lg group-hover:scale-110 transition-transform duration-300 ${
          isContactCard ? 'text-4xl' : 'text-6xl'
        }`}
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8)' }}>
          {title}
        </h2>
        <p className={`font-medium opacity-90 drop-shadow text-center leading-relaxed group-hover:scale-105 transition-transform duration-300 ${
          isContactCard ? 'text-lg' : 'text-xl'
        }`}
           style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          {subtitle}
        </p>
      </div>

      {/* Efecto de esquina brillante */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/20 to-transparent
                      rounded-tr-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
      
      {/* Elementos decorativos elegantes para Contact */}
      {isContactCard && (
        <>
          <div className="absolute top-8 right-12 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-16 right-8 w-1.5 h-1.5 bg-white bg-opacity-30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-12 right-20 w-1 h-1 bg-white bg-opacity-50 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-6 left-6 w-8 h-0.5 bg-white bg-opacity-30 transform rotate-45"></div>
            <div className="absolute bottom-6 right-6 w-12 h-0.5 bg-white bg-opacity-20 transform -rotate-45"></div>
          </div>
          
          <div className="absolute -top-8 -right-8 w-24 h-24 border border-white border-opacity-20 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 border border-white border-opacity-15 rounded-full"></div>
        </>
      )}
    </div>
  );
};

export default MainCard;