/**
 * MFC YOUTH TARLAC | AUTHENTICATION & SECURITY MODULE
 * Secure Firebase Authentication, Session Watchdog & Role-Based Access Control
 */

import { state } from './state.js';
import { showToast, triggerHaptic } from './ui.js';
import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

let inactivityTimer = null;

export function initAuthWatchdog() {
    const events = ['mousemove', 'keypress', 'click', 'touchstart', 'scroll'];
    events.forEach((evt) => {
        window.addEventListener(evt, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();
}

function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    // Auto-lock session after 15 minutes of inactivity
    inactivityTimer = setTimeout(
        () => {
            if (localStorage.getItem('ps_logged_in') === 'true') {
                logoutUser('🔒 Session expired due to 15 minutes of inactivity.');
            }
        },
        15 * 60 * 1000
    );
}

export async function loginUser(event) {
    if (event) event.preventDefault();

    const passEl = document.getElementById('auth-login-password');
    const errMsgEl = document.getElementById('login-error-msg');
    const passVal = passEl && passEl.value ? passEl.value.trim() : '';
    const mfcIdEl = document.getElementById('auth-login-mfc-id');
    const mfcIdVal = mfcIdEl && mfcIdEl.value ? mfcIdEl.value.trim() : '';

    const roleEl = document.getElementById('auth-login-role');
    const selectedRole = roleEl ? roleEl.value : 'SUPER ADMIN';

    if (selectedRole !== 'MEMBER' && !passVal) {
        if (errMsgEl) {
            errMsgEl.textContent = '⚠️ Please enter the chapter security password.';
            errMsgEl.style.display = 'block';
        }
        return;
    }

    if (selectedRole === 'MEMBER' && !mfcIdVal) {
        if (errMsgEl) {
            errMsgEl.textContent = '⚠️ Please enter your MFC ID.';
            errMsgEl.style.display = 'block';
        }
        return;
    }

    try {
        const chapEl = document.getElementById('auth-login-chapter');
        const selectedChapter = selectedRole === 'CHAPTER HEAD' && chapEl ? chapEl.value : 'ALL';
        // Since loginUser (vanilla) does not ask for email, it's considered legacy.
        // We throw an error to force them to use the new React Login UI.
        const adminEmail = '';
        if (selectedRole !== 'MEMBER') {
            throw new Error('Vanilla login deprecated for Admins. Please use the React Login UI.');
        }

        if (selectedRole === 'MEMBER') {
            if (db) {
                const memberDocRef = doc(db, 'members', mfcIdVal);
                const snapshot = await getDoc(memberDocRef);

                if (!snapshot.exists()) {
                    throw new Error('MFC ID not found in the database.');
                }

                const memberDoc = snapshot.data();
                localStorage.setItem('ps_member_id', snapshot.id);
                localStorage.setItem(
                    'ps_member_name',
                    `${memberDoc.firstName || ''} ${memberDoc.lastName || ''}`.trim()
                );
            } else {
                throw new Error('Database not initialized');
            }
        } else {
            if (auth) {
                if (!adminEmail) throw new Error('Email not provided');
                await signInWithEmailAndPassword(auth, adminEmail, passVal);
            } else {
                throw new Error('Auth not initialized');
            }
        }

        if (errMsgEl) errMsgEl.style.display = 'none';
        if (passEl) passEl.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        if (mfcIdEl) mfcIdEl.style.borderColor = 'rgba(255, 255, 255, 0.2)';

        state.failedLoginAttempts = 0;
        state.currentAdminEmail = adminEmail;
        state.currentAdminRole = selectedRole;

        localStorage.setItem('ps_logged_in', 'true');
        localStorage.setItem('ps_role', selectedRole);
        localStorage.setItem('ps_chapter', selectedChapter);

        const overlay = document.getElementById('auth-login-overlay');
        if (overlay) overlay.style.display = 'none';
        if (passEl) passEl.value = '';

        showToast(`🔓 Access granted. Logged in as ${selectedRole}.`, 'success');
        triggerHaptic('success');
    } catch (err) {
        console.warn('Firebase Auth Verification notice:', err.message);
        if (errMsgEl) {
            errMsgEl.textContent = '🚫 Access denied. Incorrect password or Firebase auth error.';
            errMsgEl.style.display = 'block';
        } else {
            showToast('🚫 Access denied. Incorrect security credentials.', 'error');
        }
        triggerHaptic('error');
        if (passEl) {
            passEl.value = '';
            passEl.focus();
            passEl.style.borderColor = '#EF4444';
        }
    }
}

export function logoutUser(reason = 'Logged out successfully.') {
    localStorage.removeItem('ps_logged_in');
    localStorage.removeItem('ps_role');
    localStorage.removeItem('ps_chapter');
    localStorage.removeItem('ps_member_id');
    localStorage.removeItem('ps_member_name');
    sessionStorage.removeItem('ps_logged_in');

    if (auth) {
        signOut(auth).catch((err) => console.warn('Firebase sign out error:', err));
    }

    // Trigger React Login UI immediately
    window.dispatchEvent(new Event('ps_logout'));

    setTimeout(() => {
        window.location.reload();
    }, 1000);
    showToast(reason, 'info');
    triggerHaptic('medium');
}

export function checkAdminPrivilege(
    requiredRole = 'CHAPTER HEAD',
    actionDescription = 'This sensitive action'
) {
    const currentRole = state.currentAdminRole || 'GUEST';
    if (currentRole.toUpperCase() === 'SUPER ADMIN') return true;

    if (requiredRole === 'SUPER ADMIN' && currentRole.toUpperCase() !== 'SUPER ADMIN') {
        showToast(
            `🚫 Restricted: ${actionDescription} requires Super Admin authorization.`,
            'error'
        );
        triggerHaptic('error');
        return false;
    }
    return true;
}

export async function sendPasswordReset(email) {
    if (!email) {
        showToast('Please enter an admin email address.', 'error');
        return;
    }
    try {
        if (auth) {
            await sendPasswordResetEmail(auth, email);
            showToast(`📧 Password reset email dispatched to ${email}`, 'success');
        } else {
            showToast('Firebase Auth SDK unavailable for password reset dispatch.', 'warning');
        }
    } catch (err) {
        showToast(`Failed to send reset link: ${err.message}`, 'error');
    }
}
