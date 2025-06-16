import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// Inline CSS for modern, competitive UI
const appStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap' );
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' );

  :root {
    --primary-gradient: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
    --secondary-gradient: linear-gradient(135deg, #fc6767 0%, #ec008c 100%);
    --dark-bg: #1a1a2e;
    --card-bg: rgba(255, 255, 255, 0.08);
    --text-color: #e0e0e0;
    --accent-color: #00e676;
    --border-color: rgba(255, 255, 255, 0.15);
    --input-bg: rgba(255, 255, 255, 0.1);
    --button-hover: rgba(255, 255, 255, 0.15);
    --modal-backdrop: rgba(0, 0, 0, 0.7);
    --live-red: #ff4d4d;
    --live-pulse: rgba(255, 77, 77, 0.5);
  }

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: var(--dark-bg);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header */
  .header {
    background: var(--dark-bg);
    padding: 15px 0;
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 28px;
    font-weight: 800;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
    letter-spacing: -1px;
    cursor: pointer;
  }

  .nav-links {
    display: flex;
    gap: 25px;
  }

  .nav-link {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.3s ease, transform 0.2s ease;
    position: relative;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    bottom: -5px;
    left: 0;
    transition: width 0.3s ease;
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  .nav-link:hover {
    color: var(--accent-color);
    transform: translateY(-2px);
  }

  .user-controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .balance-display {
    background: var(--card-bg);
    padding: 8px 15px;
    border-radius: 25px;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .balance-display i {
    color: var(--accent-color);
  }

  .auth-button, .action-button {
    background: var(--primary-gradient);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    font-size: 15px;
    white-space: nowrap;
  }

  .auth-button:hover, .action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  .auth-button.secondary {
    background: var(--secondary-gradient);
  }

  .language-selector {
    background: var(--input-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 8px 12px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    appearance: none;
    -webkit-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23e0e0e0" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>' );
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 30px;
  }

  .language-selector option {
    background-color: var(--dark-bg);
    color: var(--text-color);
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); /* Dark, subtle gradient */
  }

  .hero-background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6); /* Dark overlay for text readability */
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 20px;
  }

  .hero-title {
    font-size: 56px;
    font-weight: 800;
    margin-bottom: 20px;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.1;
  }

  .hero-subtitle {
    font-size: 22px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 30px;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-top: 40px;
  }

  .stat-item {
    background: var(--card-bg);
    padding: 15px 25px;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-color);
  }

  .stat-number {
    font-size: 32px;
    font-weight: 700;
    color: var(--accent-color);
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
  }

  /* Live Now Section */
  .live-now-section {
    padding: 60px 0;
    background: var(--dark-bg);
  }

  .section-title {
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 40px;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .live-events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  .event-card {
    background: var(--card-bg);
    border-radius: 15px;
    padding: 25px;
    border: 1px solid var(--border-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .event-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .event-sport {
    font-size: 14px;
    font-weight: 600;
    color: var(--accent-color);
    text-transform: uppercase;
  }

  .live-badge {
    background: var(--live-red);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 var(--live-pulse); }
    70% { box-shadow: 0 0 0 10px rgba(255, 77, 77, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); }
  }

  .teams {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .team-name {
    font-size: 20px;
    font-weight: 700;
    color: white;
  }

  .score {
    font-size: 24px;
    font-weight: 800;
    color: var(--accent-color);
  }

  .odds-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 20px;
  }

  .odd-button {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 12px 10px;
    text-align: center;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-color);
  }

  .odd-button:hover {
    background: var(--button-hover);
    transform: translateY(-2px);
  }

  .odd-value {
    color: var(--accent-color);
    font-size: 18px;
    font-weight: 700;
    margin-top: 5px;
  }

  /* How-To Guide */
  .how-to-section {
    padding: 60px 0;
    background: linear-gradient(135deg, #24243e, #302b63);
  }

  .how-to-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }

  .step-card {
    background: var(--card-bg);
    border-radius: 15px;
    padding: 30px;
    text-align: center;
    border: 1px solid var(--border-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .step-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .step-icon {
    font-size: 48px;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }

  .step-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 10px;
    color: white;
  }

  .step-description {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
  }

  /* Payment Gateways */
  .payment-section {
    padding: 60px 0;
    background: var(--dark-bg);
  }

  .payment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    justify-items: center;
  }

  .payment-logo {
    background: var(--card-bg);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 100%;
    max-width: 150px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .payment-logo:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .payment-logo img {
    max-width: 100%;
    max-height: 100%;
    filter: grayscale(100%) brightness(150%);
    transition: filter 0.3s ease;
  }

  .payment-logo:hover img {
    filter: grayscale(0%) brightness(100%);
  }

  /* Social Media */
  .social-section {
    padding: 60px 0;
    background: linear-gradient(135deg, #24243e, #302b63);
    text-align: center;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-top: 30px;
  }

  .social-icon {
    font-size: 36px;
    color: var(--text-color);
    transition: color 0.3s ease, transform 0.2s ease;
  }

  .social-icon:hover {
    transform: translateY(-3px);
  }

  .social-icon.fa-twitter:hover { color: #1DA1F2; }
  .social-icon.fa-instagram:hover { background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .social-icon.fa-facebook-f:hover { color: #1877F2; }
  .social-icon.fa-youtube:hover { color: #FF0000; }
  .social-icon.fa-tiktok:hover { color: #69C9D0; }

  /* Footer */
  .footer {
    background: var(--dark-bg);
    padding: 40px 0;
    border-top: 1px solid var(--border-color);
    text-align: center;
    margin-top: auto;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 25px;
    margin-bottom: 20px;
  }

  .footer-link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-weight: 500;
    font-size: 15px;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: var(--accent-color);
  }

  .copyright {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Modals */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--modal-backdrop);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    backdrop-filter: blur(5px);
  }

  .modal-content {
    background: var(--dark-bg);
    padding: 30px;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    position: relative;
    border: 1px solid var(--border-color);
  }

  .modal-close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 24px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .modal-close-button:hover {
    color: var(--accent-color);
  }

  .modal-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 25px;
    text-align: center;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--text-color);
  }

  .form-group input {
    width: calc(100% - 20px);
    padding: 12px 10px;
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-color);
    font-size: 16px;
  }

  .form-group input:focus {
    outline: none;
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(0, 230, 118, 0.3);
  }

  .form-error {
    color: var(--live-red);
    font-size: 14px;
    margin-top: 5px;
  }

  .modal-button {
    width: 100%;
    padding: 15px;
    background: var(--primary-gradient);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }

  .modal-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }

  .modal-text-link {
    text-align: center;
    margin-top: 20px;
    font-size: 15px;
  }

  .modal-text-link span {
    color: var(--accent-color);
    cursor: pointer;
    text-decoration: none;
    font-weight: 600;
  }

  .google-auth-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 12px;
    background: #4285F4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-top: 20px;
  }

  .google-auth-button:hover {
    background: #357ae8;
  }

  .google-auth-button i {
    font-size: 20px;
  }

  .guest-login-button {
    background: var(--card-bg);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    margin-top: 15px;
  }

  .guest-login-button:hover {
    background: var(--button-hover);
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .header-content {
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
    }
    .nav-links {
      width: 100%;
      justify-content: center;
      margin-top: 10px;
      gap: 15px;
    }
    .user-controls {
      width: 100%;
      justify-content: center;
      margin-top: 10px;
    }
    .hero-title {
      font-size: 40px;
    }
    .hero-subtitle {
      font-size: 18px;
    }
    .hero-buttons {
      flex-direction: column;
      gap: 15px;
    }
    .hero-stats {
      flex-direction: column;
      gap: 20px;
    }
    .section-title {
      font-size: 30px;
    }
    .live-events-grid, .how-to-steps, .payment-grid {
      grid-template-columns: 1fr;
    }
    .odd-button {
      padding: 10px 8px;
      font-size: 14px;
    }
    .odd-value {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    .logo {
      font-size: 24px;
    }
    .nav-link {
      font-size: 14px;
    }
    .auth-button, .action-button {
      padding: 8px 15px;
      font-size: 14px;
    }
    .balance-display {
      font-size: 13px;
      padding: 6px 12px;
    }
    .language-selector {
      padding: 6px 10px;
      font-size: 13px;
    }
    .hero-title {
      font-size: 32px;
    }
    .hero-subtitle {
      font-size: 16px;
    }
    .stat-number {
      font-size: 28px;
    }
    .stat-label {
      font-size: 14px;
    }
    .event-card {
      padding: 20px;
    }
    .team-name {
      font-size: 18px;
    }
    .score {
      font-size: 20px;
    }
    .modal-content {
      padding: 20px;
    }
    .modal-title {
      font-size: 24px;
    }
    .form-group input {
      padding: 10px;
      font-size: 14px;
    }
    .modal-button {
      padding: 12px;
      font-size: 16px;
    }
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = appStyles;
document.head.appendChild(styleSheet);

// Context for Authentication
const AuthContext = createContext(null);

const API_BASE = 'https://playchacha-backend-p2p.onrender.com/api'; // Updated to P2P backend

export const AuthProvider = ({ children } ) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    const fetchUserProfile = useCallback(async (authToken) => {
        if (!authToken) {
            setUser(null);
            setBalance(0);
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${API_BASE}/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                setBalance(data.user.balance);
            } else {
                const errorData = await response.json();
                console.error('Failed to fetch user profile:', errorData.message);
                logout(); // Logout if token is invalid
            }
        } catch (error) {
            console.error('Network error fetching user profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchUserProfile(token);
        } else {
            setLoading(false);
        }
    }, [token, fetchUserProfile]);

    const login = async (email, password) => {
        setAuthError(null);
        try {
            const response = await fetch(`${API_BASE}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                await fetchUserProfile(data.token);
                return { success: true };
            } else {
                setAuthError(data.message || 'Login failed');
                return { success: false, message: data.message };
            }
        } catch (error) {
            setAuthError('Network error. Please try again.');
            return { success: false, message: 'Network error.' };
        }
    };

    const register = async (username, email, password) => {
        setAuthError(null);
        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                await fetchUserProfile(data.token);
                return { success: true };
            } else {
                setAuthError(data.message || 'Registration failed');
                return { success: false, message: data.message };
            }
        } catch (error) {
            setAuthError('Network error. Please try again.');
            return { success: false, message: 'Network error.' };
        }
    };

    const loginAsGuest = async () => {
        setAuthError(null);
        try {
            const response = await fetch(`${API_BASE}/auth/guest_login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                await fetchUserProfile(data.token);
                return { success: true };
            } else {
                setAuthError(data.message
