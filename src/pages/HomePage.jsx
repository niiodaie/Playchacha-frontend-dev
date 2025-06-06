import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Play, TrendingUp, Shield, Globe, Zap, Users, Star, ArrowRight, ChevronRight } from 'lucide-react';

const HomePage = () => {
  const { theme } = useTheme();
  const { currency } = useCurrency();
  const { language } = useLanguage();

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section - bet365 Inspired */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">#1 Peer-to-Peer Betting Platform</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Bet Against
                <span className="block text-yellow-400">Real Users</span>
                <span className="block">Worldwide</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl lg:text-2xl text-emerald-100 mb-8 leading-relaxed">
                Experience true peer-to-peer sports betting with secure escrow, 
                instant payouts, and only 3% fees on winnings.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="group bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  Start Betting Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-emerald-100">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-green-400" />
                  Licensed & Regulated
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-green-400" />
                  SSL Secured
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-400" />
                  1M+ Users
                </div>
              </div>
            </div>

            {/* Right Content - Promotional Card */}
            <div className="relative">
              {/* Main Promo Card */}
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl">
                <div className="text-center text-white">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-400 text-sm font-medium mb-4">
                    🎉 New User Offer
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">Welcome Bonus</h3>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    100% Match
                  </div>
                  <p className="text-emerald-100 mb-6">
                    Up to {currency.symbol}500 in bonus credits for new users
                  </p>
                  
                  <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold transition-colors">
                    Claim Bonus
                  </button>
                  
                  <p className="text-xs text-emerald-200 mt-3">
                    T&Cs apply. 18+ only. Gamble responsibly.
                  </p>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-lg">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold text-yellow-400">94.7%</div>
                  <div className="text-xs text-emerald-100">Win Rate</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 shadow-lg">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold text-yellow-400">{currency.symbol}50M+</div>
                  <div className="text-xs text-emerald-100">Total Volume</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill={isDark ? '#111827' : '#f9fafb'}/>
          </svg>
        </div>
      </section>

      {/* Live Events Ticker */}
      <section className={`py-4 ${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>LIVE</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-scroll flex space-x-8">
                <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} whitespace-nowrap`}>
                  <span className="font-medium">Liverpool vs Manchester United</span>
                  <span className="text-emerald-600 font-bold">2-1</span>
                  <span className="text-sm">75'</span>
                </div>
                <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} whitespace-nowrap`}>
                  <span className="font-medium">Lakers vs Warriors</span>
                  <span className="text-emerald-600 font-bold">98-102</span>
                  <span className="text-sm">Q4 2:45</span>
                </div>
                <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-600'} whitespace-nowrap`}>
                  <span className="font-medium">Djokovic vs Nadal</span>
                  <span className="text-emerald-600 font-bold">6-4, 3-2</span>
                  <span className="text-sm">Set 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>1.2M+</div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{currency.symbol}50M+</div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Volume</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>94.7%</div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Win Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>4.9/5</div>
              <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              Why Choose Play ChaCha?
            </h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Experience the future of sports betting with our innovative peer-to-peer platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-6">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Secure Escrow</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                All bets are secured in escrow until the event concludes. Your funds are always protected with bank-level security.
              </p>
              <button className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700 transition-colors">
                Learn More <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Feature 2 */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Global Events</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Bet on sports events from around the world. Football, basketball, tennis, and more with real-time updates.
              </p>
              <button className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors">
                Explore Sports <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {/* Feature 3 */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-900' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Instant Payouts</h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                Winners receive their payouts instantly when events conclude. No waiting periods, no delays.
              </p>
              <button className="text-yellow-600 font-semibold flex items-center hover:text-yellow-700 transition-colors">
                See How <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Events Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Popular Events
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Join thousands of users betting on these trending events
              </p>
            </div>
            <button className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700 transition-colors">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Event Card 1 */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-500 font-semibold text-sm">LIVE</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Premier League</span>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>75'</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">LIV</div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Liverpool</span>
                </div>
                <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>2</span>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center text-white text-xs font-bold">MUN</div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Manchester United</span>
                </div>
                <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Pool</div>
                  <div className="font-bold text-emerald-600">{currency.symbol}125,000</div>
                </div>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Join Bet
                </button>
              </div>
            </div>

            {/* Event Card 2 */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-blue-500 font-semibold text-sm">UPCOMING</span>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>NBA</span>
                </div>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>2h 15m</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">LAL</div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Lakers</span>
                </div>
                <span className={`text-lg font-bold text-emerald-600`}>1.85</span>
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">GSW</div>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Warriors</span>
                </div>
                <span className={`text-lg font-bold text-emerald-600`}>2.15</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Pool</div>
                  <div className="font-bold text-emerald-600">{currency.symbol}89,500</div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Place Bet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-emerald-600 to-emerald-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Betting?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join over 1 million users who trust Play ChaCha for secure, fair, and exciting peer-to-peer sports betting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Create Account
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

