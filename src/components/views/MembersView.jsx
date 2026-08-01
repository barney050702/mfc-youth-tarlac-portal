import React from 'react';

export default function MembersView() {
    return (
        <div id="view-members" className="view-panel">
            <div className="glass-panel">
                {/* Interactive Chapter Bullet / Pill Bar */}
                <div
                    className="chapter-bullet-bar"
                    id="members-chapter-bullets"
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        marginBottom: '18px',
                        paddingBottom: '16px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                >
                    <span
                        style={{
                            color: '#38bdf8',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginRight: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        🎯 CHAPTER BULLETS:
                    </span>

                    <button
                        id="action-btn-36"
                        type="button"
                        className="chapter-bullet-btn active"
                        data-chapter="ALL"
                        style={{
                            background: 'linear-gradient(135deg, #0284c7, #3b82f6)',
                            color: '#fff',
                            border: '1px solid rgba(56, 189, 248, 0.5)',
                            borderRadius: '20px',
                            padding: '7px 16px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
                        }}
                    >
                        🌐 All Chapters
                    </button>

                    <button
                        id="action-btn-37"
                        type="button"
                        className="chapter-bullet-btn"
                        data-chapter="Central Chapter"
                        style={{
                            background: 'rgba(15, 23, 42, 0.65)',
                            color: '#cbd5e1',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            padding: '7px 16px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        📍 Central Chapter
                    </button>

                    <button
                        id="action-btn-38"
                        type="button"
                        className="chapter-bullet-btn"
                        data-chapter="East Chapter"
                        style={{
                            background: 'rgba(15, 23, 42, 0.65)',
                            color: '#cbd5e1',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            padding: '7px 16px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        🌅 East Chapter
                    </button>

                    <button
                        id="action-btn-39"
                        type="button"
                        className="chapter-bullet-btn"
                        data-chapter="North Chapter"
                        style={{
                            background: 'rgba(15, 23, 42, 0.65)',
                            color: '#cbd5e1',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            padding: '7px 16px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        🧭 North Chapter
                    </button>

                    <button
                        id="action-btn-40"
                        type="button"
                        className="chapter-bullet-btn"
                        data-chapter="South Chapter"
                        style={{
                            background: 'rgba(15, 23, 42, 0.65)',
                            color: '#cbd5e1',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            padding: '7px 16px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        🌴 South Chapter
                    </button>

                    <button
                        id="action-btn-41"
                        type="button"
                        className="chapter-bullet-btn"
                        data-chapter="West Chapter"
                        style={{
                            background: 'rgba(15, 23, 42, 0.65)',
                            color: '#cbd5e1',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '20px',
                            padding: '7px 16px',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        🌄 West Chapter
                    </button>
                </div>

                <div
                    className="toolbar"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}
                >
                    <div className="toolbar-left">
                        <div className="search-box" style={{ width: '280px' }}>
                            <svg
                                className="search-icon"
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
                                id="members-search-input"
                                placeholder="Search members by name, role..."
                                aria-label="Search members"
                            />
                        </div>
                    </div>

                    <div
                        className="toolbar-right"
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        <button
                            id="action-btn-42"
                            className="btn-secondary"
                            title="Export Members Directory to PDF"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(248, 113, 113, 0.4)',
                                color: '#f87171',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-68">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <path d="M10 12h4" />
                                <path d="M10 16h4" />
                                <path d="M10 8h1" />
                            </svg>
                            <span>Export PDF</span>
                        </button>
                        <button
                            id="action-btn-43"
                            className="btn-secondary"
                            title="Export Members Directory to Excel / CSV"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(34, 197, 94, 0.45)',
                                color: '#4ade80',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-68">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="8" y1="13" x2="16" y2="13" />
                                <line x1="8" y1="17" x2="16" y2="17" />
                            </svg>
                            <span>Export Excel/CSV</span>
                        </button>
                        <button
                            id="action-btn-44"
                            className="btn-secondary"
                            title="View & Print Digital Youth Member ID Card"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(56, 189, 248, 0.45)',
                                color: '#38bdf8',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 700,
                            }}
                        >
                            <span className="ext-style-75">🆔</span>
                            <span>Digital ID Card</span>
                        </button>
                        <button
                            id="action-btn-45"
                            className="btn-primary"
                            title="Scan Member QR Code for Instant Check-in"
                            style={{
                                padding: '10px 16px',
                                background: 'linear-gradient(135deg, #10b981, #059669)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 700,
                            }}
                        >
                            <span className="ext-style-75">📷</span>
                            <span>Scan QR Check-In</span>
                        </button>
                        <button
                            id="action-btn-46"
                            className="btn-secondary"
                            title="Generate Official Certificate of Participation PDF"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(245, 158, 11, 0.45)',
                                color: '#fbbf24',
                                display: 'flex',
                                alignItems: 'center',
                                fontWeight: 700,
                            }}
                        >
                            <span className="ext-style-75">📜</span>
                            <span>Certificate PDF</span>
                        </button>
                        <button
                            id="action-btn-47"
                            className="btn-secondary"
                            title="View Visual Pastoral Household & Leadership Mentoring Tree"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(168, 85, 247, 0.45)',
                                color: '#c084fc',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <span className="ext-style-75">🌳</span>
                            <span>Household Tree</span>
                        </button>
                        <button
                            id="action-btn-48"
                            className="btn-secondary"
                            title="Print formatted paper clipboard sign-in sheet"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(251, 191, 36, 0.45)',
                                color: '#fbbf24',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-68">
                                <polyline points="6 9 6 2 18 2 18 9" />
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                                <rect width="12" height="8" x="6" y="14" />
                            </svg>
                            <span>Print Printable Sheet</span>
                        </button>
                        <button
                            id="action-btn-49"
                            className="btn-secondary"
                            title="Clear All Members"
                            style={{
                                padding: '10px 16px',
                                borderColor: 'rgba(244, 63, 94, 0.4)',
                                color: '#f43f5e',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-68">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span>Clear Members</span>
                        </button>
                        <button className="btn-primary glow-button" id="btn-open-add-member-list">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="ext-style-48">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            <span>Add Member</span>
                        </button>
                    </div>
                </div>

                {/* Duplicate Name Detection Banner */}
                <div
                    id="members-duplicate-banner"
                    style={{
                        display: 'none',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(217, 119, 6, 0.15))',
                        border: '1px solid rgba(245, 158, 11, 0.5)',
                        borderRadius: '14px',
                        padding: '12px 20px',
                        marginTop: '14px',
                        color: '#fbbf24',
                        fontSize: '0.88rem',
                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)',
                    }}
                >
                    <div className="ext-style-35">
                        <span className="ext-style-73">⚠️</span>
                        <div>
                            <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Duplicate Members Detected</strong>
                            <div
                                id="members-duplicate-banner-text"
                                style={{
                                    color: '#fbbf24',
                                    fontSize: '0.82rem',
                                    marginTop: '2px',
                                }}
                            >
                                We found identical names in the roster. Please review highlighted rows below.
                            </div>
                        </div>
                    </div>
                    <button
                        id="btn-filter-duplicates"
                        className="btn-secondary btn-sm"
                        style={{
                            background: 'rgba(245, 158, 11, 0.25)',
                            border: '1px solid #f59e0b',
                            color: '#fff',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span>🔍 Filter Only Duplicates</span>
                    </button>
                </div>

                <div className="table-container mt-4">
                    <table className="data-table hover-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>CHAPTER / AREA</th>
                                <th>ROLE / DESIGNATION</th>
                                <th>CONTACT NUMBER</th>
                                <th>EMAIL ADDRESS</th>
                                <th>BIRTHDATE</th>
                                <th>AGE</th>
                                <th>PARENTS CONTACT</th>
                                <th>HOME ADDRESS</th>
                                <th>DATE OF YOUTH CAMP</th>
                                <th style={{ textAlign: 'right' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody id="members-table-body">
                            <tr>
                                <td colSpan="11" style={{ padding: '1rem', textAlign: 'center', border: 'none' }}>
                                    <div className="ext-style-76 skeleton-card"></div>
                                    <div className="ext-style-76 skeleton-card"></div>
                                    <div className="skeleton-card" style={{ height: '60px' }}></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Native Mobile Member Cards Container */}
                <div id="members-mobile-cards-container" className="members-mobile-cards mt-3" style={{ display: 'none' }}>
                    {/* Populated dynamically by script.js */}
                </div>
            </div>
        </div>
    );
}
