import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import Projects from '../pages/Projects';
import Users from '../pages/Users';
import Auth from '../pages/Auth'; // Import Auth page
import ProtectedRoute from '../components/ProtectedRoute'; // Import ProtectedRoute

const AppRoutes = () => {
  return (
    <Routes>
      {/* Authentication Route (Public) */}
      <Route path="/auth" element={<Auth />} />

      {/* Protected Routes (Require Login) */}
      <Route element={<ProtectedRoute />}> {/* Wrap protected routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="projects" element={<Projects />} />
          <Route path="users" element={<Users />} />
          {/* Add other protected routes inside Layout here */}
        </Route>
        {/* Add other protected routes outside Layout here */}
      </Route>

      {/* Optional: Add a 404 Not Found route */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
