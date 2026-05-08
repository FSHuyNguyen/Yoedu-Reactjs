import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';

const ProtectedRoute = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
