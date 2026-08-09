import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isMember, closeMobileSidebar }) => {
    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-header ext-style-105">
                <div className="brand-logo ext-style-106">
                    <div className="brand-flame-icon ext-style-107">
                        <img src="/mfc-logo.png" alt="MFC Logo" />
                    </div>
                    <span className="brand-name ext-style-109">MFC YOUTH TARLAC</span>
                </div>
                <button
                    className="sidebar-close-btn ext-style-110"
                    id="sidebar-close-btn"
                    aria-label="Close sidebar"
                    onClick={closeMobileSidebar}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <nav className="sidebar-nav">
                {isMember && (
                    <NavLink
                        to="/member-dashboard"
                        className={({ isActive }) => `nav-item ext-style-111 ${isActive ? 'active' : ''}`}
                    >
                        <span className="nav-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </span>
                        <span className="nav-label">My Dashboard</span>
                    </NavLink>
                )}

                {!isMember && (
                    <>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </span>
                            <span className="nav-label">Home</span>
                        </NavLink>
                        <NavLink
                            to="/activities"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-0.5-5.0V19.5Z" />
                                    <path d="M6 17h14" />
                                </svg>
                            </span>
                            <span className="nav-label">Activity Records</span>
                        </NavLink>
                        <NavLink
                            to="/members"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </span>
                            <span className="nav-label">Members</span>
                        </NavLink>
                        <NavLink
                            to="/attendance"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 11l3 3L22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                            </span>
                            <span className="nav-label">Attendance Records</span>
                        </NavLink>
                        <NavLink
                            to="/funds"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                                    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                                </svg>
                            </span>
                            <span className="nav-label">Funds & Expenses</span>
                        </NavLink>
                        <NavLink
                            to="/agenda"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                    <path d="m9 16 2 2 4-4" />
                                </svg>
                            </span>
                            <span className="nav-label">Agenda</span>
                        </NavLink>
                        <NavLink
                            to="/servants"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <polyline points="17 11 19 13 23 9" />
                                </svg>
                            </span>
                            <span className="nav-label">Servant Leaders</span>
                        </NavLink>
                        <NavLink
                            to="/orgchart"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="8" y="2" width="8" height="6" rx="1" />
                                    <rect x="2" y="16" width="8" height="6" rx="1" />
                                    <rect x="14" y="16" width="8" height="6" rx="1" />
                                    <path d="M12 8v4" />
                                    <path d="M6 12h12" />
                                    <path d="M6 12v4" />
                                    <path d="M18 12v4" />
                                </svg>
                            </span>
                            <span className="nav-label">Org Chart</span>
                        </NavLink>
                        <NavLink
                            to="/resources"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="nav-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    <line x1="9" y1="7" x2="15" y2="7" />
                                    <line x1="9" y1="11" x2="15" y2="11" />
                                </svg>
                            </span>
                            <span className="nav-label">Resources</span>
                        </NavLink>
                    </>
                )}

                <div className="ext-style-112"></div>
                <button
                    className="nav-item ext-style-113"
                    onClick={(e) => {
                        e.preventDefault();
                        if (window.openWhatsNewModal) window.openWhatsNewModal();
                    }}
                    style={{ border: 'none', background: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                >
                    <span className="nav-icon ext-style-114">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    </span>
                    <span className="nav-label ext-style-115">What's New v4.2</span>
                </button>
            </nav>
        </aside>
    );
};

export default Sidebar;
