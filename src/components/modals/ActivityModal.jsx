import React, { useState, useEffect } from 'react';
import { state as globalState } from '../../modules/state'; // Assuming state is exported this way

const ActivityModal = ({ isOpen, onClose, activityId }) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        date: new Date().toISOString().slice(0, 16),
        category: 'Chapter Assembly',
        location: '',
        status: 'Upcoming',
        semester: 'auto',
        description: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (activityId) {
                const act = globalState.activities.find((a) => a.id === activityId);
                if (act) {
                    setFormData({
                        id: act.id,
                        title: act.name || act.title || '',
                        date: act.date || '',
                        category: act.type || act.category || 'Assembly',
                        location: act.venue || act.location || '',
                        status: act.status || 'Upcoming',
                        semester: act.semester || 'auto',
                        description: act.description || ''
                    });
                }
            } else {
                setFormData({
                    id: '',
                    title: '',
                    date: new Date().toISOString().slice(0, 16),
                    category: 'Chapter Assembly',
                    location: '',
                    status: 'Upcoming',
                    semester: 'auto',
                    description: ''
                });
            }
        }
    }, [isOpen, activityId]);

    const handlePinMap = () => {
        if (window.openVenueMapModalFromInput) {
            window.openVenueMapModalFromInput('form-location'); // Legacy hook
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Temporarily put values back into DOM to support legacy handleFormSubmit
        // In a full React conversion, we'd dispatch an action or API call here directly.
        const mockFormEvent = {
            preventDefault: () => {},
            target: {
                querySelector: (q) => {
                    if(q === '#form-activity-id') return { value: formData.id };
                    if(q === '#form-title') return { value: formData.title };
                    if(q === '#form-date') return { value: formData.date };
                    if(q === '#form-category') return { value: formData.category };
                    if(q === '#form-location') return { value: formData.location };
                    if(q === '#form-status') return { value: formData.status };
                    if(q === '#form-semester') return { value: formData.semester };
                    if(q === '#form-description') return { value: formData.description };
                    return null;
                }
            }
        };

        // We can just rely on legacy handleFormSubmit if it accesses the DOM directly.
        // Wait, legacy `handleFormSubmit` uses `document.getElementById`.
        // So we still need to render the inputs with those IDs for legacy to work!
        if (window.handleFormSubmit) {
            window.handleFormSubmit(e);
        }
        onClose();
    };

    const handleLocationInput = (e) => {
        setFormData({ ...formData, location: e.target.value });
        if (window.updateFormMapPreview) {
            window.updateFormMapPreview(e.target.value);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" id="modal-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card" role="dialog" aria-labelledby="modal-title">
                <div className="modal-header">
                    <h3 id="modal-title">{activityId ? 'Edit Activity Record' : 'Create New Activity'}</h3>
                    <button className="modal-close-btn" aria-label="Close modal" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form id="activity-form" onSubmit={handleSubmit}>
                    <input type="hidden" id="form-activity-id" value={formData.id} />
                    <div className="form-group">
                        <label htmlFor="form-title">Activity Title *</label>
                        <input
                            type="text"
                            id="form-title"
                            required
                            placeholder="e.g. Q3 Leadership Seminar"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="form-date">Date & Time *</label>
                            <input 
                                type="datetime-local" 
                                id="form-date" 
                                required 
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-category">Category *</label>
                            <select 
                                id="form-category" 
                                required 
                                className="custom-select"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Chapter Assembly">Chapter Assembly</option>
                                <option value="Chapter Household">Chapter Household</option>
                                <option value="Area Assembly">Area Assembly</option>
                                <option value="General Assembly">General Assembly</option>
                                <option value="Upper Core Household">Upper Core Household</option>
                                <option value="MFC Conference">MFC Conference</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '4px',
                                }}
                            >
                                <label htmlFor="form-location" style={{ margin: 0 }}>
                                    Location / Platform *
                                </label>
                                <button
                                    type="button"
                                    className="btn-secondary btn-sm"
                                    onClick={handlePinMap}
                                    style={{
                                        padding: '2px 8px',
                                        fontSize: '0.72rem',
                                        color: '#38bdf8',
                                        borderColor: 'rgba(56, 189, 248, 0.4)',
                                        borderRadius: '6px',
                                        fontWeight: 700,
                                        cursor: 'pointer',
                                    }}
                                >
                                    📌 Pin Map
                                </button>
                            </div>
                            <input
                                type="text"
                                id="form-location"
                                required
                                placeholder="e.g. Tarlac Diocesan Pastoral Center / Fairlane San Vicente"
                                value={formData.location}
                                onInput={handleLocationInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-status">Status *</label>
                            <select 
                                id="form-status" 
                                required 
                                className="custom-select"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="Completed">Completed</option>
                                <option value="Upcoming">Upcoming</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    {/* LIVE INTERACTIVE VENUE MAP PICKER & PIN PREVIEW */}
                    <div
                        id="modal-location-map-preview-container"
                        style={{
                            marginTop: '8px',
                            marginBottom: '14px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid rgba(56, 189, 248, 0.35)',
                            background: 'rgba(15, 23, 42, 0.95)',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                            display: formData.location ? 'block' : 'none'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 12px',
                                background: 'rgba(15, 23, 42, 0.98)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                                flexWrap: 'wrap',
                                gap: '6px',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '0.78rem',
                                    fontWeight: 800,
                                    color: '#38bdf8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                }}
                            >
                                🗺️ Interactive Live Venue Map Pin
                            </span>
                        </div>
                        <iframe
                            id="modal-location-map-iframe"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(formData.location || 'Tarlac City')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                            style={{ width: '100%', height: '210px', border: 'none', display: 'block' }}
                            allowFullScreen
                            loading="lazy"
                            title="Venue Location Map Pin"
                        ></iframe>
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="form-semester">Attached Semester Term</label>
                            <select 
                                id="form-semester" 
                                className="custom-select"
                                value={formData.semester}
                                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            >
                                <option value="auto">Auto-detect from Date</option>
                                <option value="s1">1st Sem (Jan - Jun)</option>
                                <option value="s2">2nd Sem (Jul - Dec)</option>
                            </select>
                        </div>
                        <div className="form-group"></div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-description">Description & Notes</label>
                        <textarea
                            id="form-description"
                            rows="3"
                            placeholder="Provide event agenda or key details..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary glow-button">
                            Save Activity
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActivityModal;
