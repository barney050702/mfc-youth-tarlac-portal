const fs = require('fs');
const path = require('path');

const scriptPath = path.join(__dirname, 'script.js');
let code = fs.readFileSync(scriptPath, 'utf8');

function extractFunction(code, funcName) {
    const regex = new RegExp(`function\\s+${funcName}\\s*\\([^)]*\\)\\s*\\{`, 'g');
    const match = regex.exec(code);
    if (!match) return null;
    
    let startIndex = match.index;
    let index = startIndex + match[0].length;
    let braceCount = 1;
    
    while (braceCount > 0 && index < code.length) {
        if (code[index] === '{') braceCount++;
        if (code[index] === '}') braceCount--;
        index++;
    }
    
    const funcCode = code.substring(startIndex, index);
    return { funcCode, startIndex, endIndex: index };
}

function processFunctions(funcsToExtract, outputFile) {
    let extractedCode = [];
    let exportsList = [];
    
    code = fs.readFileSync(scriptPath, 'utf8');
    
    for (const funcName of funcsToExtract) {
        const result = extractFunction(code, funcName);
        if (result) {
            extractedCode.push(`export ${result.funcCode}`);
            exportsList.push(funcName);
            
            const emptyLines = '\n'.repeat((result.funcCode.match(/\n/g) || []).length);
            code = code.substring(0, result.startIndex) + `/* Extracted: ${funcName} */` + emptyLines + code.substring(result.endIndex);
        } else {
            console.log(`Could not find ${funcName}`);
        }
    }
    
    fs.writeFileSync(scriptPath, code);
    
    const outputFilePath = path.join(__dirname, 'src', 'modules', outputFile);
    let existingContent = '';
    if (fs.existsSync(outputFilePath)) {
        existingContent = fs.readFileSync(outputFilePath, 'utf8');
    }
    
    const newContent = existingContent + '\n\n' + extractedCode.join('\n\n');
    fs.writeFileSync(outputFilePath, newContent);
    
    console.log(`Successfully extracted to ${outputFile}:`, exportsList.join(', '));
    return exportsList;
}

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
    'setupSpotlights', 'animateCounter', 'updateCounter', 'initApp', 'updateSyncStatus', 'updateBadgeCount'
];

processFunctions(activitiesFuncs, 'activities.js');
processFunctions(membersFuncs, 'members.js');
processFunctions(fundsFuncs, 'funds.js');
processFunctions(coreFuncs, 'core.js');

