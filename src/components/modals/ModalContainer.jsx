import React, { useState, useEffect } from 'react';
import MemberProfileModal from './MemberProfileModal';
import MemberQRIDModal from './MemberQRIDModal';
import MemberIDCardModal from './MemberIDCardModal';
import AdminProfileModal from './AdminProfileModal';
import CreateAccountModal from './CreateAccountModal';
import BulkImportModal from './BulkImportModal';
import HouseholdTreeModal from './HouseholdTreeModal';
import DownloadAllModal from './DownloadAllModal';
import HHFolderModal from './HHFolderModal';
import CSTFolderModal from './CSTFolderModal';
import FundsModal from './FundsModal';
import ReceiptViewerModal from './ReceiptViewerModal';
import ActivityModal from './ActivityModal';
import ScannerModal from './ScannerModal';
import FollowUpModal from './FollowUpModal';
import AttendanceGridModal from './AttendanceGridModal';
import CommandPaletteModal from './CommandPaletteModal';
import KeyboardCheatsheetModal from './KeyboardCheatsheetModal';
import WhatsNewModal from './WhatsNewModal';

const ModalContainer = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [modalProps, setModalProps] = useState({});

    useEffect(() => {
        const handleOpenModal = (e) => {
            setActiveModal(e.detail.modalName);
            setModalProps(e.detail.props || {});
        };

        const handleCloseModal = () => {
            setActiveModal(null);
            setModalProps({});
        };

        window.addEventListener('open-react-modal', handleOpenModal);
        window.addEventListener('close-react-modal', handleCloseModal);

        return () => {
            window.removeEventListener('open-react-modal', handleOpenModal);
            window.removeEventListener('close-react-modal', handleCloseModal);
        };
    }, []);

    const handleClose = () => {
        setActiveModal(null);
        setModalProps({});
    };

    return (
        <>
            <MemberProfileModal 
                isOpen={activeModal === 'member-profile'} 
                onClose={handleClose} 
                memberId={modalProps.memberId} 
            />
            <MemberQRIDModal 
                isOpen={activeModal === 'member-qr'} 
                onClose={handleClose} 
                memberId={modalProps.memberId} 
            />
            <MemberIDCardModal 
                isOpen={activeModal === 'member-id-card'} 
                onClose={handleClose} 
                memberId={modalProps.memberId} 
            />
            <AdminProfileModal 
                isOpen={activeModal === 'admin-profile'} 
                onClose={handleClose} 
            />
            <CreateAccountModal 
                isOpen={activeModal === 'create-account'} 
                onClose={handleClose} 
            />
            <BulkImportModal 
                isOpen={activeModal === 'bulk-import'} 
                onClose={handleClose} 
            />
            <HouseholdTreeModal 
                isOpen={activeModal === 'household-tree'} 
                onClose={handleClose} 
            />
            <DownloadAllModal 
                isOpen={activeModal === 'download-all'} 
                onClose={handleClose} 
            />
            <HHFolderModal 
                isOpen={activeModal === 'hh-folder'} 
                onClose={handleClose} 
            />
            <CSTFolderModal 
                isOpen={activeModal === 'cst-folder'} 
                onClose={handleClose} 
            />
            <FundsModal 
                isOpen={activeModal === 'funds'} 
                onClose={handleClose} 
            />
            <ReceiptViewerModal 
                isOpen={activeModal === 'receipt-viewer'} 
                onClose={handleClose} 
            />
            <ActivityModal 
                isOpen={activeModal === 'activity'} 
                onClose={handleClose} 
                activityId={modalProps.activityId} 
            />
            <ScannerModal 
                isOpen={activeModal === 'scanner'} 
                onClose={handleClose} 
            />
            <FollowUpModal 
                isOpen={activeModal === 'follow-up'} 
                onClose={handleClose} 
            />
            <AttendanceGridModal 
                isOpen={activeModal === 'attendance-matrix'} 
                onClose={handleClose} 
            />
        </>
    );
};

export default ModalContainer;

