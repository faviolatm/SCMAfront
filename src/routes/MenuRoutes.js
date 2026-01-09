// src/routes/MenuRoutes.js
import EvaluationHome from '../pages/Evaluation/EvaluationHome';
import EvaluationForm from '../pages/Evaluation/EvaluationForm';
import EvaluationResults from '../pages/Evaluation/EvaluationResults';

export const MenuRoutes = [
  {
    path: '/evaluations',
    title: "Evaluaciones",
    component: EvaluationHome,
  },
  {
    path: '/evaluation/:id',
    title: "Realizar Evaluación",
    component: EvaluationForm,
    hideInMenu: true, // No mostrar en el menú, solo accesible por link directo
  },
  {
    path: '/evaluation/:id/results',
    title: "Resultados",
    component: EvaluationResults,
    hideInMenu: true, // No mostrar en el menú
  },
];