import React from 'react';
import './ProfileSelection.css';
import { PROFILE_PICS } from './config/media';

const ProfileSelection = ({ onProfileSelect }) => {
  const handleProfileClick = (profileName) => {
    onProfileSelect(profileName);
  };

  return (
    <div className="profile-selection">
      <div className="profile-container">
        <h1 className="profile-title">Welcome!</h1>
        <div className="profiles">
          {Object.entries(PROFILE_PICS).map(([profileName, imagePath]) => (
            <div 
              key={profileName}
              className="profile"
              onClick={() => handleProfileClick(profileName)}
            >
              <div className="profile-avatar">
                <img src={imagePath} alt={profileName} />
              </div>
              <span className="profile-name">{profileName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;