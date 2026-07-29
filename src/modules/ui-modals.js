

export function openAddModal(actId = null) {
    const modal = document.getElementById('modal-backdrop');
    const titleEl = document.getElementById('modal-title');
    const formId = document.getElementById('form-activity-id');
    const formTitle = document.getElementById('form-title');
    const formDate = document.getElementById('form-date');
    const formCat = document.getElementById('form-category');
    const formLoc = document.getElementById('form-location');
    const formStat = document.getElementById('form-status');
    const formDesc = document.getElementById('form-description');

    if (!modal) return;

    if (actId) {
        const act = state.activities.find(a => a.id === actId);
        if (act) {
            titleEl.textContent = 'Edit Activity Record';
            formId.value = act.id;
            formTitle.value = act.name || act.title || '';
            formDate.value = act.date || '';
            formCat.value = act.type || act.category || 'Assembly';
            formLoc.value = act.venue || act.location || '';
            formStat.value = act.status;
            formDesc.value = act.description || '';
            const formSem = document.getElementById('form-semester');
            if (formSem) formSem.value = act.semester || 'auto';
            updateFormMapPreview(act.venue || act.location || 'Tarlac City');
        }
    } else {
        titleEl.textContent = 'Create New Activity';
        formId.value = '';
        formTitle.value = '';
        formDate.value = new Date().toISOString().slice(0, 16);
        formCat.value = 'Chapter Assembly';
        formLoc.value = '';
        formStat.value = 'Upcoming';
        formDesc.value = '';
        const formSem = document.getElementById('form-semester');
        if (formSem) formSem.value = 'auto';
        updateFormMapPreview('Tarlac City');
    }

    modal.style.display = 'flex';
}

export function closeAddModal() {
    const modal = document.getElementById('modal-backdrop');
    if (modal) modal.style.display = 'none';
}

export function openMemberProfile(memberId) {
    const member = state.members.find(m => m.id === memberId);
    if (!member) return;
    window.currentProfileMemberId = memberId;

    const contentEl = document.getElementById('member-profile-content');
    const backdrop = document.getElementById('member-modal-backdrop');
    if (!contentEl || !backdrop) return;

    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;
    const totalActivities = state.activities.length;

    let historyHtml = '';
    state.activities.forEach(act => {
        const record = state.attendance[act.id]?.[memberId];
        let statusText = 'Absent / Unrecorded';
        let statusClass = 'text-red';
        if (record) {
            if (record.status === 'present') {
                presentCount++;
                statusText = '✅ Present';
                statusClass = 'badge-green';
            } else if (record.status === 'late') {
                lateCount++;
                statusText = '⏰ Late';
                statusClass = 'badge-emerald';
            } else if (record.status === 'absent') {
                absentCount++;
                statusText = '❌ Absent';
                statusClass = 'badge-rose';
            }
        } else {
            absentCount++;
        }

        historyHtml += `
            <div class="profile-activity-item">
                <div>
                    <div style="font-weight: 700; color: #F8FAFC; font-size: 0.9rem;">${act.name || act.title || 'Activity'}</div>
                    <div style="font-size: 0.75rem; color: #94A3B8;">${new Date(act.date).toLocaleDateString()} • ${act.type || act.category || 'Event'}</div>
                </div>
                <span style="font-size: 0.8rem; font-weight: 700;" class="${statusClass}">${statusText}</span>
            </div>
        `;
    });

    const rate = totalActivities > 0 ? Math.round(((presentCount + lateCount) / totalActivities) * 100) : 0;
    const initial = member.name.charAt(0).toUpperCase();

    contentEl.innerHTML = `
        <div class="profile-header-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div style="display: flex; align-items: center; gap: 16px;">
                <div class="profile-large-avatar">${initial}</div>
                <div class="profile-info">
                    <h2>${member.name}</h2>
                    <div class="profile-meta">
                        <span class="org-stat-badge" style="background: rgba(56, 189, 248, 0.2); color: #38BDF8;">${member.role}</span>
                        <span class="org-stat-badge" style="background: rgba(139, 92, 246, 0.2); color: #C084FC;">🏢 ${member.department || member.dept || 'MFC Youth'}</span>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button type="button" class="btn-secondary" onclick="exportMemberDossierPDF('${member.id}')" style="padding: 8px 14px; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 6px; border-color: rgba(56, 189, 248, 0.4); color: #38BDF8;">
                    <span>📄 Export Report PDF</span>
                </button>
                <button type="button" class="btn-primary glow-button" onclick="openMemberQRModal('${member.id}')" style="padding: 8px 16px; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 6px;">
                    <span>📱 Official QR ID</span>
                </button>
            </div>
        </div>

        <!-- Quick Pastoral Contact Toolbar -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; background: rgba(15,23,42,0.6); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.06); align-items: center; justify-content: space-between;">
            <span style="color: #94A3B8; font-size: 0.78rem; font-weight: 700;">📲 QUICK REACH-OUT:</span>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <a href="${member.contactNum ? `https://wa.me/${member.contactNum.replace(/[^0-9+]/g, '')}?text=${encodeURIComponent('Hi Kuya/Ate ' + member.name + '! Peace of Christ! Checking in from MFC Youth Tarlac 🙏')}` : '#'}" target="_blank" style="text-decoration: none; background: rgba(34,197,94,0.2); color: #4ADE80; border: 1px solid rgba(34,197,94,0.4); border-radius: 8px; padding: 5px 12px; font-size: 0.78rem; font-weight: 700;">
                    💬 WhatsApp
                </a>
                <a href="${member.contactNum ? `tel:${member.contactNum}` : '#'}" style="text-decoration: none; background: rgba(56,189,248,0.2); color: #38BDF8; border: 1px solid rgba(56,189,248,0.4); border-radius: 8px; padding: 5px 12px; font-size: 0.78rem; font-weight: 700;">
                    📞 Call
                </a>
                <button type="button" onclick="sendCelebrationGreeting('${(member.name || '').replace(/'/g, "\\'")}')" style="background: rgba(236,72,153,0.2); color: #F472B6; border: 1px solid rgba(236,72,153,0.4); border-radius: 8px; padding: 5px 12px; font-size: 0.78rem; font-weight: 700; cursor: pointer;">
                    💌 Birthday Card
                </button>
            </div>
        </div>

        <!-- Recognition Badges Row -->
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
            ${rate >= 80 ? '<span style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #34D399; padding: 4px 12px; border-radius: 12px; font-size: 0.78rem; font-weight: 700;">🔥 Faithful Attendance Award</span>' : ''}
            <span style="background: rgba(59, 130, 246, 0.2); border: 1px solid rgba(59, 130, 246, 0.4); color: #60A5FA; padding: 4px 12px; border-radius: 12px; font-size: 0.78rem; font-weight: 700;">⭐ Active Youth Servant</span>
            <span style="background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); color: #FBBF24; padding: 4px 12px; border-radius: 12px; font-size: 0.78rem; font-weight: 700;">⚡ MFC Youth Tarlac Chapter</span>
        </div>

        <div class="profile-stats-grid">
            <div class="profile-stat-box">
                <div class="num">${totalActivities}</div>
                <div class="lbl">Total Events</div>
            </div>
            <div class="profile-stat-box">
                <div class="num" style="color: #34D399;">${rate}%</div>
                <div class="lbl">Attendance Rate</div>
            </div>
            <div class="profile-stat-box">
                <div class="num" style="color: #FBBF24;" title="${presentCount + lateCount} Attended out of ${totalActivities} Total Events">${presentCount + lateCount}/${totalActivities}</div>
                <div class="lbl">Attended / Total</div>
            </div>
            <div class="profile-stat-box">
                <div class="num" style="color: #C084FC;" title="${presentCount} Present vs ${lateCount} Late Check-ins">${presentCount}:${lateCount}</div>
                <div class="lbl">Present : Late Ratio</div>
            </div>
        </div>

        <h4 style="font-size: 0.95rem; color: #38BDF8; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 800;">
            <span>📋</span> Complete Personal & Youth Camp Dossier
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; background: rgba(15,23,42,0.8); padding: 18px; border-radius: 16px; border: 1px solid rgba(56,189,248,0.25); margin-bottom: 24px; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">👤 FULL NAME BREAKDOWN</span>
                <span style="color: #F8FAFC; font-weight: 800; font-size: 0.92rem;">${member.name || '-'}</span>
                <div style="color: #38BDF8; font-size: 0.78rem; margin-top: 3px;">First: <strong style="color:#FFF;">${member.firstName || member.name.split(' ')[0] || '-'}</strong> | Mid: <strong style="color:#FFF;">${member.middleName || '-'}</strong> | Last: <strong style="color:#FFF;">${member.lastName || member.name.split(' ').slice(-1)[0] || '-'}</strong></div>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">🎂 BIRTHDAY & AGE</span>
                <span style="color: #F8FAFC; font-weight: 700; font-size: 0.9rem;">${formatDateClean(member.birthday)} (${calculateAgeClean(member)} yrs old)</span>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">🏠 HOME ADDRESS</span>
                <span style="color: #E2E8F0; font-weight: 600; font-size: 0.9rem;">${member.address || '-'}</span>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">📞 CONTACT NUMBER</span>
                <span style="color: #38BDF8; font-weight: 700; font-size: 0.9rem; font-family: 'Roboto Mono', monospace;">${member.contactNum || '-'}</span>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">📧 EMAIL ADDRESS</span>
                <span style="color: #60A5FA; font-weight: 600; font-size: 0.88rem;">${member.email || '-'}</span>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">👨‍👩‍👧 PARENTS CONTACT #</span>
                <span style="color: #F8FAFC; font-weight: 700; font-size: 0.9rem; font-family: 'Roboto Mono', monospace;">${member.parentsContact || '-'}</span>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">🏕️ YOUTH CAMP TITLE & DATE</span>
                <span style="color: #F8FAFC; font-weight: 700; font-size: 0.9rem;">${member.campTitle || 'USBONG Encounter Camp'} • ${formatDateClean(member.campDate)}</span>
            </div>
            <div>
                <span style="color: #64748B; font-size: 0.72rem; display: block; font-weight: 700; margin-bottom: 3px;">🙏 COVENANTED DATE</span>
                <span style="color: #F8FAFC; font-weight: 700; font-size: 0.9rem;">${formatDateClean(member.covenantDate || member.campDate)}</span>
            </div>
        </div>

        <h4 style="font-size: 0.95rem; color: #E2E8F0; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <span>📅</span> Recent Activity Check-in History
        </h4>
        <div class="profile-activities-list">
            ${historyHtml || '<div style="color: #94A3B8; font-size: 0.85rem;">No activity records found.</div>'}
        </div>
    `;

    const timelineEl = document.getElementById('member-timeline-container');
    if (timelineEl) {
        let timelineHtml = '<h4 style="font-size: 0.95rem; color: #E2E8F0; margin-bottom: 12px;">🌟 MFC Youth Service & Milestones</h4>';
        timelineHtml += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-title">Appointed as ${member.role}</div>
                    <div class="timeline-date">Active Leadership • ${member.dept} Department</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: #10B981;"></div>
                <div class="timeline-content">
                    <div class="timeline-title">Completed Youth Camp Training</div>
                    <div class="timeline-date">${member.campDate || 'MFC Youth Tarlac Standard Camp'}</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: #8B5CF6;"></div>
                <div class="timeline-content">
                    <div class="timeline-title">Joined ${member.chapter}</div>
                    <div class="timeline-date">Official Chapter Registration</div>
                </div>
            </div>
        `;
        timelineEl.innerHTML = timelineHtml;
    }

    backdrop.style.display = 'flex';
}

export function closeMemberModal() {
    const backdrop = document.getElementById('member-modal-backdrop');
    if (backdrop) backdrop.style.display = 'none';
}

export function openAddMemberModal() {
    const form = document.getElementById('add-member-form');
    if (form) form.reset();
    const idEl = document.getElementById('form-mem-id');
    const titleEl = document.getElementById('add-member-title');
    const btnTextEl = document.getElementById('mem-submit-btn-text');

    if (idEl) idEl.value = '';
    if (titleEl) titleEl.textContent = 'Add New Member';
    if (btnTextEl) btnTextEl.textContent = 'Add Member';

    const backdrop = document.getElementById('add-member-backdrop');
    if (backdrop) backdrop.style.display = 'flex';
}

export function openEditMemberModal(id) {
    const mem = state.members.find(m => m.id === id);
    if (!mem) return;

    const form = document.getElementById('add-member-form');
    if (form) form.reset();

    const idEl = document.getElementById('form-mem-id');
    const titleEl = document.getElementById('add-member-title');
    const btnTextEl = document.getElementById('mem-submit-btn-text');

    if (idEl) idEl.value = mem.id;
    if (titleEl) titleEl.textContent = 'Edit Member';
    if (btnTextEl) btnTextEl.textContent = 'Save Changes';

    const names = mem.name ? mem.name.split(' ') : [''];
    const first = mem.firstName || (names.length > 1 ? names.slice(0, -1).join(' ') : names[0] || '');
    const last = mem.lastName || (names.length > 1 ? names[names.length - 1] : '');

    const setVal = (elId, val) => { const el = document.getElementById(elId); if (el) el.value = val || ''; };
    setVal('mem-first-name', first);
    setVal('mem-middle-name', mem.middleName || '');
    setVal('mem-last-name', last);
    let chapVal = mem.chapter || 'East Chapter';
    if (['EAST', 'NORTH', 'WEST', 'SOUTH', 'CENTRAL'].includes(chapVal.toUpperCase())) {
        chapVal = chapVal.charAt(0).toUpperCase() + chapVal.slice(1).toLowerCase() + ' Chapter';
    }
    setVal('mem-chapter', chapVal);
    setVal('mem-status', mem.status || 'Active');
    setVal('mem-role', mem.role || 'Member');
    setVal('mem-dept', mem.dept || mem.department || 'Outreach & Fellowship');
    setVal('mem-email', mem.email || '');
    setVal('mem-birthday', mem.birthday || '');
    setVal('mem-age', mem.age || '');
    setVal('mem-address', mem.address || '');
    setVal('mem-contact', mem.contactNum || '');
    setVal('mem-parents-contact', mem.parentsContact || '');
    setVal('mem-camp-date', mem.campDate || '');
    setVal('mem-camp-title', mem.campTitle || '');
    setVal('mem-covenant-date', mem.covenantDate || '');

    const backdrop = document.getElementById('add-member-backdrop');
    if (backdrop) backdrop.style.display = 'flex';
}

export function openPastoralGreetingModal(memberId, reason) {
    activePastoralMemberId = memberId;
    const mem = state.members.find(m => m.id === memberId);
    if (!mem) return;

    const titleEl = document.getElementById('pastoral-greeting-title');
    const descEl = document.getElementById('pastoral-greeting-desc');
    if (titleEl) titleEl.textContent = `Send ${reason || 'Pastoral'} Greeting`;
    if (descEl) descEl.textContent = `Choose a channel below to send a personalized birthday and pastoral blessing to ${mem.name} (${mem.chapter || 'Central Chapter'}).`;

    const modal = document.getElementById('modal-pastoral-greeting');
    if (modal) modal.style.display = 'flex';
}

export function closePastoralGreetingModal() {
    activePastoralMemberId = null;
    const modal = document.getElementById('modal-pastoral-greeting');
    if (modal) modal.style.display = 'none';
}

export function sendPastoralGreetingVia(channel) {
    if (!activePastoralMemberId) return;
    const mem = state.members.find(m => m.id === activePastoralMemberId);
    if (!mem) return;

    const first = mem.firstName || mem.name.split(' ')[0] || mem.name;
    const msgBody = `Happy Birthday ${first}! 🎉🕊️ On behalf of MFC Youth Tarlac Leadership and your household brothers & sisters, we celebrate the gift of your life today! May the Lord bless you with wisdom, joy, and peace across the year ahead. We are praying for you! 🙏✨`;

    if (channel === 'whatsapp') {
        let phone = (mem.contactNum || mem.parentsContact || '').replace(/[^0-9]/g, '');
        if (phone.startsWith('0')) phone = '63' + phone.substring(1);
        let url = `https://wa.me/?text=${encodeURIComponent(msgBody)}`;
        if (phone.length >= 10) {
            url = `https://wa.me/${phone}?text=${encodeURIComponent(msgBody)}`;
        }
        window.open(url, '_blank');
        showToast(`WhatsApp greeting opened for ${mem.name}!`, 'success');
    } else if (channel === 'gmail') {
        const email = mem.email || '';
        const subject = `Happy Birthday from MFC Youth Tarlac! 🎉`;
        const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(msgBody)}`;
        window.open(url, '_blank');
        showToast(`Gmail compose opened for ${mem.name}!`, 'success');
    }
    closePastoralGreetingModal();
}

export function openKeyboardCheatsheetModal() {
    const modal = document.getElementById('modal-keyboard-cheatsheet');
    if (modal) modal.style.display = 'flex';
}

export function closeKeyboardCheatsheetModal() {
    const modal = document.getElementById('modal-keyboard-cheatsheet');
    if (modal) modal.style.display = 'none';
}

export function openHHFolderModal() {
    const modal = document.getElementById('modal-hh-folder');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.2s ease';
            modal.style.opacity = '1';
        }, 10);
    }
}

export function closeHHFolderModal() {
    const modal = document.getElementById('modal-hh-folder');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
    }
}

export function openCSTFolderModal() {
    const modal = document.getElementById('modal-cst-folder');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.transition = 'opacity 0.2s ease';
            modal.style.opacity = '1';
        }, 10);
    }
}

export function closeCSTFolderModal() {
    const modal = document.getElementById('modal-cst-folder');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 200);
    }
}

export function closeMemberProfileModal() {
    const modal = document.getElementById('modal-member-profile');
    if (modal) modal.style.display = 'none';
    const backdrop = document.getElementById('member-modal-backdrop');
    if (backdrop) backdrop.style.display = 'none';
}

export function openBatchIDPrintModal() {
    if (!state.members || state.members.length === 0) {
        showToast('No members registered in roster to print.', 'warning');
        return;
    }
    const printWin = window.open('', '_blank', 'width=1000,height=800');
    if (!printWin) {
        showToast('Please allow popups to print batch member IDs.', 'error');
        return;
    }

    const cardsHtml = state.members.map(m => `
        <div style="width: 320px; height: 195px; border: 2px solid #0284C7; border-radius: 12px; padding: 12px; box-sizing: border-box; background: #0B0F19; color: #FFF; font-family: sans-serif; display: flex; flex-direction: column; justify-content: space-between; page-break-inside: avoid;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(56,189,248,0.3); padding-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 800; color: #38BDF8; letter-spacing: 0.5px;">MFC YOUTH TARLAC</span>
                <span style="font-size: 9px; background: rgba(56,189,248,0.2); color: #38BDF8; padding: 2px 6px; border-radius: 4px; font-weight: 700;">${m.chapter || 'CENTRAL'}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; margin: 8px 0;">
                <div style="width: 50px; height: 50px; border-radius: 50%; background: #0284C7; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 800; color: #FFF;">
                    ${(m.name || 'M')[0].toUpperCase()}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 13px; font-weight: 700; color: #FFF;">${m.name || 'Unnamed Member'}</div>
                    <div style="font-size: 10px; color: #94A3B8;">Age: ${m.age || 'N/A'} &bull; ${m.birthday || ''}</div>
                    <div style="font-size: 10px; color: #38BDF8;">${m.contactNum || m.parentsContact || 'No Contact'}</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 9px; color: #64748B; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 4px;">
                <span>ID: ${m.id || 'N/A'}</span>
                <span>Official Youth Member</span>
            </div>
        </div>
    `).join('');

    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MFC Youth Tarlac - Batch Member IDs</title>
            <style>
                body { font-family: 'Inter', system-ui, sans-serif; background: #FFF; margin: 20px; padding: 0; }
                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; justify-items: center; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="no-print" style="margin-bottom: 20px; text-align: center;">
                <button onclick="window.print()" style="background: #0284C7; color: #FFF; border: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer;">Print Batch Member IDs (A4)</button>
            </div>
            <div class="grid">${cardsHtml}</div>
            <script>
                window.onload = () => { setTimeout(() => window.print(), 500); };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
}

export function openUploadResourceModal() {
    const el = document.getElementById('upload-resource-backdrop');
    if (el) el.style.display = 'flex';
}

export function closeUploadResourceModal() {
    const el = document.getElementById('upload-resource-backdrop');
    if (el) el.style.display = 'none';
}

export function saveCustomResourceFile(e) {
    e.preventDefault();
    try {
        const title = document.getElementById('res-upload-title').value.trim();
        const category = document.getElementById('res-upload-category').value;
        const desc = document.getElementById('res-upload-desc').value.trim();
        const fileInput = document.getElementById('res-upload-file');

        if (!fileInput.files || fileInput.files.length === 0) {
            showToast('⚠️ Please select a document file to upload.', 'warning');
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(evt) {
            const fileDataUrl = evt.target.result;
            const newRes = {
                id: 'custom_res_' + Date.now(),
                title: title,
                category: category,
                desc: desc || 'Custom chapter resource document.',
                fileName: file.name,
                fileUrl: fileDataUrl,
                fileType: file.type,
                dateAdded: new Date().toLocaleDateString()
            };

            const existing = JSON.parse(localStorage.getItem('mfc_custom_resources') || '[]');
            existing.push(newRes);
            localStorage.setItem('mfc_custom_resources', JSON.stringify(existing));

            renderCustomUploadedResources();
            closeUploadResourceModal();
            document.getElementById('upload-resource-form').reset();
            showToast(`✅ "${title}" uploaded and saved to Resource Vault!`, 'success');
        };

        reader.readAsDataURL(file);
    } catch (err) {
        showToast(`Upload Error: ${err.message}`, 'error');
    }
}

export function renderCustomUploadedResources() {
    try {
        const customRes = JSON.parse(localStorage.getItem('mfc_custom_resources') || '[]');
        const categories = ['youthcamp', 'trainings', 'songboard', 'holyrosary', 'letters'];

        categories.forEach(cat => {
            const container = document.getElementById(`res-dynamic-${cat}`);
            if (!container) return;
            container.innerHTML = '';
            container.style.display = 'grid';

            const items = customRes.filter(r => r.category === cat);
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'glass-card';
                card.style.cssText = 'padding: 22px; border-radius: 16px; border: 1px solid rgba(56, 189, 248, 0.4); background: rgba(15, 23, 42, 0.85); position: relative;';
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div style="font-size: 1.8rem;">📄</div>
                        <span style="background: rgba(16, 185, 129, 0.2); border: 1px solid rgba(16, 185, 129, 0.4); color: #34D399; padding: 3px 10px; border-radius: 12px; font-size: 0.72rem; font-weight: 800;">USER UPLOADED</span>
                    </div>
                    <h3 style="color: #F8FAFC; font-size: 1.15rem; font-weight: 800; margin: 0 0 8px 0;">${item.title}</h3>
                    <p style="color: #94A3B8; font-size: 0.82rem; line-height: 1.5; margin: 0 0 16px 0;">${item.desc}</p>
                    <div style="display: flex; gap: 10px;">
                        <a href="${item.fileUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary btn-sm" style="flex: 1; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
                            <span>📄 Open Document</span>
                        </a>
                        <a href="${item.fileUrl}" download="${item.fileName}" class="btn-secondary btn-sm" style="flex: 1; text-align: center; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
                            <span>📥 Download</span>
                        </a>
                    </div>
                `;
                container.appendChild(card);
            });
        });
    } catch (err) {
        console.warn('Render custom resources error:', err);
    }
}

export function openLetterGeneratorModal(type) {
    try {
        const el = document.getElementById('letter-generator-backdrop');
        if (el) {
            el.style.display = 'flex';
            el.style.zIndex = '100000';
        }
        if (type) {
            const sel = document.getElementById('let-template-type');
            if (sel) sel.value = type;
        }
        updateLetterPreview();
    } catch (e) {
        console.warn('openLetterGeneratorModal error:', e);
    }
}

export function closeLetterGeneratorModal() {
    try {
        const el = document.getElementById('letter-generator-backdrop');
        if (el) el.style.display = 'none';
    } catch (e) {}
}

export function updateLetterPreview() {
    try {
        const selectEl = document.getElementById('let-template-type');
        const type = selectEl ? selectEl.value : 'parental';

        const memberEl = document.getElementById('let-member-name');
        const parentEl = document.getElementById('let-parent-name');
        const eventEl = document.getElementById('let-event-title');
        const dateEl = document.getElementById('let-event-date');
        const venueEl = document.getElementById('let-venue');
        const servantEl = document.getElementById('let-servant-name');

        const memberName = (memberEl && memberEl.value.trim()) ? memberEl.value.trim() : '[Member / Student Name]';
        const parentName = (parentEl && parentEl.value.trim()) ? parentEl.value.trim() : '[Parent / Addressee Name]';
        const eventTitle = (eventEl && eventEl.value.trim()) ? eventEl.value.trim() : '[Event / Activity Title]';
        const eventDate = (dateEl && dateEl.value.trim()) ? dateEl.value.trim() : '[Event Date]';
        const venue = (venueEl && venueEl.value.trim()) ? venueEl.value.trim() : '[Venue Location]';
        const servantName = (servantEl && servantEl.value.trim()) ? servantEl.value.trim() : '[Chapter Servant Name]';

        const container = document.getElementById('letter-live-content');
        if (!container) return;

        let html = `
            <div style="text-align: center; border-bottom: 2px solid #0F172A; padding-bottom: 12px; margin-bottom: 20px;">
                <h2 style="margin: 0; font-size: 1.4rem; letter-spacing: 0.05em; color: #0F172A; text-transform: uppercase;">MISSIONARIES OF CHRIST YOUTH</h2>
                <h4 style="margin: 4px 0 0 0; font-size: 1rem; color: #475569; font-weight: 600;">Province of Tarlac Chapter</h4>
                <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #64748B;">Diocese of Tarlac • Official Pastoral Office</p>
            </div>
            <div style="text-align: right; margin-bottom: 20px; font-size: 0.9rem; color: #334155;">
                Date: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
        `;

        if (type === 'parental') {
            html += `
                <div style="margin-bottom: 16px; font-weight: bold;">To: ${parentName}</div>
                <h3 style="text-align: center; text-decoration: underline; margin-bottom: 20px;">PARENTAL CONSENT AND INDEMNITY WAIVER</h3>
                <p>Dear Parent / Guardian,</p>
                <p>Peace and grace in Christ!</p>
                <p>This is to formally invite and request your permission for your son/daughter, <strong>${memberName}</strong>, to participate in the upcoming <strong>${eventTitle}</strong> organized by MFC Youth Tarlac. Details of the activity are as follows:</p>
                <ul style="margin-left: 20px; margin-bottom: 16px;">
                    <li><strong>Activity:</strong> ${eventTitle}</li>
                    <li><strong>Date & Time:</strong> ${eventDate}</li>
                    <li><strong>Venue:</strong> ${venue}</li>
                </ul>
                <p>Our team of youth coordinators and pastoral leaders will ensure full safety, spiritual guidance, and supervision throughout the activity.</p>
                <div style="margin-top: 30px; border: 1px solid #94A3B8; padding: 16px; border-radius: 6px;">
                    <p style="text-align: center; font-weight: bold; margin-top: 0;">PARENT / GUARDIAN AFFIRMATION</p>
                    <p>I, <strong>${parentName}</strong>, hereby grant full permission for my son/daughter <strong>${memberName}</strong> to attend <strong>${eventTitle}</strong> on <strong>${eventDate}</strong> at <strong>${venue}</strong>.</p>
                    <div style="margin-top: 40px; display: flex; justify-content: space-between;">
                        <div>
                            ___________________________<br>
                            Signature Over Printed Name
                        </div>
                        <div>
                            Date: _______________
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'excuse') {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>To:</strong> ${parentName}<br>
                    <strong>Subject:</strong> Formal Pastoral Request for School / University Excuse
                </div>
                <h3 style="text-align: center; text-decoration: underline; margin-bottom: 20px;">PASTORAL EXCUSE LETTER</h3>
                <p>Dear Sir / Ma'am,</p>
                <p>Greetings of Peace!</p>
                <p>We are writing on behalf of <strong>Missionaries of Christ Youth Tarlac</strong> to respectfully request your good office to excuse <strong>${memberName}</strong> from their scheduled classes/activities on <strong>${eventDate}</strong>.</p>
                <p>The student will be serving as an official delegate/servant in our upcoming <strong>${eventTitle}</strong> located at <strong>${venue}</strong>. This spiritual conference forms an essential component of their leadership development and moral formation.</p>
                <p>We assure you that <strong>${memberName}</strong> will be responsible for completing any missed coursework, quizzes, or assignments upon their return.</p>
                <p>Thank you for your generous support of youth empowerment and spiritual formation.</p>
            `;
        } else if (type === 'sponsorship') {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>To:</strong> ${parentName}<br>
                    <strong>Subject:</strong> Sponsorship & Solicitation Appeal for Youth Outreach
                </div>
                <h3 style="text-align: center; text-decoration: underline; margin-bottom: 20px;">PARTNERSHIP & SPONSORSHIP APPEAL</h3>
                <p>Dear Valued Partner & Benefactor,</p>
                <p>Grace and peace to you and your family!</p>
                <p>MFC Youth Tarlac is organizing <strong>${eventTitle}</strong> on <strong>${eventDate}</strong> at <strong>${venue}</strong> for over 200 young delegates across the province.</p>
                <p>To ensure that underprivileged youth can attend this life-changing event without financial burden, we humbly appeal for your financial or in-kind sponsorship support for <strong>${memberName}</strong> and our team.</p>
                <p>Your generosity will directly cover delegate kits, meals, transport, and camp materials. May God reward your loving heart abundantly!</p>
            `;
        } else if (type === 'lgu') {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>To:</strong> Honorable ${parentName}<br>
                    <strong>Subject:</strong> Request for Courtesy Clearance & Event Permit
                </div>
                <h3 style="text-align: center; text-decoration: underline; margin-bottom: 20px;">LGU & BARANGAY EVENT PERMIT REQUEST</h3>
                <p>Dear Honorable Leader,</p>
                <p>Greetings from Missionaries of Christ Youth Tarlac!</p>
                <p>We respectfully request courtesy permission and safety clearance from your good office to hold our provincial activity, <strong>${eventTitle}</strong>, on <strong>${eventDate}</strong> at <strong>${venue}</strong>.</p>
                <p>Our delegate coordinator <strong>${memberName}</strong> and servant leadership team will coordinate with local barangay officials to ensure peaceful conduct, cleanliness, and security.</p>
                <p>Thank you for your public service and support of youth community initiatives.</p>
            `;
        } else if (type === 'transport') {
            html += `
                <div style="margin-bottom: 16px;">
                    <strong>To:</strong> ${parentName}<br>
                    <strong>Subject:</strong> Official Request for Vehicle Transportation & Shuttle Service
                </div>
                <h3 style="text-align: center; text-decoration: underline; margin-bottom: 20px;">TRANSPORTATION & SHUTTLE SERVICE REQUEST</h3>
                <p>Dear Transportation Officer / Manager,</p>
                <p>Peace be with you!</p>
                <p>MFC Youth Tarlac is requesting official bus/shuttle assistance for delegate <strong>${memberName}</strong> and our team attending <strong>${eventTitle}</strong> on <strong>${eventDate}</strong> at <strong>${venue}</strong>.</p>
                <p>Your support in providing safe travel arrangements for our delegates is greatly appreciated.</p>
            `;
        }

        html += `
            <div style="margin-top: 40px;">
                <p>Yours in Christ,</p>
                <br>
                <strong>${servantName}</strong><br>
                <span style="color: #475569;">Chapter Coordinator & Servant Team</span><br>
                MFC Youth Tarlac Chapter
            </div>
        `;

        container.innerHTML = html;
    } catch (e) {
        console.warn('updateLetterPreview error:', e);
    }
}

export function downloadLetterPDF() {
    try {
        const selectEl = document.getElementById('let-template-type');
        const type = selectEl ? selectEl.value : 'parental';
        const nameEl = document.getElementById('let-member-name');
        const name = (nameEl && nameEl.value.trim()) ? nameEl.value.trim() : 'Delegate';
        const element = document.getElementById('printable-letter-container');

        if (!element) {
            if (typeof showToast === 'function') showToast('⚠️ Letter container element not found.', 'warning');
            return;
        }

        if (typeof html2pdf !== 'undefined') {
            if (typeof showToast === 'function') {
                showToast('📄 Generating official PDF letter document...', 'info');
            }
            const opt = {
                margin:       [0.4, 0.4, 0.4, 0.4],
                filename:     `MFC_Youth_Tarlac_${type.toUpperCase()}_Letter_${name.replace(/\s+/g, '_')}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, logging: false },
                jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().set(opt).from(element).save().then(() => {
                if (typeof showToast === 'function') {
                    showToast('✅ PDF Letter exported and downloaded successfully!', 'success');
                }
            }).catch(err => {
                console.warn('html2pdf fallback to print:', err);
                window.print();
            });
        } else {
            window.print();
        }
    } catch (err) {
        console.warn('PDF download error:', err);
        window.print();
    }
}

export function openMemberIDCard(memberId) {
    try {
        const backdrop = document.getElementById('member-id-card-backdrop');
        if (backdrop) {
            backdrop.style.display = 'flex';
            backdrop.style.zIndex = '100000';
        }
        
        let member = null;
        if (typeof state !== 'undefined' && state.members && state.members.length > 0) {
            if (memberId) member = state.members.find(m => m.id === memberId || m.name === memberId);
            if (!member) member = state.members[0];
        }

        const name = member ? member.name : 'Barney Tarlac';
        const role = member ? (member.role || member.department || 'Youth Member') : 'Chapter Member';
        const chapter = member ? (member.chapter || 'Central Chapter') : 'Central Chapter';
        const idNum = member ? (member.id || 'MFC-TRC-2026-0042') : 'MFC-TRC-2026-0042';

        const nameEl = document.getElementById('id-card-name');
        const roleEl = document.getElementById('id-card-role');
        const chapEl = document.getElementById('id-card-chapter');
        const numEl = document.getElementById('id-card-number');
        const qrEl = document.getElementById('id-card-qr-code');

        if (nameEl) nameEl.innerText = name.toUpperCase();
        if (roleEl) roleEl.innerText = role;
        if (chapEl) chapEl.innerText = `${chapter} • Diocese of Tarlac`;
        if (numEl) numEl.innerText = `ID: ${idNum}`;

        if (qrEl) {
            const qrData = encodeURIComponent(`MFC_MEMBER:${idNum}:${name}:${chapter}`);
            qrEl.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${qrData}" alt="Member QR" style="width: 80px; height: 80px; display: block; border-radius: 4px;">`;
        }
    } catch (e) {
        console.warn('openMemberIDCard error:', e);
    }
}

export function closeMemberIDCardModal() {
    try {
        const el = document.getElementById('member-id-card-backdrop');
        if (el) el.style.display = 'none';
    } catch (e) {}
}

export function openPostAnnouncementModal() {
    const el = document.getElementById('post-announcement-backdrop');
    if (el) el.style.display = 'flex';
}

export function closePostAnnouncementModal() {
    const el = document.getElementById('post-announcement-backdrop');
    if (el) el.style.display = 'none';
}

export function handlePostAnnouncement(e) {
    e.preventDefault();
    const title = document.getElementById('ann-title').value.trim();
    const priority = document.getElementById('ann-priority').value;
    const details = document.getElementById('ann-details').value.trim();

    if (title && details) {
        announcementsList.unshift({ id: Date.now(), title, priority, details, date: 'Just now' });
        renderAnnouncementsBoard();
        closePostAnnouncementModal();
        const form = document.getElementById('form-post-announcement');
        if (form) form.reset();
        if (typeof showToast === 'function') showToast('📢 Advisory notice posted successfully!', 'success');
    }
}

export function openSubmitPrayerModal() {
    const el = document.getElementById('submit-prayer-backdrop');
    if (el) el.style.display = 'flex';
}

export function closeSubmitPrayerModal() {
    const el = document.getElementById('submit-prayer-backdrop');
    if (el) el.style.display = 'none';
}

export function handleSubmitPrayer(e) {
    e.preventDefault();
    const name = document.getElementById('pray-name').value.trim();
    const category = document.getElementById('pray-category').value;
    const intent = document.getElementById('pray-intent').value.trim();

    if (name && intent) {
        prayersList.unshift({ id: Date.now(), name, category, intent, count: 1 });
        renderPrayersBoard();
        closeSubmitPrayerModal();
        const form = document.getElementById('form-submit-prayer');
        if (form) form.reset();
        if (typeof showToast === 'function') showToast('🙏 Prayer intention added to the Prayer Wall!', 'success');
    }
}

export function closeAllActiveModals() {
    const backdropIds = [
        'letter-generator-backdrop',
        'member-id-card-backdrop',
        'qr-scanner-backdrop',
        'post-announcement-backdrop',
        'submit-prayer-backdrop',
        'ai-pastoral-chat-backdrop',
        'certificate-generator-backdrop',
        'pastoral-followup-backdrop',
        'songbook-transposer-backdrop',
        'holy-rosary-guide-backdrop',
        'venue-map-modal-backdrop'
    ];
    backdropIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

export function toggleAIPastoralChat() {
    const backdrop = document.getElementById('ai-pastoral-chat-backdrop');
    if (!backdrop) return;
    if (backdrop.style.display === 'flex') {
        backdrop.style.display = 'none';
    } else {
        backdrop.style.display = 'flex';
        backdrop.style.zIndex = '100000';
    }
}

export function handleAIChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('ai-chat-input');
    const container = document.getElementById('ai-chat-messages');
    if (!input || !container) return;

    const userMsg = input.value.trim();
    if (!userMsg) return;

    container.innerHTML += `
        <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 10px 12px; color: #FFF; font-size: 0.85rem; align-self: flex-end; max-width: 85%;">
            ${userMsg}
        </div>
    `;
    input.value = '';

    setTimeout(() => {
        let response = "God bless your heart! Keep serving with love, humility, and joy in Christ.";
        const lower = userMsg.toLowerCase();
        if (lower.includes('bible') || lower.includes('verse') || lower.includes('scripture')) {
            response = "📖 'Let no one look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.' — 1 Timothy 4:12";
        } else if (lower.includes('camp') || lower.includes('event') || lower.includes('activity')) {
            response = "⭐ Our next major provincial activity is the Provincial Youth Camp! Be sure to submit your parental consent form in the Letter Builder.";
        } else if (lower.includes('prayer') || lower.includes('pray')) {
            response = "🙏 Lord Jesus, fill our youth with Your Holy Spirit. Strengthen our families, bless our chapter leaders, and grant peace to every heart. Amen!";
        }

        container.innerHTML += `
            <div style="background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 10px 12px; color: #E2E8F0; font-size: 0.85rem; max-width: 88%;">
                🤖 <strong>AI Companion:</strong> ${response}
            </div>
        `;
        container.scrollTop = container.scrollHeight;
    }, 600);
}

export function pinVenueLocation(venueName) {
    try {
        const locQuery = (venueName && venueName.trim()) ? venueName.trim() : 'Tarlac City';
        const encoded = encodeURIComponent(locQuery);

        // Open the venue map modal
        const backdrop = document.getElementById('venue-map-modal-backdrop');
        const iframe = document.getElementById('venue-map-modal-iframe');
        const label = document.getElementById('venue-map-modal-location-label');
        const status = document.getElementById('venue-map-modal-pinned-status');
        const dirBtn = document.getElementById('venue-map-modal-directions-btn');
        const searchInput = document.getElementById('venue-map-modal-search-input');

        if (!backdrop || !iframe) return;

        // Update map iframe
        iframe.src = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

        // Update labels and links
        if (label) label.innerText = locQuery;
        if (status) status.innerHTML = `✅ Pinned: ${locQuery}`;
        if (dirBtn) dirBtn.href = `https://maps.google.com/?q=${encoded}`;
        if (searchInput) searchInput.value = locQuery;

        // Show modal
        backdrop.style.display = 'flex';

        if (typeof showToast === 'function') {
            showToast(`📍 Pinned on Map: ${locQuery}`, 'success');
        }
    } catch (e) {
        console.warn('pinVenueLocation error:', e);
    }
}

export function closeVenueMapModal() {
    const backdrop = document.getElementById('venue-map-modal-backdrop');
    if (backdrop) backdrop.style.display = 'none';
    // Stop the iframe to save resources
    const iframe = document.getElementById('venue-map-modal-iframe');
    if (iframe) iframe.src = 'about:blank';
}

export function handleVenueMapModalPin(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('venue-map-modal-search-input');
    if (input && input.value.trim()) {
        const locQuery = input.value.trim();
        const encoded = encodeURIComponent(locQuery);

        const iframe = document.getElementById('venue-map-modal-iframe');
        const label = document.getElementById('venue-map-modal-location-label');
        const status = document.getElementById('venue-map-modal-pinned-status');
        const dirBtn = document.getElementById('venue-map-modal-directions-btn');

        if (iframe) iframe.src = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        if (label) label.innerText = locQuery;
        if (status) status.innerHTML = `✅ Pinned: ${locQuery}`;
        if (dirBtn) dirBtn.href = `https://maps.google.com/?q=${encoded}`;

        if (typeof showToast === 'function') {
            showToast(`📌 Re-pinned: ${locQuery}`, 'success');
        }
    } else {
        if (typeof showToast === 'function') {
            showToast('Enter a location to pin on map.', 'info');
        }
    }
}

export function handleCustomVenuePinSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('custom-venue-search-input');
    if (input && input.value.trim()) {
        pinVenueLocation(input.value.trim());
    }
}

export function showToast(message, type = 'info', undoCallback = null) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    else if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-text" style="flex: 1;">${message}</span>
    `;

    if (undoCallback && typeof undoCallback === 'function') {
        const undoBtn = document.createElement('button');
        undoBtn.type = 'button';
        undoBtn.className = 'btn-secondary';
        undoBtn.style.cssText = 'padding: 4px 10px; font-size: 0.75rem; font-weight: 700; background: rgba(56, 189, 248, 0.2); border: 1px solid #38BDF8; color: #38BDF8; cursor: pointer; border-radius: 6px; margin-left: 10px;';
        undoBtn.textContent = '↩️ UNDO';
        undoBtn.onclick = (e) => {
            e.stopPropagation();
            undoCallback();
            toast.remove();
            showToast('Action successfully undone!', 'success');
        };
        toast.appendChild(undoBtn);
    }

    container.appendChild(toast);

    const delay = undoCallback ? 6000 : 3500;
    setTimeout(() => {
        if (!toast.parentNode) return;
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, delay);
}

export function updateFormMapPreview(val) {
    clearTimeout(formMapDebounceTimer);
    formMapDebounceTimer = setTimeout(() => {
        const iframe = document.getElementById('modal-location-map-iframe');
        const label = document.getElementById('modal-map-pinned-label');
        const dirBtn = document.getElementById('modal-open-google-maps-btn');
        if (!iframe) return;

        const locQuery = (val && val.trim()) ? val.trim() : 'Tarlac City';
        const encoded = encodeURIComponent(locQuery);
        iframe.src = `https://maps.google.com/maps?q=${encoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        if (label) {
            label.innerText = `📍 Pinned: ${locQuery}`;
        }
        if (dirBtn) {
            dirBtn.href = `https://maps.google.com/?q=${encoded}`;
        }
    }, 400);
}

export function previewFormLocationOnMap() {
    const formLoc = document.getElementById('form-location');
    const locVal = formLoc ? formLoc.value.trim() : '';
    if (locVal) {
        updateFormMapPreview(locVal);
        if (typeof showToast === 'function') {
            showToast(`📍 Pinned on Map: ${locVal}`, 'success');
        }
    } else {
        if (typeof showToast === 'function') {
            showToast('Enter a venue or location name to pin on map.', 'info');
        }
    }
}