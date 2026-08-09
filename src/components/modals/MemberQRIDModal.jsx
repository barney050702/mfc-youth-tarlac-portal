import React, { useEffect, useState } from 'react';
import { state } from '../../modules/state.js';

const MemberQRIDModal = ({ isOpen, onClose, memberId }) => {
    const [member, setMember] = useState(null);

    useEffect(() => {
        if (!isOpen || !memberId) return;

        const foundMember = state.members.find((m) => m.id === memberId);
        if (!foundMember) return;
        setMember(foundMember);

        // Generate QR code once modal is open and DOM container is ready
        setTimeout(() => {
            const container = document.getElementById('qrcode-react-container');
            if (container && window.QRCode) {
                container.innerHTML = '';
                new window.QRCode(container, {
                    text: memberId,
                    width: 150,
                    height: 150,
                    colorDark: '#ffffff',
                    colorLight: '#0f172a',
                    correctLevel: window.QRCode.CorrectLevel.H,
                });
            }
        }, 50);

    }, [isOpen, memberId]);

    if (!isOpen || !member) return null;

    return (
        <div className="modal-backdrop" style={{ display: 'flex', zIndex: 100001, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(16px)' }}>
            <div className="modal-card glass-card" style={{ maxWidth: '400px', width: '90%', padding: '30px' }}>
                <div className="modal-header" style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#38BDF8' }}>OFFICIAL MFC YOUTH ID</h3>
                    <button className="btn-close" onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                </div>
                
                <div id="qr-id-badge-card" style={{ background: 'linear-gradient(145deg, #0f172a, #1e293b)', borderRadius: '16px', padding: '24px', textAlign: 'center', border: '1px solid rgba(56,189,248,0.3)', boxShadow: '0 8px 32px rgba(2,132,199,0.2)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '12px' }}>
                        MFC YOUTH TARLAC CHAPTER
                    </div>
                    
                    <h4 style={{ fontSize: '1.4rem', color: '#F8FAFC', fontWeight: 800, margin: '0 0 4px 0' }}>{member.name}</h4>
                    <div style={{ fontSize: '0.9rem', color: '#38BDF8', fontWeight: 600, marginBottom: '20px' }}>
                        {member.role || 'Member'} • {member.dept || 'MFC Youth'}
                    </div>
                    
                    <div id="qrcode-react-container" style={{ width: '166px', height: '166px', margin: '0 auto', background: '#0f172a', padding: '8px', borderRadius: '12px', border: '2px solid rgba(56,189,248,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* QRCode injected here */}
                    </div>
                    
                    <div style={{ marginTop: '20px', fontSize: '1.1rem', color: '#E2E8F0', fontWeight: 700, fontFamily: '"Roboto Mono", monospace', letterSpacing: '2px' }}>
                        ID: #{member.id}
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#64748B' }}>
                        Scan code at door for instant attendance check-in
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button type="button" className="btn-primary glow-button" onClick={() => window.print()} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#0284c7', color: '#FFF', fontWeight: 700, cursor: 'pointer' }}>
                        🖨️ Print ID Card
                    </button>
                    <button type="button" className="btn-secondary" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#F8FAFC', fontWeight: 700, cursor: 'pointer' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemberQRIDModal;
