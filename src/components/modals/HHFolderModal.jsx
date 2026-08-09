import React from 'react';

const HHFolderModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop ext-style-161" id="modal-hh-folder" style={{ display: 'flex' }}>
            <div className="glass-card ext-style-162">
                <button
                    className="ext-style-163"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="ext-style-164">
                    <div className="ext-style-87">📁</div>
                    <div>
                        <h3 className="ext-style-165">Household Servants Training Modules</h3>
                        <p className="ext-style-58">Click any item below to open or download.</p>
                    </div>
                </div>

                <div className="ext-style-166">
                    <div className="glass-card ext-style-167">
                        <div className="ext-style-45">📘</div>
                        <h4 className="ext-style-168">HH Servants Jumpstart Manual 2020</h4>
                        <div className="ext-style-42">
                            <a href="resources/HH Servants Jumpstart Manual 2020.pdf" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-169">📄 Open</a>
                            <a href="resources/HH Servants Jumpstart Manual 2020.pdf" download className="btn-secondary btn-sm ext-style-170">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-171">
                        <div className="ext-style-45">📘</div>
                        <h4 className="ext-style-172">Household Servants Training</h4>
                        <div className="ext-style-42">
                            <a href="resources/MFC Youth Household Servants Training.pdf" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-173">📄 Open</a>
                            <a href="resources/MFC Youth Household Servants Training.pdf" download className="btn-secondary btn-sm ext-style-174">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-175">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-176">Session 1 - Household Basics</h4>
                        <div className="ext-style-42">
                            <a href="resources/Session 1 - Household Basics.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-177">📄 Open</a>
                            <a href="resources/Session 1 - Household Basics.pptx" download className="btn-secondary btn-sm ext-style-178">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-179">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-180">Session 2 - Heart of a Servant</h4>
                        <div className="ext-style-42">
                            <a href="resources/Session 2 - Heart of a Household Servant.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-181">📄 Open</a>
                            <a href="resources/Session 2 - Heart of a Household Servant.pptx" download className="btn-secondary btn-sm ext-style-182">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-183">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-184">Workshop 1 - Discerning a Topic</h4>
                        <div className="ext-style-42">
                            <a href="resources/Workshop 1 - Discerning a Household Topic.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-185">📄 Open</a>
                            <a href="resources/Workshop 1 - Discerning a Household Topic.pptx" download className="btn-secondary btn-sm ext-style-186">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-187">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-188">Workshop 2 - Leading a Household</h4>
                        <div className="ext-style-42">
                            <a href="resources/Workshop 2 - Leading a Household.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-189">📄 Open</a>
                            <a href="resources/Workshop 2 - Leading a Household.pptx" download className="btn-secondary btn-sm ext-style-190">📥 DL</a>
                        </div>
                    </div>
                    <div className="glass-card ext-style-191">
                        <div className="ext-style-45">📊</div>
                        <h4 className="ext-style-192">Workshop 3 - Worship Workshop</h4>
                        <div className="ext-style-42">
                            <a href="resources/Workshop 3 - Worship Workshop.pptx" target="_blank" rel="noreferrer" className="btn-primary btn-sm ext-style-193">📄 Open</a>
                            <a href="resources/Workshop 3 - Worship Workshop.pptx" download className="btn-secondary btn-sm ext-style-194">📥 DL</a>
                        </div>
                    </div>
                </div>

                <div className="ext-style-195">
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

export default HHFolderModal;
