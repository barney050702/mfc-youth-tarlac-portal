/**
 * MFC YOUTH TARLAC | UI HELPER & DOM UTILITIES
 * XSS-Safe DOM builders, Toast Alerts, Haptic Feedback & View Navigation
 */

import { state } from './state.js';

export function escapeHTML(str) {
    if (typeof str !== 'string') return str === null || str === undefined ? '' : String(str);
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export function triggerHaptic(type = 'light') {
    if ('vibrate' in navigator) {
        if (type === 'light') navigator.vibrate(15);
        else if (type === 'medium') navigator.vibrate(30);
        else if (type === 'success') navigator.vibrate([20, 50, 20]);
        else if (type === 'error') navigator.vibrate([50, 100, 50, 100]);
    }
}

export function showToast(message, type = 'info', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 100000; display: flex; flex-direction: column; gap: 10px; max-width: 90vw; pointer-events: none;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const bgMap = {
        success: 'rgba(16, 185, 129, 0.95)',
        error: 'rgba(239, 68, 68, 0.95)',
        warning: 'rgba(245, 158, 11, 0.95)',
        info: 'rgba(14, 165, 233, 0.95)'
    };
    
    toast.style.cssText = `
        background: ${bgMap[type] || bgMap.info};
        color: #FFFFFF;
        padding: 12px 20px;
        border-radius: 12px;
        font-family: 'Inter', system-ui, sans-serif;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        backdrop-filter: blur(10px);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: auto;
    `;
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

export function switchView(viewId) {
    if (typeof window !== 'undefined' && typeof window.switchView === 'function' && window.switchView !== switchView) {
        return window.switchView(viewId);
    }

    state.currentView = viewId;
    triggerHaptic('light');

    document.querySelectorAll('.nav-item, .sidebar-nav-item, .bottom-nav-item, .mobile-nav-item').forEach(btn => {
        if (btn.getAttribute('data-view') === viewId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    document.querySelectorAll('.view-panel').forEach(panel => {
        const targetViewId = (viewId === 'servants') ? 'members' : viewId;
        if (panel.id === `view-${targetViewId}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });

    closeMobileSidebar();
}

export function toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.toggle('open');
    if (backdrop) backdrop.classList.toggle('open');
}

export function closeMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
}

export function initMobileNativeGestures() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    let touchStartX = 0;
    let touchEndX = 0;

    sidebar.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sidebar.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        // Swipe left
        if (touchStartX - touchEndX > threshold) {
            closeMobileSidebar();
        }
    }
}

export function copyToClipboardText(text, successMsg = 'Copied to clipboard!') {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMsg, 'success');
            triggerHaptic('success');
        }).catch(() => fallbackCopy(text, successMsg));
    } else {
        fallbackCopy(text, successMsg);
    }
}

function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast(successMsg, 'success');
    } catch (err) {
        showToast('Failed to copy text', 'error');
    }
    document.body.removeChild(textArea);
}

export function openWhatsNewModal() {
    const modal = document.getElementById('whats-new-modal-backdrop');
    if (modal) {
        modal.style.display = 'flex';
    }
}

export function closeWhatsNewModal() {
    const modal = document.getElementById('whats-new-modal-backdrop');
    if (modal) {
        modal.style.display = 'none';
    }
}

export function switchResourceCategory(category) {
    switchView('resources');

    // Make sure subnav is open
    const subnav = document.getElementById('subnav-resources');
    const chevron = document.getElementById('chevron-resources');
    if (subnav && subnav.style.display === 'none') {
        subnav.style.display = 'flex';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    }

    // Highlight sidebar subnav item
    document.querySelectorAll('.nav-sub-item').forEach(el => {
        el.style.color = '#94A3B8';
        el.style.fontWeight = '500';
    });
    const activeSub = document.getElementById(`sub-${category}`);
    if (activeSub) {
        activeSub.style.color = '#60A5FA';
        activeSub.style.fontWeight = '700';
    }

    // Highlight top tab buttons inside view-resources
    document.querySelectorAll('.resource-tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        btn.style.background = 'rgba(15, 23, 42, 0.4)';
        btn.style.color = '#94A3B8';
    });
    const activeBtn = document.getElementById(`btn-res-${category}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        activeBtn.style.background = 'rgba(56, 189, 248, 0.15)';
        activeBtn.style.color = '#38BDF8';
    }

    // Show selected section cards
    document.querySelectorAll('.resource-section').forEach(sec => {
        sec.style.display = 'none';
    });
    const targetSec = document.getElementById(`res-section-${category}`);
    if (targetSec) {
        targetSec.style.display = 'grid';
    }

    // Show dynamic user-added cards for this category
    ['youthcamp', 'trainings', 'songboard', 'holyrosary', 'letters'].forEach(cat => {
        const dynDiv = document.getElementById(`res-dynamic-${cat}`);
        if (dynDiv) dynDiv.style.display = cat === category ? 'grid' : 'none';
    });
}
