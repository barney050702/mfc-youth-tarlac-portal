export default `
<div id="view-agenda" class="view-panel">
                        <!-- Toolbar & Controls -->
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-bottom: 24px;
                                flex-wrap: wrap;
                                gap: 16px;
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    align-items: center;
                                    gap: 14px;
                                    flex-wrap: wrap;
                                "
                            >
                                <button
                                    id="action-btn-20"
                                    style="
                                        background: rgba(15, 23, 42, 0.7);
                                        border: 1px solid rgba(59, 130, 246, 0.4);
                                        color: #60a5fa;
                                        padding: 10px 22px;
                                        border-radius: 10px;
                                        font-weight: 700;
                                        font-size: 0.85rem;
                                        cursor: pointer;
                                        display: inline-flex;
                                        align-items: center;
                                        gap: 8px;
                                        transition: all 0.2s;
                                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                                    "
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2.5"
                                        class="ext-style-57"
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
                                    <span>REFRESH AGENDA</span>
                                </button>
                            </div>
                            <div
                                style="
                                    display: flex;
                                    align-items: center;
                                    gap: 12px;
                                    flex-wrap: wrap;
                                "
                            >
                                <div class="search-box-sm">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
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
                                <div class="filter-group" style="margin: 0">
                                    <select
                                        id="agenda-filter-category"
                                        class="custom-select"
                                        style="padding: 8px 14px"
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
                                </div>
                                <button id="action-btn-21" class="btn-primary glow-button">
                                    <span>+ Add Activity</span>
                                </button>
                            </div>
                        </div>

                        <!-- FEATURE 2: INTERACTIVE EVENT CALENDAR & RSVP HUB -->
                        <div
                            class="glass-panel"
                            style="
                                padding: 24px;
                                margin-bottom: 20px;
                                border: 1px solid rgba(56, 189, 248, 0.3);
                                background: linear-gradient(
                                    135deg,
                                    rgba(15, 23, 42, 0.95),
                                    rgba(2, 132, 199, 0.15)
                                );
                            "
                        >
                            <div
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    margin-bottom: 16px;
                                    flex-wrap: wrap;
                                    gap: 12px;
                                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                                    padding-bottom: 12px;
                                "
                            >
                                <div class="ext-style-50">
                                    <span style="font-size: 1.5rem">📅</span>
                                    <div>
                                        <h3
                                            style="
                                                color: #f8fafc;
                                                font-size: 1.15rem;
                                                font-weight: 800;
                                                margin: 0;
                                            "
                                            id="calendar-month-year-title"
                                        >
                                            Event Calendar & RSVP Hub
                                        </h3>
                                        <span style="color: #94a3b8; font-size: 0.78rem"
                                            >Click any event date to view schedule & RSVP
                                            status</span
                                        >
                                    </div>
                                </div>
                                <div style="display: flex; gap: 8px; align-items: center">
                                    <button
                                        id="action-btn-22"
                                        class="ext-style-61 btn-secondary btn-sm"
                                       
                                    >
                                        ◀ Prev
                                    </button>
                                    <button
                                        id="action-btn-23"
                                        class="ext-style-61 btn-secondary btn-sm"
                                       
                                    >
                                        Next ▶
                                    </button>
                                </div>
                            </div>

                            <!-- CALENDAR GRID -->
                            <div
                                id="portal-calendar-grid"
                                style="
                                    display: grid;
                                    grid-template-columns: repeat(7, 1fr);
                                    gap: 6px;
                                    text-align: center;
                                "
                            >
                                <!-- Populated dynamically via script.js -->
                            </div>
                        </div>

                        <!-- TABLE VIEW CONTAINER (Always Active for Agenda) -->
                        <div id="agenda-table-container" class="glass-panel" style="display: block">
                            <div class="table-responsive mt-2">
                                <table class="data-table hover-table">
                                    <thead>
                                        <tr>
                                            <th>ACTIVITY TITLE</th>
                                            <th>DATE & LOCATION</th>
                                            <th>CATEGORY / HELD IN</th>
                                            <th>STATUS</th>
                                            <th class="text-right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody id="activities-table-body">
                                        <tr>
                                            <td
                                                colspan="6"
                                                style="
                                                    padding: 1rem;
                                                    text-align: center;
                                                    border: none;
                                                "
                                            >
                                                <div
                                                    class="ext-style-76 skeleton-card"
                                                   
                                                ></div>
                                                <div
                                                    class="ext-style-76 skeleton-card"
                                                   
                                                ></div>
                                                <div
                                                    class="skeleton-card"
                                                    style="height: 60px"
                                                ></div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
`;
