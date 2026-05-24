import React, { useState } from 'react';
import './App.css';
import SplashScreen from './SplashScreen';
import ProfileSelection from './ProfileSelection';
import HomeScreen from './HomeScreen';
import VideoPlayer from './VideoPlayer';
import Credits from './Credits';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedProfile, setSelectedProfile] = useState(null);

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