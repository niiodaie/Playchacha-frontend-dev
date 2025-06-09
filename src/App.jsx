import React, { useState, useEffect, createContext, useContext } from 'react';

// AuthContext integrated directly into App.jsx to avoid import issues
const AuthContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Live backend API URL
  const API_BASE = 'https://48xhpiqc8wkx.manus.space/api';

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('playchacha_token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('playchacha_token', token);
      } else {
        localStorage.removeItem('playchacha_token');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('playchacha_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('playchacha_token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Login failed');
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('playchacha_token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Registration failed');
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('playchacha_token');
    setError(null);
  };

  const placeBet = async (eventId, betType, amount, odds) => {
    try {
      const token = localStorage.getItem('playchacha_token');
      if (!token) {
        return { success: false, error: 'Please login to place bets' };
      }

      const response = await fetch(`${API_BASE}/bets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          bet_type: betType,
          amount: amount,
          odds: odds
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(prev => ({
          ...prev,
          balance: data.new_balance
        }));
        return { success: true, bet: data.bet, newBalance: data.new_balance };
      } else {
        return { success: false, error: data.error || 'Failed to place bet' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const fetchSportsEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, events: data.events, liveCount: data.live_count };
      } else {
        return getFallbackEvents();
      }
    } catch (error) {
      return getFallbackEvents();
    }
  };

  const getFallbackEvents = () => ({
    success: true,
    events: [
      {
        id: 1,
        sport: 'NFL',
        home_team: 'Kansas City Chiefs',
        away_team: 'Buffalo Bills',
        home_score: 21,
        away_score: 17,
        status: 'live',
        quarter: '3rd Quarter',
        odds: { home: 1.85, draw: 3.4, away: 2.1 }
      },
      {
        id: 2,
        sport: 'NBA',
        home_team: 'Los Angeles Lakers',
        away_team: 'Golden State Warriors',
        home_score: 89,
        away_score: 92,
        status: 'live',
        quarter: '4th Quarter',
        odds: { home: 2.1, away: 1.75 }
      }
    ],
    liveCount: 2
  });

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    placeBet,
    fetchSportsEvents,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// LoginModal component
const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onClose();
    } else {
      setFormError(result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login to PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {(formError || error) && (
            <div className="error-message">
              {formError || error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="auth-switch">
            <p>
              Don't have an account?{' '}
              <button 
                type="button"
                className="link-btn"
                onClick={onSwitchToRegister}
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// RegisterModal component
const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    const result = await register(formData.email, formData.password, formData.name);
    
    if (result.success) {
      onClose();
    } else {
      setFormError(result.error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Join PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {(formError || error) && (
            <div className="error-message">
              {formError || error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Create a password (min 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="auth-switch">
            <p>
              Already have an account?{' '}
              <button 
                type="button"
                className="link-btn"
                onClick={onSwitchToLogin}
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

// Main App component
function App() {
  const { user, loading, fetchSportsEvents, placeBet, logout, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [sportsEvents, setSportsEvents] = useState([]);
  const [liveCount, setLiveCount] = useState(0);
  const [betMessage, setBetMessage] = useState('');

  // Load sports events on component mount
  useEffect(() => {
    loadSportsEvents();
  }, []);

  const loadSportsEvents = async () => {
    const result = await fetchSportsEvents();
    if (result.success) {
      setSportsEvents(result.events);
      setLiveCount(result.liveCount);
    }
  };

  const handleBetClick = async (event, betType) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    const amount = 10; // Default bet amount
    const odds = event.odds[betType];
    
    const result = await placeBet(event.id, betType, amount, odds);
    
    if (result.success) {
      setBetMessage(`Bet placed successfully! $${amount} on ${event.home_team} vs ${event.away_team}`);
      setTimeout(() => setBetMessage(''), 3000);
    } else {
      setBetMessage(`Failed to place bet: ${result.error}`);
      setTimeout(() => setBetMessage(''), 3000);
    }
  };

  const translations = {
    en: {
      home: 'Home',
      sports: 'Sports',
      live: 'Live',
      myBets: 'My Bets',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      welcome: 'Welcome',
      balance: 'Balance',
      heroTitle: 'The Ultimate Sports Betting Experience',
      heroSubtitle: 'Join millions of players worldwide and experience the thrill of live sports betting with real-time odds and instant payouts.',
      startBetting: 'Start Betting Now',
      watchDemo: 'Watch Demo',
      liveEvents: 'Live Events',
      viewAllSports: 'View All Sports',
      featuresTitle: 'Why Choose PlayChaCha?',
      feature1Title: 'Live Betting',
      feature1Desc: 'Bet on live games with real-time odds',
      feature2Title: 'Instant Payouts',
      feature2Desc: 'Get your winnings instantly',
      feature3Title: 'Global Sports',
      feature3Desc: 'Bet on sports from around the world',
      feature4Title: 'Secure Platform',
      feature4Desc: 'Your money and data are always safe',
      poweredBy: 'Powered by',
      placeBet: 'Place Bet',
      live: 'LIVE'
    }
  };

  const t = translations[currentLanguage];

  const renderHomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <div className="hero-buttons">
            <button 
              className="btn-primary"
              onClick={() => isAuthenticated ? setCurrentPage('sports') : setShowLoginModal(true)}
            >
              {t.startBetting}
            </button>
            <button 
              className="btn-secondary"
              onClick={() => setShowDemoModal(true)}
            >
              {t.watchDemo}
            </button>
          </div>
        </div>
      </section>

      {/* Bet Message */}
      {betMessage && (
        <div className="bet-message">
          {betMessage}
        </div>
      )}

      {/* Live Events Section */}
      <section className="live-events-section">
        <div className="section-header">
          <h2>{t.liveEvents} <span className="live-badge">{liveCount} {t.live}</span></h2>
          <button 
            className="view-all-btn"
            onClick={() => setCurrentPage('sports')}
          >
            {t.viewAllSports}
          </button>
        </div>
        
        <div className="events-grid">
          {sportsEvents.slice(0, 3).map(event => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <span className="sport-tag">{event.sport}</span>
                <span className="live-indicator">{t.live}</span>
              </div>
              <div className="event-teams">
                <div className="team">
                  <span className="team-name">{event.home_team}</span>
                  <span className="team-score">{event.home_score}</span>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <span className="team-name">{event.away_team}</span>
                  <span className="team-score">{event.away_score}</span>
                </div>
              </div>
              <div className="event-status">{event.quarter}</div>
              <div className="betting-odds">
                <button 
                  className="odds-btn"
                  onClick={() => handleBetClick(event, 'home')}
                >
                  {event.home_team} {event.odds.home}
                </button>
                {event.odds.draw && (
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'draw')}
                  >
                    Draw {event.odds.draw}
                  </button>
                )}
                <button 
                  className="odds-btn"
                  onClick={() => handleBetClick(event, 'away')}
                >
                  {event.away_team} {event.odds.away}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">{t.featuresTitle}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>{t.feature1Title}</h3>
            <p>{t.feature1Desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>{t.feature2Title}</h3>
            <p>{t.feature2Desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>{t.feature3Title}</h3>
            <p>{t.feature3Desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>{t.feature4Title}</h3>
            <p>{t.feature4Desc}</p>
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <div className="live-ticker">
        <div className="ticker-content">
          {sportsEvents.map(event => (
            <span key={event.id} className="ticker-item">
              {event.home_team} {event.home_score} - {event.away_score} {event.away_team} ({event.quarter})
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSportsPage = () => (
    <div className="sports-page">
      <h1>Sports Betting</h1>
      <div className="events-grid">
        {sportsEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <span className="sport-tag">{event.sport}</span>
              <span className="live-indicator">{t.live}</span>
            </div>
            <div className="event-teams">
              <div className="team">
                <span className="team-name">{event.home_team}</span>
                <span className="team-score">{event.home_score}</span>
              </div>
              <div className="vs">VS</div>
              <div className="team">
                <span className="team-name">{event.away_team}</span>
                <span className="team-score">{event.away_score}</span>
              </div>
            </div>
            <div className="event-status">{event.quarter}</div>
            <div className="betting-odds">
              <button 
                className="odds-btn"
                onClick={() => handleBetClick(event, 'home')}
              >
                {event.home_team} {event.odds.home}
              </button>
              {event.odds.draw && (
                <button 
                  className="odds-btn"
                  onClick={() => handleBetClick(event, 'draw')}
                >
                  Draw {event.odds.draw}
                </button>
              )}
              <button 
                className="odds-btn"
                onClick={() => handleBetClick(event, 'away')}
              >
                {event.away_team} {event.odds.away}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'sports':
        return renderSportsPage();
      case 'live':
        return renderSportsPage();
      case 'myBets':
        return (
          <div className="my-bets-page">
            <h1>{t.myBets}</h1>
            {isAuthenticated ? (
              <p>Your betting history will appear here.</p>
            ) : (
              <p>Please login to view your bets.</p>
            )}
          </div>
        );
      default:
        return renderHomePage();
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading PlayChaCha...</p>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <button 
            className="logo"
            onClick={() => setCurrentPage('home')}
          >
            PlayChaCha.net
          </button>
          
          <nav className="nav">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              {t.home}
            </button>
            <button 
              className={`nav-link ${currentPage === 'sports' ? 'active' : ''}`}
              onClick={() => setCurrentPage('sports')}
            >
              {t.sports}
            </button>
            <button 
              className={`nav-link ${currentPage === 'live' ? 'active' : ''}`}
              onClick={() => setCurrentPage('live')}
            >
              {t.live}
            </button>
            <button 
              className={`nav-link ${currentPage === 'myBets' ? 'active' : ''}`}
              onClick={() => setCurrentPage('myBets')}
            >
              {t.myBets}
            </button>
          </nav>

          <div className="header-actions">
            <select 
              className="language-selector"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              <option value="en">🇺🇸 EN</option>
            </select>

            {isAuthenticated ? (
              <div className="user-menu">
                <span className="welcome-text">
                  {t.welcome}, {user?.name || user?.email}
                </span>
                <span className="balance-text">
                  {t.balance}: ${user?.balance?.toFixed(2) || '0.00'}
                </span>
                <button 
                  className="logout-btn"
                  onClick={logout}
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  className="login-btn"
                  onClick={() => setShowLoginModal(true)}
                >
                  {t.login}
                </button>
                <button 
                  className="register-btn"
                  onClick={() => setShowRegisterModal(true)}
                >
                  {t.register}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PlayChaCha.net</h3>
            <p>The ultimate sports betting experience</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <button onClick={() => setCurrentPage('sports')}>Sports</button>
            <button onClick={() => setCurrentPage('live')}>Live Betting</button>
            <button onClick={() => setCurrentPage('myBets')}>My Bets</button>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <button>Help Center</button>
            <button>Contact Us</button>
            <button>Terms of Service</button>
          </div>
          <div className="footer-section">
            <p>{t.poweredBy} <a href="https://visnec.com" target="_blank" rel="noopener noreferrer">Visnec</a></p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showDemoModal && (
        <div className="modal-overlay" onClick={() => setShowDemoModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>PlayChaCha Demo</h2>
            <p>Welcome to PlayChaCha! Here's how to get started:</p>
            <ul>
              <li>1. Register or login to your account</li>
              <li>2. Browse live sports events</li>
              <li>3. Click on odds to place bets</li>
              <li>4. Watch your winnings grow!</li>
            </ul>
            <button 
              className="btn-primary"
              onClick={() => {
                setShowDemoModal(false);
                setShowRegisterModal(true);
              }}
            >
              Get Started
            </button>
            <button 
              className="btn-secondary"
              onClick={() => setShowDemoModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Export the App wrapped with AuthProvider
export default function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

