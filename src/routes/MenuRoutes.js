// src/routes/MenuRoutes.js
import AnalyticsSuite from '../pages/AnalyticsSuite/AnalyticsSuite';
import PartLookup from '../pages/AnalyticsSuite/Components/InsightEdge/PartLookup';

export const MenuRoutes = [
  {
    path: '/analytics-suite',
    title: "Analytics Suite",
    component: AnalyticsSuite,
  },
  {
    path: '/analytics-suite/insightedge',
    title: "InsightEdge",
    component: PartLookup,
  }
  // Aquí puedes agregar más rutas después si necesitas
];