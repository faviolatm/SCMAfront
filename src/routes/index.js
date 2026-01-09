// src/routes/index.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Pages
import EvaluationHome from '../pages/Evaluation/EvaluationHome';
import EvaluationForm from '../pages/Evaluation/EvaluationForm';
import EvaluationResults from '../pages/Evaluation/EvaluationResults';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home - Lista de evaluaciones */}
      <Route path="/" element={<EvaluationHome />} />
      <Route path="/evaluations" element={<EvaluationHome />} />
      
      {/* Crear/Editar evaluación */}
      <Route path="/evaluation/:id" element={<EvaluationForm />} />
      
      {/* Ver resultados */}
      <Route path="/evaluation/:id/results" element={<EvaluationResults />} />
      
      {/* Redirect cualquier ruta no encontrada */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;