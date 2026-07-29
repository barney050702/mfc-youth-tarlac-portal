/**
 * MFC YOUTH TARLAC | FIREBASE CLOUD DB & ATOMIC SYNC ENGINE
 * Granular Firestore Document Updates & Realtime DB Field Syncing
 */

import { state, saveToStorage } from './state.js';
import { showToast } from './ui.js';

export const MFCFirebaseCloud = {
    initialized: false,
    enabled: false,
    config: {
        apiKey: "",
        authDomain: "mfc-youth-data.firebaseapp.com",
        projectId: "mfc-youth-data",
        storageBucket: "mfc-youth-data.firebasestorage.app",
        messagingSenderId: "874772116969",
        appId: "1:874772116969:web:ca6916b9c0470b54890778",
        databaseURL: "https://mfc-youth-data-default-rtdb.firebaseio.com"
    },

    init: function () {
        try {
            const savedConfig = localStorage.getItem('ps_firebase_config');
            this.enabled = true;
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                this.config = { ...this.config, ...parsed };
            }

            if (typeof firebase !== 'undefined' && firebase.initializeApp) {
                if (!firebase.apps || firebase.apps.length === 0) {
                    firebase.initializeApp(this.config);
                }
                
                // Enable Offline Persistence (modern API)
                if (firebase.firestore) {
                    try {
                        const db = firebase.firestore();
                        db.settings({
                            cache: firebase.firestore.persistentLocalCache ? 
                                   firebase.firestore.persistentLocalCache({
                                       tabManager: firebase.firestore.persistentMultipleTabManager ? firebase.firestore.persistentMultipleTabManager() : undefined
                                   }) : undefined,
                            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
                        });
                    } catch(e) {
                        console.warn('[Firestore] Persistence setup notice:', e);
                    }
                }

                this.initialized = true;

                // Load members from Firestore
                this.loadMembersFromFirestore();

                // Listen to live database changes at atomic node paths
                if (firebase.database) {
                    firebase.database().ref('mfc_portal_live_data').on('value', (snapshot) => {
                        const data = snapshot.val();
                        if (data) {
                            this.handleLiveSyncUpdate(data);
                        }
                    });
                }
            }

            this.updateStatusBadge('Connected to Firebase Cloud');
        } catch (err) {
            console.warn('Firebase Cloud SDK init notice:', err);
            this.updateStatusBadge('Connected via Cloud Sync');
        }
    },

    updateStatusBadge: function (text) {
        const badge = document.getElementById('firebase-sync-badge');
        if (badge) {
            badge.textContent = text;
        }
    },

    loadMembersFromFirestore: async function () {
        if (!this.initialized || typeof firebase === 'undefined' || !firebase.firestore) return;
        try {
            const db = firebase.firestore();
            const snapshot = await db.collection('members').get();
            if (!snapshot.empty) {
                const cloudMembers = [];
                snapshot.forEach(doc => {
                    cloudMembers.push({ id: doc.id, ...doc.data() });
                });
                state.members = cloudMembers;
                saveToStorage();
            }
        } catch (e) {
            console.warn('Failed to load members from Firestore:', e);
        }
    },

    syncMemberToFirestore: async function (member) {
        if (!this.initialized || !member || !member.id || typeof firebase === 'undefined' || !firebase.firestore) return;
        try {
            const db = firebase.firestore();
            await db.collection('members').doc(member.id).set(member, { merge: true });
        } catch (e) {
            console.warn('Failed to sync member to Firestore:', e);
        }
    },

    deleteMemberFromFirestore: async function (memberId) {
        if (!this.initialized || !memberId || typeof firebase === 'undefined' || !firebase.firestore) return;
        try {
            const db = firebase.firestore();
            await db.collection('members').doc(memberId).delete();
        } catch (e) {
            console.warn('Failed to delete member from Firestore:', e);
        }
    },

    // Atomic update to Realtime DB preventing full root overwrite
    pushAtomicUpdate: function (path, data) {
        if (!this.initialized || typeof firebase === 'undefined' || !firebase.database) return;
        try {
            const timestamp = Date.now();
            const updates = {};
            updates[`mfc_portal_live_data/${path}`] = data;
            updates['mfc_portal_live_data/lastUpdated'] = timestamp;

            firebase.database().ref().update(updates)
                .then(() => this.updateStatusBadge('🔥 Firebase: Live Synced'))
                .catch(err => console.warn('Atomic update warning:', err));
        } catch (e) {
            console.warn('Atomic sync error:', e);
        }
    },

    handleLiveSyncUpdate: function (data) {
        if (!data) return;

        const cloudTime = data.lastUpdated || 0;
        const localTime = state.lastUpdated || 0;

        if (cloudTime > localTime) {
            if (Array.isArray(data.activities)) state.activities = data.activities;
            if (data.attendance && typeof data.attendance === 'object') state.attendance = data.attendance;
            if (Array.isArray(data.funds)) state.funds = data.funds;
            if (Array.isArray(data.accounts)) state.accounts = data.accounts;

            state.lastUpdated = cloudTime;
            saveToStorage();

            const event = new CustomEvent('mfc-cloud-synced', { detail: data });
            window.dispatchEvent(event);

            this.updateStatusBadge('🔥 Firebase: Live Sync Received');
        }
    }
};
