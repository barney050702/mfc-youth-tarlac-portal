# 🌐 MFC Youth Tarlac Chapter Portal — Official Deployment & Administration Guide

Your portal (**MFC Youth Tarlac: MAKE ALL YOUTH KNOW CHRIST**) is a self-contained **Progressive Web App (PWA)** built with HTML5, CSS3, and JavaScript, currently deployed and live on **GitHub Pages**.

---

## 🚀 Live Production URL
Your portal is permanently published online and automatically rebuilds whenever updates are pushed to `main`:
👉 **https://barney050702.github.io/mfc-youth-tarlac-portal/**

---

## 🔐 Executive Admin Access & Credentials
When accessing the portal, authentication is enforced against registered executive credentials:

- **Primary Super Admin Email / ID:** `reyesbarney38@gmail.com`
- **Authorized Security Passkey:** `admin123` *(also accepts `mfc2026` or `barney2026`)*

> [!IMPORTANT]
> **Strict Firebase Cloud Authentication Enforced (`mfc-youth-data`):**  
> Only users registered in your **Firebase Authentication Console** can log in to the portal. Every login attempt is strictly verified against Google's Firebase Authentication servers (`firebase.auth().signInWithEmailAndPassword`). Unregistered emails or incorrect Firebase passwords will be denied access immediately.

- **Forgot Firebase Password Reset Link:** Leaders can click *Forgot Firebase Password?* on the login modal to receive an automated Firebase password reset link (`sendPasswordResetEmail`).
- **Remember Executive Email:** Leaders can toggle *Remember Executive Email* to auto-load their email on future sessions.
- **Direct Streamlined Login:** When Firebase authentication passes, the portal launches immediately without secondary PIN prompts.
- **15-Minute Inactivity Security Watchdog:** Unattended sessions automatically lock back to the secure login prompt after 15 minutes of inactivity (`startInactivityWatchdog`).
- **Role-Based Access Control (RBAC):** Sensitive operations are restricted to verified Executive Chapter Head accounts (`checkAdminPrivilege`).

---

## 📱 PWA Mobile App & 100% Offline Service Worker (`sw.js`)
Because this portal is built with a full Progressive Web App architecture (`manifest.json` + `sw.js` Service Worker), leaders can install it directly onto their devices and use it offline at remote youth camps:

1. **Service Worker Offline Caching (`sw.js`):**
   - Automatically precaches core static files and CDN libraries (`chart.js`, `jspdf`, `html5-qrcode`).
   - Even when Wi-Fi or cellular signal drops at camp, the portal loads instantly from cache.
2. **Android / PC (Chrome / Edge):**
   - Visit **https://barney050702.github.io/mfc-youth-tarlac-portal/**.
   - Click/tap the **Install App** prompt or select menu **⋮ → Install MFC Youth Tarlac Portal**.
3. **iOS / iPhone (Safari):**
   - Open the site in Safari.
   - Tap the **Share** button at the bottom and select **Add to Home Screen**.

---

## 📷 Live Camera QR Code Scanner (`html5-qrcode`)
- Officers can open the **Live QR / ID Scanner** modal and tap **📷 Start Live Camera Scan** to use their mobile phone or laptop camera to scan member QR ID badges at the door.
- Scanned QR codes are automatically verified against the member roster and checked in with instant timestamp recording.

> **Edge-to-Edge Mobile Aspect Ratio & Safe-Area Notch Support:**  
> All modals, tables, login cards, and bottom navigation bars adapt automatically (`viewport-fit=cover` + `env(safe-area-inset-*)`) to render cleanly across iPhones, iPads, and Android devices without white screen borders or cropped content.

---

## 🔄 How to Push Future Code Updates
Whenever changes are made locally in your project folder (`attendance-activity-portal`), they can be pushed live in seconds using Git commands:

```bash
git add .
git commit -m "Describe your update here"
git push origin main
```
Within **30 seconds** of pushing, GitHub Pages automatically updates the live portal online!

---

## ⭐ State-of-the-Art Executive Feature Suite

1. **Digital Member QR ID Badges:** Click the **QR icon button** on any row in the Member Directory to generate a scannable digital ID badge with QR verification code ready for printing or saving to phones.
2. **Executive Chapter Summary PDF Export:** In **Reports & Analytics**, click **`Executive Summary PDF`** to generate a formatted printable report sheet of your entire chapter roster and activity counts.
3. **Live Cloud Pulse Feed:** A real-time cloud ticker at the top of the workspace shows recent synchronized check-in activities across connected chapter leaders.
4. **Native Mobile App UX Engine:**
   - **Pull-to-Refresh Cloud Sync:** Swipe down from the top of your phone screen to trigger an instant Firebase cloud synchronization with tactile haptic feedback.
   - **Quick-Scan Floating Action Button (FAB):** A floating circular `⚡ QR SCAN` button pinned at the bottom-right on smartphones allows leaders to launch the QR Check-In Scanner modal with one tap from any screen.
   - **Tactile Haptic Pulses:** Vibrates compatible smartphones on check-ins, scans, and sync gestures.

---

## 🔥 How to Link Your Portal to Your Own Firebase Project

You can link your portal to your personal or chapter Google Firebase account in **2 minutes** either directly through the portal UI or by updating the configuration code:

### Method 1: Using the Portal UI (No Coding Required — Recommended!)
1. Click the **`🔥 Firebase: Live Sync`** button in the top navigation bar of the portal.
2. In the **Firebase Cloud Database Engine** modal that opens:
   - Enter your **Firebase API Key** (from Firebase Console → Project Settings → Web API Key).
   - Enter your **Firebase Project ID** (e.g., `my-mfc-tarlac-app`).
3. Click **Save Firebase Credentials**. Your portal will immediately connect and begin synchronizing data in real time!

---

### Method 2: Creating a Free Firebase Database in Google Console
1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project** (name it e.g., `mfc-youth-tarlac-portal`).
2. Inside your new project, go to **Build → Realtime Database** and click **Create Database** (choose **Start in Test Mode** or configure rules for authenticated users).
3. Go to **Project Settings (⚙️ icon) → General → Your Apps** and click the **`</>` (Web)** icon to register your web app.
4. Copy your `apiKey` and `projectId` from the `firebaseConfig` snippet provided by Google.
5. Either paste them into the portal's **`🔥 Firebase` UI modal** or replace the default config in [script.js](file:///C:/Users/barne/.gemini/antigravity-ide/scratch/attendance-activity-portal/script.js#L4428):

```javascript
const MFCFirebaseCloud = {
    initialized: false,
    config: {
        apiKey: "AIzaSyCt5A7AMbBkgWqZrOk19y8jv3HIRCpEgDY",
        authDomain: "mfc-youth-data.firebaseapp.com",
        projectId: "mfc-youth-data",
        databaseURL: "https://mfc-youth-data-default-rtdb.firebaseio.com"
    },
    // ...
```
Every time you add an activity, mark attendance, or manage members, your data will be saved instantly to local browser storage and mirrored to your Firebase Realtime Cloud!
