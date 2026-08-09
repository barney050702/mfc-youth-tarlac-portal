import React, { useEffect, useState } from 'react';

// We'll temporarily import the legacy state and functions until Phase 3 (State Management)
import { state } from '../../modules/state.js';
import { calculateAgeClean, formatDateClean } from '../../modules/members.js';

const MemberProfileModal = ({ isOpen, onClose, memberId }) => {
    const [member, setMember] = useState(null);
    const [stats, setStats] = useState({ present: 0, late: 0, absent: 0, total: 0, rate: 0 });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (!isOpen || !memberId) return;

        const foundMember = state.members.find((m) => m.id === memberId);
        if (!foundMember) return;
        setMember(foundMember);

        let presentCount = 0;
        let lateCount = 0;
        let absentCount = 0;
        const totalActivities = state.activities.length;
        const newHistory = [];

        state.activities.forEach((act) => {
            const record = state.attendance[act.id]?.[memberId];
            let statusText = 'Absent / Unrecorded';
            let statusClass = 'text-red';
            if (record) {
                if (record.status === 'present') {
                    presentCount++;
                    statusText = '✅ Present';
                    statusClass = 'badge-green';
                } else if (record.status === 'late') {
                    lateCount++;
                    statusText = '⏰ Late';
                    statusClass = 'badge-emerald';
                } else if (record.status === 'absent') {
                    absentCount++;
                    statusText = '❌ Absent';
                    statusClass = 'badge-rose';
                }
            } else {
                absentCount++;
            }

            newHistory.push({
                ...act,
                statusText,
                statusClass
            });
        });

        const rate = totalActivities > 0 ? Math.round(((presentCount + lateCount) / totalActivities) * 100) : 0;
        setStats({ present: presentCount, late: lateCount, absent: absentCount, total: totalActivities, rate });
        setHistory(newHistory);

    }, [isOpen, memberId]);

    if (!isOpen || !member) return null;

    const initial = member.name.charAt(0).toUpperCase();

    return (
        <div className="modal-backdrop" style={{ display: 'flex', zIndex: 100000, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="modal-card glass-card" style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>👤</span> Member Service Profile
                    </h3>
                    <button className="btn-close" onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.5rem', cursor: 'pointer' }}>
                        ×
                    </button>
                </div>
                
                <div id="profile-modal-content" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="profile-header-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="profile-large-avatar" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '800', color: '#FFF' }}>
                                {initial}
                            </div>
                            <div className="profile-info">
                                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#F8FAFC' }}>{member.name}</h2>
                                <div className="profile-meta" style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                                    <span className="org-stat-badge" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>{member.role}</span>
                                    <span className="org-stat-badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#C084FC', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>🏢 {member.department || member.dept || 'MFC Youth'}</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button type="button" className="btn-secondary" onClick={() => window.exportMemberDossierPDF?.(member.id)} style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38BDF8', background: 'transparent', borderRadius: '8px', cursor: 'pointer' }}>
                                <span>📄 Export Report PDF</span>
                            </button>
                            <button type="button" className="btn-primary glow-button" onClick={() => {
                                // Dispatch custom event to open QR modal
                                window.dispatchEvent(new CustomEvent('openModal', { detail: { modalName: 'member-qr', data: member.id } }));
                            }} style={{ padding: '8px 16px', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#0284c7', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                                <span>📱 Official QR ID</span>
                            </button>
                        </div>
                    </div>

                    {/* Quick Pastoral Contact Toolbar */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px', background: 'rgba(15,23,42,0.6)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94A3B8', fontSize: '0.78rem', fontWeight: 700 }}>📲 QUICK REACH-OUT:</span>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <a href={member.contactNum ? `https://wa.me/${member.contactNum.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent('Hi Kuya/Ate ' + member.name + '! Peace of Christ! Checking in from MFC Youth Tarlac 🙏')}` : '#'} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', background: 'rgba(34,197,94,0.2)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '8px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700 }}>
                                💬 WhatsApp
                            </a>
                            <a href={member.contactNum ? `tel:${member.contactNum}` : '#'} style={{ textDecoration: 'none', background: 'rgba(56,189,248,0.2)', color: '#38BDF8', border: '1px solid rgba(56,189,248,0.4)', borderRadius: '8px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700 }}>
                                📞 Call
                            </a>
                            <button type="button" onClick={() => window.sendCelebrationGreeting?.(member.name)} style={{ background: 'rgba(236,72,153,0.2)', color: '#F472B6', border: '1px solid rgba(236,72,153,0.4)', borderRadius: '8px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                                💌 Birthday Card
                            </button>
                        </div>
                    </div>

                    {/* Recognition Badges Row */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {stats.rate >= 80 && <span style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#34D399', padding: '4px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>🔥 Faithful Attendance Award</span>}
                        <span style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#60A5FA', padding: '4px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>⭐ Active Youth Servant</span>
                        <span style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)', color: '#FBBF24', padding: '4px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 700 }}>⚡ MFC Youth Tarlac Chapter</span>
                    </div>

                    <div className="profile-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
                        <div className="profile-stat-box" style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F8FAFC' }}>{stats.total}</div>
                            <div className="lbl" style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>Total Events</div>
                        </div>
                        <div className="profile-stat-box" style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34D399' }}>{stats.rate}%</div>
                            <div className="lbl" style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>Attendance Rate</div>
                        </div>
                        <div className="profile-stat-box" style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FBBF24' }}>{stats.present + stats.late}/{stats.total}</div>
                            <div className="lbl" style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>Attended / Total</div>
                        </div>
                        <div className="profile-stat-box" style={{ background: 'rgba(15,23,42,0.5)', padding: '16px', borderRadius: '12px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="num" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#C084FC' }}>{stats.present}:{stats.late}</div>
                            <div className="lbl" style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '4px' }}>Present : Late Ratio</div>
                        </div>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', color: '#38BDF8', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
                        <span>📋</span> Complete Personal & Youth Camp Dossier
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', background: 'rgba(15,23,42,0.8)', padding: '18px', borderRadius: '16px', border: '1px solid rgba(56,189,248,0.25)', marginBottom: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>👤 FULL NAME BREAKDOWN</span>
                            <span style={{ color: '#F8FAFC', fontWeight: 800, fontSize: '0.92rem' }}>{member.name || '-'}</span>
                            <div style={{ color: '#38BDF8', fontSize: '0.78rem', marginTop: '3px' }}>First: <strong style={{color:'#FFF'}}>{member.firstName || member.name.split(' ')[0] || '-'}</strong> | Mid: <strong style={{color:'#FFF'}}>{member.middleName || '-'}</strong> | Last: <strong style={{color:'#FFF'}}>{member.lastName || member.name.split(' ').slice(-1)[0] || '-'}</strong></div>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>🎂 BIRTHDAY & AGE</span>
                            <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>{formatDateClean(member.birthday)} ({calculateAgeClean(member)} yrs old)</span>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>🏠 HOME ADDRESS</span>
                            <span style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '0.9rem' }}>{member.address || '-'}</span>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>📞 CONTACT NUMBER</span>
                            <span style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.9rem', fontFamily: '"Roboto Mono", monospace' }}>{member.contactNum || '-'}</span>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>📧 EMAIL ADDRESS</span>
                            <span style={{ color: '#60A5FA', fontWeight: 600, fontSize: '0.88rem' }}>{member.email || '-'}</span>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>👨‍👩‍👧 PARENTS CONTACT #</span>
                            <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem', fontFamily: '"Roboto Mono", monospace' }}>{member.parentsContact || '-'}</span>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>🏕️ YOUTH CAMP TITLE & DATE</span>
                            <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>{member.campTitle || 'USBONG Encounter Camp'} • {formatDateClean(member.campDate)}</span>
                        </div>
                        <div>
                            <span style={{ color: '#64748B', fontSize: '0.72rem', display: 'block', fontWeight: 700, marginBottom: '3px' }}>🙏 COVENANTED DATE</span>
                            <span style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.9rem' }}>{formatDateClean(member.covenantDate || member.campDate)}</span>
                        </div>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', color: '#E2E8F0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📅</span> Recent Activity Check-in History
                    </h4>
                    <div className="profile-activities-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {history.length > 0 ? history.map(act => (
                            <div key={act.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ fontWeight: 700, color: '#F8FAFC', fontSize: '0.9rem' }}>{act.name || act.title || 'Activity'}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{new Date(act.date).toLocaleDateString()} • {act.type || act.category || 'Event'}</div>
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: 700 }} className={act.statusClass}>{act.statusText}</span>
                            </div>
                        )) : (
                            <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>No activity records found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberProfileModal;
