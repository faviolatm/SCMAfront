import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import EmployeeSearchInput from '../Evaluation/components/EmployeeSearchInput';

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
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-2xl">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            SCMA System
          </h1>
          <p className="text-gray-400 text-lg">
            Supply Chain Maturity Assessment
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Sign In
          </h2>

          {/* Employee Search */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Search your USERID or name
            </label>
            <EmployeeSearchInput
              value={selectedEmployee?.userid || ''}
              onChange={() => {}}
              onEmployeeSelect={handleEmployeeSelect}
              placeholder="Type your USERID or name..."
              className="w-full"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedEmployee || loggingIn}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-xl ${
              selectedEmployee && !loggingIn
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white transform hover:scale-[1.02]'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loggingIn ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              <span className="font-semibold">Note:</span> Your employee information will be used to track your evaluations and progress.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Supply Chain Planning Maturity Assessment System
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;