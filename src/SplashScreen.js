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
        // Try multiple approaches to start video
        const attemptPlay = async () => {
          try {
            await video.play();
            setVideoStarted(true);
          } catch (error) {
            // If autoplay fails, try again after a short delay
            setTimeout(async () => {
              try {
                await video.play();
                setVideoStarted(true);
              } catch (e) {
                // Last resort - simulate user interaction
                document.addEventListener('touchstart', handleAutoStart, { once: true });
                document.addEventListener('click', handleAutoStart, { once: true });
              }
            }, 100);
          }
        };
        attemptPlay();
      }
    };

    const handleAutoStart = async () => {
      const video = videoRef.current;
      if (video && !videoStarted) {
        try {
          await video.play();
          setVideoStarted(true);
        } catch (error) {
          console.log('Could not start video:', error);
        }
      }
    };

    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      video.addEventListener('canplay', handleCanPlay);
      
      // Try to start immediately when component mounts
      setTimeout(() => {
        if (video && !videoStarted) {
          video.play().then(() => {
            setVideoStarted(true);
          }).catch(() => {
            // Add invisible interaction trigger
            const triggerPlay = () => {
              video.play().then(() => {
                setVideoStarted(true);
              }).catch(console.error);
            };
            
            // Try on any user interaction
            document.addEventListener('touchstart', triggerPlay, { once: true });
            document.addEventListener('click', triggerPlay, { once: true });
            document.addEventListener('keydown', triggerPlay, { once: true });
          });
        }
      }, 500);
      
      // Fallback timer
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