import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Settings, 
  Moon, 
  Sun, 
  Globe, 
  ChevronDown,
  Bell,
  Wallet
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { currency, setCurrency, currencies } = useCurrency();
  const { language, setLanguage, languages } = useLanguage();

  const isDark = theme === 'dark';

  const navigation = [
    { name: 'Sports', href: '/sports', current: false },
    { name: 'Live Betting', href: '/live', current: false },
    { name: 'My Bets', href: '/bets', current: false },
    { name: 'Promotions', href: '/promotions', current: false },
  ];

  return (
    <nav className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      {/* Top Bar - Responsible Gaming Notice */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              If you or someone you know has a gambling problem, call 1-800-GAMBLER
            </div>
            <div className="flex items-center space-x-4">
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Responsible Gaming</span>
              <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Play ChaCha
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-emerald-600 border-b-2 border-emerald-600'
                    : isDark
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                <Wallet className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {currency.code}
                </span>
                <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button className={`flex items-center space-x-1 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}>
                <Globe className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {language.code.toUpperCase()}
                </span>
                <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Notifications */}
            <button className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors relative`}>
              <Bell className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className={`absolute right-0 mt-2 w-48 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'} py-1`}>
                  <Link
                    to="/profile"
                    className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/wallet"
                    className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Wallet
                  </Link>
                  <Link
                    to="/settings"
                    className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    Settings
                  </Link>
                  <hr className={`my-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />
                  <button className={`block w-full text-left px-4 py-2 text-sm ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Auth Buttons for Non-logged Users */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                to="/login"
                className={`px-4 py-2 text-sm font-medium ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors`}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className={`lg:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-emerald-100 text-emerald-700'
                    : isDark
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <hr className={`my-4 ${isDark ? 'border-gray-800' : 'border-gray-200'}`} />
            
            <div className="space-y-2">
              <Link
                to="/login"
                className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

