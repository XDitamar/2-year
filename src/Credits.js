import React, { useEffect } from 'react';
import './Credits.css';

const Credits = ({ onBackToHome }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onBackToHome();
    }, 20000); // Credits run for 20 seconds

    return () => clearTimeout(timer);
  }, [onBackToHome]);

  return (
    <div className="credits">
      <div className="credits-controls">
        <button className="back-to-home-button" onClick={onBackToHome}>
          ← Back to Home
        </button>
      </div>
      <div className="credits-content">
        <div className="credits-text">
          <h1 className="credits-title">Life of Alina & Itamar</h1>
          
          <div className="credits-section">
            <h2>בימוי</h2>
            <p>גורל</p>
          </div>

          <div className="credits-section">
            <h2>תסריט</h2>
            <p>אהבה</p>
          </div>

          <div className="credits-section">
            <h2>שחקנים</h2>
            <p>אלינה ואיתמר</p>
          </div>

          <div className="credits-section">
            <h2>פסקול</h2>
            <p>השירים שלנו</p>
          </div>

          <div className="credits-section">
            <h2>הפקה</h2>
            <p>שנתיים של אהבה</p>
          </div>

          <div className="credits-section">
            <h2>צילום</h2>
            <p>רגעים יפים</p>
          </div>

          <div className="credits-section">
            <h2>עריכה</h2>
            <p>זיכרונות מתוקים</p>
          </div>

          <div className="credits-final">
            <h1>תודה על שנתיים מופלאות</h1>
            <p>כל יום איתך הוא חוויה מיוחדת</p>
            <p>אני שמח כל כך שנכנסת לחיים שלי ואני רק מחכה לראות מה מחכה לנו בעתיד</p>
            <p>אוהב אותך כל כך לולי</p>
            <div className="heart">❤️</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;