import React from 'react';

const CommandPaletteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id="modal-command-palette" className="modal-backdrop ext-style-469" onClick={(e) => e.target.id === 'modal-command-palette' && onClose()}>
      <div className="glass-card ext-style-470">
        <div className="ext-style-471">
          <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.5" className="ext-style-472">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            id="cmd-palette-input"
            placeholder="Type a command, search member, or find resource..."
            autoComplete="off"
            className=""
            autoFocus
          />
          <button id="action-btn-159" className="ext-style-474" onClick={onClose}>
            ESC
          </button>
        </div>
        <div id="cmd-palette-results" className="ext-style-475">
          {/* Dynamically populated results usually go here */}
        </div>
        <div className="ext-style-476">
          <span>
            💡 Tip: Use <strong className="ext-style-477">↑↓</strong> to navigate,
            <strong className="ext-style-478">Enter</strong> to select,
            <strong className="ext-style-479">Esc</strong> to close
          </span>
          <span>MFC Youth Tarlac Command Center</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPaletteModal;
