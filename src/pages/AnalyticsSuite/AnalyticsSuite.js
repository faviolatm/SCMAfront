import React from 'react';
import { useAnalytics } from './hooks/useAnalytics';
import Loader from '../../components/General/Loader';
import DCManagementSection from './Components/DCManagementSection';
import GlobalFreightSection from './Components/GlobalFreightSection';
import DCQualitySection from './Components/DCQualitySection';
import FreightAuditSection from './Components/FreightAuditSection';
import GlobalControlTowerSection from './Components/GlobalControlTowerSection';
import GlobalPlanningSection from './Components/GlobalPlanningSection';
import AnalyticsSuiteService from '../../services/AnalyticsSuite/AnalyticsSuite_service';

const sectionComponents = {
  'DC Management': DCManagementSection,
  'Global Freight': GlobalFreightSection,
  'DC Quality & Operations': DCQualitySection,
  'Freight Audit & Pay (FAP)': FreightAuditSection,
  'Global Control Tower': GlobalControlTowerSection,
  'Global Planning & ESH': GlobalPlanningSection
};

// Iconos SVG personalizados para warehouse
const WarehouseIcons = {
  'DC Management': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 21h18M4 18V10l8-6 8 6v8M12 2v4M8 14h8v4H8z"/>
      <path d="M9 14v4M15 14v4M12 6v4"/>
      <circle cx="12" cy="8" r="1"/>
    </svg>
  ),
  'Global Freight': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"/>
      <circle cx="8" cy="18" r="2"/>
      <circle cx="18" cy="18" r="2"/>
      <path d="M8 8h4v4H8z"/>
    </svg>
  ),
  'DC Quality & Operations': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6h18l-2 13H5L3 6z"/>
      <path d="M3 6l2-4h14l2 4"/>
      <path d="M8 10v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1"/>
      <circle cx="9" cy="9" r="1"/>
      <circle cx="15" cy="9" r="1"/>
      <path d="M12 15l2-2-2-2-2 2 2 2z"/>
    </svg>
  ),
  'Freight Audit & Pay (FAP)': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="15" height="13"/>
      <path d="M16 8h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6"/>
      <circle cx="7" cy="21" r="1"/>
      <circle cx="17" cy="21" r="1"/>
      <path d="M5 8h8"/>
      <path d="M5 11h6"/>
      <path d="M5 14h4"/>
      <circle cx="19" cy="13" r="1" fill="currentColor"/>
    </svg>
  ),
  'Global Control Tower': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
      <circle cx="12" cy="12" r="2"/>
      <path d="M12 10v4"/>
      <path d="M10 12h4"/>
      <circle cx="8" cy="16" r="1" fill="currentColor"/>
      <circle cx="16" cy="16" r="1" fill="currentColor"/>
    </svg>
  ),
  'Global Planning & ESH': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
      <path d="M7 8h10"/>
      <path d="M7 12h10"/>
      <circle cx="6" cy="8" r="1" fill="currentColor"/>
      <circle cx="6" cy="12" r="1" fill="currentColor"/>
      <path d="M18 8l-2 2 2 2"/>
      <path d="M18 12h-3"/>
    </svg>
  )
};

// AI Icons for AI options
const AIIcons = {
  'InsightEdge': () => (
    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
      <path d="M12 2v5"/>
      <path d="M7 9.5L5 8"/>
      <path d="M17 9.5l2-1.5"/>
    </svg>
  )
};

// Modal de contacto elegante
const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const contacts = [
    {
      name: "R, Rajaram",
      email: "rajaram.r@te.com"
    },
    {
      name: "Suresh, Priyanka",
      email: "priyanka.suresh@te.com"
    },
    {
      name: "Tolentino, Maria Alexandra R",
      email: "alexa.tolentino@te.com"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300">
        {/* Header del modal */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-3xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Contact Support</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <p className="text-slate-600 mb-6 leading-relaxed">
            For any questions or assistance, please contact our support team:
          </p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-4 hover:bg-orange-50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 mb-1">{contact.name}</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-orange-600 hover:text-orange-700 transition-colors duration-200 text-sm"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="w-8 h-8 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Footer del modal */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              We'll get back to you as soon as possible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de error con diseño Tailwind elegante
const ErrorMessage = ({ error, onRetry }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
    <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-8 max-w-md text-center shadow-lg">
      {/* Icono de error */}
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-red-800 font-bold text-xl mb-3">Error Loading Data</h3>
      <p className="text-red-600 mb-6 leading-relaxed">{error}</p>
      
      <button
        onClick={onRetry}
        className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                   text-white font-medium px-6 py-3 rounded-xl transition-all duration-300
                   shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
      >
        <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retry
      </button>
    </div>
  </div>
);

// Card mejorada con iconos warehouse y colores naranjas (para BI)
const BIOption = ({ option, onClick }) => {
  const IconComponent = WarehouseIcons[option.name];
 
  return (
    <div
      onClick={() => onClick(option.name)}
      className="group relative bg-white rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl
                 hover:-translate-y-4 transition-all duration-500 ease-out
                 border border-slate-200 hover:border-orange-400
                 overflow-hidden min-h-[280px] hover:bg-orange-50"
    >
      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      transform -skew-x-12 group-hover:animate-pulse"></div>
      
      {/* Borde brillante en hover con colores naranja */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
           style={{
             background: 'linear-gradient(to right, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.3), rgba(234, 88, 12, 0.3))'
           }}></div>
      
      {/* Contenido */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icono con efecto de hover */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-orange-100 group-hover:bg-orange-200
                          group-hover:scale-110 transition-all duration-300
                          shadow-md group-hover:shadow-lg">
            <div className="text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
              {IconComponent && <IconComponent />}
            </div>
          </div>
        </div>
        
        {/* Título */}
        <h3 className="text-slate-800 text-2xl font-bold mb-4 text-center
                       group-hover:text-orange-600 transition-colors duration-300">
          {option.name}
        </h3>
        
        {/* Descripción */}
        <p className="text-slate-600 text-base leading-relaxed text-center flex-grow
                      group-hover:text-slate-700 transition-colors duration-300">
          Access comprehensive {option.name.toLowerCase()} analytics and detailed warehouse reporting tools
        </p>
        
        {/* Indicador de acción */}
        <div className="mt-6 flex justify-center">
          <div className="px-4 py-2 bg-slate-200 group-hover:bg-orange-500
                          rounded-full text-slate-700 group-hover:text-white
                          text-sm font-medium transition-all duration-300
                          transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
            Explore Analytics →
          </div>
        </div>
      </div>

      {/* Efecto de esquina brillante */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent
                      rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Efecto de esquina inferior naranja */}
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-full"
           style={{
             background: 'linear-gradient(to top right, rgba(249, 115, 22, 0.15), transparent)'
           }}></div>
    </div>
  );
};


const AIOption = ({ option, onClick }) => {
  const IconComponent = AIIcons[option.name];
  
  return (
    <div 
      onClick={() => onClick(option.name)} 
      className="group relative bg-white rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 ease-out border border-slate-200 hover:border-orange-400 overflow-hidden min-h-[280px] hover:bg-orange-50"
    >
      {/* Efecto de brillo sutil */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>
      
      {/* Borde brillante en hover con colores naranja */}
      <div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" 
        style={{ 
          background: 'linear-gradient(to right, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.3), rgba(234, 88, 12, 0.3))' 
        }}
      ></div>
      
      {/* Contenido */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icono con efecto de hover */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-orange-100 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
            <div className="text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
              {IconComponent && <IconComponent />}
            </div>
          </div>
        </div>
        
        {/* Título */}
        <h3 className="text-slate-800 text-2xl font-bold mb-4 text-center group-hover:text-orange-600 transition-colors duration-300">
          {option.name}
        </h3>
        
        {/* Descripción */}
        <p className="text-slate-600 text-base leading-relaxed text-center flex-grow group-hover:text-slate-700 transition-colors duration-300">
          {option.description || `Explore ${option.name} AI-powered analytics and intelligent insights`}
        </p>
        
        {/* Indicador de acción */}
        <div className="mt-6 flex justify-center">
          <div className="px-4 py-2 bg-slate-200 group-hover:bg-orange-500 rounded-full text-slate-700 group-hover:text-white text-sm font-medium transition-all duration-300 transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
            Launch Application →
          </div>
        </div>
      </div>
      
      {/* Efecto de esquina brillante */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Efecto de esquina inferior naranja */}
      <div 
        className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-full" 
        style={{ 
          background: 'linear-gradient(to top right, rgba(249, 115, 22, 0.15), transparent)' 
        }}
      ></div>
    </div>
  );
};



// Card principal con imágenes de fondo - URLs desde el service centralizado
const MainCard = ({ title, subtitle, imageKey, onClick }) => {
  const imageUrls = AnalyticsSuiteService.getImageUrls();
  const imageUrl = imageUrls[imageKey.toLowerCase()];
 
  // Configuración especial para la card Contact
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
            {/* Círculo exterior con pulso */}
            <div className="absolute inset-0 w-24 h-24 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
            {/* Círculo medio */}
            <div className="absolute inset-2 w-20 h-20 bg-white bg-opacity-30 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
            {/* Icono principal */}
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
          {/* Partículas flotantes */}
          <div className="absolute top-8 right-12 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-16 right-8 w-1.5 h-1.5 bg-white bg-opacity-30 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-12 right-20 w-1 h-1 bg-white bg-opacity-50 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
          
          {/* Líneas decorativas */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-6 left-6 w-8 h-0.5 bg-white bg-opacity-30 transform rotate-45"></div>
            <div className="absolute bottom-6 right-6 w-12 h-0.5 bg-white bg-opacity-20 transform -rotate-45"></div>
          </div>
          
          {/* Círculo decorativo grande */}
          <div className="absolute -top-8 -right-8 w-24 h-24 border border-white border-opacity-20 rounded-full"></div>
          <div className="absolute -bottom-6 -left-6 w-16 h-16 border border-white border-opacity-15 rounded-full"></div>
        </>
      )}
    </div>
  );
};

// Botón de regreso elegante reutilizable
const BackButton = ({ onClick, children, className = "" }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900
               text-white font-medium px-6 py-3 rounded-xl transition-all duration-300
               shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 ${className}`}
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
    {children}
  </button>
);

const AnalyticsSuite = () => {
  const [showContactModal, setShowContactModal] = React.useState(false);
 
  const {
    currentView,
    currentSection,
    biOptions,
    aiOptions,
    isAdmin,
    analyticsData,
    loading,
    error,
    handleAIClick,
    handleBIClick,
    handleBIOptionClick,
    handleAIOptionClick,
    handleBackToMain,
    handleBackToBIOptions,
    handleBackToAIOptions,
    handleDataUpdate
  } = useAnalytics();

  const renderSection = () => {
    const Component = sectionComponents[currentSection];
   
    if (!Component) {
      return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <BackButton onClick={handleBackToBIOptions} className="mb-8">
            Back to BI Options
          </BackButton>
         
          <div className="text-center p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 inline-block">
              <h3 className="text-yellow-800 font-semibold mb-2">Section Not Found</h3>
              <p className="text-yellow-600">The requested section could not be found</p>
            </div>
          </div>
        </div>
      );
    }

    if (loading && analyticsData.length === 0) {
      return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <BackButton onClick={handleBackToBIOptions} className="mb-8">
            Back to BI Options
          </BackButton>
         
          <div className="mt-20">
            <Loader />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
          <BackButton onClick={handleBackToBIOptions} className="mb-8">
            Back to BI Options
          </BackButton>
          <ErrorMessage error={error} onRetry={handleDataUpdate} />
        </div>
      );
    }

    return (
      <Component
        onBack={handleBackToBIOptions}
        isAdmin={isAdmin}
        data={analyticsData}
        onDataUpdate={handleDataUpdate}
        loading={loading}
      />
    );
  };

  if (currentView === 'section') {
    return renderSection();
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      {currentView === 'main' ? (
        <>
          {/* Header con gradiente */}
          <div className="text-center mb-12">
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Choose your analytics platform to access powerful insights and data-driven solutions
            </p>
          </div>

          {/* Main Cards */}
          <div className="flex gap-8 justify-center items-center flex-wrap">
            <MainCard
              title="AI"
              subtitle="Artificial Intelligence & Machine Learning Solutions"
              imageKey="ai"
              onClick={handleAIClick}
            />
            <MainCard
              title="BI"
              subtitle="Business Intelligence & Data Analytics Platform"
              imageKey="bi"
              onClick={handleBIClick}
            />
            <MainCard
              title="Contact"
              subtitle="Get Support & Technical Assistance"
              imageKey="contact"
              onClick={() => setShowContactModal(true)}
            />
          </div>

          {/* Modal de contacto */}
          <ContactModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
          />
        </>
      ) : currentView === 'bi' ? (
        <div>
          {/* Header de BI Options */}
          <div className="mb-12">
            <BackButton onClick={handleBackToMain} className="mb-6">
              Back to Main
            </BackButton>            
            <div className="text-center">
            </div>
          </div>

          {/* BI Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {biOptions.map((option) => (
              <BIOption
                key={option.name}
                option={option}
                onClick={handleBIOptionClick}
              />
            ))}
          </div>
        </div>
      ) : currentView === 'ai' ? (
        <div>
          {/* Header de AI Options */}
          <div className="mb-12">
            <BackButton onClick={handleBackToMain} className="mb-6">
              Back to Main
            </BackButton>            
            <div className="text-center">
            </div>
          </div>

          {/* AI Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {aiOptions.map((option) => (
              <AIOption
                key={option.name}
                option={option}
                onClick={handleAIOptionClick}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default AnalyticsSuite;