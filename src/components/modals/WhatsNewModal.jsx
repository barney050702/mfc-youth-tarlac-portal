import React from 'react';

const WhatsNewModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop ext-style-626" id="whats-new-modal-backdrop" onClick={(e) => e.target.id === 'whats-new-modal-backdrop' && onClose()}>
      <div className="modal-card glass-card ext-style-627" role="dialog" aria-labelledby="whats-new-modal-title">
        {/* Header */}
        <div className="ext-style-628">
          <h3 id="whats-new-modal-title" className="ext-style-629">
            <svg viewBox="0 0 24 24" fill="none" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ext-style-630">
              <path d="M14 3c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z"></path>
              <circle cx="5" cy="18" r="1.5"></circle>
            </svg>
            WHAT'S NEW IN V3.4
          </h3>
          <button
            id="action-btn-205"
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.color = '#F8FAFC'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.color = '#94A3B8'; }}
            className="ext-style-631"
            title="Close"
            aria-label="Close"
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ext-style-48">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="ext-style-632">
          {/* General Updates Card */}
          <div className="ext-style-633">
            <h4 className="ext-style-634">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ext-style-48">
                <path d="M14 3c0 4.97-4.03 9-9 9 4.97 0 9 4.03 9 9 0-4.97 4.03-9 9-9-4.97 0-9-4.03-9-9z"></path>
                <circle cx="5" cy="18" r="1.5"></circle>
              </svg>
              GENERAL UPDATES
            </h4>
            <ul className="ext-style-635">
              <li className="ext-style-636">
                <span className="ext-style-637"></span>
                <strong className="ext-style-63">Stay Logged In:</strong> You no longer need to log in to your chapter every time.
              </li>
              <li className="ext-style-638">
                <span className="ext-style-639"></span>
                <strong className="ext-style-63">Desktop App:</strong> New downloadable Windows application with OFFLINE support.
              </li>
              <li className="ext-style-640">
                <span className="ext-style-641"></span>
                <strong className="ext-style-63">Brand New UI:</strong> Completely redesigned and modernized User Interface (UI) across the entire system.
              </li>
              <li className="ext-style-642">
                <span className="ext-style-643"></span>
                <strong className="ext-style-63">Ministry Integration:</strong> Complete support for JAM, VIA, MAN, ELYON, and TRIUNE.
              </li>
              <li className="ext-style-644">
                <span className="ext-style-645"></span>
                <strong className="ext-style-63">New Academies:</strong> Added JAM &amp; MAN Academy.
              </li>
              <li className="ext-style-646">
                <span className="ext-style-647"></span>
                <strong className="ext-style-63">Drag-and-Drop:</strong> New drag-and-drop functionality for songs and backgrounds (BGs).
              </li>
            </ul>
          </div>

          {/* Desktop App Card */}
          <div className="ext-style-648">
            <h4 className="ext-style-649">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ext-style-48">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              THE NEW DESKTOP APP (WINDOWS)
            </h4>
            <ul className="ext-style-650">
              <li className="ext-style-651">
                <span className="ext-style-652"></span>
                Works entirely offline!
              </li>
              <li className="ext-style-653">
                <span className="ext-style-654"></span>
                Much faster performance and smoother operation.
              </li>
              <li className="ext-style-655">
                <span className="ext-style-656"></span>
                No more manual full-screen projection setups—it handles it for you.
              </li>
              <li className="ext-style-657">
                <span className="ext-style-658"></span>
                Ability to permanently save Backgrounds and PPT Images locally.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNewModal;
