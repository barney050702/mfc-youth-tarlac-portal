/**
 * MFC YOUTH TARLAC | REPORTS, ANALYTICS & EXECUTIVE EXPORTS
 * Memory-Safe Chart.js Graph Rendering & Executive Summary PDF Exporter
 */

import { state } from './state.js';
import { showToast, triggerHaptic } from './ui.js';

export function renderDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    // Safely destroy existing chart instances to prevent canvas memory leaks
    if (!state.charts) state.charts = {};

    if (state.charts.attendance) {
        state.charts.attendance.destroy();
        state.charts.attendance = null;
    }
    if (state.charts.demographics) {
        state.charts.demographics.destroy();
        state.charts.demographics = null;
    }

    const attendanceCanvas = document.getElementById('chart-attendance');
    if (attendanceCanvas) {
        const ctx = attendanceCanvas.getContext('2d');
        state.charts.attendance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Member Attendance',
                    data: [28, 35, 42, 38, 45, 52],
                    borderColor: '#38BDF8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#94A3B8' } }
                },
                scales: {
                    x: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#64748B' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }

    const demoCanvas = document.getElementById('chart-demographics');
    if (demoCanvas) {
        const ctx = demoCanvas.getContext('2d');
        state.charts.demographics = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Central', 'North', 'West', 'East'],
                datasets: [{
                    data: [18, 12, 10, 8],
                    backgroundColor: ['#0284C7', '#38BDF8', '#34D399', '#F59E0B']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { color: '#94A3B8' } }
                }
            }
        });
    }
}

export function generateExecutiveSummaryReport() {
    if (typeof jspdf === 'undefined') {
        showToast('jsPDF library loading, please try again in a moment.', 'warning');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(2, 132, 199);
        doc.text('MFC YOUTH TARLAC CHAPTER PORTAL', 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139);
        doc.text('Executive Chapter Summary & Roster Report', 14, 28);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 34);

        const tableData = state.members.map(m => [
            m.name || 'Unnamed',
            m.chapter || 'Central',
            m.age ? `${m.age} yrs` : 'N/A',
            m.contactNum || m.parentsContact || 'N/A',
            m.address || 'Tarlac'
        ]);

        if (doc.autoTable) {
            doc.autoTable({
                startY: 42,
                head: [['Member Name', 'Chapter', 'Age', 'Contact', 'Address']],
                body: tableData,
                headStyles: { fillColor: [2, 132, 199] },
                alternateRowStyles: { fillColor: [241, 245, 249] }
            });
        }

        doc.save(`MFC_Youth_Tarlac_Executive_Summary_${Date.now()}.pdf`);
        showToast('📄 Executive Summary PDF exported successfully!', 'success');
        triggerHaptic('success');
    } catch (err) {
        showToast(`PDF Export Error: ${err.message}`, 'error');
    }
}


export function renderAnalytics() {
    const monthlyBody = document.getElementById('analytics-monthly-body');
    if (!monthlyBody) return;

    const totalMems = state.members.length;
    const monthlyMap = {};

    state.activities.forEach(act => {
        const dateObj = new Date(act.date);
        const monthKey = !isNaN(dateObj) ? dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'General Event';

        if (!monthlyMap[monthKey]) {
            monthlyMap[monthKey] = { totalActs: 0, completed: 0, presentSum: 0, absentSum: 0, rateSum: 0 };
        }

        monthlyMap[monthKey].totalActs++;
        if (act.status === 'Completed') monthlyMap[monthKey].completed++;

        const attObj = state.attendance[act.id] || {};
        let pCount = 0;
        let aCount = 0;
        state.members.forEach(m => {
            const st = attObj[m.id]?.status;
            if (st === 'present' || st === 'late') pCount++;
            else aCount++;
        });

        monthlyMap[monthKey].presentSum += pCount;
        monthlyMap[monthKey].absentSum += aCount;
        const rate = totalMems > 0 ? (pCount / totalMems) * 100 : 0;
        monthlyMap[monthKey].rateSum += rate;
    });

    const keys = Object.keys(monthlyMap);
    if (keys.length === 0) {
        monthlyBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No activity records available yet. Create an activity to view monthly performance metrics.</td></tr>`;
    } else {
        monthlyBody.innerHTML = keys.map(mKey => {
            const data = monthlyMap[mKey];
            const avgRate = data.totalActs > 0 ? Math.round(data.rateSum / data.totalActs) : 0;
            let evalBadge = `<span class="trend badge-green">Excellent (≥80%)</span>`;
            if (avgRate < 50) evalBadge = `<span class="trend badge-rose" style="background:rgba(251,113,133,0.15); color:var(--accent-rose);">Needs Attention</span>`;
            else if (avgRate < 80) evalBadge = `<span class="trend badge-emerald" style="background:rgba(251,191,36,0.15); color:var(--accent-amber);">Satisfactory</span>`;

            return `
                <tr>
                    <td style="font-weight:700; color:#FFF;">${mKey}</td>
                    <td>${data.totalActs}</td>
                    <td><strong style="color:var(--accent-emerald);">${data.completed}</strong></td>
                    <td>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span class="rate-badge" style="margin-left:0;">${avgRate}%</span>
                        </div>
                    </td>
                    <td><strong style="color:var(--accent-blue);">${data.presentSum}</strong> check-ins</td>
                    <td><span style="color:var(--text-muted);">${data.absentSum} absences</span></td>
                    <td>${evalBadge}</td>
                </tr>
            `;
        }).join('');
    }

    renderInteractiveCharts();
    generatePastoralList();
}

export function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "MFC YOUTH TARLAC ATTENDANCE & ACTIVITY MASTER REPORT\n\n";
    csvContent += "ACTIVITY TITLE,DATE,LOCATION,CATEGORY,STATUS,PRESENT COUNT,ABSENT COUNT,ATTENDANCE RATE (%)\n";

    const totalMems = state.members.length;

    state.activities.forEach(act => {
        const attObj = state.attendance[act.id] || {};
        let pCount = 0;
        let aCount = 0;
        state.members.forEach(m => {
            const st = attObj[m.id]?.status;
            if (st === 'present' || st === 'late') pCount++;
            else aCount++;
        });
        const rate = totalMems > 0 ? Math.round((pCount / totalMems) * 100) : 0;
        const safeName = act.name || act.title || 'Untitled';
        const safeVenue = act.venue || act.location || 'Venue TBA';
        const safeType = act.type || act.category || 'Event';
        const cleanTitle = `"${safeName.replace(/"/g, '""')}"`;
        const cleanLoc = `"${safeVenue.replace(/"/g, '""')}"`;
        csvContent += `${cleanTitle},${act.date},${cleanLoc},${safeType},${act.status},${pCount},${aCount},${rate}%\n`;
    });

    csvContent += "\n\nDETAILED MEMBER ROSTER ATTENDANCE\n";
    csvContent += "MEMBER NAME,ROLE,DEPARTMENT," + state.activities.map(a => `"${(a.name || a.title || 'Event').substring(0, 20)}..."`).join(",") + "\n";

    state.members.forEach(mem => {
        const rowData = state.activities.map(act => {
            const st = state.attendance[act.id]?.[mem.id]?.status || 'absent';
            return st.toUpperCase();
        });
        const cleanName = `"${mem.name.replace(/"/g, '""')}"`;
        csvContent += `${cleanName},"${mem.role}","${mem.dept}",${rowData.join(",")}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `mfc_youth_tarlac_master_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('CSV Report downloaded successfully!', 'success');
}

export function exportToPDF() {
    if (!window.jsPDF && (!window.jspdf || !window.jspdf.jsPDF)) {
        generatePrintablePDFSheet();
        return;
    }

    try {
        const jsPDFObj = window.jsPDF || (window.jspdf ? window.jspdf.jsPDF : null);
        if (!jsPDFObj) {
            generatePrintablePDFSheet();
            return;
        }
        const doc = new jsPDFObj('p', 'mm', 'a4');

        // Header Background
        doc.setFillColor(11, 15, 25);
        doc.rect(0, 0, 210, 38, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(56, 189, 248);
        doc.text("MFC YOUTH TARLAC PORTAL", 14, 18);

        doc.setFontSize(11);
        doc.setTextColor(248, 250, 252);
        doc.text("Official Attendance & Activity Master Report", 14, 26);

        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 32);

        // Section 1: Activities Summary Table
        doc.setFontSize(13);
        doc.setTextColor(11, 15, 25);
        doc.text("1. Activity Performance Summary", 14, 48);

        const actHeaders = [["Activity Title", "Category", "Date", "Status", "Present", "Rate"]];
        const totalMems = state.members.length;
        const actRows = state.activities.map(act => {
            const attObj = state.attendance[act.id] || {};
            let pCount = 0;
            state.members.forEach(m => {
                if (attObj[m.id]?.status === 'present' || attObj[m.id]?.status === 'late') pCount++;
            });
            const rate = totalMems > 0 ? Math.round((pCount / totalMems) * 100) : 0;
            const dateStr = new Date(act.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            return [act.name || act.title || 'Untitled', act.type || act.category || 'Event', dateStr, act.status, `${pCount}/${totalMems}`, `${rate}%`];
        });

        doc.autoTable({
            startY: 52,
            head: actHeaders,
            body: actRows,
            theme: 'grid',
            headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255], fontStyle: 'bold' },
            styles: { fontSize: 8.5, cellPadding: 3 },
            columnStyles: { 0: { cellWidth: 65 }, 5: { fontStyle: 'bold', textColor: [5, 150, 105] } }
        });

        let nextY = doc.lastAutoTable.finalY + 12;

        // Section 2: Active Roster Check (if selected activity exists)
        if (state.selectedActivityId) {
            const selAct = state.activities.find(a => a.id === state.selectedActivityId);
            if (selAct) {
                if (nextY > 230) { doc.addPage(); nextY = 20; }
                doc.setFontSize(13);
                doc.setTextColor(11, 15, 25);
                doc.text(`2. Detailed Attendance Sheet: ${selAct.title}`, 14, nextY);

                const rosHeaders = [["#", "Member Name", "Department / Role", "Status", "Time Check", "Remarks"]];
                const attMap = state.attendance[selAct.id] || {};
                const rosRows = state.members.map((mem, idx) => {
                    const att = attMap[mem.id] || { status: 'absent', time: '-', notes: '' };
                    return [idx + 1, mem.name, `${mem.dept} (${mem.role})`, att.status.toUpperCase(), att.time, att.notes || '-'];
                });

                doc.autoTable({
                    startY: nextY + 4,
                    head: rosHeaders,
                    body: rosRows,
                    theme: 'striped',
                    headStyles: { fillColor: [15, 23, 42], textColor: [56, 189, 248], fontStyle: 'bold' },
                    styles: { fontSize: 8, cellPadding: 2.5 },
                    didParseCell: function (data) {
                        if (data.section === 'body' && data.column.index === 3) {
                            if (data.cell.raw === 'PRESENT') data.cell.styles.textColor = [5, 150, 105];
                            else if (data.cell.raw === 'LATE') data.cell.styles.textColor = [217, 119, 6];
                            else data.cell.styles.textColor = [225, 29, 72];
                            data.cell.styles.fontStyle = 'bold';
                        }
                    }
                });
            }
        }

        doc.save(`mfc_youth_tarlac_attendance_report_${new Date().toISOString().slice(0, 10)}.pdf`);
        showToast('PDF Roster document generated and saved!', 'success');
    } catch (err) {
        console.warn('jsPDF export fallback triggered:', err);
        generatePrintablePDFSheet();
    }
}

export function generatePrintablePDFSheet() {
    const totalMems = state.members.length;
    const actRows = state.activities.map(act => {
        const attObj = state.attendance[act.id] || {};
        let pCount = 0;
        state.members.forEach(m => {
            if (attObj[m.id]?.status === 'present' || attObj[m.id]?.status === 'late') pCount++;
        });
        const rate = totalMems > 0 ? Math.round((pCount / totalMems) * 100) : 0;
        const dateStr = new Date(act.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        return `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${act.name || act.title || 'Untitled'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${act.type || act.category || 'Event'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${dateStr}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${act.status}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${pCount}/${totalMems}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; color: #059669;">${rate}%</td>
        </tr>`;
    }).join('');

    let detailedSheetHtml = '';
    if (state.selectedActivityId) {
        const selAct = state.activities.find(a => a.id === state.selectedActivityId);
        if (selAct) {
            const attMap = state.attendance[selAct.id] || {};
            const rows = state.members.map((mem, idx) => {
                const att = attMap[mem.id] || { status: 'absent', time: '-', notes: '' };
                const color = att.status === 'present' ? '#059669' : att.status === 'late' ? '#D97706' : '#E11D48';
                return `<tr>
                    <td style="padding: 6px; border-bottom: 1px solid #eee;">${idx + 1}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #eee; font-weight: 600;">${mem.name}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #eee;">${mem.dept} (${mem.role})</td>
                    <td style="padding: 6px; border-bottom: 1px solid #eee; font-weight: bold; color: ${color};">${att.status.toUpperCase()}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #eee;">${att.time}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #eee;">${att.notes || '-'}</td>
                </tr>`;
            }).join('');

            detailedSheetHtml = `
                <h2 style="margin-top: 30px; color: #0f172a; font-size: 16px;">2. Detailed Attendance Roster: ${selAct.title || selAct.name}</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px;">
                    <thead>
                        <tr style="background: #0f172a; color: #fff; text-align: left;">
                            <th style="padding: 8px;">#</th>
                            <th style="padding: 8px;">Member Name</th>
                            <th style="padding: 8px;">Dept / Role</th>
                            <th style="padding: 8px;">Status</th>
                            <th style="padding: 8px;">Time</th>
                            <th style="padding: 8px;">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            `;
        }
    }

    const printWin = window.open('', '_blank', 'width=900,height=700');
    if (!printWin) {
        showToast('Popup blocked. Please allow popups to export printable PDF sheet.', 'error');
        return;
    }

    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MFC Youth Tarlac - Official Report PDF</title>
            <style>
                body { font-family: 'Inter', -apple-system, sans-serif; padding: 30px; color: #1e293b; }
                h1 { color: #0369a1; font-size: 22px; margin-bottom: 4px; }
                p.meta { color: #64748b; font-size: 12px; margin-bottom: 24px; }
                h2 { color: #0f172a; font-size: 16px; margin-top: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
                th { background: #0284c7; color: #fff; text-align: left; padding: 8px; }
                @media print {
                    @page { size: A4; margin: 15mm; }
                }
            </style>
        </head>
        <body>
            <h1>MFC YOUTH TARLAC PORTAL</h1>
            <p class="meta">Official Attendance & Activity Master Report • Generated on ${new Date().toLocaleString()}</p>
            <h2>1. Activity Performance Summary</h2>
            <table>
                <thead>
                    <tr>
                        <th>Activity Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Present</th>
                        <th>Attendance Rate</th>
                    </tr>
                </thead>
                <tbody>${actRows}</tbody>
            </table>
            ${detailedSheetHtml}
            <script>
                window.onload = () => {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
    showToast('Printable PDF Report opened ready to Save as PDF!', 'success');
}

export function exportMembersToPDF() {
    if (!state.members || state.members.length === 0) {
        showToast('No members available to export.', 'error');
        return;
    }

    if (!window.jsPDF && (!window.jspdf || !window.jspdf.jsPDF)) {
        generatePrintableMembersPDF();
        return;
    }

    try {
        const jsPDFObj = window.jsPDF || (window.jspdf ? window.jspdf.jsPDF : null);
        if (!jsPDFObj) {
            generatePrintableMembersPDF();
            return;
        }
        const doc = new jsPDFObj('p', 'mm', 'a4');

        // Header Background
        doc.setFillColor(11, 15, 25);
        doc.rect(0, 0, 210, 36, 'F');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(56, 189, 248);
        doc.text("MFC YOUTH TARLAC PORTAL", 14, 16);

        doc.setFontSize(11);
        doc.setTextColor(248, 250, 252);
        doc.text("Official Members Directory & Pastoral Roster", 14, 24);

        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184);
        doc.text(`Total Members: ${state.members.length} • Generated on: ${new Date().toLocaleString()}`, 14, 30);

        const sortedMems = [...state.members].sort((a, b) => {
            const chapA = (a.chapter || 'EAST CHAPTER').toUpperCase();
            const chapB = (b.chapter || 'EAST CHAPTER').toUpperCase();
            if (chapA !== chapB) return chapA.localeCompare(chapB);
            const rankA = getRoleRank(a.role);
            const rankB = getRoleRank(b.role);
            if (rankA !== rankB) return rankA - rankB;
            return a.name.localeCompare(b.name);
        });

        const memHeaders = [["#", "Member Name", "Chapter", "Department", "Role", "Email", "Status"]];
        const memRows = sortedMems.map((m, idx) => [
            idx + 1,
            m.name || 'Untitled',
            m.chapter || 'Central Chapter',
            m.dept || 'General',
            m.role || 'Member',
            m.email || '-',
            m.status || 'Active'
        ]);

        doc.autoTable({
            startY: 44,
            head: memHeaders,
            body: memRows,
            theme: 'grid',
            headStyles: { fillColor: [15, 23, 42], textColor: [56, 189, 248], fontStyle: 'bold' },
            styles: { fontSize: 8.5, cellPadding: 2.8 },
            columnStyles: { 1: { fontStyle: 'bold' } }
        });

        doc.save(`mfc_youth_tarlac_members_directory_${new Date().toISOString().slice(0, 10)}.pdf`);
        showToast('Members Directory exported as PDF successfully!', 'success');
        logAuditAction(`Exported Members Directory PDF (${state.members.length} members)`, 'export');
    } catch (err) {
        console.warn('jsPDF export members fallback triggered:', err);
        generatePrintableMembersPDF();
    }
}

export function generatePrintableMembersPDF() {
    const sortedMems = [...state.members].sort((a, b) => {
        const chapA = (a.chapter || 'EAST CHAPTER').toUpperCase();
        const chapB = (b.chapter || 'EAST CHAPTER').toUpperCase();
        if (chapA !== chapB) return chapA.localeCompare(chapB);
        const rankA = getRoleRank(a.role);
        const rankB = getRoleRank(b.role);
        if (rankA !== rankB) return rankA - rankB;
        return a.name.localeCompare(b.name);
    });

    const memRows = sortedMems.map((m, idx) => {
        return `<tr>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${idx + 1}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: 600;">${m.name}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${m.chapter || 'Central Chapter'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${m.dept || 'General'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${m.role || 'Member'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd;">${m.email || '-'}</td>
            <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold; color: #059669;">${m.status || 'Active'}</td>
        </tr>`;
    }).join('');

    const printWin = window.open('', '_blank', 'width=900,height=700');
    if (!printWin) {
        showToast('Popup blocked. Please allow popups to export printable PDF sheet.', 'error');
        return;
    }

    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MFC Youth Tarlac - Members Directory PDF</title>
            <style>
                body { font-family: 'Inter', -apple-system, sans-serif; padding: 30px; color: #1e293b; }
                h1 { color: #0369a1; font-size: 22px; margin-bottom: 4px; }
                p.meta { color: #64748b; font-size: 12px; margin-bottom: 24px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
                th { background: #0f172a; color: #38bdf8; text-align: left; padding: 8px; }
                @media print {
                    @page { size: A4; margin: 15mm; }
                }
            </style>
        </head>
        <body>
            <h1>MFC YOUTH TARLAC PORTAL</h1>
            <p class="meta">Official Members Directory & Pastoral Roster • Total: ${state.members.length} Members • Generated on ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Member Name</th>
                        <th>Chapter</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>${memRows}</tbody>
            </table>
            <script>
                window.onload = () => {
                    window.print();
                };
            </script>
        </body>
        </html>
    `);
    printWin.document.close();
    showToast('Members Directory PDF opened ready to Save as PDF!', 'success');
    logAuditAction(`Exported Members Directory Printable PDF (${state.members.length} members)`, 'export');
}

// ============================================================================
// ONE-CLICK EXCEL / CSV EXPORT SUITE (UTF-8 BOM COMPATIBLE)
// ============================================================================

export function downloadCSVFile(csvContent, filename) {
    const bom = '\uFEFF'; // UTF-8 Byte Order Mark for Excel
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function exportMembersCSV() {
    if (!state.members || state.members.length === 0) {
        showToast('No members found to export.', 'warning');
        return;
    }

    const headers = ['Member ID', 'Full Name', 'Chapter', 'Department', 'Role', 'Phone Number', 'Email Address', 'Birthdate', 'Parent Contact', 'Youth Camp Date', 'Status'];
    const rows = state.members.map(m => [
        `"${m.id || ''}"`,
        `"${(m.name || '').replace(/"/g, '""')}"`,
        `"${(m.chapter || '').replace(/"/g, '""')}"`,
        `"${(m.dept || m.department || '').replace(/"/g, '""')}"`,
        `"${(m.role || '').replace(/"/g, '""')}"`,
        `"${m.phone || ''}"`,
        `"${m.email || ''}"`,
        `"${m.birthdate || ''}"`,
        `"${m.parentContact || ''}"`,
        `"${m.youthCampDate || ''}"`,
        `"${m.status || 'Active'}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSVFile(csvContent, `MFC_Youth_Members_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast('📊 Members directory exported successfully as Excel/CSV file!', 'success');
    logAuditAction(`Exported Members Directory to CSV/Excel (${state.members.length} rows)`, 'export');
}

export function exportActivitiesCSV() {
    if (!state.activities || state.activities.length === 0) {
        showToast('No activity records to export.', 'warning');
        return;
    }

    const headers = ['Activity ID', 'Activity Name', 'Date', 'Location', 'Type', 'Status', 'Notes'];
    const rows = state.activities.map(a => [
        `"${a.id || ''}"`,
        `"${(a.name || '').replace(/"/g, '""')}"`,
        `"${a.date || ''}"`,
        `"${(a.location || '').replace(/"/g, '""')}"`,
        `"${a.type || ''}"`,
        `"${a.status || ''}"`,
        `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSVFile(csvContent, `MFC_Youth_Activity_Records_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast('📊 Activity records exported successfully as Excel/CSV!', 'success');
}

export function exportAttendanceCSV() {
    const attendanceRecords = [];
    Object.keys(state.attendance || {}).forEach(actId => {
        const act = state.activities.find(a => a.id === actId) || { name: actId };
        const records = state.attendance[actId] || [];
        records.forEach(rec => {
            attendanceRecords.push([
                `"${act.name}"`,
                `"${rec.memberId || ''}"`,
                `"${(rec.name || '').replace(/"/g, '""')}"`,
                `"${rec.timestamp || ''}"`,
                `"${rec.status || 'Present'}"`
            ]);
        });
    });

    if (attendanceRecords.length === 0) {
        showToast('No attendance logs to export.', 'warning');
        return;
    }

    const headers = ['Activity Event Name', 'Member ID', 'Member Name', 'Check-in Timestamp', 'Status'];
    const csvContent = [headers.join(','), ...attendanceRecords.map(r => r.join(','))].join('\n');
    downloadCSVFile(csvContent, `MFC_Youth_Attendance_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast('📊 Attendance logs exported successfully as Excel/CSV!', 'success');
}

export function exportFundsCSV() {
    if (!state.funds || state.funds.length === 0) {
        showToast('No finance transactions found.', 'warning');
        return;
    }

    const headers = ['Transaction ID', 'Date', 'Description', 'Category', 'Type', 'Amount (PHP)'];
    const rows = state.funds.map(f => [
        `"${f.id || ''}"`,
        `"${f.date || ''}"`,
        `"${(f.description || '').replace(/"/g, '""')}"`,
        `"${f.category || ''}"`,
        `"${f.type || ''}"`,
        `"${f.amount || 0}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCSVFile(csvContent, `MFC_Youth_Finance_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    showToast('📊 Finance ledger exported successfully as Excel/CSV!', 'success');
}