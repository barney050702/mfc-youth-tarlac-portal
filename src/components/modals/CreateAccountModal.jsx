import React, { useEffect } from 'react';

const CreateAccountModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleCreateAccount = (e) => {
            if (window.handleCreateAccount) {
                window.handleCreateAccount(e);
            }
        };
        const toggleAccountChapterGroup = () => {
            if (window.toggleAccountChapterGroup) {
                window.toggleAccountChapterGroup();
            }
        };
        const form = document.getElementById('create-account-form');
        const roleSelect = document.getElementById('acc-role');
        
        if (form) form.addEventListener('submit', handleCreateAccount);
        if (roleSelect) roleSelect.addEventListener('change', toggleAccountChapterGroup);
        
        return () => {
            if (form) form.removeEventListener('submit', handleCreateAccount);
            if (roleSelect) roleSelect.removeEventListener('change', toggleAccountChapterGroup);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-229" id="create-account-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card ext-style-230" role="dialog" aria-labelledby="create-account-title">
                <div className="modal-header ext-style-231">
                    <h3 id="create-account-title" className="ext-style-232">
                        Create Account
                    </h3>
                    <button className="modal-close-btn" aria-label="Close modal" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form id="create-account-form">
                    <div className="ext-style-85 form-group">
                        <label htmlFor="acc-email" className="ext-style-233">Email Address</label>
                        <input type="email" id="acc-email" required placeholder="admin@example.com" className="" />
                    </div>
                    <div className="ext-style-85 form-group">
                        <label htmlFor="acc-password" className="ext-style-235">Password (minimum 6 characters)</label>
                        <input type="password" id="acc-password" required minLength="6" placeholder="******" className="" />
                    </div>
                    <div className="ext-style-85 form-group">
                        <label htmlFor="acc-role" className="ext-style-237">Role</label>
                        <select id="acc-role" className="custom-select ext-style-238" defaultValue="CHAPTER HEAD">
                            <option value="SUPER ADMIN">Super Admin (Full Access)</option>
                            <option value="CHAPTER HEAD">
                                Chapter Head (Restricted Access)
                            </option>
                        </select>
                    </div>
                    <div className="form-group ext-style-239" id="acc-chapter-group">
                        <label htmlFor="acc-chapter-area" className="ext-style-240">Chapter Area</label>
                        <select id="acc-chapter-area" className="custom-select ext-style-241" defaultValue="East">
                            <option value="East">East</option>
                            <option value="North">North</option>
                            <option value="West">West</option>
                            <option value="South">South</option>
                            <option value="Central">Central</option>
                            <option value="All Chapters">All Chapters</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary glow-button ext-style-242">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateAccountModal;
