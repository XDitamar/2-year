import React from 'react';
import './HomeScreen.css';
import Navbar from './Navbar';
import Hero from './Hero';
import Row from './Row';
import { CONTENT_ROWS } from './config/media';

const HomeScreen = ({ onPlayVideo, onSwitchProfile, selectedProfile }) => {
  const handleGoHome = () => {
    // Already on home screen, just scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-screen">
      <Navbar 
        onGoHome={handleGoHome}
        onSwitchProfile={onSwitchProfile} 
        selectedProfile={selectedProfile} 
      />
      <Hero onPlayVideo={onPlayVideo} />
      <div className="content-rows">
        {Object.entries(CONTENT_ROWS).map(([title, items]) => (
          <Row 
            key={title}
            title={title}
            items={items}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;