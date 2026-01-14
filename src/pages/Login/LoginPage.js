import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EmployeeSearchInput from '../Evaluation/components/EmployeeSearchInput';
import teLogo from '../../assets/te_logo.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState('');

  // Si ya está autenticado, redirigir
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/evaluations');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setError('');
  };

  const handleLogin = async () => {
    if (!selectedEmployee) {
      setError('Please select an employee');
      return;
    }

    setLoggingIn(true);
    setError('');

    const result = await login(selectedEmployee.userid);

    if (result.success) {
      navigate('/evaluations');
    } else {
      setError(result.message || 'Login failed');
      setLoggingIn(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 font-semibold text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Header Section */}
        <div className="text-center mb-10">
          {/* Company Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-2xl">
              <img 
                src={teLogo} 
                alt="TE Connectivity Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>
          
          {/* Welcome Message */}
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
              Welcome
            </h1>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-24"></div>
              <span className="text-gray-400 text-lg font-medium">to the</span>
              <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent w-24"></div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-2">
              Supply Chain Maturity Assessment
            </h2>
            <p className="text-gray-400 text-lg">
              SCMA System
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Let's Get Started
            </h3>
            <p className="text-gray-400">
              To begin, search by your <span className="text-orange-400 font-semibold">USERID</span>, 
              <span className="text-orange-400 font-semibold"> name</span>, or 
              <span className="text-orange-400 font-semibold"> last name</span>
            </p>
          </div>

          {/* Employee Search */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-3">
              Search by USERID, Name, or Last Name
            </label>
            <EmployeeSearchInput
              value={selectedEmployee?.userid || ''}
              onChange={() => {}}
              onEmployeeSelect={handleEmployeeSelect}
              placeholder="Start typing your USERID, name, or last name..."
              className="w-full"
            />
            
            {/* Selected Employee Display */}
            {selectedEmployee && (
              <div className="mt-4 p-4 bg-gray-700/50 border border-gray-600 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">
                      {selectedEmployee.name || selectedEmployee.userid}
                    </p>
                    <p className="text-gray-400 text-sm">
                      ID: {selectedEmployee.userid}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedEmployee || loggingIn}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl ${
              selectedEmployee && !loggingIn
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white transform hover:scale-[1.02] hover:shadow-2xl'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loggingIn ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Continue to Assessment</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            )}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-blue-300 text-sm">
                Your employee information will be used to track your evaluations and monitor your progress throughout the assessment process.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            © 2024 TE Connectivity - Supply Chain Planning Maturity Assessment System
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;