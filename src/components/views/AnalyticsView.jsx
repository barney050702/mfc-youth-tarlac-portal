import React from 'react';

export default function AnalyticsView() {
    return (
        <div id="view-analytics" className="view-panel">
            {/* Export Callout Banner */}
            <div className="export-banner glass-card">
                <div className="export-banner-text">
                    <h3>Generate & Export Reports</h3>
                    <p>
                        Export attendance logs and activity records in standard CSV or
                        beautifully formatted PDF sheets.
                    </p>
                </div>
                <div className="export-actions">
                    <button className="btn-export btn-csv" id="btn-export-csv">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="8" y1="13" x2="16" y2="13" />
                            <line x1="8" y1="17" x2="16" y2="17" />
                        </svg>
                        <span>Export CSV Report</span>
                    </button>
                    <button className="btn-export btn-pdf" id="btn-export-pdf">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M10 12h4" />
                            <path d="M10 16h4" />
                            <path d="M10 8h1" />
                        </svg>
                        <span>Export PDF Report</span>
                    </button>
                    <button
                        id="action-btn-50"
                        className="btn-export"
                        style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#34d399',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M8 13h8" />
                            <path d="M8 17h8" />
                            <path d="M10 9h4" />
                        </svg>
                        <span>Google Sheets Sync</span>
                    </button>
                    <button
                        className="btn-export btn-backup"
                        id="btn-backup-json"
                        style={{
                            background: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Backup JSON</span>
                    </button>
                    <label
                        htmlFor="input-restore-file"
                        className="btn-export btn-restore"
                        id="btn-restore-json"
                        style={{
                            cursor: 'pointer',
                            margin: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: '#34d399',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '8px',
                            padding: '10px 16px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Restore Backup</span>
                        <input
                            type="file"
                            id="input-restore-file"
                            accept=".json"
                            style={{ display: 'none' }}
                            onChange={(e) => window.importBackupJSON && window.importBackupJSON(e)}
                        />
                    </label>
                </div>
            </div>

            {/* Interactive Analytics Charts Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '24px',
                    marginTop: '24px',
                }}
            >
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <div className="ext-style-60 panel-header">
                        <div className="panel-title-box">
                            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>
                                Activity Attendance Trend
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                Overall attendance percentage (%) per activity
                            </p>
                        </div>
                    </div>
                    <div style={{ position: 'relative', height: '230px' }}>
                        <canvas id="chart-attendance-trend"></canvas>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                    <div className="ext-style-60 panel-header">
                        <div className="panel-title-box">
                            <h3 style={{ fontSize: '1.1rem', color: '#f8fafc' }}>
                                Activities by Category
                            </h3>
                            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                                Distribution across assemblies & households
                            </p>
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'relative',
                            height: '230px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <canvas id="chart-category-breakdown"></canvas>
                    </div>
                </div>
            </div>

            {/* Pastoral Follow-Up Care Box */}
            <div
                className="glass-panel mt-6"
                style={{ padding: '24px', borderLeft: '4px solid var(--accent-rose)' }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                        marginBottom: '16px',
                    }}
                >
                    <div>
                        <h3
                            style={{
                                color: '#f8fafc',
                                fontSize: '1.15rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            💛 Pastoral Care & Absence Follow-Up
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                            Members who missed recent activities and may need
                            encouragement or pastoral check-in.
                        </p>
                    </div>
                    <button
                        id="action-btn-51"
                        className="btn-secondary"
                        style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: '#f43f5e' }}
                    >
                        🔄 Refresh Follow-Up List
                    </button>
                </div>
                <div
                    id="pastoral-followup-list"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {/* Populated dynamically */}
                </div>
            </div>

            {/* Monthly Analytics Summary Table */}
            <div className="glass-panel mt-6">
                <div className="panel-header">
                    <div className="panel-title-box">
                        <h3>Monthly Attendance Performance</h3>
                        <p>Aggregated event statistics by month</p>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>MONTH</th>
                                <th>TOTAL ACTIVITIES</th>
                                <th>COMPLETED</th>
                                <th>AVG ATTENDANCE RATE</th>
                                <th>PRESENT COUNT</th>
                                <th>ABSENT COUNT</th>
                                <th>STATUS EVALUATION</th>
                            </tr>
                        </thead>
                        <tbody id="analytics-monthly-body">
                            {/* Populated via script.js */}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* System Audit Trail & Activity Log */}
            <div className="glass-panel mt-6">
                <div className="panel-header">
                    <div className="panel-title-box">
                        <h3>🛡️ System Audit Trail & Recent Actions</h3>
                        <p>Security and activity tracking log for current session</p>
                    </div>
                </div>
                <div
                    className="audit-log-list"
                    id="audit-log-container"
                    style={{
                        maxHeight: '250px',
                        overflowY: 'auto',
                        padding: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    }}
                >
                    {/* Populated via script.js */}
                </div>
            </div>
        </div>
    );
}
