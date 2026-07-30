import React, { useState, useEffect } from 'react';
import { auth, db } from '../../modules/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './Login.module.css';

export default function Login() {
    const [role, setRole] = useState('SUPER ADMIN');
    const [chapter, setChapter] = useState('EAST');
    const [password, setPassword] = useState('');
    const [mfcId, setMfcId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if not logged in
        if (localStorage.getItem('ps_logged_in') !== 'true') {
            setIsVisible(true);
        }
    }, []);

    if (!isVisible) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (role !== 'MEMBER' && !password) {
            setErrorMsg('⚠️ Please enter the chapter security password.');
            return;
        }

        if (role === 'MEMBER' && !mfcId) {
            setErrorMsg('⚠️ Please enter your MFC ID.');
            return;
        }

        try {
            const selectedChapter = role === 'CHAPTER HEAD' ? chapter : 'ALL';
            const adminEmail = role === 'SUPER ADMIN' ? 'reyesbarney38@gmail.com' : 'chapter@mfcyouthtarlac.com';

            if (role === 'MEMBER') {
                if (db) {
                    const membersRef = collection(db, 'members');
                    const q = query(membersRef, where('mfc_id', '==', mfcId.trim()));
                    const snapshot = await getDocs(q);
                    
                    if (snapshot.empty) {
                        throw new Error('MFC ID not found in the database.');
                    }
                    
                    const memberDoc = snapshot.docs[0].data();
                    localStorage.setItem('ps_member_id', memberDoc.mfc_id);
                    localStorage.setItem('ps_member_name', `${memberDoc.firstName} ${memberDoc.lastName}`);
                } else {
                    throw new Error('Database not initialized');
                }
            } else {
                if (auth) {
                    await signInWithEmailAndPassword(auth, adminEmail, password.trim());
                } else {
                    throw new Error('Auth not initialized');
                }
            }

            // Success
            localStorage.setItem('ps_logged_in', 'true');
            localStorage.setItem('ps_role', role);
            localStorage.setItem('ps_chapter', selectedChapter);
            
            if (window.showToast) {
                window.showToast(`🔓 Access granted. Logged in as ${role}.`, 'success');
            }
            if (window.triggerHaptic) {
                window.triggerHaptic('success');
            }

            setIsVisible(false);
            window.location.reload();

        } catch (err) {
            console.warn('Firebase Auth Verification notice:', err.message);
            setErrorMsg('🚫 Access denied. Incorrect security credentials.');
            if (window.triggerHaptic) {
                window.triggerHaptic('error');
            }
        }
    };

    return (
        <div className={styles.overlay}>
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                poster="/bg-poster.png"
                className={styles.video}
            >
                <source src="/bg-video.mp4" type="video/mp4" />
            </video>

            <div className={styles.card}>
                <div className={styles.logoContainer}>
                    <img src="/mfc-logo.png" alt="MFC Youth Logo" className={styles.logo} />
                </div>

                <h1 className={styles.title}>MFC YOUTH TARLAC</h1>
                <div className={styles.tagline}>MAKE ALL YOUTH KNOW CHRIST</div>

                <div className={styles.lockContainer}>
                    <p className={styles.lockText}>
                        This page is locked to protect documents, please input the password below to access all the files:
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <select
                            className={styles.select}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="SUPER ADMIN">Super Admin</option>
                            <option value="CHAPTER HEAD">Chapter Head</option>
                            <option value="MEMBER">Member (Self-Service)</option>
                        </select>

                        {role === 'CHAPTER HEAD' && (
                            <select
                                className={styles.select}
                                value={chapter}
                                onChange={(e) => setChapter(e.target.value)}
                            >
                                <option value="EAST">EAST Chapter</option>
                                <option value="WEST">WEST Chapter</option>
                                <option value="NORTH">NORTH Chapter</option>
                                <option value="SOUTH">SOUTH Chapter</option>
                                <option value="CENTRAL">CENTRAL Chapter</option>
                            </select>
                        )}

                        {role !== 'MEMBER' && (
                            <input
                                type="password"
                                required
                                placeholder="Enter role password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                            />
                        )}

                        {role === 'MEMBER' && (
                            <input
                                type="text"
                                required
                                placeholder="Enter MFC ID (e.g. MFC-2024-XXXX)..."
                                value={mfcId}
                                onChange={(e) => setMfcId(e.target.value)}
                                className={styles.input}
                            />
                        )}

                        {errorMsg && (
                            <div className={styles.errorMsg}>
                                {errorMsg}
                            </div>
                        )}

                        <button type="submit" className={styles.submitButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                <polyline points="10 17 15 12 10 7"></polyline>
                                <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                            SIGN IN
                        </button>
                    </form>
                </div>

                <div className={styles.footerText}>
                    <span>*If you don't know the password, you may ask your couple coordinator or your area servant.</span>
                </div>
            </div>
        </div>
    );
}