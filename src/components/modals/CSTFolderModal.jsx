import React from 'react';

const CSTFolderModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-196" id="modal-cst-folder" style={{ display: 'flex' }}>
            <div className="glass-card ext-style-197">
                <button
                    className="ext-style-198"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="ext-style-199">
                    <div className="ext-style-87">📁</div>
                    <div>
                        <h3 className="ext-style-200">Chapter Servants Training Modules</h3>
                        <p className="ext-style-58">Click any item below to open or download.</p>
                    </div>
                </div>

                <div className="ext-style-201">
                    <div className="glass-card ext-style-202">
                        <div className="ext-style-45">📘</div>
                        <h4 className="ext-style-203">Chapter Servants Manual</h4>
                        <div className="ext-style-42">
                            <a href="resources/MFC Youth Chapter Servants Training Manual 2020.pdf" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-204">📄 Open</a>
                            <a href="resources/MFC Youth Chapter Servants Training Manual 2020.pdf" download className="btn-secondary btn-sm ext-style-205">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-206">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-207">Visionary Leadership</h4>
                        <div className="ext-style-42">
                            <a href="resources/Visionary Leadership.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-208">📄 Open</a>
                            <a href="resources/Visionary Leadership.pptx" download className="btn-secondary btn-sm ext-style-209">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-210">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-211">Building a Killer Team</h4>
                        <div className="ext-style-42">
                            <a href="resources/Building, Inspiring and Forming a Killer Team.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-212">📄 Open</a>
                            <a href="resources/Building, Inspiring and Forming a Killer Team.pptx" download className="btn-secondary btn-sm ext-style-213">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-214">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-215">Evangelistic Sensitivity</h4>
                        <div className="ext-style-42">
                            <a href="resources/Evangelistic Sensitivity Workshop.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-216">📄 Open</a>
                            <a href="resources/Evangelistic Sensitivity Workshop.pptx" download className="btn-secondary btn-sm ext-style-217">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-218">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-219">Mentoring the Youth</h4>
                        <div className="ext-style-42">
                            <a href="resources/Mentoring the Youth.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-220">📄 Open</a>
                            <a href="resources/Mentoring the Youth.pptx" download className="btn-secondary btn-sm ext-style-221">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-222">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-223">Pastoral Management</h4>
                        <div className="ext-style-42">
                            <a href="resources/Pastoral Management.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-224">📄 Open</a>
                            <a href="resources/Pastoral Management.pptx" download className="btn-secondary btn-sm ext-style-225">📥 DL</a>
                        </div>
                    </div>
                </div>

                <div className="ext-style-226">
                    <button
                        className="btn-secondary btn-sm"
                        onClick={onClose}
                    >
                        Close Folder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CSTFolderModal;
