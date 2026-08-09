import React, { useEffect } from 'react';
import state from '../../modules/state';
import { OFFICIAL_DOWNLOADABLE_RESOURCES } from '../../modules/legacy';

const DownloadAllModal = ({ isOpen, onClose }) => {
    // The legacy.js startBatchDownload() is used
    const handleStartBatchDownload = () => {
        if (window.startBatchDownload) {
            window.startBatchDownload();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-148" id="modal-download-all" style={{ display: 'flex' }}>
            <div className="glass-card ext-style-149">
                <button
                    className="ext-style-150"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="ext-style-151">
                    <div className="ext-style-87">📦</div>
                    <div>
                        <h3 className="ext-style-152">Download All Official Resources</h3>
                        <p className="ext-style-58">
                            Batch download official chapter manuals, guides, and rosary decks.
                        </p>
                    </div>
                </div>

                <div id="download-all-progress-bar" className="ext-style-153" style={{ display: 'none' }}>
                    <div id="download-progress-status" className="ext-style-154">
                        Starting batch download...
                    </div>
                    <div className="ext-style-155">
                        <div id="download-progress-fill" className="ext-style-156"></div>
                    </div>
                </div>

                <div id="download-all-list" className="ext-style-157">
                    {OFFICIAL_DOWNLOADABLE_RESOURCES.length > 0 ? (
                        OFFICIAL_DOWNLOADABLE_RESOURCES.map((res) => (
                            <div key={res.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(15,23,42,0.65)', border: '1px solid rgba(56,189,248,0.18)', borderRadius: '14px', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '0' }}>
                                    <span style={{ fontSize: '1.5rem', flexShrink: '0' }}>{res.emoji}</span>
                                    <div style={{ minWidth: '0' }}>
                                        <div style={{ color: '#F8FAFC', fontSize: '0.92rem', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{res.title}</div>
                                        <div style={{ color: '#94A3B8', fontSize: '0.78rem' }}>{res.category} &bull; {res.size}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: '0' }}>
                                    <a href={res.url} download className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '8px' }}>
                                        📥
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ textAlign: 'center', color: '#94A3B8', padding: '32px', fontSize: '0.9rem' }}>
                            No resources currently in the vault.
                        </div>
                    )}
                </div>

                <div className="ext-style-158">
                    <button
                        className="btn-secondary btn-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        id="btn-start-batch-download"
                        className="btn-primary btn-sm ext-style-159"
                        onClick={handleStartBatchDownload}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ext-style-160"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        <span>Start Batch Download ({OFFICIAL_DOWNLOADABLE_RESOURCES.length} Files)</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadAllModal;
