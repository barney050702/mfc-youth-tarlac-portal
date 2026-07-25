/**
 * MFC YOUTH TARLAC | ATTENDANCE & LIVE QR SCANNER
 * Attendance Ledger Management, Camera QR Code Scanner & Timestamping
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

let html5QrScanner = null;

export function renderAttendanceView() {
    const selector = document.getElementById('attendance-activity-select');
    const tableBody = document.getElementById('attendance-table-body');
    if (!tableBody) return;

    if (selector) {
        selector.innerHTML = '<option value="">-- Select Chapter Activity --</option>';
        state.activities.forEach(act => {
            const opt = document.createElement('option');
            opt.value = act.id;
            opt.textContent = `${act.title} (${act.date || 'TBD'})`;
            if (act.id === state.selectedActivityId) opt.selected = true;
            selector.appendChild(opt);
        });
    }

    if (!state.selectedActivityId) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #94A3B8; font-weight: 500;">
                    📌 Please select an activity above to mark or view attendance.
                </td>
            </tr>
        `;
        return;
    }

    const activityAttendance = state.attendance[state.selectedActivityId] || {};
    tableBody.innerHTML = '';

    state.members.forEach(m => {
        const record = activityAttendance[m.id] || { status: 'absent', time: '', notes: '' };
        const tr = document.createElement('tr');
        tr.style.cssText = 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);';

        const nameTd = document.createElement('td');
        nameTd.style.cssText = 'padding: 12px 16px; font-weight: 600; color: #FFF;';
        nameTd.textContent = m.name;

        const chapterTd = document.createElement('td');
        chapterTd.style.cssText = 'padding: 12px 16px; color: #38BDF8; font-size: 13px;';
        chapterTd.textContent = m.chapter || 'CENTRAL';

        const statusTd = document.createElement('td');
        statusTd.style.cssText = 'padding: 12px 16px;';
        
        const select = document.createElement('select');
        select.style.cssText = 'background: #0B0F19; border: 1px solid rgba(56, 189, 248, 0.3); color: #FFF; padding: 6px 12px; border-radius: 8px; font-size: 13px;';
        ['present', 'late', 'absent'].forEach(st => {
            const opt = document.createElement('option');
            opt.value = st;
            opt.textContent = st.toUpperCase();
            if (record.status === st) opt.selected = true;
            select.appendChild(opt);
        });
        select.addEventListener('change', (e) => setMemberAttendance(m.id, e.target.value));
        statusTd.appendChild(select);

        const timeTd = document.createElement('td');
        timeTd.style.cssText = 'padding: 12px 16px; color: #94A3B8; font-size: 13px;';
        timeTd.textContent = record.time || '—';

        const actionsTd = document.createElement('td');
        actionsTd.style.cssText = 'padding: 12px 16px; text-align: right;';
        const quickBtn = document.createElement('button');
        quickBtn.style.cssText = 'background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #34D399; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer;';
        quickBtn.textContent = '⚡ Check-In';
        quickBtn.addEventListener('click', () => setMemberAttendance(m.id, 'present'));
        actionsTd.appendChild(quickBtn);

        tr.appendChild(nameTd);
        tr.appendChild(chapterTd);
        tr.appendChild(statusTd);
        tr.appendChild(timeTd);
        tr.appendChild(actionsTd);

        tableBody.appendChild(tr);
    });
}

export function setMemberAttendance(memberId, status) {
    if (!state.selectedActivityId) {
        showToast('Please select an activity first.', 'warning');
        return;
    }

    if (!state.attendance[state.selectedActivityId]) {
        state.attendance[state.selectedActivityId] = {};
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    state.attendance[state.selectedActivityId][memberId] = {
        status: status,
        time: timeStr,
        notes: ''
    };

    saveToStorage();
    MFCFirebaseCloud.pushAtomicUpdate(`attendance/${state.selectedActivityId}/${memberId}`, state.attendance[state.selectedActivityId][memberId]);
    notifyStateChange('attendance-updated');
    renderAttendanceView();

    const member = state.members.find(m => m.id === memberId);
    showToast(`Checked in ${member ? member.name : 'member'} as ${status.toUpperCase()} at ${timeStr}`, 'success');
    triggerHaptic('success');
}

export function startLiveQRScanner() {
    const modal = document.getElementById('qr-scanner-modal');
    if (modal) modal.style.display = 'flex';

    if (typeof Html5Qrcode !== 'undefined') {
        if (!html5QrScanner) {
            html5QrScanner = new Html5Qrcode("qr-reader-viewport");
        }
        html5QrScanner.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
                triggerHaptic('success');
                handleScannedQRCode(decodedText);
            },
            (errorMessage) => {
                // Ignore frame parse noise
            }
        ).catch(err => {
            showToast('Camera access permission required for QR scanning.', 'error');
        });
    }
}

export function stopLiveQRScanner() {
    if (html5QrScanner) {
        html5QrScanner.stop().then(() => {
            html5QrScanner.clear();
        }).catch(err => console.warn('QR scanner stop notice:', err));
    }
    const modal = document.getElementById('qr-scanner-modal');
    if (modal) modal.style.display = 'none';
}

function handleScannedQRCode(qrData) {
    const member = state.members.find(m => m.id === qrData || m.name.toLowerCase() === qrData.toLowerCase());
    if (member) {
        setMemberAttendance(member.id, 'present');
        stopLiveQRScanner();
    } else {
        showToast(`Unrecognized QR badge ID: ${qrData}`, 'error');
        triggerHaptic('error');
    }
}
