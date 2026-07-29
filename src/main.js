/**
 * MFC YOUTH TARLAC | MAIN APPLICATION ENTRYPOINT
 * Modular Initialization & Global App Shell Bindings
 */

import { state, loadFromStorage, subscribeState } from './modules/state.js';
import { switchView, toggleMobileSidebar, closeMobileSidebar, showToast, copyToClipboardText, openWhatsNewModal, closeWhatsNewModal } from './modules/ui.js';
import { loginUser, logoutUser, initAuthWatchdog, sendPasswordReset } from './modules/auth.js';
import { MFCFirebaseCloud } from './modules/firebase.js';
import { openDigitalQRModal, closeDigitalQRModal, printMemberQRCard } from './modules/members.js';
import { populateAttendanceDropdown, renderAttendanceRoster, toggleAttendance, triggerAbsenteeAutoGmailPrompt, filterAttendanceRoster, batchMarkChapterPresent, sendGmailToCurrentAbsentees, updateRemarks, updateLiveProgress, markAllPresent, markAllAbsent, resetAttendanceSheet, startLiveQRScanner, stopLiveQRScanner, simulateQRCheckIn } from './modules/attendance.js';
import { renderActivitiesTable } from './modules/activities.js';
import { renderDashboardCharts, generateExecutiveSummaryReport, renderAnalytics, exportToCSV, exportToPDF, exportMembersToPDF, exportMembersCSV, exportActivitiesCSV, exportAttendanceCSV, exportFundsCSV } from './modules/reports.js';
import { renderDashboard, renderAgendaTimeline, updatePastoralCareWidget, jumpToAttendance } from './modules/dashboard.js';
import { initializeEventListeners } from './modules/events.js';

document.addEventListener('DOMContentLoaded', () => {
    // If script.js initialized the core app, bind additional navigation listeners safely
    setupNavigationListeners();
    initializeEventListeners();
    
    // Call legacy mobile gestures if present in script.js
    if (typeof window.initMobileNativeGestures === 'function') {
        window.initMobileNativeGestures();
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
    window.renderDashboardCharts = window.renderDashboardCharts || renderDashboardCharts;
    
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
    renderDashboard();
    if (window.renderMembersTable) window.renderMembersTable();
    populateAttendanceDropdown();
    renderAttendanceRoster();
    renderActivitiesTable();
}
