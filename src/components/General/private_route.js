import React, { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = React.memo(function PrivateRoute({ element: Element, requiredRoles }) {
  const isAuthenticatedDashboards = useMemo(() => !!localStorage.getItem('isAuthenticatedDashboards'), []);
  const forcePasswordChange = useMemo(() => localStorage.getItem('forcePasswordChange') === 'true', []);
  const location = useLocation();

  // Si la contraseña está vencida y el usuario no está en /change-password, redirigir
  if (forcePasswordChange && location.pathname !== '/change-password') {
    return (
      <Navigate 
        to="/change-password" 
        replace 
      />
    );
  }

  if (!isAuthenticatedDashboards) {
    return (
      <Navigate 
        to="/Dash-Menu" 
        state={{ error: 'You do not have access to this content.' }} 
        replace 
      />
    );
  }

  return <Element />;
});

export default PrivateRoute;
