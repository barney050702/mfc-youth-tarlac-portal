import React, { useEffect, useState } from 'react';
import { state } from '../../modules/state.js';
import { calculateAgeClean, formatDateClean } from '../../modules/members.js';

const MemberIDCardModal = ({ isOpen, onClose, memberId }) => {
    const [member, setMember] = useState(null);

    useEffect(() => {
        if (!isOpen || !memberId) return;

        const foundMember = state.members.find((m) => m.id === memberId);
        if (!foundMember) return;
        setMember(foundMember);
    }, [isOpen, memberId]);

    if (!isOpen || !member) return null;

    const initial = member.name ? member.name.charAt(0).toUpperCase() : 'M';

    return (
        <div className="modal-backdrop" style={{ display: 'flex', zIndex: 100002, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="glass-modal-content" style={{ maxWidth: '420px', width: '90%', padding: '24px', background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(56,189,248,0.3)', borderRadius: '24px' }}>
                <div className="modal-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#F8FAFC' }}>
                            🆔 Digital Youth Member ID
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
                            Official MFC Youth Tarlac Chapter Membership Credential
                        </p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
                </div>

                {/* PRINTABLE GLASS ID CARD DESIGN */}
                <div id="printable-member-id-card" style={{ width: '100%', aspectRatio: '1.586/1', background: 'linear-gradient(135deg, #0B0F19 0%, #172554 100%)', borderRadius: '16px', padding: '16px', position: 'relative', overflow: 'hidden', border: '2px solid rgba(56,189,248,0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#FFF' }}>
                    
                    {/* Background Graphic */}
                    <div style={{ position: 'absolute', top: '-50%', right: '-50%', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)', transform: 'rotate(45deg)' }}></div>

                    {/* CARD HEADER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <img src="/mfc-logo.png" alt="MFC Logo" style={{ width: '32px', height: '32px' }} />
                            <div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', color: '#38BDF8' }}>MFC YOUTH TARLAC</div>
                                <div style={{ fontSize: '0.55rem', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>Official Member Pass</div>
                            </div>
                        </div>
                        <span style={{ fontSize: '0.5rem', background: 'rgba(56,189,248,0.2)', color: '#38BDF8', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>ACTIVE MEMBER</span>
                    </div>

                    {/* CARD BODY */}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', position: 'relative', zIndex: 2, margin: '12px 0' }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 800, border: '2px solid rgba(255,255,255,0.2)' }}>
                            {initial}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.5px' }}>{member.name}</h2>
                            <div style={{ fontSize: '0.65rem', color: '#94A3B8', margin: '2px 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {member.role || 'Member'} • {member.chapter || 'Central'} Chapter
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#38BDF8' }}>Age: {member.age || calculateAgeClean(member)} • Bday: {formatDateClean(member.birthday)}</div>
                            <div style={{ fontSize: '0.65rem', color: '#E2E8F0', marginTop: '2px' }}>Emergency: {member.parentsContact || member.contactNum || 'N/A'}</div>
                        </div>
                    </div>

                    {/* CARD FOOTER */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                        <div>
                            <div style={{ fontSize: '0.5rem', color: '#64748B' }}>MEMBER ID NUMBER</div>
                            <div style={{ fontSize: '0.75rem', fontFamily: '"Roboto Mono", monospace', fontWeight: 700, color: '#38BDF8' }}>{member.id}</div>
                        </div>
                        <div style={{ fontSize: '0.5rem', color: '#94A3B8', textAlign: 'right' }}>
                            Property of<br />MFC Youth Tarlac
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button type="button" className="btn-primary" style={{ flex: 1, padding: '12px', background: '#0284c7', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }} onClick={() => window.print()}>
                        📄 Print / Save as PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberIDCardModal;
