import React, { useEffect } from 'react';

const AddMemberModal = () => {
    // We will mount this component, but it should initially match the display: none state 
    // unless the global UI manager opens it. To keep it simple, we just render the structure
    // and rely on the existing Vanilla JS `document.getElementById('add-member-backdrop').style.display` 
    // for visibility toggling temporarily during the transition.
    
    // We need to attach the event listeners that were previously inline or queried by ID.
    useEffect(() => {
        const closeBtn = document.getElementById('action-btn-102');
        const cancelBtn = document.getElementById('action-btn-104');
        const uploadBtn = document.getElementById('action-btn-103');
        
        const handleClose = () => {
            if (window.closeAddMemberModal) {
                window.closeAddMemberModal();
            } else {
                document.getElementById('add-member-backdrop').style.display = 'none';
            }
        };

        const handleUpload = () => {
            if (window.triggerAvatarUpload) window.triggerAvatarUpload();
        };

        if (closeBtn) closeBtn.addEventListener('click', handleClose);
        if (cancelBtn) cancelBtn.addEventListener('click', handleClose);
        if (uploadBtn) uploadBtn.addEventListener('click', handleUpload);

        return () => {
            if (closeBtn) closeBtn.removeEventListener('click', handleClose);
            if (cancelBtn) cancelBtn.removeEventListener('click', handleClose);
            if (uploadBtn) uploadBtn.removeEventListener('click', handleUpload);
        };
    }, []);

    const onSubmit = (e) => {
        if (window.handleAddMemberSubmit) {
            window.handleAddMemberSubmit(e);
        } else {
            e.preventDefault();
            console.warn('handleAddMemberSubmit is not available on the window object.');
        }
    };

    const onInputDuplicate = () => {
        if (window.checkAddMemberDuplicate) {
            window.checkAddMemberDuplicate();
        }
    };

    const onChangeAge = () => {
        if (window.calculateAgeFromBirthday) {
            window.calculateAgeFromBirthday();
        }
    };

    return (
        <div className="modal-backdrop" id="add-member-backdrop" style={{ display: 'none' }}>
            <div
                className="modal-card glass-card"
                role="dialog"
                aria-labelledby="add-member-title"
                style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
            >
                <div className="modal-header">
                    <h3 id="add-member-title">Edit Member</h3>
                    <button id="action-btn-102" className="modal-close-btn" aria-label="Close modal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form
                    id="add-member-form"
                    onSubmit={onSubmit}
                    style={{ paddingTop: '10px' }}
                >
                    <input type="hidden" id="form-mem-id" />

                    {/* Avatar Upload Circle */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                        <div
                            id="action-btn-103"
                            className="photo-upload-circle"
                            title="Upload Member Photo"
                            style={{
                                width: '86px',
                                height: '86px',
                                borderRadius: '50%',
                                border: '2px dashed rgba(255, 255, 255, 0.2)',
                                background: 'rgba(255, 255, 255, 0.04)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                style={{ width: '28px', height: '28px', color: 'var(--text-secondary)' }}
                            >
                                <path
                                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                                />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="mem-first-name">
                                First Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="mem-first-name"
                                required
                                placeholder="e.g. Ayesha B."
                                onInput={onInputDuplicate}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mem-middle-name">Middle Name</label>
                            <input type="text" id="mem-middle-name" placeholder="e.g. M." />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-last-name">
                            Last Name <span style={{ color: 'var(--accent-rose)' }}>*</span>
                        </label>
                        <input
                            type="text"
                            id="mem-last-name"
                            required
                            placeholder="e.g. Gadiana / Dela Cruz"
                            onInput={onInputDuplicate}
                        />
                    </div>

                    {/* Live Duplicate Name Warning */}
                    <div
                        id="add-member-duplicate-warning"
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            gap: '10px',
                            background: 'rgba(245, 158, 11, 0.18)',
                            border: '1px solid #f59e0b',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            color: '#fbbf24',
                            fontSize: '0.82rem',
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)',
                        }}
                    >
                        <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>⚠️</span>
                        <div id="add-member-duplicate-text" style={{ lineHeight: '1.4' }}></div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="mem-chapter">Chapter / Area</label>
                            <select id="mem-chapter" className="custom-select" defaultValue="Central Chapter">
                                <option value="Central Chapter">Central Chapter</option>
                                <option value="East Chapter">East Chapter</option>
                                <option value="North Chapter">North Chapter</option>
                                <option value="South Chapter">South Chapter</option>
                                <option value="West Chapter">West Chapter</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="mem-status">Status</label>
                            <select id="mem-status" className="custom-select" defaultValue="Active">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Alumni">Alumni</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-role">Role / Designation</label>
                        <input
                            type="text"
                            id="mem-role"
                            placeholder="e.g. Member / Chapter Leader"
                            defaultValue="Member"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-email">Email Address</label>
                        <input type="email" id="mem-email" placeholder="e.g. member@example.com" />
                    </div>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="mem-birthday">Birthday</label>
                            <input
                                type="date"
                                id="mem-birthday"
                                onChange={onChangeAge}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mem-age">Age</label>
                            <input
                                type="number"
                                id="mem-age"
                                placeholder="e.g. 19"
                                min="1"
                                max="99"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-address">Home Address</label>
                        <input
                            type="text"
                            id="mem-address"
                            placeholder="e.g. San Isidro, Tarlac City"
                        />
                    </div>

                    <div className="form-grid-2">
                        <div className="form-group">
                            <label htmlFor="mem-contact">Contact Number</label>
                            <input type="text" id="mem-contact" placeholder="e.g. 09923937559" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mem-parents-contact">Parents Contact #</label>
                            <input
                                type="text"
                                id="mem-parents-contact"
                                placeholder="e.g. 09305555256"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-camp-date">Date of Youth Camp</label>
                        <input type="date" id="mem-camp-date" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-camp-title">Youth Camp Title</label>
                        <input type="text" id="mem-camp-title" placeholder="e.g. Encounter Camp" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mem-covenant-date">Covenanted Date</label>
                        <input type="date" id="mem-covenant-date" />
                    </div>

                    <div className="modal-footer" style={{ marginTop: '24px' }}>
                        <button id="action-btn-104" type="button" className="btn-secondary">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary glow-button"
                            id="mem-submit-btn-text"
                        >
                            Save Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMemberModal;
