import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const { login, googleLogin, forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(email, password);
    
    if (result.success) {
      onClose();
      setEmail('');
      setPassword('');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    // Implement Google Sign-In
    // This requires Google Identity Services setup
    try {
      // Mock Google token for demo
      const mockGoogleToken = 'mock-google-token-' + Date.now();
      const result = await googleLogin(mockGoogleToken);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Google login failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    const result = await forgotPassword(email);
    
    if (result.success) {
      setError('');
      alert('Password reset link sent to your email');
      setShowForgotPassword(false);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {showForgotPassword ? 'Reset Password' : 'Sign In'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <button
              type="button"
              onClick={() => setShowForgotPassword(false)}
              className="w-full mt-2 text-blue-600 hover:text-blue-800"
            >
              Back to Sign In
            </button>
          </form>
        ) : (
          <>
            <button
              onClick={handleGoogleLogin}
              className="w-full mb-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center justify-center"
            >
              <span className="mr-2">🔍</span>
              Continue with Google
            </button>

            <div className="text-center mb-4 text-gray-500">or</div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Forgot your password?
              </button>
            </div>

            <div className="mt-4 text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
