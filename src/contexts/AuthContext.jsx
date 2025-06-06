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
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Update this to your backend URL when you deploy the backend
  const API_BASE = 'https://your-render-backend.onrender.com/api';

  // Helper function for API calls using fetch (no axios needed)
  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const data = await apiCall('/auth/me');
          setUser(data.user);
        } catch (error) {
          console.error('Auth check failed:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      
      const { access_token, user } = data;
      setToken(access_token);
      setUser(user);
      localStorage.setItem('token', access_token);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await apiCall('/auth/register', {
        method: 'POST',
        body: { name, email, password }
      });
      
      const { access_token, user } = data;
      setToken(access_token);
      setUser(user);
      localStorage.setItem('token', access_token);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  };

  const googleLogin = async (googleToken) => {
    try {
      const data = await apiCall('/auth/google', {
        method: 'POST',
        body: { token: googleToken }
      });
      
      const { access_token, user } = data;
      setToken(access_token);
      setUser(user);
      localStorage.setItem('token', access_token);
      
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Google login failed' 
      };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await apiCall('/auth/forgot-password', {
        method: 'POST',
        body: { email }
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Password reset failed' 
      };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await apiCall('/auth/reset-password', {
        method: 'POST',
        body: { token, password }
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Password reset failed' 
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateProfile = async (profileData) => {
    try {
      const data = await apiCall('/user/profile', {
        method: 'PUT',
        body: profileData
      });
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Profile update failed' 
      };
    }
  };

  const placeBet = async (betData) => {
    try {
      const data = await apiCall('/bets', {
        method: 'POST',
        body: betData
      });
      return { success: true, bet: data.bet };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Bet placement failed' 
      };
    }
  };

  const getUserBets = async () => {
    try {
      const data = await apiCall('/bets');
      return { success: true, bets: data.bets };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Failed to fetch bets' 
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    googleLogin,
    forgotPassword,
    resetPassword,
    logout,
    updateProfile,
    placeBet,
    getUserBets,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

