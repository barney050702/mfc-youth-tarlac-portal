import React, { useState, useEffect } from 'react';

const UpcomingAgendaWidget = () => {
    const [upcomingActs, setUpcomingActs] = useState([]);

    useEffect(() => {
        const updateActivities = () => {
            if (window.state && window.state.activities) {
                // Get the top 4 activities from the global state
                setUpcomingActs(window.state.activities.slice(0, 4));
            }
        };

        // Initial load
        updateActivities();

        // Listen for global state changes
        window.addEventListener('stateChanged', updateActivities);
        return () => window.removeEventListener('stateChanged', updateActivities);
    }, []);

    if (upcomingActs.length === 0) {
        return (
            <div style={{ color: '#64748B', fontSize: '0.82rem', padding: '10px 0' }}>
                No upcoming activities recorded.
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {upcomingActs.map((act, index) => {
                const dateStr = act.date || 'TBA';
                const typeBadge = act.type || 'Assembly';
                const title = act.title || act.name || 'Activity';
                const location = act.location || 'MFC Center';

                return (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            background: 'rgba(30, 41, 59, 0.6)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '12px',
                            transition: 'all 0.2s',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                            <div
                                style={{
                                    width: '38px',
                                    height: '38px',
                                    borderRadius: '10px',
                                    background: 'rgba(56, 189, 248, 0.15)',
                                    border: '1px solid rgba(56, 189, 248, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.1rem',
                                    flexShrink: 0,
                                }}
                            >
                                📅
                            </div>
                            <div style={{ minWidth: 0 }}>
                                <div
                                    style={{
                                        color: '#F8FAFC',
                                        fontWeight: 700,
                                        fontSize: '0.88rem',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {title}
                                </div>
                                <div style={{ color: '#38BDF8', fontSize: '0.74rem' }}>
                                    {dateStr} &bull; <span style={{ color: '#94A3B8' }}>{location}</span>
                                </div>
                            </div>
                        </div>
                        <span className="badge badge-purple" style={{ flexShrink: 0, fontSize: '0.72rem' }}>
                            {typeBadge}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default UpcomingAgendaWidget;
