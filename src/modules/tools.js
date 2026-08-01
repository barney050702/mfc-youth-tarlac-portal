import { showToast } from './ui-modals.js';

export function triggerConfettiBurst() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 85,
            spread: 75,
            origin: { y: 0.6 },
        });
    } else {
        // Fallback or lightweight visual burst if external confetti not present
        const badge = document.createElement('div');
        badge.style.position = 'fixed';
        badge.style.top = '50%';
        badge.style.left = '50%';
        badge.style.transform = 'translate(-50%, -50%) scale(0.5)';
        badge.style.background = 'linear-gradient(135deg, #EC4899, #3B82F6, #10B981)';
        badge.style.color = '#FFF';
        badge.style.padding = '24px 48px';
        badge.style.borderRadius = '30px';
        badge.style.fontWeight = '800';
        badge.style.fontSize = '1.8rem';
        badge.style.zIndex = '1000000';
        badge.style.boxShadow = '0 20px 80px rgba(0,0,0,0.8)';
        badge.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        badge.innerHTML = '🎉 Celebration & Milestone Burst! 🕊️';
        document.body.appendChild(badge);
        setTimeout(() => (badge.style.transform = 'translate(-50%, -50%) scale(1)'), 50);
        setTimeout(() => {
            badge.style.opacity = '0';
            badge.style.transform = 'translate(-50%, -50%) scale(1.3)';
            setTimeout(() => badge.remove(), 400);
        }, 1600);
    }
}

export function transposeNote(note, semitones) {
    let cleanNote = note.replace(/m|maj7|7|add9|sus4|dim|aug/gi, '');
    let suffix = note.substring(cleanNote.length);
    let index = CHROMATIC_SCALE.indexOf(cleanNote.toUpperCase());
    if (index === -1) return note;
    let newIndex = (index + semitones) % 12;
    if (newIndex < 0) newIndex += 12;
    return CHROMATIC_SCALE[newIndex] + suffix;
}

export function openSongbookTransposerModal() {
    const el = document.getElementById('songbook-transposer-backdrop');
    if (el) el.style.display = 'flex';
    loadSongForTransposer();
}

export function closeSongbookTransposerModal() {
    const el = document.getElementById('songbook-transposer-backdrop');
    if (el) el.style.display = 'none';
}

export function loadSongForTransposer() {
    const sel = document.getElementById('song-select-dropdown');
    if (sel) currentActiveSongKey = sel.value;
    currentTranspositionOffset = 0;
    renderTransposedSong();
}

export function transposeSongKey(delta) {
    currentTranspositionOffset += delta;
    renderTransposedSong();
}

export function resetSongKey() {
    currentTranspositionOffset = 0;
    renderTransposedSong();
}

export function renderTransposedSong() {
    const song = SONGS_DATABASE[currentActiveSongKey];
    if (!song) return;

    const baseKey = song.key;
    const newKey = transposeNote(baseKey, currentTranspositionOffset);

    const badge = document.getElementById('current-key-badge');
    if (badge) badge.innerText = `Key: ${newKey}`;

    const container = document.getElementById('songbook-chord-display');
    if (!container) return;

    const lines = song.chords.split('\n');
    let html = `<h2 style="color: #38BDF8; margin: 0 0 16px 0; font-family: sans-serif; font-size: 1.3rem;">${song.title}</h2>`;

    lines.forEach((line) => {
        if (line.includes('[')) {
            let chordFormatted = line.replace(/\[([A-G][b#]?[a-zA-Z0-9]*)\]/g, (match, chord) => {
                const transposed = transposeNote(chord, currentTranspositionOffset);
                return `<span style="color: #38BDF8; font-weight: bold; background: rgba(56,189,248,0.15); padding: 1px 5px; border-radius: 4px;">${transposed}</span>`;
            });
            html += `<div style="margin-bottom: 8px;">${chordFormatted}</div>`;
        } else {
            html += `<div style="color: #E2E8F0; margin-bottom: 12px;">${line}</div>`;
        }
    });

    container.innerHTML = html;
}

export function openInteractiveRosaryModal() {
    const el = document.getElementById('rosary-interactive-backdrop');
    if (el) el.style.display = 'flex';
    renderRosaryState();
}

export function closeInteractiveRosaryModal() {
    const el = document.getElementById('rosary-interactive-backdrop');
    if (el) el.style.display = 'none';
}

export function selectRosaryMystery(key) {
    activeRosaryMysteryKey = key;
    currentDecadeIndex = 0;
    currentBeadCount = 1;

    document.querySelectorAll('#rosary-mystery-tabs .ros-tab').forEach((b) => {
        b.style.borderColor = 'rgba(255,255,255,0.15)';
        b.style.color = '#CBD5E1';
        b.style.background = 'transparent';
    });
    const activeBtn = document.getElementById(`ros-tab-${key}`);
    if (activeBtn) {
        activeBtn.style.borderColor = '#38BDF8';
        activeBtn.style.color = '#38BDF8';
        activeBtn.style.background = 'rgba(56,189,248,0.15)';
    }

    renderRosaryState();
}

export function nextRosaryBead() {
    currentBeadCount++;
    if (currentBeadCount > 10) {
        currentBeadCount = 1;
        currentDecadeIndex++;
        if (currentDecadeIndex >= 5) {
            currentDecadeIndex = 0;
            showToast('🎉 Praise God! Holy Rosary Rosary completed successfully!', 'success');
        }
    }
    renderRosaryState();
}

export function prevRosaryBead() {
    currentBeadCount--;
    if (currentBeadCount < 1) {
        if (currentDecadeIndex > 0) {
            currentDecadeIndex--;
            currentBeadCount = 10;
        } else {
            currentBeadCount = 1;
        }
    }
    renderRosaryState();
}

export function renderRosaryState() {
    const mystery = ROSARY_MYSTERIES[activeRosaryMysteryKey];
    if (!mystery) return;

    const decade = mystery.decades[currentDecadeIndex];

    const titleEl = document.getElementById('rosary-decade-title');
    if (titleEl) titleEl.innerText = `Decade ${currentDecadeIndex + 1} of 5: ${decade.title}`;

    const badgeEl = document.getElementById('rosary-bead-badge');
    if (badgeEl) badgeEl.innerText = `Hail Mary #${currentBeadCount} / 10`;

    const mTitle = document.getElementById('ros-meditation-title');
    if (mTitle) mTitle.innerText = decade.title;

    const mText = document.getElementById('ros-meditation-text');
    if (mText) mText.innerText = decade.desc;

    const mVerse = document.getElementById('ros-scripture-verse');
    if (mVerse) mVerse.innerText = decade.verse;

    const beadsContainer = document.getElementById('rosary-beads-container');
    if (beadsContainer) {
        let beadsHtml = '';
        for (let i = 1; i <= 10; i++) {
            let cls = 'rosary-bead';
            if (i === currentBeadCount) cls += ' active';
            else if (i < currentBeadCount) cls += ' completed';
            beadsHtml += `<div class="${cls}" title="Bead ${i}"></div>`;
        }
        beadsContainer.innerHTML = beadsHtml;
    }
}

export function renderGamificationLeaderboard() {
    try {
        const container = document.getElementById('gamification-leaderboard-list');
        if (!container) return;

        const leaders = [
            {
                name: 'Brother Mark Tarlac',
                role: 'Upper Core Leader',
                points: 1450,
                badge: '👑 Faith Champion',
                level: 'Level 5',
            },
            {
                name: 'Sister Maria Santos',
                role: 'Worship Head',
                points: 1280,
                badge: '🎵 Worship Leader',
                level: 'Level 4',
            },
            {
                name: 'Delegate Alex Cruz',
                role: 'Chapter Servant',
                points: 1120,
                badge: '🛡️ Servant Heart',
                level: 'Level 4',
            },
        ];

        let html = '';
        leaders.forEach((item, index) => {
            html += `
                <div style="background: rgba(15,23,42,0.8); border: 1px solid rgba(251,191,36,0.3); border-radius: 14px; padding: 14px; display: flex; items-center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(245,158,11,0.2); border: 1px solid #FBBF24; display: flex; align-items: center; justify-content: center; font-weight: 900; color: #FBBF24;">
                            #${index + 1}
                        </div>
                        <div>
                            <div style="font-weight: 800; color: #F8FAFC; font-size: 0.92rem;">${item.name}</div>
                            <div style="color: #94A3B8; font-size: 0.75rem;">${item.role} • ${item.level}</div>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <span style="background: rgba(245,158,11,0.2); border: 1px solid #FBBF24; color: #FBBF24; padding: 2px 8px; border-radius: 10px; font-size: 0.72rem; font-weight: 800;">${item.badge}</span>
                        <div style="color: #34D399; font-weight: 800; font-size: 0.85rem; margin-top: 4px;">⚡ ${item.points} pts</div>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    } catch (e) {
        /* ignore */
    }
}

export function toggleAudioPlay() {
    try {
        const audio = document.getElementById('portal-audio-element');
        const btn = document.getElementById('audio-play-btn');
        if (!audio || !btn) return;

        if (audio.paused) {
            audio
                .play()
                .then(() => {
                    btn.innerText = '⏸';
                    if (typeof showToast === 'function')
                        showToast('🎵 Playing Chapter Worship Audio Track...', 'info');
                })
                .catch((e) => {
                    if (typeof showToast === 'function')
                        showToast('🎵 Audio playback started.', 'info');
                });
        } else {
            audio.pause();
            btn.innerText = '▶';
        }
    } catch (e) {
        /* ignore */
    }
}

export function downloadCertificatePDF() {
    try {
        const element = document.getElementById('printable-certificate-container');
        const nameEl = document.getElementById('cert-member-name');
        const name = nameEl ? nameEl.innerText.replace(/\s+/g, '_') : 'Delegate';

        if (typeof html2pdf !== 'undefined' && element) {
            if (typeof showToast === 'function')
                showToast('📜 Exporting Certificate of Participation PDF...', 'info');
            const opt = {
                margin: [0.4, 0.4, 0.4, 0.4],
                filename: `MFC_Youth_Certificate_${name}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
            };
            html2pdf()
                .set(opt)
                .from(element)
                .save()
                .then(() => {
                    if (typeof showToast === 'function')
                        showToast('✅ Certificate PDF downloaded successfully!', 'success');
                })
                .catch((err) => {
                    window.print();
                });
        } else {
            window.print();
        }
    } catch (e) {
        window.print();
    }
}

export const CHROMATIC_SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export let currentActiveSongKey = '1';
export let currentTranspositionOffset = 0;
export let activeRosaryMysteryKey = 'joyful';
export let currentDecadeIndex = 0;
export let currentBeadCount = 0;
export const SONGS_DATABASE = {};
export const ROSARY_MYSTERIES = {};
