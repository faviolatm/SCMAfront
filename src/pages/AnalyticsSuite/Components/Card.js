// components/Card.js
import React from 'react';

const Card = ({ title, subtitle, bgColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${bgColor} text-white rounded-lg p-16 w-96 h-72 cursor-pointer 
                  shadow-lg hover:shadow-xl hover:-translate-y-2 
                  transition-all duration-300 ease-in-out
                  flex flex-col justify-center items-center
                  border border-white/10`}
    >
      <h2 className="text-5xl font-bold mb-4">
        {title}
      </h2>
      
      <p className="text-lg text-center opacity-90">
        {subtitle}
      </p>
    </div>
  );
};

export default Card;