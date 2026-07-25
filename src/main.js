/**
 * MFC YOUTH TARLAC | MAIN APPLICATION ENTRYPOINT
 * Modular Initialization & Global App Shell Bindings
 */

import { state, loadFromStorage, subscribeState } from './modules/state.js';
import { switchView, toggleMobileSidebar, closeMobileSidebar, showToast, copyToClipboardText } from './modules/ui.js';
import { loginUser, logoutUser, initAuthWatchdog, sendPasswordReset } from './modules/auth.js';
import { MFCFirebaseCloud } from './modules/firebase.js';
import { renderMembersTable, openDigitalQRModal, closeDigitalQRModal } from './modules/members.js';
import { renderAttendanceView, setMemberAttendance, startLiveQRScanner, stopLiveQRScanner } from './modules/attendance.js';
import { renderActivitiesTable } from './modules/activities.js';
import { renderDashboardCharts, generateExecutiveSummaryReport } from './modules/reports.js';

document.addEventListener('DOMContentLoaded', () => {
    // If script.js initialized the core app, bind additional navigation listeners safely
    setupNavigationListeners();

    if (typeof window.initApp !== 'function') {
        loadFromStorage();
        initAuthWatchdog();
        MFCFirebaseCloud.init();
        renderAllViews();
        subscribeState(() => {
            renderAllViews();
        });
    }

    // Bind global window helpers for legacy inline event handlers
    window.switchView = window.switchView || switchView;
    window.toggleMobileSidebar = window.toggleMobileSidebar || toggleMobileSidebar;
    window.closeMobileSidebar = window.closeMobileSidebar || closeMobileSidebar;
    window.loginUser = window.loginUser || loginUser;
    window.logoutUser = window.logoutUser || logoutUser;
    window.openDigitalQRModal = window.openDigitalQRModal || openDigitalQRModal;
    window.closeDigitalQRModal = window.closeDigitalQRModal || closeDigitalQRModal;
    window.startLiveQRScanner = window.startLiveQRScanner || startLiveQRScanner;
    window.stopLiveQRScanner = window.stopLiveQRScanner || stopLiveQRScanner;
    window.generateExecutiveSummaryReport = window.generateExecutiveSummaryReport || generateExecutiveSummaryReport;
    window.sendPasswordReset = window.sendPasswordReset || sendPasswordReset;
});

function setupNavigationListeners() {
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
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
    renderMembersTable();
    renderAttendanceView();
    renderActivitiesTable();
    renderDashboardCharts();
}
