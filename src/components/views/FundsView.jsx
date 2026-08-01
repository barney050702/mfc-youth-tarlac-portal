import React from 'react';

export default function FundsView() {
    return (
        <div id="view-funds" className="view-panel">
            {/* Top 4 Summary Metric Cards Grid */}
            <div className="metrics-grid">
                {/* Total Income */}
                <div
                    className="metric-card glass-card"
                    style={{ borderTopWidth: '3px', borderTopColor: '#10b981' }}
                >
                    <div className="metric-header">
                        <span className="metric-label">Total Income</span>
                        <div
                            className="metric-icon-box"
                            style={{
                                background: 'rgba(16, 185, 129, 0.15)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#10B981"
                                strokeWidth="2.5"
                            >
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                                <polyline points="17 6 23 6 23 12" />
                            </svg>
                        </div>
                    </div>
                    <div
                        className="metric-value"
                        id="stat-total-income"
                        style={{ color: '#10b981' }}
                    >
                        ₱0.00
                    </div>
                    <div className="metric-footer">
                        <span className="badge badge-green">Inflow</span>
                        <span className="metric-subtext">Total chapter receipts</span>
                    </div>
                </div>

                {/* Total Expenses */}
                <div
                    className="metric-card glass-card"
                    style={{ borderTopWidth: '3px', borderTopColor: '#ef4444' }}
                >
                    <div className="metric-header">
                        <span className="metric-label">Total Expenses</span>
                        <div
                            className="metric-icon-box"
                            style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#EF4444"
                                strokeWidth="2.5"
                            >
                                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                                <polyline points="17 18 23 18 23 12" />
                            </svg>
                        </div>
                    </div>
                    <div
                        className="metric-value"
                        id="stat-total-expenses"
                        style={{ color: '#ef4444' }}
                    >
                        ₱0.00
                    </div>
                    <div className="metric-footer">
                        <span
                            className="badge badge-purple"
                            style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}
                        >
                            Outflow
                        </span>
                        <span className="metric-subtext">Total disbursements</span>
                    </div>
                </div>

                {/* Current Balance */}
                <div
                    className="metric-card glass-card"
                    style={{ borderTopWidth: '3px', borderTopColor: '#8b5cf6' }}
                >
                    <div className="metric-header">
                        <span className="metric-label">Current Balance</span>
                        <div
                            className="metric-icon-box"
                            style={{
                                background: 'rgba(139, 92, 246, 0.15)',
                                border: '1px solid rgba(139, 92, 246, 0.3)',
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#8B5CF6"
                                strokeWidth="2"
                            >
                                <path
                                    d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"
                                />
                                <circle cx="14" cy="11" r="1" />
                            </svg>
                        </div>
                    </div>
                    <div
                        className="metric-value"
                        id="stat-current-balance"
                        style={{ color: '#38bdf8' }}
                    >
                        ₱0.00
                    </div>
                    <div className="metric-footer">
                        <span className="badge badge-blue">Net Funds</span>
                        <span className="metric-subtext">Available cash balance</span>
                    </div>
                </div>

                {/* Total Records */}
                <div
                    className="metric-card glass-card"
                    style={{ borderTopWidth: '3px', borderTopColor: '#38bdf8' }}
                >
                    <div className="metric-header">
                        <span className="metric-label">Total Records</span>
                        <div
                            className="metric-icon-box"
                            style={{
                                background: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid rgba(56, 189, 248, 0.3)',
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#38BDF8"
                                strokeWidth="2"
                            >
                                <path
                                    d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1Z"
                                />
                                <path d="M14 8H8" />
                                <path d="M16 12H8" />
                                <path d="M13 16H8" />
                            </svg>
                        </div>
                    </div>
                    <div className="metric-value" id="stat-total-records">0</div>
                    <div className="metric-footer">
                        <span className="badge badge-green">Ledger</span>
                        <span className="metric-subtext">Logged transactions</span>
                    </div>
                </div>
            </div>

            {/* FEATURE 3: FINANCIAL VISUAL ANALYTICS CHARTS */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '20px',
                    marginTop: '24px',
                    marginBottom: '24px',
                }}
            >
                <div
                    className="glass-panel"
                    style={{
                        padding: '20px 24px',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <div className="ext-style-35">
                            <span className="ext-style-73">📊</span>
                            <div>
                                <h4
                                    style={{
                                        color: '#f8fafc',
                                        fontSize: '0.98rem',
                                        fontWeight: 800,
                                        margin: 0,
                                    }}
                                >
                                    Income vs Expenses Comparison
                                </h4>
                                <span className="ext-style-70">
                                    Chapter monthly cashflow balance
                                </span>
                            </div>
                        </div>
                        <span className="badge badge-green">Chart.js</span>
                    </div>
                    <div style={{ position: 'relative', height: '210px', width: '100%' }}>
                        <canvas id="funds-comparison-canvas"></canvas>
                    </div>
                </div>

                <div
                    className="glass-panel"
                    style={{
                        padding: '20px 24px',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <div className="ext-style-35">
                            <span className="ext-style-73">🍕</span>
                            <div>
                                <h4
                                    style={{
                                        color: '#f8fafc',
                                        fontSize: '0.98rem',
                                        fontWeight: 800,
                                        margin: 0,
                                    }}
                                >
                                    Expense Allocation Breakdown
                                </h4>
                                <span className="ext-style-70">
                                    Category distribution
                                </span>
                            </div>
                        </div>
                        <span className="badge badge-purple">Distribution</span>
                    </div>
                    <div style={{ position: 'relative', height: '210px', width: '100%' }}>
                        <canvas id="funds-pie-canvas"></canvas>
                    </div>
                </div>
            </div>
            <div
                className="toolbar"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '24px',
                    marginTop: '24px',
                }}
            >
                <div
                    className="toolbar-left"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        flexWrap: 'wrap',
                    }}
                >
                    <div
                        className="search-box"
                        style={{ width: '260px', height: '42px', borderRadius: '12px' }}
                    >
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
                            id="funds-search-input"
                            placeholder="Search description or category..."
                            onChange={() => window.filterFunds && window.filterFunds()}
                            aria-label="Search ledger"
                        />
                    </div>
                    <select
                        id="funds-type-filter"
                        onChange={() => window.filterFunds && window.filterFunds()}
                        style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#e2e8f0',
                            padding: '0 16px',
                            borderRadius: '12px',
                            height: '42px',
                            outline: 'none',
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="ALL">All Types</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                    <select
                        id="funds-category-filter"
                        onChange={() => window.filterFunds && window.filterFunds()}
                        style={{
                            background: 'rgba(15, 23, 42, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#e2e8f0',
                            padding: '0 16px',
                            borderRadius: '12px',
                            height: '42px',
                            outline: 'none',
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="ALL">All Categories</option>
                        <optgroup label="Income Categories">
                            <option value="Tithe & Offering">Tithe & Offering</option>
                            <option value="Donation / Sponsorship">
                                Donation / Sponsorship
                            </option>
                            <option value="Fundraising Event">Fundraising Event</option>
                            <option value="Registration Fees">Registration Fees</option>
                            <option value="Other Income">Other Income</option>
                        </optgroup>
                        <optgroup label="Expense Categories">
                            <option value="Assembly & Event Supplies">
                                Assembly & Event Supplies
                            </option>
                            <option value="Youth Camp Food & Venue">
                                Youth Camp Food & Venue
                            </option>
                            <option value="Transportation & Logistics">
                                Transportation & Logistics
                            </option>
                            <option value="Honorarium & Speakers">
                                Honorarium & Speakers
                            </option>
                            <option value="Administrative / Office">
                                Administrative / Office
                            </option>
                            <option value="Other Expense">Other Expense</option>
                        </optgroup>
                    </select>
                    <button
                        id="action-btn-54"
                        className="btn-secondary"
                        title="Reset Filters"
                        style={{
                            height: '42px',
                            width: '42px',
                            padding: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '12px',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="ext-style-57"
                        >
                            <path
                                d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"
                            />
                            <path d="M3 3v5h5" />
                            <path
                                d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"
                            />
                            <path d="M16 21v-5h5" />
                        </svg>
                    </button>
                </div>

                <div
                    className="toolbar-right"
                    style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        id="action-btn-55"
                        className="btn-secondary"
                        title="Export CSV Spreadsheet"
                        style={{
                            height: '42px',
                            padding: '0 16px',
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            color: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '12px',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ width: '16px', height: '16px', marginRight: '8px' }}
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Export CSV
                    </button>
                    <button
                        id="action-btn-56"
                        className="btn-secondary"
                        title="Download Official Ledger PDF"
                        style={{
                            height: '42px',
                            padding: '0 16px',
                            borderColor: 'rgba(255, 255, 255, 0.15)',
                            color: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            borderRadius: '12px',
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            style={{ width: '16px', height: '16px', marginRight: '8px' }}
                        >
                            <path
                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                            />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                            <polyline points="10 9 9 9 8 9" />
                        </svg>
                        Official Ledger PDF
                    </button>
                    <button
                        id="action-btn-57"
                        className="btn-primary glow-button"
                        style={{
                            height: '42px',
                            padding: '0 20px',
                            borderRadius: '12px',
                            border: 'none',
                            fontWeight: 600,
                        }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            style={{ width: '18px', height: '18px', marginRight: '8px' }}
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Record</span>
                    </button>
                </div>
            </div>

            {/* Funds Ledger Table Container */}
            <div className="table-container mt-4">
                <table className="data-table hover-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Receipt</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="funds-table-body">
                        {/* Populated dynamically */}
                    </tbody>
                </table>
            </div>

            {/* Footer note */}
            <div
                style={{
                    textAlign: 'center',
                    marginTop: '32px',
                    color: '#64748b',
                    fontSize: '0.82rem',
                }}
            >
                Data is stored locally in your web browser. You can export/import
                backups at any time.
            </div>
        </div>
    );
}
