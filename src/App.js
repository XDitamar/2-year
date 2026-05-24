import React, { useState, useEffect } from 'react';
import './App.css';
import SplashScreen from './SplashScreen';
import ProfileSelection from './ProfileSelection';
import HomeScreen from './HomeScreen';
import VideoPlayer from './VideoPlayer';
import Credits from './Credits';

function App() {
  // Detect if user is on mobile device
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  };

  const [currentScreen, setCurrentScreen] = useState(isMobile() ? 'profiles' : 'splash');
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    // If on mobile, skip splash screen entirely
    if (isMobile() && currentScreen === 'splash') {
      setCurrentScreen('profiles');
    }
  }, [currentScreen]);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setCurrentScreen('home');
  };

  const handleSwitchProfile = () => {
    setCurrentScreen('profiles');
  };

  const handleGoHome = () => {
    setCurrentScreen('home');
  };

  const handleBackFromPlayer = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={() => setCurrentScreen('profiles')} />;
      case 'profiles':
        return <ProfileSelection onProfileSelect={handleProfileSelect} />;
      case 'home':
        return (
          <HomeScreen 
            onPlayVideo={() => setCurrentScreen('player')}
            onSwitchProfile={handleSwitchProfile}
            selectedProfile={selectedProfile}
          />
        );
      case 'player':
        return (
          <VideoPlayer 
            onVideoEnd={() => setCurrentScreen('credits')}
            onBack={handleBackFromPlayer}
          />
        );
      case 'credits':
        return <Credits onBackToHome={handleGoHome} />;
      default:
        return <SplashScreen onComplete={() => setCurrentScreen('profiles')} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;