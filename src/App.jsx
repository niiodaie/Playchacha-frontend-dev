import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

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
    },
    es: {
      home: 'Inicio',
      sports: 'Deportes',
      live: 'En Vivo',
      myBets: 'Mis Apuestas',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      logout: 'Cerrar Sesión',
      welcome: 'Bienvenido',
      balance: 'Saldo',
      heroTitle: 'La Experiencia Definitiva de Apuestas Deportivas',
      heroSubtitle: 'Únete a millones de jugadores en todo el mundo y experimenta la emoción de las apuestas deportivas en vivo.',
      startBetting: 'Comenzar a Apostar',
      watchDemo: 'Ver Demo',
      liveEvents: 'Eventos en Vivo',
      viewAllSports: 'Ver Todos los Deportes',
      featuresTitle: '¿Por Qué Elegir PlayChaCha?',
      feature1Title: 'Apuestas en Vivo',
      feature1Desc: 'Apuesta en juegos en vivo con cuotas en tiempo real',
      feature2Title: 'Pagos Instantáneos',
      feature2Desc: 'Recibe tus ganancias al instante',
      feature3Title: 'Deportes Globales',
      feature3Desc: 'Apuesta en deportes de todo el mundo',
      feature4Title: 'Plataforma Segura',
      feature4Desc: 'Tu dinero y datos siempre están seguros',
      poweredBy: 'Desarrollado por',
      placeBet: 'Apostar',
      live: 'EN VIVO'
    },
    pt: {
      home: 'Início',
      sports: 'Esportes',
      live: 'Ao Vivo',
      myBets: 'Minhas Apostas',
      login: 'Entrar',
      register: 'Registrar',
      logout: 'Sair',
      welcome: 'Bem-vindo',
      balance: 'Saldo',
      heroTitle: 'A Experiência Definitiva em Apostas Esportivas',
      heroSubtitle: 'Junte-se a milhões de jogadores em todo o mundo e experimente a emoção das apostas esportivas ao vivo.',
      startBetting: 'Começar a Apostar',
      watchDemo: 'Ver Demo',
      liveEvents: 'Eventos ao Vivo',
      viewAllSports: 'Ver Todos os Esportes',
      featuresTitle: 'Por Que Escolher PlayChaCha?',
      feature1Title: 'Apostas ao Vivo',
      feature1Desc: 'Aposte em jogos ao vivo com odds em tempo real',
      feature2Title: 'Pagamentos Instantâneos',
      feature2Desc: 'Receba seus ganhos instantaneamente',
      feature3Title: 'Esportes Globais',
      feature3Desc: 'Aposte em esportes de todo o mundo',
      feature4Title: 'Plataforma Segura',
      feature4Desc: 'Seu dinheiro e dados estão sempre seguros',
      poweredBy: 'Desenvolvido por',
      placeBet: 'Apostar',
      live: 'AO VIVO'
    },
    fr: {
      home: 'Accueil',
      sports: 'Sports',
      live: 'En Direct',
      myBets: 'Mes Paris',
      login: 'Connexion',
      register: 'S\'inscrire',
      logout: 'Déconnexion',
      welcome: 'Bienvenue',
      balance: 'Solde',
      heroTitle: 'L\'Expérience Ultime de Paris Sportifs',
      heroSubtitle: 'Rejoignez des millions de joueurs dans le monde entier et vivez l\'excitation des paris sportifs en direct.',
      startBetting: 'Commencer à Parier',
      watchDemo: 'Voir la Démo',
      liveEvents: 'Événements en Direct',
      viewAllSports: 'Voir Tous les Sports',
      featuresTitle: 'Pourquoi Choisir PlayChaCha?',
      feature1Title: 'Paris en Direct',
      feature1Desc: 'Pariez sur des jeux en direct avec des cotes en temps réel',
      feature2Title: 'Paiements Instantanés',
      feature2Desc: 'Recevez vos gains instantanément',
      feature3Title: 'Sports Mondiaux',
      feature3Desc: 'Pariez sur des sports du monde entier',
      feature4Title: 'Plateforme Sécurisée',
      feature4Desc: 'Votre argent et vos données sont toujours en sécurité',
      poweredBy: 'Alimenté par',
      placeBet: 'Placer un Pari',
      live: 'EN DIRECT'
    },
    de: {
      home: 'Startseite',
      sports: 'Sport',
      live: 'Live',
      myBets: 'Meine Wetten',
      login: 'Anmelden',
      register: 'Registrieren',
      logout: 'Abmelden',
      welcome: 'Willkommen',
      balance: 'Guthaben',
      heroTitle: 'Das Ultimative Sportwetten-Erlebnis',
      heroSubtitle: 'Schließen Sie sich Millionen von Spielern weltweit an und erleben Sie den Nervenkitzel von Live-Sportwetten.',
      startBetting: 'Jetzt Wetten',
      watchDemo: 'Demo Ansehen',
      liveEvents: 'Live-Events',
      viewAllSports: 'Alle Sportarten Anzeigen',
      featuresTitle: 'Warum PlayChaCha Wählen?',
      feature1Title: 'Live-Wetten',
      feature1Desc: 'Setzen Sie auf Live-Spiele mit Echtzeit-Quoten',
      feature2Title: 'Sofortige Auszahlungen',
      feature2Desc: 'Erhalten Sie Ihre Gewinne sofort',
      feature3Title: 'Globale Sportarten',
      feature3Desc: 'Setzen Sie auf Sportarten aus der ganzen Welt',
      feature4Title: 'Sichere Plattform',
      feature4Desc: 'Ihr Geld und Ihre Daten sind immer sicher',
      poweredBy: 'Unterstützt von',
      placeBet: 'Wette Platzieren',
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
        return renderSportsPage(); // Same as sports for now
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
              <option value="es">🇪🇸 ES</option>
              <option value="pt">🇧🇷 PT</option>
              <option value="fr">🇫🇷 FR</option>
              <option value="de">🇩🇪 DE</option>
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

export default App;

