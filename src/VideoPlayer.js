import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';
import { VIDEO_URL } from './config/media';

const VideoPlayer = ({ onVideoEnd, onBack }) => {
  const videoRef = useRef(null);
  const [isEnding, setIsEnding] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime);
      };

      const handleLoadedMetadata = () => {
        setDuration(video.duration);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, []);

  useEffect(() => {
    // Start fade effect 3 seconds before video ends
    if (duration > 0 && currentTime > duration - 3) {
      setIsEnding(true);
    }
  }, [currentTime, duration]);

  const handleVideoEnd = () => {
    // Add a small delay to let the fade complete
    setTimeout(() => {
      onVideoEnd();
    }, 1000);
  };

  return (
    <div className={`video-player ${isEnding ? 'ending' : ''}`}>
      <div className="video-controls">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
      </div>
      <video
        ref={videoRef}
        className="video-element"
        src={VIDEO_URL}
        controls
        autoPlay
        onEnded={handleVideoEnd}
      >
        Your browser does not support the video tag.
      </video>
      {isEnding && <div className="fade-overlay"></div>}
    </div>
  );
};

export default VideoPlayer;