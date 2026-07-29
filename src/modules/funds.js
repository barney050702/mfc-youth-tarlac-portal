

export function exportFinancialStatementPDF() {
    const records = state.funds || [];
    let totalIncome = 0;
    let totalExpense = 0;
    records.forEach(r => {
        const amt = parseFloat(r.amount) || 0;
        if (r.type === 'Income') totalIncome += amt;
        else if (r.type === 'Expense') totalExpense += amt;
    });
    const netBalance = totalIncome - totalExpense;

    if (window.jspdf && window.jspdf.jsPDF) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 42, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(15);
        doc.setFont('helvetica', 'bold');
        doc.text('MFC YOUTH TARLAC - FINANCIAL LEDGER STATEMENT', 14, 18);

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(56, 189, 248);
        doc.text('OFFICIAL TREASURY REPORT & TRANSACTION RECORD', 14, 26);
        doc.setTextColor(148, 163, 184);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 34);

        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(`Total Income: P${totalIncome.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`, 14, 52);
        doc.text(`Total Expenses: P${totalExpense.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`, 80, 52);
        doc.text(`Net Balance: P${netBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`, 145, 52);

        const rows = records.map(r => [
            r.date || '-',
            r.type || '-',
            r.category || '-',
            r.description || '-',
            `P${(parseFloat(r.amount) || 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
        ]);

        doc.autoTable({
            startY: 60,
            head: [['Date', 'Type', 'Category', 'Description', 'Amount']],
            body: rows,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [2, 132, 199] },
            alternateRowStyles: { fillColor: [241, 245, 249] }
        });

        const finalY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY : 120;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100, 116, 139);
        doc.text('Certified Official Document - Missionary Families of Christ Youth Tarlac', 14, finalY + 18);

        doc.save(`MFC_Youth_Tarlac_Financial_Statement_${new Date().toISOString().slice(0, 10)}.pdf`);
        showToast('Financial Statement PDF exported successfully!', 'success');
        return;
    }

    const rowsHtml = records.map(r => {
        const amt = parseFloat(r.amount) || 0;
        const color = r.type === 'Income' ? '#059669' : '#DC2626';
        return `
            <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #E2E8F0;">${r.date || '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #E2E8F0; font-weight: 600; color: ${color};">${r.type}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #E2E8F0;">${r.category || '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #E2E8F0;">${r.description || '-'}</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #E2E8F0; text-align: right; font-weight: 700; color: ${color};">₱${amt.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
        `;
    }).join('');

    const printWin = window.open('', '_blank', 'width=900,height=800');
    printWin.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>MFC Youth Tarlac - Official Financial Statement</title>
            <style>
                body { font-family: 'Inter', system-ui, sans-serif; color: #0F172A; margin: 40px; background: #FFF; }
                .header { border-bottom: 3px solid #0284C7; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
                .header h1 { margin: 0; font-size: 1.6rem; color: #0F172A; }
                .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 28px; }
                .summary-card { border: 1px solid #CBD5E1; border-radius: 12px; padding: 16px; background: #F8FAFC; }
                table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                th { background: #0F172A; color: #FFF; text-align: left; padding: 12px; font-size: 0.8rem; }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1>MISSIONARY FAMILIES OF CHRIST YOUTH</h1>
                    <p>Tarlac Chapter • Official Financial Ledger & Statement</p>
                </div>
            </div>
            <div class="summary-grid">
                <div class="summary-card">
                    <div style="font-size:0.75rem; color:#64748B;">Total Income</div>
                    <div style="font-size:1.4rem; font-weight:800; color:#059669;">₱${totalIncome.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
                </div>
                <div class="summary-card">
                    <div style="font-size:0.75rem; color:#64748B;">Total Expense</div>
                    <div style="font-size:1.4rem; font-weight:800; color:#DC2626;">₱${totalExpense.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
                </div>
                <div class="summary-card">
                    <div style="font-size:0.75rem; color:#64748B;">Net Balance</div>
                    <div style="font-size:1.4rem; font-weight:800;">₱${netBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
                </div>
            </div>
            <table>
                <thead>
                    <tr><th>DATE</th><th>TYPE</th><th>CATEGORY</th><th>DESCRIPTION</th><th style="text-align:right;">AMOUNT</th></tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
            </table>
            <script>window.onload = function() { window.print(); };</script>
        </body>
        </html>
    `);
    printWin.document.close();
}

export function exportFinancialLedgerCSV() {
    const records = state.funds || [];
    if (records.length === 0) {
        showToast('No fund records available to export.', 'warning');
        return;
    }
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount (PHP)', 'Receipt Ref'];
    const rows = records.map(r => [
        `"${r.date || ''}"`,
        `"${r.type || ''}"`,
        `"${r.category || ''}"`,
        `"${(r.description || '').replace(/"/g, '""')}"`,
        r.amount || 0,
        `"${(r.receipt || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MFC_Youth_Tarlac_Financial_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Financial Ledger exported as Excel/CSV file!', 'success');
}

export function renderFundsTable() {
    const tbody = document.getElementById('funds-table-body');
    if (!tbody) return;

    let funds = state.funds || [];

    const typeFilter = document.getElementById('funds-type-filter');
    const categoryFilter = document.getElementById('funds-category-filter');
    const searchInput = document.getElementById('funds-search-input');

    const selectedType = typeFilter ? typeFilter.value : 'ALL';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'ALL';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = funds.filter(item => {
        const matchType = selectedType === 'ALL' || item.type === selectedType;
        const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
        const matchQuery = !query ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query) ||
            (item.receipt && item.receipt.toLowerCase().includes(query));
        return matchType && matchCategory && matchQuery;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    let totalIncome = 0;
    let totalExpenses = 0;
    funds.forEach(item => {
        const amt = parseFloat(item.amount) || 0;
        if (item.type === 'Income') totalIncome += amt;
        else if (item.type === 'Expense') totalExpenses += amt;
    });
    const currentBalance = totalIncome - totalExpenses;

    const elInc = document.getElementById('stat-total-income');
    const elExp = document.getElementById('stat-total-expenses');
    const elBal = document.getElementById('stat-current-balance');
    const elRec = document.getElementById('stat-total-records');

    if (elInc) elInc.textContent = formatPHP(totalIncome);
    if (elExp) elExp.textContent = formatPHP(totalExpenses);
    if (elBal) {
        elBal.textContent = formatPHP(currentBalance);
        elBal.style.color = currentBalance >= 0 ? '#10B981' : '#EF4444';
    }
    if (elRec) elRec.textContent = funds.length;

    const targetBudget = 50000.00;
    const achievedPct = Math.min(100, Math.max(0, Math.round((totalIncome / targetBudget) * 100)));
    const elBudgetTxt = document.getElementById('budget-achieved-text');
    const elBudgetFill = document.getElementById('budget-progress-fill');
    if (elBudgetTxt) elBudgetTxt.textContent = achievedPct + '% (' + formatPHP(totalIncome) + ')';
    if (elBudgetFill) elBudgetFill.style.width = achievedPct + '%';

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 100px 20px; color: #94A3B8; vertical-align: middle;">
                    <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="1.2" style="width: 72px; height: 72px; opacity: 0.8;"><path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><circle cx="14" cy="11" r="1"/></svg>
                    </div>
                    <div style="font-family: var(--font-heading); font-weight: 700; color: #E2E8F0; font-size: 1.4rem; margin-bottom: 8px;">No records found</div>
                    <div style="font-size: 0.95rem; color: #94A3B8;">Start tracking your funds by adding your first record.</div>
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = filtered.map(item => {
            const isIncome = item.type === 'Income';
            const badgeBg = isIncome ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';
            const badgeColor = isIncome ? '#10B981' : '#EF4444';
            const badgeBorder = isIncome ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)';
            const amountPrefix = isIncome ? '+' : '-';
            const amountColor = isIncome ? '#10B981' : '#EF4444';

            const dObj = new Date(item.date);
            const dateStr = isNaN(dObj.getTime()) ? item.date : dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            return `
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.03)'" onmouseout="this.style.background='transparent'">
                    <td style="padding: 16px 20px; color: #E2E8F0; font-weight: 600; font-size: 0.88rem;">${dateStr}</td>
                    <td style="padding: 16px 20px;">
                        <span style="background: ${badgeBg}; color: ${badgeColor}; border: 1px solid ${badgeBorder}; padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">
                            ${item.type}
                        </span>
                    </td>
                    <td style="padding: 16px 20px; color: #94A3B8; font-size: 0.88rem;">
                        <span style="background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.08);">
                            ${item.category}
                        </span>
                    </td>
                    <td style="padding: 16px 20px; color: #F8FAFC; font-weight: 700; font-size: 0.92rem;">${item.description}</td>
                    <td style="padding: 16px 20px; color: ${amountColor}; font-weight: 800; font-size: 0.95rem;">
                        ${amountPrefix}₱${parseFloat(item.amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td style="padding: 16px 20px; color: #64748B; font-size: 0.85rem;">
                        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                            <span>${item.receipt || '<span style="font-style:italic; opacity:0.5;">None</span>'}</span>
                            ${item.receiptImg ? `
                                <button type="button" onclick="openReceiptViewerModal('${item.id}')" style="background: rgba(16, 185, 129, 0.18); color: #10B981; border: 1px solid rgba(16, 185, 129, 0.4); padding: 3px 8px; border-radius: 6px; font-size: 0.72rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                                    📎 Photo
                                </button>
                            ` : ''}
                        </div>
                    </td>
                    <td style="padding: 16px 20px; text-align: right;">
                        <button onclick="openAddFundModal('${item.id}')" style="background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3); padding: 6px 10px; border-radius: 8px; margin-right: 6px; cursor: pointer; transition: all 0.2s;" title="Edit Record">
                            ✏️
                        </button>
                        <button onclick="deleteFundRecord('${item.id}')" style="background: rgba(239, 68, 68, 0.15); color: #EF4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 6px 10px; border-radius: 8px; cursor: pointer; transition: all 0.2s;" title="Delete Record">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

export function openReceiptViewerModal(recordId) {
    const item = state.funds && state.funds.find(f => f.id === recordId);
    if (!item || !item.receiptImg) return;

    if (imgEl) imgEl.src = item.receiptImg;
    if (capEl) capEl.textContent = `${item.description} (${item.receipt || 'Receipt Photo'})`;
    if (modal) modal.style.display = 'flex';
}

export function closeReceiptViewerModal() {
    const modal = document.getElementById('modal-receipt-viewer');
    const imgEl = document.getElementById('viewer-receipt-img');
    if (modal) modal.style.display = 'none';
    if (imgEl) imgEl.src = '';
}

export function filterFunds() {
    const typeFilter = document.getElementById('funds-type-filter');
    const catFilter = document.getElementById('funds-category-filter');
    if (typeFilter && catFilter) {
        const currentCat = catFilter.value;
        const incomeCats = ['Tithe & Offering', 'Donation / Sponsorship', 'Fundraising Event', 'Registration Fees', 'Other Income'];
        const expenseCats = ['Assembly & Event Supplies', 'Youth Camp Food & Venue', 'Transportation & Logistics', 'Honorarium & Speakers', 'Administrative / Office', 'Other Expense'];

        let catsToShow = [];
        if (typeFilter.value === 'Income') catsToShow = incomeCats;
        else if (typeFilter.value === 'Expense') catsToShow = expenseCats;
        else catsToShow = [...incomeCats, ...expenseCats];

        const optionsHtml = `<option value="ALL">All Categories</option>` + catsToShow.map(c => `<option value="${c}" ${currentCat === c ? 'selected' : ''}>${c}</option>`).join('');
        if (catFilter.innerHTML !== optionsHtml) {
            catFilter.innerHTML = optionsHtml;
        }
    }
    renderFundsTable();
}

export function resetFundsFilter() {
    const typeFilter = document.getElementById('funds-type-filter');
    const catFilter = document.getElementById('funds-category-filter');
    const searchInput = document.getElementById('funds-search-input');
    if (typeFilter) typeFilter.value = 'ALL';
    if (catFilter) catFilter.value = 'ALL';
    if (searchInput) searchInput.value = '';
    renderFundsTable();
    showToast('Funds filters reset', 'info');
}

export function updateFundCategories() {
    const typeEl = document.getElementById('fund-type');
    const catEl = document.getElementById('fund-category');
    if (!typeEl || !catEl) return;

    const isIncome = typeEl.value === 'Income';
    const incomeCats = ['Tithe & Offering', 'Donation / Sponsorship', 'Fundraising Event', 'Registration Fees', 'Other Income'];
    const expenseCats = ['Assembly & Event Supplies', 'Youth Camp Food & Venue', 'Transportation & Logistics', 'Honorarium & Speakers', 'Administrative / Office', 'Other Expense'];

    const cats = isIncome ? incomeCats : expenseCats;
    catEl.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join('');
}

export function triggerReceiptUpload() {
    const fileInput = document.getElementById('fund-receipt-file');
    if (fileInput) fileInput.click();
}

export function handleReceiptImageSelect(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        showToast('Image file size exceeds 5MB limit', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const base64Data = e.target.result;
        const imgDataEl = document.getElementById('fund-receipt-image-data');
        if (imgDataEl) imgDataEl.value = base64Data;
        updateReceiptPreviewUI(base64Data, file.name);
    };
    reader.readAsDataURL(file);
}

export function removeReceiptImage(event) {
    if (event) event.stopPropagation();
    const fileInput = document.getElementById('fund-receipt-file');
    const imgDataEl = document.getElementById('fund-receipt-image-data');
    if (fileInput) fileInput.value = '';
    if (imgDataEl) imgDataEl.value = '';
    updateReceiptPreviewUI('', '');
}

export function updateReceiptPreviewUI(base64Data, fileName = 'receipt_image.jpg') {
    const promptEl = document.getElementById('receipt-upload-prompt');
    const previewEl = document.getElementById('receipt-upload-preview');
    const previewImg = document.getElementById('receipt-preview-img');
    const previewName = document.getElementById('receipt-preview-name');

    if (!promptEl || !previewEl) return;

    if (base64Data && base64Data.length > 0) {
        promptEl.style.display = 'none';
        previewEl.style.display = 'flex';
        if (previewImg) previewImg.src = base64Data;
        if (previewName) previewName.textContent = fileName || 'Attached Receipt';
    } else {
        promptEl.style.display = 'block';
        previewEl.style.display = 'none';
        if (previewImg) previewImg.src = '';
    }
}

export function openAddFundModal(editId = null) {
    const modal = document.getElementById('modal-funds-backdrop');
    if (!modal) return;

    const titleEl = document.getElementById('modal-funds-title');
    const idEl = document.getElementById('fund-id');
    const typeEl = document.getElementById('fund-type');
    const catEl = document.getElementById('fund-category');
    const amtEl = document.getElementById('fund-amount');
    const dateEl = document.getElementById('fund-date');
    const descEl = document.getElementById('fund-description');
    const recEl = document.getElementById('fund-receipt');

    const isEdit = (typeof editId === 'string' && editId.trim() !== '' && !editId.includes('Event'));
    if (isEdit) {
        const item = state.funds.find(f => f.id === editId);
        if (item) {
            if (titleEl) titleEl.textContent = 'Edit Fund Record';
            if (idEl) idEl.value = item.id;
            if (typeEl) { typeEl.value = item.type; updateFundCategories(); }
            if (catEl) catEl.value = item.category;
            if (amtEl) amtEl.value = item.amount;
            if (dateEl) dateEl.value = item.date;
            if (descEl) descEl.value = item.description;
            if (recEl) recEl.value = item.receipt || '';
            updateReceiptPreviewUI(item.receiptImg || '', 'Attached Receipt');
            modal.style.display = 'flex';
            return;
        }
    }

    if (titleEl) titleEl.textContent = 'Add Fund Record';
    if (idEl) idEl.value = '';
    if (typeEl) { typeEl.value = 'Income'; updateFundCategories(); }
    if (amtEl) amtEl.value = '';
    if (dateEl) dateEl.value = new Date().toISOString().split('T')[0];
    if (descEl) descEl.value = '';
    if (recEl) recEl.value = '';
    updateReceiptPreviewUI('', '');

    modal.style.display = 'flex';
}

export function closeAddFundModal() {
    const modal = document.getElementById('modal-funds-backdrop');
    if (modal) modal.style.display = 'none';
}

export function saveFundRecord(e) {
    e.preventDefault();
    const idEl = document.getElementById('fund-id');
    const typeEl = document.getElementById('fund-type');
    const catEl = document.getElementById('fund-category');
    const amtEl = document.getElementById('fund-amount');
    const dateEl = document.getElementById('fund-date');
    const descEl = document.getElementById('fund-description');
    const recEl = document.getElementById('fund-receipt');
    const imgDataEl = document.getElementById('fund-receipt-image-data');

    const amountVal = amtEl ? parseFloat(amtEl.value) : 0;
    if (isNaN(amountVal) || amountVal <= 0) {
        showToast('Please enter a valid amount greater than 0.', 'error');
        return;
    }

    const recordData = {
        type: typeEl ? typeEl.value : 'Income',
        category: catEl ? catEl.value : 'Other Income',
        amount: amountVal,
        date: dateEl ? dateEl.value : new Date().toISOString().split('T')[0],
        description: descEl ? descEl.value.trim() : '',
        receipt: recEl ? recEl.value.trim() : '',
        receiptImg: imgDataEl ? imgDataEl.value : ''
    };

    if (idEl && idEl.value) {
        const idx = state.funds.findIndex(f => f.id === idEl.value);
        if (idx !== -1) {
            state.funds[idx] = { ...state.funds[idx], ...recordData };
            showToast('Fund record updated successfully!', 'success');
        }
    } else {
        const newRecord = {
            id: 'f-' + Date.now(),
            ...recordData
        };
        state.funds.push(newRecord);
        showToast('New fund record saved to ledger!', 'success');
    }

    saveToStorage();
    renderFundsTable();
    logAuditAction(`Saved fund record (${recordData.type}): ${formatPHP(recordData.amount)}`, 'finance');
    closeAddFundModal();
}

export function deleteFundRecord(id) {
    const fRec = state.funds.find(f => f.id === id);
    if (!fRec) return;
    if (!confirm('Are you sure you want to delete this financial record?')) return;
    const deletedCopy = { ...fRec };
    state.funds = state.funds.filter(f => f.id !== id);
    saveToStorage();
    renderFundsTable();
    showToast('Fund record deleted', 'info', () => {
        state.funds.push(deletedCopy);
        saveToStorage();
        renderFundsTable();
        logAuditAction(`Restored fund record (${deletedCopy.type}): ${formatPHP(deletedCopy.amount)} via Undo`, 'finance');
    });
}