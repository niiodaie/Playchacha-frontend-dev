import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = 'http://localhost:5000/api'; // Will be updated for production

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setWallet(data.wallet);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
        setWallet(data.wallet);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setWallet(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const guestLogin = () => {
    const guestUser = {
      id: 'guest_' + Date.now(),
      name: 'Guest User',
      email: 'guest@playchacha.net',
      isGuest: true
    };
    const guestWallet = {
      user_id: guestUser.id,
      balance: 1000.00,
      currency: 'USD',
      transactions: []
    };
    
    setUser(guestUser);
    setWallet(guestWallet);
    localStorage.setItem('user', JSON.stringify(guestUser));
    localStorage.setItem('wallet', JSON.stringify(guestWallet));
  };

  return (
    <AuthContext.Provider value={{
      user, wallet, loading, register, login, logout, guestLogin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [language, setLanguage] = useState('en');

  const { user, wallet, login, register, logout, guestLogin } = useAuth();

  // Language translations
  const translations = {
    en: {
      title: 'PlayChaCha.net',
      home: 'Home',
      sports: 'Sports',
      live: 'LIVE',
      myBets: 'My Bets',
      login: 'Login',
      register: 'Register',
      guestAccess: 'Continue as Guest',
      heroTitle: 'Peer-to-Peer Sports Betting',
      heroSubtitle: 'Challenge friends, set your own odds, and win together',
      startBetting: 'Start Betting Now',
      watchDemo: 'Watch Demo',
      liveNow: 'LIVE NOW',
      inviteFriend: 'Invite Friend to Bet',
      createInvitation: 'Create Bet Invitation',
      wallet: 'Wallet',
      balance: 'Balance'
    },
    es: {
      title: 'PlayChaCha.net',
      home: 'Inicio',
      sports: 'Deportes',
      live: 'EN VIVO',
      myBets: 'Mis Apuestas',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      guestAccess: 'Continuar como Invitado',
      heroTitle: 'Apuestas Deportivas Entre Pares',
      heroSubtitle: 'Desafía a amigos, establece tus propias cuotas y gana juntos',
      startBetting: 'Comenzar a Apostar',
      watchDemo: 'Ver Demo',
      liveNow: 'EN VIVO AHORA',
      inviteFriend: 'Invitar Amigo a Apostar',
      createInvitation: 'Crear Invitación de Apuesta',
      wallet: 'Billetera',
      balance: 'Saldo'
    }
  };

  const t = translations[language] || translations.en;

  // Load events on component mount
  useEffect(() => {
    loadEvents();
    if (user && !user.isGuest) {
      loadInvitations();
    }
  }, [user]);

  const loadEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      // Fallback to mock data
      setEvents([
        {
          id: 'nfl_001',
          sport: 'NFL',
          home_team: 'Kansas City Chiefs',
          away_team: 'Buffalo Bills',
          start_time: '2025-01-15T20:00:00Z',
          status: 'upcoming',
          home_score: 0,
          away_score: 0
        },
        {
          id: 'nba_001',
          sport: 'NBA',
          home_team: 'Los Angeles Lakers',
          away_team: 'Boston Celtics',
          start_time: '2025-01-15T22:00:00Z',
          status: 'live',
          home_score: 78,
          away_score: 82
        }
      ]);
    }
  };

  const loadInvitations = async () => {
    if (!user || user.isGuest) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/invitations/user/${user.id}`);
      const data = await response.json();
      setInvitations(data.invitations || []);
    } catch (error) {
      console.error('Failed to load invitations:', error);
    }
  };

  // Inject CSS styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Inter', sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        color: #333;
      }

      .app-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .header {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 1rem 2rem;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: white;
        text-decoration: none;
      }

      .nav {
        display: flex;
        gap: 2rem;
        align-items: center;
      }

      .nav-button {
        background: none;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
      }

      .nav-button:hover, .nav-button.active {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-2px);
      }

      .auth-buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
        text-align: center;
      }

      .btn-primary {
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        color: white;
      }

      .btn-secondary {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .btn-guest {
        background: linear-gradient(45deg, #00d2d3, #54a0ff);
        color: white;
        margin-left: 0.5rem;
      }

      .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      }

      .hero {
        text-align: center;
        padding: 4rem 2rem;
        color: white;
      }

      .hero h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        background: linear-gradient(45deg, #fff, #f1c40f);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .live-banner {
        background: linear-gradient(45deg, #ff4757, #ff3838);
        color: white;
        padding: 0.5rem;
        text-align: center;
        font-weight: 600;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
      }

      .content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
      }

      .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .event-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .event-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
      }

      .event-card.live::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(45deg, #ff4757, #ff3838);
        animation: pulse 2s infinite;
      }

      .live-badge {
        background: #ff4757;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: 0.75rem;
        font-weight: 600;
        position: absolute;
        top: 1rem;
        right: 1rem;
        animation: pulse 2s infinite;
      }

      .teams {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem 0;
      }

      .team {
        text-align: center;
        flex: 1;
      }

      .team-name {
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .score {
        font-size: 1.5rem;
        font-weight: 700;
        color: #667eea;
      }

      .vs {
        font-size: 1.25rem;
        font-weight: 600;
        color: #666;
        margin: 0 1rem;
      }

      .invite-button {
        width: 100%;
        margin-top: 1rem;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
      }

      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .modal-content {
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 400px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
      }

      .form-group {
        margin-bottom: 1rem;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
      }

      .form-group input, .form-group select {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #e1e8ed;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
      }

      .form-group input:focus, .form-group select:focus {
        outline: none;
        border-color: #667eea;
      }

      .wallet-info {
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        text-align: center;
      }

      .invitations-section {
        margin-top: 2rem;
      }

      .invitation-card {
        background: white;
        border-radius: 10px;
        padding: 1rem;
        margin-bottom: 1rem;
        border-left: 4px solid #667eea;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .invitation-actions {
        display: flex;
        gap: 0.5rem;
        margin-top: 1rem;
      }

      .btn-small {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      .btn-accept {
        background: #2ed573;
        color: white;
      }

      .btn-decline {
        background: #ff4757;
        color: white;
      }

      .btn-counter {
        background: #ffa502;
        color: white;
      }

      .language-selector {
        margin-left: 1rem;
      }

      .language-selector select {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 5px;
        padding: 0.5rem;
      }

      .user-info {
        color: white;
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .adsense-banner {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;
        margin: 2rem 0;
        color: #6c757d;
      }

      @media (max-width: 768px) {
        .header-content {
          flex-direction: column;
          gap: 1rem;
        }

        .nav {
          gap: 1rem;
        }

        .hero h1 {
          font-size: 2.5rem;
        }

        .hero-buttons {
          flex-direction: column;
          align-items: center;
        }

        .events-grid {
          grid-template-columns: 1fr;
        }

        .teams {
          flex-direction: column;
          gap: 1rem;
        }

        .vs {
          margin: 0.5rem 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Add AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6074565478510564';
    adsenseScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseScript);

    return () => {
      document.head.removeChild(style);
      if (document.head.contains(adsenseScript)) {
        document.head.removeChild(adsenseScript);
      }
    };
  }, []);

  const handleInviteFriend = (event) => {
    setSelectedEvent(event);
    setShowInviteModal(true);
  };

  const liveEvents = events.filter(event => event.status === 'live');

  return (
    <div className="app-container">
      {/* Live Banner */}
      {liveEvents.length > 0 && (
        <div className="live-banner">
          <i className="fas fa-circle" style={{color: '#ff4757', marginRight: '0.5rem'}}></i>
          {t.liveNow}: {liveEvents.length} live matches happening now!
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <a href="#" className="logo" onClick={() => setCurrentPage('home')}>
            {t.title}
          </a>
          
          <nav className="nav">
            <button 
              className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              {t.home}
            </button>
            <button 
              className={`nav-button ${currentPage === 'sports' ? 'active' : ''}`}
              onClick={() => setCurrentPage('sports')}
            >
              {t.sports}
            </button>
            <button 
              className={`nav-button ${currentPage === 'live' ? 'active' : ''}`}
              onClick={() => setCurrentPage('live')}
            >
              {t.live}
            </button>
            {user && (
              <button 
                className={`nav-button ${currentPage === 'mybets' ? 'active' : ''}`}
                onClick={() => setCurrentPage('mybets')}
              >
                {t.myBets}
              </button>
            )}
          </nav>

          <div className="auth-buttons">
            <div className="language-selector">
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="pt">🇧🇷 PT</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="de">🇩🇪 DE</option>
                <option value="zh">🇨🇳 ZH</option>
                <option value="sw">🇰🇪 SW</option>
              </select>
            </div>
            
            {user ? (
              <div className="user-info">
                <span>Welcome, {user.name}!</span>
                {wallet && (
                  <span className="wallet-info">
                    {t.balance}: ${wallet.balance.toFixed(2)}
                  </span>
                )}
                <button className="btn btn-secondary" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button className="btn btn-secondary" onClick={() => setShowLoginModal(true)}>
                  {t.login}
                </button>
                <button className="btn btn-primary" onClick={() => setShowRegisterModal(true)}>
                  {t.register}
                </button>
                <button className="btn btn-guest" onClick={guestLogin}>
                  {t.guestAccess}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <section className="hero">
              <h1>{t.heroTitle}</h1>
              <p>{t.heroSubtitle}</p>
              <div className="hero-buttons">
                <button className="btn btn-primary" onClick={() => setCurrentPage('sports')}>
                  {t.startBetting}
                </button>
                <button className="btn btn-secondary">
                  {t.watchDemo}
                </button>
              </div>
            </section>

            {/* AdSense Banner */}
            <div className="adsense-banner">
              <div>Advertisement</div>
              <div style={{fontSize: '0.875rem', marginTop: '0.5rem'}}>
                AdSense integration active - ads will appear here
              </div>
            </div>
          </>
        )}

        {/* Events Content */}
        <div className="content">
          {(currentPage === 'sports' || currentPage === 'live' || currentPage === 'home') && (
            <div className="events-grid">
              {events
                .filter(event => currentPage === 'live' ? event.status === 'live' : true)
                .map(event => (
                  <div key={event.id} className={`event-card ${event.status === 'live' ? 'live' : ''}`}>
                    {event.status === 'live' && <div className="live-badge">LIVE</div>}
                    
                    <div style={{fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem'}}>
                      {event.sport}
                    </div>
                    
                    <div className="teams">
                      <div className="team">
                        <div className="team-name">{event.home_team}</div>
                        <div className="score">{event.home_score}</div>
                      </div>
                      <div className="vs">VS</div>
                      <div className="team">
                        <div className="team-name">{event.away_team}</div>
                        <div className="score">{event.away_score}</div>
                      </div>
                    </div>
                    
                    <button 
                      className="btn invite-button"
                      onClick={() => handleInviteFriend(event)}
                    >
                      {t.inviteFriend}
                    </button>
                  </div>
                ))}
            </div>
          )}

          {/* My Bets Page */}
          {currentPage === 'mybets' && user && (
            <div>
              <h2 style={{color: 'white', marginBottom: '2rem'}}>My Invitations & Bets</h2>
              
              {invitations.length > 0 ? (
                <div className="invitations-section">
                  {invitations.map(invitation => (
                    <div key={invitation.id} className="invitation-card">
                      <h4>Bet Invitation</h4>
                      <p><strong>Event:</strong> {invitation.event_id}</p>
                      <p><strong>Wager:</strong> ${invitation.wager_amount}</p>
                      <p><strong>Status:</strong> {invitation.status}</p>
                      <p><strong>Expires:</strong> {new Date(invitation.expires_at).toLocaleString()}</p>
                      
                      {invitation.status === 'pending' && (
                        <div className="invitation-actions">
                          <button className="btn btn-accept btn-small">Accept</button>
                          <button className="btn btn-decline btn-small">Decline</button>
                          <button className="btn btn-counter btn-small">Counter</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{color: 'white', textAlign: 'center', padding: '2rem'}}>
                  <p>No invitations yet. Start by inviting friends to bet!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Login to PlayChaCha</h3>
              <button className="close-button" onClick={() => setShowLoginModal(false)}>×</button>
            </div>
            <LoginForm onSuccess={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Join PlayChaCha</h3>
              <button className="close-button" onClick={() => setShowRegisterModal(false)}>×</button>
            </div>
            <RegisterForm onSuccess={() => setShowRegisterModal(false)} />
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{t.createInvitation}</h3>
              <button className="close-button" onClick={() => setShowInviteModal(false)}>×</button>
            </div>
            <InviteForm 
              event={selectedEvent} 
              onSuccess={() => {
                setShowInviteModal(false);
                loadInvitations();
              }} 
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{background: 'rgba(0,0,0,0.2)', color: 'white', textAlign: 'center', padding: '2rem', marginTop: '4rem'}}>
        <div style={{marginBottom: '1rem'}}>
          <a href="#" style={{color: 'white', margin: '0 1rem'}}><i className="fab fa-twitter"></i></a>
          <a href="#" style={{color: 'white', margin: '0 1rem'}}><i className="fab fa-instagram"></i></a>
          <a href="#" style={{color: 'white', margin: '0 1rem'}}><i className="fab fa-facebook"></i></a>
          <a href="#" style={{color: 'white', margin: '0 1rem'}}><i className="fab fa-youtube"></i></a>
        </div>
        <p>© 2025 PlayChaCha.net - Powered by <a href="https://visnec.com" style={{color: '#f1c40f'}}>Visnec</a></p>
      </footer>
    </div>
  );
};

// Login Form Component
const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(email, password);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color: '#ff4757', marginBottom: '1rem'}}>{error}</div>}
      
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      <div style={{textAlign: 'center', margin: '1rem 0', color: '#666'}}>or</div>
      
      <button type="button" className="btn btn-secondary" style={{width: '100%'}}>
        <i className="fab fa-google" style={{marginRight: '0.5rem'}}></i>
        Sign in with Google
      </button>
    </form>
  );
};

// Register Form Component
const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    const result = await register(formData);
    if (result.success) {
      onSuccess();
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{color: '#ff4757', marginBottom: '1rem'}}>{error}</div>}
      
      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Password</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required 
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
      
      <div style={{textAlign: 'center', margin: '1rem 0', color: '#666'}}>or</div>
      
      <button type="button" className="btn btn-secondary" style={{width: '100%'}}>
        <i className="fab fa-google" style={{marginRight: '0.5rem'}}></i>
        Sign up with Google
      </button>
    </form>
  );
};

// Invite Form Component
const InviteForm = ({ event, onSuccess }) => {
  const [formData, setFormData] = useState({
    invitee_email: '',
    bet_type: 'home_win',
    wager_amount: 10,
    odds: '2.0'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/invitations/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          event_id: event.id,
          inviter_id: user.id
        })
      });
      
      const data = await response.json();
      if (data.success) {
        onSuccess();
      } else {
        setError(data.message || 'Failed to create invitation');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px'}}>
        <strong>{event.home_team} vs {event.away_team}</strong>
        <div style={{fontSize: '0.875rem', color: '#666'}}>{event.sport}</div>
      </div>
      
      {error && <div style={{color: '#ff4757', marginBottom: '1rem'}}>{error}</div>}
      
      <div className="form-group">
        <label>Friend's Email</label>
        <input 
          type="email" 
          name="invitee_email"
          value={formData.invitee_email}
          onChange={handleChange}
          placeholder="Enter your friend's email"
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Bet Type</label>
        <select name="bet_type" value={formData.bet_type} onChange={handleChange}>
          <option value="home_win">{event.home_team} to Win</option>
          <option value="away_win">{event.away_team} to Win</option>
          <option value="over">Over Total Points</option>
          <option value="under">Under Total Points</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Wager Amount ($)</label>
        <input 
          type="number" 
          name="wager_amount"
          value={formData.wager_amount}
          onChange={handleChange}
          min="1"
          max="1000"
          required 
        />
      </div>
      
      <div className="form-group">
        <label>Odds</label>
        <input 
          type="text" 
          name="odds"
          value={formData.odds}
          onChange={handleChange}
          placeholder="e.g., 2.0, 1.5, 3.0"
          required 
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{width: '100%'}} disabled={loading}>
        {loading ? 'Creating Invitation...' : 'Send Invitation'}
      </button>
    </form>
  );
};

// Main App with Auth Provider
const AppWithAuth = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuth;

