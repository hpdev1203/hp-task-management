import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Placeholder Icons (Replace with your preferred icon library)
const DashboardIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
 </svg>
);

const TaskIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08H13.5A2.25 2.25 0 0 0 11.25 6v1.5m7.5.375v10.5a2.25 2.25 0 0 1-2.25 2.25H6.75a2.25 2.25 0 0 1-2.25-2.25V6.375" />
  </svg>
);

const ProjectIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
 </svg>
);

const UsersIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-3">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
 </svg>
);

const CloseIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
 </svg>
);


interface SidebarProps {
  onClose?: () => void; // For mobile view closing
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: DashboardIcon },
    { name: 'Tasks', href: '/tasks', icon: TaskIcon },
    { name: 'Projects', href: '/projects', icon: ProjectIcon },
    { name: 'Users', href: '/users', icon: UsersIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      {/* Sidebar Header (Branding) */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200 flex-shrink-0">
         {/* Replace with your actual logo/title */}
        <div className="flex items-center">
           <div className="p-2 bg-indigo-100 rounded-lg">
             {/* Placeholder Logo Icon */}
             <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 1.085m1-1.085.998 1.085m0 0 .002.002.002.002a2.25 2.25 0 0 1 3.496 2.121 2.25 2.25 0 0 1-1.06 1.06H9.75M16.5 16.5l1-1.085m-1 1.085-.998 1.085m0 0-.002.002-.002.002a2.25 2.25 0 0 0-3.496 2.121 2.25 2.25 0 0 0 1.06 1.06H14.25" />
             </svg>
           </div>
           <span className="ml-3 text-lg font-semibold text-gray-900">Task Manager</span>
        </div>
         {/* Mobile Close Button (only shown if onClose is provided) */}
         {onClose && (
            <button
                onClick={onClose}
                className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-label="Close sidebar"
             >
                <CloseIcon />
            </button>
         )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
                isActive(item.href)
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <item.icon />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Optional: Sidebar Footer (e.g., User info, Logout) */}
      {/*
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <a href="#" className="flex items-center group">
          <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/32" alt="User Avatar"/>
          <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">User Name</span>
        </a>
      </div>
      */}
    </div>
  );
};

export default Sidebar;
