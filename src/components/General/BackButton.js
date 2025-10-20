import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ 
  to, 
  label = "Back", 
  className = "",
  variant = "default" // "default" | "menu"
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back in history
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "menu":
        return "bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600";
      default:
        return "bg-white text-orange-600 hover:bg-orange-50 border-orange-300 hover:border-orange-400";
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        border rounded-lg font-medium text-sm
        transition-all duration-200 ease-in-out
        hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50
        ${getVariantStyles()}
        ${className}
      `}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackButton;