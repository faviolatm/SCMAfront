// components/cards/BIOptionCard.js
import React from 'react';
import { WarehouseIcons } from '../../../../utils/icons';

const BIOptionCard = ({ option, onClick }) => {
  const IconComponent = WarehouseIcons[option.name];
 
  return (
    <div
      onClick={() => onClick(option.name)}
      className="group relative bg-white rounded-3xl p-8 cursor-pointer shadow-lg hover:shadow-2xl
                 hover:-translate-y-4 transition-all duration-500 ease-out
                 border border-slate-200 hover:border-orange-400
                 overflow-hidden min-h-[280px] hover:bg-orange-50"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      transform -skew-x-12 group-hover:animate-pulse"></div>
      
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
           style={{
             background: 'linear-gradient(to right, rgba(249, 115, 22, 0.3), rgba(251, 146, 60, 0.3), rgba(234, 88, 12, 0.3))'
           }}></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-orange-100 group-hover:bg-orange-200
                          group-hover:scale-110 transition-all duration-300
                          shadow-md group-hover:shadow-lg">
            <div className="text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
              {IconComponent && <IconComponent />}
            </div>
          </div>
        </div>
        
        <h3 className="text-slate-800 text-2xl font-bold mb-4 text-center
                       group-hover:text-orange-600 transition-colors duration-300">
          {option.name}
        </h3>
        
        <p className="text-slate-600 text-base leading-relaxed text-center flex-grow
                      group-hover:text-slate-700 transition-colors duration-300">
          Access comprehensive {option.name.toLowerCase()} analytics and detailed warehouse reporting tools
        </p>
        
        <div className="mt-6 flex justify-center">
          <div className="px-4 py-2 bg-slate-200 group-hover:bg-orange-500
                          rounded-full text-slate-700 group-hover:text-white
                          text-sm font-medium transition-all duration-300
                          transform group-hover:scale-105 shadow-sm group-hover:shadow-md">
            Explore Analytics →
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/40 to-transparent
                      rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="absolute bottom-0 left-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tr-full"
           style={{
             background: 'linear-gradient(to top right, rgba(249, 115, 22, 0.15), transparent)'
           }}></div>
    </div>
  );
};

export default BIOptionCard;