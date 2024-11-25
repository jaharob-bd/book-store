import React from 'react'

export const SidebarOverlay = ({isOpen, handleOverlayClick}) => {
    return (
        <div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay ${isOpen ? '' : 'hidden'}`} onClick={handleOverlayClick} />
        </div>
    )
}
