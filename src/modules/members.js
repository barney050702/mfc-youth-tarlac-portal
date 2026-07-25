/**
 * MFC YOUTH TARLAC | MEMBER DIRECTORY & DIGITAL QR BADGES
 * Roster Management, Filtering, Duplicate Detection & QR Generation
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { escapeHTML, showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

export function renderMembersTable() {
    const tableBody = document.getElementById('members-table-body');
    const countBadge = document.getElementById('member-count-badge');
    if (!tableBody) return;

    let filtered = [...state.members];

    if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase();
        filtered = filtered.filter(m => 
            (m.name && m.name.toLowerCase().includes(q)) ||
            (m.address && m.address.toLowerCase().includes(q)) ||
            (m.chapter && m.chapter.toLowerCase().includes(q)) ||
            (m.contactNum && m.contactNum.includes(q))
        );
    }

    if (state.filterCategory && state.filterCategory !== 'ALL') {
        filtered = filtered.filter(m => (m.chapter || 'CENTRAL').toUpperCase() === state.filterCategory.toUpperCase());
    }

    if (countBadge) {
        countBadge.textContent = `${filtered.length} Members`;
    }

    tableBody.innerHTML = '';

    if (filtered.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #94A3B8; font-weight: 500;">
                    🔍 No members found matching filter criteria.
                </td>
            </tr>
        `;
        return;
    }

    filtered.forEach((m, index) => {
        const tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s ease;';

        const nameTd = document.createElement('td');
        nameTd.style.cssText = 'padding: 14px 16px; font-weight: 600; color: #FFF;';
        nameTd.textContent = m.name || 'Unnamed Member';

        const chapterTd = document.createElement('td');
        chapterTd.style.cssText = 'padding: 14px 16px; color: #38BDF8; font-size: 13px; font-weight: 500;';
        chapterTd.textContent = m.chapter || 'CENTRAL';

        const ageTd = document.createElement('td');
        ageTd.style.cssText = 'padding: 14px 16px; color: #CBD5E1; font-size: 14px;';
        ageTd.textContent = m.age ? `${m.age} yrs` : 'N/A';

        const birthdayTd = document.createElement('td');
        birthdayTd.style.cssText = 'padding: 14px 16px; color: #94A3B8; font-size: 13px;';
        birthdayTd.textContent = m.birthday || '—';

        const addressTd = document.createElement('td');
        addressTd.style.cssText = 'padding: 14px 16px; color: #CBD5E1; font-size: 13px; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
        addressTd.textContent = m.address || '—';

        const contactTd = document.createElement('td');
        contactTd.style.cssText = 'padding: 14px 16px; color: #94A3B8; font-size: 13px;';
        contactTd.textContent = m.contactNum || m.parentsContact || '—';

        const actionsTd = document.createElement('td');
        actionsTd.style.cssText = 'padding: 14px 16px; text-align: right; white-space: nowrap;';

        // Digital QR Badge Button
        const qrBtn = document.createElement('button');
        qrBtn.className = 'btn-icon';
        qrBtn.title = 'View Digital QR Badge';
        qrBtn.style.cssText = 'background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); color: #38BDF8; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; margin-right: 6px;';
        qrBtn.textContent = '🪪 QR ID';
        qrBtn.addEventListener('click', () => openDigitalQRModal(m.id));

        // Delete Member Button
        const delBtn = document.createElement('button');
        delBtn.className = 'btn-icon btn-delete';
        delBtn.title = 'Delete Member';
        delBtn.style.cssText = 'background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #F87171; padding: 6px 10px; border-radius: 8px; font-size: 12px; cursor: pointer;';
        delBtn.textContent = '🗑️';
        delBtn.addEventListener('click', () => deleteMember(m.id));

        actionsTd.appendChild(qrBtn);
        actionsTd.appendChild(delBtn);

        tr.appendChild(nameTd);
        tr.appendChild(chapterTd);
        tr.appendChild(ageTd);
        tr.appendChild(birthdayTd);
        tr.appendChild(addressTd);
        tr.appendChild(contactTd);
        tr.appendChild(actionsTd);

        tableBody.appendChild(tr);
    });
}

export function openDigitalQRModal(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;

    const modal = document.getElementById('digital-qr-modal');
    const container = document.getElementById('qr-canvas-container');
    const nameEl = document.getElementById('qr-member-name');
    const chapterEl = document.getElementById('qr-member-chapter');
    const codeEl = document.getElementById('qr-member-id');

    if (nameEl) nameEl.textContent = member.name;
    if (chapterEl) chapterEl.textContent = `${member.chapter || 'CENTRAL'} CHAPTER`;
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
    const modal = document.getElementById('digital-qr-modal');
    if (modal) modal.style.display = 'none';
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
        renderMembersTable();
        showToast(`Member "${member.name}" removed from roster.`, 'info');
        triggerHaptic('medium');
    }
}
