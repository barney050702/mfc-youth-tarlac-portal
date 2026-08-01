import React, { useEffect } from 'react';

const VenueMapModal = () => {
    useEffect(() => {
        const closeBtn1 = document.getElementById('action-btn-203');
        const closeBtn2 = document.getElementById('action-btn-204');
        const searchForm = document.querySelector('form[onsubmit="handleVenueMapModalPin(event)"]');

        const handleClose = () => {
            if (window.closeVenueMapModal) {
                window.closeVenueMapModal();
            } else {
                document.getElementById('venue-map-modal-backdrop').style.display = 'none';
            }
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            if (window.handleVenueMapModalPin) {
                window.handleVenueMapModalPin(e);
            }
        };

        if (closeBtn1) closeBtn1.addEventListener('click', handleClose);
        if (closeBtn2) closeBtn2.addEventListener('click', handleClose);
        if (searchForm) {
            // Remove the inline onsubmit to prevent conflicts if it exists in HTML still
            searchForm.removeAttribute('onsubmit');
            searchForm.addEventListener('submit', handleSubmit);
        }

        return () => {
            if (closeBtn1) closeBtn1.removeEventListener('click', handleClose);
            if (closeBtn2) closeBtn2.removeEventListener('click', handleClose);
            if (searchForm) searchForm.removeEventListener('submit', handleSubmit);
        };
    }, []);

    const handleFocus = (e) => {
        e.target.style.borderColor = 'rgba(56, 189, 248, 0.7)';
    };

    const handleBlur = (e) => {
        e.target.style.borderColor = 'rgba(56, 189, 248, 0.3)';
    };

    const handleMouseOver = (e) => {
        e.target.style.background = 'rgba(239, 68, 68, 0.3)';
    };

    const handleMouseOut = (e) => {
        e.target.style.background = 'rgba(239, 68, 68, 0.15)';
    };

    return (
        <div className="modal-backdrop" id="venue-map-modal-backdrop" style={{ display: 'none' }}>
            <div
                className="modal-card glass-card"
                role="dialog"
                aria-labelledby="venue-map-modal-title"
                style={{
                    width: '96vw',
                    maxWidth: '720px',
                    maxHeight: '92vh',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    background: 'linear-gradient(160deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.95))',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 20px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(15, 23, 42, 0.95)',
                    }}
                >
                    <div>
                        <h3
                            id="venue-map-modal-title"
                            style={{
                                color: '#f8fafc',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                margin: 0,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            📍 Venue Map Pin
                        </h3>
                        <p
                            id="venue-map-modal-location-label"
                            style={{
                                color: '#38bdf8',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                margin: '4px 0 0 0',
                            }}
                        >
                            Tarlac City
                        </p>
                    </div>
                    <button
                        id="action-btn-203"
                        style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#f87171',
                            width: '34px',
                            height: '34px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                        title="Close Map"
                    >
                        ✕
                    </button>
                </div>

                {/* Custom Pin Search Bar */}
                <form
                    style={{
                        display: 'flex',
                        gap: '8px',
                        padding: '12px 20px',
                        background: 'rgba(15, 23, 42, 0.9)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                >
                    <input
                        type="text"
                        id="venue-map-modal-search-input"
                        placeholder="Type a custom location to pin (e.g. Fairlane San Vicente)..."
                        style={{
                            flex: 1,
                            padding: '10px 14px',
                            background: 'rgba(30, 41, 59, 0.95)',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            borderRadius: '10px',
                            color: '#f8fafc',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button
                        type="submit"
                        className="btn-primary"
                        style={{
                            padding: '10px 16px',
                            background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
                            border: 'none',
                            color: '#fff',
                            fontSize: '0.82rem',
                            fontWeight: 800,
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        📌 Pin It
                    </button>
                </form>

                {/* Map iframe */}
                <div style={{ position: 'relative' }}>
                    <iframe
                        id="venue-map-modal-iframe"
                        src="https://maps.google.com/maps?q=Tarlac+City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        style={{ width: '100%', height: '380px', border: 'none', display: 'block' }}
                        allowFullScreen
                        loading="lazy"
                        title="Venue Location Pin Map"
                    ></iframe>
                </div>

                {/* Footer Actions */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        background: 'rgba(15, 23, 42, 0.95)',
                        flexWrap: 'wrap',
                        gap: '10px',
                    }}
                >
                    <span
                        id="venue-map-modal-pinned-status"
                        style={{
                            color: '#34d399',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                        }}
                    >
                        ✅ Pinned: Tarlac City
                    </span>
                    <div className="ext-style-72">
                        <a
                            id="venue-map-modal-directions-btn"
                            href="https://maps.google.com/?q=Tarlac+City"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{
                                padding: '8px 16px',
                                background: 'linear-gradient(135deg, #059669, #10b981)',
                                color: '#fff',
                                border: 'none',
                                textDecoration: 'none',
                                fontSize: '0.82rem',
                                fontWeight: 800,
                                borderRadius: '10px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            🗺️ Get Directions ↗
                        </a>
                        <button
                            id="action-btn-204"
                            className="btn-secondary"
                            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '10px' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VenueMapModal;
