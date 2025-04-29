import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Blogs from '../pages/Blogs';
import Assessments from '../pages/Assessments';
import ProtectedRoute from './ProtectedRoute';
import Comments from '../pages/Comments';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessments"
          element={
            <ProtectedRoute>
              <Assessments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/comments"
          element={
            <ProtectedRoute>
              <Comments />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
