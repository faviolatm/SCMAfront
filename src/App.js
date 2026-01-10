// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './index.css';

import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';  // ✅ IMPORTAR

const App = () => {
  return (
    <Router>
      <AuthProvider>  {/* ✅ ENVOLVER */}
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>  {/* ✅ ENVOLVER */}
    </Router>
  );
}

export default App;