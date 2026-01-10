// src/routes/index.js
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Pages
import LoginPage from '../pages/Login/LoginPage';
import EvaluationHome from '../pages/Evaluation/EvaluationHome';
import EvaluationForm from '../pages/Evaluation/EvaluationForm';
import EvaluationResults from '../pages/Evaluation/EvaluationResults';
import NotFound from '../pages/NotFound';

// =============================================
// Protected Route Component
// =============================================
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log('🛡️ ProtectedRoute check:', { isAuthenticated, loading });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-gray-700 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-300 font-semibold text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('✅ Authenticated, showing protected content');
  return children;
};

// =============================================
// Main Routes
// =============================================
const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log('🔄 AppRoutes render:', { isAuthenticated, loading });

  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route 
        path="/login" 
        element={
          // Si ya está autenticado, redirigir a /evaluations
          isAuthenticated ? <Navigate to="/evaluations" replace /> : <LoginPage />
        } 
      />

      {/* ==================== PROTECTED ROUTES ==================== */}
      
      {/* Home - Lista de evaluaciones */}
      <Route
        path="/evaluations"
        element={
          <ProtectedRoute>
            <EvaluationHome />
          </ProtectedRoute>
        }
      />

      {/* Formulario de evaluación */}
      <Route
        path="/evaluation/:id"
        element={
          <ProtectedRoute>
            <EvaluationForm />
          </ProtectedRoute>
        }
      />

      {/* Resultados de evaluación */}
      <Route
        path="/evaluation/:id/results"
        element={
          <ProtectedRoute>
            <EvaluationResults />
          </ProtectedRoute>
        }
      />

      {/* ==================== REDIRECTS ==================== */}
      
      {/* Root redirect - IMPORTANTE */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? <Navigate to="/evaluations" replace /> 
            : <Navigate to="/login" replace />
        } 
      />

      {/* 404 - Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;