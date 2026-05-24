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

    const handleCanPlay = () => {
      if (video && !videoStarted) {
        // Try to play automatically
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setVideoStarted(true);
          }).catch(() => {
            // Autoplay failed, but that's ok - we'll handle it with user interaction
            console.log('Autoplay prevented, waiting for user interaction');
          });
        }
      }
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('canplay', handleCanPlay);
      
      // Fallback timer in case video doesn't load
      const fallbackTimer = setTimeout(() => {
        onComplete();
      }, 8000);

      return () => {
        video.removeEventListener('ended', handleVideoEnd);
        video.removeEventListener('canplay', handleCanPlay);
        clearTimeout(fallbackTimer);
      };
    }
  }, [onComplete, videoStarted]);

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
    </div>
  );
};

export default SplashScreen;