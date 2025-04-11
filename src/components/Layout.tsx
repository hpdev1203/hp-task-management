import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex lg:flex-shrink-0">
                <div className="w-64 flex flex-col border-r border-gray-200 bg-white">
                    <Sidebar onClose={() => setSidebarOpen(false)} />
                </div>
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-white shadow-xl lg:hidden">
                        <Sidebar onClose={() => setSidebarOpen(false)} />
                    </div>
                </>
            )}

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                {/* Navbar */}
                <div className="flex-shrink-0 border-b border-gray-200 bg-white">
                    <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                </div>

                {/* Main Content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;