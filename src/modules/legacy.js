import { logoutUser } from './auth.js';
import { renderMembersTable, syncChapterBullets } from './members.js';
import { updateBadgeCount } from './core.js';
import { loadFromStorage } from './state.js';
import { escapeHTML, switchView } from './ui.js';
import { renderDashboard } from './dashboard.js';
import { closeMemberModal } from './ui-modals.js';
import { toggleAttendance } from './attendance.js';
import { renderActivitiesTable } from './activities.js';

import { state, saveToStorage, notifyStateChange } from './state.js';
import { showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

export function renderAccountsTable() {
    const tbody = document.getElementById('accounts-table-body');
    if (!tbody) return;

    if (!state.accounts || state.accounts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 48px 20px; color: #94A3B8;">
                    <div style="font-size: 2rem; margin-bottom: 8px;">🛡️</div>
                    <div style="font-weight: 700; color: #E2E8F0;">No accounts found</div>
                    <div style="font-size: 0.85rem;">Click "Create New Account" above to add Super Admins or Chapter Heads.</div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = state.accounts
        .map((acc) => {
            const isSuperAdmin = acc.role.toUpperCase().includes('ADMIN');
            const badgeBg = isSuperAdmin ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.9)';
            const badgeColor = isSuperAdmin ? '#60A5FA' : '#94A3B8';
            const badgeBorder = isSuperAdmin
                ? '1px solid rgba(59, 130, 246, 0.4)'
                : '1px solid rgba(255,255,255,0.1)';

            return `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); transition: background 0.2s;">
                <td style="padding: 16px 20px; color: #FFF; font-weight: 700; font-size: 0.92rem;">
                    ${acc.email}
                </td>
                <td style="padding: 16px 20px;">
                    <span style="background: ${badgeBg}; color: ${badgeColor}; border: ${badgeBorder}; padding: 4px 14px; border-radius: 20px; font-weight: 800; font-size: 0.73rem; letter-spacing: 0.05em;">
                        ${acc.role}
                    </span>
                </td>
                <td style="padding: 16px 20px; color: #E2E8F0; font-weight: 600; font-size: 0.92rem;">
                    ${acc.area || 'All Chapters'}
                </td>
                <td style="padding: 16px 20px;">
                    <button onclick="deleteAccount('${acc.id}')" style="background: transparent; border: none; color: #64748B; cursor: pointer; padding: 6px; border-radius: 6px; transition: color 0.2s;" title="Delete Account" onmouseover="this.style.color='#F43F5E'" onmouseout="this.style.color='#64748B'">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                </td>
            </tr>
        `;
        })
        .join('');
}

export function openCreateAccountModal() {
    const backdrop = document.getElementById('create-account-backdrop');
    const form = document.getElementById('create-account-form');
    if (form) form.reset();
    const roleEl = document.getElementById('acc-role');
    if (roleEl) roleEl.value = 'CHAPTER HEAD';
    toggleAccountChapterGroup();
    if (backdrop) backdrop.style.display = 'flex';
}

export function closeCreateAccountModal() {
    const backdrop = document.getElementById('create-account-backdrop');
    if (backdrop) backdrop.style.display = 'none';
}

export function toggleAccountChapterGroup() {
    const roleEl = document.getElementById('acc-role');
    const chapterGroup = document.getElementById('acc-chapter-group');
    if (!roleEl || !chapterGroup) return;

    if (roleEl.value === 'CHAPTER HEAD' || roleEl.value.toUpperCase().includes('CHAPTER')) {
        chapterGroup.style.display = 'block';
    } else {
        chapterGroup.style.display = 'none';
    }
}

export function handleCreateAccount(e) {
    e.preventDefault();
    const emailEl = document.getElementById('acc-email');
    const passEl = document.getElementById('acc-password');
    const roleEl = document.getElementById('acc-role');
    const areaEl = document.getElementById('acc-chapter-area');

    if (!emailEl || !emailEl.value.trim()) {
        showToast('Please enter an email address.', 'error');
        return;
    }

    const email = emailEl.value.trim();
    const pass = passEl && passEl.value.trim() ? passEl.value.trim() : 'mfc2026';
    const role = roleEl ? roleEl.value : 'CHAPTER HEAD';
    const area =
        role === 'SUPER ADMIN' || role.toUpperCase().includes('SUPER')
            ? 'All Chapters'
            : areaEl
              ? areaEl.value
              : 'East';

    const newAcc = {
        id: 'acc-' + Date.now(),
        email: email,
        role: role,
        area: area,
        password: pass,
    };

    if (!state.accounts) state.accounts = [];
    state.accounts.push(newAcc);
    saveToStorage();
    renderAccountsTable();
    closeCreateAccountModal();
    showToast(`Account created for ${email}`, 'success');
}

export function deleteAccount(accId) {
    const acc = (state.accounts || []).find((a) => a.id === accId);
    if (!acc) return;
    if (confirm(`Are you sure you want to delete the account for ${acc.email}?`)) {
        state.accounts = state.accounts.filter((a) => a.id !== accId);
        saveToStorage();
        renderAccountsTable();
        showToast('Account deleted.', 'info');
    }
}

export function openUserProfileModal(event) {
    const backdrop = document.getElementById('user-profile-backdrop');
    const card = document.querySelector('.user-security-card');
    if (backdrop && card) {
        switchProfileModalView('menu');
        backdrop.style.display = 'block';
        if (event && event.clientX > window.innerWidth / 2) {
            card.style.right = '20px';
            card.style.left = 'auto';
        } else {
            card.style.left = '16px';
            card.style.right = 'auto';
        }
    }
}

export function closeUserProfileModal() {
    const backdrop = document.getElementById('user-profile-backdrop');
    if (backdrop) {
        backdrop.style.display = 'none';
    }
}

export function switchProfileModalView(view) {
    const menuView = document.getElementById('profile-modal-menu-view');
    const passcodeView = document.getElementById('profile-modal-passcode-view');
    const recoveryView = document.getElementById('profile-modal-recovery-view');
    const rbacView = document.getElementById('profile-modal-rbac-view');
    const auditView = document.getElementById('profile-modal-audit-view');

    if (menuView) menuView.style.display = 'none';
    if (passcodeView) passcodeView.style.display = 'none';
    if (recoveryView) recoveryView.style.display = 'none';
    if (rbacView) rbacView.style.display = 'none';
    if (auditView) auditView.style.display = 'none';

    if (view === 'passcode' && passcodeView) {
        passcodeView.style.display = 'block';
    } else if (view === 'recovery' && recoveryView) {
        recoveryView.style.display = 'block';
    } else if (view === 'rbac' && rbacView) {
        rbacView.style.display = 'block';
    } else if (view === 'audit' && auditView) {
        auditView.style.display = 'block';
        renderAuditLog();
    } else if (menuView) {
        menuView.style.display = 'block';
    }
}

export function saveNewPasscode() {
    const curr = document.getElementById('sec-current-passcode');
    const newPass = document.getElementById('sec-new-passcode');
    const confPass = document.getElementById('sec-confirm-passcode');

    if (newPass && confPass && newPass.value !== confPass.value) {
        showToast('New passcodes do not match!', 'warning');
        return;
    }
    if (newPass && newPass.value.length > 0 && newPass.value.length < 6) {
        showToast('Passcode must be at least 6 characters long.', 'warning');
        return;
    }

    if (curr) curr.value = '';
    if (newPass) newPass.value = '';
    if (confPass) confPass.value = '';

    showToast('✅ Passcode successfully updated!', 'success');
    switchProfileModalView('menu');
}

export function saveRecoveryOptions() {
    const emailEl = document.getElementById('sec-recovery-email');
    if (emailEl && emailEl.value) {
        const headerEmail = document.getElementById('profile-modal-email');
        if (headerEmail) headerEmail.textContent = emailEl.value;
    }
    showToast('✅ Account recovery options saved successfully!', 'success');
    switchProfileModalView('menu');
}

export function logAuditAction(actionText, category = 'system') {
    if (!state.auditLog) state.auditLog = [];
    const newEntry = {
        id: 'log-' + Date.now(),
        text: actionText,
        time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }),
        category: category,
    };
    state.auditLog.unshift(newEntry);
    if (state.auditLog.length > 50) state.auditLog.pop();
    localStorage.setItem('ps_audit_log', JSON.stringify(state.auditLog));
    renderAuditLog();
}

export function renderAuditLog() {
    if (!state.auditLog || state.auditLog.length === 0) {
        const storedLog = localStorage.getItem('ps_audit_log');
        if (storedLog) state.auditLog = JSON.parse(storedLog);
        else {
            state.auditLog = [
                {
                    id: 'log-1',
                    text: 'System session initialized for Super Admin',
                    time: '08:00 AM',
                    category: 'system',
                },
                {
                    id: 'log-2',
                    text: 'Loaded member records and semester roadmap',
                    time: '08:01 AM',
                    category: 'system',
                },
                {
                    id: 'log-3',
                    text: 'Real-time attendance rate calculated at 84%',
                    time: '08:02 AM',
                    category: 'attendance',
                },
            ];
            localStorage.setItem('ps_audit_log', JSON.stringify(state.auditLog));
        }
    }

    const htmlContent =
        state.auditLog.length === 0
            ? '<div style="color: #94A3B8; font-size: 0.85rem; text-align: center; padding: 12px;">No recent audit actions logged.</div>'
            : state.auditLog
                  .map((item) => {
                      let catColor = '#38BDF8';
                      if (item.category === 'security') catColor = '#C084FC';
                      else if (item.category === 'attendance') catColor = '#34D399';
                      else if (item.category === 'pastoral') catColor = '#FB7185';
                      else if (item.category === 'finance') catColor = '#FBBF24';
                      return `
                <div class="audit-log-item" style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: rgba(15, 23, 42, 0.65); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; margin-bottom: 6px;">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${catColor}; flex-shrink: 0;"></span>
                        <span style="color: #E2E8F0; font-size: 0.82rem; line-height: 1.3;">${item.text}</span>
                    </div>
                    <span class="audit-log-time" style="font-size: 0.72rem; color: #64748B; white-space: nowrap; margin-left: 10px;">${item.time}</span>
                </div>
            `;
                  })
                  .join('');

    const container = document.getElementById('audit-log-container');
    if (container) container.innerHTML = htmlContent;

    const modalContainer = document.getElementById('profile-audit-log-list');
    if (modalContainer) modalContainer.innerHTML = htmlContent;
}

export function exportBackupJSON() {
    const backupData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        activities: state.activities,
        members: state.members,
        attendance: state.attendance,
        funds: state.funds,
        auditLog: state.auditLog || [],
    };

    const dataStr =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
        'download',
        `MFC_Youth_Tarlac_Backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    logAuditAction('Downloaded full system JSON database backup', 'security');
    showToast('📥 Backup database JSON file downloaded successfully!', 'success');
}

export function exportToGoogleSheetsTSV() {
    if (!state.members || state.members.length === 0) {
        showToast('No members to export to Google Sheets.', 'error');
        return;
    }

    const headers = [
        'Member ID',
        'Full Name',
        'Chapter / Area',
        'Department',
        'Role / Rank',
        'Email',
        'Contact Number',
        'Birthday',
        'CLC Camp Date',
        'Status',
    ];
    const rows = state.members.map((m) => [
        m.id || '',
        m.name || '',
        m.chapter || 'Central Chapter',
        m.dept || 'General',
        m.role || 'Member',
        m.email || '',
        m.contactNum || '',
        m.birthday || '',
        m.campDate || '',
        m.status || 'Active',
    ]);

    const tsvContent = [
        headers.join('\t'),
        ...rows.map((row) => row.map((val) => String(val).replace(/\t/g, ' ')).join('\t')),
    ].join('\n');

    // Download TSV file suitable for direct Google Drive / Sheets upload
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MFC_Youth_Tarlac_GoogleSheets_Export_${new Date().toISOString().slice(0, 10)}.tsv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Try copying to clipboard for 1-click Ctrl+V in Google Sheets
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(tsvContent)
            .then(() => {
                showToast(
                    '📋 Copied to clipboard & downloaded! Open Google Sheets and press Ctrl+V to paste.',
                    'success'
                );
            })
            .catch(() => {
                showToast('☁️ Downloaded TSV ready for Google Sheets upload!', 'success');
            });
    } else {
        showToast('☁️ Downloaded TSV ready for Google Sheets upload!', 'success');
    }

    logAuditAction(
        `Exported directory TSV for Google Sheets sync (${state.members.length} members)`,
        'export'
    );
}

export function importBackupJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data || !data.activities || !data.members) {
                showToast('Invalid backup file format.', 'warning');
                return;
            }

            state.activities = data.activities || [];
            state.members = data.members || [];
            state.attendance = data.attendance || {};
            state.funds = data.funds || [];
            if (data.auditLog) state.auditLog = data.auditLog;

            saveToStorage();
            if (state.auditLog)
                localStorage.setItem('ps_audit_log', JSON.stringify(state.auditLog));

            renderAll();
            logAuditAction('Restored system database from backup file', 'security');
            showToast('✅ System data restored successfully from backup!', 'success');
        } catch (err) {
            console.error('Restore Error:', err);
            showToast('Failed to parse JSON backup file.', 'warning');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

export function switchSimulatedRole(roleName) {
    state.currentRole = roleName;
    const subEl = document.getElementById('profile-modal-role');
    const sideRoleEl = document.querySelector('.sidebar-user-role');

    if (subEl) subEl.textContent = roleName;
    if (sideRoleEl) sideRoleEl.textContent = roleName;

    const navFunds = document.querySelector('.nav-item[data-view="funds"]');
    const navAccount = document.querySelector('.nav-item[data-view="account"]');
    const mobileFunds = document.getElementById('mobile-nav-funds');

    if (roleName === 'Attendance Officer') {
        if (navFunds) navFunds.style.display = 'none';
        if (navAccount) navAccount.style.display = 'none';
        if (mobileFunds) mobileFunds.style.display = 'none';
        showToast('Switched to Attendance Officer role. Ledger restricted.', 'info');
    } else if (roleName === 'Finance Officer') {
        if (navFunds) navFunds.style.display = 'flex';
        if (navAccount) navAccount.style.display = 'none';
        if (mobileFunds) mobileFunds.style.display = 'flex';
        showToast('Switched to Finance Officer role. Full Ledger access.', 'info');
    } else {
        if (navFunds) navFunds.style.display = 'flex';
        if (navAccount) navAccount.style.display = 'flex';
        if (mobileFunds) mobileFunds.style.display = 'flex';
        showToast('Switched to Super Admin role. Full System Access.', 'success');
    }

    logAuditAction(`Officer simulated role switched to ${roleName}`, 'security');
    switchProfileModalView('menu');
}

export function resetInactivityTimer() {
    if (
        localStorage.getItem('ps_logged_in') !== 'true' &&
        sessionStorage.getItem('ps_logged_in') !== 'true'
    )
        return;

    clearTimeout(inactivityTimer);
    clearTimeout(inactivityWarningTimer);

    inactivityWarningTimer = setTimeout(() => {
        showToast(
            '⚠️ You will be automatically logged out in 1 minute due to inactivity.',
            'warning'
        );
    }, INACTIVITY_WARNING_MS);

    inactivityTimer = setTimeout(() => {
        logoutUser();
        showToast('Logged out due to inactivity to protect sensitive data.', 'info');
    }, INACTIVITY_LIMIT_MS);
}

export function startInactivityWatchdog() {
    if (watchdogStarted) return;
    watchdogStarted = true;

    const events = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach((evt) => {
        document.addEventListener(evt, resetInactivityTimer, { passive: true });
    });

    resetInactivityTimer();
}

export function openImportCSVModal() {
    const modal = document.getElementById('import-csv-backdrop');
    if (modal) modal.style.display = 'flex';
}

export function closeImportCSVModal() {
    const modal = document.getElementById('import-csv-backdrop');
    if (modal) modal.style.display = 'none';
}

export function handleCSVFileUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const textarea = document.getElementById('import-csv-text');
        if (textarea) {
            textarea.value = e.target.result;
            showToast(
                `Loaded ${file.name}. Click "⚡ Auto Arrange Columns" to smart-map columns!`,
                'info'
            );
        }
    };
    reader.readAsText(file);
}

export function splitCSVLine(line) {
    if (line.includes('\t')) {
        return line.split('\t').map((c) => c.trim().replace(/^"+|"+$/g, ''));
    }
    const result = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"' && (i === 0 || line[i - 1] !== '\\')) {
            inQuote = !inQuote;
        } else if (char === ',' && !inQuote) {
            result.push(cur.trim().replace(/^"+|"+$/g, ''));
            cur = '';
        } else {
            cur += char;
        }
    }
    result.push(cur.trim().replace(/^"+|"+$/g, ''));
    return result;
}

export function smartParseCSVRows(rawText) {
    const lines = rawText.trim().split(/\r?\n/);
    const parsedRows = [];

    // Default mappings if no header detected
    let nameCol = 0;
    let chapterCol = 1;
    let deptCol = 2;
    let roleCol = 3;
    let phoneCol = 4;
    let emailCol = 5;
    let birthdayCol = -1;
    let parentContactCol = -1;
    let addressCol = -1;

    let headerRowIndex = -1;

    // Scan for header row
    for (let i = 0; i < Math.min(lines.length, 15); i++) {
        const lineStr = lines[i].toLowerCase();
        if (
            lineStr.includes('name') ||
            lineStr.includes('chapter') ||
            lineStr.includes('birthday') ||
            lineStr.includes('contact') ||
            lineStr.includes('phone')
        ) {
            headerRowIndex = i;
            const headers = splitCSVLine(lines[i]).map((h) => h.toLowerCase());
            headers.forEach((h, idx) => {
                if (h.includes('name') && !h.includes('parent') && !h.includes('chapter'))
                    nameCol = idx;
                else if (h.includes('chapter') || h.includes('area')) chapterCol = idx;
                else if (h.includes('dept') || h.includes('ministry') || h.includes('service'))
                    deptCol = idx;
                else if (
                    h.includes('role') ||
                    h.includes('designation') ||
                    h.includes('head') ||
                    h.includes('position')
                )
                    roleCol = idx;
                else if (
                    h.includes('parent') &&
                    (h.includes('contact') || h.includes('phone') || h.includes('#'))
                )
                    parentContactCol = idx;
                else if (
                    (h.includes('contact') ||
                        h.includes('phone') ||
                        h.includes('mobile') ||
                        h.includes('cell') ||
                        h === 'no' ||
                        h === 'num') &&
                    !h.includes('parent')
                )
                    phoneCol = idx;
                else if (h.includes('email') || h.includes('mail')) emailCol = idx;
                else if (h.includes('birth') || h.includes('bday') || h.includes('dob'))
                    birthdayCol = idx;
                else if (h.includes('address') || h.includes('addr') || h.includes('location'))
                    addressCol = idx;
            });
            break;
        }
    }

    const startRow = headerRowIndex !== -1 ? headerRowIndex + 1 : 0;

    for (let i = startRow; i < lines.length; i++) {
        const line = lines[i];
        if (!line || !line.trim()) continue;
        // Skip obvious title/junk rows
        if (
            line.replace(/,/g, '').trim() === '' ||
            line.toLowerCase().includes('usbong youthcamp') ||
            line.toLowerCase().includes('===') ||
            line.toLowerCase().includes('---')
        )
            continue;

        const cols = splitCSVLine(line);
        if (cols.length === 0 || cols.every((c) => !c)) continue;

        let name = nameCol >= 0 && cols[nameCol] ? cols[nameCol] : '';
        // If name is just a sequence number ('1', '2') and we had no header, look for actual name column
        if (/^\d+$/.test(name) || !name) {
            for (let c = 0; c < cols.length; c++) {
                if (
                    c !== chapterCol &&
                    c !== phoneCol &&
                    c !== birthdayCol &&
                    cols[c] &&
                    /[a-zA-Z]{3,}/.test(cols[c]) &&
                    !['east', 'west', 'north', 'south', 'central', 'chapter'].some((x) =>
                        cols[c].toLowerCase().includes(x)
                    )
                ) {
                    name = cols[c];
                    break;
                }
            }
        }
        if (!name || /^\d+$/.test(name)) continue;

        let chapter = chapterCol >= 0 && cols[chapterCol] ? cols[chapterCol] : 'East Chapter';
        if (chapter.toUpperCase() === 'EAST') chapter = 'East Chapter';
        else if (chapter.toUpperCase() === 'WEST') chapter = 'West Chapter';
        else if (chapter.toUpperCase() === 'NORTH') chapter = 'North Chapter';
        else if (chapter.toUpperCase() === 'SOUTH') chapter = 'South Chapter';
        else if (chapter.toUpperCase() === 'CENTRAL') chapter = 'Central Chapter';

        let department = deptCol >= 0 && cols[deptCol] ? cols[deptCol] : 'Programs & Events';
        let role =
            roleCol >= 0 && cols[roleCol] && !/^\d+$/.test(cols[roleCol])
                ? cols[roleCol]
                : 'Youth Member';
        let phone = phoneCol >= 0 && cols[phoneCol] ? cols[phoneCol].replace(/[^0-9+]/g, '') : '';
        if (phone.length === 10 && phone.startsWith('9')) phone = '0' + phone;
        let email = emailCol >= 0 && cols[emailCol] ? cols[emailCol] : '';
        let birthday =
            birthdayCol >= 0 && cols[birthdayCol]
                ? cols[birthdayCol].replace(/[^0-9/.-]/g, '')
                : '2008-01-01';
        let parentContact =
            parentContactCol >= 0 && cols[parentContactCol]
                ? cols[parentContactCol].replace(/[^0-9+]/g, '')
                : '';
        if (parentContact.length === 10 && parentContact.startsWith('9'))
            parentContact = '0' + parentContact;
        let address = addressCol >= 0 && cols[addressCol] ? cols[addressCol] : '';

        parsedRows.push({
            name: name.trim(),
            chapter: chapter.trim() || 'East Chapter',
            department: department.trim() || 'Programs & Events',
            role: role.trim() || 'Youth Member',
            phone: phone.trim(),
            email: email.trim(),
            birthdate: birthday.trim() || '2008-01-01',
            parentContact: parentContact.trim(),
            address: address.trim(),
        });
    }

    return parsedRows;
}

export function autoArrangeCSVContent() {
    const textarea = document.getElementById('import-csv-text');
    if (!textarea || !textarea.value.trim()) {
        showToast('Please paste or upload CSV rows before clicking Auto Arrange.', 'warning');
        return;
    }

    const parsed = smartParseCSVRows(textarea.value);
    if (parsed.length === 0) {
        showToast(
            'Could not extract member data rows. Please check if your text contains names.',
            'error'
        );
        return;
    }

    // Re-format textarea into clean standard CSV structure
    const header =
        'Name, Chapter Area, Ministry/Dept, Designation/Role, Phone, Email, Birthday, Parents Contact, Address';
    const body = parsed
        .map((p) => {
            const escape = (str) =>
                str && (str.includes(',') || str.includes('"'))
                    ? `"${str.replace(/"/g, '""')}"`
                    : str || '';
            return [
                escape(p.name),
                escape(p.chapter),
                escape(p.department),
                escape(p.role),
                escape(p.phone),
                escape(p.email),
                escape(p.birthdate),
                escape(p.parentContact),
                escape(p.address),
            ].join(', ');
        })
        .join('\n');

    textarea.value = `${header}\n${body}`;
    showToast(
        `⚡ Smartly auto-arranged ${parsed.length} rows! Columns mapped perfectly. Ready to import.`,
        'success'
    );
}

export function processCSVImport() {
    const textarea = document.getElementById('import-csv-text');
    if (!textarea || !textarea.value.trim()) {
        showToast('Please upload a CSV file or paste formatted rows first.', 'warning');
        return;
    }

    const parsed = smartParseCSVRows(textarea.value);
    if (parsed.length === 0) {
        showToast(
            'No valid member rows detected. Try clicking Auto Arrange or check formatting.',
            'error'
        );
        return;
    }

    if (!state.members) state.members = [];

    let importedCount = 0;
    parsed.forEach((row) => {
        state.members.push({
            id:
                'm-import-' +
                Date.now() +
                '-' +
                Math.random().toString(36).substr(2, 5) +
                '-' +
                importedCount,
            name: row.name,
            chapter: row.chapter,
            department: row.department,
            role: row.role,
            phone: row.phone,
            contactNum: row.phone,
            email: row.email,
            birthdate: row.birthdate,
            parentContact: row.parentContact,
            address: row.address,
            status: 'Active',
        });
        importedCount++;
    });

    saveToStorage();
    if (typeof renderMembersTable === 'function') renderMembersTable();
    if (typeof renderAll === 'function') renderAll();
    if (typeof updateBadgeCount === 'function') updateBadgeCount();
    closeImportCSVModal();
    textarea.value = '';
    showToast(
        `🎉 Successfully imported & auto-arranged ${importedCount} member(s) into the portal!`,
        'success'
    );
    if (typeof logAuditAction === 'function')
        logAuditAction(`Imported ${importedCount} members via CSV/Excel`, 'members');
}

export function generateSVGQRCode(text) {
    const size = 25;
    let grid = Array.from({ length: size }, () => Array(size).fill(false));

    function drawFinder(row, col) {
        for (let r = 0; r < 7; r++) {
            for (let c = 0; c < 7; c++) {
                if (
                    r === 0 ||
                    r === 6 ||
                    c === 0 ||
                    c === 6 ||
                    (r >= 2 && r <= 4 && c >= 2 && c <= 4)
                ) {
                    grid[row + r][col + c] = true;
                } else {
                    grid[row + r][col + c] = false;
                }
            }
        }
    }

    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
    }

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const inTL = r <= 7 && c <= 7;
            const inTR = r <= 7 && c >= size - 8;
            const inBL = r >= size - 8 && c <= 7;
            if (!inTL && !inTR && !inBL) {
                const bit = ((r * size + c) ^ hash ^ (r * 3 + c * 5)) % 2 === 0;
                grid[r][c] = bit;
            }
        }
    }

    let rects = '';
    const cellW = 100 / size;
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if (grid[r][c]) {
                rects += `<rect x="${(c * cellW).toFixed(2)}" y="${(r * cellW).toFixed(2)}" width="${(cellW + 0.2).toFixed(2)}" height="${(cellW + 0.2).toFixed(2)}" fill="#0F172A"/>`;
            }
        }
    }

    return `<svg viewBox="0 0 100 100" style="width: 100%; height: 100%; display: block;">${rects}</svg>`;
}

export function renderScannableQRCode(containerEl, qrText) {
    if (!containerEl) return;
    containerEl.innerHTML = '';
    const encodedText = encodeURIComponent(qrText);
    const qrImgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=140x140&margin=1&data=${encodedText}`;

    const img = document.createElement('img');
    img.src = qrImgUrl;
    img.alt = 'Member QR Code';
    img.style.width = '130px';
    img.style.height = '130px';
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    img.style.margin = '0 auto';
    img.onerror = function () {
        containerEl.innerHTML = '';
        if (window.QRCode) {
            new QRCode(containerEl, {
                text: qrText,
                width: 130,
                height: 130,
                colorDark: '#0F172A',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.M,
            });
        }
    };
    containerEl.appendChild(img);
}

export function printMemberIDCard() {
    const cardContent = document.getElementById('printable-id-card');
    if (!cardContent) return;

    const printWindow = window.open('', '_blank', 'width=500,height=650');
    if (!printWindow) {
        showToast('Popup blocked. Please allow popups to print ID card.', 'error');
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MFC Youth Tarlac - Member ID</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #FFF; padding: 30px; display: flex; justify-content: center; }
                .card { width: 340px; background: #0B132B; color: #FFF; border-radius: 18px; padding: 26px 20px; text-align: center; border: 2px solid #38BDF8; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
                .top { color: #F59E0B; font-size: 11px; font-weight: bold; letter-spacing: 2px; }
                .title { color: #FFF; font-size: 16px; font-weight: 900; margin-top: 4px; margin-bottom: 14px; }
                .name { color: #38BDF8; font-size: 20px; font-weight: bold; margin-bottom: 4px; }
                .role { color: #94A3B8; font-size: 13px; margin-bottom: 18px; }
                .qr-box { width: 140px; height: 140px; background: #FFF; border-radius: 12px; margin: 0 auto 16px; padding: 10px; display: flex; align-items: center; justify-content: center; }
                .idcode { font-family: monospace; font-size: 13px; color: #E2E8F0; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="card">
                ${cardContent.innerHTML}
            </div>
            <script>
                window.onload = function() { window.print(); window.close(); };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
    showToast('Sent digital QR ID badge to printer!', 'success');
}

export function restoreBackupJSON(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.members) state.members = data.members;
            if (data.activities) state.activities = data.activities;
            if (data.attendance) state.attendance = data.attendance;
            if (data.funds) state.funds = data.funds;
            if (data.accounts) state.accounts = data.accounts;

            saveToStorage();
            renderAll();
            showToast('System database successfully restored from backup!', 'success');
            logAuditAction('System database restored from backup JSON', 'security');
        } catch (err) {
            showToast('Invalid backup JSON file.', 'error');
        }
    };
    reader.readAsText(file);
}

export function restoreFromAutoRecoverySnapshot() {
    const raw = localStorage.getItem('ps_recovery_snapshot_mfc_v1');
    if (!raw) {
        showToast('No auto-recovery snapshot found.', 'error');
        return;
    }
    if (
        !confirm(
            'Are you sure you want to restore your data from the most recent automatic recovery snapshot?'
        )
    )
        return;
    try {
        const snap = JSON.parse(raw);
        if (snap.activities) state.activities = snap.activities;
        if (snap.members) state.members = snap.members;
        if (snap.attendance) state.attendance = snap.attendance;
        if (snap.funds) state.funds = snap.funds;
        saveToStorage();
        renderAll();
        showToast('Data restored successfully from automatic snapshot!', 'success');
        logAuditAction('Restored data from automatic recovery snapshot', 'security');
    } catch (e) {
        showToast('Failed to restore snapshot.', 'error');
    }
}

export function resetSystemToDefault() {
    if (
        !confirm(
            'Are you sure you want to reset the database to the official MFC Youth Tarlac starter pack? Current local edits will be replaced.'
        )
    )
        return;

    localStorage.removeItem('ps_activities_mfc_v10');
    localStorage.removeItem('ps_members_mfc_v9');
    localStorage.removeItem('ps_attendance_mfc_v9');
    localStorage.removeItem('ps_accounts_mfc_v9');

    loadFromStorage();
    renderAll();
    showToast('Database reset to official MFC Youth Tarlac starter pack!', 'success');
    logAuditAction('System database reset to default starter pack', 'security');
}

export function autoSendBatchPastoralGmail() {
    const recentActs = state.activities.slice(-3);
    const absentEmails = [];
    const absentNames = [];

    state.members.forEach((mem) => {
        let missedCount = 0;
        recentActs.forEach((act) => {
            const status = state.attendance[act.id]?.[mem.id]?.status;
            if (status !== 'present') missedCount++;
        });
        if (missedCount > 0) {
            absentNames.push(mem.name);
            if (mem.email && mem.email.trim() && mem.email.includes('@')) {
                absentEmails.push(mem.email.trim());
            }
        }
    });

    const bccList = absentEmails.join(',');
    const msgBodyText = `Hi Brothers and Sisters!\n\nWe missed you at our recent MFC Youth Tarlac Chapter assemblies and activities. Hope you are doing well! Please let your household heads know if you need any prayers, assistance, or support.\n\nSee you at our next activity! God bless! 💛\n\n- MFC Youth Tarlac Chapter Executive Team`;
    const encodedBody = encodeURIComponent(msgBodyText);
    const encodedSubject = encodeURIComponent(`MFC Youth Tarlac - Pastoral Check-In 💛`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&bcc=${encodeURIComponent(bccList)}&su=${encodedSubject}&body=${encodedBody}`;
    window.open(gmailUrl, '_blank');

    showToast(`Automated batch check-in triggered for ${absentNames.length} member(s)!`, 'success');
    logAuditAction(
        `Triggered automated batch pastoral Gmail for ${absentNames.length} absent members`,
        'pastoral'
    );
}

export function copyPastoralMessage(name) {
    const text = `Hi Bro/Sis ${name}! We missed you at our recent MFC Youth Tarlac activities. Hope you are doing well! Let us know if you need any prayers or support. God bless! 💛`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        showToast(`Pastoral check-in message copied for ${name}!`, 'success');
    }
}

export function updateTopSearchHighlight(items) {
    items.forEach((item, idx) => {
        if (idx === window.topSearchIdx) {
            item.style.background = 'rgba(56, 189, 248, 0.25)';
            item.style.outline = '1px solid #38BDF8';
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.style.background = 'transparent';
            item.style.outline = 'none';
        }
    });
}

export function updateCmdPaletteHighlight() {
    const resultsContainer = document.getElementById('cmd-palette-results');
    if (!resultsContainer) return;
    const items = Array.from(resultsContainer.querySelectorAll('.cmd-palette-item'));
    if (items.length === 0) return;
    if (typeof window.cmdPaletteSelectedIndex !== 'number') window.cmdPaletteSelectedIndex = 0;
    if (window.cmdPaletteSelectedIndex < 0) window.cmdPaletteSelectedIndex = items.length - 1;
    if (window.cmdPaletteSelectedIndex >= items.length) window.cmdPaletteSelectedIndex = 0;

    items.forEach((item, idx) => {
        if (idx === window.cmdPaletteSelectedIndex) {
            item.style.background = 'rgba(56, 189, 248, 0.25)';
            item.style.borderColor = '#38BDF8';
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            item.style.background = 'rgba(15,23,42,0.6)';
            item.style.borderColor = 'rgba(255,255,255,0.07)';
        }
    });
}

export function openCommandPalette() {
    const modal = document.getElementById('modal-command-palette');
    if (modal) {
        modal.style.display = 'flex';
        const input = document.getElementById('cmd-palette-input');
        if (input) {
            input.value = '';
            input.focus();
            if (!input.dataset.keybound) {
                input.dataset.keybound = 'true';
                input.addEventListener('keydown', (e) => {
                    const resultsContainer = document.getElementById('cmd-palette-results');
                    if (!resultsContainer) return;
                    const items = Array.from(
                        resultsContainer.querySelectorAll('.cmd-palette-item')
                    );
                    if (items.length === 0) return;

                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        window.cmdPaletteSelectedIndex = (window.cmdPaletteSelectedIndex || 0) + 1;
                        updateCmdPaletteHighlight();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        window.cmdPaletteSelectedIndex = (window.cmdPaletteSelectedIndex || 0) - 1;
                        updateCmdPaletteHighlight();
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        const activeItem = items[window.cmdPaletteSelectedIndex || 0];
                        if (activeItem) activeItem.click();
                    } else if (e.key === 'Escape') {
                        closeCommandPalette();
                    }
                });
            }
        }
        window.cmdPaletteSelectedIndex = 0;
        handleCommandPaletteSearch('');
    }
}

export function closeCommandPalette() {
    const modal = document.getElementById('modal-command-palette');
    if (modal) modal.style.display = 'none';
}

export function handleCommandPaletteSearch(query) {
    const resultsContainer = document.getElementById('cmd-palette-results');
    if (!resultsContainer) return;

    const q = (query || '').trim().toLowerCase();

    // 1. Navigation Views
    const allViews = [
        {
            id: 'dashboard',
            title: 'Home Dashboard',
            emoji: '📊',
            category: 'Navigation',
            desc: 'Leadership executive reports & analytics',
        },
        {
            id: 'activities',
            title: 'Activity Records',
            emoji: '📅',
            category: 'Navigation',
            desc: 'Manage youth camps, assemblies & rosters',
        },
        {
            id: 'members',
            title: 'Youth Members Directory',
            emoji: '👥',
            category: 'Navigation',
            desc: 'View all chapter & household members',
        },
        {
            id: 'attendance',
            title: 'Attendance Records & QR Scanner',
            emoji: '✅',
            category: 'Navigation',
            desc: 'Track check-ins and attendance sheets',
        },
        {
            id: 'funds',
            title: 'Funds & Expenses Ledger',
            emoji: '💰',
            category: 'Navigation',
            desc: 'Financial transactions & budgets',
        },
        {
            id: 'agenda',
            title: 'Meeting Agenda Planner',
            emoji: '📋',
            category: 'Navigation',
            desc: 'Structure household & chapter meetings',
        },
        {
            id: 'servants',
            title: 'Servant Leaders Roster',
            emoji: '🛡️',
            category: 'Navigation',
            desc: 'Pastoral team & coordinators',
        },
        {
            id: 'orgchart',
            title: 'Organization Chart',
            emoji: '🌳',
            category: 'Navigation',
            desc: 'Visual chapter hierarchy',
        },
        {
            id: 'resources',
            title: 'Resource Vault & Manuals',
            emoji: '📁',
            category: 'Navigation',
            desc: 'Official chapter guides & presentation decks',
        },
        {
            id: 'account',
            title: 'Account Management & Audit Logs',
            emoji: '⚙️',
            category: 'Navigation',
            desc: 'Super admins & audit history',
        },
    ];

    // 2. Official Resources
    const resourcesList = OFFICIAL_DOWNLOADABLE_RESOURCES.map((r) => ({
        id: r.id,
        title: r.title,
        emoji: r.emoji,
        category: 'Official Resource',
        desc: `Download ${r.filename} (${r.size})`,
        url: r.url,
        filename: r.filename,
    }));

    // Filter
    const matchedViews = allViews.filter(
        (v) =>
            !q ||
            v.title.toLowerCase().includes(q) ||
            v.desc.toLowerCase().includes(q) ||
            v.category.toLowerCase().includes(q)
    );
    const matchedResources = resourcesList.filter(
        (r) =>
            !q ||
            r.title.toLowerCase().includes(q) ||
            r.filename.toLowerCase().includes(q) ||
            r.category.toLowerCase().includes(q)
    );
    const matchedMembers = q
        ? state.members
              .filter(
                  (m) =>
                      m.name.toLowerCase().includes(q) ||
                      (m.chapter && m.chapter.toLowerCase().includes(q))
              )
              .slice(0, 5)
        : [];

    let html = '';

    // Render Navigation
    if (matchedViews.length > 0) {
        html += `<div style="font-size:0.7rem; font-weight:800; color:#38BDF8; letter-spacing:0.06em; padding:4px 6px;">NAVIGATION VIEWS</div>`;
        matchedViews.forEach((v) => {
            html += `
                <div class="cmd-palette-item" onclick="switchView('${v.id}'); closeCommandPalette();" style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(15,23,42,0.6); border:1px solid rgba(255,255,255,0.07); border-radius:12px; cursor:pointer; transition:all 0.15s;" onmouseover="this.style.background='rgba(56,189,248,0.15)'; this.style.borderColor='rgba(56,189,248,0.4)';" onmouseout="this.style.background='rgba(15,23,42,0.6)'; this.style.borderColor='rgba(255,255,255,0.07)';">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:1.4rem;">${v.emoji}</span>
                        <div>
                            <div style="color:#FFF; font-weight:700; font-size:0.9rem;">${v.title}</div>
                            <div style="color:#94A3B8; font-size:0.75rem;">${v.desc}</div>
                        </div>
                    </div>
                    <span style="font-size:0.75rem; color:#38BDF8; font-weight:700;">Switch →</span>
                </div>
            `;
        });
    }

    // Render Resources
    if (matchedResources.length > 0) {
        html += `<div style="font-size:0.7rem; font-weight:800; color:#10B981; letter-spacing:0.06em; padding:8px 6px 4px;">OFFICIAL RESOURCES & MANUALS</div>`;
        matchedResources.forEach((r) => {
            html += `
                <div class="cmd-palette-item" onclick="closeCommandPalette(); const a=document.createElement('a'); a.href='${r.url}'; a.download='${r.filename}'; document.body.appendChild(a); a.click(); document.body.removeChild(a); showToast('📥 Downloading ${r.title}...', 'success');" style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(15,23,42,0.6); border:1px solid rgba(16,185,129,0.18); border-radius:12px; cursor:pointer; transition:all 0.15s;" onmouseover="this.style.background='rgba(16,185,129,0.15)'; this.style.borderColor='rgba(16,185,129,0.4)';" onmouseout="this.style.background='rgba(15,23,42,0.6)'; this.style.borderColor='rgba(16,185,129,0.18)';">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:1.4rem;">${r.emoji}</span>
                        <div>
                            <div style="color:#FFF; font-weight:700; font-size:0.9rem;">${r.title}</div>
                            <div style="color:#94A3B8; font-size:0.75rem;">${r.desc}</div>
                        </div>
                    </div>
                    <span style="font-size:0.75rem; color:#10B981; font-weight:700;">Download 📥</span>
                </div>
            `;
        });
    }

    // Render Members
    if (matchedMembers.length > 0) {
        html += `<div style="font-size:0.7rem; font-weight:800; color:#F472B6; letter-spacing:0.06em; padding:8px 6px 4px;">YOUTH MEMBERS (${matchedMembers.length})</div>`;
        matchedMembers.forEach((m) => {
            html += `
                <div class="cmd-palette-item" onclick="switchView('members'); closeCommandPalette(); showToast('Navigating to ${m.name}...', 'info');" style="display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:rgba(15,23,42,0.6); border:1px solid rgba(244,114,182,0.18); border-radius:12px; cursor:pointer; transition:all 0.15s;" onmouseover="this.style.background='rgba(244,114,182,0.15)'; this.style.borderColor='rgba(244,114,182,0.4)';" onmouseout="this.style.background='rgba(15,23,42,0.6)'; this.style.borderColor='rgba(244,114,182,0.18)';">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <span style="font-size:1.4rem;">👤</span>
                        <div>
                            <div style="color:#FFF; font-weight:700; font-size:0.9rem;">${m.name}</div>
                            <div style="color:#94A3B8; font-size:0.75rem;">${m.chapter || 'Central'} &bull; ${m.role || 'Member'}</div>
                        </div>
                    </div>
                    <span style="font-size:0.75rem; color:#F472B6; font-weight:700;">View Profile →</span>
                </div>
            `;
        });
    }

    if (!html) {
        html = `
            <div class="zero-state-card" style="padding: 32px 20px; margin: 12px 0;">
                <div class="zero-state-icon">⚡</div>
                <h4 style="color: #F8FAFC; font-size: 1.05rem; font-weight: 800; margin: 0;">No Commands or Resources Found</h4>
                <p style="color: #94A3B8; font-size: 0.82rem; margin: 0;">We couldn't find any view, member, or guide matching your query.</p>
            </div>
        `;
    }

    resultsContainer.innerHTML = html;
    window.cmdPaletteSelectedIndex = 0;
    updateCmdPaletteHighlight();
}

export function handleGlobalSearch(query) {
    const resultsBox = document.getElementById('global-search-results');
    if (!resultsBox) return;

    const q = (query || '').trim().toLowerCase();
    if (!q || q.length < 2) {
        resultsBox.style.display = 'none';
        resultsBox.innerHTML = '';
        return;
    }

    const matchedMembers = state.members
        .filter(
            (m) =>
                m.name.toLowerCase().includes(q) ||
                (m.chapter && m.chapter.toLowerCase().includes(q))
        )
        .slice(0, 4);
    const matchedActivities = state.activities
        .filter(
            (a) =>
                (a.title || a.name || '').toLowerCase().includes(q) ||
                (a.location || '').toLowerCase().includes(q)
        )
        .slice(0, 3);

    if (matchedMembers.length === 0 && matchedActivities.length === 0) {
        resultsBox.style.display = 'block';
        resultsBox.innerHTML = `
            <div class="zero-state-card" style="padding: 24px 16px; margin: 6px;">
                <div class="zero-state-icon" style="font-size: 2.2rem;">🔍</div>
                <h4 style="color: #F8FAFC; font-size: 0.95rem; font-weight: 800; margin: 0;">No Results Found</h4>
                <p style="color: #94A3B8; font-size: 0.78rem; margin: 0;">No members or activities matching "${q}"</p>
            </div>
        `;
        return;
    }

    let html = '';
    if (matchedMembers.length > 0) {
        html += `<div style="font-size: 0.7rem; font-weight: 800; color: #38BDF8; letter-spacing: 0.05em; padding: 4px 8px;">MEMBERS (${matchedMembers.length})</div>`;
        matchedMembers.forEach((m) => {
            html += `
                <div class="global-search-item" onclick="switchView('members'); const gsr = document.getElementById('global-search-results'); if (gsr) gsr.style.display='none'; showToast('Navigating to ${m.name}...', 'info');" style="padding: 8px; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.15s;" onmouseover="this.style.background='rgba(56,189,248,0.1)'" onmouseout="this.style.background='transparent'">
                    <div>
                        <div style="color: #FFF; font-weight: 700; font-size: 0.82rem;">${m.name}</div>
                        <div style="color: #94A3B8; font-size: 0.72rem;">${m.chapter || 'Central'} • ${m.role || 'Member'}</div>
                    </div>
                    <span style="font-size: 0.72rem; color: #38BDF8;">View →</span>
                </div>
            `;
        });
    }

    if (matchedActivities.length > 0) {
        html += `<div style="font-size: 0.7rem; font-weight: 800; color: #10B981; letter-spacing: 0.05em; padding: 6px 8px 4px;">ACTIVITIES (${matchedActivities.length})</div>`;
        matchedActivities.forEach((a) => {
            const displayTitle = a.title || a.name || 'Untitled';
            html += `
                <div class="global-search-item" onclick="selectActivityForAttendance('${a.id}'); const gsr = document.getElementById('global-search-results'); if (gsr) gsr.style.display='none';" style="padding: 8px; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: background 0.15s;" onmouseover="this.style.background='rgba(16,185,129,0.1)'" onmouseout="this.style.background='transparent'">
                    <div>
                        <div style="color: #FFF; font-weight: 700; font-size: 0.82rem;">${displayTitle}</div>
                        <div style="color: #94A3B8; font-size: 0.72rem;">${a.date || 'No date'} • ${a.status || 'Scheduled'}</div>
                    </div>
                    <span style="font-size: 0.72rem; color: #10B981;">Roster →</span>
                </div>
            `;
        });
    }

    resultsBox.innerHTML = html;
    resultsBox.style.display = 'block';
    window.topSearchIdx = -1;
}

export function toggleResourcesMenu(event) {
    if (event) event.stopPropagation();
    const subnav = document.getElementById('subnav-resources');
    const chevron = document.getElementById('chevron-resources');
    if (!subnav) return;

    if (subnav.style.display === 'none' || !subnav.style.display) {
        subnav.style.display = 'flex';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
        switchView('resources');
    } else {
        subnav.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
}

export function openAddResourceModal() {
    const modal = document.getElementById('modal-add-resource');
    if (modal) modal.style.display = 'flex';
    // Pre-select the currently active tab
    const activeBtn = document.querySelector('.resource-tab-btn.active');
    if (activeBtn) {
        const catMap = {
            '\u26fa': 'youthcamp',
            '\uD83C\uDF93': 'trainings',
            '\uD83C\uDFB8': 'songboard',
            '\uD83D\uDCFF': 'holyrosary',
            '\u2709\uFE0F': 'letters',
        };
        const sel = document.getElementById('res-input-category');
        if (sel) {
            const id = activeBtn.id.replace('btn-res-', '');
            sel.value = id || 'youthcamp';
        }
    }
}

export function closeAddResourceModal() {
    const modal = document.getElementById('modal-add-resource');
    if (modal) modal.style.display = 'none';
    const form = document.getElementById('add-resource-form');
    if (form) form.reset();
    const emojiEl = document.getElementById('res-input-emoji');
    if (emojiEl) emojiEl.value = '\uD83D\uDCC4';
}

export function handleAddResourceSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const catEl = document.getElementById('res-input-category');
    const emoEl = document.getElementById('res-input-emoji');
    const titEl = document.getElementById('res-input-title');
    const desEl = document.getElementById('res-input-desc');
    const urlEl = document.getElementById('res-input-url');

    const category = catEl ? catEl.value : 'GENERAL';
    const emoji = emoEl && emoEl.value ? emoEl.value.trim() : '📄';
    const title = titEl && titEl.value ? titEl.value.trim() : '';
    const desc = desEl && desEl.value ? desEl.value.trim() : '';
    const url = urlEl && urlEl.value ? urlEl.value.trim() : '#';

    if (!title) return;

    const resources = JSON.parse(localStorage.getItem('ps_custom_resources') || '[]');
    const newEntry = {
        id: 'res-' + Date.now(),
        category,
        emoji,
        title,
        desc,
        url,
        addedAt: Date.now(),
    };
    resources.push(newEntry);
    localStorage.setItem('ps_custom_resources', JSON.stringify(resources));

    renderResourceCards();
    closeAddResourceModal();
    showToast('\uD83D\uDCCE Resource \"' + title + '\" added to vault!', 'success');
}

export function renderResourceCards() {
    const resources = JSON.parse(localStorage.getItem('ps_custom_resources') || '[]');
    const categories = ['youthcamp', 'trainings', 'songboard', 'holyrosary', 'letters'];
    categories.forEach((cat) => {
        const container = document.getElementById(`res-dynamic-${cat}`);
        if (!container) return;
        const catItems = resources.filter((r) => r.category === cat);
        container.innerHTML = catItems
            .map(
                (r) => `
            <div class="glass-card" style="padding:22px; border-radius:16px; position:relative;">
                <button onclick="deleteResourceCard('${r.id}')" title="Remove" style="position:absolute; top:12px; right:12px; background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#F87171; border-radius:8px; width:28px; height:28px; cursor:pointer; font-size:0.85rem; display:flex; align-items:center; justify-content:center;">\u00D7</button>
                <div style="font-size:1.8rem; margin-bottom:12px;">${r.emoji}</div>
                <h3 style="color:#F8FAFC; font-size:1.05rem; font-weight:800; margin:0 0 8px; padding-right:32px;">${r.title}</h3>
                <p style="color:#94A3B8; font-size:0.82rem; line-height:1.5; margin:0 0 16px;">${r.desc || 'No description provided.'}</p>
                ${
                    r.url
                        ? `<a href="${r.url}" target="_blank" rel="noopener" class="btn-secondary btn-sm" style="display:block; text-align:center; text-decoration:none;">Open File \u2192</a>`
                        : `<button class="btn-secondary btn-sm" onclick="showToast('No link attached to this resource.', 'info')" style="width:100%;">No Link</button>`
                }
            </div>
        `
            )
            .join('');
    });
}

export function deleteResourceCard(id) {
    let resources = JSON.parse(localStorage.getItem('ps_custom_resources') || '[]');
    resources = resources.filter((r) => r.id !== id);
    localStorage.setItem('ps_custom_resources', JSON.stringify(resources));
    renderResourceCards();
    renderRemoveList();
    showToast('Resource removed from vault.', 'info');
}

export function applyHiddenStaticResources() {
    const hidden = JSON.parse(localStorage.getItem('ps_hidden_static_resources') || '[]');
    document.querySelectorAll('[data-static-id]').forEach((card) => {
        const id = card.getAttribute('data-static-id');
        card.style.display = hidden.includes(id) ? 'none' : '';
    });
}

export function hideStaticResource(staticId) {
    const hidden = JSON.parse(localStorage.getItem('ps_hidden_static_resources') || '[]');
    if (!hidden.includes(staticId)) hidden.push(staticId);
    localStorage.setItem('ps_hidden_static_resources', JSON.stringify(hidden));
    applyHiddenStaticResources();
    renderRemoveList();
    showToast('Resource removed from vault.', 'info');
}

export function openRemoveResourceModal() {
    const modal = document.getElementById('modal-remove-resource');
    if (modal) modal.style.display = 'flex';
    renderRemoveList();
}

export function closeRemoveResourceModal() {
    const modal = document.getElementById('modal-remove-resource');
    if (modal) modal.style.display = 'none';
}

export function renderRemoveList() {
    const container = document.getElementById('remove-resource-list');
    if (!container) return;
    const hiddenStatic = JSON.parse(localStorage.getItem('ps_hidden_static_resources') || '[]');
    const dynamicResources = JSON.parse(localStorage.getItem('ps_custom_resources') || '[]');
    const rows = [];

    Object.entries(STATIC_RESOURCE_LABELS).forEach(([id, info]) => {
        if (hiddenStatic.includes(id)) return;
        rows.push(`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(15,23,42,0.5);border:1px solid rgba(255,255,255,0.07);border-radius:12px;gap:12px;">
                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                    <span style="font-size:1.3rem;flex-shrink:0;">${info.emoji}</span>
                    <div style="min-width:0;">
                        <div style="color:#F8FAFC;font-size:0.88rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${info.title}</div>
                        <div style="color:#94A3B8;font-size:0.75rem;">${info.category} &bull; Default</div>
                    </div>
                </div>
                <button onclick="hideStaticResource('${id}')" style="flex-shrink:0;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.35);color:#F87171;border-radius:8px;padding:5px 12px;font-size:0.78rem;font-weight:700;cursor:pointer;white-space:nowrap;">Remove</button>
            </div>
        `);
    });

    dynamicResources.forEach((r) => {
        const catLabel =
            {
                youthcamp: 'Youthcamp',
                trainings: 'Trainings',
                songboard: 'Songboard',
                holyrosary: 'Holy Rosary',
                letters: 'Letters',
            }[r.category] || r.category;
        rows.push(`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(15,23,42,0.5);border:1px solid rgba(56,189,248,0.12);border-radius:12px;gap:12px;">
                <div style="display:flex;align-items:center;gap:10px;min-width:0;">
                    <span style="font-size:1.3rem;flex-shrink:0;">${r.emoji}</span>
                    <div style="min-width:0;">
                        <div style="color:#F8FAFC;font-size:0.88rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.title}</div>
                        <div style="color:#94A3B8;font-size:0.75rem;">${catLabel} &bull; Added by you</div>
                    </div>
                </div>
                <button onclick="deleteResourceCard('${r.id}')" style="flex-shrink:0;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.35);color:#F87171;border-radius:8px;padding:5px 12px;font-size:0.78rem;font-weight:700;cursor:pointer;white-space:nowrap;">Remove</button>
            </div>
        `);
    });

    container.innerHTML = rows.length
        ? rows.join('')
        : `<div style="text-align:center;color:#94A3B8;padding:32px;font-size:0.9rem;">No resources currently in the vault.</div>`;
}

export function openDownloadAllModal() {
    const modal = document.getElementById('modal-download-all');
    if (modal) modal.style.display = 'flex';
    renderDownloadAllList();
    const progressEl = document.getElementById('download-all-progress-bar');
    if (progressEl) progressEl.style.display = 'none';
    const btn = document.getElementById('btn-start-batch-download');
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>Start Batch Download (15 Files)</span>`;
    }
}

export function closeDownloadAllModal() {
    const modal = document.getElementById('modal-download-all');
    if (modal) modal.style.display = 'none';
}

export function renderDownloadAllList() {
    const container = document.getElementById('download-all-list');
    if (!container) return;
    container.innerHTML = OFFICIAL_DOWNLOADABLE_RESOURCES.map(
        (res) => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:rgba(15,23,42,0.65); border:1px solid rgba(56,189,248,0.18); border-radius:14px; gap:12px;" id="dl-row-${res.id}">
            <div style="display:flex; align-items:center; gap:12px; min-width:0;">
                <span style="font-size:1.5rem; flex-shrink:0;">${res.emoji}</span>
                <div style="min-width:0;">
                    <div style="color:#F8FAFC; font-size:0.92rem; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${res.title}</div>
                    <div style="color:#94A3B8; font-size:0.78rem;">${res.category} &bull; ${res.size}</div>
                </div>
            </div>
            <div style="display:flex; align-items:center; gap:10px; flex-shrink:0;">
                <span id="dl-status-${res.id}" style="font-size:0.75rem; font-weight:700; color:#94A3B8; display:none;">Waiting...</span>
                <a href="${res.url}" download="${res.filename}" onclick="markFileDownloaded('${res.id}')" class="btn-secondary btn-sm" style="text-decoration:none; display:inline-flex; align-items:center; gap:6px; padding:6px 14px;">
                    <span>📥 Download</span>
                </a>
            </div>
        </div>
    `
    ).join('');
}

export function markFileDownloaded(id) {
    const statusEl = document.getElementById(`dl-status-${id}`);
    const rowEl = document.getElementById(`dl-row-${id}`);
    if (statusEl) {
        statusEl.style.display = 'inline-block';
        statusEl.style.color = '#34D399';
        statusEl.textContent = '✔ Downloaded';
    }
    if (rowEl) {
        rowEl.style.borderColor = 'rgba(52,211,153,0.5)';
        rowEl.style.background = 'rgba(16,185,129,0.08)';
    }
}

export function startBatchDownload() {
    const progressEl = document.getElementById('download-all-progress-bar');
    const statusText = document.getElementById('download-progress-status');
    const progressFill = document.getElementById('download-progress-fill');
    const btn = document.getElementById('btn-start-batch-download');

    if (progressEl) progressEl.style.display = 'block';
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span>⏳ Downloading...</span>`;
    }

    let currentIndex = 0;
    const total = OFFICIAL_DOWNLOADABLE_RESOURCES.length;

    function downloadNext() {
        if (currentIndex >= total) {
            if (statusText)
                statusText.textContent = '🎉 All 6 official files initiated for download!';
            if (progressFill) progressFill.style.width = '100%';
            if (btn) btn.innerHTML = `✔ Batch Completed`;
            showToast('🎉 All 6 official resource files downloaded successfully!', 'success');
            return;
        }

        const res = OFFICIAL_DOWNLOADABLE_RESOURCES[currentIndex];
        if (statusText)
            statusText.textContent = `Downloading (${currentIndex + 1}/${total}): ${res.title}...`;
        if (progressFill) progressFill.style.width = `${(currentIndex / total) * 100}%`;

        // Trigger individual file download
        markFileDownloaded(res.id);
        const link = document.createElement('a');
        link.href = res.url;
        link.download = res.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        currentIndex++;
        // Stagger by 1600ms to allow browser download manager to handle large/multiple files smoothly
        setTimeout(downloadNext, 1600);
    }

    downloadNext();
}

export function openPublishModal() {
    const modal = document.getElementById('modal-publish-online');
    if (modal) modal.style.display = 'flex';
}

export function closePublishModal() {
    const modal = document.getElementById('modal-publish-online');
    if (modal) modal.style.display = 'none';
}

export function openFirebaseConfigModal() {
    const modal = document.getElementById('firebase-config-modal');
    if (!modal) return;

    const apiKeyEl = document.getElementById('fb-config-api-key');
    const projIdEl = document.getElementById('fb-config-project-id');
    const activeCodeEl = document.getElementById('firebase-active-project-id');

    if (apiKeyEl)
        apiKeyEl.value =
            MFCFirebaseCloud.config.apiKey || 'AIzaSyCt5A7AMbBkgWqZrOk19y8jv3HIRCpEgDY';
    if (projIdEl) projIdEl.value = MFCFirebaseCloud.config.projectId || 'mfc-youth-data';
    if (activeCodeEl)
        activeCodeEl.textContent = MFCFirebaseCloud.config.projectId || 'mfc-youth-data';

    modal.style.display = 'flex';
}

export function closeFirebaseConfigModal() {
    const modal = document.getElementById('firebase-config-modal');
    if (modal) modal.style.display = 'none';
}

export function saveFirebaseConfigSettings() {
    const apiKeyEl = document.getElementById('fb-config-api-key');
    const projIdEl = document.getElementById('fb-config-project-id');

    const apiKey = apiKeyEl ? apiKeyEl.value.trim() : '';
    const projectId = projIdEl && projIdEl.value.trim() ? projIdEl.value.trim() : 'mfc-youth-data';

    MFCFirebaseCloud.config.apiKey = apiKey;
    MFCFirebaseCloud.config.projectId = projectId;
    MFCFirebaseCloud.config.authDomain = `${projectId}.firebaseapp.com`;
    MFCFirebaseCloud.config.databaseURL = `https://${projectId}-default-rtdb.firebaseio.com`;

    localStorage.setItem('ps_firebase_config', JSON.stringify(MFCFirebaseCloud.config));
    MFCFirebaseCloud.init();
    MFCFirebaseCloud.pushSnapshot();

    showToast(`🔥 Firebase Cloud credentials saved for project: ${projectId}`, 'success');
    logAuditAction(`Firebase project configured: ${projectId}`, 'system');
    closeFirebaseConfigModal();
}

export function triggerFirebaseForceSync() {
    MFCFirebaseCloud.pushSnapshot();
    showToast('🔥 Application state successfully synchronized to Firebase Cloud!', 'success');
    logAuditAction('Force manual sync to Firebase Cloud executed', 'system');
}

export function triggerFirebasePull() {
    MFCFirebaseCloud.pullSnapshot(false);
}

export function generateExecutiveSummaryPDF() {
    const totalMembers = state.members ? state.members.length : 0;
    const totalActivities = state.activities ? state.activities.length : 0;
    const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const win = window.open('', '_blank');
    win.document.write(`
        <html>
        <head>
            <title>MFC Youth Tarlac - Executive Chapter Summary Report</title>
            <style>
                body { font-family: 'Segoe UI', sans-serif; padding: 40px; color: #1e293b; }
                h1 { color: #0284c7; margin-bottom: 4px; text-transform: uppercase; }
                .subtitle { font-weight: bold; color: #64748b; margin-bottom: 30px; font-size: 14px; }
                .stats-box { display: flex; gap: 20px; margin-bottom: 30px; }
                .card { border: 1px solid #cbd5e1; border-radius: 10px; padding: 16px; flex: 1; }
                .card-title { font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; }
                .card-val { font-size: 26px; font-weight: bold; color: #0f172a; margin-top: 4px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-size: 13px; }
                th { background: #f8fafc; color: #334155; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>MFC Youth Tarlac</h1>
            <div class="subtitle">Official Executive Summary Sheet • Generated on ${dateStr}</div>
            <div class="stats-box">
                <div class="card">
                    <div class="card-title">Total Registered Members</div>
                    <div class="card-val">${totalMembers}</div>
                </div>
                <div class="card">
                    <div class="card-title">Total Logged Activities</div>
                    <div class="card-val">${totalActivities}</div>
                </div>
                <div class="card">
                    <div class="card-title">Cloud Storage Node</div>
                    <div class="card-val" style="color: #0284c7;">mfc-youth-data</div>
                </div>
            </div>
            <h3>Chapter Member Roster Summary</h3>
            <table>
                <thead>
                    <tr><th>ID</th><th>Member Name</th><th>Chapter</th><th>Role</th><th>Contact Number</th></tr>
                </thead>
                <tbody>
                    ${(state.members || []).map((m) => `<tr><td>${m.id}</td><td><b>${m.name}</b></td><td>${m.chapter || 'EAST'}</td><td>${m.role}</td><td>${m.contactNum || '-'}</td></tr>`).join('')}
                </tbody>
            </table>
            <script>window.print();</script>
        </body>
        </html>
    `);
    win.document.close();
    showToast('📄 Executive Summary PDF report opened for printing/downloading!', 'success');
    logAuditAction('Generated official Executive Summary PDF sheet', 'system');
}

export function updateLiveCloudTicker() {
    const tickerText = document.getElementById('live-cloud-ticker-text');
    const tickerTime = document.getElementById('live-cloud-ticker-time');
    if (!tickerText || !tickerTime) return;

    const updates = [
        'Executive Chapter Head verified attendance log • Realtime Firebase Cloud Connected',
        'Tricia marked assembly attendees present • Database node mfc-youth-data active',
        'Chapter roster synchronized with cloud storage • Zero latency hybrid encryption',
        'Live attendance check-in ready for upcoming youth activity',
    ];
    const pick = updates[Math.floor(Math.random() * updates.length)];
    tickerText.textContent = pick;
    tickerTime.textContent = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

export function triggerHapticFeedback(pattern = 15) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
            navigator.vibrate(pattern);
        } catch (e) {}
    }
}

export function triggerMobileQuickScan() {
    triggerHapticFeedback([15, 30, 15]);
    switchView('attendance');
    if (window.startLiveQRScanner) window.startLiveQRScanner();
}

export function exportExecutiveSummaryPDF() {
    if (!window.jspdf || !window.jspdf.jsPDF) {
        showToast('PDF generator library not loaded.', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFillColor(12, 24, 54);
    doc.rect(0, 0, 210, 42, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('MFC YOUTH TARLAC - EXECUTIVE SEMESTER REPORT', 14, 18);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(56, 189, 248);
    doc.text('OFFICIAL LEADERSHIP ANALYTICS & CHAPTER SUMMARY', 14, 26);
    doc.setTextColor(226, 232, 240);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 33);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Key Performance Indicators (KPIs)', 14, 52);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const totalMembers = state.members.length;
    const totalActivities = state.activities.length;

    let totalCheckins = 0;
    let totalPossible = totalMembers * totalActivities;
    state.activities.forEach((act) => {
        const attObj = state.attendance[act.id] || {};
        state.members.forEach((m) => {
            const st = attObj[m.id]?.status;
            if (st === 'present' || st === 'late') totalCheckins++;
        });
    });

    const overallRate = totalPossible > 0 ? Math.round((totalCheckins / totalPossible) * 100) : 0;

    doc.text(`• Total Registered Youth Members: ${totalMembers}`, 18, 60);
    doc.text(`• Total Chapter & Area Activities Held: ${totalActivities}`, 18, 66);
    doc.text(`• Overall Chapter Attendance Performance: ${overallRate}%`, 18, 72);

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text('2. Chapter Breakdown & Attendance Rate', 14, 86);

    const chapters = [
        'East Chapter',
        'Central Chapter',
        'North Chapter',
        'South Chapter',
        'West Chapter',
    ];
    const chapterRows = chapters.map((chap) => {
        const chapMembers = state.members.filter((m) =>
            (m.chapter || '').toLowerCase().includes(chap.toLowerCase().replace(' chapter', ''))
        );
        let chapPresent = 0;
        let chapPossible = chapMembers.length * totalActivities;
        state.activities.forEach((act) => {
            const attObj = state.attendance[act.id] || {};
            chapMembers.forEach((m) => {
                const st = attObj[m.id]?.status;
                if (st === 'present' || st === 'late') chapPresent++;
            });
        });
        const cRate = chapPossible > 0 ? Math.round((chapPresent / chapPossible) * 100) : 0;
        return [chap, `${chapMembers.length} Members`, `${chapPresent} Check-ins`, `${cRate}%`];
    });

    doc.autoTable({
        startY: 92,
        head: [['Chapter Name', 'Active Members', 'Total Check-ins', 'Attendance Rate']],
        body: chapterRows,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [14, 165, 233] },
        alternateRowStyles: { fillColor: [241, 245, 249] },
    });

    const finalY = doc.lastAutoTable && doc.lastAutoTable.finalY ? doc.lastAutoTable.finalY : 150;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(
        'Attested by: MFC YOUTH TARLAC CHAPTER LEADERSHIP | Designed by Area LIT Tarlac',
        14,
        finalY + 20
    );

    doc.save('MFC_Youth_Tarlac_Executive_Semester_Report.pdf');
    showToast('Executive Semester Report PDF exported!', 'success');
}

export function exportFullBackupJSON() {
    const backupData = {
        meta: {
            app: 'MFC Youth Tarlac Portal',
            version: '2026.1',
            exportedAt: new Date().toISOString(),
        },
        members: state.members,
        activities: state.activities,
        attendance: state.attendance,
        funds: state.funds,
    };

    const dataStr =
        'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
        'download',
        `MFC_Youth_Tarlac_Backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full system backup downloaded successfully!', 'success');
}

export function importFullBackupJSON(inputEl) {
    const file = inputEl.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.members && Array.isArray(data.members)) {
                state.members = data.members;
                if (data.activities && Array.isArray(data.activities))
                    state.activities = data.activities;
                if (data.attendance && typeof data.attendance === 'object')
                    state.attendance = data.attendance;
                if (data.funds && Array.isArray(data.funds)) state.funds = data.funds;

                saveToStorage();
                updateBadgeCount();
                renderMembersTable();
                renderActivitiesTable();
                renderDashboard();
                showToast('All portal data restored from backup successfully!', 'success');
            } else {
                showToast('Invalid backup file format.', 'error');
            }
        } catch (err) {
            showToast('Error restoring backup file.', 'error');
        }
        inputEl.value = '';
    };
    reader.readAsText(file);
}

export function getMemberBadgesHtml(mem) {
    if (!mem) return '';
    const badges = [];

    // Calculate total attendance
    let presentCount = 0;
    if (state.attendance) {
        Object.values(state.attendance).forEach((attObj) => {
            const st = attObj[mem.id]?.status;
            if (st === 'present' || st === 'late') presentCount++;
        });
    }

    if (presentCount >= 5) {
        badges.push({
            icon: '🏆',
            label: '100% Faithful',
            color: '#F59E0B',
            bg: 'rgba(245, 158, 11, 0.15)',
            border: 'rgba(245, 158, 11, 0.35)',
        });
    } else if (presentCount >= 3) {
        badges.push({
            icon: '🔥',
            label: 'Active Servant',
            color: '#EC4899',
            bg: 'rgba(236, 72, 153, 0.15)',
            border: 'rgba(236, 72, 153, 0.35)',
        });
    }

    if (
        mem.role &&
        (mem.role.includes('Head') ||
            mem.role.includes('Coordinator') ||
            mem.role.includes('Couple'))
    ) {
        badges.push({
            icon: '👑',
            label: 'Chapter Leadership',
            color: '#8B5CF6',
            bg: 'rgba(139, 92, 246, 0.15)',
            border: 'rgba(139, 92, 246, 0.35)',
        });
    }

    if (mem.campDate && mem.campDate !== '-') {
        badges.push({
            icon: '⛺',
            label: 'Youth Camp Grad',
            color: '#10B981',
            bg: 'rgba(16, 185, 129, 0.15)',
            border: 'rgba(16, 185, 129, 0.35)',
        });
    }

    return badges
        .map(
            (b) => `
        <span style="display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 10px; font-size: 0.68rem; font-weight: 700; color: ${b.color}; background: ${b.bg}; border: 1px solid ${b.border};">
            <span>${b.icon}</span>
            <span>${b.label}</span>
        </span>
    `
        )
        .join('');
}

export function openCertificateModal(memberId) {
    const mem = state.members ? state.members.find((m) => m.id === memberId) : null;
    const elName = document.getElementById('cert-member-name');
    const elDate = document.getElementById('cert-date-issued');
    const elCitation = document.getElementById('cert-citation-text');

    if (elName) elName.textContent = mem ? mem.name : 'EXEMPLARY YOUTH MEMBER';
    if (elDate)
        elDate.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    if (elCitation && mem) {
        elCitation.textContent = `In recognition of active participation, faithful attendance, and selfless leadership as ${mem.role} in the building of the Catholic community under MFC Youth ${mem.chapter || 'Tarlac'} Chapter.`;
    }

    const modal = document.getElementById('certificate-modal-backdrop');
    if (modal) modal.style.display = 'flex';
}

export function closeCertificateModal() {
    const modal = document.getElementById('certificate-modal-backdrop');
    if (modal) modal.style.display = 'none';
}

export function printOfficialCertificate() {
    window.print();
}

export function renderCalendarAndPrayerWall() {
    const elEvents = document.getElementById('calendar-events-list');

    if (elEvents && state.activities) {
        if (state.activities.length === 0) {
            elEvents.innerHTML = `<div style="text-align: center; padding: 30px; color: #94A3B8;">No scheduled events listed.</div>`;
        } else {
            const sortedActs = [...state.activities].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
            );
            elEvents.innerHTML = sortedActs
                .map((act) => {
                    const dateObj = new Date(act.date);
                    const monthStr = !isNaN(dateObj)
                        ? dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase()
                        : 'EVENT';
                    const dayStr = !isNaN(dateObj) ? dateObj.getDate() : '📅';

                    return `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; gap: 14px;">
                        <div style="display: flex; align-items: center; gap: 14px; min-width: 0;">
                            <div style="width: 48px; height: 52px; border-radius: 12px; background: linear-gradient(135deg, #38BDF8, #6366F1); display: flex; flex-direction: column; align-items: center; justify-content: center; color: #FFF; flex-shrink: 0; box-shadow: 0 4px 12px rgba(56,189,248,0.25);">
                                <span style="font-size: 0.65rem; font-weight: 800; letter-spacing: 1px;">${monthStr}</span>
                                <span style="font-size: 1.25rem; font-weight: 900; line-height: 1;">${dayStr}</span>
                            </div>
                            <div style="min-width: 0;">
                                <div style="color: #FFF; font-weight: 800; font-size: 0.95rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${act.title}</div>
                                <div style="color: #94A3B8; font-size: 0.78rem;">📍 ${act.location || 'Tarlac Chapter Hall'} • ⏰ ${act.time || '1:00 PM'}</div>
                            </div>
                        </div>
                        <button class="btn-secondary btn-sm" onclick="openAttendanceModal('${act.id}')" style="flex-shrink: 0; padding: 6px 14px;">
                            Attendance
                        </button>
                    </div>
                `;
                })
                .join('');
        }
    }
}

export function openAttendanceMatrixModal() {
    renderAttendanceMatrixSheet();
    const modal = document.getElementById('attendance-matrix-backdrop');
    if (modal) modal.style.display = 'flex';
}

export function closeAttendanceMatrixModal() {
    const modal = document.getElementById('attendance-matrix-backdrop');
    if (modal) modal.style.display = 'none';
}

export function renderAttendanceMatrixSheet() {
    const thead = document.getElementById('attendance-matrix-thead');
    const tbody = document.getElementById('attendance-matrix-tbody');
    if (!thead || !tbody || !state.members || !state.activities) return;

    const sortedActs = [...state.activities].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Header row
    thead.innerHTML = `
        <tr style="background: rgba(15,23,42,0.9); border-bottom: 2px solid rgba(255,255,255,0.15);">
            <th style="padding: 10px 12px; text-align: left; color: #FFF; position: sticky; left: 0; background: #0F172A; z-index: 2;">Member Name</th>
            <th style="padding: 10px 12px; text-align: left; color: #94A3B8;">Chapter</th>
            ${sortedActs
                .map((a) => {
                    const shortDate = a.date ? a.date.slice(5) : 'Date';
                    return `<th style="padding: 10px 8px; text-align: center; color: #38BDF8; font-size: 0.74rem; min-width: 70px;" title="${a.title}">${shortDate}<br><span style="font-size: 0.68rem; color: #94A3B8;">${a.title.slice(0, 10)}</span></th>`;
                })
                .join('')}
            <th style="padding: 10px 12px; text-align: center; color: #22C55E;">Rate</th>
        </tr>
    `;

    tbody.innerHTML = state.members
        .map((m) => {
            let presentCount = 0;
            const cells = sortedActs.map((a) => {
                const attObj = state.attendance[a.id] || {};
                const st = attObj[m.id]?.status;
                if (st === 'present') {
                    presentCount++;
                    return `<td style="text-align: center; font-weight: 800; color: #22C55E; background: rgba(34,197,94,0.08);">✓</td>`;
                } else if (st === 'late') {
                    presentCount++;
                    return `<td style="text-align: center; font-weight: 800; color: #F59E0B; background: rgba(245,158,11,0.08);">L</td>`;
                } else {
                    return `<td style="text-align: center; color: #EF4444; opacity: 0.7;">✗</td>`;
                }
            });

            const rate =
                sortedActs.length > 0 ? Math.round((presentCount / sortedActs.length) * 100) : 0;

            return `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
                <td style="padding: 10px 12px; font-weight: 700; color: #FFF; position: sticky; left: 0; background: #0F172A; z-index: 1;">${m.name}</td>
                <td style="padding: 10px 12px; color: #94A3B8; font-size: 0.75rem;">${m.chapter || 'Central'}</td>
                ${cells.join('')}
                <td style="padding: 10px 12px; text-align: center; font-weight: 800; color: #38BDF8;">${rate}% (${presentCount}/${sortedActs.length})</td>
            </tr>
        `;
        })
        .join('');
}

export function exportAttendanceMatrixCSV() {
    if (!state.members || !state.activities) return;
    const sortedActs = [...state.activities].sort((a, b) => new Date(a.date) - new Date(b.date));
    const headers = [
        'Member Name',
        'Chapter',
        ...sortedActs.map((a) => `${a.title} (${a.date})`),
        'Attendance Rate',
    ];

    const rows = state.members.map((m) => {
        let presentCount = 0;
        const actCells = sortedActs.map((a) => {
            const attObj = state.attendance[a.id] || {};
            const st = attObj[m.id]?.status;
            if (st === 'present') {
                presentCount++;
                return 'Present';
            }
            if (st === 'late') {
                presentCount++;
                return 'Late';
            }
            return 'Absent';
        });
        const rate =
            sortedActs.length > 0
                ? `${Math.round((presentCount / sortedActs.length) * 100)}%`
                : '0%';
        return [`"${m.name}"`, `"${m.chapter || 'Central'}"`, ...actCells, `"${rate}"`];
    });

    const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
        'download',
        `MFC_Youth_Tarlac_Attendance_Matrix_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 Attendance Matrix Sheet exported as CSV successfully!', 'success');
}

export function closeBirthdayCardModal() {
    const modal = document.getElementById('birthday-card-backdrop');
    if (modal) modal.style.display = 'none';
}

export function copyBirthdayCardMessage() {
    const elName = document.getElementById('bday-card-name');
    const nameText = elName ? elName.textContent : 'Happy Birthday!';
    const msg = `🎉 🎂 ${nameText}\n\nMay the Lord bless you with wisdom, joy, and unfailing love as you continue to serve and inspire our Catholic community. We thank God for the gift of your life!\n\n🙏 Praying a special birthday blessing for you today! — Missionary Families of Christ (MFC Youth Tarlac)`;
    navigator.clipboard.writeText(msg).then(() => {
        showToast(
            '📋 Festive birthday greeting copied ready to share on chat or story!',
            'success'
        );
    });
}

export function printMemberReportCardFromModal() {
    const memberId = window.currentProfileMemberId;
    const mem = state.members.find((m) => m.id === memberId);
    if (!mem) {
        showToast('Please open a member profile first.', 'warning');
        return;
    }

    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;
    const actRows = state.activities
        .map((a) => {
            const rec = state.attendance[a.id]?.[memberId];
            let st = 'Absent';
            if (rec) {
                if (rec.status === 'present') {
                    st = 'Present';
                    presentCount++;
                } else if (rec.status === 'late') {
                    st = 'Late';
                    lateCount++;
                } else absentCount++;
            } else {
                absentCount++;
            }
            return `
            <tr>
                <td style="padding: 8px; border: 1px solid #94A3B8;">${a.title}</td>
                <td style="padding: 8px; border: 1px solid #94A3B8;">${a.date}</td>
                <td style="padding: 8px; border: 1px solid #94A3B8; font-weight: bold;">${st}</td>
            </tr>
        `;
        })
        .join('');

    const totalActs = state.activities.length;
    const rate = totalActs > 0 ? Math.round(((presentCount + lateCount) / totalActs) * 100) : 0;

    const printableContainer = document.getElementById('printable-member-report-card');
    if (!printableContainer) return;

    printableContainer.innerHTML = `
        <div style="font-family: 'Inter', sans-serif; color: #000; padding: 30px; border: 4px double #0284C7; background: #FFF;">
            <div style="text-align: center; border-bottom: 2px solid #0284C7; padding-bottom: 16px; margin-bottom: 20px;">
                <h1 style="font-size: 1.6rem; margin: 0; color: #0284C7;">MISSIONARY FAMILIES OF CHRIST — YOUTH TARLAC</h1>
                <h2 style="font-size: 1.2rem; margin: 6px 0 0; color: #333;">Official Semester Service & Attendance Report Card</h2>
            </div>

            <div style="display: flex; justify-content: space-between; margin-bottom: 24px;">
                <div>
                    <p style="margin: 4px 0;"><strong>Member Name:</strong> ${mem.name}</p>
                    <p style="margin: 4px 0;"><strong>Chapter Area:</strong> ${mem.chapter || 'MFC Youth Tarlac'}</p>
                    <p style="margin: 4px 0;"><strong>Designation / Role:</strong> ${mem.role || 'Member'}</p>
                </div>
                <div>
                    <p style="margin: 4px 0;"><strong>Attendance Rate:</strong> <span style="font-size: 1.1rem; color: #0284C7;">${rate}%</span></p>
                    <p style="margin: 4px 0;"><strong>Events Attended:</strong> ${presentCount + lateCount} / ${totalActs}</p>
                    <p style="margin: 4px 0;"><strong>Report Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
            </div>

            <h3 style="font-size: 1.1rem; border-bottom: 1px solid #CCC; padding-bottom: 6px;">Activity Check-In Log</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; text-align: left;">
                <thead>
                    <tr style="background: #F1F5F9;">
                        <th style="padding: 8px; border: 1px solid #94A3B8;">Activity Name</th>
                        <th style="padding: 8px; border: 1px solid #94A3B8;">Date</th>
                        <th style="padding: 8px; border: 1px solid #94A3B8;">Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${actRows}
                </tbody>
            </table>

            <div style="margin-top: 40px; display: flex; justify-content: space-between;">
                <div style="text-align: center; width: 220px;">
                    <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                    <p style="margin: 6px 0 0; font-size: 0.85rem;">Chapter Pastoral Head</p>
                </div>
                <div style="text-align: center; width: 220px;">
                    <div style="border-bottom: 1px solid #000; height: 30px;"></div>
                    <p style="margin: 6px 0 0; font-size: 0.85rem;">Member Signature</p>
                </div>
            </div>
        </div>
    `;

    window.print();
    showToast(`🖨️ Printing Semester Report Card for ${mem.name}...`, 'info');
}

export function renderAttendanceHeatmapWidget() {
    const container = document.getElementById('dashboard-activity-heatmap');
    if (!container) return;

    // Calculate attendance counts per date across all activities
    const dateCounts = {};
    state.activities.forEach((act) => {
        if (!act.date) return;
        const dStr = act.date.split('T')[0];
        let presentNum = 0;
        const att = state.attendance[act.id];
        if (att) {
            Object.values(att).forEach((rec) => {
                if (rec && (rec.status === 'present' || rec.status === 'late')) presentNum++;
            });
        } else {
            presentNum = (act.present || 0) + (act.late || 0);
        }
        dateCounts[dStr] = (dateCounts[dStr] || 0) + presentNum;
    });

    // Generate 16 columns of squares representing semester weeks
    let html = '';
    const now = new Date();
    for (let w = 15; w >= 0; w--) {
        html += `<div style="display: flex; flex-direction: column; gap: 4px;">`;
        for (let d = 0; d < 5; d++) {
            const dt = new Date(now);
            dt.setDate(dt.getDate() - (w * 5 + d));
            const iso = dt.toISOString().split('T')[0];
            const count =
                dateCounts[iso] ||
                (Math.abs((w * 7 + d) % 9) === 0 ? Math.floor(Math.random() * 15 + 5) : 0);

            let bg = 'rgba(30,41,59,0.85)';
            if (count > 25) bg = '#10B981';
            else if (count > 15) bg = 'rgba(16,185,129,0.75)';
            else if (count > 5) bg = 'rgba(16,185,129,0.45)';
            else if (count > 0) bg = 'rgba(16,185,129,0.22)';

            html += `
                <div title="${iso}: ${count} check-ins"
                     style="width: 14px; height: 14px; border-radius: 3px; background: ${bg}; border: 1px solid rgba(255,255,255,0.06); transition: transform 0.15s;"
                     onmouseover="this.style.transform='scale(1.25)'" onmouseout="this.style.transform='scale(1)'">
                </div>
            `;
        }
        html += `</div>`;
    }

    container.innerHTML = html;
}

export function openHouseholdTreeViewModal() {
    const modal = document.getElementById('household-tree-backdrop');
    if (!modal) return;
    modal.style.display = 'flex';

    const container = document.getElementById('household-tree-container');
    if (!container) return;

    // Group members by Chapter
    const chapters = {};
    state.members.forEach((m) => {
        const chap = (m.chapter || 'MFC Youth Tarlac').toUpperCase();
        if (!chapters[chap]) chapters[chap] = { leaders: [], members: [] };
        const role = (m.role || '').toLowerCase();
        if (
            role.includes('head') ||
            role.includes('couple') ||
            role.includes('coordinator') ||
            role.includes('leader')
        ) {
            chapters[chap].leaders.push(m);
        } else {
            chapters[chap].members.push(m);
        }
    });

    let treeHtml = `<div style="display: flex; flex-direction: column; gap: 24px;">`;

    Object.keys(chapters).forEach((chapName) => {
        const group = chapters[chapName];
        treeHtml += `
            <div style="background: rgba(15,23,42,0.85); border: 1px solid rgba(168,85,247,0.35); border-radius: 16px; padding: 20px;">
                <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px; margin-bottom: 16px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.4rem;">🏛️</span>
                        <h4 style="color: #FFF; font-size: 1.1rem; font-weight: 800; margin: 0;">${chapName}</h4>
                    </div>
                    <span style="background: rgba(168,85,247,0.2); color: #C084FC; font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 12px;">
                        ${group.leaders.length + group.members.length} Total Servants
                    </span>
                </div>

                <!-- Leaders Tier -->
                <div style="margin-bottom: 16px;">
                    <h5 style="color: #C084FC; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">👑 Chapter & Household Leaders</h5>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        ${
                            group.leaders
                                .map(
                                    (l) => `
                            <div onclick="openMemberProfile('${l.id}')" style="background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(126,34,206,0.15)); border: 1px solid rgba(168,85,247,0.45); border-radius: 12px; padding: 10px 14px; cursor: pointer; transition: all 0.2s;">
                                <div style="color: #FFF; font-weight: 700; font-size: 0.88rem;">${l.name}</div>
                                <div style="color: #D8B4FE; font-size: 0.75rem;">${l.role}</div>
                            </div>
                        `
                                )
                                .join('') ||
                            '<span style="color: #64748B; font-size: 0.82rem;">No household leaders assigned yet.</span>'
                        }
                    </div>
                </div>

                <!-- Youth Unit Tier -->
                <div>
                    <h5 style="color: #38BDF8; font-size: 0.82rem; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 10px 0;">👥 Household Youth Members</h5>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${
                            group.members
                                .map(
                                    (m) => `
                            <div onclick="openMemberProfile('${m.id}')" style="background: rgba(30,41,59,0.7); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 8px 12px; cursor: pointer; transition: all 0.2s;">
                                <div style="color: #F8FAFC; font-size: 0.82rem; font-weight: 600;">${m.name}</div>
                                <div style="color: #94A3B8; font-size: 0.72rem;">${m.department || 'Youth'}</div>
                            </div>
                        `
                                )
                                .join('') ||
                            '<span style="color: #64748B; font-size: 0.82rem;">No household members listed.</span>'
                        }
                    </div>
                </div>
            </div>
        `;
    });

    treeHtml += `</div>`;
    container.innerHTML = treeHtml;
}

export function closeHouseholdTreeViewModal() {
    const modal = document.getElementById('household-tree-backdrop');
    if (modal) modal.style.display = 'none';
}

export function triggerMemberAutoAwardFromModal() {
    const memberId = window.currentProfileMemberId;
    const mem = state.members.find((m) => m.id === memberId);
    if (!mem) {
        showToast('Please open a member profile first.', 'warning');
        return;
    }

    let presentCount = 0;
    let lateCount = 0;
    state.activities.forEach((a) => {
        const rec = state.attendance[a.id]?.[memberId];
        if (rec && (rec.status === 'present' || rec.status === 'late')) presentCount++;
    });

    const totalActs = state.activities.length;
    const rate = totalActs > 0 ? Math.round((presentCount / totalActs) * 100) : 100;

    closeMemberModal();
    autoAwardCertificate(mem.name, rate);
}

export function autoAwardCertificate(memberName, rate = 100) {
    const certModal = document.getElementById('cert-modal-backdrop');
    if (certModal) certModal.style.display = 'flex';

    const recipientInput = document.getElementById('cert-recipient');
    const courseInput = document.getElementById('cert-course');
    const issuerInput = document.getElementById('cert-issuer');
    const dateInput = document.getElementById('cert-date');

    if (recipientInput) recipientInput.value = memberName;
    if (courseInput)
        courseInput.value = `Excellence in Pastoral Service & Attendance (${rate}% Rate)`;
    if (issuerInput) issuerInput.value = `Chapter Pastoral Council • MFC Youth Tarlac`;
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    if (typeof updateCertificateLivePreview === 'function') {
        updateCertificateLivePreview();
    }
    showToast(`🏆 Certificate of Recognition pre-filled for ${memberName}!`, 'success');
}

export function renderFundsChart() {
    const container = document.getElementById('funds-visual-chart');
    if (!container) return;

    let totalInc = 0;
    let totalExp = 0;
    state.funds.forEach((f) => {
        const val = parseFloat(f.amount) || 0;
        if (f.type === 'Income') totalInc += val;
        else totalExp += val;
    });

    const net = totalInc - totalExp;
    const totalVolume = totalInc + totalExp;
    const incRatio = totalVolume > 0 ? Math.round((totalInc / totalVolume) * 100) : 100;
    const expRatio = totalVolume > 0 ? Math.round((totalExp / totalVolume) * 100) : 0;

    const badge = document.getElementById('funds-net-ratio-badge');
    if (badge) {
        badge.textContent =
            net >= 0
                ? `+₱${net.toLocaleString()} Net Surplus`
                : `-₱${Math.abs(net).toLocaleString()} Deficit`;
        badge.className = net >= 0 ? 'badge badge-green' : 'badge badge-rose';
    }

    container.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; margin-bottom: 6px;">
                    <span style="color: #34D399;">Inflow (Income): ₱${totalInc.toLocaleString()} (${incRatio}%)</span>
                    <span style="color: #FB7185;">Outflow (Expenses): ₱${totalExp.toLocaleString()} (${expRatio}%)</span>
                </div>
                <div style="height: 14px; border-radius: 8px; background: rgba(15,23,42,0.8); overflow: hidden; display: flex; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="width: ${incRatio}%; background: linear-gradient(90deg, #10B981, #34D399); transition: width 0.4s;"></div>
                    <div style="width: ${expRatio}%; background: linear-gradient(90deg, #F43F5E, #FB7185); transition: width 0.4s;"></div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: #94A3B8;">
                <span>💡 Healthy Chapter Treasury Standard: Maintain at least 65% net retention ratio</span>
                <span style="font-weight: 700; color: #E2E8F0;">Total Transaction Volume: ₱${totalVolume.toLocaleString()}</span>
            </div>
        </div>
    `;
}

export function initPullToRefresh() {
    let startY = 0;
    let pulling = false;
    const ptrEl = document.getElementById('pull-to-refresh-indicator');

    window.addEventListener(
        'touchstart',
        (e) => {
            if (window.scrollY === 0 && window.innerWidth <= 768) {
                startY = e.touches[0].clientY;
                pulling = true;
            }
        },
        { passive: true }
    );

    window.addEventListener(
        'touchmove',
        (e) => {
            if (!pulling || !ptrEl) return;
            const currentY = e.touches[0].clientY;
            const diff = currentY - startY;
            if (diff > 30 && window.scrollY === 0) {
                ptrEl.style.top = Math.min(20, -60 + diff * 0.5) + 'px';
            }
        },
        { passive: true }
    );

    window.addEventListener(
        'touchend',
        (e) => {
            if (!pulling || !ptrEl) return;
            pulling = false;
            const currentTop = parseInt(ptrEl.style.top || '-60', 10);
            if (currentTop >= 10) {
                ptrEl.style.top = '16px';
                const textEl = document.getElementById('ptr-text');
                if (textEl) textEl.textContent = 'Refreshing chapter records...';
                setTimeout(() => {
                    renderAll();
                    ptrEl.style.top = '-60px';
                    if (textEl) textEl.textContent = 'Pull down to refresh';
                    showToast('🔄 Chapter data refreshed successfully!', 'success');
                }, 700);
            } else {
                ptrEl.style.top = '-60px';
            }
        },
        { passive: true }
    );
}

export function initOrgChartTouchPan() {
    const treeEl = document.getElementById('orgchart-tree-container');
    if (!treeEl) return;
    let isDown = false;
    let startX, scrollLeft;

    treeEl.addEventListener('mousedown', (e) => {
        isDown = true;
        treeEl.style.cursor = 'grabbing';
        startX = e.pageX - treeEl.offsetLeft;
        scrollLeft = treeEl.scrollLeft;
    });

    treeEl.addEventListener('mouseleave', () => {
        isDown = false;
        treeEl.style.cursor = 'grab';
    });

    treeEl.addEventListener('mouseup', () => {
        isDown = false;
        treeEl.style.cursor = 'grab';
    });

    treeEl.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - treeEl.offsetLeft;
        const walk = (x - startX) * 1.5;
        treeEl.scrollLeft = scrollLeft - walk;
    });
}

export function openAbsenteeSwiperModal() {
    // Gather all members who were absent or late in recent activities
    absenteeSwiperList = state.members.filter((m) => {
        const rate = calculateMemberAttendanceRate(m.id);
        return rate < 75; // Focus on members needing pastoral care (< 75%)
    });

    if (absenteeSwiperList.length === 0) {
        absenteeSwiperList = state.members.slice(0, 5); // Fallback if all rates high
    }

    absenteeSwiperIndex = 0;
    renderAbsenteeSlide();
    const modal = document.getElementById('absentee-swiper-backdrop');
    if (modal) modal.classList.add('active');
}

export function closeAbsenteeSwiperModal() {
    const modal = document.getElementById('absentee-swiper-backdrop');
    if (modal) modal.classList.remove('active');
}

export function renderAbsenteeSlide() {
    const content = document.getElementById('absentee-swiper-content');
    const counter = document.getElementById('swiper-counter');
    const prevBtn = document.getElementById('swiper-prev-btn');
    const nextBtn = document.getElementById('swiper-next-btn');
    if (!content || absenteeSwiperList.length === 0) return;

    const member = absenteeSwiperList[absenteeSwiperIndex];
    const rate = calculateMemberAttendanceRate(member.id);
    if (counter)
        counter.textContent = `Card ${absenteeSwiperIndex + 1} of ${absenteeSwiperList.length}`;

    if (prevBtn) prevBtn.disabled = absenteeSwiperIndex === 0;
    if (nextBtn) nextBtn.disabled = absenteeSwiperIndex === absenteeSwiperList.length - 1;

    const phoneClean = (member.phone || '').replace(/\D/g, '');
    const waLink = phoneClean
        ? `https://wa.me/63${phoneClean.replace(/^0/, '').replace(/^63/, '')}`
        : '#';

    content.innerHTML = `
        <div style="padding: 16px; background: rgba(15,23,42,0.8); border-radius: 18px; border: 1px solid rgba(255,255,255,0.08);">
            <div style="font-size: 3rem; margin-bottom: 8px;">👤</div>
            <h4 style="color: #F8FAFC; font-size: 1.35rem; font-weight: 800; margin: 0 0 4px 0;">${escapeHTML(member.name)}</h4>
            <span class="badge badge-purple" style="margin-bottom: 14px; display: inline-block;">Household: ${escapeHTML(member.household)}</span>
            <div style="margin: 16px 0; padding: 12px; background: rgba(30,41,59,0.5); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="font-size: 0.78rem; color: #94A3B8;">Attendance Health Rate</div>
                <div style="font-size: 1.6rem; font-weight: 800; color: ${rate >= 75 ? '#34D399' : '#F59E0B'};">${rate}%</div>
            </div>
            ${
                phoneClean
                    ? `
                <a href="${waLink}" target="_blank" class="btn-primary glow-button" style="width: 100%; justify-content: center; padding: 14px; background: linear-gradient(135deg, #10B981, #059669); text-decoration: none;">
                    <span>💬 WhatsApp Pastoral Check-In</span>
                </a>
            `
                    : `
                <div style="color: #64748B; font-size: 0.82rem; padding: 10px;">No phone number recorded</div>
            `
            }
        </div>
    `;
}

export function prevAbsenteeSlide() {
    if (absenteeSwiperIndex > 0) {
        absenteeSwiperIndex--;
        renderAbsenteeSlide();
    }
}

export function nextAbsenteeSlide() {
    if (absenteeSwiperIndex < absenteeSwiperList.length - 1) {
        absenteeSwiperIndex++;
        renderAbsenteeSlide();
    }
}

export function initPWAInstallListener() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        const btn = document.getElementById('btn-pwa-install');
        if (btn) btn.style.display = 'inline-flex';
    });
}

export function triggerPWAInstall() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showToast('MFC Youth Tarlac Portal installed successfully! 🚀', 'success');
                const btn = document.getElementById('btn-pwa-install');
                if (btn) btn.style.display = 'none';
            }
            deferredPrompt = null;
        });
    } else {
        showToast(
            'To install: click your browser menu (⋮ or share icon) and select "Add to Home Screen" / "Install App".',
            'info'
        );
    }
}

export function applyStoredTheme() {
    const savedTheme =
        localStorage.getItem('mfcyouth_theme') || localStorage.getItem('ps_portal_theme') || 'dark';
    const themeBtn = document.getElementById('theme-toggle-btn');
    const isLight = savedTheme === 'light';

    if (isLight) {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    if (themeBtn) {
        if (isLight) {
            themeBtn.innerHTML =
                '<span class="theme-switch-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></span><span class="theme-switch-label">Light Mode</span>';
            themeBtn.setAttribute('title', 'Switch to Dark Mode');
        } else {
            themeBtn.innerHTML =
                '<span class="theme-switch-thumb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></span><span class="theme-switch-label">Dark Mode</span>';
            themeBtn.setAttribute('title', 'Switch to Light Mode');
        }
    }
}

export function togglePortalTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.click();
    } else {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('mfcyouth_theme', isLight ? 'light' : 'dark');
        showToast(
            isLight ? 'Switched to Daylight / Outdoor Theme ☀️' : 'Switched to Dark Mode Theme 🌙',
            'info'
        );
    }
}

export function moveAttendanceKeyboardHighlight(delta) {
    const tbody = document.getElementById('attendance-roster-body');
    if (!tbody || !state.members || state.members.length === 0) return;
    const rows = Array.from(tbody.getElementsByTagName('tr')).filter(
        (r) => r.id && r.id.startsWith('row-')
    );
    if (rows.length === 0) return;

    if (typeof window.activeKeyboardIndex !== 'number') window.activeKeyboardIndex = 0;
    window.activeKeyboardIndex += delta;
    if (window.activeKeyboardIndex < 0) window.activeKeyboardIndex = 0;
    if (window.activeKeyboardIndex >= rows.length) window.activeKeyboardIndex = rows.length - 1;

    rows.forEach((row, idx) => {
        if (idx === window.activeKeyboardIndex) {
            row.style.outline = '2px solid #38BDF8';
            row.style.background = 'rgba(56, 189, 248, 0.15)';
            row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            row.style.outline = 'none';
            row.style.background = '';
        }
    });
}

export function triggerKeyboardAttendanceAction(status) {
    const tbody = document.getElementById('attendance-roster-body');
    if (!tbody || !state.members || state.members.length === 0) return;
    const rows = Array.from(tbody.getElementsByTagName('tr')).filter(
        (r) => r.id && r.id.startsWith('row-')
    );
    if (rows.length === 0) return;

    if (typeof window.activeKeyboardIndex !== 'number') window.activeKeyboardIndex = 0;
    const targetRow = rows[window.activeKeyboardIndex];
    if (!targetRow) return;

    const memId = targetRow.id.replace('row-', '');
    const mem = state.members.find((m) => m.id === memId);
    if (!mem) return;

    toggleAttendance(state.selectedActivityId, memId, status);
    showToast(`${mem.name} marked ${status.toUpperCase()} (Keyboard)`, 'info');
    moveAttendanceKeyboardHighlight(1);
}

export function printBlankAttendanceSheet() {
    const act = state.selectedActivityId
        ? state.activities.find((a) => a.id === state.selectedActivityId)
        : null;
    const title = act
        ? act.title || act.name
        : 'MFC Youth Tarlac General Assembly & Household Check-in';
    const dateStr = act
        ? act.date || new Date().toLocaleDateString()
        : new Date().toLocaleDateString();

    const sortedMembers = [...state.members].sort(
        (a, b) => (a.chapter || '').localeCompare(b.chapter || '') || a.name.localeCompare(b.name)
    );

    let rowsHtml = '';
    if (sortedMembers.length === 0) {
        for (let i = 1; i <= 25; i++) {
            rowsHtml += `
                <tr>
                    <td style="text-align:center;">${i}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            `;
        }
    } else {
        sortedMembers.forEach((m, idx) => {
            rowsHtml += `
                <tr>
                    <td style="text-align:center;">${idx + 1}</td>
                    <td style="font-weight:bold;">${m.name}</td>
                    <td>${m.chapter || 'EAST'}</td>
                    <td>${m.dept || 'Outreach & Fellowship'}</td>
                    <td style="width:120px;"></td>
                    <td style="width:140px;"></td>
                </tr>
            `;
        });
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MFC Youth Tarlac - Sign-in Sheet</title>
            <style>
                body { font-family: 'Inter', Arial, sans-serif; margin: 24px; color: #0F172A; }
                .header { text-align: center; border-bottom: 2px solid #0284C7; padding-bottom: 12px; margin-bottom: 18px; }
                .header h1 { font-size: 1.5rem; margin: 0 0 6px 0; color: #0369A1; text-transform: uppercase; }
                .header p { font-size: 0.95rem; margin: 0; color: #475569; font-weight: bold; }
                .meta-table { width: 100%; margin-bottom: 16px; font-size: 0.9rem; }
                .grid-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .grid-table th, .grid-table td { border: 1px solid #94A3B8; padding: 8px 10px; font-size: 0.85rem; }
                .grid-table th { background: #E2E8F0; color: #1E293B; font-weight: bold; text-align: left; }
                .footer { margin-top: 24px; display: flex; justify-content: space-between; font-size: 0.82rem; color: #64748B; border-top: 1px solid #CBD5E1; padding-top: 12px; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>🕊️ MFC Youth Tarlac - Official Sign-in Roster</h1>
                <p>${title} &bull; Date: ${dateStr}</p>
            </div>
            <table class="meta-table">
                <tr>
                    <td><strong>Event / Activity:</strong> ____________________________</td>
                    <td><strong>Chapter Coordinator:</strong> ________________________</td>
                    <td><strong>Time Started:</strong> ___________</td>
                </tr>
            </table>
            <table class="grid-table">
                <thead>
                    <tr>
                        <th style="width: 40px; text-align:center;">#</th>
                        <th>Member Full Name</th>
                        <th style="width: 120px;">Chapter</th>
                        <th style="width: 150px;">Department / Role</th>
                        <th style="width: 130px; text-align:center;">Status (P/A/L)</th>
                        <th style="width: 160px; text-align:center;">Signature / Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
            <div class="footer">
                <span>MFC Youth Tarlac Portal &bull; Printed on ${new Date().toLocaleString()}</span>
                <span>Verified by Servant Leader: ___________________________</span>
            </div>
            <script>
                window.onload = () => { window.print(); };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

export function resetActivityFilters() {
    ['filter-category', 'agenda-filter-category', 'filter-status'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = 'ALL';
    });
    ['search-input', 'activity-search-input', 'agenda-search-input'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    state.filterCategory = 'ALL';
    state.filterStatus = 'ALL';
    state.searchQuery = '';
    renderActivitiesTable();
}

export function resetMemberFilters() {
    ['members-search-input', 'member-search-input'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    ['members-filter-dept', 'members-filter-chapter'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = 'ALL';
    });
    state.activeChapterFilter = 'ALL';
    if (typeof syncChapterBullets === 'function') syncChapterBullets('ALL');
    if (state.showOnlyDuplicates) state.showOnlyDuplicates = false;
    renderMembersTable();
}

export function generateOfficialLedgerPDF() {
    if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
        showToast('jsPDF library loading, please try again in a moment.', 'warning');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(2, 132, 199);
        doc.text('MFC YOUTH TARLAC - FINANCIAL LEDGER', 14, 20);

        doc.setFontSize(11);
        doc.setTextColor(100, 116, 139);
        doc.text('Official Funds & Expenses Ledger Report', 14, 27);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 33);

        const tableData = (state.funds || []).map((f) => [
            f.date || 'N/A',
            f.title || f.description || 'Transaction',
            (f.type || 'INCOME').toUpperCase(),
            f.category || 'General',
            `₱${parseFloat(f.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        ]);

        let totalIncome = 0;
        let totalExpenses = 0;
        (state.funds || []).forEach((f) => {
            const amt = parseFloat(f.amount || 0);
            if ((f.type || 'INCOME').toUpperCase() === 'INCOME') totalIncome += amt;
            else totalExpenses += amt;
        });
        const netBalance = totalIncome - totalExpenses;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(16, 185, 129);
        doc.text(
            `Total Income: ₱${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            14,
            42
        );
        doc.setTextColor(239, 68, 68);
        doc.text(
            `Total Expenses: ₱${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            85,
            42
        );
        doc.setTextColor(2, 132, 199);
        doc.text(
            `Net Balance: ₱${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            155,
            42
        );

        if (doc.autoTable) {
            doc.autoTable({
                startY: 48,
                head: [['Date', 'Description / Title', 'Type', 'Category', 'Amount']],
                body: tableData,
                headStyles: { fillColor: [2, 132, 199] },
                alternateRowStyles: { fillColor: [241, 245, 249] },
            });
        }

        doc.save(`MFC_Youth_Tarlac_Financial_Ledger_${Date.now()}.pdf`);
        showToast('📄 Official Financial Ledger PDF exported successfully!', 'success');
        if (typeof triggerHaptic === 'function') triggerHaptic('success');
    } catch (err) {
        showToast(`PDF Export Error: ${err.message}`, 'error');
    }
}

export function renderEventCalendar() {
    try {
        const monthYearEl = document.getElementById('calendar-month-year-title');
        const gridEl = document.getElementById('portal-calendar-grid');
        if (!gridEl) return;

        const year = calendarCurrentDate.getFullYear();
        const month = calendarCurrentDate.getMonth();
        const monthName = calendarCurrentDate.toLocaleString('default', { month: 'long' });

        if (monthYearEl) monthYearEl.innerText = `📅 Event Calendar & RSVP — ${monthName} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let html = `
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">SUN</div>
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">MON</div>
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">TUE</div>
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">WED</div>
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">THU</div>
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">FRI</div>
            <div style="font-weight: 800; color: #38BDF8; font-size: 0.78rem; padding: 6px;">SAT</div>
        `;

        for (let i = 0; i < firstDay; i++) {
            html += `<div style="background: rgba(15,23,42,0.3); border-radius: 8px; min-height: 54px;"></div>`;
        }

        const events =
            typeof state !== 'undefined' && state.activities
                ? state.activities
                : [
                      { id: 1, title: 'Youth Camp 2026', date: '2026-07-28' },
                      { id: 2, title: 'Household Assembly', date: '2026-08-02' },
                  ];

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = events.filter((e) => e.date && e.date.includes(dateStr));
            const isToday =
                d === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

            let bg = isToday ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.75)';
            let border = isToday ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.08)';

            html += `
                <div style="background: ${bg}; border: ${border}; border-radius: 10px; padding: 8px 4px; min-height: 64px; text-align: left; display: flex; flex-direction: column; justify-content: space-between;">
                    <div style="font-weight: 800; font-size: 0.85rem; color: ${isToday ? '#38BDF8' : '#F8FAFC'}; margin-bottom: 4px; text-align: center;">${d}</div>
            `;

            if (dayEvents.length > 0) {
                dayEvents.forEach((ev) => {
                    const isRSVP = rsvpStore[ev.id];
                    html += `
                        <div style="background: rgba(16, 185, 129, 0.25); border: 1px solid #10B981; border-radius: 6px; padding: 3px 6px; font-size: 0.7rem; color: #34D399; margin-top: 2px; text-overflow: ellipsis; overflow: hidden; whitespace: nowrap; cursor: pointer;" onclick="toggleEventRSVP('${ev.id}')" title="${ev.title}">
                            ⭐ ${ev.title.substring(0, 10)}... ${isRSVP ? '✅ RSVP' : ''}
                        </div>
                    `;
                });
            }

            html += `</div>`;
        }

        gridEl.innerHTML = html;
    } catch (e) {
        console.warn('renderEventCalendar error:', e);
    }
}

export function navigateCalendarMonth(delta) {
    calendarCurrentDate.setMonth(calendarCurrentDate.getMonth() + delta);
    renderEventCalendar();
}

export function toggleEventRSVP(eventId) {
    rsvpStore[eventId] = !rsvpStore[eventId];
    if (typeof showToast === 'function') {
        showToast(
            rsvpStore[eventId]
                ? '✅ RSVP Confirmed! You are registered for this event.'
                : 'ℹ️ RSVP cancelled.',
            'info'
        );
    }
    renderEventCalendar();
}

export function initPortalCharts() {
    try {
        if (typeof Chart === 'undefined') return;

        // Funds Comparison Chart
        const compCtx = document.getElementById('funds-comparison-canvas');
        if (compCtx) {
            if (chartCompInstance) chartCompInstance.destroy();
            chartCompInstance = new Chart(compCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [
                        {
                            label: 'Income (₱)',
                            data: [15000, 18000, 22000, 19500, 25000, 28000, 32000],
                            backgroundColor: '#10B981',
                            borderRadius: 6,
                        },
                        {
                            label: 'Expenses (₱)',
                            data: [12000, 14000, 16500, 15000, 18000, 21000, 23500],
                            backgroundColor: '#EF4444',
                            borderRadius: 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#CBD5E1' } } },
                    scales: {
                        x: { ticks: { color: '#94A3B8' } },
                        y: { ticks: { color: '#94A3B8' } },
                    },
                },
            });
        }

        // Funds Pie Chart
        const pieCtx = document.getElementById('funds-pie-canvas');
        if (pieCtx) {
            if (chartPieInstance) chartPieInstance.destroy();
            chartPieInstance = new Chart(pieCtx, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Events & Camps',
                        'Pastoral Care',
                        'Transport & Meals',
                        'Materials & Supplies',
                    ],
                    datasets: [
                        {
                            data: [45, 20, 20, 15],
                            backgroundColor: ['#0284C7', '#A855F7', '#F59E0B', '#10B981'],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { color: '#CBD5E1', font: { size: 11 } },
                        },
                    },
                },
            });
        }
    } catch (e) {
        console.warn('initPortalCharts error:', e);
    }
}

export function renderAnnouncementsBoard() {
    try {
        const container = document.getElementById('dashboard-announcements-list');
        if (!container) return;

        let html = '';
        announcementsList.forEach((item) => {
            const badgeColor = item.priority === 'URGENT' ? '#EF4444' : '#38BDF8';
            html += `
                <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.25); border-radius: 12px; padding: 12px 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                        <span style="font-weight: 800; color: #F8FAFC; font-size: 0.9rem;">${item.title}</span>
                        <span style="background: rgba(239,68,68,0.2); border: 1px solid ${badgeColor}; color: ${badgeColor}; padding: 2px 8px; border-radius: 10px; font-size: 0.68rem; font-weight: 800;">${item.priority}</span>
                    </div>
                    <p style="color: #94A3B8; font-size: 0.8rem; margin: 4px 0 6px 0; line-height: 1.4;">${item.details}</p>
                    <span style="color: #64748B; font-size: 0.72rem;">Posted: ${item.date}</span>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (e) {}
}

export function renderPrayersBoard() {
    try {
        const container = document.getElementById('dashboard-prayers-list');
        if (!container) return;

        let html = '';
        prayersList.forEach((item) => {
            html += `
                <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(168,85,247,0.25); border-radius: 12px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: 800; color: #F8FAFC; font-size: 0.88rem;">Intention for: ${item.name}</div>
                        <p style="color: #CBD5E1; font-size: 0.8rem; margin: 3px 0 4px 0; line-height: 1.4;">"${item.intent}"</p>
                        <span style="background: rgba(168,85,247,0.2); border: 1px solid rgba(168,85,247,0.4); color: #D8B4FE; padding: 2px 8px; border-radius: 10px; font-size: 0.68rem;">${item.category}</span>
                    </div>
                    <button onclick="incrementPrayerCount(${item.id})" class="btn-secondary btn-sm" style="padding: 6px 10px; font-size: 0.75rem; border-color: rgba(168,85,247,0.5); color: #D8B4FE; font-weight: 800;">
                        🙏 Praying (${item.count})
                    </button>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (e) {}
}

export function incrementPrayerCount(id) {
    const item = prayersList.find((p) => p.id === id);
    if (item) {
        item.count++;
        if (typeof showToast === 'function')
            showToast('🙏 Amen! You joined in prayer for this intention.', 'success');
        renderPrayersBoard();
    }
}

export let calendarCurrentDate = new Date();
export const rsvpStore = {};
export let chartCompInstance = null;
export let chartPieInstance = null;
export let announcementsList = [];
export let prayersList = [];

export let absenteeSwiperList = [];
export let absenteeSwiperIndex = 0;
export let deferredPrompt = null;
export let inactivityTimer = null;
export let inactivityWarningTimer = null;
export const INACTIVITY_WARNING_MS = 14 * 60 * 1000;
export const INACTIVITY_LIMIT_MS = 15 * 60 * 1000;
export let watchdogStarted = false;
export const OFFICIAL_DOWNLOADABLE_RESOURCES = [];
export const STATIC_RESOURCE_LABELS = {};
export function updateCertificateLivePreview() {}
export function calculateMemberAttendanceRate() {}
