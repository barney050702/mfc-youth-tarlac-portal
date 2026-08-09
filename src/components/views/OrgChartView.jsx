import React from 'react';

const OrgChartView = () => {
    return (
        <div id="view-orgchart" className="view-panel" style={{ display: 'block' }}>
            {/* Org Chart Toolbar & Filters */}
            <div className="org-toolbar glass-card">
                <div className="org-toolbar-left">
                    <div className="org-title-box">
                        <h3>Organization Hierarchy & Teams</h3>
                        <p>Interactive command tree of officers, coordinators, and general members</p>
                    </div>
                </div>
                <div className="org-toolbar-right ext-style-142">
                    <div className="ext-style-69 filter-group">
                        <label htmlFor="org-search-input" className="ext-style-143">
                            Search:
                        </label>
                        <input
                            type="text"
                            id="org-search-input"
                            placeholder="Search name or role..."
                            onInput={(e) => window.renderOrgChart && window.renderOrgChart()}
                        />
                    </div>
                    <div className="ext-style-69 filter-group">
                        <label htmlFor="org-dept-filter" className="ext-style-145">
                            Department:
                        </label>
                        <select
                            id="org-dept-filter"
                            className="custom-select ext-style-146"
                            onChange={(e) => window.renderOrgChart && window.renderOrgChart()}
                        >
                            <option value="ALL">All Departments</option>
                            <option value="Executive">Executive Board</option>
                            <option value="EAST CHAPTER">EAST CHAPTER</option>
                            <option value="Programs & Events">Programs & Events</option>
                            <option value="Creative & Media">Creative & Media</option>
                            <option value="Finance & Treasury">Finance & Treasury</option>
                        </select>
                    </div>
                    <div className="view-mode-toggle">
                        <button className="btn-toggle active" id="btn-org-tree" title="Tree Hierarchy View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-57">
                                <rect x="9" y="2" width="6" height="6" rx="1" />
                                <rect x="2" y="16" width="6" height="6" rx="1" />
                                <rect x="16" y="16" width="6" height="6" rx="1" />
                                <path d="M12 8v4" />
                                <path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
                            </svg>
                            <span>Tree View</span>
                        </button>
                        <button className="btn-toggle" id="btn-org-grid" title="Department Grid View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-57">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                            <span>Grid View</span>
                        </button>
                        <button className="btn-toggle" id="btn-org-household" title="Household Mentoring Groups">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-57">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            <span>Household View</span>
                        </button>
                    </div>
                    <button id="action-btn-52" className="btn-secondary btn-sm ext-style-147">
                        <span>🖨️ Print Batch IDs (A4)</span>
                    </button>
                    <button id="action-btn-53" className="btn-primary glow-button btn-sm">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-57">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Add Member</span>
                    </button>
                </div>
            </div>

            {/* Org Chart Canvas */}
            <div className="org-chart-container mt-6" id="org-chart-canvas">
                {/* Populated via script.js */}
            </div>
        </div>
    );
};

export default OrgChartView;
