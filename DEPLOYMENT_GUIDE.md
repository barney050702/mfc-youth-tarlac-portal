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

> [!NOTE]
> Chapter Heads can also authenticate using their registered chapter email (e.g., `tricia@mfcyouthtarlac.com`, `central.chapter@mfcyouthtarlac.com`) along with the passkey `admin123` or `chapter123`.

---

## 📱 PWA Mobile App & Desktop Installation
Because this portal is built with full Progressive Web App (`manifest.json` + service worker capabilities), leaders can install it directly onto their devices:

1. **Android / PC (Chrome / Edge):**
   - Visit **https://barney050702.github.io/mfc-youth-tarlac-portal/**.
   - Click/tap the **Install App** prompt or select menu **⋮ → Install MFC Youth Tarlac Portal**.
2. **iOS / iPhone (Safari):**
   - Open the site in Safari.
   - Tap the **Share** button at the bottom and select **Add to Home Screen**.
   - It will appear as an app with your official bouncy **MFC Youth Logo**!

---

## 🔄 How to Push Future Code Updates
Whenever changes are made locally in your project folder (`attendance-activity-portal`), they can be pushed live in seconds using Git commands:

```bash
git add .
git commit -m "Describe your update here"
git push origin main
```
Within **30 seconds** of pushing, GitHub Pages automatically updates the live portal online!
