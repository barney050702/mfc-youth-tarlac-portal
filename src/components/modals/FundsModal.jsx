import React from 'react';

const FundsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // The saveFundRecord, updateFundCategories, handleReceiptImageSelect are defined in funds.js or legacy.js
    // We bind them to window object to be globally accessible
    const handleSave = (e) => {
        e.preventDefault();
        if (window.saveFundRecord) {
            window.saveFundRecord(e);
        }
    };

    const handleUpdateCategories = () => {
        if (window.updateFundCategories) {
            window.updateFundCategories();
        }
    };

    const handleReceiptSelect = (e) => {
        if (window.handleReceiptImageSelect) {
            window.handleReceiptImageSelect(e);
        }
    };

    return (
        <div className="modal-backdrop ext-style-281" id="modal-funds-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card" role="dialog" aria-labelledby="modal-funds-title">
                <div className="modal-header">
                    <h3 id="modal-funds-title">Add Fund Record</h3>
                    <button
                        className="btn-close"
                        aria-label="Close modal"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <form id="funds-form" onSubmit={handleSave}>
                    <input type="hidden" id="fund-id" />

                    <div className="form-group">
                        <label htmlFor="fund-type">
                            Transaction Type <span className="required">*</span>
                        </label>
                        <select id="fund-type" required onChange={handleUpdateCategories}>
                            <option value="Income">Income (+)</option>
                            <option value="Expense">Expense (-)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fund-category">
                            Category <span className="required">*</span>
                        </label>
                        <select id="fund-category" required>
                            <option value="Tithe & Offering">Tithe & Offering</option>
                            <option value="Donation / Sponsorship">Donation / Sponsorship</option>
                            <option value="Fundraising Event">Fundraising Event</option>
                            <option value="Registration Fees">Registration Fees</option>
                            <option value="Other Income">Other Income</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fund-amount">
                            Amount (₱) <span className="required">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="fund-amount"
                            required
                            placeholder="0.00"
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fund-date">
                            Date <span className="required">*</span>
                        </label>
                        <input type="date" id="fund-date" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fund-description">
                            Description / Particulars <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="fund-description"
                            required
                            placeholder="e.g. Youth Camp Food Supplies, Saturday Offering"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fund-receipt">Receipt / Reference No. (Optional)</label>
                        <input
                            type="text"
                            id="fund-receipt"
                            placeholder="e.g. OR #12345 or GCash Ref #"
                        />
                    </div>

                    <div className="ext-style-86 form-group">
                        <label htmlFor="fund-receipt-file">Attach Receipt Image (Optional)</label>
                        <input type="hidden" id="fund-receipt-image-data" />
                        <div className="receipt-upload-box ext-style-282" id="receipt-upload-box">
                            <input
                                type="file"
                                id="fund-receipt-file"
                                accept="image/*"
                                onChange={handleReceiptSelect}
                                className="ext-style-283"
                            />
                            <div id="receipt-upload-prompt">
                                <div className="ext-style-284">📎</div>
                                <div className="ext-style-285">Click to attach receipt photo</div>
                                <div className="ext-style-286">Supports JPG, PNG, WEBP</div>
                            </div>
                            <div id="receipt-upload-preview" className="ext-style-287" style={{ display: 'none' }}>
                                <div className="ext-style-50">
                                    <img id="receipt-preview-img" src="" alt="Receipt Preview" className="ext-style-288" />
                                    <div>
                                        <div id="receipt-preview-name" className="ext-style-289">
                                            Receipt Attached
                                        </div>
                                        <div className="ext-style-290">Click to replace image</div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="ext-style-291"
                                    onClick={() => {
                                        if (window.removeReceiptImage) window.removeReceiptImage();
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer ext-style-292">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary glow-button">
                            Save Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FundsModal;
