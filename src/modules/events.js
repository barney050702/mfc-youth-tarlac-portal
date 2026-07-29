import { state } from './state.js';
import { switchView, closeWhatsNewModal, openWhatsNewModal, closeMobileSidebar, toggleMobileSidebar, switchResourceCategory } from './ui.js';
import { filterByChapterBullet } from './members.js';

export function initializeEventListeners() {

    const attSelect = document.getElementById('attendance-activity-select');
    if (attSelect) {
        attSelect.addEventListener('change', (e) => {
            state.selectedActivityId = e.target.value;
            if (window.renderAttendanceRoster) window.renderAttendanceRoster();
        });
    }
    const el_action_btn_1 = document.getElementById('action-btn-1');
    if (el_action_btn_1) {
        el_action_btn_1.addEventListener('click', function(event) {
            closeWhatsNewModal()
        });
    }

    const el_action_btn_2 = document.getElementById('action-btn-2');
    if (el_action_btn_2) {
        el_action_btn_2.addEventListener('click', function(event) {
            closeWhatsNewModal()
        });
    }

    const el_sidebar_backdrop = document.getElementById('sidebar-backdrop');
    if (el_sidebar_backdrop) {
        el_sidebar_backdrop.addEventListener('click', function(event) {
            closeMobileSidebar()
        });
    }

    const el_action_btn_3 = document.getElementById('action-btn-3');
    if (el_action_btn_3) {
        el_action_btn_3.addEventListener('click', function(event) {
            switchView('dashboard')
        });
    }

    const el_action_btn_4 = document.getElementById('action-btn-4');
    if (el_action_btn_4) {
        el_action_btn_4.addEventListener('click', function(event) {
            switchView('activities')
        });
    }

    const el_action_btn_5 = document.getElementById('action-btn-5');
    if (el_action_btn_5) {
        el_action_btn_5.addEventListener('click', function(event) {
            switchView('members')
        });
    }

    const el_action_btn_6 = document.getElementById('action-btn-6');
    if (el_action_btn_6) {
        el_action_btn_6.addEventListener('click', function(event) {
            switchView('attendance')
        });
    }

    const el_action_btn_7 = document.getElementById('action-btn-7');
    if (el_action_btn_7) {
        el_action_btn_7.addEventListener('click', function(event) {
            switchView('funds')
        });
    }

    const el_action_btn_8 = document.getElementById('action-btn-8');
    if (el_action_btn_8) {
        el_action_btn_8.addEventListener('click', function(event) {
            switchView('agenda')
        });
    }

    const el_action_btn_9 = document.getElementById('action-btn-9');
    if (el_action_btn_9) {
        el_action_btn_9.addEventListener('click', function(event) {
            switchView('servants')
        });
    }

    const el_action_btn_10 = document.getElementById('action-btn-10');
    if (el_action_btn_10) {
        el_action_btn_10.addEventListener('click', function(event) {
            switchView('orgchart')
        });
    }

    const el_action_btn_11 = document.getElementById('action-btn-11');
    if (el_action_btn_11) {
        el_action_btn_11.addEventListener('click', function(event) {
            switchView('resources')
        });
    }

    const el_action_btn_12 = document.getElementById('action-btn-12');
    if (el_action_btn_12) {
        el_action_btn_12.addEventListener('click', function(event) {
            openWhatsNewModal()
        });
    }

    const el_menu_toggle_btn = document.getElementById('menu-toggle-btn');
    if (el_menu_toggle_btn) {
        el_menu_toggle_btn.addEventListener('click', function(event) {
            toggleMobileSidebar(event)
        });
    }

    const el_action_btn_13 = document.getElementById('action-btn-13');
    if (el_action_btn_13) {
        el_action_btn_13.addEventListener('click', function(event) {
            openCommandPalette()
        });
    }

    const el_firebase_cloud_status_btn = document.getElementById('firebase-cloud-status-btn');
    if (el_firebase_cloud_status_btn) {
        el_firebase_cloud_status_btn.addEventListener('click', function(event) {
            openFirebaseConfigModal()
        });
    }

    const el_whats_new_btn = document.getElementById('whats-new-btn');
    if (el_whats_new_btn) {
        el_whats_new_btn.addEventListener('click', function(event) {
            openWhatsNewModal()
        });
    }

    const el_install_pwa_btn = document.getElementById('install-pwa-btn');
    if (el_install_pwa_btn) {
        el_install_pwa_btn.addEventListener('click', function(event) {
            triggerPWAInstall()
        });
    }

    const el_cheatsheet_btn = document.getElementById('cheatsheet-btn');
    if (el_cheatsheet_btn) {
        el_cheatsheet_btn.addEventListener('click', function(event) {
            openKeyboardCheatsheetModal()
        });
    }

    const el_portal_sync_badge = document.getElementById('portal-sync-badge');
    if (el_portal_sync_badge) {
        el_portal_sync_badge.addEventListener('click', function(event) {
            exportFullBackupJSON()
        });
    }

    const el_profile_toggle_btn = document.getElementById('profile-toggle-btn');
    if (el_profile_toggle_btn) {
        el_profile_toggle_btn.addEventListener('click', function(event) {
            openUserProfileModal(event)
        });
    }

    const el_action_btn_14 = document.getElementById('action-btn-14');
    if (el_action_btn_14) {
        el_action_btn_14.addEventListener('click', function(event) {
            logoutUser()
        });
    }

    const el_action_btn_15 = document.getElementById('action-btn-15');
    if (el_action_btn_15) {
        el_action_btn_15.addEventListener('click', function(event) {
            exportExecutiveSummaryPDF()
        });
    }

    const el_action_btn_16 = document.getElementById('action-btn-16');
    if (el_action_btn_16) {
        el_action_btn_16.addEventListener('click', function(event) {
            exportFullBackupJSON()
        });
    }

    const el_action_btn_17 = document.getElementById('action-btn-17');
    if (el_action_btn_17) {
        el_action_btn_17.addEventListener('click', function(event) {
            generateExecutiveSummaryReport()
        });
    }

    const el_action_btn_18 = document.getElementById('action-btn-18');
    if (el_action_btn_18) {
        el_action_btn_18.addEventListener('click', function(event) {
            openAbsenteeSwiperModal()
        });
    }

    const el_tab_s1 = document.getElementById('tab-s1');
    if (el_tab_s1) {
        el_tab_s1.addEventListener('click', function(event) {
            setAgendaSemester('s1', this)
        });
    }

    const el_tab_s2 = document.getElementById('tab-s2');
    if (el_tab_s2) {
        el_tab_s2.addEventListener('click', function(event) {
            setAgendaSemester('s2', this)
        });
    }

    const el_tab_all = document.getElementById('tab-all');
    if (el_tab_all) {
        el_tab_all.addEventListener('click', function(event) {
            setAgendaSemester('all', this)
        });
    }

    const el_action_btn_19 = document.getElementById('action-btn-19');
    if (el_action_btn_19) {
        el_action_btn_19.addEventListener('click', function(event) {
            refreshAgendaHistory()
        });
    }

    const el_agenda_sort_btn = document.getElementById('agenda-sort-btn');
    if (el_agenda_sort_btn) {
        el_agenda_sort_btn.addEventListener('click', function(event) {
            toggleAgendaSort()
        });
    }

    const el_action_btn_20 = document.getElementById('action-btn-20');
    if (el_action_btn_20) {
        el_action_btn_20.addEventListener('click', function(event) {
            refreshAgendaHistory()
        });
    }

    const el_action_btn_21 = document.getElementById('action-btn-21');
    if (el_action_btn_21) {
        el_action_btn_21.addEventListener('click', function(event) {
            openAddModal()
        });
    }

    const el_action_btn_22 = document.getElementById('action-btn-22');
    if (el_action_btn_22) {
        el_action_btn_22.addEventListener('click', function(event) {
            navigateCalendarMonth(-1)
        });
    }

    const el_action_btn_23 = document.getElementById('action-btn-23');
    if (el_action_btn_23) {
        el_action_btn_23.addEventListener('click', function(event) {
            navigateCalendarMonth(1)
        });
    }

    const el_btn_open_qr_scanner = document.getElementById('btn-open-qr-scanner');
    if (el_btn_open_qr_scanner) {
        el_btn_open_qr_scanner.addEventListener('click', function(event) {
            if (window.startLiveQRScanner) window.startLiveQRScanner()
        });
    }

    const el_action_btn_24 = document.getElementById('action-btn-24');
    if (el_action_btn_24) {
        el_action_btn_24.addEventListener('click', function(event) {
            markAllAbsent()
        });
    }

    const el_action_btn_25 = document.getElementById('action-btn-25');
    if (el_action_btn_25) {
        el_action_btn_25.addEventListener('click', function(event) {
            sendGmailToCurrentAbsentees()
        });
    }

    const el_action_btn_26 = document.getElementById('action-btn-26');
    if (el_action_btn_26) {
        el_action_btn_26.addEventListener('click', function(event) {
            exportToPDF()
        });
    }

    const el_action_btn_27 = document.getElementById('action-btn-27');
    if (el_action_btn_27) {
        el_action_btn_27.addEventListener('click', function(event) {
            copyAttendanceSummaryForChat()
        });
    }

    const el_action_btn_28 = document.getElementById('action-btn-28');
    if (el_action_btn_28) {
        el_action_btn_28.addEventListener('click', function(event) {
            openPastoralFollowUpModal()
        });
    }

    const el_action_btn_29 = document.getElementById('action-btn-29');
    if (el_action_btn_29) {
        el_action_btn_29.addEventListener('click', function(event) {
            openAttendanceMatrixModal()
        });
    }

    const el_action_btn_30 = document.getElementById('action-btn-30');
    if (el_action_btn_30) {
        el_action_btn_30.addEventListener('click', function(event) {
            printBlankAttendanceSheet()
        });
    }

    const el_action_btn_31 = document.getElementById('action-btn-31');
    if (el_action_btn_31) {
        el_action_btn_31.addEventListener('click', function(event) {
            batchMarkChapterPresent('Central Chapter')
        });
    }

    const el_action_btn_32 = document.getElementById('action-btn-32');
    if (el_action_btn_32) {
        el_action_btn_32.addEventListener('click', function(event) {
            batchMarkChapterPresent('East Chapter')
        });
    }

    const el_action_btn_33 = document.getElementById('action-btn-33');
    if (el_action_btn_33) {
        el_action_btn_33.addEventListener('click', function(event) {
            batchMarkChapterPresent('North Chapter')
        });
    }

    const el_action_btn_34 = document.getElementById('action-btn-34');
    if (el_action_btn_34) {
        el_action_btn_34.addEventListener('click', function(event) {
            batchMarkChapterPresent('South Chapter')
        });
    }

    const el_action_btn_35 = document.getElementById('action-btn-35');
    if (el_action_btn_35) {
        el_action_btn_35.addEventListener('click', function(event) {
            batchMarkChapterPresent('West Chapter')
        });
    }

    const el_action_btn_36 = document.getElementById('action-btn-36');
    if (el_action_btn_36) {
        el_action_btn_36.addEventListener('click', function(event) {
            filterByChapterBullet('ALL', this)
        });
    }

    const el_action_btn_37 = document.getElementById('action-btn-37');
    if (el_action_btn_37) {
        el_action_btn_37.addEventListener('click', function(event) {
            filterByChapterBullet('Central Chapter', this)
        });
    }

    const el_action_btn_38 = document.getElementById('action-btn-38');
    if (el_action_btn_38) {
        el_action_btn_38.addEventListener('click', function(event) {
            filterByChapterBullet('East Chapter', this)
        });
    }

    const el_action_btn_39 = document.getElementById('action-btn-39');
    if (el_action_btn_39) {
        el_action_btn_39.addEventListener('click', function(event) {
            filterByChapterBullet('North Chapter', this)
        });
    }

    const el_action_btn_40 = document.getElementById('action-btn-40');
    if (el_action_btn_40) {
        el_action_btn_40.addEventListener('click', function(event) {
            filterByChapterBullet('South Chapter', this)
        });
    }

    const el_action_btn_41 = document.getElementById('action-btn-41');
    if (el_action_btn_41) {
        el_action_btn_41.addEventListener('click', function(event) {
            filterByChapterBullet('West Chapter', this)
        });
    }

    const el_action_btn_42 = document.getElementById('action-btn-42');
    if (el_action_btn_42) {
        el_action_btn_42.addEventListener('click', function(event) {
            exportMembersToPDF()
        });
    }

    const el_action_btn_43 = document.getElementById('action-btn-43');
    if (el_action_btn_43) {
        el_action_btn_43.addEventListener('click', function(event) {
            exportMembersCSV()
        });
    }

    const el_action_btn_44 = document.getElementById('action-btn-44');
    if (el_action_btn_44) {
        el_action_btn_44.addEventListener('click', function(event) {
            openMemberIDCard()
        });
    }

    const el_action_btn_45 = document.getElementById('action-btn-45');
    if (el_action_btn_45) {
        el_action_btn_45.addEventListener('click', function(event) {
            if (window.startLiveQRScanner) window.startLiveQRScanner()
        });
    }

    const el_action_btn_46 = document.getElementById('action-btn-46');
    if (el_action_btn_46) {
        el_action_btn_46.addEventListener('click', function(event) {
            openCertificateModal()
        });
    }

    const el_action_btn_47 = document.getElementById('action-btn-47');
    if (el_action_btn_47) {
        el_action_btn_47.addEventListener('click', function(event) {
            openHouseholdTreeViewModal()
        });
    }

    const el_action_btn_48 = document.getElementById('action-btn-48');
    if (el_action_btn_48) {
        el_action_btn_48.addEventListener('click', function(event) {
            printBlankAttendanceSheet()
        });
    }

    const el_action_btn_49 = document.getElementById('action-btn-49');
    if (el_action_btn_49) {
        el_action_btn_49.addEventListener('click', function(event) {
            clearAllMembers()
        });
    }

    const el_btn_filter_duplicates = document.getElementById('btn-filter-duplicates');
    if (el_btn_filter_duplicates) {
        el_btn_filter_duplicates.addEventListener('click', function(event) {
            filterDuplicateMembers()
        });
    }

    const el_action_btn_50 = document.getElementById('action-btn-50');
    if (el_action_btn_50) {
        el_action_btn_50.addEventListener('click', function(event) {
            exportToGoogleSheetsTSV()
        });
    }

    const el_btn_backup_json = document.getElementById('btn-backup-json');
    if (el_btn_backup_json) {
        el_btn_backup_json.addEventListener('click', function(event) {
            exportBackupJSON()
        });
    }

    const el_action_btn_51 = document.getElementById('action-btn-51');
    if (el_action_btn_51) {
        el_action_btn_51.addEventListener('click', function(event) {
            generatePastoralList()
        });
    }

    const el_btn_org_tree = document.getElementById('btn-org-tree');
    if (el_btn_org_tree) {
        el_btn_org_tree.addEventListener('click', function(event) {
            setOrgViewMode('tree')
        });
    }

    const el_btn_org_grid = document.getElementById('btn-org-grid');
    if (el_btn_org_grid) {
        el_btn_org_grid.addEventListener('click', function(event) {
            setOrgViewMode('grid')
        });
    }

    const el_btn_org_household = document.getElementById('btn-org-household');
    if (el_btn_org_household) {
        el_btn_org_household.addEventListener('click', function(event) {
            setOrgViewMode('household')
        });
    }

    const el_action_btn_52 = document.getElementById('action-btn-52');
    if (el_action_btn_52) {
        el_action_btn_52.addEventListener('click', function(event) {
            openBatchIDPrintModal()
        });
    }

    const el_action_btn_53 = document.getElementById('action-btn-53');
    if (el_action_btn_53) {
        el_action_btn_53.addEventListener('click', function(event) {
            openAddMemberModal()
        });
    }

    const el_action_btn_54 = document.getElementById('action-btn-54');
    if (el_action_btn_54) {
        el_action_btn_54.addEventListener('click', function(event) {
            resetFundsFilter()
        });
    }

    const el_action_btn_55 = document.getElementById('action-btn-55');
    if (el_action_btn_55) {
        el_action_btn_55.addEventListener('click', function(event) {
            exportFinancialLedgerCSV()
        });
    }

    const el_action_btn_56 = document.getElementById('action-btn-56');
    if (el_action_btn_56) {
        el_action_btn_56.addEventListener('click', function(event) {
            generateOfficialLedgerPDF()
        });
    }

    const el_action_btn_57 = document.getElementById('action-btn-57');
    if (el_action_btn_57) {
        el_action_btn_57.addEventListener('click', function(event) {
            openAddFundModal()
        });
    }

    const el_action_btn_58 = document.getElementById('action-btn-58');
    if (el_action_btn_58) {
        el_action_btn_58.addEventListener('click', function(event) {
            openDownloadAllModal()
        });
    }

    const el_btn_res_youthcamp = document.getElementById('btn-res-youthcamp');
    if (el_btn_res_youthcamp) {
        el_btn_res_youthcamp.addEventListener('click', function(event) {
            switchResourceCategory('youthcamp')
        });
    }

    const el_btn_res_trainings = document.getElementById('btn-res-trainings');
    if (el_btn_res_trainings) {
        el_btn_res_trainings.addEventListener('click', function(event) {
            switchResourceCategory('trainings')
        });
    }

    const el_btn_res_songboard = document.getElementById('btn-res-songboard');
    if (el_btn_res_songboard) {
        el_btn_res_songboard.addEventListener('click', function(event) {
            switchResourceCategory('songboard')
        });
    }

    const el_btn_res_holyrosary = document.getElementById('btn-res-holyrosary');
    if (el_btn_res_holyrosary) {
        el_btn_res_holyrosary.addEventListener('click', function(event) {
            switchResourceCategory('holyrosary')
        });
    }

    const el_btn_res_letters = document.getElementById('btn-res-letters');
    if (el_btn_res_letters) {
        el_btn_res_letters.addEventListener('click', function(event) {
            switchResourceCategory('letters')
        });
    }

    const el_action_btn_59 = document.getElementById('action-btn-59');
    if (el_action_btn_59) {
        el_action_btn_59.addEventListener('click', function(event) {
            openHHFolderModal()
        });
    }

    const el_action_btn_60 = document.getElementById('action-btn-60');
    if (el_action_btn_60) {
        el_action_btn_60.addEventListener('click', function(event) {
            openCSTFolderModal()
        });
    }

    const el_action_btn_61 = document.getElementById('action-btn-61');
    if (el_action_btn_61) {
        el_action_btn_61.addEventListener('click', function(event) {
            showToast('📄 Opened CLT Training Module', 'info')
        });
    }

    const el_action_btn_62 = document.getElementById('action-btn-62');
    if (el_action_btn_62) {
        el_action_btn_62.addEventListener('click', function(event) {
            showToast('📄 Opened Household Heads Guide', 'info')
        });
    }

    const el_action_btn_63 = document.getElementById('action-btn-63');
    if (el_action_btn_63) {
        el_action_btn_63.addEventListener('click', function(event) {
            showToast('📄 Opened Speaker Workshop Manual', 'info')
        });
    }

    const el_action_btn_64 = document.getElementById('action-btn-64');
    if (el_action_btn_64) {
        el_action_btn_64.addEventListener('click', function(event) {
            openSongbookTransposerModal()
        });
    }

    const el_action_btn_65 = document.getElementById('action-btn-65');
    if (el_action_btn_65) {
        el_action_btn_65.addEventListener('click', function(event) {
            showToast('📋 Opened Setlist Planner Sheet', 'info')
        });
    }

    const el_action_btn_66 = document.getElementById('action-btn-66');
    if (el_action_btn_66) {
        el_action_btn_66.addEventListener('click', function(event) {
            openInteractiveRosaryModal()
        });
    }

    const el_action_btn_67 = document.getElementById('action-btn-67');
    if (el_action_btn_67) {
        el_action_btn_67.addEventListener('click', function(event) {
            showToast('📄 Opened Chapter Prayer Sheet PDF', 'info')
        });
    }

    const el_action_btn_68 = document.getElementById('action-btn-68');
    if (el_action_btn_68) {
        el_action_btn_68.addEventListener('click', function(event) {
            openLetterGeneratorModal('parental')
        });
    }

    const el_action_btn_69 = document.getElementById('action-btn-69');
    if (el_action_btn_69) {
        el_action_btn_69.addEventListener('click', function(event) {
            openLetterGeneratorModal('parental')
        });
    }

    const el_action_btn_70 = document.getElementById('action-btn-70');
    if (el_action_btn_70) {
        el_action_btn_70.addEventListener('click', function(event) {
            openLetterGeneratorModal('excuse')
        });
    }

    const el_action_btn_71 = document.getElementById('action-btn-71');
    if (el_action_btn_71) {
        el_action_btn_71.addEventListener('click', function(event) {
            openLetterGeneratorModal('sponsorship')
        });
    }

    const el_action_btn_72 = document.getElementById('action-btn-72');
    if (el_action_btn_72) {
        el_action_btn_72.addEventListener('click', function(event) {
            openLetterGeneratorModal('transport')
        });
    }

    const el_action_btn_73 = document.getElementById('action-btn-73');
    if (el_action_btn_73) {
        el_action_btn_73.addEventListener('click', function(event) {
            closeDownloadAllModal()
        });
    }

    const el_action_btn_74 = document.getElementById('action-btn-74');
    if (el_action_btn_74) {
        el_action_btn_74.addEventListener('click', function(event) {
            closeDownloadAllModal()
        });
    }

    const el_btn_start_batch_download = document.getElementById('btn-start-batch-download');
    if (el_btn_start_batch_download) {
        el_btn_start_batch_download.addEventListener('click', function(event) {
            startBatchDownload()
        });
    }

    const el_action_btn_75 = document.getElementById('action-btn-75');
    if (el_action_btn_75) {
        el_action_btn_75.addEventListener('click', function(event) {
            closeHHFolderModal()
        });
    }

    const el_action_btn_76 = document.getElementById('action-btn-76');
    if (el_action_btn_76) {
        el_action_btn_76.addEventListener('click', function(event) {
            closeHHFolderModal()
        });
    }

    const el_action_btn_77 = document.getElementById('action-btn-77');
    if (el_action_btn_77) {
        el_action_btn_77.addEventListener('click', function(event) {
            closeCSTFolderModal()
        });
    }

    const el_action_btn_78 = document.getElementById('action-btn-78');
    if (el_action_btn_78) {
        el_action_btn_78.addEventListener('click', function(event) {
            closeCSTFolderModal()
        });
    }

    const el_action_btn_79 = document.getElementById('action-btn-79');
    if (el_action_btn_79) {
        el_action_btn_79.addEventListener('click', function(event) {
            openCreateAccountModal()
        });
    }

    const el_action_btn_80 = document.getElementById('action-btn-80');
    if (el_action_btn_80) {
        el_action_btn_80.addEventListener('click', function(event) {
            exportBackupJSON()
        });
    }

    const el_action_btn_81 = document.getElementById('action-btn-81');
    if (el_action_btn_81) {
        el_action_btn_81.addEventListener('click', function(event) {
            restoreFromAutoRecoverySnapshot()
        });
    }

    const el_action_btn_82 = document.getElementById('action-btn-82');
    if (el_action_btn_82) {
        el_action_btn_82.addEventListener('click', function(event) {
            resetSystemToDefault()
        });
    }

    const el_action_btn_83 = document.getElementById('action-btn-83');
    if (el_action_btn_83) {
        el_action_btn_83.addEventListener('click', function(event) {
            closeAddModal()
        });
    }

    const el_action_btn_84 = document.getElementById('action-btn-84');
    if (el_action_btn_84) {
        el_action_btn_84.addEventListener('click', function(event) {
            previewFormLocationOnMap()
        });
    }

    const el_action_btn_85 = document.getElementById('action-btn-85');
    if (el_action_btn_85) {
        el_action_btn_85.addEventListener('click', function(event) {
            closeAddModal()
        });
    }

    const el_action_btn_86 = document.getElementById('action-btn-86');
    if (el_action_btn_86) {
        el_action_btn_86.addEventListener('click', function(event) {
            closeCreateAccountModal()
        });
    }

    const el_action_btn_87 = document.getElementById('action-btn-87');
    if (el_action_btn_87) {
        el_action_btn_87.addEventListener('click', function(event) {
            closeMemberModal()
        });
    }

    const el_action_btn_88 = document.getElementById('action-btn-88');
    if (el_action_btn_88) {
        el_action_btn_88.addEventListener('click', function(event) {
            if (window.openDigitalQRModal) window.openDigitalQRModal(window.currentProfileMemberId)
        });
    }

    const el_action_btn_89 = document.getElementById('action-btn-89');
    if (el_action_btn_89) {
        el_action_btn_89.addEventListener('click', function(event) {
            printMemberReportCardFromModal()
        });
    }

    const el_action_btn_90 = document.getElementById('action-btn-90');
    if (el_action_btn_90) {
        el_action_btn_90.addEventListener('click', function(event) {
            triggerMemberAutoAwardFromModal()
        });
    }

    const el_action_btn_91 = document.getElementById('action-btn-91');
    if (el_action_btn_91) {
        el_action_btn_91.addEventListener('click', function(event) {
            closeMemberModal()
        });
    }

    const el_action_btn_92 = document.getElementById('action-btn-92');
    if (el_action_btn_92) {
        el_action_btn_92.addEventListener('click', function(event) {
            closeImportCSVModal()
        });
    }

    const el_action_btn_93 = document.getElementById('action-btn-93');
    if (el_action_btn_93) {
        el_action_btn_93.addEventListener('click', function(event) {
            autoArrangeCSVContent()
        });
    }

    const el_action_btn_94 = document.getElementById('action-btn-94');
    if (el_action_btn_94) {
        el_action_btn_94.addEventListener('click', function(event) {
            closeImportCSVModal()
        });
    }

    const el_action_btn_95 = document.getElementById('action-btn-95');
    if (el_action_btn_95) {
        el_action_btn_95.addEventListener('click', function(event) {
            autoArrangeCSVContent()
        });
    }

    const el_action_btn_96 = document.getElementById('action-btn-96');
    if (el_action_btn_96) {
        el_action_btn_96.addEventListener('click', function(event) {
            processCSVImport()
        });
    }

    const el_action_btn_97 = document.getElementById('action-btn-97');
    if (el_action_btn_97) {
        el_action_btn_97.addEventListener('click', function(event) {
            closeHouseholdTreeViewModal()
        });
    }

    const el_action_btn_98 = document.getElementById('action-btn-98');
    if (el_action_btn_98) {
        el_action_btn_98.addEventListener('click', function(event) {
            closeHouseholdTreeViewModal()
        });
    }

    const el_action_btn_99 = document.getElementById('action-btn-99');
    if (el_action_btn_99) {
        el_action_btn_99.addEventListener('click', function(event) {
            if (window.closeDigitalQRModal) window.closeDigitalQRModal()
        });
    }

    const el_action_btn_100 = document.getElementById('action-btn-100');
    if (el_action_btn_100) {
        el_action_btn_100.addEventListener('click', function(event) {
            printMemberIDCard()
        });
    }

    const el_action_btn_101 = document.getElementById('action-btn-101');
    if (el_action_btn_101) {
        el_action_btn_101.addEventListener('click', function(event) {
            if (window.closeDigitalQRModal) window.closeDigitalQRModal()
        });
    }

    const el_action_btn_102 = document.getElementById('action-btn-102');
    if (el_action_btn_102) {
        el_action_btn_102.addEventListener('click', function(event) {
            closeAddMemberModal()
        });
    }

    const el_action_btn_103 = document.getElementById('action-btn-103');
    if (el_action_btn_103) {
        el_action_btn_103.addEventListener('click', function(event) {
            showToast('Photo upload ready! Using default avatar.', 'info')
        });
    }

    const el_action_btn_104 = document.getElementById('action-btn-104');
    if (el_action_btn_104) {
        el_action_btn_104.addEventListener('click', function(event) {
            closeAddMemberModal()
        });
    }

    const el_action_btn_105 = document.getElementById('action-btn-105');
    if (el_action_btn_105) {
        el_action_btn_105.addEventListener('click', function(event) {
            closeAddFundModal()
        });
    }

    const el_receipt_upload_box = document.getElementById('receipt-upload-box');
    if (el_receipt_upload_box) {
        el_receipt_upload_box.addEventListener('click', function(event) {
            triggerReceiptUpload()
        });
    }

    const el_action_btn_106 = document.getElementById('action-btn-106');
    if (el_action_btn_106) {
        el_action_btn_106.addEventListener('click', function(event) {
            removeReceiptImage(event)
        });
    }

    const el_action_btn_107 = document.getElementById('action-btn-107');
    if (el_action_btn_107) {
        el_action_btn_107.addEventListener('click', function(event) {
            closeAddFundModal()
        });
    }

    const el_user_profile_backdrop = document.getElementById('user-profile-backdrop');
    if (el_user_profile_backdrop) {
        el_user_profile_backdrop.addEventListener('click', function(event) {
            if(event.target === this) closeUserProfileModal()
        });
    }

    const el_action_btn_108 = document.getElementById('action-btn-108');
    if (el_action_btn_108) {
        el_action_btn_108.addEventListener('click', function(event) {
            closeUserProfileModal()
        });
    }

    const el_action_btn_109 = document.getElementById('action-btn-109');
    if (el_action_btn_109) {
        el_action_btn_109.addEventListener('click', function(event) {
            switchProfileModalView('passcode')
        });
    }

    const el_action_btn_110 = document.getElementById('action-btn-110');
    if (el_action_btn_110) {
        el_action_btn_110.addEventListener('click', function(event) {
            switchProfileModalView('recovery')
        });
    }

    const el_action_btn_111 = document.getElementById('action-btn-111');
    if (el_action_btn_111) {
        el_action_btn_111.addEventListener('click', function(event) {
            switchProfileModalView('rbac')
        });
    }

    const el_action_btn_112 = document.getElementById('action-btn-112');
    if (el_action_btn_112) {
        el_action_btn_112.addEventListener('click', function(event) {
            switchProfileModalView('audit')
        });
    }

    const el_action_btn_113 = document.getElementById('action-btn-113');
    if (el_action_btn_113) {
        el_action_btn_113.addEventListener('click', function(event) {
            switchProfileModalView('menu')
        });
    }

    const el_action_btn_114 = document.getElementById('action-btn-114');
    if (el_action_btn_114) {
        el_action_btn_114.addEventListener('click', function(event) {
            switchProfileModalView('menu')
        });
    }

    const el_action_btn_115 = document.getElementById('action-btn-115');
    if (el_action_btn_115) {
        el_action_btn_115.addEventListener('click', function(event) {
            saveNewPasscode()
        });
    }

    const el_action_btn_116 = document.getElementById('action-btn-116');
    if (el_action_btn_116) {
        el_action_btn_116.addEventListener('click', function(event) {
            switchProfileModalView('menu')
        });
    }

    const el_action_btn_117 = document.getElementById('action-btn-117');
    if (el_action_btn_117) {
        el_action_btn_117.addEventListener('click', function(event) {
            switchProfileModalView('menu')
        });
    }

    const el_action_btn_118 = document.getElementById('action-btn-118');
    if (el_action_btn_118) {
        el_action_btn_118.addEventListener('click', function(event) {
            saveRecoveryOptions()
        });
    }

    const el_action_btn_119 = document.getElementById('action-btn-119');
    if (el_action_btn_119) {
        el_action_btn_119.addEventListener('click', function(event) {
            switchProfileModalView('menu')
        });
    }

    const el_action_btn_120 = document.getElementById('action-btn-120');
    if (el_action_btn_120) {
        el_action_btn_120.addEventListener('click', function(event) {
            switchSimulatedRole('Super Admin')
        });
    }

    const el_action_btn_121 = document.getElementById('action-btn-121');
    if (el_action_btn_121) {
        el_action_btn_121.addEventListener('click', function(event) {
            switchSimulatedRole('Attendance Officer')
        });
    }

    const el_action_btn_122 = document.getElementById('action-btn-122');
    if (el_action_btn_122) {
        el_action_btn_122.addEventListener('click', function(event) {
            switchSimulatedRole('Finance Officer')
        });
    }

    const el_action_btn_123 = document.getElementById('action-btn-123');
    if (el_action_btn_123) {
        el_action_btn_123.addEventListener('click', function(event) {
            switchProfileModalView('menu')
        });
    }

    const el_action_btn_124 = document.getElementById('action-btn-124');
    if (el_action_btn_124) {
        el_action_btn_124.addEventListener('click', function(event) {
            if(state.auditLog){state.auditLog=[]; localStorage.removeItem('ps_audit_log'); renderAuditLog(); showToast('Audit log cleared', 'info');}
        });
    }

    const el_action_btn_125 = document.getElementById('action-btn-125');
    if (el_action_btn_125) {
        el_action_btn_125.addEventListener('click', function(event) {
            if (window.stopLiveQRScanner) window.stopLiveQRScanner()
        });
    }

    const el_action_btn_126 = document.getElementById('action-btn-126');
    if (el_action_btn_126) {
        el_action_btn_126.addEventListener('click', function(event) {
            if (window.startLiveQRScanner) window.startLiveQRScanner()
        });
    }

    const el_action_btn_127 = document.getElementById('action-btn-127');
    if (el_action_btn_127) {
        el_action_btn_127.addEventListener('click', function(event) {
            simulateQRCheckIn()
        });
    }

    const el_action_btn_128 = document.getElementById('action-btn-128');
    if (el_action_btn_128) {
        el_action_btn_128.addEventListener('click', function(event) {
            if (window.stopLiveQRScanner) window.stopLiveQRScanner()
        });
    }

    const el_action_btn_129 = document.getElementById('action-btn-129');
    if (el_action_btn_129) {
        el_action_btn_129.addEventListener('click', function(event) {
            closeReceiptViewerModal()
        });
    }

    const el_action_btn_130 = document.getElementById('action-btn-130');
    if (el_action_btn_130) {
        el_action_btn_130.addEventListener('click', function(event) {
            closeReceiptViewerModal()
        });
    }

    const el_action_btn_131 = document.getElementById('action-btn-131');
    if (el_action_btn_131) {
        el_action_btn_131.addEventListener('click', function(event) {
            if (window.closeDigitalQRModal) window.closeDigitalQRModal()
        });
    }

    const el_action_btn_132 = document.getElementById('action-btn-132');
    if (el_action_btn_132) {
        el_action_btn_132.addEventListener('click', function(event) {
            printMemberQRCard()
        });
    }

    const el_action_btn_133 = document.getElementById('action-btn-133');
    if (el_action_btn_133) {
        el_action_btn_133.addEventListener('click', function(event) {
            if (window.closeDigitalQRModal) window.closeDigitalQRModal()
        });
    }

    const el_action_btn_134 = document.getElementById('action-btn-134');
    if (el_action_btn_134) {
        el_action_btn_134.addEventListener('click', function(event) {
            closeMemberProfileModal()
        });
    }

    const el_action_btn_135 = document.getElementById('action-btn-135');
    if (el_action_btn_135) {
        el_action_btn_135.addEventListener('click', function(event) {
            closePublishModal()
        });
    }

    const el_action_btn_136 = document.getElementById('action-btn-136');
    if (el_action_btn_136) {
        el_action_btn_136.addEventListener('click', function(event) {
            closePublishModal()
        });
    }

    const el_action_btn_137 = document.getElementById('action-btn-137');
    if (el_action_btn_137) {
        el_action_btn_137.addEventListener('click', function(event) {
            closeFirebaseConfigModal()
        });
    }

    const el_action_btn_138 = document.getElementById('action-btn-138');
    if (el_action_btn_138) {
        el_action_btn_138.addEventListener('click', function(event) {
            triggerFirebaseForceSync()
        });
    }

    const el_action_btn_139 = document.getElementById('action-btn-139');
    if (el_action_btn_139) {
        el_action_btn_139.addEventListener('click', function(event) {
            triggerFirebasePull()
        });
    }

    const el_action_btn_140 = document.getElementById('action-btn-140');
    if (el_action_btn_140) {
        el_action_btn_140.addEventListener('click', function(event) {
            closeFirebaseConfigModal()
        });
    }

    const el_action_btn_141 = document.getElementById('action-btn-141');
    if (el_action_btn_141) {
        el_action_btn_141.addEventListener('click', function(event) {
            saveFirebaseConfigSettings()
        });
    }

    const el_action_btn_142 = document.getElementById('action-btn-142');
    if (el_action_btn_142) {
        el_action_btn_142.addEventListener('click', function(event) {
            closePastoralFollowUpModal()
        });
    }

    const el_action_btn_143 = document.getElementById('action-btn-143');
    if (el_action_btn_143) {
        el_action_btn_143.addEventListener('click', function(event) {
            copyPastoralReportText()
        });
    }

    const el_action_btn_144 = document.getElementById('action-btn-144');
    if (el_action_btn_144) {
        el_action_btn_144.addEventListener('click', function(event) {
            sharePastoralReportWhatsApp()
        });
    }

    const el_action_btn_145 = document.getElementById('action-btn-145');
    if (el_action_btn_145) {
        el_action_btn_145.addEventListener('click', function(event) {
            copyAbsenteesOnlyList()
        });
    }

    const el_action_btn_146 = document.getElementById('action-btn-146');
    if (el_action_btn_146) {
        el_action_btn_146.addEventListener('click', function(event) {
            closePastoralFollowUpModal()
        });
    }

    const el_action_btn_147 = document.getElementById('action-btn-147');
    if (el_action_btn_147) {
        el_action_btn_147.addEventListener('click', function(event) {
            closeCertificateModal()
        });
    }

    const el_action_btn_148 = document.getElementById('action-btn-148');
    if (el_action_btn_148) {
        el_action_btn_148.addEventListener('click', function(event) {
            closeCertificateModal()
        });
    }

    const el_action_btn_149 = document.getElementById('action-btn-149');
    if (el_action_btn_149) {
        el_action_btn_149.addEventListener('click', function(event) {
            printOfficialCertificate()
        });
    }

    const el_action_btn_150 = document.getElementById('action-btn-150');
    if (el_action_btn_150) {
        el_action_btn_150.addEventListener('click', function(event) {
            closeAttendanceMatrixModal()
        });
    }

    const el_action_btn_151 = document.getElementById('action-btn-151');
    if (el_action_btn_151) {
        el_action_btn_151.addEventListener('click', function(event) {
            closeAttendanceMatrixModal()
        });
    }

    const el_action_btn_152 = document.getElementById('action-btn-152');
    if (el_action_btn_152) {
        el_action_btn_152.addEventListener('click', function(event) {
            exportAttendanceMatrixCSV()
        });
    }

    const el_action_btn_153 = document.getElementById('action-btn-153');
    if (el_action_btn_153) {
        el_action_btn_153.addEventListener('click', function(event) {
            window.print()
        });
    }

    const el_action_btn_154 = document.getElementById('action-btn-154');
    if (el_action_btn_154) {
        el_action_btn_154.addEventListener('click', function(event) {
            closeBirthdayCardModal()
        });
    }

    const el_action_btn_155 = document.getElementById('action-btn-155');
    if (el_action_btn_155) {
        el_action_btn_155.addEventListener('click', function(event) {
            closeBirthdayCardModal()
        });
    }

    const el_action_btn_156 = document.getElementById('action-btn-156');
    if (el_action_btn_156) {
        el_action_btn_156.addEventListener('click', function(event) {
            copyBirthdayCardMessage()
        });
    }

    const el_action_btn_157 = document.getElementById('action-btn-157');
    if (el_action_btn_157) {
        el_action_btn_157.addEventListener('click', function(event) {
            closeAbsenteeSwiperModal()
        });
    }

    const el_swiper_prev_btn = document.getElementById('swiper-prev-btn');
    if (el_swiper_prev_btn) {
        el_swiper_prev_btn.addEventListener('click', function(event) {
            prevAbsenteeSlide()
        });
    }

    const el_action_btn_158 = document.getElementById('action-btn-158');
    if (el_action_btn_158) {
        el_action_btn_158.addEventListener('click', function(event) {
            closeAbsenteeSwiperModal()
        });
    }

    const el_swiper_next_btn = document.getElementById('swiper-next-btn');
    if (el_swiper_next_btn) {
        el_swiper_next_btn.addEventListener('click', function(event) {
            nextAbsenteeSlide()
        });
    }

    const el_action_btn_159 = document.getElementById('action-btn-159');
    if (el_action_btn_159) {
        el_action_btn_159.addEventListener('click', function(event) {
            closeCommandPalette()
        });
    }

    const el_action_btn_160 = document.getElementById('action-btn-160');
    if (el_action_btn_160) {
        el_action_btn_160.addEventListener('click', function(event) {
            closeKeyboardCheatsheetModal()
        });
    }

    const el_action_btn_161 = document.getElementById('action-btn-161');
    if (el_action_btn_161) {
        el_action_btn_161.addEventListener('click', function(event) {
            closeKeyboardCheatsheetModal(); openCommandPalette();
        });
    }

    const el_action_btn_162 = document.getElementById('action-btn-162');
    if (el_action_btn_162) {
        el_action_btn_162.addEventListener('click', function(event) {
            closeKeyboardCheatsheetModal(); if (window.startLiveQRScanner) window.startLiveQRScanner();
        });
    }

    const el_action_btn_163 = document.getElementById('action-btn-163');
    if (el_action_btn_163) {
        el_action_btn_163.addEventListener('click', function(event) {
            closeKeyboardCheatsheetModal(); openAddMemberModal();
        });
    }

    const el_action_btn_164 = document.getElementById('action-btn-164');
    if (el_action_btn_164) {
        el_action_btn_164.addEventListener('click', function(event) {
            closeKeyboardCheatsheetModal()
        });
    }

    const el_btn_send_whatsapp_greeting = document.getElementById('btn-send-whatsapp-greeting');
    if (el_btn_send_whatsapp_greeting) {
        el_btn_send_whatsapp_greeting.addEventListener('click', function(event) {
            sendPastoralGreetingVia('whatsapp')
        });
    }

    const el_btn_send_gmail_greeting = document.getElementById('btn-send-gmail-greeting');
    if (el_btn_send_gmail_greeting) {
        el_btn_send_gmail_greeting.addEventListener('click', function(event) {
            sendPastoralGreetingVia('gmail')
        });
    }

    const el_action_btn_165 = document.getElementById('action-btn-165');
    if (el_action_btn_165) {
        el_action_btn_165.addEventListener('click', function(event) {
            closePastoralGreetingModal()
        });
    }

    const el_action_btn_166 = document.getElementById('action-btn-166');
    if (el_action_btn_166) {
        el_action_btn_166.addEventListener('click', function(event) {
            switchView('dashboard')
        });
    }

    const el_action_btn_167 = document.getElementById('action-btn-167');
    if (el_action_btn_167) {
        el_action_btn_167.addEventListener('click', function(event) {
            switchView('attendance')
        });
    }

    const el_action_btn_168 = document.getElementById('action-btn-168');
    if (el_action_btn_168) {
        el_action_btn_168.addEventListener('click', function(event) {
            switchView('members')
        });
    }

    const el_action_btn_169 = document.getElementById('action-btn-169');
    if (el_action_btn_169) {
        el_action_btn_169.addEventListener('click', function(event) {
            switchView('funds')
        });
    }

    const el_action_btn_170 = document.getElementById('action-btn-170');
    if (el_action_btn_170) {
        el_action_btn_170.addEventListener('click', function(event) {
            toggleMobileSidebar()
        });
    }

    const el_action_btn_171 = document.getElementById('action-btn-171');
    if (el_action_btn_171) {
        el_action_btn_171.addEventListener('click', function(event) {
            openAddMemberModal()
        });
    }

    const el_action_btn_172 = document.getElementById('action-btn-172');
    if (el_action_btn_172) {
        el_action_btn_172.addEventListener('click', function(event) {
            switchView('dashboard')
        });
    }

    const el_action_btn_173 = document.getElementById('action-btn-173');
    if (el_action_btn_173) {
        el_action_btn_173.addEventListener('click', function(event) {
            switchView('members')
        });
    }

    const el_action_btn_174 = document.getElementById('action-btn-174');
    if (el_action_btn_174) {
        el_action_btn_174.addEventListener('click', function(event) {
            switchView('activities')
        });
    }

    const el_action_btn_175 = document.getElementById('action-btn-175');
    if (el_action_btn_175) {
        el_action_btn_175.addEventListener('click', function(event) {
            switchView('funds')
        });
    }

    const el_action_btn_176 = document.getElementById('action-btn-176');
    if (el_action_btn_176) {
        el_action_btn_176.addEventListener('click', function(event) {
            closeUploadResourceModal()
        });
    }

    const el_action_btn_177 = document.getElementById('action-btn-177');
    if (el_action_btn_177) {
        el_action_btn_177.addEventListener('click', function(event) {
            closeUploadResourceModal()
        });
    }

    const el_action_btn_178 = document.getElementById('action-btn-178');
    if (el_action_btn_178) {
        el_action_btn_178.addEventListener('click', function(event) {
            closeLetterGeneratorModal()
        });
    }

    const el_action_btn_179 = document.getElementById('action-btn-179');
    if (el_action_btn_179) {
        el_action_btn_179.addEventListener('click', function(event) {
            closeLetterGeneratorModal()
        });
    }

    const el_action_btn_180 = document.getElementById('action-btn-180');
    if (el_action_btn_180) {
        el_action_btn_180.addEventListener('click', function(event) {
            downloadLetterPDF()
        });
    }

    const el_action_btn_181 = document.getElementById('action-btn-181');
    if (el_action_btn_181) {
        el_action_btn_181.addEventListener('click', function(event) {
            printGeneratedLetter()
        });
    }

    const el_action_btn_182 = document.getElementById('action-btn-182');
    if (el_action_btn_182) {
        el_action_btn_182.addEventListener('click', function(event) {
            closeSongbookTransposerModal()
        });
    }

    const el_action_btn_183 = document.getElementById('action-btn-183');
    if (el_action_btn_183) {
        el_action_btn_183.addEventListener('click', function(event) {
            transposeSongKey(-1)
        });
    }

    const el_action_btn_184 = document.getElementById('action-btn-184');
    if (el_action_btn_184) {
        el_action_btn_184.addEventListener('click', function(event) {
            transposeSongKey(1)
        });
    }

    const el_action_btn_185 = document.getElementById('action-btn-185');
    if (el_action_btn_185) {
        el_action_btn_185.addEventListener('click', function(event) {
            resetSongKey()
        });
    }

    const el_action_btn_186 = document.getElementById('action-btn-186');
    if (el_action_btn_186) {
        el_action_btn_186.addEventListener('click', function(event) {
            closeSongbookTransposerModal()
        });
    }

    const el_action_btn_187 = document.getElementById('action-btn-187');
    if (el_action_btn_187) {
        el_action_btn_187.addEventListener('click', function(event) {
            closeInteractiveRosaryModal()
        });
    }

    const el_ros_tab_joyful = document.getElementById('ros-tab-joyful');
    if (el_ros_tab_joyful) {
        el_ros_tab_joyful.addEventListener('click', function(event) {
            selectRosaryMystery('joyful')
        });
    }

    const el_ros_tab_luminous = document.getElementById('ros-tab-luminous');
    if (el_ros_tab_luminous) {
        el_ros_tab_luminous.addEventListener('click', function(event) {
            selectRosaryMystery('luminous')
        });
    }

    const el_ros_tab_sorrowful = document.getElementById('ros-tab-sorrowful');
    if (el_ros_tab_sorrowful) {
        el_ros_tab_sorrowful.addEventListener('click', function(event) {
            selectRosaryMystery('sorrowful')
        });
    }

    const el_ros_tab_glorious = document.getElementById('ros-tab-glorious');
    if (el_ros_tab_glorious) {
        el_ros_tab_glorious.addEventListener('click', function(event) {
            selectRosaryMystery('glorious')
        });
    }

    const el_action_btn_188 = document.getElementById('action-btn-188');
    if (el_action_btn_188) {
        el_action_btn_188.addEventListener('click', function(event) {
            prevRosaryBead()
        });
    }

    const el_action_btn_189 = document.getElementById('action-btn-189');
    if (el_action_btn_189) {
        el_action_btn_189.addEventListener('click', function(event) {
            nextRosaryBead()
        });
    }

    const el_action_btn_190 = document.getElementById('action-btn-190');
    if (el_action_btn_190) {
        el_action_btn_190.addEventListener('click', function(event) {
            closeMemberIDCardModal()
        });
    }

    const el_action_btn_191 = document.getElementById('action-btn-191');
    if (el_action_btn_191) {
        el_action_btn_191.addEventListener('click', function(event) {
            closeMemberIDCardModal()
        });
    }

    const el_action_btn_192 = document.getElementById('action-btn-192');
    if (el_action_btn_192) {
        el_action_btn_192.addEventListener('click', function(event) {
            printMemberIDCard()
        });
    }

    const el_action_btn_193 = document.getElementById('action-btn-193');
    if (el_action_btn_193) {
        el_action_btn_193.addEventListener('click', function(event) {
            if (window.stopLiveQRScanner) window.stopLiveQRScanner()
        });
    }

    const el_action_btn_194 = document.getElementById('action-btn-194');
    if (el_action_btn_194) {
        el_action_btn_194.addEventListener('click', function(event) {
            if (window.stopLiveQRScanner) window.stopLiveQRScanner()
        });
    }

    const el_action_btn_195 = document.getElementById('action-btn-195');
    if (el_action_btn_195) {
        el_action_btn_195.addEventListener('click', function(event) {
            closePostAnnouncementModal()
        });
    }

    const el_action_btn_196 = document.getElementById('action-btn-196');
    if (el_action_btn_196) {
        el_action_btn_196.addEventListener('click', function(event) {
            closePostAnnouncementModal()
        });
    }

    const el_action_btn_197 = document.getElementById('action-btn-197');
    if (el_action_btn_197) {
        el_action_btn_197.addEventListener('click', function(event) {
            closeSubmitPrayerModal()
        });
    }

    const el_action_btn_198 = document.getElementById('action-btn-198');
    if (el_action_btn_198) {
        el_action_btn_198.addEventListener('click', function(event) {
            closeSubmitPrayerModal()
        });
    }

    const el_ai_chat_trigger_btn = document.getElementById('ai-chat-trigger-btn');
    if (el_ai_chat_trigger_btn) {
        el_ai_chat_trigger_btn.addEventListener('click', function(event) {
            toggleAIPastoralChat()
        });
    }

    const el_action_btn_199 = document.getElementById('action-btn-199');
    if (el_action_btn_199) {
        el_action_btn_199.addEventListener('click', function(event) {
            toggleAIPastoralChat()
        });
    }

    const el_audio_play_btn = document.getElementById('audio-play-btn');
    if (el_audio_play_btn) {
        el_audio_play_btn.addEventListener('click', function(event) {
            toggleAudioPlay()
        });
    }

    const el_action_btn_200 = document.getElementById('action-btn-200');
    if (el_action_btn_200) {
        el_action_btn_200.addEventListener('click', function(event) {
            closeCertificateModal()
        });
    }

    const el_action_btn_201 = document.getElementById('action-btn-201');
    if (el_action_btn_201) {
        el_action_btn_201.addEventListener('click', function(event) {
            closeCertificateModal()
        });
    }

    const el_action_btn_202 = document.getElementById('action-btn-202');
    if (el_action_btn_202) {
        el_action_btn_202.addEventListener('click', function(event) {
            downloadCertificatePDF()
        });
    }

    const el_action_btn_203 = document.getElementById('action-btn-203');
    if (el_action_btn_203) {
        el_action_btn_203.addEventListener('click', function(event) {
            closeVenueMapModal()
        });
    }

    const el_action_btn_204 = document.getElementById('action-btn-204');
    if (el_action_btn_204) {
        el_action_btn_204.addEventListener('click', function(event) {
            closeVenueMapModal()
        });
    }

    const el_whats_new_modal_backdrop = document.getElementById('whats-new-modal-backdrop');
    if (el_whats_new_modal_backdrop) {
        el_whats_new_modal_backdrop.addEventListener('click', function(event) {
            if(event.target===this) closeWhatsNewModal()
        });
    }

    const el_action_btn_205 = document.getElementById('action-btn-205');
    if (el_action_btn_205) {
        el_action_btn_205.addEventListener('click', function(event) {
            closeWhatsNewModal()
        });
    }

}
