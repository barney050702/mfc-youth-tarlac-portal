import React from 'react';

export default function ActivitiesView() {
    return (
        <div id="view-activities" className="view-panel">
            {/* Semester Banner Card */}
            <div
                className="semester-banner glass-card"
                id="agenda-semester-banner"
                style={{
                    background: '#ffffff',
                    color: '#0f172a',
                    padding: '28px 36px',
                    borderRadius: '16px',
                    marginBottom: '24px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}
            >
                <div>
                    <h2
                        id="semester-banner-title"
                        style={{
                            color: '#1e3a8a',
                            fontSize: '1.7rem',
                            fontWeight: 800,
                            margin: '0 0 4px 0',
                        }}
                    >
                        All Activities History
                    </h2>
                    <p
                        id="total-activities-count"
                        style={{
                            color: '#3b82f6',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            margin: '0 0 4px 0',
                        }}
                    >
                        0 activities total
                    </p>
                    <p
                        id="semester-banner-desc"
                        style={{ color: '#64748b', fontSize: '0.95rem', margin: 0 }}
                    >
                        Comprehensive record of all organizational events and
                        gatherings.
                    </p>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        className="semester-tabs"
                        style={{
                            display: 'inline-flex',
                            background: '#f1f5f9',
                            padding: '4px',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                        }}
                    >
                        <button
                            id="tab-s1"
                            className="sem-tab-btn"
                            style={{
                                padding: '6px 14px',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: 'transparent',
                                color: '#475569',
                            }}
                        >
                            1st Sem · Jan-Jun
                        </button>
                        <button
                            id="tab-s2"
                            className="sem-tab-btn"
                            style={{
                                padding: '6px 14px',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: 'transparent',
                                color: '#475569',
                            }}
                        >
                            2nd Sem · Jul-Dec
                        </button>
                        <button
                            id="tab-all"
                            className="sem-tab-btn active"
                            style={{
                                padding: '6px 14px',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 700,
                                fontSize: '0.82rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: '#1e3a8a',
                                color: '#fff',
                            }}
                        >
                            All Activities
                        </button>
                    </div>
                </div>
            </div>

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
                        id="action-btn-19"
                        title="Refresh Records"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#94a3b8',
                            padding: '10px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            minWidth: '44px',
                            minHeight: '44px',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="ext-style-48"
                        >
                            <path
                                d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                            />
                            <path d="M3 3v5h5" />
                            <path
                                d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"
                            />
                            <path d="M16 16h5v5" />
                        </svg>
                    </button>
                    <button
                        id="agenda-sort-btn"
                        title="Sort by Date"
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#94a3b8',
                            padding: '10px 14px',
                            borderRadius: '12px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s',
                            minHeight: '44px',
                        }}
                    >
                        <span>⇅ Date: Oldest</span>
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
                            id="activity-search-input"
                            placeholder="Search activities..."
                        />
                    </div>
                    <div className="filter-group" style={{ margin: 0, position: 'relative' }}>
                        <select
                            id="filter-category"
                            className="custom-select"
                            style={{
                                padding: '10px 32px 10px 16px',
                                borderRadius: '12px',
                                minHeight: '44px',
                                appearance: 'none',
                                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#f8fafc',
                            }}
                        >
                            <option value="ALL">All Categories</option>
                            <option value="Chapter Assembly">Chapter Assembly</option>
                            <option value="Chapter Household">Chapter Household</option>
                            <option value="Area Assembly">Area Assembly</option>
                            <option value="General Assembly">General Assembly</option>
                            <option value="Upper Core Household">
                                Upper Core Household
                            </option>
                            <option value="MFC Conference">MFC Conference</option>
                        </select>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#94A3B8"
                            strokeWidth="2"
                            style={{
                                width: '16px',
                                height: '16px',
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                            }}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            {/* GRID VIEW CONTAINER (Always Active for Activities Record) */}
            <div
                id="agenda-grid-container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: '24px',
                }}
            >
                {/* Populated dynamically by script.js */}
            </div>
        </div>
    );
}
