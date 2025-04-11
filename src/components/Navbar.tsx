import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Placeholder Icons - Replace with your preferred icon library (e.g., Heroicons)
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V7.5A2.25 2.25 0 0 0 15.75 5.25h-3.5A2.25 2.25 0 0 0 10.5 7.5v2.25a8.967 8.967 0 0 1-2.312 5.924 23.848 23.848 0 0 0 5.454 1.31m5.757 6.415a9 9 0 0 1-9 0" />
  </svg>
);

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { currentUser, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden transition-colors duration-150"
            >
              <MenuIcon />
            </button>

            {/* Branding */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 1.085m1-1.085.998 1.085m0 0 .002.002.002.002a2.25 2.25 0 0 1 3.496 2.121 2.25 2.25 0 0 1-1.06 1.06H9.75M16.5 16.5l1-1.085m-1 1.085-.998 1.085m0 0-.002.002-.002.002a2.25 2.25 0 0 0-3.496 2.121 2.25 2.25 0 0 0 1.06 1.06H14.25" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Task Manager</span>
              </Link>
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button className="text-gray-400 hover:text-gray-500 transition-colors duration-150">
              <BellIcon />
            </button>

            {/* User Menu */}
            <div className="relative">
              <div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 focus:outline-none transition-shadow duration-150"
                >
                  {/* User Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">
                      {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                </button>
              </div>

              {/* User Dropdown */}
              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* User Info */}
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    <div className="font-medium text-gray-900 truncate">{currentUser?.displayName || 'User'}</div>
                    <div className="text-gray-500 truncate">{currentUser?.email}</div>
                  </div>
                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
