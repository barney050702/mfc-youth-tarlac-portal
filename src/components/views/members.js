export default `
<div id="view-members" class="view-panel">
                        <div class="glass-panel">
                            <!-- Interactive Chapter Bullet / Pill Bar -->
                            <div
                                class="chapter-bullet-bar"
                                id="members-chapter-bullets"
                                style="
                                    display: flex;
                                    gap: 8px;
                                    align-items: center;
                                    flex-wrap: wrap;
                                    margin-bottom: 18px;
                                    padding-bottom: 16px;
                                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                                "
                            >
                                <span
                                    style="
                                        color: #38bdf8;
                                        font-weight: 800;
                                        font-size: 0.78rem;
                                        text-transform: uppercase;
                                        letter-spacing: 0.08em;
                                        margin-right: 6px;
                                        display: flex;
                                        align-items: center;
                                        gap: 6px;
                                    "
                                >
                                    🎯 CHAPTER BULLETS:
                                </span>

                                <button
                                    id="action-btn-36"
                                    type="button"
                                    class="chapter-bullet-btn active"
                                    data-chapter="ALL"
                                    style="
                                        background: linear-gradient(135deg, #0284c7, #3b82f6);
                                        color: #fff;
                                        border: 1px solid rgba(56, 189, 248, 0.5);
                                        border-radius: 20px;
                                        padding: 7px 16px;
                                        font-size: 0.82rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                        box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
                                    "
                                >
                                    🌐 All Chapters
                                </button>

                                <button
                                    id="action-btn-37"
                                    type="button"
                                    class="chapter-bullet-btn"
                                    data-chapter="Central Chapter"
                                    style="
                                        background: rgba(15, 23, 42, 0.65);
                                        color: #cbd5e1;
                                        border: 1px solid rgba(255, 255, 255, 0.15);
                                        border-radius: 20px;
                                        padding: 7px 16px;
                                        font-size: 0.82rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                    "
                                >
                                    📍 Central Chapter
                                </button>

                                <button
                                    id="action-btn-38"
                                    type="button"
                                    class="chapter-bullet-btn"
                                    data-chapter="East Chapter"
                                    style="
                                        background: rgba(15, 23, 42, 0.65);
                                        color: #cbd5e1;
                                        border: 1px solid rgba(255, 255, 255, 0.15);
                                        border-radius: 20px;
                                        padding: 7px 16px;
                                        font-size: 0.82rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                    "
                                >
                                    🌅 East Chapter
                                </button>

                                <button
                                    id="action-btn-39"
                                    type="button"
                                    class="chapter-bullet-btn"
                                    data-chapter="North Chapter"
                                    style="
                                        background: rgba(15, 23, 42, 0.65);
                                        color: #cbd5e1;
                                        border: 1px solid rgba(255, 255, 255, 0.15);
                                        border-radius: 20px;
                                        padding: 7px 16px;
                                        font-size: 0.82rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                    "
                                >
                                    🧭 North Chapter
                                </button>

                                <button
                                    id="action-btn-40"
                                    type="button"
                                    class="chapter-bullet-btn"
                                    data-chapter="South Chapter"
                                    style="
                                        background: rgba(15, 23, 42, 0.65);
                                        color: #cbd5e1;
                                        border: 1px solid rgba(255, 255, 255, 0.15);
                                        border-radius: 20px;
                                        padding: 7px 16px;
                                        font-size: 0.82rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                    "
                                >
                                    🌴 South Chapter
                                </button>

                                <button
                                    id="action-btn-41"
                                    type="button"
                                    class="chapter-bullet-btn"
                                    data-chapter="West Chapter"
                                    style="
                                        background: rgba(15, 23, 42, 0.65);
                                        color: #cbd5e1;
                                        border: 1px solid rgba(255, 255, 255, 0.15);
                                        border-radius: 20px;
                                        padding: 7px 16px;
                                        font-size: 0.82rem;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                    "
                                >
                                    🌄 West Chapter
                                </button>
                            </div>

                            <div
                                class="toolbar"
                                style="
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    flex-wrap: wrap;
                                    gap: 16px;
                                "
                            >
                                <div class="toolbar-left">
                                    <div class="search-box" style="width: 280px">
                                        <svg
                                            class="search-icon"
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
                                            id="members-search-input"
                                            placeholder="Search members by name, role..."
                                            aria-label="Search members"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="toolbar-right"
                                    style="
                                        display: flex;
                                        gap: 10px;
                                        align-items: center;
                                        flex-wrap: wrap;
                                    "
                                >
                                    <button
                                        id="action-btn-42"
                                        class="btn-secondary"
                                        title="Export Members Directory to PDF"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(248, 113, 113, 0.4);
                                            color: #f87171;
                                            display: flex;
                                            align-items: center;
                                        "
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            class="ext-style-68"
                                        >
                                            <path
                                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                            />
                                            <polyline points="14 2 14 8 20 8" />
                                            <path d="M10 12h4" />
                                            <path d="M10 16h4" />
                                            <path d="M10 8h1" />
                                        </svg>
                                        <span>Export PDF</span>
                                    </button>
                                    <button
                                        id="action-btn-43"
                                        class="btn-secondary"
                                        title="Export Members Directory to Excel / CSV"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(34, 197, 94, 0.45);
                                            color: #4ade80;
                                            display: flex;
                                            align-items: center;
                                        "
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            class="ext-style-68"
                                        >
                                            <path
                                                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                            />
                                            <polyline points="14 2 14 8 20 8" />
                                            <line x1="8" y1="13" x2="16" y2="13" />
                                            <line x1="8" y1="17" x2="16" y2="17" />
                                        </svg>
                                        <span>Export Excel/CSV</span>
                                    </button>
                                    <button
                                        id="action-btn-44"
                                        class="btn-secondary"
                                        title="View & Print Digital Youth Member ID Card"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(56, 189, 248, 0.45);
                                            color: #38bdf8;
                                            display: flex;
                                            align-items: center;
                                            font-weight: 700;
                                        "
                                    >
                                        <span class="ext-style-75">🆔</span>
                                        <span>Digital ID Card</span>
                                    </button>
                                    <button
                                        id="action-btn-45"
                                        class="btn-primary"
                                        title="Scan Member QR Code for Instant Check-in"
                                        style="
                                            padding: 10px 16px;
                                            background: linear-gradient(135deg, #10b981, #059669);
                                            border: none;
                                            display: flex;
                                            align-items: center;
                                            font-weight: 700;
                                        "
                                    >
                                        <span class="ext-style-75">📷</span>
                                        <span>Scan QR Check-In</span>
                                    </button>
                                    <button
                                        id="action-btn-46"
                                        class="btn-secondary"
                                        title="Generate Official Certificate of Participation PDF"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(245, 158, 11, 0.45);
                                            color: #fbbf24;
                                            display: flex;
                                            align-items: center;
                                            font-weight: 700;
                                        "
                                    >
                                        <span class="ext-style-75">📜</span>
                                        <span>Certificate PDF</span>
                                    </button>
                                    <button
                                        id="action-btn-47"
                                        class="btn-secondary"
                                        title="View Visual Pastoral Household & Leadership Mentoring Tree"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(168, 85, 247, 0.45);
                                            color: #c084fc;
                                            display: flex;
                                            align-items: center;
                                        "
                                    >
                                        <span class="ext-style-75">🌳</span>
                                        <span>Household Tree</span>
                                    </button>
                                    <button
                                        id="action-btn-48"
                                        class="btn-secondary"
                                        title="Print formatted paper clipboard sign-in sheet"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(251, 191, 36, 0.45);
                                            color: #fbbf24;
                                            display: flex;
                                            align-items: center;
                                        "
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            class="ext-style-68"
                                        >
                                            <polyline points="6 9 6 2 18 2 18 9" />
                                            <path
                                                d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"
                                            />
                                            <rect width="12" height="8" x="6" y="14" />
                                        </svg>
                                        <span>Print Printable Sheet</span>
                                    </button>
                                    <button
                                        id="action-btn-49"
                                        class="btn-secondary"
                                        title="Clear All Members"
                                        style="
                                            padding: 10px 16px;
                                            border-color: rgba(244, 63, 94, 0.4);
                                            color: #f43f5e;
                                            display: flex;
                                            align-items: center;
                                        "
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            class="ext-style-68"
                                        >
                                            <polyline points="3 6 5 6 21 6" />
                                            <path
                                                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                            />
                                        </svg>
                                        <span>Clear Members</span>
                                    </button>
                                    <button
                                        class="btn-primary glow-button"
                                        id="btn-open-add-member-list"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2.5"
                                            class="ext-style-48"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                        <span>Add Member</span>
                                    </button>
                                </div>
                            </div>

                            <!-- Duplicate Name Detection Banner (Auto-rendered when duplicates exist) -->
                            <div
                                id="members-duplicate-banner"
                                style="
                                    display: none;
                                    align-items: center;
                                    justify-content: space-between;
                                    background: linear-gradient(
                                        135deg,
                                        rgba(245, 158, 11, 0.2),
                                        rgba(217, 119, 6, 0.15)
                                    );
                                    border: 1px solid rgba(245, 158, 11, 0.5);
                                    border-radius: 14px;
                                    padding: 12px 20px;
                                    margin-top: 14px;
                                    color: #fbbf24;
                                    font-size: 0.88rem;
                                    box-shadow: 0 4px 15px rgba(245, 158, 11, 0.15);
                                "
                            >
                                <div class="ext-style-35">
                                    <span class="ext-style-73">⚠️</span>
                                    <div>
                                        <strong style="color: #fff; font-size: 0.95rem"
                                            >Duplicate Members Detected</strong
                                        >
                                        <div
                                            id="members-duplicate-banner-text"
                                            style="
                                                color: #fbbf24;
                                                font-size: 0.82rem;
                                                margin-top: 2px;
                                            "
                                        >
                                            We found identical names in the roster. Please review
                                            highlighted rows below.
                                        </div>
                                    </div>
                                </div>
                                <button
                                    id="btn-filter-duplicates"
                                    class="btn-secondary btn-sm"
                                    style="
                                        background: rgba(245, 158, 11, 0.25);
                                        border: 1px solid #f59e0b;
                                        color: #fff;
                                        font-weight: 700;
                                        cursor: pointer;
                                        transition: all 0.2s;
                                    "
                                >
                                    <span>🔍 Filter Only Duplicates</span>
                                </button>
                            </div>

                            <div class="table-container mt-4">
                                <table class="data-table hover-table">
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
                                            <th style="text-align: right">ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody id="members-table-body">
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

                            <!-- Native Mobile Member Cards Container (Visible on Mobile <= 768px) -->
                            <div
                                id="members-mobile-cards-container"
                                class="members-mobile-cards mt-3"
                                style="display: none"
                            >
                                <!-- Populated dynamically by script.js -->
                            </div>
                        </div>
                    </div>
`;
