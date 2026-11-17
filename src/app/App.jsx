import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import RouteShell from './RouteShell';
import { ROUTES } from './routes';
import { useInternalNavigation } from './useInternalNavigation';

/** Ancienne adresse .html → nouvelle adresse (en gardant ?… et #…). */
function LegacyRedirect({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
}

/** Application : une route par page (voir routes.js). */
export default function App() {
  const { pathname } = useLocation();
  useInternalNavigation();
  return (
    <Routes>
      {ROUTES.map((route) => (
        // La clé recrée la page à chaque changement d'adresse (comme un chargement).
        <Route key={route.path} path={route.path} element={<RouteShell key={pathname} route={route} />} />
      ))}
      {ROUTES.map((route) => (
        <Route key={`legacy-${route.legacy}`} path={`/${route.legacy}`} element={<LegacyRedirect to={route.path} />} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
