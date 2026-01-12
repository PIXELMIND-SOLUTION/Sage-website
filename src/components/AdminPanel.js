import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import UserList from '../Views/users/UserList';
import Categories from '../Views/category/Categories';
import Dashboard from '../Views/Dashboard';
import SingleUser from '../Views/users/SingleUser';
import EditUser from '../Views/users/EditUser';
import CreateHouse from '../Views/houses/CreateHouse';
import AllHouses from '../Views/houses/AllHouses';
import Plans from '../Views/plans/Plans';

const AdminPanel = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
    const [darkMode, setDarkMode] = useState(false);
    const [collapsed, setCollapsed] = useState(() => {
        // Load from localStorage or default to false
        const saved = localStorage.getItem('sidebarCollapsed');
        return saved === 'true' || false;
    });

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleCollapsed = () => {
        const newCollapsed = !collapsed;
        setCollapsed(newCollapsed);
        localStorage.setItem('sidebarCollapsed', newCollapsed);
    };

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };

    const handleNavigation = (path) => {
        navigate(`/admin${path}`);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    // Load preferences
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(savedDarkMode);
    }, []);

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex">
                {/* Sidebar */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    darkMode={darkMode}
                    toggleSidebar={toggleSidebar}
                    collapsed={collapsed}
                    toggleCollapsed={toggleCollapsed}
                    onNavigate={handleNavigation}
                />

                {/* Main Content Area */}
                <div className={`
                    flex-1 flex flex-col 
                    transition-all duration-300 ease-in-out
                    ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}
                `}>
                    {/* Navbar */}
                    <Navbar
                        toggleSidebar={toggleSidebar}
                        toggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}
                        collapsed={collapsed}
                        sidebarOpen={sidebarOpen}
                        onNavigate={handleNavigation}
                    />

                    {/* Main Content Area with Routes */}
                    <main className={`
                        flex-1 p-4 md:p-6 overflow-y-auto
                        transition-all duration-300
                    `}>
                        <Routes>
                            <Route path="/" element={<Dashboard darkMode={darkMode} collapsed={collapsed} />} />
                            <Route path="/dashboard" element={<Dashboard darkMode={darkMode} collapsed={collapsed} />} />

                            <Route path="/users" element={<UserList darkMode={darkMode} collapsed={collapsed} />} />
                            <Route path="/users/:id" element={<SingleUser darkMode={darkMode} collapsed={collapsed} />} />
                            <Route path="/users/update/:id" element={<EditUser darkMode={darkMode} collapsed={collapsed} />} />

                            <Route path='/create-house/:id' element={<CreateHouse darkMode={darkMode} collapsed={collapsed} />} />
                            <Route path='/allhouses' element={<AllHouses darkMode={darkMode} collapsed={collapsed} />} />


                            <Route path='/categories' element={<Categories darkMode={darkMode} collapsed={collapsed} />} />

                            <Route path="/plans" element={<Plans darkMode={darkMode} collapsed={collapsed} />} />

                            
                            <Route path="*" element={<Navigate to="/admin" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;