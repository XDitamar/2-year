import React, { useRef, useEffect } from 'react';
import './SplashScreen.css';
import { INTRO_VIDEO } from './config/media';

const SplashScreen = ({ onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    
    const handleVideoEnd = () => {
      onComplete();
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      // Fallback timer in case video doesn't load
      const fallbackTimer = setTimeout(() => {
        onComplete();
      }, 5000);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <video
        ref={videoRef}
        className="splash-video"
        autoPlay
        muted
        playsInline
      >
        <source src={INTRO_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
};

export default SplashScreen;