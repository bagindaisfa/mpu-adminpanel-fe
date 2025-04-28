import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import MainLayout from '../components/MainLayout';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <MainLayout>{children}</MainLayout>;
};

export default ProtectedRoute;
