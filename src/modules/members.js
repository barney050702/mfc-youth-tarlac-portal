/**
 * MFC YOUTH TARLAC | MEMBER DIRECTORY & DIGITAL QR BADGES
 * Roster Management, Filtering, Duplicate Detection & QR Generation
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { escapeHTML, showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';



export function openDigitalQRModal(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;

    const modal = document.getElementById('modal-member-qr-id');
    const container = document.getElementById('qrcode-container');
    const nameEl = document.getElementById('qr-badge-name');
    const roleEl = document.getElementById('qr-badge-role');
    const codeEl = document.getElementById('qr-badge-id-num');

    if (nameEl) nameEl.textContent = member.name;
    if (roleEl) roleEl.textContent = `${member.chapter || 'CENTRAL'} CHAPTER`;
    if (codeEl) codeEl.textContent = `ID: ${member.id}`;

    if (container) {
        container.innerHTML = '';
        if (typeof QRCode !== 'undefined') {
            new QRCode(container, {
                text: member.id,
                width: 180,
                height: 180,
                colorDark: "#0B0F19",
                colorLight: "#FFFFFF",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    if (modal) modal.style.display = 'flex';
    triggerHaptic('light');
}

export function closeDigitalQRModal() {
    const modal = document.getElementById('modal-member-qr-id');
    if (modal) modal.style.display = 'none';
}

export function printMemberQRCard() {
    const cardEl = document.getElementById('qr-id-badge-card');
    if (!cardEl) return;
    
    showToast('Preparing digital QR ID badge for printing...', 'info');
    
    html2canvas(cardEl, {
        scale: 3,
        backgroundColor: '#0F172A'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head><title>Print Member QR ID</title></head>
                <body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#FFF;">
                    <img src="${imgData}" style="max-width:100%; max-height:100vh;">
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => {
            printWindow.focus();
            printWindow.print();
        };
        showToast('Sent digital QR ID badge to printer!', 'success');
    }).catch(err => {
        console.error('Printing error:', err);
        showToast('Failed to generate printable ID.', 'error');
    });
}

export function deleteMember(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;

    if (confirm(`Are you sure you want to delete member "${member.name}"?`)) {
        state.members = state.members.filter(m => m.id !== memberId);
        saveToStorage();
        MFCFirebaseCloud.deleteMemberFromFirestore(memberId);
        MFCFirebaseCloud.pushAtomicUpdate('members', state.members);
        notifyStateChange('member-deleted');
        if (window.renderMembersTable) window.renderMembersTable();
        showToast(`Member "${member.name}" removed from roster.`, 'info');
    }
}

export function syncChapterBullets(val) {
    const btns = document.querySelectorAll('#members-chapter-bullets .chapter-bullet-btn');
    btns.forEach(btn => {
        const c = btn.getAttribute('data-chapter');
        if (c === val) {
            btn.classList.add('active');
            btn.style.background = 'linear-gradient(135deg, #0284C7, #3B82F6)';
            btn.style.color = '#FFF';
            btn.style.borderColor = 'rgba(56, 189, 248, 0.5)';
            btn.style.boxShadow = '0 4px 12px rgba(14, 165, 233, 0.3)';
        } else {
            btn.classList.remove('active');
            btn.style.background = 'rgba(15, 23, 42, 0.65)';
            btn.style.color = '#CBD5E1';
            btn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            btn.style.boxShadow = 'none';
        }
    });
}

export function filterByChapterBullet(chapterValue, clickedBtn) {
    syncChapterBullets(chapterValue);
    
    // Store in global state since the dropdown doesn't exist
    state.activeChapterFilter = chapterValue;

    // Sync with the Chapter select dropdown if it exists
    const chapterSelect = document.getElementById('members-filter-chapter');
    if (chapterSelect) {
        chapterSelect.value = chapterValue;
    }

    // Immediately filter and re-render the Members table
    if (window.renderMembersTable) window.renderMembersTable();

    // Notify user with feedback toast
    if (chapterValue === 'ALL') {
        showToast('Showing members from All Chapters', 'info');
    } else {
        showToast(`Showing members for ${chapterValue}`, 'info');
    }
}
