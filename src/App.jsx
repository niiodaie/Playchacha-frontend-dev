import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [userLocation, setUserLocation] = useState(null);
  const [liveEvents, setLiveEvents] = useState([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Sports events data with live updates
  const sportsEvents = [
    {
      id: 1,
      sport: 'Football',
      teams: ['Chiefs', 'Bills'],
      scores: [21, 17],
      time: '3rd Quarter',
      status: 'LIVE',
      league: 'NFL',
      icon: '🏈'
    },
    {
      id: 2,
      sport: 'Basketball',
      teams: ['Lakers', 'Warriors'],
      scores: [89, 92],
      time: '4th Quarter',
      status: 'LIVE',
      league: 'NBA',
      icon: '🏀'
    },
    {
      id: 3,
      sport: 'Soccer',
      teams: ['Real Madrid', 'Barcelona'],
      scores: [2, 1],
      time: '78\'',
      status: 'LIVE',
      league: 'La Liga',
      icon: '⚽'
    },
    {
      id: 4,
      sport: 'Tennis',
      teams: ['Djokovic', 'Nadal'],
      scores: ['6-4', '5-3'],
      time: 'Set 2',
      status: 'LIVE',
      league: 'French Open',
      icon: '🎾'
    },
    {
      id: 5,
      sport: 'Hockey',
      teams: ['Rangers', 'Bruins'],
      scores: [3, 2],
      time: '2nd Period',
      status: 'LIVE',
      league: 'NHL',
      icon: '🏒'
    }
  ];

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
      sports: 'Sports',
      live: 'Live',
      myBets: 'My Bets',
      login: 'Login'
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
      sports: 'Deportes',
      live: 'En Vivo',
      myBets: 'Mis Apuestas',
      login: 'Iniciar Sesión'
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
      sports: 'Sports',
      live: 'En Direct',
      myBets: 'Mes Paris',
      login: 'Se Connecter'
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
      sports: 'Sport',
      live: 'Live',
      myBets: 'Meine Wetten',
      login: 'Anmelden'
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
      sports: 'Esportes',
      live: 'Ao Vivo',
      myBets: 'Minhas Apostas',
      login: 'Entrar'
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
          // In production, you'd use a proper geolocation API
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
      setCurrentEventIndex((prev) => (prev + 1) % sportsEvents.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live score updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEvents(prev => {
        const updated = [...sportsEvents];
        const randomEvent = updated[Math.floor(Math.random() * updated.length)];
        if (Math.random() > 0.7) { // 30% chance of score update
          if (randomEvent.sport === 'Tennis') {
            // Tennis scoring logic would be more complex
          } else {
            const teamIndex = Math.random() > 0.5 ? 0 : 1;
            randomEvent.scores[teamIndex] += 1;
          }
        }
        return updated;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentEvent = sportsEvents[currentEventIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/playchacha_logo.png" 
                alt="PlayChaCha" 
                className="h-10 w-10 mr-3"
              />
              <h1 className="text-2xl font-bold text-blue-800">PlayChaCha</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">{t('sports')}</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">{t('live')}</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">{t('myBets')}</a>
            </nav>
            <div className="flex items-center space-x-4">
              <select 
                value={currentLanguage} 
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded px-3 py-1 text-sm"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="de">🇩🇪 DE</option>
                <option value="pt">🇧🇷 PT</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {t('login')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Live Sports Events */}
      <section className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating Sports Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🏈</div>
          <div className="absolute top-32 right-20 text-3xl animate-bounce" style={{animationDelay: '1s'}}>⚽</div>
          <div className="absolute bottom-40 left-20 text-3xl animate-bounce" style={{animationDelay: '2s'}}>🏀</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎾</div>
          <div className="absolute top-40 left-1/3 text-2xl animate-bounce" style={{animationDelay: '1.5s'}}>🏒</div>
          <div className="absolute bottom-60 right-1/3 text-3xl animate-bounce" style={{animationDelay: '2.5s'}}>🏐</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('title')}
              <span className="block text-orange-400">{t('subtitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t('description')}
            </p>

            {/* Live Event Ticker */}
            <div className="mb-8 bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse mr-3">
                  {currentEvent.status}
                </span>
                <span className="text-2xl mr-2">{currentEvent.icon}</span>
                <span className="text-lg font-semibold">{currentEvent.league}</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="text-center flex-1">
                  <div className="font-bold text-lg">{currentEvent.teams[0]}</div>
                  <div className="text-3xl font-bold text-orange-400">{currentEvent.scores[0]}</div>
                </div>
                <div className="text-gray-300 font-bold text-xl mx-4">VS</div>
                <div className="text-center flex-1">
                  <div className="font-bold text-lg">{currentEvent.teams[1]}</div>
                  <div className="text-3xl font-bold text-orange-400">{currentEvent.scores[1]}</div>
                </div>
              </div>
              
              <div className="text-center text-sm text-gray-300">
                {currentEvent.time} • {currentEvent.sport}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg animate-pulse">
                {t('startBetting')}
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-800 transition-all transform hover:scale-105">
                {t('watchDemo')}
              </button>
            </div>
          </div>
        </div>

        {/* Live Events Scroll */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 py-2">
          <div className="flex animate-scroll">
            {sportsEvents.map((event, index) => (
              <div key={event.id} className="flex items-center whitespace-nowrap mx-8">
                <span className="text-lg mr-2">{event.icon}</span>
                <span className="font-semibold mr-2">{event.teams[0]} {event.scores[0]}</span>
                <span className="text-gray-300 mr-2">-</span>
                <span className="font-semibold mr-4">{event.scores[1]} {event.teams[1]}</span>
                <span className="text-orange-400 text-sm">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group hover:transform hover:scale-105 transition-all">
              <div className="text-3xl font-bold text-blue-600 mb-2">1.2M+</div>
              <div className="text-gray-600">{t('activeUsers')}</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all">
              <div className="text-3xl font-bold text-orange-500 mb-2">$50M+</div>
              <div className="text-gray-600">{t('bettingVolume')}</div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all">
              <div className="text-3xl font-bold text-purple-600 mb-2">94.7%</div>
              <div className="text-gray-600">{t('winRate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('whyChoose')}</h2>
            <p className="text-xl text-gray-600">{t('futureOfBetting')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">{t('secureEscrow')}</h3>
              <p className="text-gray-600">Bank-level security with funds held in escrow until bet resolution</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-orange-500 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600">{t('globalEvents')}</h3>
              <p className="text-gray-600">Bet on sports events from around the world, 24/7</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-600">{t('instantPayouts')}</h3>
              <p className="text-gray-600">Get your winnings instantly, no waiting periods</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('liveEvents')}</h2>
            <p className="text-xl text-gray-600">{t('joinPools')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsEvents.slice(0, 3).map((event, index) => (
              <div key={event.id} className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:shadow-xl transition-all transform hover:scale-105 hover:border-blue-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
                    {event.status}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
                    <span className="mr-1">{event.icon}</span>
                    {event.sport}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="font-semibold text-gray-900">{event.teams[0]} vs {event.teams[1]}</div>
                  <div className="text-sm text-gray-600">{event.league}</div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{event.teams[0]}</div>
                    <div className="text-blue-600 font-bold text-xl">{event.scores[0]}</div>
                  </div>
                  <div className="text-gray-400 font-bold">vs</div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-800">{event.teams[1]}</div>
                    <div className="text-blue-600 font-bold text-xl">{event.scores[1]}</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded">
                  {event.time} • Pool: ${(Math.random() * 50000 + 10000).toFixed(0)}
                </div>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold">
                  {t('joinBet')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/playchacha_logo.png" 
                  alt="PlayChaCha" 
                  className="h-8 w-8 mr-2"
                />
                <h3 className="text-xl font-bold">PlayChaCha</h3>
              </div>
              <p className="text-gray-300 mb-4">The world's leading peer-to-peer sports betting platform.</p>
              <div className="text-sm text-gray-400">
                Powered by <a href="https://visnec.ai" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">Visnec</a>
              </div>
              {userLocation && (
                <div className="text-xs text-gray-500 mt-2">
                  📍 Location detected: {userLocation.latitude.toFixed(2)}, {userLocation.longitude.toFixed(2)}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-300">{t('sports')}</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Football</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Basketball</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Soccer</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tennis</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-orange-300">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-purple-300">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Responsible Gaming</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PlayChaCha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

