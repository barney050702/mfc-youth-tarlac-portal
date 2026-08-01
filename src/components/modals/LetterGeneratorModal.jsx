import React, { useEffect } from 'react';

const LetterGeneratorModal = () => {
    useEffect(() => {
        const closeBtn1 = document.getElementById('action-btn-178');
        const closeBtn2 = document.getElementById('action-btn-179');
        const downloadBtn = document.getElementById('action-btn-180');
        const printBtn = document.getElementById('action-btn-181');

        const handleClose = () => {
            if (window.closeLetterGeneratorModal) {
                window.closeLetterGeneratorModal();
            } else {
                document.getElementById('letter-generator-backdrop').style.display = 'none';
            }
        };

        const handleDownload = () => {
            if (window.downloadLetterPDF) {
                window.downloadLetterPDF();
            }
        };

        const handlePrint = () => {
            if (window.printLetter) {
                window.printLetter();
            }
        };

        if (closeBtn1) closeBtn1.addEventListener('click', handleClose);
        if (closeBtn2) closeBtn2.addEventListener('click', handleClose);
        if (downloadBtn) downloadBtn.addEventListener('click', handleDownload);
        if (printBtn) printBtn.addEventListener('click', handlePrint);

        return () => {
            if (closeBtn1) closeBtn1.removeEventListener('click', handleClose);
            if (closeBtn2) closeBtn2.removeEventListener('click', handleClose);
            if (downloadBtn) downloadBtn.removeEventListener('click', handleDownload);
            if (printBtn) printBtn.removeEventListener('click', handlePrint);
        };
    }, []);

    const handleChange = () => {
        if (window.updateLetterPreview) {
            window.updateLetterPreview();
        }
    };

    return (
        <div className="modal-backdrop" id="letter-generator-backdrop" style={{ display: 'none' }}>
            <div
                className="modal-card glass-card"
                role="dialog"
                aria-labelledby="letter-gen-title"
                style={{
                    maxWidth: '860px',
                    width: '95%',
                    maxHeight: '90vh',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    className="modal-header"
                    style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingBottom: '16px',
                        marginBottom: '16px',
                    }}
                >
                    <h3
                        id="letter-gen-title"
                        style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            fontWeight: 800,
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <span>💌 Fillable Chapter Letter Generator</span>
                    </h3>
                    <button
                        id="action-btn-178"
                        className="modal-close-btn"
                        aria-label="Close modal"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '320px 1fr',
                        gap: '20px',
                        flex: 1,
                        overflow: 'hidden',
                    }}
                    className="letter-gen-grid"
                >
                    {/* FORM INPUTS */}
                    <div style={{ overflowY: 'auto', paddingRight: '6px' }}>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-template-type"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Select Letter Template
                            </label>
                            <select
                                id="let-template-type"
                                className="custom-select"
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid #38bdf8',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            >
                                <option value="parental">💌 Parental Consent & Waiver</option>
                                <option value="excuse">
                                    📜 Pastoral Invitation & School Excuse
                                </option>
                                <option value="sponsorship">
                                    🤝 Sponsorship & Solicitation Appeal
                                </option>
                                <option value="lgu">🏛️ LGU / Barangay Hall Event Permit</option>
                                <option value="transport">
                                    🚌 Official Vehicle / Transport Request
                                </option>
                            </select>
                        </div>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-member-name"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Member / Student Name
                            </label>
                            <input
                                type="text"
                                id="let-member-name"
                                placeholder="e.g. Juan Dela Cruz"
                                onInput={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            />
                        </div>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-parent-name"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Parent / Guardian / Addressee Name
                            </label>
                            <input
                                type="text"
                                id="let-parent-name"
                                placeholder="e.g. Mr. & Mrs. Dela Cruz / The Dean"
                                onInput={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            />
                        </div>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-event-title"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Event / Activity Title
                            </label>
                            <input
                                type="text"
                                id="let-event-title"
                                placeholder="e.g. 2026 Provincial Youth Camp"
                                onInput={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            />
                        </div>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-event-date"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Event Date & Time
                            </label>
                            <input
                                type="text"
                                id="let-event-date"
                                placeholder="e.g. August 14-16, 2026"
                                onInput={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            />
                        </div>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-venue"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Venue / Location
                            </label>
                            <input
                                type="text"
                                id="let-venue"
                                placeholder="e.g. Tarlac Diocesan Pastoral Center"
                                onInput={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            />
                        </div>
                        <div className="ext-style-56 form-group">
                            <label
                                htmlFor="let-servant-name"
                                style={{
                                    color: '#94a3b8',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    display: 'block',
                                    marginBottom: '4px',
                                }}
                            >
                                Chapter Coordinator / Servant Name
                            </label>
                            <input
                                type="text"
                                id="let-servant-name"
                                placeholder="e.g. Bro. Barney & Sis. Anna"
                                onInput={handleChange}
                                style={{
                                    width: '100%',
                                    background: '#0f172a',
                                    color: '#fff',
                                    border: '1px solid rgba(255, 255, 255, 0.15)',
                                    borderRadius: '8px',
                                    padding: '8px 12px',
                                    fontSize: '0.85rem',
                                }}
                            />
                        </div>
                    </div>

                    {/* LIVE PRINTABLE PREVIEW */}
                    <div
                        style={{
                            background: '#ffffff',
                            color: '#0f172a',
                            borderRadius: '12px',
                            padding: '24px',
                            overflowY: 'auto',
                            border: '1px solid #cbd5e1',
                            fontFamily: "'Times New Roman', Times, serif",
                            lineHeight: 1.6,
                        }}
                        id="printable-letter-container"
                    >
                        <div id="letter-live-content">
                            {/* Populated dynamically via script.js */}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '10px',
                        marginTop: '16px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        paddingTop: '14px',
                    }}
                >
                    <button id="action-btn-179" type="button" className="btn-secondary">
                        Close
                    </button>
                    <button
                        id="action-btn-180"
                        type="button"
                        className="btn-primary glow-button"
                        style={{
                            background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: 800,
                        }}
                    >
                        <span>📥 Download PDF Letter</span>
                    </button>
                    <button
                        id="action-btn-181"
                        type="button"
                        className="ext-style-69 btn-secondary"
                    >
                        <span>🖨️ Print</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LetterGeneratorModal;
