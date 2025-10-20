import React, { useState } from 'react';
import { FaBars, FaSignOutAlt } from 'react-icons/fa'; // Importamos el ícono de logout
import { useNavigate } from 'react-router-dom'; // Para la navegación
import logo from '../../assets/TE_Logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el sidebar está abierto
  const navigate = useNavigate(); // Hook para redirigir al usuario

  // Links fijos dentro del componente
  const menuLinks = [
    { name: 'CHANGE PASSWORD', href: '/change-password' },    
    { name: 'HLDC', href: '/HLDC' },
    { name: 'EPDC', href: '/EPDC' },
    { name: 'PADC', href: '/PADC' },
    { name: 'NCDC', href: '/NCDC' },
  ];

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('dash_user');
    localStorage.removeItem('dash_user_name');
    localStorage.removeItem('dash_dc');
    localStorage.removeItem('dash_warehouse');
    localStorage.removeItem('isAuthenticatedDashboards');
    localStorage.removeItem('dash_access_level');
    localStorage.removeItem('dash_token');
    localStorage.removeItem('dash_crossdock');
    localStorage.removeItem('dash_department');
    localStorage.removeItem('dash_main_path');
    localStorage.removeItem('autoRefreshEnabled');

    // Redirigir al login
    navigate('/Login');
  };

  return (
    <>
      {/* Icono de hamburguesa visible solo si el sidebar está cerrado */}
      {!isOpen && (
        <button
          className="fixed top-3 left-6 z-50 text-xl p-2 text-gray-600 rounded-md focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="size-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200"
          >
            <path 
              fillRule="evenodd" 
              d="M4.25 2A2.25 2.25 0 0 0 2 4.25v2.5A2.25 2.25 0 0 0 4.25 9h2.5A2.25 2.25 0 0 0 9 6.75v-2.5A2.25 2.25 0 0 0 6.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 2 13.25v2.5A2.25 2.25 0 0 0 4.25 18h2.5A2.25 2.25 0 0 0 9 15.75v-2.5A2.25 2.25 0 0 0 6.75 11h-2.5Zm9-9A2.25 2.25 0 0 0 11 4.25v2.5A2.25 2.25 0 0 0 13.25 9h2.5A2.25 2.25 0 0 0 18 6.75v-2.5A2.25 2.25 0 0 0 15.75 2h-2.5Zm0 9A2.25 2.25 0 0 0 11 13.25v2.5A2.25 2.25 0 0 0 13.25 18h2.5A2.25 2.25 0 0 0 18 15.75v-2.5A2.25 2.25 0 0 0 15.75 11h-2.5Z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      )}

      {/* Sidebar oculto y visible al hacer clic en el botón */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Contenido del sidebar */}
        <h2 className="text-2xl font-bold mb-6 text-center">My DC</h2> {/* Centrar el texto del título */}
        
        <ul className="flex flex-col items-center"> {/* Centrar los enlaces del menú */}
          {menuLinks.map((link, index) => (
            <li key={index} className="mb-4">
              <a href={link.href} className="text-lg text-gray-400 hover:text-white">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Logo en la parte inferior centrado */}
        <div className="absolute bottom-20 left-0 w-full flex justify-center">
          <img src={logo} alt="Logo" className="w-14 h-10" />
        </div>

        {/* Logout en la parte inferior */}
        <button
          className="absolute bottom-4 left-0 w-full flex justify-center text-gray-400 hover:text-white"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-2xl" />
          <span className="ml-2">Logout</span>
        </button>
      </div>

      {/* Capa de fondo oscuro al abrir el sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar} // Cerrar sidebar al hacer clic fuera del menú
        ></div>
      )}
    </>
  );
};

export default Sidebar;
