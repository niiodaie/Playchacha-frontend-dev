import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Globe, 
  Zap, 
  Play, 
  Eye,
  Football,
  Dribbble,
  Zap as Lightning
} from 'lucide-react';

const HomePage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [liveEvents, setLiveEvents] = useState([
    {
      id: 1,
      league: 'NHL',
      teams: 'Rangers vs Bruins',
      score: '3-2',
      time: '2nd Period',
      status: 'live'
    },
    {
      id: 2,
      league: 'NBA',
      teams: 'Chiefs 21-17 Bills',
      score: '21-17',
      time: '3rd Quarter',
      status: 'live'
    },
    {
      id: 3,
      league: 'NBA',
      teams: 'Lakers 89-92 Warriors',
      score: '89-92',
      time: '4th Quarter',
      status: 'live'
    }
  ]);

  const languages = ['EN', 'ES', 'FR', 'DE', 'PT', 'ZH', 'JA'];
  const sports = [
    { icon: Football, name: 'Football' },
    { icon: Dribbble, name: 'Basketball' },
    { icon: Trophy, name: 'Hockey' },
    { icon: Lightning, name: 'Baseball' }
  ];

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">PlayChaCha</div>
          
          <nav className="nav-links">
            <a href="#sports" className="nav-link active">Sports</a>
            <a href="#live" className="nav-link">Live</a>
            <a href="#bets" className="nav-link">My Bets</a>
            
            <select 
              className="language-selector"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            
            <button className="login-btn">Login</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">Bet Against Real Users Worldwide</h1>
          <p className="hero-subtitle">
            Peer-to-peer sports betting with secure escrow and instant payouts
          </p>
          
          {/* Sports Icons */}
          <div className="sports-icons">
            {sports.map((sport, index) => {
              const IconComponent = sport.icon;
              return (
                <div key={index} className="sport-icon" title={sport.name}>
                  <IconComponent />
                </div>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn btn-primary">
              <Play size={20} />
              Start Betting Now
            </button>
            <button className="btn btn-secondary">
              <Eye size={20} />
              Watch Demo
            </button>
          </div>
        </section>

        {/* Live Events Section */}
        <section className="live-events">
          <h2 className="section-title">
            <div className="live-indicator"></div>
            Live Events
          </h2>
          
          {liveEvents.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <span className="event-league">{event.league}</span>
                <span className="event-time">{event.time}</span>
              </div>
              <div className="event-teams">{event.teams}</div>
              <div className="event-score">{event.score}</div>
            </div>
          ))}
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Peer-to-Peer Betting</h3>
              <p>Bet directly against other users, not the house</p>
            </div>
            
            <div className="feature-card">
              <Globe className="feature-icon" />
              <h3>Global Community</h3>
              <p>Connect with sports fans from around the world</p>
            </div>
            
            <div className="feature-card">
              <Zap className="feature-icon" />
              <h3>Instant Payouts</h3>
              <p>Secure escrow system with immediate settlements</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#about" className="footer-link">About</a>
            <a href="#terms" className="footer-link">Terms</a>
            <a href="#privacy" className="footer-link">Privacy</a>
            <a href="#support" className="footer-link">Support</a>
            <a href="#responsible" className="footer-link">Responsible Gaming</a>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 PlayChaCha. All rights reserved.</p>
            <div className="visnec-branding">
              <p>
                Powered by{' '}
                <a 
                  href="https://visnec.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="visnec-link"
                >
                  Visnec
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

