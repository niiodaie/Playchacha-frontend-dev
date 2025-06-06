import React from 'react';

const SportsPage = ({ events, onPlaceBet, t }) => {
  const sportCategories = ['All', 'Football', 'Basketball', 'Soccer', 'Tennis', 'Baseball'];
  const [selectedSport, setSelectedSport] = React.useState('All');

  const filteredEvents = selectedSport === 'All' 
    ? events 
    : events.filter(event => event.sport === selectedSport);

  return (
    <div className="sports-page">
      <div className="page-header">
        <h1 className="page-title">All Sports</h1>
        <p className="page-subtitle">Choose from thousands of live and upcoming events</p>
      </div>

      {/* Sport Filter */}
      <div className="sport-filter">
        {sportCategories.map(sport => (
          <button
            key={sport}
            className={`filter-btn ${selectedSport === sport ? 'active' : ''}`}
            onClick={() => setSelectedSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card-large">
            <div className="event-header">
              <span className="event-league">{event.icon} {event.league}</span>
              <span className={`event-status ${event.status.toLowerCase()}`}>{event.status}</span>
            </div>
            
            <div className="event-matchup">
              <div className="team">
                <div className="team-name">{event.teams[0]}</div>
                <div className="team-score">{event.scores[0]}</div>
              </div>
              <div className="vs">VS</div>
              <div className="team">
                <div className="team-name">{event.teams[1]}</div>
                <div className="team-score">{event.scores[1]}</div>
              </div>
            </div>

            <div className="event-time">{event.time}</div>

            <div className="betting-section">
              <h4>Place Your Bet</h4>
              <div className="betting-odds">
                <button 
                  className="odds-button large"
                  onClick={() => onPlaceBet(event.id, 'home', event.odds?.home || 1.85)}
                >
                  <div className="bet-label">{event.teams[0]}</div>
                  <div className="odds-value">{event.odds?.home || '1.85'}</div>
                </button>
                {event.odds?.draw && (
                  <button 
                    className="odds-button large"
                    onClick={() => onPlaceBet(event.id, 'draw', event.odds.draw)}
                  >
                    <div className="bet-label">Draw</div>
                    <div className="odds-value">{event.odds.draw}</div>
                  </button>
                )}
                <button 
                  className="odds-button large"
                  onClick={() => onPlaceBet(event.id, 'away', event.odds?.away || 2.10)}
                >
                  <div className="bet-label">{event.teams[1]}</div>
                  <div className="odds-value">{event.odds?.away || '2.10'}</div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="no-events">
          <h3>No events found for {selectedSport}</h3>
          <p>Try selecting a different sport category</p>
        </div>
      )}
    </div>
  );
};

export default SportsPage;

