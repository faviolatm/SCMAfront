import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AnalyticsSuite from '../pages/AnalyticsSuite/AnalyticsSuite';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AnalyticsSuite />} />
      <Route path="/analytics-suite" element={<AnalyticsSuite />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;