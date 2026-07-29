/**
 * MFC YOUTH TARLAC | ATTENDANCE & LIVE QR SCANNER
 * Attendance Ledger Management, Camera QR Code Scanner & Timestamping
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

let html5QrScanner = null;

export function populateAttendanceDropdown() {
    const selectEl = document.getElementById('attendance-activity-select');
    if (!selectEl) return;

    if (!state.activities || state.activities.length === 0) {
        selectEl.innerHTML = `<option value="">-- No Activities Found (Create an Activity in Agenda First) --</option>`;
        return;
    }

    const currentVal = selectEl.value || state.selectedActivityId;
    const sorted = [...state.activities].sort((a, b) => new Date(b.date) - new Date(a.date));

    selectEl.innerHTML = `
        <option value="">-- Choose an Activity to Check Attendance --</option>
        ${sorted.map(act => {
        const dateStr = act.date ? new Date(act.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No Date';
        const displayTitle = act.title || act.name || 'Untitled Activity';
        return `<option value="${act.id}" ${act.id === currentVal ? 'selected' : ''}>[${dateStr}] ${displayTitle} (${act.status || 'Upcoming'})</option>`;
    }).join('')}
    `;
}

export function renderAttendanceRoster() {
    const pill = document.getElementById('attendance-status-pill');
    const actions = document.getElementById('attendance-action-buttons');
    const banner = document.getElementById('attendance-progress-banner');
    const filterBar = document.getElementById('attendance-filter-bar');
    const emptyState = document.getElementById('attendance-empty-state');
    const tableContainer = document.getElementById('attendance-table-container');
    const tbody = document.getElementById('attendance-roster-body');

    const actId = state.selectedActivityId;
    if (!actId || !state.activities || state.activities.length === 0) {
        if (pill) { pill.className = 'status-pill-grey'; pill.innerHTML = '● Select an activity above'; }
        if (actions) actions.style.display = 'none';
        if (banner) banner.style.display = 'none';
        if (filterBar) filterBar.style.display = 'none';
        if (emptyState) {
            emptyState.style.display = 'flex';
            if (!state.activities || state.activities.length === 0) {
                emptyState.innerHTML = `
                    <div class="empty-icon">📅</div>
                    <h3>No Activities Available</h3>
                    <p>You haven't added any activities or agenda items yet. Go to the <strong>Agenda & Events</strong> tab to add your first activity.</p>
                `;
            } else {
                emptyState.innerHTML = `
                    <div class="empty-icon">📋</div>
                    <h3>No Activity Selected</h3>
                    <p>Please select an event or activity from the dropdown menu above to view and record member attendance.</p>
                `;
            }
        }
        if (tableContainer) tableContainer.style.display = 'none';
        return;
    }

    const act = state.activities.find(a => a.id === actId);
    if (!act) return;

    const displayTitle = act.title || act.name || 'Untitled Activity';
    if (pill) {
        pill.className = 'status-pill-green';
        pill.innerHTML = `● Active Roster: ${displayTitle}`;
    }
    if (actions) actions.style.display = 'flex';
    if (banner) banner.style.display = 'block';
    if (filterBar) filterBar.style.display = 'flex';
    if (emptyState) emptyState.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'block';

    if (!state.attendance[actId]) {
        state.attendance[actId] = {};
    }

    const attMap = state.attendance[actId];

    // Render Table Rows
    if (tbody) {
        if (state.members.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <div style="font-size: 2.2rem; margin-bottom: 10px;">👥</div>
                        <div style="font-size: 1rem; font-weight: 600; color: var(--text-primary);">No Members Available</div>
                        <p style="margin-top: 4px;">Add members in the Members Directory to record attendance.</p>
                    </td>
                </tr>
            `;
        } else {
            tbody.innerHTML = state.members.map((mem, idx) => {
                const memAtt = attMap[mem.id] || { status: 'absent', notes: '' };
                const st = memAtt.status;
                const notesStr = memAtt.notes || '';

                return `
                <tr id="row-${mem.id}">
                    <td style="font-weight:700; color:var(--text-muted);">${idx + 1}</td>
                    <td>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:32px; height:32px; border-radius:8px; background:var(--grad-primary); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem; color:#FFF;">
                                ${(mem.name || '?').charAt(0)}
                            </div>
                            <div>
                                <div style="font-weight:600; color:#FFF; display:flex; align-items:center; gap:8px;">
                                    <span>${mem.name}</span>
                                    <span style="font-size: 0.68rem; background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 2px 8px; border-radius: 10px;">${mem.chapter || 'EAST'}</span>
                                </div>
                                <div style="font-size:0.75rem; color:var(--text-muted);">${mem.role || 'Member'}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span style="font-weight:600; color:var(--accent-blue);">${mem.dept || 'N/A'}</span>
                        <div style="font-size:0.75rem; color:var(--text-secondary);">${mem.role || 'Member'}</div>
                    </td>
                    <td>
                        <div class="attendance-status-group" id="group-${mem.id}">
                            <button type="button" class="status-btn ${st === 'present' ? 'active-present' : ''}" onclick="window.toggleAttendance('${actId}', '${mem.id}', 'present')">Present</button>
                            <button type="button" class="status-btn ${st === 'absent' ? 'active-absent' : ''}" onclick="window.toggleAttendance('${actId}', '${mem.id}', 'absent')">Absent</button>
                        </div>
                    </td>
                    <td>
                        <input type="text" value="${notesStr}" placeholder="Add remark..." style="background:rgba(9,13,22,0.6); border:1px solid var(--border-color); border-radius:8px; padding:6px 10px; color:#FFF; font-size:0.8rem; width:160px;" onchange="window.updateRemarks('${actId}', '${mem.id}', this.value)">
                    </td>
                </tr>
            `;
            }).join('');
        }
    }

    updateLiveProgress();
}

export function toggleAttendance(actId, memId, status) {
    if (!state.attendance[actId]) state.attendance[actId] = {};
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    state.attendance[actId][memId] = {
        status: status,
        notes: state.attendance[actId][memId]?.notes || '',
        time: currentTime
    };

    saveToStorage();
    MFCFirebaseCloud.pushAtomicUpdate(`attendance/${actId}/${memId}`, state.attendance[actId][memId]);

    // Update row DOM without re-rendering entire table
    const groupEl = document.getElementById(`group-${memId}`);

    if (groupEl) {
        const btns = groupEl.querySelectorAll('.status-btn');
        if (btns[0]) btns[0].className = `status-btn ${status === 'present' ? 'active-present' : ''}`;
        if (btns[1]) btns[1].className = `status-btn ${status === 'absent' ? 'active-absent' : ''}`;
    }

    updateLiveProgress();
    if (window.updateBadgeCount) window.updateBadgeCount();

    if (status === 'present') {
        if (typeof window.playCheckInBeep === 'function') window.playCheckInBeep();
    } else if (navigator.vibrate) {
        navigator.vibrate(30);
    }

    if (status === 'absent') {
        const mem = state.members.find(m => m.id === memId);
        const act = state.activities.find(a => a.id === actId);
        if (mem) {
            triggerAbsenteeAutoGmailPrompt(mem, act);
        }
    }
    if (window.logAuditAction) window.logAuditAction(`Updated check-in status for member to ${status.toUpperCase()}`, 'attendance');
}

export function triggerAbsenteeAutoGmailPrompt(mem, act) {
    const actName = act ? (act.title || act.name || 'MFC Youth Activity') : 'MFC Youth Activity';
    const targetEmail = encodeURIComponent(mem.email || '');
    const subject = encodeURIComponent(`MFC Youth Tarlac - Pastoral Check-In: ${actName} 💛`);
    const bodyText = `Hi Bro/Sis ${mem.name}!\n\nWe noticed you missed our activity "${actName}". Hope everything is well with you! Let us know if you need any prayers or support.\n\nGod bless! 💛\n- MFC Youth Tarlac Chapter`;
    const body = encodeURIComponent(bodyText);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`;

    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-error';
    toast.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 10px; border-left: 4px solid #EA4335;';

    toast.innerHTML = `
        <span class="toast-icon">💛</span>
        <span class="toast-text" style="flex: 1; font-size: 0.82rem;">
            Marked <strong>${mem.name}</strong> as Absent. Send Gmail Check-in?
        </span>
    `;

    const sendBtn = document.createElement('button');
    sendBtn.type = 'button';
    sendBtn.className = 'btn-primary';
    sendBtn.style.cssText = 'padding: 5px 12px; font-size: 0.75rem; font-weight: 700; background: linear-gradient(135deg, #EA4335, #DB4437); border: none; color: #FFF; cursor: pointer; border-radius: 6px; white-space: nowrap;';
    sendBtn.textContent = '📧 Auto-Send Gmail';
    sendBtn.onclick = (e) => {
        e.stopPropagation();
        window.open(gmailUrl, '_blank');
        toast.remove();
        showToast(`Opened Gmail check-in for ${mem.name}!`, 'success');
        if (window.logAuditAction) window.logAuditAction(`Sent pastoral absentee check-in to ${mem.name} via Gmail`, 'pastoral');
    };

    toast.appendChild(sendBtn);
    container.appendChild(toast);

    setTimeout(() => {
        if (!toast.parentNode) return;
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 7000);
}

export function filterAttendanceRoster() {
    const searchInput = document.getElementById('attendance-roster-search');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const tbody = document.getElementById('attendance-roster-body');
    if (!tbody) return;

    Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

export function batchMarkChapterPresent(chapterName) {
    const actId = state.selectedActivityId;
    if (!actId) {
        showToast('Please select an activity first.', 'error');
        return;
    }
    if (!state.attendance[actId]) state.attendance[actId] = {};

    let count = 0;
    const cleanChapter = chapterName.toLowerCase().replace(' chapter', '');
    state.members.forEach(mem => {
        const memChap = (mem.chapter || 'EAST').toLowerCase();
        if (memChap.includes(cleanChapter) || cleanChapter.includes(memChap)) {
            if (!state.attendance[actId][mem.id]) {
                state.attendance[actId][mem.id] = { status: 'present', notes: '', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
            } else {
                state.attendance[actId][mem.id].status = 'present';
                state.attendance[actId][mem.id].time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
            count++;
        }
    });

    saveToStorage();
    renderAttendanceRoster();
    updateLiveProgress();
    showToast(`Checked in ${count} members of ${chapterName}!`, 'success');
    if (window.logAuditAction) window.logAuditAction(`Batch Check-in for ${chapterName} (${count} members present)`, 'attendance');
}

export function sendGmailToCurrentAbsentees() {
    if (!state.selectedActivityId) {
        showToast('Please select an activity first.', 'error');
        return;
    }
    const act = state.activities.find(a => a.id === state.selectedActivityId);
    const actName = act ? (act.title || act.name || 'MFC Youth Activity') : 'MFC Youth Activity';
    const attMap = state.attendance[state.selectedActivityId] || {};

    const absentEmails = [];
    const absentNames = [];

    state.members.forEach(mem => {
        const st = attMap[mem.id]?.status || 'absent';
        if (st === 'absent') {
            absentNames.push(mem.name);
            if (mem.email && mem.email.trim() && mem.email.includes('@')) {
                absentEmails.push(mem.email.trim());
            }
        }
    });

    if (absentNames.length === 0) {
        showToast('All members are marked present for this activity!', 'success');
        return;
    }

    const bccList = absentEmails.join(',');
    const msgBodyText = `Hi Brothers and Sisters!\n\nWe missed you at our activity "${actName}". Hope you are doing well! Please let your household heads know if you need any prayers or assistance.\n\nSee you at our next activity! God bless! 💛\n\n- MFC Youth Tarlac Chapter`;
    const encodedBody = encodeURIComponent(msgBodyText);
    const encodedSubject = encodeURIComponent(`MFC Youth Tarlac - Missed Activity Check-In: ${actName} 💛`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodeURIComponent(bccList)}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank');

    showToast(`Batch Gmail check-in opened for ${absentNames.length} absent member(s)!`, 'success');
    if (window.logAuditAction) window.logAuditAction(`Sent batch absentee email via Gmail for activity "${actName}" (${absentNames.length} members)`, 'pastoral');
}

export function updateRemarks(actId, memId, notes) {
    if (!state.attendance[actId]) state.attendance[actId] = {};
    if (!state.attendance[actId][memId]) state.attendance[actId][memId] = { status: 'absent', time: '-' };
    state.attendance[actId][memId].notes = notes;
    saveToStorage();
    showToast('Remark saved.', 'info');
}

export function updateLiveProgress() {
    const actId = state.selectedActivityId;
    const bannerEl = document.getElementById('attendance-progress-banner');
    if (!actId) {
        if (bannerEl) bannerEl.style.display = 'none';
        return;
    }
    if (bannerEl) bannerEl.style.display = 'block';

    const attMap = state.attendance[actId] || {};
    const totalMems = state.members.length;

    let pCount = 0;
    let aCount = 0;

    state.members.forEach(mem => {
        const st = attMap[mem.id]?.status;
        if (st === 'present' || st === 'late') pCount++;
        else aCount++;
    });

    const totalRecorded = pCount;
    const rate = totalMems > 0 ? Math.round((totalRecorded / totalMems) * 100) : 0;
    const pPct = totalMems > 0 ? (pCount / totalMems) * 100 : 0;
    const aPct = totalMems > 0 ? (aCount / totalMems) * 100 : 0;

    const elP = document.getElementById('count-present');
    const elA = document.getElementById('count-absent');
    const elTotal = document.getElementById('count-total-checkins');
    const elRate = document.getElementById('attendance-live-rate');

    const barP = document.getElementById('bar-present');
    const barA = document.getElementById('bar-absent');

    if (elP) elP.textContent = pCount;
    if (elA) elA.textContent = aCount;
    if (elRate) {
        elRate.textContent = `${rate}%`;
        if (rate === 100 && totalMems > 0 && (!window._lastConfettiActId || window._lastConfettiActId !== actId + '_100')) {
            window._lastConfettiActId = actId + '_100';
            if (typeof window.triggerConfettiBurst === 'function') window.triggerConfettiBurst();
            if (typeof showToast === 'function') showToast('🎉 100% Attendance Reached! Incredible chapter turnout!', 'success');
        }
    }

    if (barP) barP.style.width = `${pPct}%`;
    if (barA) barA.style.width = `${aPct}%`;
}

export function markAllPresent() {
    const actId = state.selectedActivityId;
    if (!actId) return;

    if (confirm('Are you sure you want to mark all members as Present for this activity?')) {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (!state.attendance[actId]) state.attendance[actId] = {};

        state.members.forEach(mem => {
            state.attendance[actId][mem.id] = {
                status: 'present',
                time: currentTime,
                notes: 'Marked present (bulk)'
            };
        });

        saveToStorage();
        renderAttendanceRoster();
        if (window.logAuditAction) window.logAuditAction('Marked ALL members present in bulk check-in', 'attendance');
        showToast('All members marked Present.', 'success');
    }
}

export function markAllAbsent() {
    const actId = state.selectedActivityId;
    if (!actId) return;

    if (confirm('Are you sure you want to mark all members as Absent for this activity?')) {
        if (!state.attendance[actId]) state.attendance[actId] = {};

        state.members.forEach(mem => {
            state.attendance[actId][mem.id] = {
                status: 'absent',
                time: '',
                notes: 'Marked absent (bulk)'
            };
        });

        saveToStorage();
        renderAttendanceRoster();
        if (window.logAuditAction) window.logAuditAction('Marked ALL members absent in bulk check-in', 'attendance');
        showToast('All members marked Absent.', 'success');
    }
}

export function resetAttendanceSheet() {
    const actId = state.selectedActivityId;
    if (!actId) return;

    if (confirm('Are you sure you want to reset all attendance check-ins for this activity to Absent?')) {
        if (!state.attendance[actId]) state.attendance[actId] = {};

        state.members.forEach(mem => {
            state.attendance[actId][mem.id] = {
                status: 'absent',
                time: '-',
                notes: ''
            };
        });

        saveToStorage();
        renderAttendanceRoster();
        if (window.logAuditAction) window.logAuditAction('Reset attendance check-in sheet to Absent', 'attendance');
        showToast('Attendance sheet reset to Absent.', 'info');
    }
}

export function startLiveQRScanner() {
    const modal = document.getElementById('qr-scanner-backdrop');
    if (modal) modal.style.display = 'flex';

    if (typeof window.Html5Qrcode !== 'undefined') {
        if (!html5QrScanner) {
            html5QrScanner = new window.Html5Qrcode("qr-reader-viewport");
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
    const modal = document.getElementById('qr-scanner-backdrop');
    if (modal) modal.style.display = 'none';
}

function handleScannedQRCode(qrData) {
    const member = state.members.find(m => m.id === qrData || m.name.toLowerCase() === qrData.toLowerCase());
    if (member) {
        toggleAttendance(state.selectedActivityId, member.id, 'present');
        stopLiveQRScanner();
    } else {
        showToast(`Unrecognized QR badge ID: ${qrData}`, 'error');
        triggerHaptic('error');
    }
}

export function simulateQRCheckIn() {
    const actId = state.selectedActivityId;
    const selectEl = document.getElementById('qr-sim-member');
    if (!actId || !selectEl || !selectEl.value) {
        showToast('Please select an activity and a member first.', 'warning');
        return;
    }

    const memId = selectEl.value;
    const member = state.members.find(m => m.id === memId);
    if (!member) return;

    if (!state.attendance[actId]) state.attendance[actId] = {};
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    state.attendance[actId][memId] = {
        status: 'present',
        time: currentTime,
        notes: '⚡ QR Check-In Verified'
    };

    saveToStorage();
    if (typeof window.triggerConfettiBurst === 'function') window.triggerConfettiBurst();
    showToast(`⚡ QR Verified: ${member.name} marked Present at ${currentTime}!`, 'success');
    
    notifyStateChange('attendance-updated');
    renderAttendanceRoster();
    stopLiveQRScanner();
}
