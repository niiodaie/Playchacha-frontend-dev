import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password) {
      setFormError('Please fill in all fields');
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      onClose();
    } else {
      setFormError(result.error);
    }
  };

  const handleGoogleLogin = async () => {
    // Simulate Google login for demo
    const result = await login('demo@google.com', 'demo123');
    if (result.success) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login to PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {(formError || error) && (
            <div className="error-message">
              {formError || error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary full-width"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button 
            type="button"
            className="btn-google"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          <div className="auth-switch">
            <p>
              Don't have an account?{' '}
              <button 
                type="button"
                className="link-btn"
                onClick={onSwitchToRegister}
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

