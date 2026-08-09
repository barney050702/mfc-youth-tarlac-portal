import React, { useState, useEffect } from 'react';
import { state as globalState } from '../../modules/state';
import { getMemberAttendanceRate } from '../../modules/members';

const FollowUpModal = ({ isOpen, onClose }) => {
    const [absenteeSwiperList, setAbsenteeSwiperList] = useState([]);
    const [absenteeSwiperIndex, setAbsenteeSwiperIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            let list = globalState.members.filter((m) => {
                const rate = getMemberAttendanceRate(m.id);
                return rate < 75; // Focus on members needing pastoral care (< 75%)
            });

            if (list.length === 0) {
                list = globalState.members.slice(0, 5); // Fallback if all rates high
            }
            
            setAbsenteeSwiperList(list);
            setAbsenteeSwiperIndex(0);
        }
    }, [isOpen]);

    const handlePrev = () => {
        if (absenteeSwiperIndex > 0) {
            setAbsenteeSwiperIndex(absenteeSwiperIndex - 1);
        }
    };

    const handleNext = () => {
        if (absenteeSwiperIndex < absenteeSwiperList.length - 1) {
            setAbsenteeSwiperIndex(absenteeSwiperIndex + 1);
        }
    };

    if (!isOpen) return null;

    const member = absenteeSwiperList[absenteeSwiperIndex];
    if (!member) return null;

    const rate = getMemberAttendanceRate(member.id);
    const phoneClean = (member.phone || '').replace(/\D/g, '');
    const waLink = phoneClean
        ? `https://wa.me/63${phoneClean.replace(/^0/, '').replace(/^63/, '')}`
        : '#';

    return (
        <div className="modal-backdrop" id="absentee-swiper-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card ext-style-463">
                <div className="modal-header ext-style-464">
                    <div className="ext-style-35">
                        <span className="ext-style-74">📞</span>
                        <div>
                            <h3 className="modal-title ext-style-465">Mobile Absentee Follow-Up Swiper</h3>
                            <span id="swiper-counter" className="ext-style-466">
                                Card {absenteeSwiperIndex + 1} of {absenteeSwiperList.length}
                            </span>
                        </div>
                    </div>
                    <button type="button" className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                
                <div className="modal-body ext-style-467" id="absentee-swiper-content">
                    <div style={{ padding: '16px', background: 'rgba(15,23,42,0.8)', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '8px' }}>👤</div>
                        <h4 style={{ color: '#F8FAFC', fontSize: '1.35rem', fontWeight: 800, margin: '0 0 4px 0' }}>{member.name}</h4>
                        <span className="badge badge-purple" style={{ marginBottom: '14px', display: 'inline-block' }}>
                            Household: {member.household || 'None'}
                        </span>
                        <div style={{ margin: '16px 0', padding: '12px', background: 'rgba(30,41,59,0.5)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>Attendance Health Rate</div>
                            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: rate >= 75 ? '#34D399' : '#F59E0B' }}>
                                {rate}%
                            </div>
                        </div>
                        {phoneClean ? (
                            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-primary glow-button" style={{ width: '100%', justifyContent: 'center', padding: '14px', background: 'linear-gradient(135deg, #10B981, #059669)', textDecoration: 'none' }}>
                                <span>💬 WhatsApp Pastoral Check-In</span>
                            </a>
                        ) : (
                            <div style={{ color: '#64748B', fontSize: '0.82rem', padding: '10px' }}>
                                No phone number recorded
                            </div>
                        )}
                    </div>
                </div>

                <div className="modal-footer ext-style-468">
                    <button type="button" className="btn-secondary" id="swiper-prev-btn" onClick={handlePrev} disabled={absenteeSwiperIndex === 0}>
                        ← Previous
                    </button>
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        Close
                    </button>
                    <button type="button" className="btn-primary" id="swiper-next-btn" onClick={handleNext} disabled={absenteeSwiperIndex === absenteeSwiperList.length - 1}>
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FollowUpModal;
