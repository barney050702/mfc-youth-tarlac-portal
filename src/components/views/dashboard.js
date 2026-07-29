export default `
<div id="view-dashboard" class="view-panel active">
                        <!-- Executive Dashboard Actions Bar -->
                        <div
                            class="glass-panel"
                            style="
                                padding: 14px 20px;
                                margin-bottom: 24px;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 12px;
                            "
                        >
                            <div class="ext-style-35">
                                <span class="ext-style-73">📊</span>
                                <div>
                                    <h4
                                        style="
                                            color: #f8fafc;
                                            font-size: 1rem;
                                            font-weight: 800;
                                            margin: 0;
                                        "
                                    >
                                        Leadership Executive Dashboard
                                    </h4>
                                    <span style="color: #94a3b8; font-size: 0.78rem"
                                        >Chapter Reports, Cloud Backups & Summary Analytics</span
                                    >
                                </div>
                            </div>
                            <div
                                id="dashboard-admin-actions"
                                style="
                                    display: flex;
                                    align-items: center;
                                    gap: 10px;
                                    flex-wrap: wrap;
                                "
                            >
                                <button
                                    id="action-btn-15"
                                    class="btn-primary glow-button"
                                    style="
                                        padding: 8px 16px;
                                        font-size: 0.82rem;
                                        display: inline-flex;
                                        align-items: center;
                                        gap: 6px;
                                    "
                                >
                                    <span>📄 Export Executive Report PDF</span>
                                </button>
                                <button
                                    id="action-btn-16"
                                    class="btn-secondary"
                                    style="
                                        padding: 8px 14px;
                                        font-size: 0.82rem;
                                        display: inline-flex;
                                        align-items: center;
                                        gap: 6px;
                                        border-color: rgba(16, 185, 129, 0.4);
                                        color: #34d399;
                                    "
                                >
                                    <span>💾 Backup All Portal Data</span>
                                </button>
                                <label
                                    for="import-full-backup-input"
                                    class="btn-secondary"
                                    style="
                                        padding: 8px 14px;
                                        font-size: 0.82rem;
                                        display: inline-flex;
                                        align-items: center;
                                        gap: 6px;
                                        cursor: pointer;
                                        border-color: rgba(56, 189, 248, 0.4);
                                        color: #38bdf8;
                                        margin: 0;
                                    "
                                >
                                    <span>📂 Restore Backup</span>
                                    <input
                                        type="file"
                                        id="import-full-backup-input"
                                        accept=".json"
                                        onchange="importFullBackupJSON(this)"
                                        style="display: none"
                                    />
                                </label>
                            </div>
                        </div>

                        <!-- Stat Metric Cards Grid -->
                        <div class="metrics-grid">
                            <div class="metric-card glass-card">
                                <div class="metric-header">
                                    <span class="metric-label">Total Activities</span>
                                    <div class="metric-icon-box bg-blue-glow">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#38BDF8"
                                            stroke-width="2"
                                        >
                                            <path
                                                d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="metric-value" id="stat-total-activities">
                                    <div
                                        class="ext-style-79 skeleton skeleton-text"
                                       
                                    ></div>
                                </div>
                                <div class="metric-footer">
                                    <span class="trend badge-green">↑ 100%</span>
                                    <span class="trend-text">from last semester</span>
                                </div>
                            </div>

                            <div class="metric-card glass-card">
                                <div class="metric-header">
                                    <span class="metric-label">Avg Attendance Rate</span>
                                    <div class="metric-icon-box bg-purple-glow">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#818CF8"
                                            stroke-width="2"
                                        >
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="metric-value text-gradient" id="stat-avg-rate">
                                    <div
                                        class="skeleton skeleton-text"
                                        style="width: 80px; height: 36px; margin: 0"
                                    ></div>
                                </div>
                                <div class="metric-footer">
                                    <div class="mini-progress-bar">
                                        <div
                                            class="mini-fill"
                                            id="stat-rate-bar"
                                            style="width: 0%"
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div class="metric-card glass-card">
                                <div class="metric-header">
                                    <span class="metric-label">Active Members</span>
                                    <div class="metric-icon-box bg-emerald-glow">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#34D399"
                                            stroke-width="2"
                                        >
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="metric-value" id="stat-total-members">
                                    <div
                                        class="ext-style-79 skeleton skeleton-text"
                                       
                                    ></div>
                                </div>
                                <div class="metric-footer">
                                    <span class="trend badge-emerald">● Active</span>
                                    <span class="trend-text">Registered participants</span>
                                </div>
                            </div>

                            <div class="metric-card glass-card">
                                <div class="metric-header">
                                    <span class="metric-label">Total Check-ins</span>
                                    <div class="metric-icon-box bg-rose-glow">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#FB7185"
                                            stroke-width="2"
                                        >
                                            <path
                                                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div class="metric-value" id="stat-total-checkins">
                                    <div
                                        class="ext-style-79 skeleton skeleton-text"
                                       
                                    ></div>
                                </div>
                                <div class="metric-footer">
                                    <span class="trend text-purple">Present & Late</span>
                                    <span class="trend-text">cumulative attendance</span>
                                </div>
                            </div>
                        </div>

                        <!-- Live Attendance Breakdown Bar (Visual proportions of Present vs Late vs Absent) -->
                        <div
                            class="glass-panel spotlight-card"
                            style="
                                padding: 18px 24px;
                                margin-top: 20px;
                                border: 1px solid rgba(56, 189, 248, 0.22);
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    flex-wrap: wrap;
                                    gap: 10px;
                                    margin-bottom: 8px;
                                "
                            >
                                <div class="ext-style-35">
                                    <span class="ext-style-73">📊</span>
                                    <div>
                                        <h4
                                            style="
                                                color: #f8fafc;
                                                font-size: 0.95rem;
                                                font-weight: 800;
                                                margin: 0;
                                            "
                                        >
                                            Overall Roster Check-In Distribution
                                        </h4>
                                        <span class="ext-style-70"
                                            >Visual breakdown of attendance status ratios across all
                                            chapter activities</span
                                        >
                                    </div>
                                </div>
                                <div
                                    id="breakdown-stats-legend"
                                    style="
                                        display: flex;
                                        gap: 14px;
                                        font-size: 0.78rem;
                                        font-weight: 700;
                                    "
                                >
                                    <span style="color: #10b981"
                                        >● Present: <span id="legend-present">0%</span></span
                                    >
                                    <span style="color: #ef4444"
                                        >● Absent: <span id="legend-absent">0%</span></span
                                    >
                                </div>
                            </div>
                            <div class="attendance-breakdown-bar" id="dashboard-breakdown-bar">
                                <div
                                    class="breakdown-segment"
                                    id="bar-seg-present"
                                    style="
                                        width: 0%;
                                        background: linear-gradient(90deg, #059669, #10b981);
                                    "
                                    title="Present"
                                ></div>
                                <div
                                    class="breakdown-segment"
                                    id="bar-seg-absent"
                                    style="
                                        width: 0%;
                                        background: linear-gradient(90deg, #dc2626, #ef4444);
                                    "
                                    title="Absent"
                                ></div>
                            </div>
                        </div>

                        <!-- GitHub-Style Semester Activity Heatmap -->
                        <div
                            class="glass-panel"
                            style="
                                padding: 20px 24px;
                                margin-top: 20px;
                                border: 1px solid rgba(16, 185, 129, 0.25);
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 14px;
                                    flex-wrap: wrap;
                                    gap: 10px;
                                "
                            >
                                <div class="ext-style-35">
                                    <span class="ext-style-73">🟩</span>
                                    <div>
                                        <h4
                                            style="
                                                color: #f8fafc;
                                                font-size: 0.95rem;
                                                font-weight: 800;
                                                margin: 0;
                                            "
                                        >
                                            Chapter Contribution Heatmap
                                        </h4>
                                        <span class="ext-style-70"
                                            >Visual check-in intensity across past 16 weeks</span
                                        >
                                    </div>
                                </div>
                                <div
                                    style="
                                        display: flex;
                                        align-items: center;
                                        gap: 6px;
                                        font-size: 0.72rem;
                                        color: #94a3b8;
                                    "
                                >
                                    <span>Less</span>
                                    <span
                                        style="
                                            width: 11px;
                                            height: 11px;
                                            border-radius: 2px;
                                            background: rgba(30, 41, 59, 0.8);
                                            display: inline-block;
                                        "
                                    ></span>
                                    <span
                                        style="
                                            width: 11px;
                                            height: 11px;
                                            border-radius: 2px;
                                            background: rgba(16, 185, 129, 0.3);
                                            display: inline-block;
                                        "
                                    ></span>
                                    <span
                                        style="
                                            width: 11px;
                                            height: 11px;
                                            border-radius: 2px;
                                            background: rgba(16, 185, 129, 0.65);
                                            display: inline-block;
                                        "
                                    ></span>
                                    <span
                                        style="
                                            width: 11px;
                                            height: 11px;
                                            border-radius: 2px;
                                            background: #10b981;
                                            display: inline-block;
                                            box-shadow: 0 0 6px rgba(16, 185, 129, 0.7);
                                        "
                                    ></span>
                                    <span>More</span>
                                </div>
                            </div>
                            <div
                                id="dashboard-activity-heatmap"
                                style="
                                    display: flex;
                                    gap: 5px;
                                    overflow-x: auto;
                                    padding-bottom: 6px;
                                    align-items: center;
                                "
                            >
                                <!-- Populated dynamically via script.js -->
                            </div>
                        </div>

                        <!-- Chapter Analytics & Attendance Growth Chart (Chart.js) + Pastoral Care Alerts -->
                        <div
                            style="
                                display: grid;
                                grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
                                gap: 20px;
                                margin-top: 20px;
                            "
                        >
                            <div
                                class="glass-panel"
                                style="
                                    padding: 20px 24px;
                                    border: 1px solid rgba(56, 189, 248, 0.25);
                                "
                            >
                                <div
                                    style="
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                        margin-bottom: 16px;
                                    "
                                >
                                    <div class="ext-style-35">
                                        <span class="ext-style-73">📈</span>
                                        <div>
                                            <h4
                                                style="
                                                    color: #f8fafc;
                                                    font-size: 0.98rem;
                                                    font-weight: 800;
                                                    margin: 0;
                                                "
                                            >
                                                Monthly Attendance & Activity Growth
                                            </h4>
                                            <span class="ext-style-70"
                                                >Semester participation trends</span
                                            >
                                        </div>
                                    </div>
                                    <span
                                        class="badge"
                                        style="
                                            background: rgba(56, 189, 248, 0.15);
                                            color: #38bdf8;
                                            border: 1px solid rgba(56, 189, 248, 0.3);
                                        "
                                        >Live Analytics</span
                                    >
                                </div>
                                <div style="position: relative; height: 220px; width: 100%">
                                    <canvas id="dashboard-growth-canvas"></canvas>
                                </div>
                            </div>
                        </div>

                        <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-top: 20px">
                            <!-- Left Panel: Agenda -->
                            <div
                                class="glass-panel"
                                style="flex: 2; min-width: 320px; padding: 28px"
                            >
                                <div
                                    class="panel-header"
                                    style="
                                        margin-bottom: 20px;
                                        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                                        padding-bottom: 16px;
                                        display: flex;
                                        justify-content: space-between;
                                        align-items: center;
                                    "
                                >
                                    <div
                                        class="ext-style-50 panel-title-box"
                                       
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#F8FAFC"
                                            stroke-width="2"
                                            class="ext-style-77"
                                        >
                                            <rect
                                                x="3"
                                                y="4"
                                                width="18"
                                                height="18"
                                                rx="2"
                                                ry="2"
                                            />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <h3
                                            style="
                                                color: #f8fafc;
                                                font-size: 1.3rem;
                                                font-weight: 800;
                                                margin: 0;
                                            "
                                        >
                                            Agenda
                                        </h3>
                                    </div>
                                    <span class="badge badge-purple" id="agenda-count-badge"
                                        >Upcoming</span
                                    >
                                </div>
                                <div
                                    id="dashboard-upcoming-list"
                                    class="ext-style-62"
                                >
                                    <!-- Populated via script.js -->
                                </div>
                            </div>

                            <!-- Right Panel: Celebrants & Executive Reports -->
                            <div
                                style="
                                    flex: 1;
                                    min-width: 280px;
                                    display: flex;
                                    flex-direction: column;
                                    gap: 20px;
                                "
                            >
                                <!-- Birthday Celebrants Widget -->
                                <div class="glass-panel" style="padding: 24px">
                                    <div
                                        style="
                                            display: flex;
                                            align-items: center;
                                            justify-content: space-between;
                                            margin-bottom: 16px;
                                            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                                            padding-bottom: 12px;
                                        "
                                    >
                                        <div class="ext-style-35">
                                            <span class="ext-style-74">🎂</span>
                                            <h4
                                                style="
                                                    color: #f8fafc;
                                                    font-size: 1.05rem;
                                                    font-weight: 800;
                                                    margin: 0;
                                                "
                                            >
                                                Birthday Celebrants
                                            </h4>
                                        </div>
                                        <span class="badge badge-green" id="celebrants-month-badge"
                                            >This Month</span
                                        >
                                    </div>
                                    <div
                                        id="dashboard-celebrants-list"
                                        style="display: flex; flex-direction: column; gap: 10px"
                                    >
                                        <!-- Populated via script.js -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
`;
