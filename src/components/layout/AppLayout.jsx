import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const AppLayout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
    const [isMember, setIsMember] = useState(false);
    
    const navigate = useNavigate();

    // Check login status on mount. For now, this mimics the basic logic.
    useEffect(() => {
        // This simulates checking localStorage to see if user is member or admin
        const memberUser = localStorage.getItem('mfc_member_user');
        if (memberUser) {
            setIsMember(true);
        } else {
            setIsMember(false);
        }
    }, []);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
        // Also toggle the class on the body/app-shell if needed for CSS
        if (!isMobileSidebarOpen) {
            document.querySelector('.app-shell')?.classList.add('sidebar-open');
            document.getElementById('sidebar-backdrop')?.classList.add('active');
        } else {
            document.querySelector('.app-shell')?.classList.remove('sidebar-open');
            document.getElementById('sidebar-backdrop')?.classList.remove('active');
        }
    };

    const closeMobileSidebar = () => {
        setIsMobileSidebarOpen(false);
        document.querySelector('.app-shell')?.classList.remove('sidebar-open');
        document.getElementById('sidebar-backdrop')?.classList.remove('active');
    };

    return (
        <>
            {/* Mobile Sidebar Backdrop */}
            <div 
                className={`sidebar-backdrop ${isMobileSidebarOpen ? 'active' : ''}`} 
                id="sidebar-backdrop"
                onClick={closeMobileSidebar}
            ></div>

            <div className={`app-shell ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}>
                <Sidebar isMember={isMember} closeMobileSidebar={closeMobileSidebar} />

                <main className="main-content">
                    <TopBar toggleMobileSidebar={toggleMobileSidebar} />

                    <div className="views-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
};

export default AppLayout;
