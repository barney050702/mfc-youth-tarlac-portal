import React, { useEffect } from 'react';

const ScannerModal = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (!isOpen) return;

        const handleStartCamera = () => {
            if (window.startLiveQRScanner) {
                window.startLiveQRScanner();
            }
        };

        const handleSimulateCheckIn = () => {
            if (window.simulateQRCheckIn) {
                window.simulateQRCheckIn();
            }
        };

        const handleClose = () => {
            if (window.stopLiveQRScanner) {
                window.stopLiveQRScanner();
            }
            onClose();
        };

        const startBtn = document.getElementById('action-btn-126');
        const simulateBtn = document.getElementById('action-btn-127');
        const closeBtn = document.getElementById('action-btn-128');
        const modalCloseBtn = document.getElementById('action-btn-125');

        if (startBtn) startBtn.addEventListener('click', handleStartCamera);
        if (simulateBtn) simulateBtn.addEventListener('click', handleSimulateCheckIn);
        if (closeBtn) closeBtn.addEventListener('click', handleClose);
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', handleClose);

        return () => {
            if (startBtn) startBtn.removeEventListener('click', handleStartCamera);
            if (simulateBtn) simulateBtn.removeEventListener('click', handleSimulateCheckIn);
            if (closeBtn) closeBtn.removeEventListener('click', handleClose);
            if (modalCloseBtn) modalCloseBtn.removeEventListener('click', handleClose);
            if (window.stopLiveQRScanner) window.stopLiveQRScanner();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-325" id="qr-scanner-backdrop" style={{ display: 'flex' }}>
            <div className="modal-card glass-card ext-style-326" role="dialog" aria-labelledby="qr-modal-title">
                <div className="modal-header">
                    <h3 id="qr-modal-title" className="ext-style-327">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#38BDF8"
                            strokeWidth="2"
                            className="ext-style-77"
                        >
                            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                            <rect width="8" height="8" x="8" y="8" rx="1" />
                        </svg>
                        Live QR / ID Scanner
                    </h3>
                    <button id="action-btn-125" className="modal-close-btn" aria-label="Close scanner">
                        &times;
                    </button>
                </div>
                <p className="ext-style-328">
                    Position the member's digital QR ID or barcode within the scanning frame.
                </p>
                <div className="qr-video-frame ext-style-329" id="qr-reader">
                    <div id="qr-camera-placeholder" className="ext-style-330">
                        <div className="qr-laser-line ext-style-331"></div>
                        <span className="ext-style-332">[ Camera Stream Standby / Ready ]</span>
                        <button id="action-btn-126" type="button" className="btn-primary btn-sm glow-button ext-style-333">
                            📷 Start Live Camera Scan
                        </button>
                    </div>
                </div>
                <div className="ext-style-334">
                    <div className="ext-style-335">
                        ⚡ INSTANT SCAN SIMULATOR (MANUAL CHECK-IN)
                    </div>
                    <div className="ext-style-72">
                        <select id="qr-sim-member" className="custom-select ext-style-336" title="Simulate Check-in for Member" aria-label="Simulate Check-in for Member">
                            {/* Populated with members via script.js */}
                        </select>
                        <button
                            id="action-btn-127"
                            type="button"
                            className="ext-style-66 btn-primary"
                        >
                            Scan & Check-In
                        </button>
                    </div>
                </div>
                <button id="action-btn-128" type="button" className="btn-secondary ext-style-337">
                    Close Scanner
                </button>
            </div>
        </div>
    );
};

export default ScannerModal;
