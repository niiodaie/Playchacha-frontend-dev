import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const SUPPORTED_LANGUAGES = {
  'en-US': { name: 'English (US)', nativeName: 'English', flag: '🇺🇸' },
  'en-GB': { name: 'English (UK)', nativeName: 'English', flag: '🇬🇧' },
  'es-ES': { name: 'Spanish (Spain)', nativeName: 'Español', flag: '🇪🇸' },
  'es-MX': { name: 'Spanish (Mexico)', nativeName: 'Español', flag: '🇲🇽' },
  'fr-FR': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  'de-DE': { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  'pt-BR': { name: 'Portuguese (Brazil)', nativeName: 'Português', flag: '🇧🇷' },
  'it-IT': { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  'ja-JP': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  'ko-KR': { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  'zh-CN': { name: 'Chinese (Simplified)', nativeName: '中文', flag: '🇨🇳' },
  'ar-SA': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
};

// Default translations
const DEFAULT_TRANSLATIONS = {
  'en-US': {
    'nav.home': 'Home',
    'nav.betting': 'Betting',
    'nav.wallet': 'Wallet',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'hero.title': 'Peer-to-Peer Sports Betting',
    'hero.subtitle': 'Bet against other users on real sports events globally',
    'hero.cta': 'Start Betting Now',
    'features.secure': 'Secure Escrow',
    'features.global': 'Global Events',
    'features.instant': 'Instant Payouts',
    'footer.about': 'About',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  'es-ES': {
    'nav.home': 'Inicio',
    'nav.betting': 'Apuestas',
    'nav.wallet': 'Cartera',
    'nav.dashboard': 'Panel',
    'nav.profile': 'Perfil',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registrarse',
    'nav.logout': 'Cerrar Sesión',
    'hero.title': 'Apuestas Deportivas P2P',
    'hero.subtitle': 'Apuesta contra otros usuarios en eventos deportivos reales globalmente',
    'hero.cta': 'Comenzar a Apostar',
    'features.secure': 'Depósito Seguro',
    'features.global': 'Eventos Globales',
    'features.instant': 'Pagos Instantáneos',
    'footer.about': 'Acerca de',
    'footer.contact': 'Contacto',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
  },
  'fr-FR': {
    'nav.home': 'Accueil',
    'nav.betting': 'Paris',
    'nav.wallet': 'Portefeuille',
    'nav.dashboard': 'Tableau de Bord',
    'nav.profile': 'Profil',
    'nav.login': 'Connexion',
    'nav.register': 'S\'inscrire',
    'nav.logout': 'Déconnexion',
    'hero.title': 'Paris Sportifs P2P',
    'hero.subtitle': 'Pariez contre d\'autres utilisateurs sur des événements sportifs réels mondialement',
    'hero.cta': 'Commencer à Parier',
    'features.secure': 'Dépôt Sécurisé',
    'features.global': 'Événements Globaux',
    'features.instant': 'Paiements Instantanés',
    'footer.about': 'À Propos',
    'footer.contact': 'Contact',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions de Service',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en-US');
  const [translations, setTranslations] = useState(DEFAULT_TRANSLATIONS['en-US']);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored language preference
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && SUPPORTED_LANGUAGES[storedLanguage]) {
      changeLanguage(storedLanguage);
    } else {
      // Detect user language
      detectUserLanguage();
    }
  }, []);

  const detectUserLanguage = () => {
    const browserLanguage = navigator.language || navigator.languages[0];
    const supportedLanguage = Object.keys(SUPPORTED_LANGUAGES).find(
      lang => lang === browserLanguage || lang.startsWith(browserLanguage.split('-')[0])
    );
    
    if (supportedLanguage) {
      changeLanguage(supportedLanguage);
    }
  };

  const loadTranslations = async (languageCode) => {
    setIsLoading(true);
    try {
      // Try to load translations from API
      const response = await fetch(`/api/translations/${languageCode}`);
      if (response.ok) {
        const apiTranslations = await response.json();
        setTranslations(apiTranslations);
      } else {
        // Fallback to default translations
        setTranslations(DEFAULT_TRANSLATIONS[languageCode] || DEFAULT_TRANSLATIONS['en-US']);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to default translations
      setTranslations(DEFAULT_TRANSLATIONS[languageCode] || DEFAULT_TRANSLATIONS['en-US']);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (newLanguage) => {
    if (SUPPORTED_LANGUAGES[newLanguage]) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
      await loadTranslations(newLanguage);
      
      // Update document language
      document.documentElement.lang = newLanguage;
      
      // Update document direction for RTL languages
      const isRTL = ['ar-SA', 'he-IL', 'fa-IR'].includes(newLanguage);
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
  };

  const t = (key, params = {}) => {
    let translation = translations[key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  };

  const getCurrentLanguage = () => SUPPORTED_LANGUAGES[language];

  const isRTL = () => ['ar-SA', 'he-IL', 'fa-IR'].includes(language);

  const value = {
    language,
    languages: SUPPORTED_LANGUAGES,
    translations,
    isLoading,
    changeLanguage,
    t,
    getCurrentLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

