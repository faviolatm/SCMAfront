// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import './index.css';

import AppRoutes from './routes';

const App = () => {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;