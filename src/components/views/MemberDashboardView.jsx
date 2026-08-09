import React from 'react';

const MemberDashboardView = () => {
    return (
        <div id="view-member-dashboard" className="view-panel" style={{ display: 'block' }}>
            <div className="glass-panel ext-style-131">
                <h2 className="ext-style-132">
                    Welcome, <span id="member-dash-name">Member</span>!
                </h2>
                <p className="ext-style-133">Here is your personal MFC Youth portal.</p>
            </div>

            <div className="ext-style-134">
                {/* QR Code Card */}
                <div className="glass-card ext-style-135">
                    <h3 className="ext-style-136">Your ID Badge</h3>
                    <div id="member-dash-qr" className="ext-style-137"></div>
                    <p className="ext-style-138">Present this QR code at events for quick check-in.</p>
                </div>

                {/* Mini Attendance Stats */}
                <div className="glass-card ext-style-139">
                    <h3 className="ext-style-140">Your Recent Attendance</h3>
                    <div id="member-dash-attendance-list" className="ext-style-62">
                        <div className="empty-state ext-style-141">
                            <p>Loading your records...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberDashboardView;
