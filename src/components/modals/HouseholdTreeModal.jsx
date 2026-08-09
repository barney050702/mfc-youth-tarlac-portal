import React, { useState, useEffect } from 'react';
import { state } from '../../modules/state.js';

const HouseholdTreeModal = ({ isOpen, onClose }) => {
    const [chapters, setChapters] = useState({});

    useEffect(() => {
        if (!isOpen) return;
        
        // Group members by Chapter
        const groupedChapters = {};
        if (state && state.members) {
            state.members.forEach((m) => {
                const chap = (m.chapter || 'MFC Youth Tarlac').toUpperCase();
                if (!groupedChapters[chap]) groupedChapters[chap] = { leaders: [], members: [] };
                const role = (m.role || '').toLowerCase();
                if (
                    role.includes('head') ||
                    role.includes('couple') ||
                    role.includes('coordinator') ||
                    role.includes('leader')
                ) {
                    groupedChapters[chap].leaders.push(m);
                } else {
                    groupedChapters[chap].members.push(m);
                }
            });
        }
        setChapters(groupedChapters);
    }, [isOpen]);

    if (!isOpen) return null;

    const handleMemberClick = (memberId) => {
        if (window.openMemberProfile) {
            window.openMemberProfile(memberId);
        }
    };

    return (
        <div className="modal-backdrop ext-style-261" id="household-tree-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card ext-style-262" role="dialog" aria-labelledby="household-tree-title">
                <div className="modal-header ext-style-263">
                    <div className="ext-style-50">
                        <span className="ext-style-59">🌳</span>
                        <div>
                            <h3 id="household-tree-title" className="ext-style-264">
                                Pastoral Household & Mentoring Lineage Tree
                            </h3>
                            <span className="ext-style-265">Chapter Hierarchy & Pastoral Mentoring Units</span>
                        </div>
                    </div>
                    <button className="modal-close-btn" aria-label="Close modal" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div id="household-tree-container" className="ext-style-266">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        {Object.keys(chapters).map((chapName) => {
                            const group = chapters[chapName];
                            return (
                                <div key={chapName} style={{ background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(168,85,247,0.35)', borderRadius: '16px', padding: '20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '1.4rem' }}>🏛️</span>
                                            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{chapName}</h4>
                                        </div>
                                        <span style={{ background: 'rgba(168,85,247,0.2)', color: '#C084FC', fontSize: '0.75rem', fontWeight: 700, padding: '4px 12px', borderRadius: '12px' }}>
                                            {group.leaders.length + group.members.length} Total Servants
                                        </span>
                                    </div>

                                    {/* Leaders Tier */}
                                    <div style={{ marginBottom: '16px' }}>
                                        <h5 style={{ color: '#C084FC', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 10px 0' }}>👑 Chapter & Household Leaders</h5>
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            {group.leaders.length > 0 ? (
                                                group.leaders.map(l => (
                                                    <div key={l.id} onClick={() => handleMemberClick(l.id)} style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(126,34,206,0.15))', border: '1px solid rgba(168,85,247,0.45)', borderRadius: '12px', padding: '10px 14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                                        <div style={{ color: '#FFF', fontWeight: 700, fontSize: '0.88rem' }}>{l.name}</div>
                                                        <div style={{ color: '#D8B4FE', fontSize: '0.75rem' }}>{l.role}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span style={{ color: '#64748B', fontSize: '0.82rem' }}>No household leaders assigned yet.</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Youth Unit Tier */}
                                    <div>
                                        <h5 style={{ color: '#38BDF8', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 10px 0' }}>👥 Household Youth Members</h5>
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {group.members.length > 0 ? (
                                                group.members.map(m => (
                                                    <div key={m.id} onClick={() => handleMemberClick(m.id)} style={{ background: 'rgba(30,41,59,0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '8px 12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                                        <div style={{ color: '#F8FAFC', fontSize: '0.82rem', fontWeight: 600 }}>{m.name}</div>
                                                        <div style={{ color: '#94A3B8', fontSize: '0.72rem' }}>{m.department || 'Youth'}</div>
                                                    </div>
                                                ))
                                            ) : (
                                                <span style={{ color: '#64748B', fontSize: '0.82rem' }}>No household members listed.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="ext-style-267">
                    <button type="button" className="btn-primary" onClick={onClose}>
                        Close Tree View
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HouseholdTreeModal;
