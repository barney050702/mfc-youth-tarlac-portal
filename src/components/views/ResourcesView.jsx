import React from 'react';

export default function ResourcesView() {
    return (
        <div id="view-resources" className="view-panel">
            <div
                className="glass-card"
                style={{
                    padding: '24px',
                    marginBottom: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '16px',
                }}
            >
                <div>
                    <h2
                        style={{
                            color: '#fff',
                            fontSize: '1.45rem',
                            fontWeight: 800,
                            margin: '0 0 6px 0',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <span>📁 MFC Youth Tarlac Resource Vault</span>
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
                        Official manuals, training decks, songboards, and chapter prayer guides
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                        id="action-btn-58"
                        className="btn-primary"
                        style={{
                            fontSize: '0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            border: 'none',
                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                            padding: '10px 18px',
                            cursor: 'pointer',
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ext-style-57">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span style={{ fontWeight: 700 }}>Download All Manuals</span>
                    </button>
                </div>
            </div>

            {/* Category Navigation Tabs inside Resources View */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }} id="resources-tab-bar">
                <button
                    className="resource-tab-btn active"
                    id="btn-res-youthcamp"
                    style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        background: 'rgba(56, 189, 248, 0.15)',
                        color: '#38bdf8',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    ⛺ Youthcamp
                </button>
                <button
                    className="resource-tab-btn"
                    id="btn-res-trainings"
                    style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(15, 23, 42, 0.4)',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    🎓 Trainings
                </button>
                <button
                    className="resource-tab-btn"
                    id="btn-res-songboard"
                    style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(15, 23, 42, 0.4)',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    🎸 Songboard
                </button>
                <button
                    className="resource-tab-btn"
                    id="btn-res-holyrosary"
                    style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(15, 23, 42, 0.4)',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    📿 Holy Rosary
                </button>
                <button
                    className="resource-tab-btn"
                    id="btn-res-letters"
                    style={{
                        padding: '10px 18px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'rgba(15, 23, 42, 0.4)',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    ✉️ Letters
                </button>
            </div>

            {/* TAB 1: YOUTHCAMP */}
            <div
                className="resource-section"
                id="res-section-youthcamp"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}
            >
                {/* Manual 2020 */}
                <div
                    className="glass-card"
                    data-static-id="static-youth-camp-manual-2020"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">⛺</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL 2020 PDF
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>MFC Youth Youth Camp Manual 2020</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Official complete 2020 edition manual with pre-camp preparations, team orientation guides, talk outlines, and pastoral activities.</p>
                    <div className="ext-style-49">
                        <a href="resources/MFC Youth Youth Camp Manual 2020.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open PDF</span>
                        </a>
                        <a href="resources/MFC Youth Youth Camp Manual 2020.pdf" download="MFC Youth Youth Camp Manual 2020.pdf" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>

                {/* Road to Youth Camp 2020 */}
                <div
                    className="glass-card"
                    data-static-id="static-road-to-youth-camp-2020"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">🛣️</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL 2020 PDF
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>MFC Youth Road to Youth Camp 2020</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete pastoral guide and roadmap for pre-camp planning, promotions, registration, discernment, and spiritual preparation.</p>
                    <div className="ext-style-49">
                        <a href="resources/MFC Youth Road to Youth Camp 2020.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open PDF</span>
                        </a>
                        <a href="resources/MFC Youth Road to Youth Camp 2020.pdf" download="MFC Youth Road to Youth Camp 2020.pdf" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* TAB 2: TRAININGS */}
            <div
                className="resource-section"
                id="res-section-trainings"
                style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}
            >
                {/* Household Servants Training */}
                <div
                    id="action-btn-59"
                    className="glass-card hover-glow"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ fontSize: '2.2rem' }}>📁</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            7 FILES
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>Household Servants Training Modules</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete collection of official manuals, session decks, and workshop presentations for Household Servants.</p>
                    <button className="btn-primary btn-sm" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', pointerEvents: 'none' }}>
                        <span>📂 Open Folder</span>
                    </button>
                </div>

                {/* Chapter Servants Training */}
                <div
                    id="action-btn-60"
                    className="glass-card hover-glow"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ fontSize: '2.2rem' }}>📁</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            6 FILES
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>Chapter Servants Training Modules</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete collection of official manuals, session decks, and workshop presentations for Chapter Servants.</p>
                    <button className="btn-primary btn-sm" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', pointerEvents: 'none' }}>
                        <span>📂 Open Folder</span>
                    </button>
                </div>
                <div className="ext-style-71 glass-card" data-static-id="static-clt-module">
                    <div className="ext-style-51">🏆</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Chapter Leadership Training (CLT)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Comprehensive module for chapter officers, ministry coordinators, and aspiring servant leaders.</p>
                    <button id="action-btn-61" className="btn-secondary btn-sm" style={{ width: '100%' }}>Open CLT Guide →</button>
                </div>
                <div className="ext-style-71 glass-card" data-static-id="static-hht-guide">
                    <div className="ext-style-51">🤝</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Household Heads Training (HHT)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Step-by-step guide on facilitating household meetings, one-on-ones, and pastoral care.</p>
                    <button id="action-btn-62" className="btn-secondary btn-sm" style={{ width: '100%' }}>Open HHT Guide →</button>
                </div>
                <div className="ext-style-71 glass-card" data-static-id="static-speaker-workshop">
                    <div className="ext-style-51">🗣️</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Speaker's Workshop Guide</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Effective public speaking, testimony preparation, and spiritual grounding for speakers.</p>
                    <button id="action-btn-63" className="btn-secondary btn-sm" style={{ width: '100%' }}>Open Workshop PDF →</button>
                </div>
            </div>

            {/* TAB 3: SONGBOARD */}
            <div
                className="resource-section"
                id="res-section-songboard"
                style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}
            >
                <div className="glass-card" data-static-id="static-songboard-pptx" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">🎶</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL PPTX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>MFC Youth Songboard (.pptx)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Official chapter worship presentation deck with complete song lyrics, praise visual templates, and chord sheets formatted for gatherings.</p>
                    <div className="ext-style-49">
                        <a href="resources/MFC Youth Songboard.pptx" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open Presentation</span>
                        </a>
                        <a href="resources/MFC Youth Songboard.pptx" download="MFC Youth Songboard.pptx" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>
                <div className="glass-card" data-static-id="static-songbook" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(168, 85, 247, 0.4)', background: 'rgba(15, 23, 42, 0.85)' }}>
                    <div className="ext-style-51">🎸</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>MFC Youth Official Songbook & Chord Transposer</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete lyrics & guitar chords with interactive live key transposition (+1/-1 semitones).</p>
                    <button id="action-btn-64" className="btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #a855f7, #7e22ce)', border: 'none' }}>🎸 Open Interactive Songbook & Transposer →</button>
                </div>
                <div className="ext-style-71 glass-card" data-static-id="static-setlist-planner">
                    <div className="ext-style-51">🎹</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Worship Setlist Planner</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Template for structuring gathering praise, opening worship, and reflection songs for assemblies.</p>
                    <button id="action-btn-65" className="btn-secondary btn-sm" style={{ width: '100%' }}>Plan Setlist →</button>
                </div>
            </div>

            {/* TAB 4: HOLY ROSARY */}
            <div
                className="resource-section"
                id="res-section-holyrosary"
                style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}
            >
                <div className="glass-card" data-static-id="static-rosary-joyful-pptx" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">✨</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL PPTX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>The Joyful Mysteries (Monday and Saturday) (.pptx)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete visual meditation deck and guided presentation for praying the Joyful Mysteries during Monday and Saturday chapter rosary prayers.</p>
                    <div className="ext-style-49">
                        <a href="resources/The Joyful Mysteries (Monday and Saturday).pptx" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open Presentation</span>
                        </a>
                        <a href="resources/The Joyful Mysteries (Monday and Saturday).pptx" download="The Joyful Mysteries (Monday and Saturday).pptx" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>
                <div className="glass-card" data-static-id="static-rosary-luminous-pptx" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">🌟</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL PPTX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>The Luminous Mysteries (Thursday) (.pptx)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete visual meditation deck and guided presentation for praying the Luminous Mysteries during Thursday chapter rosary prayers.</p>
                    <div className="ext-style-49">
                        <a href="resources/The Luminous Mysteries (Thursday).pptx" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open Presentation</span>
                        </a>
                        <a href="resources/The Luminous Mysteries (Thursday).pptx" download="The Luminous Mysteries (Thursday).pptx" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>
                <div className="glass-card" data-static-id="static-rosary-sorrowful-pptx" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">✝️</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL PPTX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>The Sorrowful Mysteries (Tuesday and Friday) (.pptx)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete visual meditation deck and guided presentation for praying the Sorrowful Mysteries during Tuesday and Friday chapter rosary prayers.</p>
                    <div className="ext-style-49">
                        <a href="resources/The Sorrowful Mysteries (Tuesday and Friday).pptx" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open Presentation</span>
                        </a>
                        <a href="resources/The Sorrowful Mysteries (Tuesday and Friday).pptx" download="The Sorrowful Mysteries (Tuesday and Friday).pptx" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>
                <div className="glass-card" data-static-id="static-rosary-glorious-pptx" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">👑</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            🟢 OFFICIAL PPTX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px 0' }}>The Glorious Mysteries (Wednesday and Sunday) (.pptx)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Complete visual meditation deck and guided presentation for praying the Glorious Mysteries during Wednesday and Sunday chapter rosary prayers.</p>
                    <div className="ext-style-49">
                        <a href="resources/The Glorious Mysteries (Wednesday and Sunday).pptx" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📄 Open Presentation</span>
                        </a>
                        <a href="resources/The Glorious Mysteries (Wednesday and Sunday).pptx" download="The Glorious Mysteries (Wednesday and Sunday).pptx" className="btn-secondary btn-sm" style={{ flex: 1, minWidth: '130px', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                            <span>📥 Download</span>
                        </a>
                    </div>
                </div>
                <div className="glass-card" data-static-id="static-holy-rosary" style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)' }}>
                    <div className="ext-style-51">📿</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>The Holy Rosary Interactive Guide & Bead Counter</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Guided mystery prayers, scripture verses, and interactive bead tracker (Joyful, Luminous, Sorrowful, Glorious).</p>
                    <button id="action-btn-66" className="btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: 'none' }}>📿 Start Interactive Rosary Prayer →</button>
                </div>
                <div className="ext-style-71 glass-card" data-static-id="static-prayer-litany">
                    <div className="ext-style-51">🕊️</div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Chapter Prayer & Litany Sheet</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Printable opening and closing prayers for household meetings and chapter assemblies.</p>
                    <button id="action-btn-67" className="btn-secondary btn-sm" style={{ width: '100%' }}>Open Prayer Sheet →</button>
                </div>
            </div>

            {/* TAB 5: LETTERS */}
            <div
                className="resource-section"
                id="res-section-letters"
                style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}
            >
                {/* FEATURED SMART LETTER GENERATOR CARD */}
                <div
                    className="glass-card"
                    data-static-id="static-letter-builder"
                    style={{
                        padding: '22px',
                        borderRadius: '16px',
                        border: '1px solid rgba(56, 189, 248, 0.5)',
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 132, 199, 0.25))',
                        position: 'relative'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">💌</div>
                        <span style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid rgba(56, 189, 248, 0.5)', color: '#38bdf8', padding: '4px 12px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                            ⚡ INSTANT PDF GENERATOR
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0' }}>Smart Fillable Chapter Letter & PDF Generator</h3>
                    <p style={{ color: '#cbd5e1', fontSize: '0.83rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Input the delegate name, parent name, event title, date & location to automatically generate and download an official formatted PDF letter with signature lines!</p>
                    <button id="action-btn-68" className="btn-primary btn-sm glow-button" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: 'none', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 16px', fontSize: '0.9rem' }}>
                        <span>✍️ Fill Form & Download PDF →</span>
                    </button>
                </div>

                {/* PARENTAL CONSENT CARD */}
                <div
                    className="glass-card"
                    data-static-id="static-letter-parental"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(245, 158, 11, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">📝</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                            PDF & DOCX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Parental Consent & Waiver Letter</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Official parental indemnity waiver for youth camps, weekend retreats, and provincial mission trips.</p>
                    <div className="ext-style-64">
                        <button id="action-btn-69" className="btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', fontWeight: 800 }}>✍️ Fill & Export PDF</button>
                        <div className="ext-style-72">
                            <a href="resources/Parental Consent and Endorsement Letter.docx" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📄 Open Doc</a>
                            <a href="resources/Parental Consent and Endorsement Letter.docx" download className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📥 Word .docx</a>
                        </div>
                    </div>
                </div>

                {/* SCHOOL EXCUSE CARD */}
                <div
                    className="glass-card"
                    data-static-id="static-letter-excuse"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">📜</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                            PDF & DOCX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Pastoral School / University Excuse</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Formal excuse letter addressed to school deans, principals, and teachers for delegates and servants.</p>
                    <div className="ext-style-64">
                        <button id="action-btn-70" className="btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: 'none', fontWeight: 800 }}>📜 Fill & Export PDF</button>
                        <div className="ext-style-72">
                            <a href="resources/Pastoral Invitation and School Excuse Letter.docx" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📄 Open Doc</a>
                            <a href="resources/Pastoral Invitation and School Excuse Letter.docx" download className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📥 Word .docx</a>
                        </div>
                    </div>
                </div>

                {/* SPONSORSHIP APPEAL CARD */}
                <div
                    className="glass-card"
                    data-static-id="static-letter-sponsorship"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">🤝</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                            PDF & DOCX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Sponsorship & Solicitation Appeal</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Fundraising appeal letter template for financial partners, donors, and sponsors for youth outreach.</p>
                    <div className="ext-style-64">
                        <button id="action-btn-71" className="btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', fontWeight: 800 }}>🤝 Fill & Export PDF</button>
                        <div className="ext-style-72">
                            <a href="resources/Sponsorship and Solicitation Appeal Letter.docx" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📄 Open Doc</a>
                            <a href="resources/Sponsorship and Solicitation Appeal Letter.docx" download className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📥 Word .docx</a>
                        </div>
                    </div>
                </div>

                {/* TRANSPORTATION CARD */}
                <div
                    className="glass-card"
                    data-static-id="static-letter-transportation"
                    style={{ padding: '22px', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.4)', background: 'rgba(15, 23, 42, 0.85)', position: 'relative' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div className="ext-style-59">🚌</div>
                        <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34d399', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                            PDF & DOCX
                        </span>
                    </div>
                    <h3 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 8px 0' }}>Letter For Transportation (.docx)</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>Official chapter transportation request and shuttle coordination letter template for youth camps.</p>
                    <div className="ext-style-64">
                        <button id="action-btn-72" className="btn-primary btn-sm" style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: 'none', fontWeight: 800 }}>🚌 Fill & Export PDF</button>
                        <div className="ext-style-72">
                            <a href="resources/Letter For Transportation.docx" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📄 Open Doc</a>
                            <a href="resources/Letter For Transportation.docx" download className="btn-secondary btn-sm" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', fontSize: '0.75rem' }}>📥 Word .docx</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dynamic user-added resource cards per tab */}
            <div id="res-dynamic-youthcamp" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}></div>
            <div id="res-dynamic-trainings" style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}></div>
            <div id="res-dynamic-songboard" style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}></div>
            <div id="res-dynamic-holyrosary" style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}></div>
            <div id="res-dynamic-letters" style={{ display: 'none', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}></div>
        </div>
    );
}
