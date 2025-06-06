import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useCurrency } from '../contexts/CurrencyContext';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Play, 
  TrendingUp,
  Trophy,
  Target,
  Zap,
  Users,
  ChevronRight,
  Calendar,
  MapPin
} from 'lucide-react';

const SportsPage = () => {
  const { theme } = useTheme();
  const { currency } = useCurrency();
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('popular');

  const isDark = theme === 'dark';

  const sports = [
    { id: 'all', name: 'All Sports', icon: Trophy, count: 1247 },
    { id: 'football', name: 'Football', icon: Target, count: 342 },
    { id: 'basketball', name: 'Basketball', icon: Target, count: 189 },
    { id: 'tennis', name: 'Tennis', icon: Target, count: 156 },
    { id: 'baseball', name: 'Baseball', icon: Target, count: 98 },
    { id: 'soccer', name: 'Soccer', icon: Target, count: 234 },
  ];

  const filters = [
    { id: 'popular', name: 'Popular', icon: Star },
    { id: 'live', name: 'Live Now', icon: Play },
    { id: 'upcoming', name: 'Upcoming', icon: Clock },
    { id: 'trending', name: 'Trending', icon: TrendingUp },
  ];

  const liveEvents = [
    {
      id: 1,
      sport: 'Premier League',
      homeTeam: 'Liverpool',
      awayTeam: 'Manchester City',
      homeScore: 2,
      awayScore: 1,
      time: "78'",
      status: 'live',
      totalPool: 245000,
      homeOdds: 1.85,
      awayOdds: 2.15,
      viewers: 15420
    },
    {
      id: 2,
      sport: 'NBA',
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      homeScore: 98,
      awayScore: 102,
      time: "Q4 2:45",
      status: 'live',
      totalPool: 189500,
      homeOdds: 2.10,
      awayOdds: 1.75,
      viewers: 12890
    },
    {
      id: 3,
      sport: 'Champions League',
      homeTeam: 'Barcelona',
      awayTeam: 'PSG',
      homeScore: 0,
      awayScore: 0,
      time: "15'",
      status: 'live',
      totalPool: 567000,
      homeOdds: 1.95,
      awayOdds: 1.90,
      viewers: 28750
    }
  ];

  const upcomingEvents = [
    {
      id: 4,
      sport: 'NFL',
      homeTeam: 'Chiefs',
      awayTeam: 'Bills',
      date: '2025-06-08',
      time: '20:00',
      status: 'upcoming',
      totalPool: 125000,
      homeOdds: 1.90,
      awayOdds: 1.95,
      location: 'Arrowhead Stadium'
    },
    {
      id: 5,
      sport: 'La Liga',
      homeTeam: 'Real Madrid',
      awayTeam: 'Atletico Madrid',
      date: '2025-06-09',
      time: '21:00',
      status: 'upcoming',
      totalPool: 445000,
      homeOdds: 1.75,
      awayOdds: 2.25,
      location: 'Santiago Bernabeu'
    }
  ];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                Sports Betting
              </h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Bet against other users on live and upcoming sports events worldwide
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search events..."
                  className={`pl-10 pr-4 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500`}
                />
              </div>
              
              {/* Filter */}
              <button className={`flex items-center space-x-2 px-4 py-2 border ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'} rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors`}>
                <Filter className="w-5 h-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sports Categories */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6 mb-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Sports
              </h3>
              <div className="space-y-2">
                {sports.map((sport) => {
                  const Icon = sport.icon;
                  return (
                    <button
                      key={sport.id}
                      onClick={() => setSelectedSport(sport.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedSport === sport.id
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : isDark
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{sport.name}</span>
                      </div>
                      <span className={`text-sm ${selectedSport === sport.id ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500'}`}>
                        {sport.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                Filters
              </h3>
              <div className="space-y-2">
                {filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedFilter === filter.id
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                          : isDark
                          ? 'hover:bg-gray-700 text-gray-300'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{filter.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Live Events */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Live Events
                  </h2>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${isDark ? 'bg-red-900/20 text-red-400' : 'bg-red-100 text-red-800'}`}>
                    {liveEvents.length} Live
                  </span>
                </div>
                <button className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700 transition-colors">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid gap-6">
                {liveEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6 hover:shadow-lg transition-shadow`}
                  >
                    {/* Event Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-500 font-semibold text-sm">LIVE</span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{event.sport}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Users className="w-4 h-4" />
                          <span>{event.viewers.toLocaleString()}</span>
                        </div>
                        <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {event.time}
                        </span>
                      </div>
                    </div>

                    {/* Teams and Score */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-6">
                      {/* Home Team */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {event.homeTeam.substring(0, 3).toUpperCase()}
                          </div>
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {event.homeTeam}
                          </span>
                        </div>
                        <button className="w-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                          {event.homeOdds}
                        </button>
                      </div>

                      {/* Score */}
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>
                          {event.homeScore} - {event.awayScore}
                        </div>
                        <div className="text-center">
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Pool</div>
                          <div className="font-bold text-emerald-600">
                            {currency.symbol}{event.totalPool.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Away Team */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-2">
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {event.awayTeam}
                          </span>
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {event.awayTeam.substring(0, 3).toUpperCase()}
                          </div>
                        </div>
                        <button className="w-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                          {event.awayOdds}
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <button className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors">
                        <Play className="w-4 h-4" />
                        <span className="font-medium">Watch Live</span>
                      </button>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Join Bet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Upcoming Events
                </h2>
                <button className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700 transition-colors">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="grid gap-6">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl border ${isDark ? 'border-gray-700' : 'border-gray-200'} p-6 hover:shadow-lg transition-shadow`}
                  >
                    {/* Event Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-500 font-semibold text-sm">UPCOMING</span>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{event.sport}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Teams and Odds */}
                    <div className="grid grid-cols-3 gap-4 items-center mb-4">
                      {/* Home Team */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {event.homeTeam.substring(0, 3).toUpperCase()}
                          </div>
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {event.homeTeam}
                          </span>
                        </div>
                        <button className="w-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                          {event.homeOdds}
                        </button>
                      </div>

                      {/* VS and Pool */}
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                          VS
                        </div>
                        <div className="text-center">
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Total Pool</div>
                          <div className="font-bold text-emerald-600">
                            {currency.symbol}{event.totalPool.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Away Team */}
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-2">
                          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {event.awayTeam}
                          </span>
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {event.awayTeam.substring(0, 3).toUpperCase()}
                          </div>
                        </div>
                        <button className="w-full bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                          {event.awayOdds}
                        </button>
                      </div>
                    </div>

                    {/* Location and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                        Place Bet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsPage;

