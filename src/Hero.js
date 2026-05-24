import React, { useState } from 'react';
import './Hero.css';
import { HERO_BG, HERO_TITLE } from './config/media';
import InfoModal from './InfoModal';

const Hero = ({ onPlayVideo }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleInfoClick = () => {
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  return (
    <div className="hero" style={{ backgroundImage: `url(${HERO_BG})` }}>
      <div className="hero-content">
        <h1 className="hero-title">{HERO_TITLE}</h1>
        <p className="hero-description">
          A beautiful journey of love, laughter, and unforgettable moments together.
          Two years of creating memories that will last a lifetime.
        </p>
        <div className="hero-buttons">
          <button className="play-button" onClick={onPlayVideo}>
            <span className="play-icon">▶</span>
            Play
          </button>
          <button className="info-button" onClick={handleInfoClick}>
            <span className="info-icon">ℹ</span>
            More Info
          </button>
        </div>
      </div>
      <div className="hero-fade-bottom"></div>
      <InfoModal 
        isOpen={isInfoModalOpen} 
        onClose={handleCloseInfoModal} 
      />
    </div>
  );
};

export default Hero;