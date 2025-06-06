import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const MyBetsPage = ({ t }) => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const { getUserBets } = useAuth();

  // Mock bets data for demo
  const mockBets = [
    {
      id: 1,
      event: 'Kansas City Chiefs vs Buffalo Bills',
      betType: 'home',
      team: 'Kansas City Chiefs',
      amount: 50,
      odds: 1.85,
      potentialWin: 92.50,
      status: 'active',
      placedAt: '2025-06-06T18:30:00Z',
      sport: 'Football',
      league: 'NFL',
      icon: '🏈'
    },
    {
      id: 2,
      event: 'Los Angeles Lakers vs Golden State Warriors',
      betType: 'away',
      team: 'Golden State Warriors',
      amount: 25,
      odds: 1.75,
      potentialWin: 43.75,
      status: 'won',
      placedAt: '2025-06-05T20:00:00Z',
      settledAt: '2025-06-05T22:30:00Z',
      sport: 'Basketball',
      league: 'NBA',
      icon: '🏀'
    },
    {
      id: 3,
      event: 'Real Madrid vs FC Barcelona',
      betType: 'draw',
      team: 'Draw',
      amount: 30,
      odds: 3.20,
      potentialWin: 96.00,
      status: 'lost',
      placedAt: '2025-06-04T19:00:00Z',
      settledAt: '2025-06-04T21:00:00Z',
      sport: 'Soccer',
      league: 'La Liga',
      icon: '⚽'
    }
  ];

  useEffect(() => {
    const fetchBets = async () => {
      try {
        const result = await getUserBets();
        if (result.success) {
          setBets(result.bets);
        } else {
          // Use mock data for demo
          setBets(mockBets);
        }
      } catch (error) {
        console.error('Failed to fetch bets:', error);
        setBets(mockBets);
      } finally {
        setLoading(false);
      }
    };

    fetchBets();
  }, []);

  const filteredBets = bets.filter(bet => {
    if (activeTab === 'active') return bet.status === 'active';
    if (activeTab === 'won') return bet.status === 'won';
    if (activeTab === 'lost') return bet.status === 'lost';
    return true;
  });

  const totalStats = {
    totalBets: bets.length,
    activeBets: bets.filter(bet => bet.status === 'active').length,
    wonBets: bets.filter(bet => bet.status === 'won').length,
    lostBets: bets.filter(bet => bet.status === 'lost').length,
    totalWagered: bets.reduce((sum, bet) => sum + bet.amount, 0),
    totalWon: bets.filter(bet => bet.status === 'won').reduce((sum, bet) => sum + bet.potentialWin, 0),
    winRate: bets.length > 0 ? ((bets.filter(bet => bet.status === 'won').length / bets.filter(bet => bet.status !== 'active').length) * 100).toFixed(1) : 0
  };

  if (loading) {
    return (
      <div className="my-bets-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your bets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bets-page">
      <div className="page-header">
        <h1 className="page-title">My Bets</h1>
        <p className="page-subtitle">Track your betting history and performance</p>
      </div>

      {/* Stats Overview */}
      <div className="betting-stats">
        <div className="stat-card">
          <div className="stat-value">{totalStats.totalBets}</div>
          <div className="stat-label">Total Bets</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalStats.activeBets}</div>
          <div className="stat-label">Active Bets</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalStats.totalWagered}</div>
          <div className="stat-label">Total Wagered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">${totalStats.totalWon}</div>
          <div className="stat-label">Total Won</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalStats.winRate}%</div>
          <div className="stat-label">Win Rate</div>
        </div>
      </div>

      {/* Bet Tabs */}
      <div className="bet-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Bets ({bets.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active ({totalStats.activeBets})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'won' ? 'active' : ''}`}
          onClick={() => setActiveTab('won')}
        >
          Won ({totalStats.wonBets})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'lost' ? 'active' : ''}`}
          onClick={() => setActiveTab('lost')}
        >
          Lost ({totalStats.lostBets})
        </button>
      </div>

      {/* Bets List */}
      <div className="bets-list">
        {filteredBets.map((bet) => (
          <div key={bet.id} className={`bet-card ${bet.status}`}>
            <div className="bet-header">
              <div className="bet-event">
                <span className="event-icon">{bet.icon}</span>
                <div className="event-details">
                  <div className="event-name">{bet.event}</div>
                  <div className="event-league">{bet.league}</div>
                </div>
              </div>
              <div className={`bet-status ${bet.status}`}>
                {bet.status.charAt(0).toUpperCase() + bet.status.slice(1)}
              </div>
            </div>

            <div className="bet-details">
              <div className="bet-selection">
                <div className="selection-label">Your Bet</div>
                <div className="selection-value">{bet.team}</div>
              </div>
              <div className="bet-amount">
                <div className="amount-label">Amount</div>
                <div className="amount-value">${bet.amount}</div>
              </div>
              <div className="bet-odds">
                <div className="odds-label">Odds</div>
                <div className="odds-value">{bet.odds}</div>
              </div>
              <div className="bet-potential">
                <div className="potential-label">
                  {bet.status === 'won' ? 'Won' : bet.status === 'lost' ? 'Lost' : 'Potential Win'}
                </div>
                <div className={`potential-value ${bet.status}`}>
                  ${bet.potentialWin.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="bet-footer">
              <div className="bet-time">
                Placed: {new Date(bet.placedAt).toLocaleDateString()} at {new Date(bet.placedAt).toLocaleTimeString()}
              </div>
              {bet.settledAt && (
                <div className="bet-settled">
                  Settled: {new Date(bet.settledAt).toLocaleDateString()} at {new Date(bet.settledAt).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredBets.length === 0 && (
        <div className="no-bets">
          <h3>No bets found</h3>
          <p>
            {activeTab === 'active' && "You don't have any active bets."}
            {activeTab === 'won' && "You haven't won any bets yet."}
            {activeTab === 'lost' && "You haven't lost any bets yet."}
            {activeTab === 'all' && "You haven't placed any bets yet."}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '#sports'}
          >
            Place Your First Bet
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBetsPage;

