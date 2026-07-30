import React, { useState, useEffect } from 'react';
import { state } from '../modules/state.js';

export default function BirthdayWidget() {
    const [members, setMembers] = useState(state.members || []);

    useEffect(() => {
        const handleStateUpdate = () => {
            setMembers([...state.members]);
        };
        
        window.addEventListener('stateChanged', handleStateUpdate);
        return () => window.removeEventListener('stateChanged', handleStateUpdate);
    }, []);

    const currentMonthIdx = new Date().getMonth();
    const celebrants = members
        .filter((m) => {
            if (!m.birthdate && !m.birthday) return false;
            const b = new Date(m.birthdate || m.birthday);
            return !isNaN(b.getTime()) && b.getMonth() === currentMonthIdx;
        })
        .slice(0, 4);

    if (celebrants.length === 0) {
        return (
            <div style={{ color: '#64748B', fontSize: '0.82rem', padding: '10px 0' }}>
                No birthdays recorded for this month.
            </div>
        );
    }

    return (
        <>
            {celebrants.map((m) => {
                const initials = (m.name || 'M')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase();
                
                const bdate = m.birthdate || m.birthday;
                const dateStr = bdate
                    ? new Date(bdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'Milestone Celebration';

                return (
                    <div 
                        key={m.id} 
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #EC4899, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#FFF', fontSize: '0.8rem', flexShrink: 0 }}>
                                {initials}
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div style={{ color: '#F8FAFC', fontWeight: 700, fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {m.name}
                                </div>
                                <div style={{ color: '#F472B6', fontSize: '0.72rem' }}>
                                    🎂 {dateStr} &bull; {m.chapter || 'Central'}
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => {
                                if (window.openPastoralGreetingModal) {
                                    window.openPastoralGreetingModal(m.id, 'Birthday Celebration');
                                }
                                if (window.triggerConfettiBurst) {
                                    window.triggerConfettiBurst();
                                }
                            }} 
                            style={{ background: 'rgba(236, 72, 153, 0.2)', border: '1px solid rgba(236, 72, 153, 0.4)', color: '#F472B6', padding: '4px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
                        >
                            Celebrate 🎉
                        </button>
                    </div>
                );
            })}
        </>
    );
}
