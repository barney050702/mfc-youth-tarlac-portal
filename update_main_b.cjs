const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, 'src', 'main.js');
let mainCode = fs.readFileSync(mainPath, 'utf8');

const activitiesFuncs = [
    'toggleAgendaSort', 'setAgendaSemester', 'setAgendaViewMode', 'refreshAgendaHistory', 
    'downloadActivityPDF', 'selectActivityForAttendance', 'handleFormSubmit', 'clearAllActivities'
];

const membersFuncs = [
    'setOrgViewMode', 'getMemberAttendanceRate', 'matchOrgDepartment', 'getCanonicalChapterName', 
    'renderOrgMemberCard', 'renderOrgChart', 'getRoleRank', 'formatRoleBadge', 'calculateAgeClean', 
    'checkAddMemberDuplicate', 'filterDuplicateMembers', 'renderMembersTable', 'renderMembersMobileCards', 
    'formatDateClean', 'clearAllMembers', 'generateMemberIDMatrixSVG', 'exportMemberDossierPDF', 
    'calculateAgeFromBirthday', 'closeAddMemberModal', 'handleAddMemberSubmit'
];

const fundsFuncs = [
    'exportFinancialStatementPDF', 'exportFinancialLedgerCSV', 'renderFundsTable', 
    'openReceiptViewerModal', 'closeReceiptViewerModal', 'filterFunds', 'resetFundsFilter', 
    'updateFundCategories', 'triggerReceiptUpload', 'handleReceiptImageSelect', 'removeReceiptImage', 
    'updateReceiptPreviewUI', 'openAddFundModal', 'closeAddFundModal', 'saveFundRecord', 'deleteFundRecord'
];

const coreFuncs = [
    'setupSpotlights', 'animateCounter', 'initApp', 'updateSyncStatus', 'updateBadgeCount'
];

let importStatements = `
import { ${activitiesFuncs.join(', ')} } from './modules/activities.js';
import { ${membersFuncs.join(', ')} } from './modules/members.js';
import { ${fundsFuncs.join(', ')} } from './modules/funds.js';
import { ${coreFuncs.join(', ')} } from './modules/core.js';
`;

let windowBindings = '';
for (const fn of [...activitiesFuncs, ...membersFuncs, ...fundsFuncs, ...coreFuncs]) {
    windowBindings += `    window.${fn} = window.${fn} || ${fn};\n`;
}

// Inject import statements before DOMContentLoaded
mainCode = mainCode.replace("document.addEventListener('DOMContentLoaded', () => {", importStatements + "\ndocument.addEventListener('DOMContentLoaded', () => {");

// Inject window bindings at the end of the DOMContentLoaded block
const injectTarget = "    // Dashboard & Reports exports\n    window.renderAnalytics = window.renderAnalytics || renderAnalytics;";
mainCode = mainCode.replace(injectTarget, "    // Chunk B Exports\n" + windowBindings + "\n" + injectTarget);

fs.writeFileSync(mainPath, mainCode);
console.log('Appended Chunk B to main.js successfully');
