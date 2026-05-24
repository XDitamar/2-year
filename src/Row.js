import React, { useRef, useState } from 'react';
import './Row.css';
import ImageModal from './ImageModal';

const Row = ({ title, items }) => {
  const rowRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const scroll = (direction) => {
    const { current } = rowRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button 
          className="row-nav-btn row-nav-left" 
          onClick={() => scroll('left')}
        >
          ‹
        </button>
        <div className="row-items" ref={rowRef}>
          {items.map((item, index) => (
            <div key={index} className="row-item" onClick={() => handleImageClick(item)}>
              <img src={item} alt={`${title} ${index + 1}`} />
            </div>
          ))}
        </div>
        <button 
          className="row-nav-btn row-nav-right" 
          onClick={() => scroll('right')}
        >
          ›
        </button>
      </div>
      <ImageModal 
        isOpen={modalOpen}
        imageSrc={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default Row;