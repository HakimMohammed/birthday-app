import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-md p-4"
            onClick={onClose} // Allows clicking outside to close
        >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};