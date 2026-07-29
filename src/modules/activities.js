/**
 * MFC YOUTH TARLAC | ACTIVITY AGENDA & LEDGER MODULE
 * Event Planning, Sorting, Semester Filtering & Status Updates
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

export function renderActivitiesTable() {
    const tableBody = document.getElementById('activities-table-body');
    if (!tableBody) return;
    
    // Hide 'Add Activity' button if Chapter Head
    const addActivityBtn = document.getElementById('action-btn-21');
    if (addActivityBtn) {
        addActivityBtn.style.display = localStorage.getItem('ps_role') === 'CHAPTER HEAD' ? 'none' : 'flex';
    }

    let items = [...state.activities];

    if (state.sortOrder === 'DESC') {
        items.reverse();
    }

    tableBody.innerHTML = '';

    if (items.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #94A3B8; font-weight: 500;">
                    📅 No upcoming or past activities recorded.
                </td>
            </tr>
        `;
        return;
    }

    items.forEach(act => {
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
        badge.style.cssText = 'background: rgba(16, 185, 129, 0.2); color: #34D399; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;';
        badge.textContent = (act.status || 'UPCOMING').toUpperCase();
        statusTd.appendChild(badge);

        const actionsTd = document.createElement('td');
        actionsTd.setAttribute('data-label', 'Actions');
        actionsTd.style.cssText = 'padding: 14px 16px; text-align: right;';
        
        if (localStorage.getItem('ps_role') !== 'CHAPTER HEAD') {
            const delBtn = document.createElement('button');
            delBtn.style.cssText = 'background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #F87171; padding: 6px 10px; border-radius: 8px; font-size: 12px; cursor: pointer;';
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

export function deleteActivity(actId) {
    if (confirm('Are you sure you want to delete this activity?')) {
        state.activities = state.activities.filter(a => a.id !== actId);
        saveToStorage();
        MFCFirebaseCloud.pushAtomicUpdate('activities', state.activities);
        notifyStateChange('activity-deleted');
        renderActivitiesTable();
        showToast('Activity removed.', 'info');
        triggerHaptic('medium');
    }
}
