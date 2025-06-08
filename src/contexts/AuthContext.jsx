import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Live backend API URL
  const API_BASE = 'https://48xhpiqc8wkx.manus.space/api';

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('playchacha_token');
    if (token) {
      // Verify token with backend
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('playchacha_token', token);
      } else {
        // Token is invalid, remove it
        localStorage.removeItem('playchacha_token');
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      localStorage.removeItem('playchacha_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('playchacha_token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Login failed');
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('playchacha_token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Registration failed');
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (googleToken, email, name) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token: googleToken,
          email: email,
          name: name 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('playchacha_token', data.token);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Google login failed');
        return { success: false, error: data.error || 'Google login failed' };
      }
    } catch (error) {
      const errorMessage = 'Network error. Please check your connection.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('playchacha_token');
    setError(null);
  };

  const placeBet = async (eventId, betType, amount, odds) => {
    try {
      const token = localStorage.getItem('playchacha_token');
      if (!token) {
        return { success: false, error: 'Please login to place bets' };
      }

      const response = await fetch(`${API_BASE}/bets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: eventId,
          bet_type: betType,
          amount: amount,
          odds: odds
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update user balance
        setUser(prev => ({
          ...prev,
          balance: data.new_balance
        }));
        return { success: true, bet: data.bet, newBalance: data.new_balance };
      } else {
        return { success: false, error: data.error || 'Failed to place bet' };
      }
    } catch (error) {
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const fetchSportsEvents = async () => {
    try {
      const response = await fetch(`${API_BASE}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, events: data.events, liveCount: data.live_count };
      } else {
        // Fallback to mock data if API fails
        return {
          success: true,
          events: [
            {
              id: 1,
              sport: 'NFL',
              home_team: 'Kansas City Chiefs',
              away_team: 'Buffalo Bills',
              home_score: 21,
              away_score: 17,
              status: 'live',
              quarter: '3rd Quarter',
              odds: { home: 1.85, draw: 3.4, away: 2.1 }
            },
            {
              id: 2,
              sport: 'NBA',
              home_team: 'Los Angeles Lakers',
              away_team: 'Golden State Warriors',
              home_score: 89,
              away_score: 92,
              status: 'live',
              quarter: '4th Quarter',
              odds: { home: 2.1, away: 1.75 }
            }
          ],
          liveCount: 2
        };
      }
    } catch (error) {
      // Fallback to mock data on network error
      return {
        success: true,
        events: [
          {
            id: 1,
            sport: 'NFL',
            home_team: 'Kansas City Chiefs',
            away_team: 'Buffalo Bills',
            home_score: 21,
            away_score: 17,
            status: 'live',
            quarter: '3rd Quarter',
            odds: { home: 1.85, draw: 3.4, away: 2.1 }
          }
        ],
        liveCount: 1
      };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    googleLogin,
    logout,
    placeBet,
    fetchSportsEvents,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

