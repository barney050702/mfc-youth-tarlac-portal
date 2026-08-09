import React, { useState, useEffect } from 'react';
import MemberProfileModal from './MemberProfileModal';
import MemberQRIDModal from './MemberQRIDModal';
import MemberIDCardModal from './MemberIDCardModal';
import AdminProfileModal from './AdminProfileModal';

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
        </>
    );
};

export default ModalContainer;
