export default `
<div class="modal-backdrop" id="venue-map-modal-backdrop" style="display: none">
                <div
                    class="modal-card glass-card"
                    role="dialog"
                    aria-labelledby="venue-map-modal-title"
                    style="
                        width: 96vw;
                        max-width: 720px;
                        max-height: 92vh;
                        border-radius: 16px;
                        overflow: hidden;
                        border: 1px solid rgba(56, 189, 248, 0.4);
                        background: linear-gradient(
                            160deg,
                            rgba(15, 23, 42, 0.98),
                            rgba(30, 41, 59, 0.95)
                        );
                    "
                >
                    <!-- Header -->
                    <div
                        style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 16px 20px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                            background: rgba(15, 23, 42, 0.95);
                        "
                    >
                        <div>
                            <h3
                                id="venue-map-modal-title"
                                style="
                                    color: #f8fafc;
                                    font-size: 1.1rem;
                                    font-weight: 800;
                                    margin: 0;
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                "
                            >
                                📍 Venue Map Pin
                            </h3>
                            <p
                                id="venue-map-modal-location-label"
                                style="
                                    color: #38bdf8;
                                    font-size: 0.82rem;
                                    font-weight: 700;
                                    margin: 4px 0 0 0;
                                "
                            >
                                Tarlac City
                            </p>
                        </div>
                        <button
                            id="action-btn-203"
                            style="
                                background: rgba(239, 68, 68, 0.15);
                                border: 1px solid rgba(239, 68, 68, 0.4);
                                color: #f87171;
                                width: 34px;
                                height: 34px;
                                border-radius: 10px;
                                cursor: pointer;
                                font-size: 1.1rem;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transition: all 0.2s ease;
                            "
                            onmouseover="this.style.background = 'rgba(239, 68, 68, 0.3)'"
                            onmouseout="this.style.background = 'rgba(239, 68, 68, 0.15)'"
                            title="Close Map"
                        >
                            ✕
                        </button>
                    </div>

                    <!-- Custom Pin Search Bar -->
                    <form
                        onsubmit="handleVenueMapModalPin(event)"
                        style="
                            display: flex;
                            gap: 8px;
                            padding: 12px 20px;
                            background: rgba(15, 23, 42, 0.9);
                            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                        "
                    >
                        <input
                            type="text"
                            id="venue-map-modal-search-input"
                            placeholder="Type a custom location to pin (e.g. Fairlane San Vicente)..."
                            style="
                                flex: 1;
                                padding: 10px 14px;
                                background: rgba(30, 41, 59, 0.95);
                                border: 1px solid rgba(56, 189, 248, 0.3);
                                border-radius: 10px;
                                color: #f8fafc;
                                font-size: 0.85rem;
                                font-weight: 600;
                                outline: none;
                                transition: border-color 0.2s ease;
                            "
                            onfocus="this.style.borderColor = 'rgba(56, 189, 248, 0.7)'"
                            onblur="this.style.borderColor = 'rgba(56, 189, 248, 0.3)'"
                        />
                        <button
                            type="submit"
                            class="btn-primary"
                            style="
                                padding: 10px 16px;
                                background: linear-gradient(135deg, #0ea5e9, #38bdf8);
                                border: none;
                                color: #fff;
                                font-size: 0.82rem;
                                font-weight: 800;
                                border-radius: 10px;
                                cursor: pointer;
                                display: flex;
                                align-items: center;
                                gap: 5px;
                                white-space: nowrap;
                            "
                        >
                            📌 Pin It
                        </button>
                    </form>

                    <!-- Map iframe -->
                    <div style="position: relative">
                        <iframe
                            id="venue-map-modal-iframe"
                            src="https://maps.google.com/maps?q=Tarlac+City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            style="width: 100%; height: 380px; border: none; display: block"
                            allowfullscreen
                            loading="lazy"
                            title="Venue Location Pin Map"
                        ></iframe>
                    </div>

                    <!-- Footer Actions -->
                    <div
                        style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 14px 20px;
                            border-top: 1px solid rgba(255, 255, 255, 0.08);
                            background: rgba(15, 23, 42, 0.95);
                            flex-wrap: wrap;
                            gap: 10px;
                        "
                    >
                        <span
                            id="venue-map-modal-pinned-status"
                            style="
                                color: #34d399;
                                font-size: 0.78rem;
                                font-weight: 700;
                                display: flex;
                                align-items: center;
                                gap: 5px;
                            "
                        >
                            ✅ Pinned: Tarlac City
                        </span>
                        <div class="ext-style-72">
                            <a
                                id="venue-map-modal-directions-btn"
                                href="https://maps.google.com/?q=Tarlac+City"
                                target="_blank"
                                rel="noopener"
                                class="btn-primary"
                                style="
                                    padding: 8px 16px;
                                    background: linear-gradient(135deg, #059669, #10b981);
                                    color: #fff;
                                    border: none;
                                    text-decoration: none;
                                    font-size: 0.82rem;
                                    font-weight: 800;
                                    border-radius: 10px;
                                    display: inline-flex;
                                    align-items: center;
                                    gap: 6px;
                                "
                            >
                                🗺️ Get Directions ↗
                            </a>
                            <button
                                id="action-btn-204"
                                class="btn-secondary"
                                style="padding: 8px 16px; font-size: 0.82rem; border-radius: 10px"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
`;
