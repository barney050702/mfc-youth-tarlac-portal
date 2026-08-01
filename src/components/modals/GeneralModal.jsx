import React, { useEffect } from 'react';

const GeneralModal = () => {
    useEffect(() => {
        const closeBtn1 = document.getElementById('action-btn-83');
        const closeBtn2 = document.getElementById('action-btn-85');
        const pinMapBtn = document.getElementById('action-btn-84');
        const activityForm = document.getElementById('activity-form');

        const handleClose = () => {
            if (window.closeModal) {
                window.closeModal();
            } else {
                document.getElementById('modal-backdrop').style.display = 'none';
            }
        };

        const handlePinMap = () => {
            if (window.openVenueMapModalFromInput) {
                window.openVenueMapModalFromInput('form-location');
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (window.handleFormSubmit) {
                window.handleFormSubmit(e);
            }
        };

        if (closeBtn1) closeBtn1.addEventListener('click', handleClose);
        if (closeBtn2) closeBtn2.addEventListener('click', handleClose);
        if (pinMapBtn) pinMapBtn.addEventListener('click', handlePinMap);
        if (activityForm) {
            activityForm.removeAttribute('onsubmit');
            activityForm.addEventListener('submit', handleSubmit);
        }

        return () => {
            if (closeBtn1) closeBtn1.removeEventListener('click', handleClose);
            if (closeBtn2) closeBtn2.removeEventListener('click', handleClose);
            if (pinMapBtn) pinMapBtn.removeEventListener('click', handlePinMap);
            if (activityForm) activityForm.removeEventListener('submit', handleSubmit);
        };
    }, []);

    const handleLocationInput = (e) => {
        if (window.updateFormMapPreview) {
            window.updateFormMapPreview(e.target.value);
        }
    };

    return (
        <div className="modal-backdrop" id="modal-backdrop" style={{ display: 'none' }}>
            <div className="modal-card glass-card" role="dialog" aria-labelledby="modal-title">
                <div className="modal-header">
                    <h3 id="modal-title">Create New Activity</h3>
                    <button id="action-btn-83" className="modal-close-btn" aria-label="Close modal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form id="activity-form">
                    <input type="hidden" id="form-activity-id" />
                    <div className="form-group">
                        <label htmlFor="form-title">Activity Title *</label>
                        <input
                            type="text"
                            id="form-title"
                            required
                            placeholder="e.g. Q3 Leadership Seminar"
                        />
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="form-date">Date & Time *</label>
                            <input type="datetime-local" id="form-date" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-category">Category *</label>
                            <select id="form-category" required className="custom-select">
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
                                    id="action-btn-84"
                                    type="button"
                                    className="btn-secondary btn-sm"
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
                                onInput={handleLocationInput}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-status">Status *</label>
                            <select id="form-status" required className="custom-select">
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span
                                    id="modal-map-pinned-label"
                                    style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}
                                >
                                    📍 Pinned Location
                                </span>
                                <a
                                    id="modal-open-google-maps-btn"
                                    href="https://maps.google.com/?q=Tarlac+City"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary btn-sm"
                                    style={{
                                        fontSize: '0.72rem',
                                        padding: '3px 8px',
                                        background: 'linear-gradient(135deg, #059669, #10b981)',
                                        color: '#fff',
                                        border: 'none',
                                        textDecoration: 'none',
                                        fontWeight: 700,
                                        borderRadius: '6px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                    }}
                                >
                                    🗺️ Directions ↗
                                </a>
                            </div>
                        </div>
                        <iframe
                            id="modal-location-map-iframe"
                            src="https://maps.google.com/maps?q=Tarlac+City&t=&z=14&ie=UTF8&iwloc=&output=embed"
                            style={{ width: '100%', height: '210px', border: 'none', display: 'block' }}
                            allowFullScreen
                            loading="lazy"
                            title="Venue Location Map Pin"
                        ></iframe>
                    </div>
                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="form-semester">Attached Semester Term</label>
                            <select id="form-semester" className="custom-select">
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
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button id="action-btn-85" type="button" className="btn-secondary">
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

export default GeneralModal;
