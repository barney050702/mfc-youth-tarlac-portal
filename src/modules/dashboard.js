import { state } from './state.js';
import { switchView } from './ui.js';
import { renderDashboardCharts } from './reports.js';

export function renderDashboard() {
    const totalActs = state.activities.length;
    const totalMems = state.members.length;

    let totalCheckins = 0;
    let totalRateSum = 0;
    let ratedActivitiesCount = 0;
    let totalPresentSum = 0;
    let totalAbsentSum = 0;

    state.activities.forEach(act => {
        const attObj = state.attendance[act.id] || {};
        let presentCount = 0;
        state.members.forEach(m => {
            const st = attObj[m.id]?.status;
            if (st === 'present' || st === 'late') {
                presentCount++;
                totalCheckins++;
                totalPresentSum++;
            } else {
                totalAbsentSum++;
            }
        });

        if (totalMems > 0) {
            const rate = (presentCount / totalMems) * 100;
            totalRateSum += rate;
            ratedActivitiesCount++;
        }
    });

    const avgRate = ratedActivitiesCount > 0 ? Math.round(totalRateSum / ratedActivitiesCount) : 0;
    const totalAttendanceRecords = totalPresentSum + totalAbsentSum;
    const pctPresent = totalAttendanceRecords > 0 ? Math.round((totalPresentSum / totalAttendanceRecords) * 100) : 0;
    const pctAbsent = totalAttendanceRecords > 0 ? Math.max(0, 100 - pctPresent) : 0;

    // Update DOM metrics with Odometer animation & Gradients
    const elTotalActs = document.getElementById('stat-total-activities');
    const elAvgRate = document.getElementById('stat-avg-rate');
    const elRateBar = document.getElementById('stat-rate-bar');
    const elTotalMems = document.getElementById('stat-total-members');
    const elTotalCheckins = document.getElementById('stat-total-checkins');

    if (elTotalActs && window.animateCounter) { elTotalActs.className = 'metric-value stat-number-gradient'; window.animateCounter(elTotalActs, totalActs); }
    if (elAvgRate && window.animateCounter) { elAvgRate.className = 'metric-value stat-number-emerald'; window.animateCounter(elAvgRate, avgRate, 650, '', '%'); }
    if (elRateBar) elRateBar.style.width = `${avgRate}%`;
    if (elTotalMems && window.animateCounter) { elTotalMems.className = 'metric-value stat-number-gradient'; window.animateCounter(elTotalMems, totalMems); }
    if (elTotalCheckins && window.animateCounter) { elTotalCheckins.className = 'metric-value stat-number-amber'; window.animateCounter(elTotalCheckins, totalCheckins); }

    // Update Overall Check-In Distribution Bar
    const segPresent = document.getElementById('bar-seg-present');
    const segAbsent = document.getElementById('bar-seg-absent');
    const legPresent = document.getElementById('legend-present');
    const legAbsent = document.getElementById('legend-absent');

    if (segPresent) segPresent.style.width = `${pctPresent}%`;
    if (segAbsent) segAbsent.style.width = `${pctAbsent}%`;
    if (legPresent) legPresent.textContent = `${pctPresent}% (${totalPresentSum})`;
    if (legAbsent) legAbsent.textContent = `${pctAbsent}% (${totalAbsentSum})`;

    // Render Recent Activities Table
    const recentTable = document.getElementById('dashboard-recent-table');
    if (recentTable) {
        const curatedIds = ['act-5', 'act-4', 'act-3', 'act-2', 'act-1'];
        let recentActs = curatedIds.map(id => state.activities.find(a => a.id === id)).filter(Boolean);
        if (recentActs.length === 0) {
            recentActs = [...state.activities].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
        }

        if (recentActs.length === 0) {
            recentTable.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: #94A3B8; font-style: italic;">
                        No activities recorded yet. Click "+ New Activity" above to get started!
                    </td>
                </tr>
            `;
        } else {
            recentTable.innerHTML = recentActs.map(act => {
                const attObj = state.attendance[act.id] || {};
                let pCount = 0;
                state.members.forEach(m => {
                    const st = attObj[m.id]?.status;
                    if (st === 'present' || st === 'late') pCount++;
                });
                const rate = totalMems > 0 ? Math.round((pCount / totalMems) * 100) : 0;
                const dateObj = new Date(act.date);
                const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
                const isCompleted = act.status === 'Completed';

                return `
                    <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s ease;" onmouseover="this.style.background='rgba(255,255,255,0.02)'" onmouseout="this.style.background='transparent'">
                        <td style="padding: 16px 20px;">
                            <div style="font-weight: 800; color: #F8FAFC; font-size: 0.95rem; margin-bottom: 6px;">
                                ${act.name || act.title || 'Untitled Activity'}
                            </div>
                            <div style="color: #94A3B8; font-size: 0.82rem; display: flex; align-items: center; gap: 6px;">
                                <span style="color: #F43F5E; font-size: 0.95rem;">📍</span> ${act.venue || act.location || 'Venue TBA'}
                            </div>
                        </td>
                        <td style="padding: 16px 20px;">
                            <span style="background: rgba(14, 116, 144, 0.3); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 5px 14px; border-radius: 8px; font-weight: 700; font-size: 0.8rem; display: inline-block;">
                                ${act.category}
                            </span>
                        </td>
                        <td style="padding: 16px 20px; color: #F8FAFC; font-weight: 700; font-size: 0.88rem; white-space: nowrap;">
                            ${dateStr} • ${timeStr}
                        </td>
                        <td style="padding: 16px 20px; white-space: nowrap;">
                            <span style="color: #38BDF8; font-weight: 800; font-size: 0.95rem;">${rate}%</span>
                            <span style="color: #64748B; font-size: 0.8rem; margin-left: 4px;">(${pCount}/${totalMems})</span>
                        </td>
                        <td style="padding: 16px 20px;">
                            <span style="background: ${isCompleted ? 'rgba(6, 78, 59, 0.4)' : 'rgba(12, 74, 110, 0.4)'}; color: ${isCompleted ? '#34D399' : '#38BDF8'}; border: 1px solid ${isCompleted ? 'rgba(52, 211, 153, 0.4)' : 'rgba(56, 189, 248, 0.4)'}; padding: 5px 14px; border-radius: 20px; font-weight: 700; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap;">
                                <span style="width: 6px; height: 6px; border-radius: 50%; background: ${isCompleted ? '#34D399' : '#38BDF8'}; display: inline-block;"></span>
                                ${act.status}
                            </span>
                        </td>
                        <td style="padding: 16px 20px;">
                            <button onclick="window.jumpToAttendance('${act.id}')" style="background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(255, 255, 255, 0.15); color: #E2E8F0; padding: 8px 16px; border-radius: 10px; font-weight: 600; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); white-space: nowrap;" onmouseover="this.style.background='rgba(51, 65, 85, 1)'; this.style.borderColor='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(30, 41, 59, 0.8)'; this.style.borderColor='rgba(255,255,255,0.15)'">
                                📋 Check Sheet
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }

    // Render Category Breakdown
    const catContainer = document.getElementById('dashboard-category-breakdown');
    if (catContainer) {
        const categories = ['Chapter Assembly', 'Chapter Household', 'Area Assembly', 'General Assembly', 'Upper Core Household', 'MFC Conference'];
        catContainer.innerHTML = categories.map(cat => {
            const count = state.activities.filter(a => a.category === cat).length;
            const pct = totalActs > 0 ? Math.round((count / totalActs) * 100) : 0;
            const fillClass = `fill-${cat.toLowerCase().replace(/\s+/g, '-')}`;
            return `
                <div class="cat-item">
                    <div class="cat-info">
                        <span class="cat-name">${cat}</span>
                        <span class="cat-count">${count} <small style="color:var(--text-muted); font-weight:400;">(${pct}%)</small></span>
                    </div>
                    <div class="cat-bar-bg">
                        <div class="cat-bar-fill ${fillClass}" style="width: ${pct}%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderDashboardCelebrants();
    renderDashboardAgenda();
    renderDashboardCharts();
}

export function renderAgendaTimeline() {
    const sortedActs = [...state.activities].sort((a, b) => new Date(a.date) - new Date(b.date));

    let htmlContent = '';
    if (sortedActs.length === 0) {
        htmlContent = `
            <div style="padding: 32px 20px; text-align: center; color: #94A3B8;">
                <div style="font-size: 2.2rem; margin-bottom: 10px; opacity: 0.8;">📅</div>
                <div style="font-weight: 700; color: #E2E8F0; font-size: 0.95rem; margin-bottom: 4px;">No Agenda Activities Yet</div>
                <div style="font-size: 0.82rem; color: #64748B;">Click "+ Add Activity" to schedule or record an activity item.</div>
            </div>
        `;
    } else {
        htmlContent = sortedActs.map((act, idx) => {
            const isLast = idx === sortedActs.length - 1;
            const dateObj = new Date(act.date);
            const dateStr = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBA';
            const statusColor = act.status === 'Completed' ? '#10B981' : (act.status === 'Upcoming' ? '#38BDF8' : '#F59E0B');
            return `
                <div style="display: flex; align-items: flex-start; gap: 16px; padding: 14px 0; ${!isLast ? 'border-bottom: 1px solid rgba(255, 255, 255, 0.06);' : ''}">
                    <div style="background: rgba(30, 58, 138, 0.45); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.35); padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; white-space: nowrap; min-width: 95px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                        ${dateStr}
                    </div>
                    <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
                            <span style="color: #F8FAFC; font-weight: 800; font-size: 0.98rem; letter-spacing: -0.01em;">${act.name || act.title || 'Untitled Activity'}</span>
                            <span style="font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; border: 1px solid ${statusColor}; color: ${statusColor}; background: rgba(255,255,255,0.05);">${act.status || 'Event'}</span>
                        </div>
                        <div style="color: #94A3B8; font-size: 0.82rem; line-height: 1.35;">${act.venue || act.location || 'Venue TBA'} &bull; <span style="color: #64748B;">${act.type || act.category || ''}</span></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderDashboardAgenda();

    const agendaCont = document.getElementById('agenda-timeline-list');
    if (agendaCont) agendaCont.innerHTML = htmlContent;

    updatePastoralCareWidget();
}

export function updatePastoralCareWidget() {
    const listEl = document.getElementById('pastoral-care-list');
    const badgeEl = document.getElementById('pastoral-care-count-badge');
    const subEl = document.getElementById('pastoral-care-subtitle');
    if (!listEl) return;

    const flaggedMembers = (state.members || []).filter(m => {
        const rate = (window.getMemberAttendanceRate && window.getMemberAttendanceRate(m.id)) || 0;
        return rate < 60;
    });

    if (badgeEl) badgeEl.textContent = `${flaggedMembers.length} Member(s) Flagged`;
    if (subEl) subEl.textContent = flaggedMembers.length > 0
        ? `Found ${flaggedMembers.length} member(s) with <60% attendance needing pastoral reach-out`
        : `All youth members currently maintain healthy attendance rates (≥60%)`;

    if (flaggedMembers.length === 0) {
        listEl.innerHTML = `
            <div style="grid-column: 1 / -1; padding: 18px; text-align: center; color: #10B981; font-weight: 700; background: rgba(16, 185, 129, 0.08); border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.25);">
                ✨ Excellent Pastoral Health! All youth members currently maintain ≥60% attendance across activities.
            </div>
        `;
    } else {
        listEl.innerHTML = flaggedMembers.map(m => {
            const rate = (window.getMemberAttendanceRate && window.getMemberAttendanceRate(m.id)) || 0;
            const initial = (m.name || '?').charAt(0).toUpperCase();
            return `
                <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid rgba(244, 63, 94, 0.35); border-radius: 12px; padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                    <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                        <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(244, 63, 94, 0.2); color: #FDA4AF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; flex-shrink: 0;">
                            ${initial}
                        </div>
                        <div style="min-width: 0;">
                            <div style="color: #FFF; font-weight: 700; font-size: 0.92rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.name}</div>
                            <div style="color: #94A3B8; font-size: 0.75rem;">📍 ${m.chapter || 'MFC Youth Tarlac'} • ${m.department || 'Member'}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                        <span style="background: rgba(244, 63, 94, 0.2); color: #FB7185; border: 1px solid rgba(244, 63, 94, 0.4); font-weight: 800; font-size: 0.78rem; padding: 4px 10px; border-radius: 10px;">${rate}% Att</span>
                        <button onclick="window.openMemberProfile('${m.id}')" title="View & Follow Up" style="background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px; padding: 6px 10px; font-size: 0.75rem; font-weight: 700; cursor: pointer;">Connect</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

export function jumpToAttendance(actId) {
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
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px;">
                <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
                    <div style="width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #EC4899, #8B5CF6); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #FFF; font-size: 0.8rem; flex-shrink: 0;">
                        ${initials}
                    </div>
                    <div style="min-width: 0;">
                        <div style="color: #F8FAFC; font-weight: 700; font-size: 0.82rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.name}</div>
                        <div style="color: #F472B6; font-size: 0.72rem;">🎂 ${dateStr} &bull; ${m.chapter || 'Central'}</div>
                    </div>
                </div>
                <button onclick="openPastoralGreetingModal('${m.id}', 'Birthday Celebration'); triggerConfettiBurst();" style="background: rgba(236, 72, 153, 0.2); border: 1px solid rgba(236, 72, 153, 0.4); color: #F472B6; padding: 4px 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 700; cursor: pointer; flex-shrink: 0;">
                    Celebrate 🎉
                </button>
            </div>
        `;
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
        return `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(30, 41, 59, 0.6); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; transition: all 0.2s;">
                <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
                    <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                        📅
                    </div>
                    <div style="min-width: 0;">
                        <div style="color: #F8FAFC; font-weight: 700; font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${act.title || act.name || 'Activity'}</div>
                        <div style="color: #38BDF8; font-size: 0.74rem;">${dateStr} &bull; <span style="color:#94A3B8;">${act.location || 'MFC Center'}</span></div>
                    </div>
                </div>
                <span class="badge badge-purple" style="flex-shrink: 0; font-size: 0.72rem;">${typeBadge}</span>
            </div>
        `;
    }).join('');
}