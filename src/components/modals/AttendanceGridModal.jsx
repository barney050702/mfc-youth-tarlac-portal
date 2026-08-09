import React, { useState, useEffect } from 'react';
import { state as globalState } from '../../modules/state';
import { showToast } from '../../modules/ui';

const AttendanceGridModal = ({ isOpen, onClose }) => {
    const [members, setMembers] = useState([]);
    const [activities, setActivities] = useState([]);
    const [attendance, setAttendance] = useState({});

    useEffect(() => {
        if (isOpen) {
            setMembers(globalState.members || []);
            setActivities(globalState.activities || []);
            setAttendance(globalState.attendance || {});
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const sortedActs = [...activities].sort((a, b) => new Date(a.date) - new Date(b.date));

    const exportCSV = () => {
        const headers = [
            'Member Name',
            'Chapter',
            ...sortedActs.map((a) => `${a.title} (${a.date})`),
            'Attendance Rate',
        ];

        const rows = members.map((m) => {
            let presentCount = 0;
            const actCells = sortedActs.map((a) => {
                const attObj = attendance[a.id] || {};
                const st = attObj[m.id]?.status;
                if (st === 'present') {
                    presentCount++;
                    return 'Present';
                }
                if (st === 'late') {
                    presentCount++;
                    return 'Late';
                }
                return 'Absent';
            });
            const rate = sortedActs.length > 0 ? `${Math.round((presentCount / sortedActs.length) * 100)}%` : '0%';
            return [`"${m.name}"`, `"${m.chapter || 'Central'}"`, ...actCells, `"${rate}"`];
        });

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `MFC_Youth_Tarlac_Attendance_Matrix_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('📥 Attendance Matrix Sheet exported as CSV successfully!', 'success');
    };

    return (
        <div className="modal-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card" style={{ maxWidth: '900px', width: '95%' }}>
                <div className="modal-header">
                    <div>
                        <h3 className="modal-title">
                            <span style={{ marginRight: '8px' }}>📊</span>
                            Global Attendance Matrix
                        </h3>
                        <p style={{ color: '#94A3B8', fontSize: '0.85rem', margin: 0 }}>
                            Comprehensive view of all members across all activities
                        </p>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modal-body" style={{ overflowX: 'auto', maxHeight: '60vh' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                        <thead>
                            <tr style={{ background: 'rgba(15,23,42,0.9)', borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
                                <th style={{ padding: '10px 12px', textAlign: 'left', color: '#FFF', position: 'sticky', left: 0, background: '#0F172A', zIndex: 2 }}>Member Name</th>
                                <th style={{ padding: '10px 12px', textAlign: 'left', color: '#94A3B8' }}>Chapter</th>
                                {sortedActs.map((a) => {
                                    const shortDate = a.date ? a.date.slice(5) : 'Date';
                                    return (
                                        <th key={a.id} style={{ padding: '10px 8px', textAlign: 'center', color: '#38BDF8', fontSize: '0.74rem', minWidth: '70px' }} title={a.title}>
                                            {shortDate}<br />
                                            <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>{a.title.slice(0, 10)}</span>
                                        </th>
                                    );
                                })}
                                <th style={{ padding: '10px 12px', textAlign: 'center', color: '#22C55E' }}>Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m) => {
                                let presentCount = 0;
                                const cells = sortedActs.map((a) => {
                                    const attObj = attendance[a.id] || {};
                                    const st = attObj[m.id]?.status;
                                    if (st === 'present') {
                                        presentCount++;
                                        return <td key={a.id} style={{ textAlign: 'center', fontWeight: 800, color: '#22C55E', background: 'rgba(34,197,94,0.08)' }}>✓</td>;
                                    } else if (st === 'late') {
                                        presentCount++;
                                        return <td key={a.id} style={{ textAlign: 'center', fontWeight: 800, color: '#F59E0B', background: 'rgba(245,158,11,0.08)' }}>L</td>;
                                    } else {
                                        return <td key={a.id} style={{ textAlign: 'center', color: '#EF4444', opacity: 0.7 }}>✗</td>;
                                    }
                                });

                                const rate = sortedActs.length > 0 ? Math.round((presentCount / sortedActs.length) * 100) : 0;

                                return (
                                    <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <td style={{ padding: '10px 12px', fontWeight: 700, color: '#FFF', position: 'sticky', left: 0, background: '#0F172A', zIndex: 1 }}>{m.name}</td>
                                        <td style={{ padding: '10px 12px', color: '#94A3B8', fontSize: '0.75rem' }}>{m.chapter || 'Central'}</td>
                                        {cells}
                                        <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 800, color: '#38BDF8' }}>{rate}% ({presentCount}/{sortedActs.length})</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="modal-footer" style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button className="btn-secondary" onClick={onClose}>Close</button>
                    <button className="btn-primary" onClick={exportCSV}>📥 Export CSV</button>
                </div>
            </div>
        </div>
    );
};

export default AttendanceGridModal;
