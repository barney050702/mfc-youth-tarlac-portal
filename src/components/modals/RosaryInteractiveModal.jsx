import React, { useEffect } from 'react';

const RosaryInteractiveModal = () => {
    useEffect(() => {
        const closeBtn = document.getElementById('action-btn-187');
        const prevBtn = document.getElementById('action-btn-188');
        const nextBtn = document.getElementById('action-btn-189');

        const tabs = [
            document.getElementById('ros-tab-joyful'),
            document.getElementById('ros-tab-luminous'),
            document.getElementById('ros-tab-sorrowful'),
            document.getElementById('ros-tab-glorious'),
        ];

        const handleClose = () => {
            if (window.closeRosaryModal) {
                window.closeRosaryModal();
            } else {
                document.getElementById('rosary-interactive-backdrop').style.display = 'none';
            }
        };

        const handlePrev = () => {
            if (window.prevRosaryBead) {
                window.prevRosaryBead();
            }
        };

        const handleNext = () => {
            if (window.nextRosaryBead) {
                window.nextRosaryBead();
            }
        };

        const handleTabClick = (e) => {
            const mystery = e.target.id.split('-')[2];
            if (window.setRosaryMystery) {
                window.setRosaryMystery(mystery);
            }
        };

        if (closeBtn) closeBtn.addEventListener('click', handleClose);
        if (prevBtn) prevBtn.addEventListener('click', handlePrev);
        if (nextBtn) nextBtn.addEventListener('click', handleNext);

        tabs.forEach(tab => {
            if (tab) tab.addEventListener('click', handleTabClick);
        });

        return () => {
            if (closeBtn) closeBtn.removeEventListener('click', handleClose);
            if (prevBtn) prevBtn.removeEventListener('click', handlePrev);
            if (nextBtn) nextBtn.removeEventListener('click', handleNext);

            tabs.forEach(tab => {
                if (tab) tab.removeEventListener('click', handleTabClick);
            });
        };
    }, []);

    return (
        <div className="modal-backdrop" id="rosary-interactive-backdrop" style={{ display: 'none' }}>
            <div
                className="modal-card glass-card"
                role="dialog"
                aria-labelledby="rosary-title"
                style={{
                    maxWidth: '750px',
                    width: '95%',
                    maxHeight: '90vh',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    className="modal-header"
                    style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingBottom: '14px',
                        marginBottom: '16px',
                    }}
                >
                    <div>
                        <h3
                            id="rosary-title"
                            style={{
                                color: '#fff',
                                fontSize: '1.3rem',
                                fontWeight: 800,
                                margin: '0 0 4px 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <span>📿 Interactive Holy Rosary Prayer Counter</span>
                        </h3>
                        <p className="ext-style-58">
                            Step-by-step bead counter, mystery meditations, and scripture
                            reflections.
                        </p>
                    </div>
                    <button
                        id="action-btn-187"
                        className="modal-close-btn"
                        aria-label="Close modal"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* MYSTERY SELECTOR */}
                <div
                    style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}
                    id="rosary-mystery-tabs"
                >
                    <button
                        className="btn-secondary btn-sm ros-tab active"
                        id="ros-tab-joyful"
                        style={{
                            borderColor: '#38bdf8',
                            color: '#38bdf8',
                            background: 'rgba(56, 189, 248, 0.15)',
                        }}
                    >
                        ✨ Joyful (Mon/Sat)
                    </button>
                    <button className="btn-secondary btn-sm ros-tab" id="ros-tab-luminous">
                        🌟 Luminous (Thu)
                    </button>
                    <button className="btn-secondary btn-sm ros-tab" id="ros-tab-sorrowful">
                        ✝️ Sorrowful (Tue/Fri)
                    </button>
                    <button className="btn-secondary btn-sm ros-tab" id="ros-tab-glorious">
                        👑 Glorious (Wed/Sun)
                    </button>
                </div>

                {/* BEAD PROGRESS TRACKER */}
                <div
                    style={{
                        background: 'rgba(15, 23, 42, 0.7)',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        padding: '14px',
                        borderRadius: '12px',
                        marginBottom: '16px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px',
                        }}
                    >
                        <span
                            id="rosary-decade-title"
                            style={{ color: '#f8fafc', fontWeight: 800, fontSize: '0.95rem' }}
                        >
                            Decade 1 of 5: The Annunciation
                        </span>
                        <span
                            id="rosary-bead-badge"
                            style={{
                                background: 'rgba(16, 185, 129, 0.2)',
                                color: '#34d399',
                                padding: '2px 10px',
                                borderRadius: '12px',
                                fontWeight: 800,
                                fontSize: '0.78rem',
                            }}
                        >
                            Hail Mary #1 / 10
                        </span>
                    </div>

                    {/* Bead indicators */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '6px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '10px 0',
                        }}
                        id="rosary-beads-container"
                    >
                        {/* Populated via script.js */}
                    </div>
                </div>

                {/* MEDITATION & PRAYER CONTENT */}
                <div
                    style={{
                        background: '#0f172a',
                        borderRadius: '12px',
                        padding: '20px',
                        overflowY: 'auto',
                        flex: 1,
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                    id="rosary-content-card"
                >
                    <h4
                        id="ros-meditation-title"
                        style={{
                            color: '#38bdf8',
                            fontWeight: 800,
                            margin: '0 0 8px 0',
                            fontSize: '1.05rem',
                        }}
                    >
                        The First Mystery: The Annunciation
                    </h4>
                    <p
                        id="ros-meditation-text"
                        style={{
                            color: '#cbd5e1',
                            fontSize: '0.88rem',
                            lineHeight: 1.6,
                            margin: '0 0 14px 0',
                        }}
                    >
                        The Angel Gabriel announces to Mary that she will be the Mother of God.
                        Mary responds: "I am the servant of the Lord; let it be done to me
                        according to your word."
                    </p>
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            borderLeft: '3px solid #34d399',
                            padding: '10px 14px',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            color: '#94a3b8',
                            fontStyle: 'italic',
                        }}
                        id="ros-scripture-verse"
                    >
                        "Do not be afraid, Mary, for you have found favor with God. Behold, you
                        will conceive in your womb and bear a son, and you shall name him
                        Jesus." — Luke 1:30-31
                    </div>
                </div>

                {/* CONTROLS */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px',
                        gap: '10px',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        id="action-btn-188"
                        type="button"
                        className="ext-style-69 btn-secondary"
                    >
                        <span>◀ Previous Bead</span>
                    </button>
                    <button
                        id="action-btn-189"
                        type="button"
                        className="btn-primary glow-button"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                        }}
                    >
                        <span>Next Bead ▶</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RosaryInteractiveModal;
