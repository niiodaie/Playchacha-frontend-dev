import React from 'react';

const LivePage = ({ events, onPlaceBet, t }) => {
  const liveEvents = events.filter(event => event.status === 'LIVE');

  return (
    <div className="live-page">
      <div className="page-header">
        <h1 className="page-title">
          <span className="live-indicator"></span>
          Live Events
        </h1>
        <p className="page-subtitle">Real-time betting on live sports events</p>
      </div>

      <div className="live-stats">
        <div className="stat-item">
          <div className="stat-number">{liveEvents.length}</div>
          <div className="stat-label">Live Events</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2.4M</div>
          <div className="stat-label">Active Bets</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">$12.8M</div>
          <div className="stat-label">Live Volume</div>
        </div>
      </div>

      {/* Live Events */}
      <div className="live-events-container">
        {liveEvents.map((event) => (
          <div key={event.id} className="live-event-card">
            <div className="live-header">
              <div className="event-info">
                <span className="event-league">{event.icon} {event.league}</span>
                <span className="live-badge">🔴 LIVE</span>
              </div>
              <div className="event-time">{event.time}</div>
            </div>
            
            <div className="live-matchup">
              <div className="team-section">
                <div className="team-info">
                  <div className="team-name">{event.teams[0]}</div>
                  <div className="team-score">{event.scores[0]}</div>
                </div>
              </div>
              
              <div className="vs-section">
                <div className="vs">VS</div>
              </div>
              
              <div className="team-section">
                <div className="team-info">
                  <div className="team-name">{event.teams[1]}</div>
                  <div className="team-score">{event.scores[1]}</div>
                </div>
              </div>
            </div>

            <div className="live-betting">
              <div className="betting-header">
                <h4>Live Betting</h4>
                <span className="odds-update">Odds updating...</span>
              </div>
              
              <div className="betting-odds">
                <button 
                  className="odds-button live"
                  onClick={() => onPlaceBet(event.id, 'home', event.odds?.home || 1.85)}
                >
                  <div className="bet-team">{event.teams[0]}</div>
                  <div className="odds-value">{event.odds?.home || '1.85'}</div>
                  <div className="odds-change">+0.05</div>
                </button>
                
                {event.odds?.draw && (
                  <button 
                    className="odds-button live"
                    onClick={() => onPlaceBet(event.id, 'draw', event.odds.draw)}
                  >
                    <div className="bet-team">Draw</div>
                    <div className="odds-value">{event.odds.draw}</div>
                    <div className="odds-change">-0.02</div>
                  </button>
                )}
                
                <button 
                  className="odds-button live"
                  onClick={() => onPlaceBet(event.id, 'away', event.odds?.away || 2.10)}
                >
                  <div className="bet-team">{event.teams[1]}</div>
                  <div className="odds-value">{event.odds?.away || '2.10'}</div>
                  <div className="odds-change">-0.03</div>
                </button>
              </div>
            </div>

            <div className="live-activity">
              <div className="activity-item">
                <span className="activity-icon">⚽</span>
                <span className="activity-text">Goal! {event.teams[0]} scores</span>
                <span className="activity-time">2 min ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">💰</span>
                <span className="activity-text">$2,500 bet placed on {event.teams[1]}</span>
                <span className="activity-time">5 min ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {liveEvents.length === 0 && (
        <div className="no-live-events">
          <h3>No Live Events</h3>
          <p>Check back soon for live sports action!</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default LivePage;

