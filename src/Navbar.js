import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({ onGoHome, onSwitchProfile, selectedProfile }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="netflix-logo-nav" onClick={onGoHome}>NETFLIX</div>
          <ul className="navbar-menu">
            <li onClick={onGoHome}>Home</li>
            <li onClick={onSwitchProfile}>Switch Profile</li>
          </ul>
        </div>
        <div className="navbar-right">
          <div className="navbar-profile" onClick={onSwitchProfile}>
            <div className="profile-icon">
              {selectedProfile ? selectedProfile.charAt(0) : 'A'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;