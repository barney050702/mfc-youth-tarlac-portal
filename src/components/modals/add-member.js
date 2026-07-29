export default `
<div class="modal-backdrop" id="add-member-backdrop" style="display: none">
            <div
                class="modal-card glass-card"
                role="dialog"
                aria-labelledby="add-member-title"
                style="max-width: 680px; max-height: 90vh; overflow-y: auto"
            >
                <div class="modal-header">
                    <h3 id="add-member-title">Edit Member</h3>
                    <button id="action-btn-102" class="modal-close-btn" aria-label="Close modal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <form
                    id="add-member-form"
                    onsubmit="handleAddMemberSubmit(event)"
                    style="padding-top: 10px"
                >
                    <input type="hidden" id="form-mem-id" />

                    <!-- Avatar Upload Circle -->
                    <div style="display: flex; justify-content: center; margin-bottom: 24px">
                        <div
                            id="action-btn-103"
                            class="photo-upload-circle"
                            title="Upload Member Photo"
                            style="
                                width: 86px;
                                height: 86px;
                                border-radius: 50%;
                                border: 2px dashed rgba(255, 255, 255, 0.2);
                                background: rgba(255, 255, 255, 0.04);
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;
                                transition: all 0.2s ease;
                            "
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="1.8"
                                style="width: 28px; height: 28px; color: var(--text-secondary)"
                            >
                                <path
                                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                                />
                                <circle cx="12" cy="13" r="4" />
                            </svg>
                        </div>
                    </div>

                    <div class="form-grid-2">
                        <div class="form-group">
                            <label for="mem-first-name"
                                >First Name <span style="color: var(--accent-rose)">*</span></label
                            >
                            <input
                                type="text"
                                id="mem-first-name"
                                required
                                placeholder="e.g. Ayesha B."
                                oninput="checkAddMemberDuplicate()"
                            />
                        </div>
                        <div class="form-group">
                            <label for="mem-middle-name">Middle Name</label>
                            <input type="text" id="mem-middle-name" placeholder="e.g. M." />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="mem-last-name"
                            >Last Name <span style="color: var(--accent-rose)">*</span></label
                        >
                        <input
                            type="text"
                            id="mem-last-name"
                            required
                            placeholder="e.g. Gadiana / Dela Cruz"
                            oninput="checkAddMemberDuplicate()"
                        />
                    </div>

                    <!-- Live Duplicate Name Warning (Auto-triggered on typing first/last name) -->
                    <div
                        id="add-member-duplicate-warning"
                        style="
                            display: none;
                            align-items: center;
                            gap: 10px;
                            background: rgba(245, 158, 11, 0.18);
                            border: 1px solid #f59e0b;
                            border-radius: 12px;
                            padding: 12px 16px;
                            margin-bottom: 16px;
                            color: #fbbf24;
                            font-size: 0.82rem;
                            box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);
                        "
                    >
                        <span style="font-size: 1.3rem; flex-shrink: 0">⚠️</span>
                        <div id="add-member-duplicate-text" style="line-height: 1.4"></div>
                    </div>

                    <div class="form-grid-2">
                        <div class="form-group">
                            <label for="mem-chapter">Chapter / Area</label>
                            <select id="mem-chapter" class="custom-select">
                                <option value="Central Chapter">Central Chapter</option>
                                <option value="East Chapter">East Chapter</option>
                                <option value="North Chapter">North Chapter</option>
                                <option value="South Chapter">South Chapter</option>
                                <option value="West Chapter">West Chapter</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="mem-status">Status</label>
                            <select id="mem-status" class="custom-select">
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Alumni">Alumni</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="mem-role">Role / Designation</label>
                        <input
                            type="text"
                            id="mem-role"
                            placeholder="e.g. Member / Chapter Leader"
                            value="Member"
                        />
                    </div>

                    <div class="form-group">
                        <label for="mem-email">Email Address</label>
                        <input type="email" id="mem-email" placeholder="e.g. member@example.com" />
                    </div>

                    <div class="form-grid-2">
                        <div class="form-group">
                            <label for="mem-birthday">Birthday</label>
                            <input
                                type="date"
                                id="mem-birthday"
                                onchange="calculateAgeFromBirthday()"
                            />
                        </div>
                        <div class="form-group">
                            <label for="mem-age">Age</label>
                            <input
                                type="number"
                                id="mem-age"
                                placeholder="e.g. 19"
                                min="1"
                                max="99"
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="mem-address">Home Address</label>
                        <input
                            type="text"
                            id="mem-address"
                            placeholder="e.g. San Isidro, Tarlac City"
                        />
                    </div>

                    <div class="form-grid-2">
                        <div class="form-group">
                            <label for="mem-contact">Contact Number</label>
                            <input type="text" id="mem-contact" placeholder="e.g. 09923937559" />
                        </div>
                        <div class="form-group">
                            <label for="mem-parents-contact">Parents Contact #</label>
                            <input
                                type="text"
                                id="mem-parents-contact"
                                placeholder="e.g. 09305555256"
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="mem-camp-date">Date of Youth Camp</label>
                        <input type="date" id="mem-camp-date" />
                    </div>

                    <div class="form-group">
                        <label for="mem-camp-title">Youth Camp Title</label>
                        <input type="text" id="mem-camp-title" placeholder="e.g. Encounter Camp" />
                    </div>

                    <div class="form-group">
                        <label for="mem-covenant-date">Covenanted Date</label>
                        <input type="date" id="mem-covenant-date" />
                    </div>

                    <div class="modal-footer" style="margin-top: 24px">
                        <button id="action-btn-104" type="button" class="btn-secondary">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="btn-primary glow-button"
                            id="mem-submit-btn-text"
                        >
                            Save Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
`;
