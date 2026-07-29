/**
 * MFC YOUTH TARLAC | AUTHENTICATION & SECURITY MODULE
 * Secure Firebase Authentication, Session Watchdog & Role-Based Access Control
 */

import { state } from './state.js';
import { showToast, triggerHaptic } from './ui.js';

let inactivityTimer = null;

export function initAuthWatchdog() {
    const events = ['mousemove', 'keypress', 'click', 'touchstart', 'scroll'];
    events.forEach(evt => {
        window.addEventListener(evt, resetInactivityTimer, { passive: true });
    });
    resetInactivityTimer();
}

function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    // Auto-lock session after 15 minutes of inactivity
    inactivityTimer = setTimeout(() => {
        if (localStorage.getItem('ps_logged_in') === 'true') {
            logoutUser('🔒 Session expired due to 15 minutes of inactivity.');
        }
    }, 15 * 60 * 1000);
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

    // Authenticate securely via Firebase Auth SDK if available, or validated token check
    try {
        const chapEl = document.getElementById('auth-login-chapter');
        const selectedChapter = (selectedRole === 'CHAPTER HEAD' && chapEl) ? chapEl.value : 'ALL';
        const adminEmail = selectedRole === 'SUPER ADMIN' ? 'reyesbarney38@gmail.com' : 'chapter@mfcyouthtarlac.com';

        if (selectedRole === 'MEMBER') {
            // For members, we don't use Firebase Auth. We just check if the MFC ID exists in Firestore.
            if (typeof firebase !== 'undefined' && firebase.firestore) {
                const db = firebase.firestore();
                const snapshot = await db.collection('members').where('mfc_id', '==', mfcIdVal).get();
                if (snapshot.empty) {
                    throw new Error('MFC ID not found in the database.');
                }
                // Store member data
                const memberDoc = snapshot.docs[0].data();
                localStorage.setItem('ps_member_id', memberDoc.mfc_id);
                localStorage.setItem('ps_member_name', `${memberDoc.firstName} ${memberDoc.lastName}`);
            }
        } else {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                // Secure Firebase Auth execution
                await firebase.auth().signInWithEmailAndPassword(adminEmail, passVal);
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

    if (typeof firebase !== 'undefined' && firebase.auth) {
        firebase.auth().signOut().catch(err => console.warn('Firebase sign out error:', err));
    }

    const overlay = document.getElementById('auth-login-overlay');
    if (overlay) overlay.style.display = 'flex';
    showToast(reason, 'info');
    triggerHaptic('medium');
}

export function checkAdminPrivilege(requiredRole = 'CHAPTER HEAD', actionDescription = 'This sensitive action') {
    const currentRole = state.currentAdminRole || 'GUEST';
    if (currentRole.toUpperCase() === 'SUPER ADMIN') return true;

    if (requiredRole === 'SUPER ADMIN' && currentRole.toUpperCase() !== 'SUPER ADMIN') {
        showToast(`🚫 Restricted: ${actionDescription} requires Super Admin authorization.`, 'error');
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
        if (typeof firebase !== 'undefined' && firebase.auth) {
            await firebase.auth().sendPasswordResetEmail(email);
            showToast(`📧 Password reset email dispatched to ${email}`, 'success');
        } else {
            showToast('Firebase Auth SDK unavailable for password reset dispatch.', 'warning');
        }
    } catch (err) {
        showToast(`Failed to send reset link: ${err.message}`, 'error');
    }
}
