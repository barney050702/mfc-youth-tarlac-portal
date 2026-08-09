import React, { useEffect } from 'react';

const BulkImportModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleCSVFileUpload = (e) => {
            if (window.handleCSVFileUpload) window.handleCSVFileUpload(e);
        };
        const autoArrange = () => {
            // Need to check if there is a global function for auto arrange
            // The HTML had no inline onclick, but maybe an ID was bound
            // Let's rely on ui-modals.js or similar binding if they exist.
            // Or we just dispatch a custom event. But wait, in the legacy html:
            // id="action-btn-93" and id="action-btn-95" for Auto Arrange.
            if (window.autoArrangeCSVColumns) window.autoArrangeCSVColumns();
        };
        const importMembers = () => {
            // id="action-btn-96"
            if (window.processBulkImport) window.processBulkImport();
        };

        const fileInput = document.getElementById('import-csv-file');
        const autoArrangeBtn1 = document.getElementById('action-btn-93');
        const autoArrangeBtn2 = document.getElementById('action-btn-95');
        const importBtn = document.getElementById('action-btn-96');

        if (fileInput) fileInput.addEventListener('change', handleCSVFileUpload);
        if (autoArrangeBtn1) autoArrangeBtn1.addEventListener('click', autoArrange);
        if (autoArrangeBtn2) autoArrangeBtn2.addEventListener('click', autoArrange);
        if (importBtn) importBtn.addEventListener('click', importMembers);

        return () => {
            if (fileInput) fileInput.removeEventListener('change', handleCSVFileUpload);
            if (autoArrangeBtn1) autoArrangeBtn1.removeEventListener('click', autoArrange);
            if (autoArrangeBtn2) autoArrangeBtn2.removeEventListener('click', autoArrange);
            if (importBtn) importBtn.removeEventListener('click', importMembers);
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-247" id="import-csv-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card ext-style-248" role="dialog" aria-labelledby="import-csv-title">
                <div className="modal-header ext-style-249">
                    <h3 id="import-csv-title" className="ext-style-250">
                        Bulk Import Members (CSV)
                    </h3>
                    <button className="modal-close-btn" aria-label="Close modal" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <p className="ext-style-251">
                    Upload a CSV file or paste formatted CSV rows below. Format: <br />
                    <code className="ext-style-252">Name, Chapter Area, Ministry/Dept, Designation/Role, Phone, Email</code>
                </p>
                <div className="ext-style-253">
                    <label htmlFor="import-csv-file" className="btn-secondary ext-style-254">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="ext-style-57"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span>Choose CSV File (.csv)</span>
                        <input type="file" id="import-csv-file" accept=".csv" className="" />
                    </label>
                    <button id="action-btn-93" type="button" className="btn-secondary ext-style-256" title="Smartly auto-arrange and format pasted table rows according to detected headers">
                        <span>⚡ Auto Arrange Columns</span>
                    </button>
                </div>
                <textarea id="import-csv-text" rows="6" placeholder="Example:&#10;Juan Dela Cruz, East Chapter, Programs & Events, Youth Member, 09171234567, juan@mfcyouth.org&#10;Maria Santos, Central Chapter, EAST CHAPTER, Household Head, 09181234567, maria@mfcyouth.org" className="ext-style-257"></textarea>
                <div className="ext-style-258">
                    <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                    <button id="action-btn-95" type="button" className="btn-secondary ext-style-259">
                        ⚡ Auto Arrange
                    </button>
                    <button id="action-btn-96" type="button" className="btn-primary glow-button ext-style-260">
                        Import Members
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BulkImportModal;
