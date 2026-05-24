import React from 'react';
import './InfoModal.css';

const InfoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="info-modal-backdrop" onClick={handleBackdropClick}>
      <div className="info-modal-content">
        <button className="info-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="info-modal-body">
          <h1 className="info-modal-title">סיפור האהבה שלנו</h1>
          <div className="love-story-content">
            <p>תודה על שנתיים מופלאות</p>
            <p>כל יום איתך הוא חוויה מיוחדת</p>
            <p>אני שמח כל כך שנכנסת לחיים שלי ואני רק מחכה לראות מה מחכה לנו בעתיד</p>
            <p>אוהב אותך כל כך לולי</p>
            <div className="info-heart">❤️</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;