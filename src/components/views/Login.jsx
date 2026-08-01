import React, { useState, useEffect } from 'react';
import { auth, db } from '../../modules/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import styles from './Login.module.css';

export default function Login() {
    const [loginType, setLoginType] = useState('ADMIN'); // ADMIN or MEMBER
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mfcId, setMfcId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            if (localStorage.getItem('ps_logged_in') !== 'true') {
                setIsVisible(true);
            }
        };
        
        checkLogin();

        window.addEventListener('ps_logout', checkLogin);
        return () => window.removeEventListener('ps_logout', checkLogin);
    }, []);

    if (!isVisible) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (loginType === 'ADMIN' && (!email || !password)) {
            setErrorMsg('⚠️ Please enter your email and password.');
            return;
        }

        if (loginType === 'MEMBER' && !mfcId) {
            setErrorMsg('⚠️ Please enter your MFC ID.');
            return;
        }

        try {

            let userRole = 'MEMBER';
            let selectedChapter = 'ALL';

            if (loginType === 'MEMBER') {
                if (db) {
                    const memberDocRef = doc(db, 'members', mfcId.trim());
                    const snapshot = await getDoc(memberDocRef);
                    
                    if (!snapshot.exists()) {
                        throw new Error('MFC ID not found in the database.');
                    }
                    
                    const memberDoc = snapshot.data();
                    localStorage.setItem('ps_member_id', snapshot.id);
                    localStorage.setItem('ps_member_name', `${memberDoc.firstName || ''} ${memberDoc.lastName || ''}`.trim());
                    selectedChapter = memberDoc.chapter || 'ALL';
                } else {
                    throw new Error('Database not initialized');
                }
            } else {
                if (auth) {
                    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password.trim());
                    const userEmail = userCredential.user.email;
                    
                    // Fetch role from Firestore
                    try {
                        const roleDocRef = doc(db, 'roles', userCredential.user.uid);
                        const roleDoc = await getDoc(roleDocRef);
                        
                        if (roleDoc.exists()) {
                            userRole = roleDoc.data().role;
                            selectedChapter = roleDoc.data().chapter || 'ALL';
                        }
                    } catch (e) {
                        console.warn("Could not fetch role from Firestore, falling back to local defaults.", e);
                    }

                    // Fallback local logic to prevent lockouts before firestore roles are setup
                    if (userRole === 'MEMBER') {
                        if (userEmail === 'reyesbarney38@gmail.com') {
                            userRole = 'SUPER ADMIN';
                        } else if (userEmail === 'chapter@mfcyouthtarlac.com') {
                            userRole = 'CHAPTER HEAD';
                        } else {
                            throw new Error('Unauthorized email.');
                        }
                    }
                } else {
                    throw new Error('Auth not initialized');
                }
            }

            // Success
            localStorage.setItem('ps_logged_in', 'true');
            localStorage.setItem('ps_role', userRole);
            localStorage.setItem('ps_chapter', selectedChapter);
            
            if (window.showToast) {
                window.showToast(`🔓 Access granted. Logged in as ${userRole}.`, 'success');
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
                poster={`${import.meta.env.BASE_URL}bg-poster.png`}
                className={styles.video}
            >
                <source src={`${import.meta.env.BASE_URL}bg-video.mp4`} type="video/mp4" />
            </video>

            <div className={styles.card}>
                <div className={styles.logoContainer}>
                    <img src={`${import.meta.env.BASE_URL}mfc-logo.png`} alt="MFC Youth Logo" className={styles.logo} />
                </div>

                <h1 className={styles.title}>MFC YOUTH TARLAC</h1>
                <div className={styles.tagline}>MAKE ALL YOUTH KNOW CHRIST</div>

                <div className={styles.lockContainer}>
                    <p className={styles.lockText}>
                        This page is locked to protect documents, please input the password below to access all the files:
                    </p>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <select
                            id="login-type-select"
                            name="loginType"
                            className={styles.select}
                            value={loginType}
                            onChange={(e) => setLoginType(e.target.value)}
                        >
                            <option value="ADMIN">Admin / Chapter Head</option>
                            <option value="MEMBER">Member (Self-Service)</option>
                        </select>

                        {loginType === 'ADMIN' && (
                            <>
                                <input
                                    id="email-input"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your email address..."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                />
                                <input
                                    id="password-input"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Enter your password..."
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={styles.input}
                                    style={{ marginTop: '10px' }}
                                />
                            </>
                        )}

                        {loginType === 'MEMBER' && (
                            <input
                                id="mfc-id-input"
                                name="mfcId"
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