import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-100 p-4">
      <ul className="space-y-2">
        <li>
          <Link to="/projects" className="block px-4 py-2 rounded-md hover:bg-gray-200">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="block px-4 py-2 rounded-md hover:bg-gray-200">
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/users" className="block px-4 py-2 rounded-md hover:bg-gray-200">
            Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;