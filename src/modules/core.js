import { loadFromStorage } from './state.js';
import { closeMobileSidebar } from './ui.js';
import { MFCFirebaseCloud } from './firebase.js';
import { applyStoredTheme, initPWAInstallListener } from './legacy.js';

export function setupSpotlights() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.spotlight-card, .glass-card');
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x >= -100 && x <= rect.width + 100 && y >= -100 && y <= rect.height + 100) {
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            }
        });
    });
}

export function animateCounter(el, targetValue, duration = 650, prefix = '', suffix = '') {
    if (!el) return;
    const startValue = parseInt(el.dataset.currentVal || '0', 10) || 0;
    if (startValue === targetValue && el.textContent) {
        el.textContent = prefix + targetValue.toLocaleString() + suffix;
        return;
    }
    el.dataset.currentVal = targetValue;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentNum = Math.round(startValue + (targetValue - startValue) * easeProgress);
        el.textContent = prefix + currentNum.toLocaleString() + suffix;
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = prefix + targetValue.toLocaleString() + suffix;
        }
    }
    requestAnimationFrame(updateCounter);
}

export function initApp() {
    loadFromStorage();
    // setupEventListeners();
    setupSpotlights();
    renderAll();
    if (window.innerWidth <= 1024) {
        closeMobileSidebar();
    }
    if (typeof MFCFirebaseCloud !== 'undefined') {
        MFCFirebaseCloud.init();
    }
    if (typeof initPWAInstallListener === 'function') initPWAInstallListener();
    if (typeof applyStoredTheme === 'function') applyStoredTheme();
    window.activeKeyboardIndex = 0;

    // Removed auto log out website on initial load / refresh so users stay logged in
}

export function updateSyncStatus(status = 'saved') {
    const pill = document.getElementById('cloud-sync-pill');
    if (!pill) return;
    if (status === 'syncing') {
        pill.className = 'cloud-sync-pill syncing';
        pill.innerHTML = '<span>🔄 Syncing...</span>';
    } else {
        pill.className = 'cloud-sync-pill synced';
        const isCloud = typeof MFCFirebaseCloud !== 'undefined' && MFCFirebaseCloud.enabled;
        pill.innerHTML = isCloud ? '<span>🟢 Cloud Synced</span>' : '<span>🟢 Saved Locally</span>';
    }
}

export function updateBadgeCount() {
    if (window.updateBadgeCount) window.updateBadgeCount();
}
