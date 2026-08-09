import React from 'react';

const KeyboardCheatsheetModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="modal-keyboard-cheatsheet" className="modal-backdrop ext-style-480" onClick={(e) => e.target.id === 'modal-keyboard-cheatsheet' && onClose()}>
      <div className="auth-login-card ext-style-481">
        <div className="ext-style-482">
          <div className="ext-style-35">
            <svg viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" className="ext-style-483">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
              <line x1="6" y1="8" x2="6.01" y2="8" />
              <line x1="10" y1="8" x2="10.01" y2="8" />
              <line x1="14" y1="8" x2="14.01" y2="8" />
              <line x1="18" y1="8" x2="18.01" y2="8" />
              <line x1="6" y1="12" x2="6.01" y2="12" />
              <line x1="10" y1="12" x2="10.01" y2="12" />
              <line x1="14" y1="12" x2="14.01" y2="12" />
            </svg>
          </div>
          <div className="ext-style-494">
            <span className="ext-style-53">
              Open Live QR Camera Scanner <span className="ext-style-82">(Click to run ⚡)</span>
            </span>
            <span className="ext-style-501">Alt + Q</span>
          </div>
          <div
            id="action-btn-163"
            title="Click to open Add Member modal"
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(56,189,248,0.15)'; e.currentTarget.style.borderColor = 'rgba(56,189,248,0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
            className="ext-style-502"
            onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent('open-react-modal', { detail: { modalName: 'AddMemberModal' } }));
            }}
          >
            <span className="ext-style-53">
              Open Add New Member Modal <span className="ext-style-82">(Click to run ⚡)</span>
            </span>
            <span className="ext-style-503">Alt + N</span>
          </div>
          <div className="ext-style-504">
            <span className="ext-style-53">Show this Keyboard Cheatsheet</span>
            <span className="ext-style-505">? or Shift + /</span>
          </div>
        </div>
        <div className="ext-style-506">
          <button id="action-btn-164" className="btn-primary glow-button ext-style-507" onClick={onClose}>
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardCheatsheetModal;
