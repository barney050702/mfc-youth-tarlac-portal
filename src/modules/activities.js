import { switchView } from './ui.js';
import { renderAttendanceRoster } from './attendance.js';
import { closeAddModal } from './ui-modals.js';

/**
 * MFC YOUTH TARLAC | ACTIVITY AGENDA & LEDGER MODULE
 * Event Planning, Sorting, Semester Filtering & Status Updates
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

export function renderActivitiesTable() {
    const tableBody = document.getElementById('activities-table-body');
    const gridContainer = document.getElementById('agenda-grid-container');
    const totalCount = document.getElementById('total-activities-count');

    // Hide 'Add Activity' button if Chapter Head
    const addActivityBtn = document.getElementById('action-btn-21');
    if (addActivityBtn) {
        addActivityBtn.style.display =
            localStorage.getItem('ps_role') === 'CHAPTER HEAD' ? 'none' : 'flex';
    }

    let items = [...state.activities];

    // Apply Filters
    if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        items = items.filter(
            (a) =>
                (a.title && a.title.toLowerCase().includes(query)) ||
                (a.category && a.category.toLowerCase().includes(query)) ||
                (a.venue && a.venue.toLowerCase().includes(query))
        );
    }

    if (state.filterCategory && state.filterCategory !== 'ALL') {
        items = items.filter((a) => a.category === state.filterCategory);
    }

    if (state.agendaSemester && state.agendaSemester !== 'all') {
        items = items.filter((a) => {
            if (!a.date) return false;
            const month = new Date(a.date).getMonth();
            if (state.agendaSemester === 's1') return month >= 0 && month <= 5;
            if (state.agendaSemester === 's2') return month >= 6 && month <= 11;
            return true;
        });
    }

    if (state.sortOrder === 'DESC') {
        items.reverse();
    }

    if (totalCount) {
        totalCount.textContent = `${items.length} activities total`;
    }

    if (tableBody) {
        tableBody.innerHTML = '';
        if (items.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #94A3B8; font-weight: 500;">
                        📅 No upcoming or past activities recorded.
                    </td>
                </tr>
            `;
        } else {
            items.forEach((act) => {
                const tr = document.createElement('tr');
                tr.style.cssText = 'border-bottom: 1px solid rgba(255, 255, 255, 0.05);';

                const titleTd = document.createElement('td');
                titleTd.setAttribute('data-label', 'Activity Name');
                titleTd.style.cssText = 'padding: 14px 16px; font-weight: 600; color: #FFF;';
                titleTd.textContent = act.title || 'Untitled Activity';

                const dateTd = document.createElement('td');
                dateTd.setAttribute('data-label', 'Date');
                dateTd.style.cssText = 'padding: 14px 16px; color: #38BDF8; font-size: 13px;';
                dateTd.textContent = act.date || 'TBD';

                const venueTd = document.createElement('td');
                venueTd.setAttribute('data-label', 'Venue');
                venueTd.style.cssText = 'padding: 14px 16px; color: #CBD5E1; font-size: 13px;';
                venueTd.textContent = act.venue || 'Tarlac Chapter Venue';

                const categoryTd = document.createElement('td');
                categoryTd.setAttribute('data-label', 'Category');
                categoryTd.style.cssText = 'padding: 14px 16px; color: #94A3B8; font-size: 13px;';
                categoryTd.textContent = act.category || 'PASTORAL';

                const statusTd = document.createElement('td');
                statusTd.setAttribute('data-label', 'Status');
                statusTd.style.cssText = 'padding: 14px 16px;';
                const badge = document.createElement('span');
                badge.style.cssText =
                    'background: rgba(16, 185, 129, 0.2); color: #34D399; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;';
                badge.textContent = (act.status || 'UPCOMING').toUpperCase();
                statusTd.appendChild(badge);

                const actionsTd = document.createElement('td');
                actionsTd.setAttribute('data-label', 'Actions');
                actionsTd.style.cssText = 'padding: 14px 16px; text-align: right;';
                const emailBtn = document.createElement('button');
                emailBtn.style.cssText =
                    'background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); color: #38BDF8; padding: 6px 10px; border-radius: 8px; font-size: 12px; cursor: pointer; margin-right: 8px;';
                emailBtn.textContent = '✉️ Remind';
                emailBtn.addEventListener('click', () => sendActivityEmailReminder(act));
                actionsTd.appendChild(emailBtn);

                if (localStorage.getItem('ps_role') !== 'CHAPTER HEAD') {
                    const delBtn = document.createElement('button');
                    delBtn.style.cssText =
                        'background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #F87171; padding: 6px 10px; border-radius: 8px; font-size: 12px; cursor: pointer;';
                    delBtn.textContent = '🗑️';
                    delBtn.addEventListener('click', () => deleteActivity(act.id));
                    actionsTd.appendChild(delBtn);
                }

                tr.appendChild(titleTd);
                tr.appendChild(dateTd);
                tr.appendChild(venueTd);
                tr.appendChild(categoryTd);
                tr.appendChild(statusTd);
                tr.appendChild(actionsTd);

                tableBody.appendChild(tr);
            });
        }
    }

    if (gridContainer) {
        gridContainer.innerHTML = '';
        if (items.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94A3B8; font-weight: 500; background: rgba(30, 41, 59, 0.5); border-radius: 16px; border: 1px dashed rgba(255, 255, 255, 0.1);">
                    📅 No activities match the selected filters.
                </div>
            `;
        } else {
            items.forEach((act) => {
                const card = document.createElement('div');
                card.className = 'glass-card hover-lift';
                card.style.cssText =
                    'padding: 24px; border-radius: 16px; position: relative; overflow: hidden; display: flex; flex-direction: column;';

                const deleteBtnHtml =
                    localStorage.getItem('ps_role') !== 'CHAPTER HEAD'
                        ? `<button class="delete-act-btn" data-id="${act.id}" style="position: absolute; top: 16px; right: 16px; background: rgba(239, 68, 68, 0.1); border: none; color: #ef4444; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;" title="Delete Activity">🗑️</button>`
                        : '';

                card.innerHTML = `
                    <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: #3b82f6;"></div>
                    ${deleteBtnHtml}
                    <div style="margin-bottom: 16px; padding-right: 32px;">
                        <span style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: inline-block;">
                            ${act.category || 'PASTORAL'}
                        </span>
                        <h3 style="color: #f8fafc; font-size: 1.25rem; font-weight: 700; margin: 0 0 8px 0; line-height: 1.4;">
                            ${act.title || 'Untitled Activity'}
                        </h3>
                        <p style="color: #94a3b8; font-size: 0.9rem; margin: 0; display: flex; align-items: center; gap: 6px;">
                            <span style="font-size: 1.1rem;">📅</span> ${act.date || 'TBD'}
                        </p>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <div style="background: rgba(15, 23, 42, 0.5); padding: 8px; border-radius: 8px; color: #64748b; font-size: 1.1rem; line-height: 1;">📍</div>
                            <div>
                                <span style="display: block; color: #cbd5e1; font-size: 0.75rem; font-weight: 700; margin-bottom: 2px; letter-spacing: 0.5px;">VENUE</span>
                                <span style="color: #f8fafc; font-size: 0.95rem;">${act.venue || 'Tarlac Chapter Venue'}</span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-start; gap: 10px;">
                            <div style="background: rgba(15, 23, 42, 0.5); padding: 8px; border-radius: 8px; color: #64748b; font-size: 1.1rem; line-height: 1;">📊</div>
                            <div>
                                <span style="display: block; color: #cbd5e1; font-size: 0.75rem; font-weight: 700; margin-bottom: 2px; letter-spacing: 0.5px;">STATUS</span>
                                <span style="color: #10b981; font-size: 0.95rem; font-weight: 600;">${(act.status || 'UPCOMING').toUpperCase()}</span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-top: auto; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 16px;">
                        <button class="remind-act-btn" data-id="${act.id}" style="flex: 1; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); color: #38bdf8; padding: 10px; border-radius: 10px; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 6px;">
                            ✉️ Remind
                        </button>
                    </div>
                `;

                gridContainer.appendChild(card);
            });

            gridContainer.querySelectorAll('.delete-act-btn').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    deleteActivity(id);
                });
            });
            gridContainer.querySelectorAll('.remind-act-btn').forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    const act = state.activities.find((a) => a.id === id);
                    if (act) sendActivityEmailReminder(act);
                });
            });
        }
    }
}

export function deleteActivity(actId) {
    if (localStorage.getItem('ps_role') === 'CHAPTER HEAD') {
        showToast('Access Denied: Chapter Heads cannot delete activities.', 'error');
        return;
    }
    if (confirm('Are you sure you want to delete this activity?')) {
        state.activities = state.activities.filter((a) => a.id !== actId);
        saveToStorage();
        MFCFirebaseCloud.pushAtomicUpdate('activities', state.activities);
        notifyStateChange('activity-deleted');
        renderActivitiesTable();
        showToast('Activity removed.', 'info');
        triggerHaptic('medium');
    }
}

export async function sendActivityEmailReminder(act) {
    if (!window.emailjs) {
        if (window.showToast) window.showToast('EmailJS SDK not loaded.', 'error');
        else alert('EmailJS SDK not loaded.');
        return;
    }

    const conf = confirm(
        `Are you sure you want to send email reminders for: ${act.title || act.name}?`
    );
    if (!conf) return;

    if (window.showToast) window.showToast('Sending reminders...', 'info');

    // Using a generic template approach, the user will need to configure this in EmailJS
    try {
        // Mocking the call since we don't have keys yet.
        // await emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
        //     activity_name: act.title,
        //     activity_date: act.date,
        //     activity_venue: act.venue,
        //     to_email: "member@example.com"
        // });

        setTimeout(() => {
            if (window.showToast)
                window.showToast(
                    `Reminders sent for ${act.title || act.name}! (Demo Mode)`,
                    'success'
                );
            else alert(`Reminders sent for ${act.title || act.name}! (Demo Mode)`);
        }, 1500);
    } catch (err) {
        console.error('Email error:', err);
        if (window.showToast) window.showToast('Failed to send emails.', 'error');
    }
}
window.sendActivityEmailReminder = sendActivityEmailReminder;

export function toggleAgendaSort() {
    state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    const sortBtn = document.getElementById('agenda-sort-btn');
    if (sortBtn) {
        sortBtn.innerHTML =
            state.sortOrder === 'ASC'
                ? '<span>⇅ Date: Oldest</span>'
                : '<span>⇅ Date: Newest</span>';
    }
    renderActivitiesTable();
}

export function setAgendaSemester(sem, btnEl) {
    state.agendaSemester = sem;
    const tabs = document.querySelectorAll('.sem-tab-btn');
    tabs.forEach((t) => {
        t.style.background = 'transparent';
        t.style.color = '#475569';
        t.classList.remove('active');
    });
    if (btnEl) {
        btnEl.style.background = '#1E3A8A';
        btnEl.style.color = '#FFF';
        btnEl.classList.add('active');
    }
    const titleEl = document.getElementById('semester-banner-title');
    const descEl = document.getElementById('semester-banner-desc');
    if (sem === 's1') {
        if (titleEl) titleEl.textContent = 'First Semester (Jan - Jun)';
        if (descEl) descEl.textContent = 'Activities accomplished during the first semester.';
    } else if (sem === 's2') {
        if (titleEl) titleEl.textContent = 'Second Semester (Jul - Dec)';
        if (descEl)
            descEl.textContent = 'Activities scheduled or completed during the second semester.';
    } else {
        if (titleEl) titleEl.textContent = 'All Activities History';
        if (descEl)
            descEl.textContent =
                'Comprehensive record of all organizational events and gatherings.';
    }
    renderActivitiesTable();
}

export function setAgendaViewMode(mode) {
    state.agendaViewMode = mode;
    const gridBtn = document.getElementById('btn-view-grid');
    const tableBtn = document.getElementById('btn-view-table');
    const gridCont = document.getElementById('agenda-grid-container');
    const tableCont = document.getElementById('agenda-table-container');

    if (mode === 'grid') {
        if (gridBtn) {
            gridBtn.style.background = 'var(--accent-blue)';
            gridBtn.style.color = '#FFF';
        }
        if (tableBtn) {
            tableBtn.style.background = 'transparent';
            tableBtn.style.color = '#94A3B8';
        }
    } else {
        if (tableBtn) {
            tableBtn.style.background = 'var(--accent-blue)';
            tableBtn.style.color = '#FFF';
        }
        if (gridBtn) {
            gridBtn.style.background = 'transparent';
            gridBtn.style.color = '#94A3B8';
        }
    }
}

export function refreshAgendaHistory() {
    showToast('Refreshing agenda history and recalculating rates...', 'info');
    renderActivitiesTable();
}

export function downloadActivityPDF(actId, title) {
    const act = state.activities.find((a) => a.id === actId);
    if (!act) return;

    if (!window.jsPDF || !window.jspdf || !window.jspdf.jsPDF) {
        showToast('PDF generator library loading... please try again in 2 seconds.', 'info');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    const displayTitle = act.name || act.title || 'Untitled Activity';
    const displayCategory = act.type || act.category || 'Event';
    const displayVenue = act.venue || act.location || 'Venue TBA';
    const displayHeldIn = act.heldIn || 'Face to Face';
    const dateObj = new Date(act.date);
    const dateStr = !isNaN(dateObj)
        ? `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        : act.date;

    const attObj = state.attendance[act.id] || {};
    const totalMems = state.members.length;
    let pCount = 0;
    state.members.forEach((m) => {
        if (attObj[m.id]?.status === 'present') pCount++;
    });
    const rate = totalMems > 0 ? Math.round((pCount / totalMems) * 100) : 0;

    // Header Background Banner
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 42, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(56, 189, 248);
    doc.text('MFC YOUTH TARLAC', 14, 16);

    doc.setFontSize(12);
    doc.setTextColor(248, 250, 252);
    doc.text('OFFICIAL ACTIVITY ATTENDANCE REPORT', 14, 25);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 34);

    // Activity Overview Box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(14, 48, 182, 38, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(`Activity: ${displayTitle}`, 20, 58);

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Category: ${displayCategory}   |   Held In: ${displayHeldIn}`, 20, 66);
    doc.text(`Date & Time: ${dateStr}`, 20, 73);
    doc.text(`Venue / Location: ${displayVenue}`, 20, 80);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text(
        `Attendance Rate: ${rate}% (${pCount} Present / ${totalMems - pCount} Absent of ${totalMems} Members)`,
        115,
        80
    );

    // Table Header & Rows
    const tableHeaders = [
        ['#', 'Member Name', 'Department', 'Role', 'Attendance Status', 'Remarks / Notes'],
    ];
    const tableRows = state.members.map((mem, idx) => {
        const memAtt = attObj[mem.id] || { status: 'absent', notes: '' };
        const statusText = memAtt.status === 'present' ? 'PRESENT' : 'ABSENT';
        return [
            idx + 1,
            mem.name,
            mem.dept || '-',
            mem.role || '-',
            statusText,
            memAtt.notes || '-',
        ];
    });

    doc.autoTable({
        startY: 92,
        head: tableHeaders,
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [30, 58, 138], textColor: [255, 255, 255], fontStyle: 'bold' },
        styles: { fontSize: 9, cellPadding: 3.5 },
        columnStyles: {
            0: { cellWidth: 12 },
            1: { cellWidth: 50, fontStyle: 'bold' },
            4: { fontStyle: 'bold' },
        },
        didParseCell: function (data) {
            if (data.section === 'body' && data.column.index === 4) {
                if (data.cell.raw === 'PRESENT') {
                    data.cell.styles.textColor = [16, 185, 129];
                } else {
                    data.cell.styles.textColor = [239, 68, 68];
                }
            }
        },
    });

    // Footer Sign-Off
    const finalY = doc.lastAutoTable.finalY + 18;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text('MFC Youth Tarlac Secretariat Ledger • Certified Official Record', 14, finalY);

    const safeName = displayTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`${safeName}_attendance_report.pdf`);
    showToast(`PDF report downloaded for "${displayTitle}"`, 'success');
}

export function selectActivityForAttendance(actId) {
    state.selectedActivityId = actId;
    switchView('attendance');
    // renderAttendanceHeader();
    renderAttendanceRoster();
    showToast('Switched to live attendance roster!', 'success');
}

export function handleFormSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const idEl = document.getElementById('form-activity-id');
    const idVal = idEl ? idEl.value : '';

    if (idVal && localStorage.getItem('ps_role') === 'CHAPTER HEAD') {
        showToast('Access Denied: Chapter Heads cannot edit activities.', 'error');
        return;
    }

    const titleEl = document.getElementById('form-title');
    const dateEl = document.getElementById('form-date');
    const catEl = document.getElementById('form-category');
    const locEl = document.getElementById('form-location');
    const statEl = document.getElementById('form-status');
    const descEl = document.getElementById('form-description');

    const titleVal = titleEl ? titleEl.value.trim() : '';
    const dateVal = dateEl ? dateEl.value : '';
    const catVal = catEl ? catEl.value : 'PASTORAL';
    const locVal = locEl ? locEl.value.trim() : '';
    const statVal = statEl ? statEl.value : 'UPCOMING';
    const descVal = descEl ? descEl.value.trim() : '';

    if (!titleVal || !dateVal || !locVal) {
        showToast('Please fill out all required fields.', 'error');
        return;
    }

    const semRaw = document.getElementById('form-semester')
        ? document.getElementById('form-semester').value
        : 'auto';
    let semVal = semRaw;
    if (!semVal || semVal === 'auto') {
        const dObjSem = new Date(dateVal);
        semVal = !isNaN(dObjSem.getTime()) && dObjSem.getMonth() >= 6 ? 's2' : 's1';
    }

    if (idVal) {
        // Update existing
        const idx = state.activities.findIndex((a) => a.id === idVal);
        if (idx !== -1) {
            state.activities[idx] = {
                id: idVal,
                title: titleVal,
                name: titleVal,
                date: dateVal,
                category: catVal,
                type: catVal,
                location: locVal,
                venue: locVal,
                status: statVal,
                description: descVal,
                semester: semVal,
            };
            showToast('Activity record updated successfully!', 'success');
        }
    } else {
        // Create new
        const newId = 'act-' + Date.now();
        const newAct = {
            id: newId,
            title: titleVal,
            name: titleVal,
            date: dateVal,
            category: catVal,
            type: catVal,
            location: locVal,
            venue: locVal,
            status: statVal,
            description: descVal,
            semester: semVal,
        };
        state.activities.unshift(newAct);
        // Initialize attendance map for new activity
        state.attendance[newId] = {};
        state.members.forEach((mem) => {
            state.attendance[newId][mem.id] = { status: 'absent', time: '-', notes: '' };
        });
        showToast('New activity created successfully!', 'success');
    }

    saveToStorage();
    closeAddModal();
    renderAll();
}

export function clearAllActivities() {
    if (localStorage.getItem('ps_role') === 'CHAPTER HEAD') {
        showToast('Access Denied: Chapter Heads cannot delete activities.', 'error');
        return;
    }

    if (!state.activities || state.activities.length === 0) {
        showToast('Activities list is already empty.', 'info');
        return;
    }
    if (
        confirm(
            'Are you sure you want to clear all activities and agenda items? This action cannot be undone.'
        )
    ) {
        state.activities = [];
        state.attendance = {};
        state.selectedActivityId = null;
        saveToStorage();
        renderAll();
        showToast('All activities have been cleared successfully.', 'info');
    }
}
