import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaWarehouse, FaSignOutAlt, FaUserCog, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import teLogo from '../../assets/TE.webp';

const Header = ({ centerText, showBuildingNum = false, transparent = false, setTransparent = null }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const profileMenuRef = useRef(null);
  
  const userName = localStorage.getItem('dash_user_name') || 'User';
  const userDc = localStorage.getItem('dash_dc') || 'Unknown DC';
  const [buildingNum] = useState(localStorage.getItem('dash_warehouse')); 

  // Get user initials
  const getInitials = (name) => {
    const namesArray = name.trim().split(' ');
    return namesArray.map((n) => n.charAt(0).toUpperCase()).join('').slice(0, 2);
  };

  const initials = getInitials(userName);

  const handleLogout = () => {
    // Clear all localStorage items
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
    localStorage.removeItem('dash_appointments_level');
    localStorage.removeItem('dash_forcepasswordchange');
    localStorage.removeItem('dash_permissions');
    localStorage.removeItem('selectedWarehouse');
    localStorage.removeItem('authToken');
    localStorage.removeItem('pass');
    localStorage.removeItem('employee');
    localStorage.removeItem('buCode');

    // Redirect to login page
    navigate('/Login');
  };

  // Function to handle navigation to home and reset transparency
  const handleHomeNavigation = () => {
    // If setTransparent prop is provided, set it to false
    if (setTransparent) {
      setTransparent(false);
    }
    
    // Navigate to Menu page
    navigate('/Menu');
  };

  // Close the profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

  return (
    <>
      <header className={`w-full border-b ${transparent ? 'border-transparent bg-transparent backdrop-blur-sm' : 'border-gray-200 bg-white shadow-sm'} h-16 flex items-center justify-between px-4 fixed top-0 left-0 z-50`}>
        {/* Left side: Menu toggle and TE Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu toggle button */}
          <button 
            className={`block sm:hidden ${transparent ? 'text-white hover:text-orange-300' : 'text-gray-600 hover:text-orange-500'} focus:outline-none`}
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            aria-label="Toggle menu"
          >
            <FaBars className="text-xl" />
          </button>
          
          {/* TE Logo */}
          <div className="flex items-center">
            <div className="bg-orange-500 rounded-full p-1.5 mr-2">
              <img src={teLogo} alt="TE Connectivity" className="w-6 h-6 object-contain" />
            </div>
            <div className="hidden md:block">
              <p className={`text-sm ${transparent ? 'text-white font-medium' : 'text-gray-800 font-bold'} leading-tight`}>TE Connectivity</p>
              <p className={`text-xs ${transparent ? 'text-gray-200' : 'text-gray-800 font-bold'}`}>Global Logistics</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>

          {/* Home Button */}
          <button 
            className={`hidden sm:flex items-center justify-center px-3 py-2 rounded-lg transition-colors
              ${transparent 
                ? 'text-white hover:text-gray-300 hover:bg-white/10' 
                : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={handleHomeNavigation}
          >
            <FaHome className="text-lg" />
            <span className="ml-2">Home</span>
          </button>

          {/* Building indicator */}
          {showBuildingNum && buildingNum && (
            <div className="hidden sm:flex items-center text-gray-700 bg-gray-100 py-1 px-3 rounded-full">
              <FaWarehouse className="mr-1 text-sm text-orange-500" />
              <span className="text-sm font-medium">{buildingNum}</span>
            </div>
          )}
        </div>

        {/* Center: Page Title */}
        {centerText && !transparent && (
          <div className={`absolute left-1/2 transform -translate-x-1/2 ${transparent ? 'text-white' : 'text-gray-800'} text-3xl font-semibold flex items-center`}>
            {centerText}
            {showBuildingNum && buildingNum && (
              <div className="sm:hidden ml-2 flex items-center text-gray-700 bg-gray-100 py-0.5 px-2 rounded-full text-sm">
                <FaWarehouse className="mr-1 text-xs text-orange-500" />
                {buildingNum}
              </div>
            )}
          </div>
        )}

        {/* Right side: User profile dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
          >
            {/* User info - hidden on small screens */}
            <div className="hidden sm:flex flex-col text-right mr-2">
              <span className={`${transparent ? 'text-white' : 'text-gray-800'} text-sm font-medium truncate`}>{userName}</span>
              <span className={`${transparent ? 'text-gray-300' : 'text-gray-500'} text-xs truncate`}>{userDc}</span>
            </div>
            
            {/* Profile dropdown indicator */}
            <div className="flex items-center">
              {/* Avatar with initials */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-medium shadow-sm">
                {initials}
              </div>
              <FaChevronDown className={`ml-3 ${transparent ? 'text-gray-200' : 'text-gray-500'} transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>

          {/* Profile dropdown menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[9999] border border-gray-200">
              {/* User info - visible on small screens */}
              <div className="sm:hidden px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-800">{userName}</p>
                <p className="text-xs text-gray-500">{userDc}</p>
              </div>
              
              {/* Menu items */}
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  handleHomeNavigation();
                }}
                className="block sm:hidden w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaHome className="inline mr-2 text-gray-500" />
                Home
              </button>
              
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate('/change-password');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUserCog className="inline mr-2 text-gray-500" />
                Change Password
              </button>
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaSignOutAlt className="inline mr-2 text-gray-500" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-[9990] ${isMobileSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
        
        {/* Sidebar panel */}
        <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col">
          {/* Sidebar header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-500 rounded-full p-1.5">
                <img src={teLogo} alt="TE Connectivity" className="w-6 h-6 object-contain" />
              </div>
              <div>
                <h2 className="font-bold text-lg">MyDC</h2>
                <p className="text-xs text-gray-600">TE Logistics Tools</p>
              </div>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          
          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-medium mb-2">Navigation</h3>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      handleHomeNavigation();
                    }}
                    className="w-full flex items-center px-3 py-2 text-gray-700 rounded hover:bg-gray-100"
                  >
                    <FaHome className="mr-3 text-orange-500" />
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      navigate('/change-password');
                    }}
                    className="w-full flex items-center px-3 py-2 text-gray-700 rounded hover:bg-gray-100"
                  >
                    <FaUserCog className="mr-3 text-orange-500" />
                    <span>Change Password</span>
                  </button>
                </li>
              </ul>
            </div>
            
            {/* User info in sidebar */}
            <div className="mt-auto pt-4 border-t border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-medium mr-3">
                  {initials}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">{userDc}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                <FaSignOutAlt className="mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Define prop types
Header.propTypes = {
  centerText: PropTypes.string,
  showBuildingNum: PropTypes.bool,
  transparent: PropTypes.bool,
  setTransparent: PropTypes.func,
};

export default Header;