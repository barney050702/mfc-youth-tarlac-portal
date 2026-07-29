const fs = require('fs');
const path = require('path');

const mainPath = path.join(__dirname, 'src', 'main.js');
let mainCode = fs.readFileSync(mainPath, 'utf8');

const uiModals = [
    'openAddModal', 'closeAddModal', 
    'openMemberProfile', 'closeMemberModal', 'openAddMemberModal', 'openEditMemberModal',
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
    'updateFormMapPreview', 'previewFormLocationOnMap'
]; // Removed 'showToast' because it might already be in ui.js

const toolsFunctions = [
    'triggerConfettiBurst',
    'transposeNote', 'openSongbookTransposerModal', 'closeSongbookTransposerModal', 'loadSongForTransposer', 'transposeSongKey', 'resetSongKey', 'renderTransposedSong',
    'openInteractiveRosaryModal', 'closeInteractiveRosaryModal', 'selectRosaryMystery', 'nextRosaryBead', 'prevRosaryBead', 'renderRosaryState',
    'renderGamificationLeaderboard', 'toggleAudioPlay', 'downloadCertificatePDF'
];

let importStatements = `
import { ${uiModals.join(', ')} } from './modules/ui-modals.js';
import { ${toolsFunctions.join(', ')} } from './modules/tools.js';
`;

let windowBindings = '';
for (const fn of [...uiModals, ...toolsFunctions]) {
    windowBindings += `    window.${fn} = window.${fn} || ${fn};\n`;
}

// Inject import statements before DOMContentLoaded
mainCode = mainCode.replace("document.addEventListener('DOMContentLoaded', () => {", importStatements + "\ndocument.addEventListener('DOMContentLoaded', () => {");

// Inject window bindings at the end of the DOMContentLoaded block
const injectTarget = "    // Dashboard & Reports exports\n    window.renderAnalytics = window.renderAnalytics || renderAnalytics;";
mainCode = mainCode.replace(injectTarget, "    // Chunk A Exports\n" + windowBindings + "\n" + injectTarget);

fs.writeFileSync(mainPath, mainCode);
console.log('Appended to main.js successfully');
