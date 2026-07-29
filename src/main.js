/**
 * MFC YOUTH TARLAC | MAIN APPLICATION ENTRYPOINT
 * Modular Initialization & Global App Shell Bindings
 */

import { state, loadFromStorage, subscribeState } from './modules/state.js';
import { switchView, toggleMobileSidebar, closeMobileSidebar, showToast, copyToClipboardText, openWhatsNewModal, closeWhatsNewModal, initMobileNativeGestures } from './modules/ui.js';
import { loginUser, logoutUser, initAuthWatchdog, sendPasswordReset } from './modules/auth.js';
import { MFCFirebaseCloud } from './modules/firebase.js';
import { openDigitalQRModal, closeDigitalQRModal, printMemberQRCard } from './modules/members.js';
import { populateAttendanceDropdown, renderAttendanceRoster, toggleAttendance, triggerAbsenteeAutoGmailPrompt, filterAttendanceRoster, batchMarkChapterPresent, sendGmailToCurrentAbsentees, updateRemarks, updateLiveProgress, markAllPresent, markAllAbsent, resetAttendanceSheet, startLiveQRScanner, stopLiveQRScanner, simulateQRCheckIn } from './modules/attendance.js';
import { renderActivitiesTable } from './modules/activities.js';
import { renderInteractiveCharts, generateExecutiveSummaryReport, renderAnalytics, exportToCSV, exportToPDF, exportMembersToPDF, exportMembersCSV, exportActivitiesCSV, exportAttendanceCSV, exportFundsCSV } from './modules/reports.js';
import { renderDashboard, renderAgendaTimeline, updatePastoralCareWidget, jumpToAttendance } from './modules/dashboard.js';
import { initializeEventListeners } from './modules/events.js';

document.addEventListener('DOMContentLoaded', () => {
    // If script.js initialized the core app, bind additional navigation listeners safely
    setupNavigationListeners();
    initializeEventListeners();
    
    // Call legacy mobile gestures if present in script.js
    if (typeof window.initMobileNativeGestures === 'function') {
        window.initMobileNativeGestures();
    } else if (typeof initMobileNativeGestures === 'function') {
        initMobileNativeGestures();
    }

    loadFromStorage();
    initAuthWatchdog();
    MFCFirebaseCloud.init();
    renderAllViews();
    subscribeState(() => {
        renderAllViews();
    });

    window.switchView = window.switchView || switchView;
    window.toggleMobileSidebar = window.toggleMobileSidebar || toggleMobileSidebar;
    window.closeMobileSidebar = window.closeMobileSidebar || closeMobileSidebar;
    window.loginUser = window.loginUser || loginUser;
    window.logoutUser = window.logoutUser || logoutUser;
    window.openDigitalQRModal = window.openDigitalQRModal || openDigitalQRModal;
    window.closeDigitalQRModal = window.closeDigitalQRModal || closeDigitalQRModal;
    window.printMemberQRCard = window.printMemberQRCard || printMemberQRCard;
    window.startLiveQRScanner = window.startLiveQRScanner || startLiveQRScanner;
    window.stopLiveQRScanner = window.stopLiveQRScanner || stopLiveQRScanner;
    window.simulateQRCheckIn = window.simulateQRCheckIn || simulateQRCheckIn;
    window.generateExecutiveSummaryReport = window.generateExecutiveSummaryReport || generateExecutiveSummaryReport;
    window.sendPasswordReset = window.sendPasswordReset || sendPasswordReset;
    window.openWhatsNewModal = window.openWhatsNewModal || openWhatsNewModal;
    window.closeWhatsNewModal = window.closeWhatsNewModal || closeWhatsNewModal;
    
    // Dashboard & Reports exports
    window.renderDashboard = window.renderDashboard || renderDashboard;
    window.renderAgendaTimeline = window.renderAgendaTimeline || renderAgendaTimeline;
    window.updatePastoralCareWidget = window.updatePastoralCareWidget || updatePastoralCareWidget;
    window.jumpToAttendance = window.jumpToAttendance || jumpToAttendance;
    window.renderInteractiveCharts = window.renderInteractiveCharts || renderInteractiveCharts;
    
    // Attendance Engine exports
    window.populateAttendanceDropdown = window.populateAttendanceDropdown || populateAttendanceDropdown;
    window.renderAttendanceRoster = window.renderAttendanceRoster || renderAttendanceRoster;
    window.toggleAttendance = window.toggleAttendance || toggleAttendance;
    window.triggerAbsenteeAutoGmailPrompt = window.triggerAbsenteeAutoGmailPrompt || triggerAbsenteeAutoGmailPrompt;
    window.filterAttendanceRoster = window.filterAttendanceRoster || filterAttendanceRoster;
    window.batchMarkChapterPresent = window.batchMarkChapterPresent || batchMarkChapterPresent;
    window.sendGmailToCurrentAbsentees = window.sendGmailToCurrentAbsentees || sendGmailToCurrentAbsentees;
    window.updateRemarks = window.updateRemarks || updateRemarks;
    window.updateLiveProgress = window.updateLiveProgress || updateLiveProgress;
    window.markAllPresent = window.markAllPresent || markAllPresent;
    window.markAllAbsent = window.markAllAbsent || markAllAbsent;
    window.resetAttendanceSheet = window.resetAttendanceSheet || resetAttendanceSheet;
    
    // Dashboard & Reports exports
    window.renderAnalytics = window.renderAnalytics || renderAnalytics;
    window.exportToCSV = window.exportToCSV || exportToCSV;
    window.exportToPDF = window.exportToPDF || exportToPDF;
    window.exportMembersToPDF = window.exportMembersToPDF || exportMembersToPDF;
    window.exportMembersCSV = window.exportMembersCSV || exportMembersCSV;
    window.exportActivitiesCSV = window.exportActivitiesCSV || exportActivitiesCSV;
    window.exportAttendanceCSV = window.exportAttendanceCSV || exportAttendanceCSV;
    window.exportFundsCSV = window.exportFundsCSV || exportFundsCSV;
});

function setupNavigationListeners() {
    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            if (view) switchView(view);
        });
    });

    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
}

function renderAllViews() {
    const isMember = localStorage.getItem('ps_role') === 'MEMBER';
    
    // Toggle nav items
    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach(item => {
        const view = item.getAttribute('data-view');
        if (isMember) {
            item.style.display = (view === 'member-dashboard') ? 'flex' : 'none';
        } else {
            item.style.display = (view === 'member-dashboard') ? 'none' : 'flex';
        }
    });

    if (isMember) {
        if (typeof window.switchView === 'function') window.switchView('member-dashboard');
        // Render member dashboard info
        const memberName = localStorage.getItem('ps_member_name') || 'Member';
        const memberId = localStorage.getItem('ps_member_id') || 'Unknown';
        const nameEl = document.getElementById('member-dash-name');
        if (nameEl) nameEl.textContent = memberName.split(' ')[0];
        
        // Generate QR
        const qrContainer = document.getElementById('member-dash-qr');
        if (qrContainer && typeof QRCode !== 'undefined') {
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: memberId,
                width: 150,
                height: 150,
                colorDark: "#090D16",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
        }
        // Fetch Attendance
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            const db = firebase.firestore();
            db.collection('attendance').where('mfc_id', '==', memberId).orderBy('timestamp', 'desc').limit(5).get().then(snapshot => {
                const listEl = document.getElementById('member-dash-attendance-list');
                if (!listEl) return;
                
                if (snapshot.empty) {
                    listEl.innerHTML = `
                        <div class="empty-state" style="text-align: center; padding: 20px;">
                            <p>No recent attendance records found.</p>
                        </div>
                    `;
                    return;
                }
                
                let html = '';
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const dateStr = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'}) : 'Unknown Date';
                    const statusColor = data.status === 'Present' ? '#34D399' : (data.status === 'Absent' ? '#EF4444' : '#F59E0B');
                    html += `
                        <div style="background: rgba(15, 23, 42, 0.6); padding: 12px 16px; border-radius: 8px; border-left: 4px solid ${statusColor}; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">${data.activity_name || 'Activity'}</h4>
                                <span style="font-size: 0.8rem; color: var(--text-muted);">${dateStr}</span>
                            </div>
                            <span style="font-weight: 700; color: ${statusColor};">${data.status}</span>
                        </div>
                    `;
                });
                listEl.innerHTML = html;
            }).catch(err => {
                console.warn('Error fetching member attendance:', err);
                const listEl = document.getElementById('member-dash-attendance-list');
                if (listEl) listEl.innerHTML = `<p style="color:#EF4444;">Failed to load records.</p>`;
            });
        }
    } else {
        renderDashboard();
        if (window.renderMembersTable) window.renderMembersTable();
        populateAttendanceDropdown();
        renderAttendanceRoster();
        renderActivitiesTable();
        if (window.renderInteractiveCharts) window.renderInteractiveCharts();
    }
}
window.renderAll = renderAllViews;
