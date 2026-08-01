import React from 'react';

export default function AttendanceView() {
    return (
        <div id="view-attendance" className="view-panel">
            <div className="glass-panel">
                {/* Top Selector Bar */}
                <div className="attendance-toolbar">
                    <div className="attendance-select-box">
                        <label htmlFor="attendance-activity-select">Select Activity:</label>
                        <select id="attendance-activity-select" className="custom-select lg-select">
                            <option value="">
                                -- Choose an Activity to Check Attendance --
                            </option>
                        </select>
                    </div>

                    <div id="attendance-status-pill" className="status-pill-grey">
                        ● Select an activity above
                    </div>

                    <div
                        className="attendance-quick-actions"
                        id="attendance-action-buttons"
                        style={{ display: 'none' }}
                    >
                        <button className="btn-primary btn-sm glow-button" id="btn-open-qr-scanner">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                <rect width="8" height="8" x="8" y="8" rx="1" />
                            </svg>
                            Scan QR Check-In
                        </button>
                        <button className="btn-secondary btn-sm" id="btn-mark-all-present">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Mark All Present
                        </button>
                        <button
                            id="action-btn-24"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#f87171',
                                borderColor: 'rgba(248, 113, 113, 0.4)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            Mark All Absent
                        </button>
                        <button
                            id="action-btn-25"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#f87171',
                                borderColor: 'rgba(248, 113, 113, 0.4)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Email Absentees (Gmail)
                        </button>
                        <button
                            id="action-btn-26"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#38bdf8',
                                borderColor: 'rgba(56, 189, 248, 0.4)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                            </svg>
                            Export as PDF
                        </button>
                        <button
                            id="action-btn-27"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#34d399',
                                borderColor: 'rgba(52, 211, 153, 0.4)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                            Copy Summary for Chat
                        </button>
                        <button
                            id="action-btn-28"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#a855f7',
                                borderColor: 'rgba(168, 85, 247, 0.45)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            Pastoral Follow-Up Report
                        </button>
                        <button
                            id="action-btn-29"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#38bdf8',
                                borderColor: 'rgba(56, 189, 248, 0.45)',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M3 9h18" />
                                <path d="M3 15h18" />
                                <path d="M9 3v18" />
                            </svg>
                            Attendance Matrix Sheet
                        </button>
                        <button
                            id="action-btn-30"
                            className="btn-secondary btn-sm"
                            style={{
                                color: '#fbbf24',
                                borderColor: 'rgba(251, 191, 36, 0.45)',
                            }}
                            title="Print formatted paper clipboard sign-in sheet"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <polyline points="6 9 6 2 18 2 18 9" />
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                <rect width="12" height="8" x="6" y="14" />
                            </svg>
                            Print Printable Sign-In Sheet
                        </button>
                        <button className="btn-secondary btn-sm text-red" id="btn-reset-attendance">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-54">
                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            Reset Roster
                        </button>
                    </div>
                </div>

                {/* Search & Batch Chapter Attendance Filter */}
                <div
                    className="attendance-batch-toolbar"
                    id="attendance-filter-bar"
                    style={{
                        display: 'none',
                        padding: '12px 20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(15, 23, 42, 0.5)',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '15px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            flex: 1,
                            minWidth: '260px',
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" className="ext-style-57">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            id="attendance-roster-search"
                            placeholder="Quick search member name or chapter..."
                            onChange={(e) => window.filterAttendanceRoster && window.filterAttendanceRoster(e.target.value)}
                            style={{
                                background: 'rgba(8, 14, 30, 0.7)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                borderRadius: '8px',
                                color: '#fff',
                                padding: '8px 12px',
                                fontSize: '0.85rem',
                                width: '100%',
                                outline: 'none',
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8' }}>
                            Batch Check-In:
                        </span>
                        <button id="action-btn-31" className="ext-style-65 btn-secondary btn-sm">
                            🏛️ Central
                        </button>
                        <button id="action-btn-32" className="ext-style-65 btn-secondary btn-sm">
                            🏛️ East
                        </button>
                        <button id="action-btn-33" className="ext-style-65 btn-secondary btn-sm">
                            🏛️ North
                        </button>
                        <button id="action-btn-34" className="ext-style-65 btn-secondary btn-sm">
                            🏛️ South
                        </button>
                        <button id="action-btn-35" className="ext-style-65 btn-secondary btn-sm">
                            🏛️ West
                        </button>
                    </div>
                </div>

                {/* Real-Time Progress Bar Section */}
                <div
                    className="attendance-progress-banner"
                    id="attendance-progress-banner"
                    style={{
                        display: 'none',
                        padding: '14px 20px',
                        background: 'rgba(15, 23, 42, 0.75)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <div
                        className="progress-stats"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '14px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                flexWrap: 'wrap',
                            }}
                        >
                            <div
                                className="progress-item"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.88rem',
                                    color: '#e2e8f0',
                                }}
                            >
                                <span
                                    className="dot dot-present"
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: '#10b981',
                                        display: 'inline-block',
                                    }}
                                ></span>
                                <span>
                                    Present: <strong id="count-present" style={{ color: '#34d399' }}>0</strong>
                                </span>
                            </div>
                            <div
                                className="progress-item"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    fontSize: '0.88rem',
                                    color: '#e2e8f0',
                                }}
                            >
                                <span
                                    className="dot dot-absent"
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: '#f43f5e',
                                        display: 'inline-block',
                                    }}
                                ></span>
                                <span>
                                    Absent: <strong id="count-absent" style={{ color: '#fb7185' }}>0</strong>
                                </span>
                            </div>
                            <div
                                className="progress-item"
                                style={{ fontSize: '0.84rem', color: '#94a3b8' }}
                            >
                                <span>
                                    Total Recorded: <strong id="count-total-checkins" style={{ color: '#fff' }}>0</strong>
                                </span>
                            </div>
                        </div>
                        <div
                            className="progress-rate ml-auto"
                            style={{
                                fontSize: '0.92rem',
                                fontWeight: 700,
                                color: '#f8fafc',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <span>Live Attendance Rate:</span>
                            <span
                                className="rate-badge"
                                id="attendance-live-rate"
                                style={{
                                    background: 'rgba(16, 185, 129, 0.2)',
                                    border: '1px solid rgba(16, 185, 129, 0.4)',
                                    color: '#34d399',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    fontSize: '0.85rem',
                                }}
                            >
                                0%
                            </span>
                        </div>
                    </div>
                    <div className="multi-progress-bar mt-2">
                        <div className="bar-segment bar-present" id="bar-present" style={{ width: '0%' }}></div>
                        <div className="bar-segment bar-absent" id="bar-absent" style={{ width: '100%' }}></div>
                    </div>
                </div>

                {/* Empty State Notice */}
                <div className="empty-state" id="attendance-empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No Activity Selected</h3>
                    <p>
                        Please select an event or activity from the dropdown menu above
                        to view and record member attendance.
                    </p>
                </div>

                {/* Roster Interactive Table */}
                <div
                    className="table-responsive mt-4"
                    id="attendance-table-container"
                    style={{ display: 'none' }}
                >
                    <table className="data-table attendance-roster-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>#</th>
                                <th>MEMBER NAME</th>
                                <th>DEPARTMENT / ROLE</th>
                                <th>ATTENDANCE STATUS</th>
                                <th>NOTES / REMARKS</th>
                            </tr>
                        </thead>
                        <tbody id="attendance-roster-body">
                            <tr>
                                <td colSpan="5" style={{ padding: '1rem', textAlign: 'center', border: 'none' }}>
                                    <div className="skeleton-card" style={{ height: '50px', marginBottom: '8px' }}></div>
                                    <div className="skeleton-card" style={{ height: '50px', marginBottom: '8px' }}></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
