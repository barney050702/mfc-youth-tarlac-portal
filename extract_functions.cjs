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
    
    // Read current state of script
    code = fs.readFileSync(scriptPath, 'utf8');
    
    for (const funcName of funcsToExtract) {
        const result = extractFunction(code, funcName);
        if (result) {
            extractedCode.push(`export ${result.funcCode}`);
            exportsList.push(funcName);
            
            // Remove from original code (pad with newlines to keep line numbers somewhat close)
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
    
    // Add to output file
    const newContent = existingContent + '\n\n' + extractedCode.join('\n\n');
    fs.writeFileSync(outputFilePath, newContent);
    
    console.log(`Successfully extracted to ${outputFile}:`, exportsList.join(', '));
    return exportsList;
}

// ==========================================
// CHUNK A.1: UI & Modals
// ==========================================
const uiModals = [
    'openAddModal', 'closeAddModal', 
    'openMemberProfile', 'closeMemberModal', 'openAddMemberModal', 'openEditMemberModal',
    'openHouseholdFolderModal', 'closeHouseholdFolderModal',
    'openPastoralGreetingModal', 'closePastoralGreetingModal', 'sendPastoralGreetingVia',
    'openKeyboardCheatsheetModal', 'closeKeyboardCheatsheetModal',
    'openHHFolderModal', 'closeHHFolderModal', 'openCSTFolderModal', 'closeCSTFolderModal',
    'closeMemberProfileModal',
    'openBatchIDPrintModal',
    'openUploadResourceModal', 'closeUploadResourceModal', 'saveCustomResourceFile', 'renderCustomUploadedResources',
    'openLetterGeneratorModal', 'closeLetterGeneratorModal', 'updateLetterPreview', 'downloadLetterPDF',
    'openMemberIDCard', 'closeMemberIDCardModal',
    'openPostAnnouncementModal', 'closePostAnnouncementModal', 'handlePostAnnouncement',
    'openSubmitPrayerModal', 'closeSubmitPrayerModal', 'handleSubmitPrayer',
    'closeAllActiveModals', 'toggleAIPastoralChat', 'handleAIChatSubmit',
    'pinVenueLocation', 'closeVenueMapModal', 'handleVenueMapModalPin', 'handleCustomVenuePinSubmit',
    'showToast', 'updateFormMapPreview', 'previewFormLocationOnMap'
];

// CHUNK A.2: Tools & Gamification
const toolsFunctions = [
    'triggerConfettiBurst',
    'transposeNote', 'openSongbookTransposerModal', 'closeSongbookTransposerModal', 'loadSongForTransposer', 'transposeSongKey', 'resetSongKey', 'renderTransposedSong',
    'openInteractiveRosaryModal', 'closeInteractiveRosaryModal', 'selectRosaryMystery', 'nextRosaryBead', 'prevRosaryBead', 'renderRosaryState',
    'renderGamificationLeaderboard', 'toggleAudioPlay', 'downloadCertificatePDF'
];

console.log('--- Extracting UI Modals ---');
processFunctions(uiModals, 'ui-modals.js');

console.log('--- Extracting Tools ---');
processFunctions(toolsFunctions, 'tools.js');
