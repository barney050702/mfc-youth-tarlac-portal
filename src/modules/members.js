import { getMemberBadgesHtml, logAuditAction } from './legacy.js';

/**
 * MFC YOUTH TARLAC | MEMBER DIRECTORY & DIGITAL QR BADGES
 * Roster Management, Filtering, Duplicate Detection & QR Generation
 */

import { state, saveToStorage, notifyStateChange } from './state.js';
import { escapeHTML, showToast, triggerHaptic } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';

export function openDigitalQRModal(memberId) {
    const member = state.members.find((m) => m.id === memberId);
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
                colorDark: '#0B0F19',
                colorLight: '#FFFFFF',
                correctLevel: QRCode.CorrectLevel.H,
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
        backgroundColor: '#0F172A',
    })
        .then((canvas) => {
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
        })
        .catch((err) => {
            console.error('Printing error:', err);
            showToast('Failed to generate printable ID.', 'error');
        });
}

export function deleteMember(memberId) {
    const member = state.members.find((m) => m.id === memberId);
    if (!member) return;

    if (confirm(`Are you sure you want to delete member "${member.name}"?`)) {
        state.members = state.members.filter((m) => m.id !== memberId);
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
    btns.forEach((btn) => {
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

export function setOrgViewMode(mode) {
    state.orgViewMode = mode;
    const treeBtn = document.getElementById('btn-org-tree');
    const gridBtn = document.getElementById('btn-org-grid');
    const hhBtn = document.getElementById('btn-org-household');
    if (treeBtn) treeBtn.classList.toggle('active', mode === 'tree');
    if (gridBtn) gridBtn.classList.toggle('active', mode === 'grid');
    if (hhBtn) hhBtn.classList.toggle('active', mode === 'household');
    renderOrgChart();
}

export function getMemberAttendanceRate(memberId) {
    if (!state.activities || state.activities.length === 0) return 100;
    let presentOrLate = 0;
    state.activities.forEach((act) => {
        const record = state.attendance[act.id]?.[memberId];
        if (record && (record.status === 'present' || record.status === 'late')) {
            presentOrLate++;
        }
    });
    return Math.round((presentOrLate / state.activities.length) * 100);
}

export function matchOrgDepartment(memberDept = '', filterVal = 'ALL') {
    if (filterVal === 'ALL') return true;
    const md = (memberDept || '').toLowerCase().trim();
    const fv = (filterVal || '').toLowerCase().trim();
    if (md === fv) return true;
    if (fv.includes('program') && md.includes('program')) return true;
    if (fv.includes('creative') && md.includes('creative')) return true;
    if (fv.includes('outreach') && md.includes('outreach')) return true;
    if (fv.includes('finance') && md.includes('finance')) return true;
    if (fv.includes('east chapter') && md.includes('east chapter')) return true;
    if (md.includes(fv) || fv.includes(md)) return true;
    return false;
}

export function getCanonicalChapterName(chapStr = '') {
    const raw = (chapStr || 'MFC Youth Tarlac').trim();
    const low = raw.toLowerCase();
    if (low === 'east' || low.includes('east chapter')) return 'East Chapter';
    if (low === 'north' || low.includes('north chapter')) return 'North Chapter';
    if (low === 'west' || low.includes('west chapter')) return 'West Chapter';
    if (low === 'south' || low.includes('south chapter')) return 'South Chapter';
    if (low === 'central' || low.includes('central chapter')) return 'Central Chapter';
    return raw.includes('Chapter') ? raw : `${raw} Chapter`;
}

export function renderOrgMemberCard(member, isExec = false) {
    const rate = getMemberAttendanceRate(member.id);
    const initial = (member.name || '?').charAt(0).toUpperCase();
    const execClass = isExec ? 'org-card-exec' : '';
    const deptName = member.department || member.dept || 'General';
    const roleName = member.role || 'Youth Member';
    const chapterName = member.chapter || 'MFC Youth Tarlac';

    let badgeColor = '#38BDF8';
    if (rate >= 80) badgeColor = '#10B981';
    else if (rate < 60) badgeColor = '#F43F5E';

    const roleBadgeHtml =
        typeof formatRoleBadge === 'function'
            ? formatRoleBadge(roleName)
            : `<span style="color:#38BDF8; font-weight:700; font-size:0.75rem;">${roleName}</span>`;

    return `
        <div class="org-member-card ${execClass}" onclick="openMemberProfile('${member.id}')" role="button" tabindex="0" title="Click to open full member profile">
            <div class="org-member-avatar">
                <span>${initial}</span>
            </div>
            <div class="org-member-info">
                <div class="org-member-name">${member.name}</div>
                <div style="margin: 4px 0;">${roleBadgeHtml}</div>
                <div class="org-member-chapter" style="font-size:0.73rem; color:#94A3B8; margin-bottom: 6px;">📍 ${chapterName}</div>
                <div class="org-member-stats">
                    <span class="org-stat-badge">${deptName}</span>
                    <span class="org-stat-badge" style="color: ${badgeColor}; border-color: ${badgeColor}40;">⚡ ${rate}% Att</span>
                </div>
            </div>
        </div>
    `;
}

export function renderOrgChart() {
    const container = document.getElementById('org-chart-canvas');
    if (!container) return;

    // Ensure toolbar is visible
    const toolbar = document.querySelector('.org-toolbar');
    if (toolbar) toolbar.style.display = 'flex';

    const deptFilterEl = document.getElementById('org-dept-filter');
    const filterDept = deptFilterEl ? deptFilterEl.value : 'ALL';
    const viewMode = state.orgViewMode || 'tree';

    if (!state.members || !Array.isArray(state.members)) {
        state.members = [];
    }
    const searchInputEl = document.getElementById('org-search-input');
    const searchQuery = searchInputEl ? searchInputEl.value.trim().toLowerCase() : '';

    let members = state.members || [];
    if (filterDept !== 'ALL') {
        members = members.filter((m) => matchOrgDepartment(m.department || m.dept, filterDept));
    }
    if (searchQuery) {
        members = members.filter(
            (m) =>
                (m.name || '').toLowerCase().includes(searchQuery) ||
                (m.role || '').toLowerCase().includes(searchQuery) ||
                (m.chapter || '').toLowerCase().includes(searchQuery)
        );
    }

    // Top summary bar inside chart canvas
    const totalMembers = members.length;
    const leadersCount = members.filter((m) => getRoleRank(m.role) <= 2).length;
    const avgAtt =
        totalMembers > 0
            ? Math.round(
                  members.reduce((sum, m) => sum + getMemberAttendanceRate(m.id), 0) / totalMembers
              )
            : 100;

    const summaryHeaderHtml = `
        <div class="org-stats-header glass-card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding:16px 20px; margin-bottom:24px; border-radius:16px; background:rgba(15,23,42,0.85); border:1px solid rgba(56,189,248,0.2);">
            <div style="display:flex; align-items:center; gap:14px;">
                <div style="width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg, #0284C7, #3B82F6); display:flex; align-items:center; justify-content:center; font-size:1.3rem;">🏛️</div>
                <div>
                    <h4 style="color:#FFF; font-size:1.05rem; font-weight:800; margin:0;">MFC Youth Tarlac Directory & Hierarchy</h4>
                    <p style="color:#94A3B8; font-size:0.8rem; margin:2px 0 0;">Interactive organization tree • Showing <strong style="color:#38BDF8;">${filterDept === 'ALL' ? 'All Departments' : filterDept}</strong> (${viewMode.toUpperCase()} View)</p>
                </div>
            </div>
            <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
                <div class="stat-pill" style="display:flex; flex-direction:column; align-items:center; padding:6px 14px; background:rgba(255,255,255,0.04); border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:1.15rem; font-weight:800; color:#F8FAFC;">${totalMembers}</span>
                    <span style="font-size:0.7rem; color:#94A3B8; text-transform:uppercase; font-weight:700;">Members</span>
                </div>
                <div class="stat-pill" style="display:flex; flex-direction:column; align-items:center; padding:6px 14px; background:rgba(255,255,255,0.04); border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:1.15rem; font-weight:800; color:#F59E0B;">${leadersCount}</span>
                    <span style="font-size:0.7rem; color:#94A3B8; text-transform:uppercase; font-weight:700;">Chapter & HH Heads</span>
                </div>
                <div class="stat-pill" style="display:flex; flex-direction:column; align-items:center; padding:6px 14px; background:rgba(255,255,255,0.04); border-radius:10px; border:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:1.15rem; font-weight:800; color:#10B981;">${avgAtt}%</span>
                    <span style="font-size:0.7rem; color:#94A3B8; text-transform:uppercase; font-weight:700;">Avg Attendance</span>
                </div>
            </div>
        </div>
    `;

    if (members.length === 0) {
        container.innerHTML =
            summaryHeaderHtml +
            `
            <div class="glass-panel" style="padding:48px; text-align:center; border-radius:16px;">
                <div style="font-size:2.5rem; margin-bottom:12px;">🔍</div>
                <h4 style="color:#FFF; font-size:1.15rem; margin-bottom:6px;">No Members Found in this Department</h4>
                <p style="color:#94A3B8; font-size:0.9rem; margin-bottom:20px;">Try switching the Department filter above or click below to assign a member.</p>
                <button class="btn-primary glow-button" onclick="openAddMemberModal()">+ Add New Member</button>
            </div>
        `;
        return;
    }

    if (viewMode === 'grid') {
        // GRID VIEW: Group by Department
        const departments = [
            'Executive',
            'EAST CHAPTER',
            'Programs & Events',
            'Creative & Media',
            'Outreach & Fellowship',
            'Finance & Treasury',
        ];
        const activeDepts = filterDept === 'ALL' ? departments : [filterDept];

        const gridHtml = activeDepts
            .map((dept) => {
                const deptMembers = members.filter((m) =>
                    matchOrgDepartment(m.department || m.dept, dept)
                );
                if (deptMembers.length === 0 && filterDept !== 'ALL') return '';

                const deptAvg =
                    deptMembers.length > 0
                        ? Math.round(
                              deptMembers.reduce(
                                  (sum, m) => sum + getMemberAttendanceRate(m.id),
                                  0
                              ) / deptMembers.length
                          )
                        : 0;
                const deptIcons = {
                    Executive: '👑',
                    'EAST CHAPTER': '⚡',
                    'Programs & Events': '🎉',
                    'Creative & Media': '🎨',
                    'Outreach & Fellowship': '🤝',
                    'Finance & Treasury': '💼',
                };

                return `
                <div class="org-dept-section glass-panel" style="margin-bottom:24px; padding:24px; border-radius:20px; border:1px solid rgba(56,189,248,0.18);">
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.08);">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <span style="font-size:1.6rem;">${deptIcons[dept] || '🏛️'}</span>
                            <div>
                                <h3 style="color:#FFF; font-size:1.15rem; font-weight:800; margin:0;">${dept === 'Executive' ? 'AREA SERVANTS' : dept.includes('CHAPTER') ? dept : dept + ' Department'}</h3>
                                <p style="color:#94A3B8; font-size:0.82rem; margin:2px 0 0;">${deptMembers.length} active member(s) assigned</p>
                            </div>
                        </div>
                        <div style="display:flex; align-items:center; gap:12px;">
                            <span style="background:rgba(56,189,248,0.15); color:#38BDF8; border:1px solid rgba(56,189,248,0.3); font-weight:700; font-size:0.78rem; padding:5px 12px; border-radius:12px;">Avg Att: ${deptAvg}%</span>
                            <button class="btn-secondary btn-sm" onclick="openAddMemberModal()" style="font-size:0.78rem;">+ Add Member</button>
                        </div>
                    </div>
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:16px;">
                        ${deptMembers.length > 0 ? deptMembers.map((m) => renderOrgMemberCard(m, dept === 'Executive')).join('') : `<div style="grid-column:1/-1; text-align:center; color:#64748B; padding:20px; font-style:italic;">No members currently in ${dept}. Click "+ Add Member" to assign.</div>`}
                    </div>
                </div>
            `;
            })
            .join('');

        container.innerHTML = summaryHeaderHtml + gridHtml;
        return;
    }

    if (viewMode === 'household') {
        const hhHeads = members.filter(
            (m) => (m.role || '').toLowerCase().includes('household') || getRoleRank(m.role) <= 2
        );
        const generalMembers = members.filter((m) => !hhHeads.some((h) => h.id === m.id));

        const householdHtml = `
            <div class="org-dept-section glass-panel" style="margin-bottom:24px; padding:24px; border-radius:20px; border:1px solid rgba(129,140,248,0.3);">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.08);">
                    <span style="font-size:1.6rem;">🏘️</span>
                    <div>
                        <h3 style="color:#FFF; font-size:1.15rem; font-weight:800; margin:0;">Household Mentoring Groups & Servant Leaders</h3>
                        <p style="color:#94A3B8; font-size:0.82rem; margin:2px 0 0;">Pastoral units clustered under Household & Chapter Heads</p>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:20px;">
                    ${
                        hhHeads.length > 0
                            ? hhHeads
                                  .map((h) => {
                                      const assignedYouth = generalMembers.filter(
                                          (m) => (m.chapter || '') === (h.chapter || '')
                                      );
                                      return `
                            <div style="background:rgba(15,23,42,0.65); border:1px solid rgba(129,140,248,0.35); border-radius:16px; padding:16px;">
                                <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
                                    <span style="font-size:1.4rem;">👑</span>
                                    <div>
                                        <div style="font-weight:800; color:#FFF; font-size:1rem;">${h.name}</div>
                                        <div style="font-size:0.75rem; color:#818CF8;">${h.role || 'Household Head'} • ${h.chapter || 'Tarlac Chapter'}</div>
                                    </div>
                                </div>
                                <div style="font-size:0.75rem; color:#94A3B8; margin-bottom:8px; font-weight:700; text-transform:uppercase;">Assigned Chapter Members (${assignedYouth.length}):</div>
                                <div style="display:flex; flex-direction:column; gap:6px; max-height:160px; overflow-y:auto;">
                                    ${
                                        assignedYouth
                                            .map(
                                                (y) => `
                                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); padding:6px 10px; border-radius:8px; font-size:0.82rem; color:#F8FAFC;">
                                            <span>👤 ${y.name}</span>
                                            <span style="font-size:0.72rem; color:#64748B;">${y.role || 'Member'}</span>
                                        </div>
                                    `
                                            )
                                            .join('') ||
                                        '<div style="color:#64748B; font-size:0.78rem;">No general members in this chapter.</div>'
                                    }
                                </div>
                            </div>
                        `;
                                  })
                                  .join('')
                            : `<div style="grid-column:1/-1; text-align:center; color:#64748B; padding:20px;">No Household Heads recorded yet.</div>`
                    }
                </div>
            </div>
        `;
        container.innerHTML = summaryHeaderHtml + householdHtml;
        return;
    }

    // TREE VIEW: Dynamic Hierarchy
    // Tier 1: Executive & Chapter Leadership
    let execMembers = members.filter(
        (m) => (m.department || m.dept) === 'Executive' || getRoleRank(m.role) === 1
    );
    if (execMembers.length === 0 && members.length > 0) {
        // If filtering by a department without a Rank 1 head, showcase top ranking members in this department
        const minRank = Math.min(...members.map((m) => getRoleRank(m.role)));
        if (minRank < 5) {
            execMembers = members.filter((m) => getRoleRank(m.role) === minRank);
        }
    }
    const otherMembers = members.filter((m) => !execMembers.some((em) => em.id === m.id));

    // Discover canonical and custom chapters
    const standardChapters = [
        'East Chapter',
        'North Chapter',
        'West Chapter',
        'South Chapter',
        'Central Chapter',
    ];
    const dynamicChapters = [];
    otherMembers.forEach((m) => {
        const canonical = getCanonicalChapterName(m.chapter);
        if (!standardChapters.includes(canonical) && !dynamicChapters.includes(canonical)) {
            dynamicChapters.push(canonical);
        }
    });
    const chapters = [...standardChapters, ...dynamicChapters];

    const treeHtml = `
        <div class="org-tree-wrapper">
            <!-- Tier 1: Executive Leadership & Chapter Heads -->
            <div class="org-tier-header" style="text-align:center; margin-bottom:14px;">
                <span style="background:linear-gradient(135deg, #F59E0B, #D97706); color:#FFF; font-weight:800; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; padding:6px 18px; border-radius:20px; box-shadow:0 4px 14px rgba(245,158,11,0.3);">👑 AREA SERVANTS</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:16px; margin-bottom:28px;">
                ${
                    execMembers.length > 0
                        ? execMembers.map((m) => renderOrgMemberCard(m, true)).join('')
                        : `
                    <div class="org-member-card" style="border:1px dashed rgba(245,158,11,0.5); justify-content:center; text-align:center;" onclick="openAddMemberModal()">
                        <div class="org-member-info" style="margin:0;">
                            <div class="org-member-name" style="color:#F59E0B;">+ Assign Executive Leader</div>
                            <div class="org-member-role">Click to assign Chapter Youth Head</div>
                        </div>
                    </div>
                `
                }
            </div>

            <!-- Connector line down -->
            <div style="width:2px; height:24px; background:linear-gradient(to bottom, #38BDF8, rgba(56,189,248,0.2)); margin:0 auto 20px;"></div>

            <!-- Tier 2: Chapter & Department Teams -->
            <div class="org-tier-header" style="text-align:center; margin-bottom:18px;">
                <span style="background:linear-gradient(135deg, #0284C7, #3B82F6); color:#FFF; font-weight:800; font-size:0.78rem; letter-spacing:0.08em; text-transform:uppercase; padding:6px 18px; border-radius:20px; box-shadow:0 4px 14px rgba(14,165,233,0.3);">🏛️ Chapter Teams & Ministries</span>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(270px, 1fr)); gap:20px;">
                ${chapters
                    .map((chapName) => {
                        const chapMembers = otherMembers.filter(
                            (m) => getCanonicalChapterName(m.chapter) === chapName
                        );
                        if (chapMembers.length === 0 && filterDept !== 'ALL') return '';

                        const hhHeads = chapMembers.filter((m) => getRoleRank(m.role) === 2);
                        const regularMems = chapMembers.filter((m) => getRoleRank(m.role) > 2);

                        return `
                        <div class="org-branch-column glass-panel" style="padding:18px; border-radius:18px; border:1px solid rgba(255,255,255,0.08); background:rgba(15,23,42,0.75); display:flex; flex-direction:column; gap:14px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px;">
                                <strong style="color:#F8FAFC; font-size:0.98rem;">📍 ${chapName}</strong>
                                <span style="background:rgba(56,189,248,0.15); color:#38BDF8; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:8px;">${chapMembers.length} Members</span>
                            </div>

                            ${
                                hhHeads.length > 0
                                    ? `
                                <div style="font-size:0.72rem; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em;">Household & Unit Heads</div>
                                <div style="display:flex; flex-direction:column; gap:10px;">
                                    ${hhHeads.map((m) => renderOrgMemberCard(m)).join('')}
                                </div>
                            `
                                    : ''
                            }

                            <div style="font-size:0.72rem; font-weight:700; color:#94A3B8; text-transform:uppercase; letter-spacing:0.05em; margin-top:4px;">Youth Members</div>
                            <div style="display:flex; flex-direction:column; gap:10px;">
                                ${
                                    regularMems.length > 0
                                        ? regularMems.map((m) => renderOrgMemberCard(m)).join('')
                                        : `
                                    <div style="color:#64748B; font-size:0.82rem; text-align:center; padding:16px; border:1px dashed rgba(255,255,255,0.1); border-radius:12px; cursor:pointer;" onclick="openAddMemberModal()">
                                        <div>No members listed</div>
                                        <div style="color:#38BDF8; font-size:0.75rem; margin-top:4px;">+ Assign Member</div>
                                    </div>
                                `
                                }
                            </div>
                        </div>
                    `;
                    })
                    .join('')}
            </div>
        </div>
    `;

    container.innerHTML = summaryHeaderHtml + treeHtml;
}

export function getRoleRank(role = '') {
    const r = role.toLowerCase();
    if (
        r.includes('chapter head') ||
        r.includes('chapter leader') ||
        r.includes('couple coordinator')
    )
        return 1;
    if (r.includes('household head') || r.includes('hh') || r.includes('unit head')) return 2;
    if (r.includes('core') || r.includes('ministry head')) return 3;
    if (r.includes('officer') || r.includes('ministry')) return 4;
    return 5;
}

export function formatRoleBadge(role = 'Member') {
    const rank = getRoleRank(role);
    if (rank === 1) {
        return `<span style="background: linear-gradient(135deg, #F59E0B, #D97706); color: white; padding: 4px 12px; border-radius: 16px; font-weight: 700; font-size: 0.75rem; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);">👑 ${role}</span>`;
    }
    if (rank === 2) {
        return `<span style="background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; padding: 4px 12px; border-radius: 16px; font-weight: 700; font-size: 0.75rem; box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);">🛡️ ${role}</span>`;
    }
    if (rank === 3 || rank === 4) {
        return `<span style="background: rgba(139, 92, 246, 0.2); color: #C4B5FD; border: 1px solid rgba(139, 92, 246, 0.3); padding: 4px 10px; border-radius: 16px; font-weight: 600; font-size: 0.75rem;">⭐ ${role}</span>`;
    }
    return `<span style="color: #E2E8F0; font-size: 0.88rem;">${role}</span>`;
}

export function calculateAgeClean(mem) {
    if (mem.age && mem.age !== '') return mem.age;
    if (!mem.birthday || mem.birthday === '') return '<span style="color: #64748B;">-</span>';
    try {
        const birthDate = new Date(mem.birthday);
        if (isNaN(birthDate.getTime())) return '<span style="color: #64748B;">-</span>';
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 0 && age <= 120 ? age : '<span style="color: #64748B;">-</span>';
    } catch (e) {
        return '<span style="color: #64748B;">-</span>';
    }
}

export function checkAddMemberDuplicate() {
    const fn = (document.getElementById('mem-first-name')?.value || '').trim();
    const ln = (document.getElementById('mem-last-name')?.value || '').trim();
    const currentId = document.getElementById('form-mem-id')?.value || '';
    const warningEl = document.getElementById('add-member-duplicate-warning');
    const textEl = document.getElementById('add-member-duplicate-text');
    if (!warningEl || !textEl) return;

    if (!fn || !ln) {
        warningEl.style.display = 'none';
        return;
    }

    const fullName = `${fn} ${ln}`.toLowerCase();
    const duplicate = state.members.find((m) => {
        if (currentId && m.id === currentId) return false;
        const mName = (m.name || '').trim().toLowerCase();
        return mName === fullName || mName.includes(fullName) || fullName.includes(mName);
    });

    if (duplicate) {
        textEl.innerHTML = `<strong>Exact or Similar Name Detected:</strong> "${duplicate.name}" is already registered in <strong>${duplicate.chapter || 'East Chapter'}</strong> (${duplicate.role || 'Member'}).`;
        warningEl.style.display = 'flex';
    } else {
        warningEl.style.display = 'none';
    }
}

export function filterDuplicateMembers() {
    state.showOnlyDuplicates = !state.showOnlyDuplicates;
    renderMembersTable();
    showToast(
        state.showOnlyDuplicates
            ? 'Filtering table to show duplicate names only ⚠️'
            : 'Showing all members in directory',
        'info'
    );
}

export function renderMembersTable() {
    const tbody = document.getElementById('members-table-body');
    const badge = document.getElementById('badge-members-count');
    if (badge && state.members) {
        badge.textContent = state.members.length;
    }
    if (!tbody || !state.members) return;

    // Compute exact normalized name counts across the full directory
    const nameCounts = {};
    state.members.forEach((m) => {
        const clean = (m.name || '').trim().toLowerCase();
        if (clean) {
            nameCounts[clean] = (nameCounts[clean] || 0) + 1;
        }
    });

    const totalDuplicateCount = state.members.filter(
        (m) => nameCounts[(m.name || '').trim().toLowerCase()] > 1
    ).length;
    const dupBanner = document.getElementById('members-duplicate-banner');
    const dupBannerText = document.getElementById('members-duplicate-banner-text');
    const btnFilterDup = document.getElementById('btn-filter-duplicates');

    if (dupBanner && dupBannerText) {
        if (totalDuplicateCount > 0) {
            dupBanner.style.display = 'flex';
            dupBannerText.innerHTML = `Found <strong>${totalDuplicateCount} duplicate records</strong> across the directory based on identical full names.`;
            if (btnFilterDup) {
                if (state.showOnlyDuplicates) {
                    btnFilterDup.innerHTML = '<span>❌ Show All Members</span>';
                    btnFilterDup.style.background = '#EF4444';
                    btnFilterDup.style.borderColor = '#DC2626';
                } else {
                    btnFilterDup.innerHTML = '<span>🔍 Filter Only Duplicates</span>';
                    btnFilterDup.style.background = 'rgba(245, 158, 11, 0.25)';
                    btnFilterDup.style.borderColor = '#F59E0B';
                }
            }
        } else {
            dupBanner.style.display = 'none';
            if (state.showOnlyDuplicates) state.showOnlyDuplicates = false;
        }
    }

    const searchInput = document.getElementById('members-search-input');
    const deptSelect = document.getElementById('members-filter-dept');
    const chapterSelect = document.getElementById('members-filter-chapter');
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const deptFilter = deptSelect ? deptSelect.value : 'ALL';
    const chapterSelectFilter = chapterSelect
        ? chapterSelect.value
        : state.activeChapterFilter || 'ALL';

    const filtered = state.members.filter((mem) => {
        const cleanN = (mem.name || '').trim().toLowerCase();
        if (state.showOnlyDuplicates && nameCounts[cleanN] <= 1) return false;

        // If viewing Servant Leaders directory, hide standard members
        if (state.currentView === 'servants') {
            const role = (mem.role || '').toLowerCase().trim();
            if (role === '' || role === 'member' || role === 'youth member') {
                return false;
            }
        }

        const matchesQuery =
            (mem.name || '').toLowerCase().includes(query) ||
            (mem.role || '').toLowerCase().includes(query);
        const matchesDept =
            deptFilter === 'ALL' || (mem.dept || mem.department || '') === deptFilter;
        const memChap = (mem.chapter || 'EAST').toLowerCase();
        const filterChap = chapterSelectFilter.toLowerCase().replace(' chapter', '');
        const matchesChapter =
            chapterSelectFilter === 'ALL' ||
            mem.chapter === chapterSelectFilter ||
            memChap.includes(filterChap) ||
            filterChap.includes(memChap);
        return matchesQuery && matchesDept && matchesChapter;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" style="text-align: center; padding: 40px; color: var(--text-muted);">
                    <div style="font-size: 2.5rem; margin-bottom: 12px;">👥</div>
                    <div style="font-size: 1.1rem; font-weight: 600; color: var(--text-primary);">No Members Found</div>
                    <p>No members currently match your search or filter criteria.</p>
                </td>
            </tr>
        `;
        renderMembersMobileCards(filtered, nameCounts);
        return;
    }

    // Sort by Chapter section first, then Role hierarchy, then alphabetical Name
    filtered.sort((a, b) => {
        const chapA = (a.chapter || 'EAST CHAPTER').toUpperCase();
        const chapB = (b.chapter || 'EAST CHAPTER').toUpperCase();
        if (chapA !== chapB) return chapA.localeCompare(chapB);

        const rankA = getRoleRank(a.role);
        const rankB = getRoleRank(b.role);
        if (rankA !== rankB) return rankA - rankB;

        return a.name.localeCompare(b.name);
    });

    state.membersPaginationLimit = state.membersPaginationLimit || 50;
    const paginated = filtered.slice(0, state.membersPaginationLimit);

    let currentChapterSection = null;
    const rowsHtml = [];

    paginated.forEach((mem) => {
        const chapName = mem.chapter || 'EAST CHAPTER';
        const cleanChap = chapName.toUpperCase();
        if (cleanChap !== currentChapterSection) {
            currentChapterSection = cleanChap;
            const chapterCount = filtered.filter(
                (m) => (m.chapter || 'EAST CHAPTER').toUpperCase() === cleanChap
            ).length;
            rowsHtml.push(`
                <tr class="chapter-section-header" style="background: rgba(15, 23, 42, 0.95); border-top: 2px solid rgba(56, 189, 248, 0.4); border-bottom: 1px solid rgba(56, 189, 248, 0.2);">
                    <td colspan="11" style="padding: 14px 20px;">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <span style="font-size: 1.1rem;">🏛️</span>
                                <span style="font-weight: 800; font-size: 0.95rem; color: #38BDF8; letter-spacing: 0.5px; text-transform: uppercase;">${cleanChap}</span>
                            </div>
                            <span style="font-size: 0.78rem; font-weight: 700; color: #E2E8F0; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.3); padding: 4px 12px; border-radius: 20px;">
                                ${chapterCount} Member${chapterCount !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </td>
                </tr>
            `);
        }

        const badgesHtml = getMemberBadgesHtml(mem);
        const cleanName = (mem.name || '').trim().toLowerCase();
        const isDuplicate = nameCounts[cleanName] > 1;

        const rowStyle = isDuplicate
            ? `background: rgba(245, 158, 11, 0.12); border-left: 4px solid #F59E0B; border-bottom: 1px solid rgba(245, 158, 11, 0.3); transition: background 0.2s ease;`
            : `border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s ease;`;

        const dupBadgeHtml = isDuplicate
            ? `
            <span class="badge" style="background: rgba(245, 158, 11, 0.25); border: 1px solid #F59E0B; color: #FBBF24; padding: 2px 8px; border-radius: 12px; font-size: 0.68rem; font-weight: 800; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 0 10px rgba(245,158,11,0.3);" title="⚠️ Another member exists with this exact name (${nameCounts[cleanName]} records total).">
                <span>⚠️ Duplicate (${nameCounts[cleanName]})</span>
            </span>
        `
            : '';

        rowsHtml.push(`
            <tr class="activity-row ${isDuplicate ? 'duplicate-row-highlight' : ''}" style="${rowStyle}">
                <td data-label="Member Name" style="font-weight: 700; color: #F8FAFC; font-size: 0.92rem; white-space: nowrap; padding: 16px 20px;">
                    <a href="javascript:void(0)" onclick="openMemberProfile('${mem.id}')" style="color: #F8FAFC; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: color 0.2s;" onmouseover="this.style.color='#38BDF8'" onmouseout="this.style.color='#F8FAFC'">
                        <span>${mem.name}</span>
                        <span style="font-size: 0.72rem; color: #38BDF8; opacity: 0.8;">↗ Dossier</span>
                    </a>
                    <div style="margin-top: 5px; display: flex; gap: 4px; flex-wrap: wrap;">
                        ${dupBadgeHtml}
                        ${badgesHtml}
                    </div>
                </td>
                <td data-label="Chapter" style="padding: 16px 20px;">
                    <span style="background: var(--grad-emerald); color: white; padding: 4px 14px; border-radius: 20px; font-weight: 700; font-size: 0.75rem; display: inline-block; box-shadow: 0 2px 10px rgba(16, 185, 129, 0.25); text-transform: uppercase;">
                        ${mem.chapter || 'EAST'}
                    </span>
                </td>
                <td data-label="Role" style="white-space: nowrap; padding: 16px 20px;">
                    ${formatRoleBadge(mem.role)}
                </td>
                <td data-label="Contact Num" style="color: #CBD5E1; font-family: 'Roboto Mono', monospace, sans-serif; font-size: 0.88rem; padding: 16px 20px;">
                    ${mem.contactNum || '<span style="color: #64748B;">-</span>'}
                </td>
                <td data-label="Email Address" style="padding: 16px 20px;">
                    ${mem.email ? `<a href="mailto:${mem.email}" style="color: #60A5FA; text-decoration: none; font-size: 0.85rem;">${mem.email}</a>` : '<span style="color: #64748B;">-</span>'}
                </td>
                <td data-label="Birthday" style="color: #E2E8F0; font-size: 0.88rem; white-space: nowrap; padding: 16px 20px;">
                    ${formatDateClean(mem.birthday)}
                </td>
                <td data-label="Age" style="color: #38BDF8; font-weight: 700; font-size: 0.88rem; white-space: nowrap; padding: 16px 20px;">
                    ${calculateAgeClean(mem)}
                </td>
                <td data-label="Parents Contact" style="color: #CBD5E1; font-family: 'Roboto Mono', monospace, sans-serif; font-size: 0.88rem; padding: 16px 20px;">
                    ${mem.parentsContact || '<span style="color: #64748B;">-</span>'}
                </td>
                <td data-label="Address" style="color: #E2E8F0; font-size: 0.88rem; padding: 16px 20px;">
                    ${mem.address || '<span style="color: #64748B;">-</span>'}
                </td>
                <td data-label="Camp Date" style="color: #E2E8F0; font-size: 0.88rem; white-space: nowrap; padding: 16px 20px;">
                    ${formatDateClean(mem.campDate)}
                </td>
                <td data-label="Actions" style="text-align: right; white-space: nowrap; padding: 16px 20px;">
                    <button class="btn-secondary" style="padding: 5px 12px; font-size: 0.78rem; margin-right: 4px;" onclick="openMemberProfile('${mem.id}')">
                        Profile
                    </button>
                    <button class="top-bar-icon-btn" title="Generate Official Certificate" style="width: 30px; height: 30px; display: inline-flex; color: #F59E0B; margin-right: 4px;" onclick="openCertificateModal('${mem.id}')">
                        <span>📜</span>
                    </button>
                    <button class="top-bar-icon-btn" title="View Digital QR Badge" style="width: 30px; height: 30px; display: inline-flex; color: #38BDF8; margin-right: 4px;" onclick="window.openDigitalQRModal('${mem.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>
                    </button>
                    ${
                        localStorage.getItem('ps_role') !== 'CHAPTER HEAD' ||
                        (mem.chapter || 'EAST').toUpperCase() === localStorage.getItem('ps_chapter')
                            ? `
                    <button class="top-bar-icon-btn" title="Edit Member Profile" style="width: 30px; height: 30px; display: inline-flex; color: var(--accent-blue); margin-right: 4px;" onclick="openEditMemberModal('${mem.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button class="top-bar-icon-btn" title="Remove Member" style="width: 30px; height: 30px; display: inline-flex; color: var(--accent-rose);" onclick="deleteMember('${mem.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                    `
                            : ''
                    }
                </td>
            </tr>
        `);
    });

    if (filtered.length > state.membersPaginationLimit) {
        rowsHtml.push(`
            <tr>
                <td colspan="11" style="text-align: center; padding: 20px;">
                    <button class="btn-primary" onclick="window.loadMoreMembers()" style="padding: 8px 24px;">
                        Load More (${filtered.length - state.membersPaginationLimit} remaining)
                    </button>
                </td>
            </tr>
        `);
    }

    tbody.innerHTML = rowsHtml.join('');
    renderMembersMobileCards(filtered, nameCounts);
}

export function loadMoreMembers() {
    state.membersPaginationLimit = (state.membersPaginationLimit || 50) + 50;
    renderMembersTable();
}

export function renderMembersMobileCards(filtered, nameCounts = {}) {
    const container = document.getElementById('members-mobile-cards-container');
    if (!container) return;

    if (!filtered || filtered.length === 0) {
        container.innerHTML = `
            <div class="zero-state-card">
                <div class="zero-state-icon">👥</div>
                <h4 style="color: #F8FAFC; font-size: 1.15rem; font-weight: 800; margin: 0;">No Youth Members Found</h4>
                <p style="color: #94A3B8; font-size: 0.85rem; max-width: 380px; margin: 0;">No members currently match your search query or chapter/department filters.</p>
                <button onclick="resetMemberFilters()" class="btn-secondary" style="padding: 6px 14px; font-size: 0.78rem; margin-top: 6px;">✨ Reset Filters</button>
            </div>
        `;
        return;
    }

    let currentChapterSection = null;
    const cardsHtml = [];

    const paginated = filtered.slice(0, state.membersPaginationLimit || 50);

    paginated.forEach((mem) => {
        const chapName = mem.chapter || 'EAST CHAPTER';
        const cleanChap = chapName.toUpperCase();
        if (cleanChap !== currentChapterSection) {
            currentChapterSection = cleanChap;
            const chapterCount = filtered.filter(
                (m) => (m.chapter || 'EAST CHAPTER').toUpperCase() === cleanChap
            ).length;
            cardsHtml.push(`
                <div class="mobile-chapter-section-banner" style="background: linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(15, 23, 42, 0.95)); border-left: 4px solid #38BDF8; padding: 10px 14px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; margin: 6px 0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>🏛️</span>
                        <strong style="color: #38BDF8; font-size: 0.88rem; letter-spacing: 0.04em;">${cleanChap}</strong>
                    </div>
                    <span style="font-size: 0.72rem; font-weight: 700; color: #FFF; background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); padding: 2px 10px; border-radius: 12px;">
                        ${chapterCount} Member${chapterCount !== 1 ? 's' : ''}
                    </span>
                </div>
            `);
        }

        const initial = mem.name ? mem.name.charAt(0).toUpperCase() : 'M';
        const cleanName = (mem.name || '').trim().toLowerCase();
        const isDuplicate = nameCounts[cleanName] > 1;

        const cardStyle = isDuplicate
            ? `padding: 16px; border-radius: 16px; background: rgba(245, 158, 11, 0.15); border: 2px solid #F59E0B; box-shadow: 0 4px 22px rgba(245,158,11,0.25);`
            : `padding: 16px; border-radius: 16px; background: rgba(15, 23, 42, 0.88); border: 1px solid rgba(255, 255, 255, 0.09); box-shadow: 0 4px 18px rgba(0,0,0,0.3);`;

        const dupBadgeHtml = isDuplicate
            ? `
            <span style="background: rgba(245, 158, 11, 0.25); border: 1px solid #F59E0B; color: #FBBF24; padding: 2px 8px; border-radius: 12px; font-weight: 800; font-size: 0.68rem;">⚠️ DUPLICATE (${nameCounts[cleanName]})</span>
        `
            : '';

        cardsHtml.push(`
            <div class="mobile-member-card glass-card spotlight-card stagger-item" style="${cardStyle}; --stagger-idx: ${cardsHtml.length};">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
                        <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #1E3A8A, #3B82F6); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: 800; color: #FFF; flex-shrink: 0; border: 1px solid rgba(56,189,248,0.4);">
                            ${initial}
                        </div>
                        <div style="min-width: 0;">
                            <div style="font-weight: 800; font-size: 1.02rem; color: #F8FAFC; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                                ${mem.name}
                            </div>
                            <div style="margin-top: 4px; display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                                ${dupBadgeHtml}
                                <span style="background: var(--grad-emerald); color: white; padding: 2px 10px; border-radius: 12px; font-weight: 700; font-size: 0.68rem; text-transform: uppercase;">
                                    ${mem.chapter || 'EAST'}
                                </span>
                                ${formatRoleBadge(mem.role)}
                            </div>
                        </div>
                    </div>
                    <button onclick="openMemberProfile('${mem.id}')" class="btn-secondary btn-sm" style="padding: 6px 12px; font-size: 0.75rem; border-radius: 10px; border-color: rgba(56,189,248,0.4); color: #38BDF8; flex-shrink: 0;">
                        Dossier ↗
                    </button>
                </div>

                <!-- One-Tap Communications & Contact details -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: rgba(8, 14, 30, 0.6); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); margin-bottom: 12px; font-size: 0.8rem;">
                    <div>
                        <span style="color: #64748B; font-size: 0.7rem; display: block; font-weight: 700; margin-bottom: 3px;">📞 CONTACT</span>
                        <span style="color: #FFF; font-weight: 700; font-family: 'Roboto Mono', monospace;">
                            ${mem.contactNum ? `<a href="tel:${mem.contactNum}" style="color: #38BDF8; text-decoration: none;">${mem.contactNum}</a>` : '<span style="color:#64748B;">-</span>'}
                        </span>
                    </div>
                    <div>
                        <span style="color: #64748B; font-size: 0.7rem; display: block; font-weight: 700; margin-bottom: 3px;">📧 EMAIL</span>
                        <span style="color: #FFF; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;">
                            ${mem.email ? `<a href="mailto:${mem.email}" style="color: #60A5FA; text-decoration: none;">${mem.email}</a>` : '<span style="color:#64748B;">-</span>'}
                        </span>
                    </div>
                    <div>
                        <span style="color: #64748B; font-size: 0.7rem; display: block; font-weight: 700; margin-bottom: 3px;">🎂 BIRTHDAY & AGE</span>
                        <span style="color: #CBD5E1;">${formatDateClean(mem.birthday)} (${calculateAgeClean(mem)} yrs)</span>
                    </div>
                    <div>
                        <span style="color: #64748B; font-size: 0.7rem; display: block; font-weight: 700; margin-bottom: 3px;">🏠 HOME ADDRESS</span>
                        <span style="color: #CBD5E1;">${mem.address || '-'}</span>
                    </div>
                    <div>
                        <span style="color: #64748B; font-size: 0.7rem; display: block; font-weight: 700; margin-bottom: 3px;">🏕️ YOUTH CAMP</span>
                        <span style="color: #CBD5E1;">${formatDateClean(mem.campDate)}</span>
                    </div>
                </div>

                <!-- Action Toolbar Row -->
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 10px;">
                    <div style="display: flex; gap: 6px;">
                        <button onclick="openCertificateModal('${mem.id}')" class="btn-secondary btn-sm" title="Certificate" style="padding: 6px 10px; font-size: 0.78rem; border-color: rgba(245, 158, 11, 0.4); color: #F59E0B;">
                            📜 Cert
                        </button>
                        <button onclick="window.openDigitalQRModal('${mem.id}')" class="btn-secondary btn-sm" title="QR Badge" style="padding: 6px 10px; font-size: 0.78rem; border-color: rgba(56, 189, 248, 0.4); color: #38BDF8;">
                            🏷️ QR
                        </button>
                    </div>
                    ${
                        localStorage.getItem('ps_role') !== 'CHAPTER HEAD' ||
                        (mem.chapter || 'EAST').toUpperCase() === localStorage.getItem('ps_chapter')
                            ? `
                    <div style="display: flex; gap: 6px;">
                        <button onclick="openEditMemberModal('${mem.id}')" class="btn-secondary btn-sm" title="Edit Member" style="padding: 6px 12px; font-size: 0.78rem; border-color: rgba(96, 165, 250, 0.4); color: #60A5FA;">
                            ✏️ Edit
                        </button>
                        <button onclick="deleteMember('${mem.id}')" class="btn-secondary btn-sm" title="Delete Member" style="padding: 6px 10px; font-size: 0.78rem; border-color: rgba(244, 63, 94, 0.4); color: #F43F5E;">
                            🗑️
                        </button>
                    </div>
                    `
                            : ''
                    }
                </div>
            </div>
        `);
    });

    if (filtered.length > state.membersPaginationLimit) {
        cardsHtml.push(`
            <div style="text-align: center; padding: 20px;">
                <button class="btn-primary" onclick="window.loadMoreMembers()" style="padding: 10px 24px; font-size: 0.9rem;">
                    Load More (${filtered.length - state.membersPaginationLimit} remaining)
                </button>
            </div>
        `);
    }

    container.innerHTML = cardsHtml.join('');
}

export function formatDateClean(dateStr) {
    if (!dateStr) return '<span style="color: #64748B;">-</span>';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[1]}/${parts[2]}/${parts[0]}`;
        }
        const d = new Date(dateStr);
        if (isNaN(d.getTime())) return '<span style="color: #64748B;">-</span>';
        return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`;
    } catch (e) {
        return '<span style="color: #64748B;">-</span>';
    }
}

export function clearAllMembers() {
    if (!state.members || state.members.length === 0) {
        showToast('Members list is already empty.', 'info');
        return;
    }
    if (confirm('Are you sure you want to clear all members? This action cannot be undone.')) {
        const toDelete = [...state.members];
        state.members = [];
        localStorage.setItem('ps_members_initialized', 'true');
        saveToStorage();
        renderAll();
        // Delete all from Firestore
        if (typeof MFCFirebaseCloud !== 'undefined' && MFCFirebaseCloud.initialized) {
            try {
                const db = firebase.firestore();
                toDelete.forEach((m) => {
                    if (m.id)
                        db.collection('members')
                            .doc(m.id)
                            .delete()
                            .catch((e) => console.warn('Firestore clear error:', e));
                });
            } catch (e) {
                console.warn('Firestore clear error:', e);
            }
        }
        showToast('All members have been cleared successfully.', 'info');
    }
}

export function generateMemberIDMatrixSVG(memberId = 'M-001') {
    let hash = 0;
    for (let i = 0; i < memberId.length; i++) {
        hash = (hash << 5) - hash + memberId.charCodeAt(i);
        hash |= 0;
    }
    const size = 11;
    let svgRects = '';
    const corners = [
        [0, 0],
        [0, 8],
        [8, 0],
    ];
    for (const [cx, cy] of corners) {
        svgRects += `<rect x="${cx * 14 + 2}" y="${cy * 14 + 2}" width="42" height="42" fill="#0F172A" rx="4"/>`;
        svgRects += `<rect x="${cx * 14 + 8}" y="${cy * 14 + 8}" width="30" height="30" fill="#FFF" rx="2"/>`;
        svgRects += `<rect x="${cx * 14 + 14}" y="${cy * 14 + 14}" width="18" height="18" fill="#0284C7" rx="2"/>`;
    }
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            if ((r < 3 && c < 3) || (r < 3 && c >= 8) || (r >= 8 && c < 3)) continue;
            const bit = Math.abs(Math.sin((r * 13 + c * 17 + hash) * 100)) > 0.45;
            if (bit) {
                const color = (r + c) % 4 === 0 ? '#0284C7' : '#0F172A';
                svgRects += `<rect x="${c * 14 + 4}" y="${r * 14 + 4}" width="10" height="10" fill="${color}" rx="2"/>`;
            }
        }
    }
    return `<svg viewBox="0 0 156 156" width="156" height="156" xmlns="http://www.w3.org/2000/svg">${svgRects}</svg>`;
}

export function exportMemberDossierPDF(memberId) {
    const member = state.members.find((m) => m.id === memberId);
    if (!member) return;

    if (!window.jspdf || !window.jspdf.jsPDF) {
        showToast('PDF generator library not loaded.', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFillColor(12, 24, 54);
    doc.rect(0, 0, 210, 42, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('MFC YOUTH TARLAC - MEMBER ATTENDANCE DOSSIER', 14, 18);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(56, 189, 248);
    doc.text('OFFICIAL RECORD & EVALUATION SHEET', 14, 26);
    doc.setTextColor(226, 232, 240);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 33);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Member Name: ${member.name}`, 14, 54);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(
        `Chapter: ${member.chapter || 'East'} | Role: ${member.role} | Dept: ${member.dept}`,
        14,
        61
    );
    doc.text(
        `Contact: ${member.contactNum || 'N/A'} | Birthday: ${member.birthday ? new Date(member.birthday).toLocaleDateString() : 'N/A'}`,
        14,
        67
    );

    let presentCount = 0;
    let lateCount = 0;
    let absentCount = 0;
    const totalActivities = state.activities.length;

    const rows = state.activities.map((act) => {
        const record = state.attendance[act.id]?.[memberId];
        let statusText = 'Absent';
        if (record) {
            if (record.status === 'present') {
                presentCount++;
                statusText = 'Present';
            } else if (record.status === 'late') {
                lateCount++;
                statusText = 'Late';
            } else if (record.status === 'absent') {
                absentCount++;
                statusText = 'Absent';
            }
        } else {
            absentCount++;
        }
        const dateStr = new Date(act.date).toLocaleDateString();
        return [act.name || act.title || 'Activity', dateStr, act.category || 'Event', statusText];
    });

    const rate =
        totalActivities > 0 ? Math.round(((presentCount + lateCount) / totalActivities) * 100) : 0;

    doc.setFont('helvetica', 'bold');
    doc.text(
        `Overall Attendance Rate: ${rate}% (${presentCount + lateCount} of ${totalActivities} activities attended)`,
        14,
        76
    );

    doc.autoTable({
        startY: 82,
        head: [['Activity Title', 'Date', 'Category', 'Check-in Status']],
        body: rows,
        styles: { fontSize: 9 },
        headStyles: { fillColor: [14, 165, 233] },
        alternateRowStyles: { fillColor: [241, 245, 249] },
    });

    const finalY = doc.lastAutoTable && doc.lastAutoTable.finalY ? doc.lastAutoTable.finalY : 120;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(
        'Certified Official Document - Designed & Developed by Area LIT Tarlac',
        14,
        finalY + 18
    );

    doc.save(`${member.name.replace(/[^a-zA-Z0-9]/g, '_')}_Attendance_Dossier.pdf`);
    showToast('Member Dossier PDF exported successfully!', 'success');
}

export function calculateAgeFromBirthday() {
    const bdayInput = document.getElementById('mem-birthday');
    const ageInput = document.getElementById('mem-age');
    if (!bdayInput || !ageInput || !bdayInput.value) return;

    const birthDate = new Date(bdayInput.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age >= 0 && age <= 120) {
        ageInput.value = age;
    }
}

export function closeAddMemberModal() {
    const backdrop = document.getElementById('add-member-backdrop');
    if (backdrop) backdrop.style.display = 'none';
}

export function handleAddMemberSubmit(event) {
    event.preventDefault();
    const idEl = document.getElementById('form-mem-id');
    const firstEl = document.getElementById('mem-first-name');
    const midEl = document.getElementById('mem-middle-name');
    const lastEl = document.getElementById('mem-last-name');
    const chapterEl = document.getElementById('mem-chapter');
    const statusEl = document.getElementById('mem-status');
    const roleEl = document.getElementById('mem-role');
    const deptEl = document.getElementById('mem-dept');
    const emailEl = document.getElementById('mem-email');
    const bdayEl = document.getElementById('mem-birthday');
    const ageEl = document.getElementById('mem-age');
    const addressEl = document.getElementById('mem-address');
    const contactEl = document.getElementById('mem-contact');
    const parentsEl = document.getElementById('mem-parents-contact');
    const campDateEl = document.getElementById('mem-camp-date');
    const campTitleEl = document.getElementById('mem-camp-title');
    const covenantEl = document.getElementById('mem-covenant-date');

    if (!firstEl || !lastEl) return;

    const first = firstEl.value.trim();
    const mid = midEl ? midEl.value.trim() : '';
    const last = lastEl.value.trim();

    if (!first || !last) {
        showToast('Please enter both First Name and Last Name.', 'error');
        return;
    }

    const fullName = [first, mid, last].filter(Boolean).join(' ');

    if (!state.members) state.members = [];

    // Duplicate Check when adding a new member
    if (!idEl || !idEl.value) {
        const duplicate = state.members.find(
            (m) => m.name.toLowerCase() === fullName.toLowerCase()
        );
        if (duplicate) {
            if (
                !confirm(
                    `Warning: Member "${fullName}" already exists in the directory. Add duplicate anyway?`
                )
            ) {
                return;
            }
        }
    }

    const memberData = {
        name: fullName,
        firstName: first,
        middleName: mid,
        lastName: last,
        chapter: chapterEl ? chapterEl.value : 'EAST',
        status: statusEl ? statusEl.value : 'Active',
        role: roleEl && roleEl.value.trim() ? roleEl.value.trim() : 'Member',
        dept: deptEl ? deptEl.value : 'Outreach & Fellowship',
        email: emailEl ? emailEl.value.trim() : '',
        birthday: bdayEl ? bdayEl.value : '',
        age: ageEl ? ageEl.value : '',
        address: addressEl ? addressEl.value.trim() : '',
        contactNum: contactEl ? contactEl.value.trim() : '',
        parentsContact: parentsEl ? parentsEl.value.trim() : '',
        campDate: campDateEl ? campDateEl.value : '',
        campTitle: campTitleEl ? campTitleEl.value.trim() : '',
        covenantDate: covenantEl ? covenantEl.value : '',
    };

    if (idEl && idEl.value) {
        const idx = state.members.findIndex((m) => m.id === idEl.value);
        if (idx !== -1) {
            state.members[idx] = { ...state.members[idx], ...memberData };
            // Sync updated member to Firestore
            if (
                typeof MFCFirebaseCloud !== 'undefined' &&
                MFCFirebaseCloud.enabled &&
                MFCFirebaseCloud.syncMember
            ) {
                MFCFirebaseCloud.syncMember(state.members[idx]);
                if (typeof MFCFirebaseCloud.pushSnapshot === 'function') {
                    MFCFirebaseCloud.pushSnapshot();
                }
            }
            showToast(`Member "${fullName}" updated successfully!`, 'success');
            logAuditAction(`Updated member record: ${fullName}`, 'members');
        }
    } else {
        const newMember = {
            id: 'm-' + Date.now(),
            dept: 'Outreach',
            ...memberData,
        };
        state.members.push(newMember);
        // Sync new member to Firestore
        if (
            typeof MFCFirebaseCloud !== 'undefined' &&
            MFCFirebaseCloud.enabled &&
            MFCFirebaseCloud.syncMember
        ) {
            MFCFirebaseCloud.syncMember(newMember);
            if (typeof MFCFirebaseCloud.pushSnapshot === 'function') {
                MFCFirebaseCloud.pushSnapshot();
            }
        }
        showToast(`New member "${fullName}" added to organization!`, 'success');
        logAuditAction(`Added new member: ${fullName}`, 'members');
    }

    saveToStorage();
    renderAll();
    closeAddMemberModal();
}
