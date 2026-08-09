import React, { useState } from 'react';

const AdminProfileModal = ({ isOpen, onClose }) => {
    const [currentView, setCurrentView] = useState('menu');

    if (!isOpen) return null;

    const renderMenu = () => (
        <div id="profile-modal-menu-view" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="profile-security-item" onClick={() => setCurrentView('passcode')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div className="profile-security-icon" style={{ color: '#38BDF8' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                    </svg>
                </div>
                <span className="profile-security-label" style={{ color: '#F8FAFC', fontWeight: 600 }}>Change Passcode</span>
            </div>

            <div className="profile-security-item" onClick={() => setCurrentView('recovery')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div className="profile-security-icon" style={{ color: '#34D399' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M19 8v6m-3-3h6" />
                    </svg>
                </div>
                <span className="profile-security-label" style={{ color: '#F8FAFC', fontWeight: 600 }}>Change Account Recovery Options</span>
            </div>

            <div className="profile-security-item" onClick={() => setCurrentView('rbac')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div className="profile-security-icon" style={{ color: '#A78BFA' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                        <path d="M12 12 2.88 7.12a10 10 0 0 0 16.24 4.88L12 12z" />
                    </svg>
                </div>
                <span className="profile-security-label" style={{ color: '#F8FAFC', fontWeight: 600 }}>Role-Based Access Control (RBAC)</span>
            </div>

            <div className="profile-security-item" onClick={() => setCurrentView('audit')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div className="profile-security-icon" style={{ color: '#FBBF24' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                    </svg>
                </div>
                <span className="profile-security-label" style={{ color: '#F8FAFC', fontWeight: 600 }}>System Audit & Activity Logs</span>
            </div>
        </div>
    );

    const renderHeader = (title) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <button type="button" onClick={() => setCurrentView('menu')} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>←</span> Back
            </button>
            <h4 style={{ margin: 0, color: '#F8FAFC', fontSize: '1.1rem' }}>{title}</h4>
        </div>
    );

    const renderPasscode = () => (
        <div>
            {renderHeader('Change Passcode')}
            <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94A3B8', fontSize: '0.85rem' }}>Current Passcode</label>
                <input type="password" placeholder="Enter current passcode" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94A3B8', fontSize: '0.85rem' }}>New Passcode</label>
                <input type="password" placeholder="Min. 6 characters" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94A3B8', fontSize: '0.85rem' }}>Confirm New Passcode</label>
                <input type="password" placeholder="Confirm new passcode" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setCurrentView('menu')} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="button" style={{ flex: 1, padding: '10px', background: '#0284c7', border: 'none', color: '#FFF', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Passcode</button>
            </div>
        </div>
    );

    const renderRecovery = () => (
        <div>
            {renderHeader('Recovery Options')}
            <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94A3B8', fontSize: '0.85rem' }}>Recovery Email</label>
                <input type="email" defaultValue="admin@mfcyouth.com" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF' }} />
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#94A3B8', fontSize: '0.85rem' }}>Backup Phone</label>
                <input type="tel" defaultValue="+63 917 123 4567" style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" onClick={() => setCurrentView('menu')} style={{ flex: 1, padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#FFF', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="button" style={{ flex: 1, padding: '10px', background: '#10B981', border: 'none', color: '#FFF', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Save Options</button>
            </div>
        </div>
    );

    const renderRBAC = () => (
        <div>
            {renderHeader('Role-Based Access Control')}
            <p style={{ color: '#94A3B8', fontSize: '0.85rem', marginBottom: '20px' }}>Test different officer permission levels. Switching roles restricts sensitive financial ledgers and system administration panels.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(56,189,248,0.3)' }}>
                    <div>
                        <div style={{ color: '#F8FAFC', fontWeight: 700 }}>👑 Super Admin</div>
                        <div style={{ color: '#64748B', fontSize: '0.75rem', marginTop: '4px' }}>Full system access</div>
                    </div>
                    <button style={{ background: '#0284c7', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>Active</button>
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div>
                        <div style={{ color: '#F8FAFC', fontWeight: 700 }}>📋 Attendance Officer</div>
                        <div style={{ color: '#64748B', fontSize: '0.75rem', marginTop: '4px' }}>Check-ins & QR only</div>
                    </div>
                    <button style={{ background: 'transparent', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>Switch</button>
                </div>
            </div>
        </div>
    );

    const renderAudit = () => (
        <div>
            {renderHeader('System Audit Trail')}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Recent security & check-in events</span>
                <button style={{ background: 'transparent', color: '#F43F5E', border: '1px solid rgba(244,63,94,0.3)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}>Clear Log</button>
            </div>
            
            <div style={{ background: 'rgba(15,23,42,0.8)', borderRadius: '12px', padding: '16px', height: '200px', overflowY: 'auto' }}>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem', textAlign: 'center', marginTop: '40px' }}>No audit logs currently available.</div>
            </div>
        </div>
    );

    return (
        <div className="modal-backdrop" id="user-profile-backdrop" style={{ display: 'flex', zIndex: 100003, background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(12px)' }}>
            <div className="user-security-card" style={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                {/* Header */}
                <div className="user-security-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className="user-security-badge" style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(56,189,248,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '24px', height: '24px' }}>
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="m9 12 2 2 4-4" />
                        </svg>
                    </div>
                    <div className="user-security-info" style={{ flex: 1 }}>
                        <div style={{ color: '#F8FAFC', fontWeight: 700 }}>admin@mfcyouth.com</div>
                        <div style={{ color: '#38BDF8', fontSize: '0.8rem', fontWeight: 600 }}>Super Admin</div>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '1.2rem', cursor: 'pointer', alignSelf: 'flex-start' }}>✕</button>
                </div>

                <div className="user-security-divider" style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '20px 0' }}></div>

                {currentView === 'menu' && renderMenu()}
                {currentView === 'passcode' && renderPasscode()}
                {currentView === 'recovery' && renderRecovery()}
                {currentView === 'rbac' && renderRBAC()}
                {currentView === 'audit' && renderAudit()}
            </div>
        </div>
    );
};

export default AdminProfileModal;
