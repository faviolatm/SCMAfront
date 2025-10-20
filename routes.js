import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './pages/PrivateRoute';
import NotFound from './pages/NotFound';
import Login from './pages/Auth/login';

import { MenuRoutes } from './routes/MenuRoutes';
import { DcRoutes } from './routes/Dashboards/DcRoutes';
import { GlobalRoutes } from './routes/Dashboards/GlobalRoutes';

import DashboardLayout from './components/General/DashboardLayout';
import DcMenu from './pages/Dashboards/DC/DcMenu';
import DashboardMenu from './pages/Dashboards/dash_menu';
import MenuTEOA from './pages/TEOA/teoa_menu';

// ✅ Lista centralizada de usuarios bloqueados
const BLOCKED_USERS = ['AUTL30TE','IND-CR','TEmpAUT', 'TucAUT23'];

const AppRoutes = () => (
  <Routes>
    <Route path="/Login" element={<Login />} />

    <Route
      path="/Dashboards"
      element={
        <PrivateRoute
          usersBlocked={BLOCKED_USERS}
          element={
            <DashboardLayout title="Dashboards" transparent={true}>
              <DashboardMenu />
            </DashboardLayout>
          }
        />
      }
    />

    <Route
      path="/teoa"
      element={
        <PrivateRoute
          element={
            <DashboardLayout title="TEOA" transparent={true}>
              <MenuTEOA />
            </DashboardLayout>
          }
        />
      }
    />

    {MenuRoutes.map(({ path, title, component: Component }) => {
      // EXCEPCIÓN: Solo para /Crossdock permites a IND-CR
      const EXCEPTION_PATHS = ['/Crossdock', '/Menu'];
      const exceptionUsersAllowed = EXCEPTION_PATHS.includes(path) ? BLOCKED_USERS : undefined;

      return (
        <Route
          key={path}
          path={path}
          element={
            <PrivateRoute
              requiredRoles={[]}
              usersBlocked={BLOCKED_USERS}
              exceptionUsersAllowed={exceptionUsersAllowed}
              element={
                <DashboardLayout title={title}>
                  <Component />
                </DashboardLayout>
              }
            />
          }
        />
      );
    })}

    {DcRoutes.map(({ path, title, component: Component }) => (
      <Route
        key={path}
        path={path}
        element={
          <PrivateRoute
            usersBlocked={BLOCKED_USERS}
            requiredRoles={[]}
            element={
              <DashboardLayout title={title} showBuildingNum={true}>
                <Component />
              </DashboardLayout>
            }
          />
        }
      />
    ))}

    {GlobalRoutes.map(({ path, title, component: Component }) => (
      <Route
        key={path}
        path={path}
        element={
          <PrivateRoute
            usersBlocked={BLOCKED_USERS}
            requiredRoles={[]}
            element={
              <DashboardLayout title={title}>
                <Component />
              </DashboardLayout>
            }
          />
        }
      />
    ))}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
