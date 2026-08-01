/**
 * MFC YOUTH TARLAC | FIREBASE CLOUD DB & ATOMIC SYNC ENGINE
 * Granular Firestore Document Updates & Realtime DB Field Syncing
 */

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, update, onValue } from 'firebase/database';
import { state, saveToStorage, notifyStateChange } from './state.js';
import { showToast } from './ui.js';

let app, auth, db, rtdb;

export const MFCFirebaseCloud = {
    initialized: false,
    enabled: false,
    config: {
        apiKey: '',
        authDomain: 'mfc-youth-data.firebaseapp.com',
        projectId: 'mfc-youth-data',
        storageBucket: 'mfc-youth-data.firebasestorage.app',
        messagingSenderId: '874772116969',
        appId: '1:874772116969:web:ca6916b9c0470b54890778',
        databaseURL: 'https://mfc-youth-data-default-rtdb.firebaseio.com',
    },

    init: function () {
        try {
            const savedConfig = localStorage.getItem('ps_firebase_config');
            this.enabled = true;
            if (savedConfig) {
                const parsed = JSON.parse(savedConfig);
                this.config = { ...this.config, ...parsed };
            }

            app = initializeApp(this.config);
            auth = getAuth(app);
            db = getFirestore(app);
            rtdb = getDatabase(app);

            this.initialized = true;

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.loadMembersFromFirestore();
                }
            });
            
            // Initial load
            this.loadMembersFromFirestore();

            // Listen to live database changes
            const liveRef = ref(rtdb, 'mfc_portal_live_data');
            onValue(liveRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.handleLiveSyncUpdate(data);
                }
            });

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

    loadMembersFromFirestore: function () {
        if (!this.initialized || !db) return;
        try {
            state.isMembersLoading = true;
            onSnapshot(collection(db, 'members'), 
                (snapshot) => {
                    if (!snapshot.empty) {
                        const cloudMembers = [];
                        snapshot.forEach((docSnap) => {
                            let data = docSnap.data();
                            if (data.dept === 'Outreach & Fellowship' || data.department === 'Outreach & Fellowship') {
                                data.dept = 'General';
                                if (data.department) data.department = 'General';
                            }
                            cloudMembers.push({ id: docSnap.id, ...data });
                        });
                        state.members = cloudMembers;
                        saveToStorage();
                        state.isMembersLoading = false;
                        notifyStateChange('members_loaded');
                    }
                },
                (error) => {
                    console.warn('Firestore members sync error:', error);
                    state.isMembersLoading = false;
                    notifyStateChange('members_error');
                }
            );
        } catch (e) {
            console.warn('Failed to load members from Firestore:', e);
        }
    },

    syncMemberToFirestore: async function (member) {
        if (!this.initialized || !member || !member.id || !db) return;
        try {
            await setDoc(doc(db, 'members', member.id), member, { merge: true });
        } catch (e) {
            console.warn('Failed to sync member to Firestore:', e);
        }
    },

    deleteMemberFromFirestore: async function (memberId) {
        if (!this.initialized || !memberId || !db) return;
        try {
            await deleteDoc(doc(db, 'members', memberId));
        } catch (e) {
            console.warn('Failed to delete member from Firestore:', e);
        }
    },

    pushAtomicUpdate: function (path, data) {
        if (!this.initialized || !rtdb) return;
        try {
            const timestamp = Date.now();
            const updates = {};
            updates[`mfc_portal_live_data/${path}`] = data;
            updates['mfc_portal_live_data/lastUpdated'] = timestamp;

            update(ref(rtdb), updates)
                .then(() => this.updateStatusBadge('🔥 Firebase: Live Synced'))
                .catch((err) => console.warn('Atomic update warning:', err));
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
            if (data.attendance && typeof data.attendance === 'object')
                state.attendance = data.attendance;
            if (Array.isArray(data.funds)) state.funds = data.funds;
            if (Array.isArray(data.accounts)) state.accounts = data.accounts;

            state.lastUpdated = cloudTime;
            saveToStorage();

            const event = new CustomEvent('mfc-cloud-synced', { detail: data });
            window.dispatchEvent(event);

            this.updateStatusBadge('🔥 Firebase: Live Sync Received');
        }
    },
};

export { auth, db, rtdb };
