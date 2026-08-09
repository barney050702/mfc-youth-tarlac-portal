import React from 'react';

const ReceiptViewerModal = ({ isOpen, onClose, receiptImg, receiptCaption }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-338" id="modal-receipt-viewer" style={{ display: 'flex' }}>
            <div className="modal-card glass-card ext-style-339">
                <div className="ext-style-60 modal-header">
                    <h3 className="ext-style-340">Receipt / Proof of Transaction</h3>
                    <button
                        className="btn-close"
                        aria-label="Close modal"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>
                <div className="ext-style-341">
                    <img id="viewer-receipt-img" src={receiptImg} alt="Receipt Image" className="ext-style-342" />
                </div>
                <div className="ext-style-343">
                    <span id="viewer-receipt-caption">{receiptCaption}</span>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onClose}
                    >
                        Close Window
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptViewerModal;
