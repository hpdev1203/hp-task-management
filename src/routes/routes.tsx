import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import Projects from '../pages/Projects';
import Users from '../pages/Users';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="projects" element={<Projects />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 