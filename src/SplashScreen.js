import React, { useRef, useEffect, useState } from 'react';
import './SplashScreen.css';
import { INTRO_VIDEO } from './config/media';

const SplashScreen = ({ onComplete }) => {
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
             window.innerWidth <= 768;
    };
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    
    const handleVideoEnd = () => {
      onComplete();
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      
      // Try autoplay first
      const attemptAutoplay = async () => {
        try {
          video.muted = true;
          video.playsInline = true;
          await video.play();
          setVideoStarted(true);
        } catch (error) {
          console.log('Autoplay prevented - waiting for user interaction');
        }
      };

      // When video is ready, try to play
      if (video.readyState >= 3) {
        attemptAutoplay();
      } else {
        video.addEventListener('canplay', attemptAutoplay, { once: true });
      }
      
      // Fallback timer - if video doesn't start, continue anyway
      const fallbackTimer = setTimeout(() => {
        onComplete();
      }, 5000);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onComplete]);

  const handleScreenTouch = () => {
    const video = videoRef.current;
    if (video && !videoStarted) {
      video.play().then(() => {
        setVideoStarted(true);
      }).catch(console.error);
    }
  };

  return (
    <div className="splash-screen" onClick={handleScreenTouch} onTouchStart={handleScreenTouch}>
      <video
        ref={videoRef}
        className="splash-video"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src={INTRO_VIDEO} type="video/mp4" />
      </video>
      {!videoStarted && (
        <div className="tap-to-start">
          <div className="tap-message">Tap anywhere to start</div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;