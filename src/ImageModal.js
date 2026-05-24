import React from 'react';
import './ImageModal.css';

const ImageModal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-modal-backdrop" onClick={handleBackdropClick}>
      <div className="image-modal-content">
        <button className="image-modal-close" onClick={onClose}>
          ×
        </button>
        <img src={imageSrc} alt="Anniversary moment" className="image-modal-img" />
      </div>
    </div>
  );
};

export default ImageModal;