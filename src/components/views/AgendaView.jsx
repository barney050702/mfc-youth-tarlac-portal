import React from 'react';

export default function AgendaView() {
    return (
        <div id="view-agenda" className="view-panel">
            {/* Toolbar & Controls */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        id="action-btn-20"
                        style={{
                            background: 'rgba(15, 23, 42, 0.7)',
                            border: '1px solid rgba(59, 130, 246, 0.4)',
                            color: '#60a5fa',
                            padding: '10px 22px',
                            borderRadius: '10px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="ext-style-57"
                        >
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                            <path d="M16 16h5v5" />
                        </svg>
                        <span>REFRESH AGENDA</span>
                    </button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div className="search-box-sm">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            id="agenda-search-input"
                            placeholder="Search agenda..."
                        />
                    </div>
                    <div className="filter-group" style={{ margin: 0 }}>
                        <select
                            id="agenda-filter-category"
                            className="custom-select"
                            style={{ padding: '8px 14px' }}
                        >
                            <option value="ALL">All Categories</option>
                            <option value="Chapter Assembly">Chapter Assembly</option>
                            <option value="Chapter Household">Chapter Household</option>
                            <option value="Area Assembly">Area Assembly</option>
                            <option value="General Assembly">General Assembly</option>
                            <option value="Upper Core Household">Upper Core Household</option>
                            <option value="MFC Conference">MFC Conference</option>
                        </select>
                    </div>
                    <button id="action-btn-21" className="btn-primary glow-button">
                        <span>+ Add Activity</span>
                    </button>
                </div>
            </div>

            {/* FEATURE 2: INTERACTIVE EVENT CALENDAR & RSVP HUB */}
            <div
                className="glass-panel"
                style={{
                    padding: '24px',
                    marginBottom: '20px',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 132, 199, 0.15))',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                        gap: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingBottom: '12px',
                    }}
                >
                    <div className="ext-style-50">
                        <span style={{ fontSize: '1.5rem' }}>📅</span>
                        <div>
                            <h3
                                style={{
                                    color: '#f8fafc',
                                    fontSize: '1.15rem',
                                    fontWeight: 800,
                                    margin: 0,
                                }}
                                id="calendar-month-year-title"
                            >
                                Event Calendar & RSVP Hub
                            </h3>
                            <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                                Click any event date to view schedule & RSVP status
                            </span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button
                            id="action-btn-22"
                            className="ext-style-61 btn-secondary btn-sm"
                        >
                            ◀ Prev
                        </button>
                        <button
                            id="action-btn-23"
                            className="ext-style-61 btn-secondary btn-sm"
                        >
                            Next ▶
                        </button>
                    </div>
                </div>

                {/* CALENDAR GRID */}
                <div
                    id="portal-calendar-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: '6px',
                        textAlign: 'center',
                    }}
                >
                    {/* Populated dynamically via script.js */}
                </div>
            </div>

            {/* TABLE VIEW CONTAINER (Always Active for Agenda) */}
            <div id="agenda-table-container" className="glass-panel" style={{ display: 'block' }}>
                <div className="table-responsive mt-2">
                    <table className="data-table hover-table">
                        <thead>
                            <tr>
                                <th>ACTIVITY TITLE</th>
                                <th>DATE & LOCATION</th>
                                <th>CATEGORY / HELD IN</th>
                                <th>STATUS</th>
                                <th className="text-right">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody id="activities-table-body">
                            <tr>
                                <td
                                    colSpan="6"
                                    style={{
                                        padding: '1rem',
                                        textAlign: 'center',
                                        border: 'none',
                                    }}
                                >
                                    <div className="ext-style-76 skeleton-card"></div>
                                    <div className="ext-style-76 skeleton-card"></div>
                                    <div className="skeleton-card" style={{ height: '60px' }}></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
