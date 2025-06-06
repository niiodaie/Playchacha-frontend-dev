import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import './App.css';

// Main App Component with Authentication
function AppContent() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userLocation, setUserLocation] = useState(null);
  const [liveEvents, setLiveEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [sportsData, setSportsData] = useState([]);

  // Get authentication state
  const { user, logout, isAuthenticated, loading } = useAuth();

  // Sports events data with live updates
  const defaultSportsEvents = [
    {
      id: 1,
      sport: 'Football',
      teams: ['Kansas City Chiefs', 'Buffalo Bills'],
      scores: [21, 17],
      time: '3rd Quarter',
      status: 'LIVE',
      league: 'NFL',
      icon: '🏈',
      odds: { home: 1.85, draw: 3.40, away: 2.10 }
    },
    {
      id: 2,
      sport: 'Basketball',
      teams: ['Los Angeles Lakers', 'Golden State Warriors'],
      scores: [89, 92],
      time: '4th Quarter',
      status: 'LIVE',
      league: 'NBA',
      icon: '🏀',
      odds: { home: 2.10, away: 1.75 }
    },
    {
      id: 3,
      sport: 'Soccer',
      teams: ['Real Madrid', 'FC Barcelona'],
      scores: [2, 1],
      time: '78\'',
      status: 'LIVE',
      league: 'La Liga',
      icon: '⚽',
      odds: { home: 1.95, draw: 3.20, away: 2.05 }
    },
    {
      id: 4,
      sport: 'Tennis',
      teams: ['Novak Djokovic', 'Rafael Nadal'],
      scores: ['6-4', '3-2'],
      time: 'Set 2',
      status: 'LIVE',
      league: 'French Open',
      icon: '🎾',
      odds: { home: 1.65, away: 2.25 }
    },
    {
      id: 5,
      sport: 'Baseball',
      teams: ['New York Yankees', 'Boston Red Sox'],
      scores: [5, 3],
      time: '7th Inning',
      status: 'LIVE',
      league: 'MLB',
      icon: '⚾',
      odds: { home: 1.90, away: 1.95 }
    }
  ];

  // Fetch live sports data from backend
  useEffect(() => {
    const fetchSportsData = async () => {
      try {
        // Update this URL to your backend (local for testing, Render for production)
        const response = await fetch('http://localhost:5001/api/events');
        const data = await response.json();
        setSportsData(data.events || defaultSportsEvents);
      } catch (error) {
        console.error('Failed to fetch sports data:', error);
        setSportsData(defaultSportsEvents);
      }
    };

    fetchSportsData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchSportsData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Translations
  const translations = {
    en: {
      title: 'Bet Against Real Users',
      subtitle: 'Worldwide',
      description: 'Peer-to-peer sports betting with secure escrow and instant payouts',
      startBetting: 'Start Betting Now',
      watchDemo: 'Watch Demo',
      activeUsers: 'Active Users',
      bettingVolume: 'Betting Volume',
      winRate: 'Win Rate',
      whyChoose: 'Why Choose PlayChaCha?',
      futureOfBetting: 'The future of sports betting is here',
      secureEscrow: 'Secure Escrow',
      globalEvents: 'Global Events',
      instantPayouts: 'Instant Payouts',
      liveEvents: 'Live Events',
      joinPools: 'Join active betting pools now',
      joinBet: 'Join Bet',
      placeBet: 'Place Bet',
      sports: 'Sports',
      live: 'Live',
      myBets: 'My Bets',
      login: 'Login',
      logout: 'Logout',
      welcome: 'Welcome',
      dashboard: 'Dashboard'
    },
    es: {
      title: 'Apuesta Contra Usuarios Reales',
      subtitle: 'En Todo el Mundo',
      description: 'Apuestas deportivas peer-to-peer con depósito seguro y pagos instantáneos',
      startBetting: 'Comenzar a Apostar',
      watchDemo: 'Ver Demo',
      activeUsers: 'Usuarios Activos',
      bettingVolume: 'Volumen de Apuestas',
      winRate: 'Tasa de Ganancia',
      whyChoose: '¿Por Qué Elegir PlayChaCha?',
      futureOfBetting: 'El futuro de las apuestas deportivas está aquí',
      secureEscrow: 'Depósito Seguro',
      globalEvents: 'Eventos Globales',
      instantPayouts: 'Pagos Instantáneos',
      liveEvents: 'Eventos en Vivo',
      joinPools: 'Únete a pools de apuestas activos ahora',
      joinBet: 'Unirse a Apuesta',
      placeBet: 'Hacer Apuesta',
      sports: 'Deportes',
      live: 'En Vivo',
      myBets: 'Mis Apuestas',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
      welcome: 'Bienvenido',
      dashboard: 'Panel'
    },
    fr: {
      title: 'Pariez Contre de Vrais Utilisateurs',
      subtitle: 'Dans le Monde Entier',
      description: 'Paris sportifs peer-to-peer avec séquestre sécurisé et paiements instantanés',
      startBetting: 'Commencer à Parier',
      watchDemo: 'Voir la Démo',
      activeUsers: 'Utilisateurs Actifs',
      bettingVolume: 'Volume de Paris',
      winRate: 'Taux de Gain',
      whyChoose: 'Pourquoi Choisir PlayChaCha?',
      futureOfBetting: 'L\'avenir des paris sportifs est ici',
      secureEscrow: 'Séquestre Sécurisé',
      globalEvents: 'Événements Globaux',
      instantPayouts: 'Paiements Instantanés',
      liveEvents: 'Événements en Direct',
      joinPools: 'Rejoignez les pools de paris actifs maintenant',
      joinBet: 'Rejoindre le Pari',
      placeBet: 'Placer un Pari',
      sports: 'Sports',
      live: 'En Direct',
      myBets: 'Mes Paris',
      login: 'Se Connecter',
      logout: 'Se Déconnecter',
      welcome: 'Bienvenue',
      dashboard: 'Tableau de Bord'
    },
    de: {
      title: 'Wetten Sie Gegen Echte Nutzer',
      subtitle: 'Weltweit',
      description: 'Peer-to-Peer Sportwetten mit sicherem Treuhand und sofortigen Auszahlungen',
      startBetting: 'Jetzt Wetten',
      watchDemo: 'Demo Ansehen',
      activeUsers: 'Aktive Nutzer',
      bettingVolume: 'Wettvolumen',
      winRate: 'Gewinnrate',
      whyChoose: 'Warum PlayChaCha Wählen?',
      futureOfBetting: 'Die Zukunft der Sportwetten ist hier',
      secureEscrow: 'Sicheres Treuhand',
      globalEvents: 'Globale Events',
      instantPayouts: 'Sofortige Auszahlungen',
      liveEvents: 'Live Events',
      joinPools: 'Treten Sie jetzt aktiven Wett-Pools bei',
      joinBet: 'Wette Beitreten',
      placeBet: 'Wette Platzieren',
      sports: 'Sport',
      live: 'Live',
      myBets: 'Meine Wetten',
      login: 'Anmelden',
      logout: 'Abmelden',
      welcome: 'Willkommen',
      dashboard: 'Dashboard'
    },
    pt: {
      title: 'Aposte Contra Usuários Reais',
      subtitle: 'No Mundo Todo',
      description: 'Apostas esportivas peer-to-peer com custódia segura e pagamentos instantâneos',
      startBetting: 'Começar a Apostar',
      watchDemo: 'Ver Demo',
      activeUsers: 'Usuários Ativos',
      bettingVolume: 'Volume de Apostas',
      winRate: 'Taxa de Vitória',
      whyChoose: 'Por Que Escolher PlayChaCha?',
      futureOfBetting: 'O futuro das apostas esportivas está aqui',
      secureEscrow: 'Custódia Segura',
      globalEvents: 'Eventos Globais',
      instantPayouts: 'Pagamentos Instantâneos',
      liveEvents: 'Eventos ao Vivo',
      joinPools: 'Junte-se a pools de apostas ativas agora',
      joinBet: 'Participar da Aposta',
      placeBet: 'Fazer Aposta',
      sports: 'Esportes',
      live: 'Ao Vivo',
      myBets: 'Minhas Apostas',
      login: 'Entrar',
      logout: 'Sair',
      welcome: 'Bem-vindo',
      dashboard: 'Painel'
    }
  };

  const t = (key) => translations[currentLanguage]?.[key] || translations.en[key];

  // Geolocation detection
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          
          // Simple language detection based on common regions
          if (latitude > 35 && latitude < 42 && longitude > -9 && longitude < 3) {
            setCurrentLanguage('es'); // Spain
          } else if (latitude > 41 && latitude < 51 && longitude > -5 && longitude < 10) {
            setCurrentLanguage('fr'); // France
          } else if (latitude > 47 && latitude < 55 && longitude > 5 && longitude < 16) {
            setCurrentLanguage('de'); // Germany
          } else if (latitude > -34 && latitude < 5 && longitude > -74 && longitude < -34) {
            setCurrentLanguage('pt'); // Brazil
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

  // Live events rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % (sportsData.length || defaultSportsEvents.length));
    }, 3000);
    return () => clearInterval(interval);
  }, [sportsData]);

  // Handle bet placement
  const handlePlaceBet = async (eventId, betType, odds) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      // This would integrate with your betting API
      const betData = {
        event_id: eventId,
        bet_type: betType,
        amount: 10, // Default amount, would be user input
        odds: odds
      };

      // Make API call to place bet
      console.log('Placing bet:', betData);
      alert(`Bet placed successfully! ${betType} at ${odds} odds`);
    } catch (error) {
      console.error('Failed to place bet:', error);
      alert('Failed to place bet. Please try again.');
    }
  };

  const eventsToShow = sportsData.length > 0 ? sportsData : defaultSportsEvents;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">PlayChaCha</div>
          <nav className="nav-links">
            <a href="#" className="nav-link active">{t('sports')}</a>
            <a href="#" className="nav-link">{t('live')}</a>
            {isAuthenticated && (
              <a href="#" className="nav-link">{t('myBets')}</a>
            )}
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="language-selector"
            >
              <option value="en">🇺🇸 EN</option>
              <option value="es">🇪🇸 ES</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
              <option value="pt">🇧🇷 PT</option>
            </select>
            
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="welcome-text">{t('welcome')}, {user?.name}</span>
                <button onClick={logout} className="logout-btn">{t('logout')}</button>
              </div>
            ) : (
              <button 
                onClick={() => setShowLoginModal(true)} 
                className="login-btn"
              >
                {t('login')}
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            {t('title')} <span>{t('subtitle')}</span>
          </h1>
          <p className="hero-subtitle">{t('description')}</p>
          
          <div className="sports-icons">
            <div className="sport-icon">🏈</div>
            <div className="sport-icon">⚽</div>
            <div className="sport-icon">🏀</div>
            <div className="sport-icon">🎾</div>
            <div className="sport-icon">⚾</div>
          </div>
          
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => isAuthenticated ? document.getElementById('live-events').scrollIntoView() : setShowLoginModal(true)}
            >
              {t('startBetting')}
            </button>
            <button className="btn btn-secondary">{t('watchDemo')}</button>
          </div>
        </section>
        
        {/* Live Events Section */}
        <section id="live-events" className="live-events">
          <h2 className="section-title">
            <span className="live-indicator"></span> {t('liveEvents')}
          </h2>
          
          {eventsToShow.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <span className="event-league">{event.icon} {event.league}</span>
                <span className="event-time">{event.status}</span>
              </div>
              <div className="event-teams">{event.teams[0]} vs {event.teams[1]}</div>
              <div className="event-score">
                {event.sport === 'Tennis' ? 
                  event.scores.join(', ') : 
                  `${event.scores[0]} - ${event.scores[1]}`
                }
              </div>
              <div className="betting-odds">
                <button 
                  className="odds-button"
                  onClick={() => handlePlaceBet(event.id, 'home', event.odds?.home || 1.85)}
                >
                  <div>{event.teams[0]}</div>
                  <div className="odds-value">{event.odds?.home || '1.85'}</div>
                </button>
                {event.odds?.draw && (
                  <button 
                    className="odds-button"
                    onClick={() => handlePlaceBet(event.id, 'draw', event.odds.draw)}
                  >
                    <div>Draw</div>
                    <div className="odds-value">{event.odds.draw}</div>
                  </button>
                )}
                <button 
                  className="odds-button"
                  onClick={() => handlePlaceBet(event.id, 'away', event.odds?.away || 2.10)}
                >
                  <div>{event.teams[1]}</div>
                  <div className="odds-value">{event.odds?.away || '2.10'}</div>
                </button>
              </div>
            </div>
          ))}
        </section>
        
        {/* Live Ticker */}
        <div className="live-ticker">
          <div className="ticker-content">
            {eventsToShow.map((event) => (
              <div key={event.id} className="ticker-item">
                {event.icon} {event.teams[0]} {event.scores[0]} - {event.scores[1]} {event.teams[1]} • {event.time}
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">{t('whyChoose')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>{t('secureEscrow')}</h3>
              <p>Advanced encryption and secure escrow system protecting all transactions</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌎</div>
              <h3>{t('globalEvents')}</h3>
              <p>Access to thousands of sporting events from around the world</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>{t('instantPayouts')}</h3>
              <p>Receive your winnings instantly with our lightning-fast payment system</p>
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">1.2M+</div>
              <div className="stat-label">{t('activeUsers')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">$50M+</div>
              <div className="stat-label">{t('bettingVolume')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">94.7%</div>
              <div className="stat-label">{t('winRate')}</div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#" className="footer-link">About Us</a>
            <a href="#" className="footer-link">Terms of Service</a>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <div className="footer-bottom">
            <p>© 2025 PlayChaCha. All rights reserved.</p>
            <p className="visnec-branding">
              Powered by <a href="https://visnec.com" className="visnec-link">Visnec</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
}

// Main App Component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

