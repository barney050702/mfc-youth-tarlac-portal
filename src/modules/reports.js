/**
 * MFC YOUTH TARLAC | REPORTS, ANALYTICS & EXECUTIVE EXPORTS
 * Memory-Safe Chart.js Graph Rendering & Executive Summary PDF Exporter
 */

import { state } from './state.js';
import { showToast, triggerHaptic } from './ui.js';

export function renderDashboardCharts() {
    if (typeof Chart === 'undefined') return;

    // Safely destroy existing chart instances to prevent canvas memory leaks
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
