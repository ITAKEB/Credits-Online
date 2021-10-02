import React from 'react'


export default function Popup({open, children, onClose}){
    return (open) ? (
        <div className="popup">
            <div className="popup-inner">
                <button onClick={onClose} className="closeBtn"> X </button>
                {children}
            </div>
        </div>
    ) : ""
    
}