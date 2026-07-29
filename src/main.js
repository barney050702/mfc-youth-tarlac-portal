/**
 * MFC YOUTH TARLAC | MAIN APPLICATION ENTRYPOINT
 * Modular Initialization & Global App Shell Bindings
 */

import { state, loadFromStorage, subscribeState } from './modules/state.js';
import {
    switchView,
    toggleMobileSidebar,
    closeMobileSidebar,
    showToast,
    copyToClipboardText,
    openWhatsNewModal,
    closeWhatsNewModal,
    initMobileNativeGestures,
} from './modules/ui.js';
import { loginUser, logoutUser, initAuthWatchdog, sendPasswordReset } from './modules/auth.js';
import { MFCFirebaseCloud } from './modules/firebase.js';
import { openDigitalQRModal, closeDigitalQRModal, printMemberQRCard } from './modules/members.js';
import {
    populateAttendanceDropdown,
    renderAttendanceRoster,
    toggleAttendance,
    triggerAbsenteeAutoGmailPrompt,
    filterAttendanceRoster,
    batchMarkChapterPresent,
    sendGmailToCurrentAbsentees,
    updateRemarks,
    updateLiveProgress,
    markAllPresent,
    markAllAbsent,
    resetAttendanceSheet,
    startLiveQRScanner,
    stopLiveQRScanner,
    simulateQRCheckIn,
} from './modules/attendance.js';
import { renderActivitiesTable } from './modules/activities.js';
import {
    renderInteractiveCharts,
    generateExecutiveSummaryReport,
    renderAnalytics,
    exportToCSV,
    exportToPDF,
    exportMembersToPDF,
    exportMembersCSV,
    exportActivitiesCSV,
    exportAttendanceCSV,
    exportFundsCSV,
} from './modules/reports.js';
import {
    renderDashboard,
    renderAgendaTimeline,
    updatePastoralCareWidget,
    jumpToAttendance,
} from './modules/dashboard.js';
import { initializeEventListeners } from './modules/events.js';

import {
    openAddModal,
    closeAddModal,
    openMemberProfile,
    closeMemberModal,
    openAddMemberModal,
    openEditMemberModal,
    openPastoralGreetingModal,
    closePastoralGreetingModal,
    sendPastoralGreetingVia,
    openKeyboardCheatsheetModal,
    closeKeyboardCheatsheetModal,
    openHHFolderModal,
    closeHHFolderModal,
    openCSTFolderModal,
    closeCSTFolderModal,
    closeMemberProfileModal,
    openBatchIDPrintModal,
    openUploadResourceModal,
    closeUploadResourceModal,
    saveCustomResourceFile,
    renderCustomUploadedResources,
    openLetterGeneratorModal,
    closeLetterGeneratorModal,
    updateLetterPreview,
    downloadLetterPDF,
    openMemberIDCard,
    closeMemberIDCardModal,
    openPostAnnouncementModal,
    closePostAnnouncementModal,
    handlePostAnnouncement,
    openSubmitPrayerModal,
    closeSubmitPrayerModal,
    handleSubmitPrayer,
    closeAllActiveModals,
    toggleAIPastoralChat,
    handleAIChatSubmit,
    pinVenueLocation,
    closeVenueMapModal,
    handleVenueMapModalPin,
    handleCustomVenuePinSubmit,
    updateFormMapPreview,
    previewFormLocationOnMap,
} from './modules/ui-modals.js';
import {
    triggerConfettiBurst,
    transposeNote,
    openSongbookTransposerModal,
    closeSongbookTransposerModal,
    loadSongForTransposer,
    transposeSongKey,
    resetSongKey,
    renderTransposedSong,
    openInteractiveRosaryModal,
    closeInteractiveRosaryModal,
    selectRosaryMystery,
    nextRosaryBead,
    prevRosaryBead,
    renderRosaryState,
    renderGamificationLeaderboard,
    toggleAudioPlay,
    downloadCertificatePDF,
} from './modules/tools.js';

import {
    toggleAgendaSort,
    setAgendaSemester,
    setAgendaViewMode,
    refreshAgendaHistory,
    downloadActivityPDF,
    selectActivityForAttendance,
    handleFormSubmit,
    clearAllActivities,
} from './modules/activities.js';
import {
    setOrgViewMode,
    getMemberAttendanceRate,
    matchOrgDepartment,
    getCanonicalChapterName,
    renderOrgMemberCard,
    renderOrgChart,
    getRoleRank,
    formatRoleBadge,
    calculateAgeClean,
    checkAddMemberDuplicate,
    filterDuplicateMembers,
    renderMembersTable,
    renderMembersMobileCards,
    formatDateClean,
    clearAllMembers,
    generateMemberIDMatrixSVG,
    exportMemberDossierPDF,
    calculateAgeFromBirthday,
    closeAddMemberModal,
    handleAddMemberSubmit,
} from './modules/members.js';
import {
    exportFinancialStatementPDF,
    exportFinancialLedgerCSV,
    renderFundsTable,
    openReceiptViewerModal,
    closeReceiptViewerModal,
    filterFunds,
    resetFundsFilter,
    updateFundCategories,
    triggerReceiptUpload,
    handleReceiptImageSelect,
    removeReceiptImage,
    updateReceiptPreviewUI,
    openAddFundModal,
    closeAddFundModal,
    saveFundRecord,
    deleteFundRecord,
} from './modules/funds.js';
import {
    setupSpotlights,
    animateCounter,
    initApp,
    updateSyncStatus,
    updateBadgeCount,
} from './modules/core.js';

import * as Legacy from './modules/legacy.js';

document.addEventListener('DOMContentLoaded', () => {
    // If script.js initialized the core app, bind additional navigation listeners safely
    setupNavigationListeners();
    initializeEventListeners();

    // Call legacy mobile gestures if present in script.js
    if (typeof window.initMobileNativeGestures === 'function') {
        window.initMobileNativeGestures();
    } else if (typeof initMobileNativeGestures === 'function') {
        initMobileNativeGestures();
    }

    loadFromStorage();
    initAuthWatchdog();
    MFCFirebaseCloud.init();
    renderAllViews();
    subscribeState(() => {
        renderAllViews();
    });

    window.switchView = window.switchView || switchView;
    window.toggleMobileSidebar = window.toggleMobileSidebar || toggleMobileSidebar;
    window.closeMobileSidebar = window.closeMobileSidebar || closeMobileSidebar;
    window.loginUser = window.loginUser || loginUser;
    window.logoutUser = window.logoutUser || logoutUser;
    window.openDigitalQRModal = window.openDigitalQRModal || openDigitalQRModal;
    window.closeDigitalQRModal = window.closeDigitalQRModal || closeDigitalQRModal;
    window.printMemberQRCard = window.printMemberQRCard || printMemberQRCard;
    window.startLiveQRScanner = window.startLiveQRScanner || startLiveQRScanner;
    window.stopLiveQRScanner = window.stopLiveQRScanner || stopLiveQRScanner;
    window.simulateQRCheckIn = window.simulateQRCheckIn || simulateQRCheckIn;
    window.generateExecutiveSummaryReport =
        window.generateExecutiveSummaryReport || generateExecutiveSummaryReport;
    window.sendPasswordReset = window.sendPasswordReset || sendPasswordReset;
    window.openWhatsNewModal = window.openWhatsNewModal || openWhatsNewModal;
    window.closeWhatsNewModal = window.closeWhatsNewModal || closeWhatsNewModal;

    // Dashboard & Reports exports
    window.renderDashboard = window.renderDashboard || renderDashboard;
    window.renderAgendaTimeline = window.renderAgendaTimeline || renderAgendaTimeline;
    window.updatePastoralCareWidget = window.updatePastoralCareWidget || updatePastoralCareWidget;
    window.jumpToAttendance = window.jumpToAttendance || jumpToAttendance;
    window.renderInteractiveCharts = window.renderInteractiveCharts || renderInteractiveCharts;

    // Attendance Engine exports
    window.populateAttendanceDropdown =
        window.populateAttendanceDropdown || populateAttendanceDropdown;
    window.renderAttendanceRoster = window.renderAttendanceRoster || renderAttendanceRoster;
    window.toggleAttendance = window.toggleAttendance || toggleAttendance;
    window.triggerAbsenteeAutoGmailPrompt =
        window.triggerAbsenteeAutoGmailPrompt || triggerAbsenteeAutoGmailPrompt;
    window.filterAttendanceRoster = window.filterAttendanceRoster || filterAttendanceRoster;
    window.batchMarkChapterPresent = window.batchMarkChapterPresent || batchMarkChapterPresent;
    window.sendGmailToCurrentAbsentees =
        window.sendGmailToCurrentAbsentees || sendGmailToCurrentAbsentees;
    window.updateRemarks = window.updateRemarks || updateRemarks;
    window.updateLiveProgress = window.updateLiveProgress || updateLiveProgress;
    window.markAllPresent = window.markAllPresent || markAllPresent;
    window.markAllAbsent = window.markAllAbsent || markAllAbsent;
    window.resetAttendanceSheet = window.resetAttendanceSheet || resetAttendanceSheet;

    // Chunk A Exports
    window.openAddModal = window.openAddModal || openAddModal;
    window.closeAddModal = window.closeAddModal || closeAddModal;
    window.openMemberProfile = window.openMemberProfile || openMemberProfile;
    window.closeMemberModal = window.closeMemberModal || closeMemberModal;
    window.openAddMemberModal = window.openAddMemberModal || openAddMemberModal;
    window.openEditMemberModal = window.openEditMemberModal || openEditMemberModal;
    window.openPastoralGreetingModal =
        window.openPastoralGreetingModal || openPastoralGreetingModal;
    window.closePastoralGreetingModal =
        window.closePastoralGreetingModal || closePastoralGreetingModal;
    window.sendPastoralGreetingVia = window.sendPastoralGreetingVia || sendPastoralGreetingVia;
    window.openKeyboardCheatsheetModal =
        window.openKeyboardCheatsheetModal || openKeyboardCheatsheetModal;
    window.closeKeyboardCheatsheetModal =
        window.closeKeyboardCheatsheetModal || closeKeyboardCheatsheetModal;
    window.openHHFolderModal = window.openHHFolderModal || openHHFolderModal;
    window.closeHHFolderModal = window.closeHHFolderModal || closeHHFolderModal;
    window.openCSTFolderModal = window.openCSTFolderModal || openCSTFolderModal;
    window.closeCSTFolderModal = window.closeCSTFolderModal || closeCSTFolderModal;
    window.closeMemberProfileModal = window.closeMemberProfileModal || closeMemberProfileModal;
    window.openBatchIDPrintModal = window.openBatchIDPrintModal || openBatchIDPrintModal;
    window.openUploadResourceModal = window.openUploadResourceModal || openUploadResourceModal;
    window.closeUploadResourceModal = window.closeUploadResourceModal || closeUploadResourceModal;
    window.saveCustomResourceFile = window.saveCustomResourceFile || saveCustomResourceFile;
    window.renderCustomUploadedResources =
        window.renderCustomUploadedResources || renderCustomUploadedResources;
    window.openLetterGeneratorModal = window.openLetterGeneratorModal || openLetterGeneratorModal;
    window.closeLetterGeneratorModal =
        window.closeLetterGeneratorModal || closeLetterGeneratorModal;
    window.updateLetterPreview = window.updateLetterPreview || updateLetterPreview;
    window.downloadLetterPDF = window.downloadLetterPDF || downloadLetterPDF;
    window.openMemberIDCard = window.openMemberIDCard || openMemberIDCard;
    window.closeMemberIDCardModal = window.closeMemberIDCardModal || closeMemberIDCardModal;
    window.openPostAnnouncementModal =
        window.openPostAnnouncementModal || openPostAnnouncementModal;
    window.closePostAnnouncementModal =
        window.closePostAnnouncementModal || closePostAnnouncementModal;
    window.handlePostAnnouncement = window.handlePostAnnouncement || handlePostAnnouncement;
    window.openSubmitPrayerModal = window.openSubmitPrayerModal || openSubmitPrayerModal;
    window.closeSubmitPrayerModal = window.closeSubmitPrayerModal || closeSubmitPrayerModal;
    window.handleSubmitPrayer = window.handleSubmitPrayer || handleSubmitPrayer;
    window.closeAllActiveModals = window.closeAllActiveModals || closeAllActiveModals;
    window.toggleAIPastoralChat = window.toggleAIPastoralChat || toggleAIPastoralChat;
    window.handleAIChatSubmit = window.handleAIChatSubmit || handleAIChatSubmit;
    window.pinVenueLocation = window.pinVenueLocation || pinVenueLocation;
    window.closeVenueMapModal = window.closeVenueMapModal || closeVenueMapModal;
    window.handleVenueMapModalPin = window.handleVenueMapModalPin || handleVenueMapModalPin;
    window.handleCustomVenuePinSubmit =
        window.handleCustomVenuePinSubmit || handleCustomVenuePinSubmit;
    window.updateFormMapPreview = window.updateFormMapPreview || updateFormMapPreview;
    window.previewFormLocationOnMap = window.previewFormLocationOnMap || previewFormLocationOnMap;
    window.triggerConfettiBurst = window.triggerConfettiBurst || triggerConfettiBurst;
    window.transposeNote = window.transposeNote || transposeNote;
    window.openSongbookTransposerModal =
        window.openSongbookTransposerModal || openSongbookTransposerModal;
    window.closeSongbookTransposerModal =
        window.closeSongbookTransposerModal || closeSongbookTransposerModal;
    window.loadSongForTransposer = window.loadSongForTransposer || loadSongForTransposer;
    window.transposeSongKey = window.transposeSongKey || transposeSongKey;
    window.resetSongKey = window.resetSongKey || resetSongKey;
    window.renderTransposedSong = window.renderTransposedSong || renderTransposedSong;
    window.openInteractiveRosaryModal =
        window.openInteractiveRosaryModal || openInteractiveRosaryModal;
    window.closeInteractiveRosaryModal =
        window.closeInteractiveRosaryModal || closeInteractiveRosaryModal;
    window.selectRosaryMystery = window.selectRosaryMystery || selectRosaryMystery;
    window.nextRosaryBead = window.nextRosaryBead || nextRosaryBead;
    window.prevRosaryBead = window.prevRosaryBead || prevRosaryBead;
    window.renderRosaryState = window.renderRosaryState || renderRosaryState;
    window.renderGamificationLeaderboard =
        window.renderGamificationLeaderboard || renderGamificationLeaderboard;
    window.toggleAudioPlay = window.toggleAudioPlay || toggleAudioPlay;
    window.downloadCertificatePDF = window.downloadCertificatePDF || downloadCertificatePDF;

    // Chunk B Exports
    window.toggleAgendaSort = window.toggleAgendaSort || toggleAgendaSort;
    window.setAgendaSemester = window.setAgendaSemester || setAgendaSemester;
    window.setAgendaViewMode = window.setAgendaViewMode || setAgendaViewMode;
    window.refreshAgendaHistory = window.refreshAgendaHistory || refreshAgendaHistory;
    window.downloadActivityPDF = window.downloadActivityPDF || downloadActivityPDF;
    window.selectActivityForAttendance =
        window.selectActivityForAttendance || selectActivityForAttendance;
    window.handleFormSubmit = window.handleFormSubmit || handleFormSubmit;
    window.clearAllActivities = window.clearAllActivities || clearAllActivities;
    window.setOrgViewMode = window.setOrgViewMode || setOrgViewMode;
    window.getMemberAttendanceRate = window.getMemberAttendanceRate || getMemberAttendanceRate;
    window.matchOrgDepartment = window.matchOrgDepartment || matchOrgDepartment;
    window.getCanonicalChapterName = window.getCanonicalChapterName || getCanonicalChapterName;
    window.renderOrgMemberCard = window.renderOrgMemberCard || renderOrgMemberCard;
    window.renderOrgChart = window.renderOrgChart || renderOrgChart;
    window.getRoleRank = window.getRoleRank || getRoleRank;
    window.formatRoleBadge = window.formatRoleBadge || formatRoleBadge;
    window.calculateAgeClean = window.calculateAgeClean || calculateAgeClean;
    window.checkAddMemberDuplicate = window.checkAddMemberDuplicate || checkAddMemberDuplicate;
    window.filterDuplicateMembers = window.filterDuplicateMembers || filterDuplicateMembers;
    window.renderMembersTable = window.renderMembersTable || renderMembersTable;
    window.renderMembersMobileCards = window.renderMembersMobileCards || renderMembersMobileCards;
    window.loadMoreMembers = window.loadMoreMembers || Members.loadMoreMembers;
    window.formatDateClean = window.formatDateClean || formatDateClean;
    window.clearAllMembers = window.clearAllMembers || clearAllMembers;
    window.generateMemberIDMatrixSVG =
        window.generateMemberIDMatrixSVG || generateMemberIDMatrixSVG;
    window.exportMemberDossierPDF = window.exportMemberDossierPDF || exportMemberDossierPDF;
    window.calculateAgeFromBirthday = window.calculateAgeFromBirthday || calculateAgeFromBirthday;
    window.closeAddMemberModal = window.closeAddMemberModal || closeAddMemberModal;
    window.handleAddMemberSubmit = window.handleAddMemberSubmit || handleAddMemberSubmit;
    window.exportFinancialStatementPDF =
        window.exportFinancialStatementPDF || exportFinancialStatementPDF;
    window.exportFinancialLedgerCSV = window.exportFinancialLedgerCSV || exportFinancialLedgerCSV;
    window.renderFundsTable = window.renderFundsTable || renderFundsTable;
    window.openReceiptViewerModal = window.openReceiptViewerModal || openReceiptViewerModal;
    window.closeReceiptViewerModal = window.closeReceiptViewerModal || closeReceiptViewerModal;
    window.filterFunds = window.filterFunds || filterFunds;
    window.resetFundsFilter = window.resetFundsFilter || resetFundsFilter;
    window.updateFundCategories = window.updateFundCategories || updateFundCategories;
    window.triggerReceiptUpload = window.triggerReceiptUpload || triggerReceiptUpload;
    window.handleReceiptImageSelect = window.handleReceiptImageSelect || handleReceiptImageSelect;
    window.removeReceiptImage = window.removeReceiptImage || removeReceiptImage;
    window.updateReceiptPreviewUI = window.updateReceiptPreviewUI || updateReceiptPreviewUI;
    window.openAddFundModal = window.openAddFundModal || openAddFundModal;
    window.closeAddFundModal = window.closeAddFundModal || closeAddFundModal;
    window.saveFundRecord = window.saveFundRecord || saveFundRecord;
    window.deleteFundRecord = window.deleteFundRecord || deleteFundRecord;
    window.setupSpotlights = window.setupSpotlights || setupSpotlights;
    window.animateCounter = window.animateCounter || animateCounter;
    window.initApp = window.initApp || initApp;
    window.updateSyncStatus = window.updateSyncStatus || updateSyncStatus;
    window.updateBadgeCount = window.updateBadgeCount || updateBadgeCount;

    // Chunk C (Legacy) Exports
    window.renderAccountsTable = window.renderAccountsTable || Legacy.renderAccountsTable;
    window.openCreateAccountModal = window.openCreateAccountModal || Legacy.openCreateAccountModal;
    window.closeCreateAccountModal =
        window.closeCreateAccountModal || Legacy.closeCreateAccountModal;
    window.toggleAccountChapterGroup =
        window.toggleAccountChapterGroup || Legacy.toggleAccountChapterGroup;
    window.handleCreateAccount = window.handleCreateAccount || Legacy.handleCreateAccount;
    window.deleteAccount = window.deleteAccount || Legacy.deleteAccount;
    window.openUserProfileModal = window.openUserProfileModal || Legacy.openUserProfileModal;
    window.closeUserProfileModal = window.closeUserProfileModal || Legacy.closeUserProfileModal;
    window.switchProfileModalView = window.switchProfileModalView || Legacy.switchProfileModalView;
    window.saveNewPasscode = window.saveNewPasscode || Legacy.saveNewPasscode;
    window.saveRecoveryOptions = window.saveRecoveryOptions || Legacy.saveRecoveryOptions;
    window.logAuditAction = window.logAuditAction || Legacy.logAuditAction;
    window.renderAuditLog = window.renderAuditLog || Legacy.renderAuditLog;
    window.exportBackupJSON = window.exportBackupJSON || Legacy.exportBackupJSON;
    window.exportToGoogleSheetsTSV =
        window.exportToGoogleSheetsTSV || Legacy.exportToGoogleSheetsTSV;
    window.importBackupJSON = window.importBackupJSON || Legacy.importBackupJSON;
    window.switchSimulatedRole = window.switchSimulatedRole || Legacy.switchSimulatedRole;
    window.resetInactivityTimer = window.resetInactivityTimer || Legacy.resetInactivityTimer;
    window.startInactivityWatchdog =
        window.startInactivityWatchdog || Legacy.startInactivityWatchdog;
    window.openImportCSVModal = window.openImportCSVModal || Legacy.openImportCSVModal;
    window.closeImportCSVModal = window.closeImportCSVModal || Legacy.closeImportCSVModal;
    window.handleCSVFileUpload = window.handleCSVFileUpload || Legacy.handleCSVFileUpload;
    window.splitCSVLine = window.splitCSVLine || Legacy.splitCSVLine;
    window.smartParseCSVRows = window.smartParseCSVRows || Legacy.smartParseCSVRows;
    window.autoArrangeCSVContent = window.autoArrangeCSVContent || Legacy.autoArrangeCSVContent;
    window.processCSVImport = window.processCSVImport || Legacy.processCSVImport;
    window.generateSVGQRCode = window.generateSVGQRCode || Legacy.generateSVGQRCode;
    window.renderScannableQRCode = window.renderScannableQRCode || Legacy.renderScannableQRCode;
    window.printMemberIDCard = window.printMemberIDCard || Legacy.printMemberIDCard;
    window.restoreBackupJSON = window.restoreBackupJSON || Legacy.restoreBackupJSON;
    window.restoreFromAutoRecoverySnapshot =
        window.restoreFromAutoRecoverySnapshot || Legacy.restoreFromAutoRecoverySnapshot;
    window.resetSystemToDefault = window.resetSystemToDefault || Legacy.resetSystemToDefault;
    window.autoSendBatchPastoralGmail =
        window.autoSendBatchPastoralGmail || Legacy.autoSendBatchPastoralGmail;
    window.copyPastoralMessage = window.copyPastoralMessage || Legacy.copyPastoralMessage;
    window.updateTopSearchHighlight =
        window.updateTopSearchHighlight || Legacy.updateTopSearchHighlight;
    window.updateCmdPaletteHighlight =
        window.updateCmdPaletteHighlight || Legacy.updateCmdPaletteHighlight;
    window.openCommandPalette = window.openCommandPalette || Legacy.openCommandPalette;
    window.closeCommandPalette = window.closeCommandPalette || Legacy.closeCommandPalette;
    window.handleCommandPaletteSearch =
        window.handleCommandPaletteSearch || Legacy.handleCommandPaletteSearch;
    window.handleGlobalSearch = window.handleGlobalSearch || Legacy.handleGlobalSearch;
    window.toggleResourcesMenu = window.toggleResourcesMenu || Legacy.toggleResourcesMenu;
    window.openAddResourceModal = window.openAddResourceModal || Legacy.openAddResourceModal;
    window.closeAddResourceModal = window.closeAddResourceModal || Legacy.closeAddResourceModal;
    window.handleAddResourceSubmit =
        window.handleAddResourceSubmit || Legacy.handleAddResourceSubmit;
    window.renderResourceCards = window.renderResourceCards || Legacy.renderResourceCards;
    window.deleteResourceCard = window.deleteResourceCard || Legacy.deleteResourceCard;
    window.applyHiddenStaticResources =
        window.applyHiddenStaticResources || Legacy.applyHiddenStaticResources;
    window.hideStaticResource = window.hideStaticResource || Legacy.hideStaticResource;
    window.openRemoveResourceModal =
        window.openRemoveResourceModal || Legacy.openRemoveResourceModal;
    window.closeRemoveResourceModal =
        window.closeRemoveResourceModal || Legacy.closeRemoveResourceModal;
    window.renderRemoveList = window.renderRemoveList || Legacy.renderRemoveList;
    window.openDownloadAllModal = window.openDownloadAllModal || Legacy.openDownloadAllModal;
    window.closeDownloadAllModal = window.closeDownloadAllModal || Legacy.closeDownloadAllModal;
    window.renderDownloadAllList = window.renderDownloadAllList || Legacy.renderDownloadAllList;
    window.markFileDownloaded = window.markFileDownloaded || Legacy.markFileDownloaded;
    window.startBatchDownload = window.startBatchDownload || Legacy.startBatchDownload;
    window.openPublishModal = window.openPublishModal || Legacy.openPublishModal;
    window.closePublishModal = window.closePublishModal || Legacy.closePublishModal;
    window.openFirebaseConfigModal =
        window.openFirebaseConfigModal || Legacy.openFirebaseConfigModal;
    window.closeFirebaseConfigModal =
        window.closeFirebaseConfigModal || Legacy.closeFirebaseConfigModal;
    window.saveFirebaseConfigSettings =
        window.saveFirebaseConfigSettings || Legacy.saveFirebaseConfigSettings;
    window.triggerFirebaseForceSync =
        window.triggerFirebaseForceSync || Legacy.triggerFirebaseForceSync;
    window.triggerFirebasePull = window.triggerFirebasePull || Legacy.triggerFirebasePull;
    window.generateExecutiveSummaryPDF =
        window.generateExecutiveSummaryPDF || Legacy.generateExecutiveSummaryPDF;
    window.updateLiveCloudTicker = window.updateLiveCloudTicker || Legacy.updateLiveCloudTicker;
    window.triggerHapticFeedback = window.triggerHapticFeedback || Legacy.triggerHapticFeedback;
    window.triggerMobileQuickScan = window.triggerMobileQuickScan || Legacy.triggerMobileQuickScan;
    window.exportExecutiveSummaryPDF =
        window.exportExecutiveSummaryPDF || Legacy.exportExecutiveSummaryPDF;
    window.exportFullBackupJSON = window.exportFullBackupJSON || Legacy.exportFullBackupJSON;
    window.importFullBackupJSON = window.importFullBackupJSON || Legacy.importFullBackupJSON;
    window.getMemberBadgesHtml = window.getMemberBadgesHtml || Legacy.getMemberBadgesHtml;
    window.openCertificateModal = window.openCertificateModal || Legacy.openCertificateModal;
    window.closeCertificateModal = window.closeCertificateModal || Legacy.closeCertificateModal;
    window.printOfficialCertificate =
        window.printOfficialCertificate || Legacy.printOfficialCertificate;
    window.renderCalendarAndPrayerWall =
        window.renderCalendarAndPrayerWall || Legacy.renderCalendarAndPrayerWall;
    window.openAttendanceMatrixModal =
        window.openAttendanceMatrixModal || Legacy.openAttendanceMatrixModal;
    window.closeAttendanceMatrixModal =
        window.closeAttendanceMatrixModal || Legacy.closeAttendanceMatrixModal;
    window.renderAttendanceMatrixSheet =
        window.renderAttendanceMatrixSheet || Legacy.renderAttendanceMatrixSheet;
    window.exportAttendanceMatrixCSV =
        window.exportAttendanceMatrixCSV || Legacy.exportAttendanceMatrixCSV;
    window.closeBirthdayCardModal = window.closeBirthdayCardModal || Legacy.closeBirthdayCardModal;
    window.copyBirthdayCardMessage =
        window.copyBirthdayCardMessage || Legacy.copyBirthdayCardMessage;
    window.printMemberReportCardFromModal =
        window.printMemberReportCardFromModal || Legacy.printMemberReportCardFromModal;
    window.renderAttendanceHeatmapWidget =
        window.renderAttendanceHeatmapWidget || Legacy.renderAttendanceHeatmapWidget;
    window.openHouseholdTreeViewModal =
        window.openHouseholdTreeViewModal || Legacy.openHouseholdTreeViewModal;
    window.closeHouseholdTreeViewModal =
        window.closeHouseholdTreeViewModal || Legacy.closeHouseholdTreeViewModal;
    window.triggerMemberAutoAwardFromModal =
        window.triggerMemberAutoAwardFromModal || Legacy.triggerMemberAutoAwardFromModal;
    window.autoAwardCertificate = window.autoAwardCertificate || Legacy.autoAwardCertificate;
    window.renderFundsChart = window.renderFundsChart || Legacy.renderFundsChart;
    window.initPullToRefresh = window.initPullToRefresh || Legacy.initPullToRefresh;
    window.initOrgChartTouchPan = window.initOrgChartTouchPan || Legacy.initOrgChartTouchPan;
    window.openAbsenteeSwiperModal =
        window.openAbsenteeSwiperModal || Legacy.openAbsenteeSwiperModal;
    window.closeAbsenteeSwiperModal =
        window.closeAbsenteeSwiperModal || Legacy.closeAbsenteeSwiperModal;
    window.renderAbsenteeSlide = window.renderAbsenteeSlide || Legacy.renderAbsenteeSlide;
    window.prevAbsenteeSlide = window.prevAbsenteeSlide || Legacy.prevAbsenteeSlide;
    window.nextAbsenteeSlide = window.nextAbsenteeSlide || Legacy.nextAbsenteeSlide;
    window.initPWAInstallListener = window.initPWAInstallListener || Legacy.initPWAInstallListener;
    window.triggerPWAInstall = window.triggerPWAInstall || Legacy.triggerPWAInstall;
    window.applyStoredTheme = window.applyStoredTheme || Legacy.applyStoredTheme;
    window.togglePortalTheme = window.togglePortalTheme || Legacy.togglePortalTheme;
    window.moveAttendanceKeyboardHighlight =
        window.moveAttendanceKeyboardHighlight || Legacy.moveAttendanceKeyboardHighlight;
    window.triggerKeyboardAttendanceAction =
        window.triggerKeyboardAttendanceAction || Legacy.triggerKeyboardAttendanceAction;
    window.printBlankAttendanceSheet =
        window.printBlankAttendanceSheet || Legacy.printBlankAttendanceSheet;
    window.resetActivityFilters = window.resetActivityFilters || Legacy.resetActivityFilters;
    window.resetMemberFilters = window.resetMemberFilters || Legacy.resetMemberFilters;
    window.generateOfficialLedgerPDF =
        window.generateOfficialLedgerPDF || Legacy.generateOfficialLedgerPDF;
    window.renderEventCalendar = window.renderEventCalendar || Legacy.renderEventCalendar;
    window.navigateCalendarMonth = window.navigateCalendarMonth || Legacy.navigateCalendarMonth;
    window.toggleEventRSVP = window.toggleEventRSVP || Legacy.toggleEventRSVP;
    window.initPortalCharts = window.initPortalCharts || Legacy.initPortalCharts;
    window.renderAnnouncementsBoard =
        window.renderAnnouncementsBoard || Legacy.renderAnnouncementsBoard;
    window.renderPrayersBoard = window.renderPrayersBoard || Legacy.renderPrayersBoard;
    window.incrementPrayerCount = window.incrementPrayerCount || Legacy.incrementPrayerCount;

    // Dashboard & Reports exports
    window.renderAnalytics = window.renderAnalytics || renderAnalytics;
    window.exportToCSV = window.exportToCSV || exportToCSV;
    window.exportToPDF = window.exportToPDF || exportToPDF;
    window.exportMembersToPDF = window.exportMembersToPDF || exportMembersToPDF;
    window.exportMembersCSV = window.exportMembersCSV || exportMembersCSV;
    window.exportActivitiesCSV = window.exportActivitiesCSV || exportActivitiesCSV;
    window.exportAttendanceCSV = window.exportAttendanceCSV || exportAttendanceCSV;
    window.exportFundsCSV = window.exportFundsCSV || exportFundsCSV;
});

function setupNavigationListeners() {
    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            if (view) switchView(view);
        });
    });

    const loginForm = document.getElementById('auth-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
}

function renderAllViews() {
    const isMember = localStorage.getItem('ps_role') === 'MEMBER';

    // Toggle nav items
    document.querySelectorAll('.nav-item, .sidebar-nav-item').forEach((item) => {
        const view = item.getAttribute('data-view');
        if (isMember) {
            item.style.display = view === 'member-dashboard' ? 'flex' : 'none';
        } else {
            item.style.display = view === 'member-dashboard' ? 'none' : 'flex';
        }
    });

    if (isMember) {
        if (typeof window.switchView === 'function') window.switchView('member-dashboard');
        // Render member dashboard info
        const memberName = localStorage.getItem('ps_member_name') || 'Member';
        const memberId = localStorage.getItem('ps_member_id') || 'Unknown';
        const nameEl = document.getElementById('member-dash-name');
        if (nameEl) nameEl.textContent = memberName.split(' ')[0];

        // Generate QR
        const qrContainer = document.getElementById('member-dash-qr');
        if (qrContainer && typeof QRCode !== 'undefined') {
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: memberId,
                width: 150,
                height: 150,
                colorDark: '#090D16',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H,
            });
        }
        // Fetch Attendance
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            const db = firebase.firestore();
            db.collection('attendance')
                .where('mfc_id', '==', memberId)
                .orderBy('timestamp', 'desc')
                .limit(5)
                .get()
                .then((snapshot) => {
                    const listEl = document.getElementById('member-dash-attendance-list');
                    if (!listEl) return;

                    if (snapshot.empty) {
                        listEl.innerHTML = `
                        <div class="empty-state" style="text-align: center; padding: 20px;">
                            <p>No recent attendance records found.</p>
                        </div>
                    `;
                        return;
                    }

                    let html = '';
                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        const dateStr = data.timestamp
                            ? new Date(data.timestamp.toDate()).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                              })
                            : 'Unknown Date';
                        const statusColor =
                            data.status === 'Present'
                                ? '#34D399'
                                : data.status === 'Absent'
                                  ? '#EF4444'
                                  : '#F59E0B';
                        html += `
                        <div style="background: rgba(15, 23, 42, 0.6); padding: 12px 16px; border-radius: 8px; border-left: 4px solid ${statusColor}; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h4 style="margin: 0; font-size: 1rem; font-weight: 600;">${data.activity_name || 'Activity'}</h4>
                                <span style="font-size: 0.8rem; color: var(--text-muted);">${dateStr}</span>
                            </div>
                            <span style="font-weight: 700; color: ${statusColor};">${data.status}</span>
                        </div>
                    `;
                    });
                    listEl.innerHTML = html;
                })
                .catch((err) => {
                    console.warn('Error fetching member attendance:', err);
                    const listEl = document.getElementById('member-dash-attendance-list');
                    if (listEl)
                        listEl.innerHTML = `<p style="color:#EF4444;">Failed to load records.</p>`;
                });
        }
    } else {
        renderDashboard();
        if (window.renderMembersTable) window.renderMembersTable();
        populateAttendanceDropdown();
        renderAttendanceRoster();
        renderActivitiesTable();
        if (window.renderInteractiveCharts) window.renderInteractiveCharts();
    }
}
window.renderAll = renderAllViews;
