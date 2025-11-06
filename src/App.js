// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './index.css';

import AppRoutes from './routes';
import TokenHandler from './components/General/TokenHandler';

const App = () => {
  return (
    <Router>
      <TokenHandler /> {/* 🔹 Solo esto */}
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;