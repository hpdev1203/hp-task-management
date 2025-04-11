import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    navbar: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar, navbar }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-200 p-4">{sidebar}</aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                <header className="bg-white p-4 shadow-md">{navbar}</header>

                {/* Content */}
                <div className="p-4 overflow-y-auto">{children}</div>
            </main>
        </div>
    );
};

export default Layout;