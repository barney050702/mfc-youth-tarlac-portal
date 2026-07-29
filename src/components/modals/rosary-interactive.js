export default `
<div class="modal-backdrop" id="rosary-interactive-backdrop" style="display: none">
                <div
                    class="modal-card glass-card"
                    role="dialog"
                    aria-labelledby="rosary-title"
                    style="
                        max-width: 750px;
                        width: 95%;
                        max-height: 90vh;
                        padding: 28px;
                        display: flex;
                        flex-direction: column;
                    "
                >
                    <div
                        class="modal-header"
                        style="
                            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                            padding-bottom: 14px;
                            margin-bottom: 16px;
                        "
                    >
                        <div>
                            <h3
                                id="rosary-title"
                                style="
                                    color: #fff;
                                    font-size: 1.3rem;
                                    font-weight: 800;
                                    margin: 0 0 4px 0;
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                "
                            >
                                <span>📿 Interactive Holy Rosary Prayer Counter</span>
                            </h3>
                            <p class="ext-style-58">
                                Step-by-step bead counter, mystery meditations, and scripture
                                reflections.
                            </p>
                        </div>
                        <button
                            id="action-btn-187"
                            class="modal-close-btn"
                            aria-label="Close modal"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- MYSTERY SELECTOR -->
                    <div
                        style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap"
                        id="rosary-mystery-tabs"
                    >
                        <button
                            class="btn-secondary btn-sm ros-tab active"
                            id="ros-tab-joyful"
                            style="
                                border-color: #38bdf8;
                                color: #38bdf8;
                                background: rgba(56, 189, 248, 0.15);
                            "
                        >
                            ✨ Joyful (Mon/Sat)
                        </button>
                        <button class="btn-secondary btn-sm ros-tab" id="ros-tab-luminous">
                            🌟 Luminous (Thu)
                        </button>
                        <button class="btn-secondary btn-sm ros-tab" id="ros-tab-sorrowful">
                            ✝️ Sorrowful (Tue/Fri)
                        </button>
                        <button class="btn-secondary btn-sm ros-tab" id="ros-tab-glorious">
                            👑 Glorious (Wed/Sun)
                        </button>
                    </div>

                    <!-- BEAD PROGRESS TRACKER -->
                    <div
                        style="
                            background: rgba(15, 23, 42, 0.7);
                            border: 1px solid rgba(56, 189, 248, 0.3);
                            padding: 14px;
                            border-radius: 12px;
                            margin-bottom: 16px;
                        "
                    >
                        <div
                            style="
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                margin-bottom: 8px;
                            "
                        >
                            <span
                                id="rosary-decade-title"
                                style="color: #f8fafc; font-weight: 800; font-size: 0.95rem"
                                >Decade 1 of 5: The Annunciation</span
                            >
                            <span
                                id="rosary-bead-badge"
                                style="
                                    background: rgba(16, 185, 129, 0.2);
                                    color: #34d399;
                                    padding: 2px 10px;
                                    border-radius: 12px;
                                    font-weight: 800;
                                    font-size: 0.78rem;
                                "
                                >Hail Mary #1 / 10</span
                            >
                        </div>

                        <!-- Bead indicators -->
                        <div
                            style="
                                display: flex;
                                gap: 6px;
                                align-items: center;
                                justify-content: center;
                                margin: 10px 0;
                            "
                            id="rosary-beads-container"
                        >
                            <!-- Populated via script.js -->
                        </div>
                    </div>

                    <!-- MEDITATION & PRAYER CONTENT -->
                    <div
                        style="
                            background: #0f172a;
                            border-radius: 12px;
                            padding: 20px;
                            overflow-y: auto;
                            flex: 1;
                            border: 1px solid rgba(255, 255, 255, 0.1);
                        "
                        id="rosary-content-card"
                    >
                        <h4
                            id="ros-meditation-title"
                            style="
                                color: #38bdf8;
                                font-weight: 800;
                                margin: 0 0 8px 0;
                                font-size: 1.05rem;
                            "
                        >
                            The First Mystery: The Annunciation
                        </h4>
                        <p
                            id="ros-meditation-text"
                            style="
                                color: #cbd5e1;
                                font-size: 0.88rem;
                                line-height: 1.6;
                                margin: 0 0 14px 0;
                            "
                        >
                            The Angel Gabriel announces to Mary that she will be the Mother of God.
                            Mary responds: "I am the servant of the Lord; let it be done to me
                            according to your word."
                        </p>
                        <div
                            style="
                                background: rgba(255, 255, 255, 0.04);
                                border-left: 3px solid #34d399;
                                padding: 10px 14px;
                                border-radius: 4px;
                                font-size: 0.85rem;
                                color: #94a3b8;
                                font-style: italic;
                            "
                            id="ros-scripture-verse"
                        >
                            "Do not be afraid, Mary, for you have found favor with God. Behold, you
                            will conceive in your womb and bear a son, and you shall name him
                            Jesus." — Luke 1:30-31
                        </div>
                    </div>

                    <!-- CONTROLS -->
                    <div
                        style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-top: 16px;
                            gap: 10px;
                            flex-wrap: wrap;
                        "
                    >
                        <button
                            id="action-btn-188"
                            type="button"
                            class="ext-style-69 btn-secondary"
                           
                        >
                            <span>◀ Previous Bead</span>
                        </button>
                        <button
                            id="action-btn-189"
                            type="button"
                            class="btn-primary glow-button"
                            style="
                                display: flex;
                                align-items: center;
                                gap: 6px;
                                background: linear-gradient(135deg, #0284c7, #38bdf8);
                            "
                        >
                            <span>Next Bead ▶</span>
                        </button>
                    </div>
                </div>
            </div>
`;
