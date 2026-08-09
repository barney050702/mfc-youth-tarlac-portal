import React from 'react';

const TopBar = ({ toggleMobileSidebar }) => {
    return (
        <header className="top-bar mfc-top-bar">
            <div className="top-bar-left">
                <button
                    className="menu-toggle-btn visible-toggle"
                    id="menu-toggle-btn"
                    aria-label="Toggle Navigation"
                    title="Toggle menu"
                    onClick={toggleMobileSidebar}
                >
                    <svg
                        id="menu-toggle-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ext-style-116"
                    >
                        <path d="M3 6h11M3 12h11M3 18h11M17 8l-4 4 4 4" />
                    </svg>
                </button>

                {/* Global Quick Search Bar & Ctrl+K Pill */}
                <div className="header-global-search ext-style-117">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#64748B"
                        strokeWidth="2"
                        className="ext-style-118"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        id="global-top-search"
                        placeholder="Quick search..."
                        onInput={(e) => window.handleGlobalSearch && window.handleGlobalSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.target.value.trim()) {
                                if (window.openCommandPalette) window.openCommandPalette();
                            }
                        }}
                        autoComplete="off"
                        className="ext-style-119"
                    />
                    <button
                        id="action-btn-13"
                        title="Click or Press Ctrl+K / Cmd+K for Command Palette"
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.3)';
                            e.currentTarget.style.borderColor = '#38BDF8';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                        }}
                        className="ext-style-120"
                        onClick={() => {
                            if (window.openCommandPalette) window.openCommandPalette();
                        }}
                    >
                        Ctrl K
                    </button>
                    <div id="global-search-results" className="ext-style-121"></div>
                </div>
            </div>

            <div className="top-bar-right ext-style-122">
                {/* Firebase Cloud Sync Button */}
                <button
                    id="firebase-cloud-status-btn"
                    title="Click to view or configure Firebase Cloud Sync"
                    className="ext-style-123"
                >
                    <span className="ext-style-124"></span>
                    <span id="firebase-status-label" className="ext-style-125">
                        🔥 Firebase: Connected
                    </span>
                </button>

                {/* PWA Install Button */}
                <button
                    id="install-pwa-btn"
                    title="Install Portal as Standalone App"
                    className="ext-style-126"
                >
                    <span>📱 Install App</span>
                </button>

                {/* Keyboard Shortcuts Help (?) */}
                <button
                    id="cheatsheet-btn"
                    title="Keyboard Shortcuts & Rapid Check-in Cheatsheet (Press ?)"
                    aria-label="Keyboard Shortcuts Cheatsheet"
                    className="ext-style-127"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ext-style-128"
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                        <line x1="6" y1="8" x2="6.01" y2="8" />
                        <line x1="10" y1="8" x2="10.01" y2="8" />
                        <line x1="14" y1="8" x2="14.01" y2="8" />
                        <line x1="18" y1="8" x2="18.01" y2="8" />
                        <line x1="6" y1="12" x2="6.01" y2="12" />
                        <line x1="10" y1="12" x2="10.01" y2="12" />
                        <line x1="14" y1="12" x2="14.01" y2="12" />
                        <line x1="18" y1="12" x2="18.01" y2="12" />
                        <line x1="7" y1="16" x2="17" y2="16" />
                    </svg>
                </button>

                {/* Social / Web Links */}
                <a
                    href="https://www.facebook.com/MFCYouthTarlac"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="top-bar-icon-link text-blue"
                    title="MFC Youth Tarlac Official Facebook Page"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ext-style-48">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                </a>
                <a
                    href="https://mfcyouth.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="top-bar-icon-link text-blue"
                    title="MFC Youth Official Website"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="ext-style-48"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                    </svg>
                </a>

                {/* Divider */}
                <div className="top-bar-divider"></div>

                {/* Offline / Cloud Sync Pill Badge */}
                <button
                    id="portal-sync-badge"
                    title="Click to download an instant JSON backup snapshot of all chapter data"
                    className="ext-style-129"
                >
                    <span className="ext-style-130"></span>
                    <span>All Data Saved Locally</span>
                </button>

                {/* Theme Toggle */}
                <button
                    className="theme-toggle-switch"
                    title="Toggle Theme"
                    id="theme-toggle-btn"
                    aria-label="Toggle Theme Mode"
                >
                    <span className="theme-switch-thumb">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    </span>
                    <span className="theme-switch-label">Dark Mode</span>
                </button>

                {/* Profile Button */}
                <button
                    className="top-bar-icon-btn"
                    title="User Profile & Security"
                    id="profile-toggle-btn"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-48">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </button>

                {/* Log Out Button */}
                <button id="action-btn-14" className="btn-logout">
                    <span>Log Out</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default TopBar;
