const fs = require('fs');
let src = fs.readFileSync('src/modules/dashboard.js', 'utf8');
const parts = src.split('export function jumpToAttendance(actId) {');
let newBottom = `export function jumpToAttendance(actId) {
    state.selectedActivityId = actId;
    switchView('attendance');
    const selectEl = document.getElementById('attendance-activity-select');
    if (selectEl) {
        selectEl.value = actId;
        if (window.renderAttendanceRoster) {
            window.renderAttendanceRoster();
        }
    }
}

export function renderDashboardCelebrants() {
    const listEl = document.getElementById('dashboard-celebrants-list');
    if (!listEl) return;

    const currentMonthIdx = new Date().getMonth();
    let celebrants = state.members.filter(m => {
        if (!m.birthdate && !m.birthday) return false;
        const b = new Date(m.birthdate || m.birthday);
        return !isNaN(b) && b.getMonth() === currentMonthIdx;
    }).slice(0, 4);

    if (celebrants.length === 0 && state.members.length > 0) {
        celebrants = state.members.slice(0, 3);
    }

    if (celebrants.length === 0) {
        listEl.innerHTML = '<div style="color: #64748B; font-size: 0.82rem; padding: 10px 0;">No birthdays recorded for this month.</div>';
        return;
    }

    listEl.innerHTML = celebrants.map(m => {
        const initials = (m.name || 'M').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        const bdate = m.birthdate || m.birthday;
        const dateStr = bdate ? new Date(bdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Milestone Celebration';
        return \`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                    <div style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #EC4899, #8B5CF6); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF; font-size: 0.8rem; flex-shrink: 0;">
                        \${initials}
                    </div>
                    <div style="min-width: 0;">
                        <div style="color: #F8FAFC; font-weight: 700; font-size: 0.82rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${m.name}</div>
                        <div style="color: #F472B6; font-size: 0.72rem;">🎂 \${dateStr} &bull; \${m.chapter || 'Central'}</div>
                    </div>
                </div>
                <button onclick="openPastoralGreetingModal('\${m.id}', 'Birthday Celebration'); triggerConfettiBurst();" style="background: rgba(236, 72, 153, 0.2); border: 1px solid rgba(236, 72, 153, 0.4); color: #F472B6; padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; cursor: pointer; flex-shrink: 0;">
                    Celebrate 🎉
                </button>
            </div>
        \`;
    }).join('');
}

export function renderDashboardAgenda() {
    const listEl = document.getElementById('dashboard-upcoming-list');
    if (!listEl) return;

    const upcomingActs = state.activities.slice(0, 4);
    if (upcomingActs.length === 0) {
        listEl.innerHTML = '<div style="color: #64748B; font-size: 0.82rem; padding: 10px 0;">No upcoming activities recorded.</div>';
        return;
    }

    listEl.innerHTML = upcomingActs.map(act => {
        const dateStr = act.date || 'TBA';
        const typeBadge = act.type || 'Assembly';
        return \`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; transition: all 0.2s;">
                <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
                    <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                        📅
                    </div>
                    <div style="min-width: 0;">
                        <div style="color: #F8FAFC; font-weight: 700; font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">\${act.title || act.name || 'Activity'}</div>
                        <div style="color: #38BDF8; font-size: 0.74rem;">\${dateStr} &bull; <span style="color:#94A3B8;">\${act.location || 'MFC Center'}</span></div>
                    </div>
                </div>
                <span class="badge badge-purple" style="flex-shrink: 0; font-size: 0.72rem;">\${typeBadge}</span>
            </div>
        \`;
    }).join('');
}`;
fs.writeFileSync('src/modules/dashboard.js', parts[0] + newBottom);
console.log('Fixed dashboard.js');
