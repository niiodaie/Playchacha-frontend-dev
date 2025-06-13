import React, { useState, useEffect, createContext, useContext } from 'react';

// Enhanced inline CSS with captivating sports images
const enhancedStylesWithImages = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif !important;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  min-height: 100vh;
}

.App {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.nav-link {
  padding: 0.75rem 1.5rem;
  border: none;
  background: transparent;
  color: #555;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.nav-link.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.language-selector {
  padding: 0.5rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  background: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.language-selector:hover {
  border-color: #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.login-btn, .register-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.login-btn {
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
}

.login-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.register-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid transparent;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.welcome-text {
  color: #555;
  font-weight: 500;
}

.balance-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.logout-btn {
  padding: 0.5rem 1rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #ff3742;
  transform: translateY(-1px);
}

/* Hero Section with Sports Background */
.hero-section {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23667eea" width="1200" height="600"/><g fill="rgba(255,255,255,0.1)"><circle cx="200" cy="150" r="80"/><circle cx="800" cy="300" r="120"/><circle cx="1000" cy="100" r="60"/></g></svg>');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
  background-size: cover;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  opacity: 0.8;
}

.hero-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn-primary, .btn-secondary {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
}

.social-proof {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  opacity: 0.8;
  flex-wrap: wrap;
}

.social-proof-text {
  font-size: 0.9rem;
}

.trust-badges {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.trust-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Enhanced Live Events Section with Sport-Specific Backgrounds */
.live-events-section {
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}

.section-header {
  max-width: 1200px;
  margin: 0 auto 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.live-badge {
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.view-all-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Events Grid with Sport-Specific Backgrounds */
.events-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.event-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.event-card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background-size: cover;
  background-position: center;
  opacity: 0.3;
  z-index: 1;
}

.event-card-background.nfl {
  background-image: linear-gradient(rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23228B22" width="400" height="200"/><g stroke="%23fff" stroke-width="2" fill="none"><line x1="0" y1="50" x2="400" y2="50"/><line x1="0" y1="100" x2="400" y2="100"/><line x1="0" y1="150" x2="400" y2="150"/></g></svg>');
}

.event-card-background.nba {
  background-image: linear-gradient(rgba(255, 140, 0, 0.8), rgba(255, 69, 0, 0.8)),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23D2691E" width="400" height="200"/><circle cx="200" cy="100" r="80" stroke="%23fff" stroke-width="3" fill="none"/></svg>');
}

.event-card-background.soccer {
  background-image: linear-gradient(rgba(34, 139, 34, 0.8), rgba(0, 128, 0, 0.8)),
                    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200"><rect fill="%23228B22" width="400" height="200"/><circle cx="200" cy="100" r="30" stroke="%23fff" stroke-width="2" fill="none"/></svg>');
}

.event-card-content {
  position: relative;
  z-index: 2;
  padding: 1.5rem;
  background: linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1) 30%);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sport-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.live-indicator {
  background: #ff4757;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  animation: pulse 2s infinite;
}

.event-teams {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.team {
  text-align: center;
  flex: 1;
}

.team-name {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.team-score {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: #667eea;
}

.vs {
  font-weight: 800;
  color: #999;
  margin: 0 1rem;
}

.event-status {
  text-align: center;
  color: #666;
  font-weight: 500;
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.betting-odds {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.odds-btn {
  flex: 1;
  min-width: 100px;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.odds-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

/* User Guide Section with Celebration Background */
.user-guide-section {
  padding: 4rem 2rem;
  background: linear-gradient(rgba(248, 249, 250, 0.95), rgba(248, 249, 250, 0.95)),
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23f8f9fa" width="1200" height="600"/><g fill="rgba(102,126,234,0.1)"><circle cx="100" cy="100" r="50"/><circle cx="1100" cy="500" r="80"/><circle cx="600" cy="300" r="40"/></g></svg>');
  background-size: cover;
  background-position: center;
}

.guide-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.guide-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
}

.guide-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.guide-step {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.guide-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.guide-step:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.step-number {
  display: inline-block;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 40px;
  margin-bottom: 1rem;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.step-description {
  color: #666;
  line-height: 1.6;
}

.guide-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.guide-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

/* Features Section */
.features-section {
  padding: 4rem 2rem;
  background: white;
}

.features-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 3rem;
}

.features-grid {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  background: white;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* Social Media Section */
.social-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.social-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><g fill="rgba(255,255,255,0.1)"><circle cx="200" cy="150" r="80"/><circle cx="800" cy="300" r="120"/><circle cx="1000" cy="100" r="60"/></g></svg>');
  background-size: cover;
}

.social-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.social-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.social-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.social-icon {
  font-size: 1.5rem;
}

.newsletter-signup {
  background: rgba(255, 255, 255, 0.2);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.newsletter-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.newsletter-input {
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
}

.newsletter-btn {
  padding: 0.75rem 1.5rem;
  background: white;
  color: #667eea;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 2rem 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3, .footer-section h4 {
  margin-bottom: 1rem;
  color: white;
}

.footer-section p {
  color: #bdc3c7;
  line-height: 1.6;
}

.footer-section button {
  display: block;
  background: none;
  border: none;
  color: #bdc3c7;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: color 0.3s ease;
  text-align: left;
}

.footer-section button:hover {
  color: white;
}

.footer-section a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #2980b9;
}

.footer-social {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #34495e;
  color: white;
  text-decoration: none;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.footer-social-link:hover {
  background: #667eea;
  transform: translateY(-2px);
}

/* Video Modal */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 2rem;
}

.video-content {
  position: relative;
  max-width: 800px;
  width: 100%;
}

.video-player {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.video-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  color: #333;
  font-weight: 700;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #999;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  background: #ff4757;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
}

.full-width {
  width: 100%;
}

.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: white;
  color: #333;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-google:hover {
  border-color: #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.google-icon {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #4285f4, #34a853, #fbbc05, #ea4335);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
}

.divider {
  text-align: center;
  position: relative;
  margin: 1rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e1e5e9;
}

.divider span {
  background: white;
  padding: 0 1rem;
  color: #999;
  font-weight: 500;
}

.auth-switch {
  text-align: center;
  margin-top: 1rem;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.link-btn:hover {
  color: #5a67d8;
}

/* Bet Message */
.bet-message {
  position: fixed;
  top: 100px;
  right: 20px;
  background: #2ecc71;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 8px 25px rgba(46, 204, 113, 0.3);
  z-index: 1001;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }
  
  .events-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .guide-steps {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-input {
    min-width: auto;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
  }
  
  .betting-odds {
    flex-direction: column;
  }
  
  .odds-btn {
    min-width: auto;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 4rem 1rem;
  }
  
  .live-events-section, .features-section, .user-guide-section, .social-section {
    padding: 2rem 1rem;
  }
  
  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .event-teams {
    flex-direction: column;
    gap: 1rem;
  }
  
  .vs {
    margin: 0;
  }
}
`;

// AuthContext (same as before)
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'https://48xhpiqc8wkx.manus.space/api';

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return { success: false, error: errorData.message };
      }
    } catch (err) {
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
        return { success: false, error: errorData.message };
      }
    } catch (err) {
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const placeBet = async (eventId, betType, amount, odds) => {
    if (!user) return { success: false, error: 'Please login first' };
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/bets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId, betType, amount, odds })
      });
      
      if (response.ok) {
        const data = await response.json();
        setUser(prev => ({ ...prev, balance: data.newBalance }));
        return { success: true, bet: data.bet };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (err) {
      return { success: false, error: 'Network error' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, placeBet, loading, error, setError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Video Modal Component
const VideoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="video-modal" onClick={onClose}>
      <div className="video-content" onClick={e => e.stopPropagation()}>
        <button className="video-close" onClick={onClose}>×</button>
        <video className="video-player" controls autoPlay>
          <source src="/playchacha_intro_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

// User Guide Modal Component
const UserGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '600px', maxHeight: '80vh'}}>
        <div className="modal-header">
          <h2>How to Get Started</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div style={{overflowY: 'auto'}}>
          <div className="guide-steps">
            <div className="guide-step">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">Sign up with email or Google for instant access</p>
            </div>
            
            <div className="guide-step">
              <div className="step-number">2</div>
              <h3 className="step-title">Add Funds</h3>
              <p className="step-description">Deposit money using cards, PayPal, or crypto</p>
            </div>
            
            <div className="guide-step">
              <div className="step-number">3</div>
              <h3 className="step-title">Place Bets</h3>
              <p className="step-description">Click any odds button to place your first bet</p>
            </div>
          </div>
          
          <div style={{textAlign: 'center', marginTop: '2rem'}}>
            <h3>Pro Tips:</h3>
            <ul style={{textAlign: 'left', maxWidth: '400px', margin: '1rem auto'}}>
              <li>Start with small bets ($5-10)</li>
              <li>Research teams before betting</li>
              <li>Use live betting for better odds</li>
              <li>Set daily limits to stay in control</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// LoginModal Component
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      onClose();
      setEmail('');
      setPassword('');
    }
  };

  const handleGoogleLogin = () => {
    alert('Google OAuth integration coming soon!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login to PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <button type="button" className="btn-google full-width" onClick={handleGoogleLogin}>
            <div className="google-icon">G</div>
            Continue with Google
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-switch">
          Don't have an account?{' '}
          <button className="link-btn" onClick={onSwitchToRegister}>
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};

// RegisterModal Component
const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const { register, loading, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    const result = await register(email, password, name);
    if (result.success) {
      onClose();
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
    }
  };

  const handleGoogleRegister = () => {
    alert('Google OAuth integration coming soon!');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Join PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <button type="button" className="btn-google full-width" onClick={handleGoogleRegister}>
            <div className="google-icon">G</div>
            Sign up with Google
          </button>
          
          <div className="divider">
            <span>or</span>
          </div>
          
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          
          <button type="submit" className="btn-primary full-width" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-switch">
          Already have an account?{' '}
          <button className="link-btn" onClick={onSwitchToLogin}>
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Enhanced Visual Features
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [betMessage, setBetMessage] = useState('');

  // Inject enhanced styles with images
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = enhancedStylesWithImages;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://48xhpiqc8wkx.manus.space/api/events');
        if (response.ok) {
          const data = await response.json();
          setEvents(data.events || []);
        }
      } catch (error) {
        // Fallback to mock data with sport types
        setEvents([
          {
            id: 1,
            sport: 'NFL',
            homeTeam: 'Kansas City Chiefs',
            awayTeam: 'Buffalo Bills',
            homeScore: 21,
            awayScore: 17,
            status: '3rd Quarter',
            isLive: true,
            odds: { home: 1.85, draw: 3.4, away: 2.1 }
          },
          {
            id: 2,
            sport: 'NBA',
            homeTeam: 'Los Angeles Lakers',
            awayTeam: 'Golden State Warriors',
            homeScore: 89,
            awayScore: 92,
            status: '4th Quarter',
            isLive: true,
            odds: { home: 2.1, away: 1.75 }
          },
          {
            id: 3,
            sport: 'Soccer',
            homeTeam: 'Manchester United',
            awayTeam: 'Liverpool',
            homeScore: 1,
            awayScore: 2,
            status: '75th Minute',
            isLive: true,
            odds: { home: 2.5, draw: 3.2, away: 1.9 }
          }
        ]);
      }
    };

    fetchEvents();
    const interval = setInterval(fetchEvents, 30000);
    return () => clearInterval(interval);
  }, []);

  const languages = {
    en: { flag: '🇺🇸', name: 'EN' },
    es: { flag: '🇪🇸', name: 'ES' },
    pt: { flag: '🇧🇷', name: 'PT' },
    fr: { flag: '🇫🇷', name: 'FR' },
    de: { flag: '🇩🇪', name: 'DE' }
  };

  const translations = {
    en: {
      home: 'Home',
      sports: 'Sports',
      live: 'LIVE',
      myBets: 'My Bets',
      login: 'Login',
      register: 'Register',
      heroTitle: 'The Ultimate Sports Betting Experience',
      heroSubtitle: 'Join millions of players worldwide and experience the thrill of live sports betting with real-time odds and instant payouts.',
      startBetting: 'Start Betting Now',
      watchDemo: 'Watch Demo',
      liveEvents: 'Live Events',
      viewAllSports: 'View All Sports',
      whyChoose: 'Why Choose PlayChaCha?',
      liveBetting: 'Live Betting',
      liveBettingDesc: 'Bet on live games with real-time odds',
      instantPayouts: 'Instant Payouts',
      instantPayoutsDesc: 'Get your winnings instantly',
      globalSports: 'Global Sports',
      globalSportsDesc: 'Bet on sports from around the world',
      securePlatform: 'Secure Platform',
      securePlatformDesc: 'Your money and data are always safe'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const { user, logout, placeBet } = useAuth();

  const handleBetClick = async (event, betType, odds) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const amount = 10; // Default bet amount
    const result = await placeBet(event.id, betType, amount, odds);
    
    if (result.success) {
      setBetMessage(`Bet placed successfully! $${amount} on ${betType}`);
      setTimeout(() => setBetMessage(''), 3000);
    } else {
      setBetMessage(`Bet failed: ${result.error}`);
      setTimeout(() => setBetMessage(''), 3000);
    }
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Thanks for subscribing with ${email}! You'll receive our latest updates and betting tips.`);
    e.target.reset();
  };

  const getSportBackgroundClass = (sport) => {
    const sportLower = sport.toLowerCase();
    if (sportLower.includes('nfl') || sportLower.includes('football')) return 'nfl';
    if (sportLower.includes('nba') || sportLower.includes('basketball')) return 'nba';
    if (sportLower.includes('soccer') || sportLower.includes('football')) return 'soccer';
    return 'nfl'; // default
  };

  const renderHomePage = () => (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t.heroTitle}</h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">2M+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$50M+</span>
              <span className="stat-label">Paid Out</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Live Support</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => user ? setCurrentPage('sports') : setShowLoginModal(true)}>
              {t.startBetting}
            </button>
            <button className="btn-secondary" onClick={() => setShowVideoModal(true)}>
              {t.watchDemo}
            </button>
          </div>
          
          <div className="social-proof">
            <span className="social-proof-text">Trusted by millions worldwide</span>
            <div className="trust-badges">
              <span className="trust-badge">🔒 SSL Secured</span>
              <span className="trust-badge">⚡ Instant Payouts</span>
              <span className="trust-badge">🏆 Licensed</span>
            </div>
          </div>
        </div>
      </section>

      <section className="live-events-section">
        <div className="section-header">
          <h2>
            {t.liveEvents} {events.filter(e => e.isLive).length} <span className="live-badge">LIVE</span>
          </h2>
          <button className="view-all-btn" onClick={() => setCurrentPage('sports')}>
            {t.viewAllSports}
          </button>
        </div>
        
        <div className="events-grid">
          {events.slice(0, 4).map(event => (
            <div key={event.id} className="event-card">
              <div className={`event-card-background ${getSportBackgroundClass(event.sport)}`}></div>
              <div className="event-card-content">
                <div className="event-header">
                  <span className="sport-tag">{event.sport}</span>
                  {event.isLive && <span className="live-indicator">LIVE</span>}
                </div>
                
                <div className="event-teams">
                  <div className="team">
                    <span className="team-name">{event.homeTeam}</span>
                    <span className="team-score">{event.homeScore || 0}</span>
                  </div>
                  <span className="vs">VS</span>
                  <div className="team">
                    <span className="team-name">{event.awayTeam}</span>
                    <span className="team-score">{event.awayScore || 0}</span>
                  </div>
                </div>
                
                <div className="event-status">{event.status}</div>
                
                <div className="betting-odds">
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'home', event.odds.home)}
                  >
                    {event.homeTeam} {event.odds.home}
                  </button>
                  {event.odds.draw && (
                    <button 
                      className="odds-btn"
                      onClick={() => handleBetClick(event, 'draw', event.odds.draw)}
                    >
                      Draw {event.odds.draw}
                    </button>
                  )}
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'away', event.odds.away)}
                  >
                    {event.awayTeam} {event.odds.away}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="user-guide-section">
        <div className="guide-content">
          <h2 className="guide-title">How to Get Started</h2>
          <div className="guide-steps">
            <div className="guide-step">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">Sign up with email or Google for instant access to all features</p>
            </div>
            <div className="guide-step">
              <div className="step-number">2</div>
              <h3 className="step-title">Add Funds</h3>
              <p className="step-description">Deposit money using cards, PayPal, crypto, or bank transfer</p>
            </div>
            <div className="guide-step">
              <div className="step-number">3</div>
              <h3 className="step-title">Place Bets</h3>
              <p className="step-description">Click any odds button to place your first bet and start winning</p>
            </div>
          </div>
          <button className="guide-cta" onClick={() => setShowGuideModal(true)}>
            View Complete Guide
          </button>
        </div>
      </section>

      <section className="features-section">
        <h2 className="features-title">{t.whyChoose}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>{t.liveBetting}</h3>
            <p>{t.liveBettingDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>{t.instantPayouts}</h3>
            <p>{t.instantPayoutsDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>{t.globalSports}</h3>
            <p>{t.globalSportsDesc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>{t.securePlatform}</h3>
            <p>{t.securePlatformDesc}</p>
          </div>
        </div>
      </section>

      <section className="social-section">
        <div className="social-content">
          <h2 className="social-title">Join Our Community</h2>
          <p className="social-subtitle">Follow us for betting tips, live updates, and exclusive promotions</p>
          
          <div className="social-links">
            <a href="https://twitter.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
            <a href="https://instagram.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📸</span>
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📘</span>
              <span>Facebook</span>
            </a>
            <a href="https://youtube.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📺</span>
              <span>YouTube</span>
            </a>
          </div>
          
          <div className="newsletter-signup">
            <h3 className="newsletter-title">Get Betting Tips & Updates</h3>
            <form className="newsletter-form" onSubmit={handleNewsletterSignup}>
              <input 
                type="email" 
                name="email"
                className="newsletter-input" 
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );

  const renderSportsPage = () => (
    <div className="sports-page">
      <section className="live-events-section">
        <div className="section-header">
          <h2>All Sports Events</h2>
        </div>
        
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className={`event-card-background ${getSportBackgroundClass(event.sport)}`}></div>
              <div className="event-card-content">
                <div className="event-header">
                  <span className="sport-tag">{event.sport}</span>
                  {event.isLive && <span className="live-indicator">LIVE</span>}
                </div>
                
                <div className="event-teams">
                  <div className="team">
                    <span className="team-name">{event.homeTeam}</span>
                    <span className="team-score">{event.homeScore || 0}</span>
                  </div>
                  <span className="vs">VS</span>
                  <div className="team">
                    <span className="team-name">{event.awayTeam}</span>
                    <span className="team-score">{event.awayScore || 0}</span>
                  </div>
                </div>
                
                <div className="event-status">{event.status}</div>
                
                <div className="betting-odds">
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'home', event.odds.home)}
                  >
                    {event.homeTeam} {event.odds.home}
                  </button>
                  {event.odds.draw && (
                    <button 
                      className="odds-btn"
                      onClick={() => handleBetClick(event, 'draw', event.odds.draw)}
                    >
                      Draw {event.odds.draw}
                    </button>
                  )}
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'away', event.odds.away)}
                  >
                    {event.awayTeam} {event.odds.away}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderMyBetsPage = () => (
    <div className="my-bets-page">
      <section className="live-events-section">
        <div className="section-header">
          <h2>My Bets</h2>
        </div>
        
        {user ? (
          <div style={{textAlign: 'center', padding: '2rem'}}>
            <p style={{fontSize: '1.2rem', marginBottom: '1rem'}}>Welcome {user.name}!</p>
            <p style={{fontSize: '1.1rem', marginBottom: '2rem'}}>Balance: ${user.balance || 1000}</p>
            <p>Your betting history will appear here.</p>
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '2rem'}}>
            <p style={{marginBottom: '2rem'}}>Please login to view your bets.</p>
            <button className="btn-primary" onClick={() => setShowLoginModal(true)}>
              Login
            </button>
          </div>
        )}
      </section>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'sports':
        return renderSportsPage();
      case 'live':
        return renderSportsPage(); // Same as sports for now
      case 'myBets':
        return renderMyBetsPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="App">
      {betMessage && (
        <div className="bet-message">
          {betMessage}
        </div>
      )}

      <header className="header">
        <div className="header-content">
          <button className="logo" onClick={() => setCurrentPage('home')}>
            PlayChaCha.net
          </button>
          
          <nav className="nav">
            <button 
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              {t.home}
            </button>
            <button 
              className={`nav-link ${currentPage === 'sports' ? 'active' : ''}`}
              onClick={() => setCurrentPage('sports')}
            >
              {t.sports}
            </button>
            <button 
              className={`nav-link ${currentPage === 'live' ? 'active' : ''}`}
              onClick={() => setCurrentPage('live')}
            >
              {t.live}
            </button>
            <button 
              className={`nav-link ${currentPage === 'myBets' ? 'active' : ''}`}
              onClick={() => setCurrentPage('myBets')}
            >
              {t.myBets}
            </button>
          </nav>
          
          <div className="header-actions">
            <select 
              className="language-selector"
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
            >
              {Object.entries(languages).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            
            {user ? (
              <div className="user-menu">
                <span className="welcome-text">Welcome, {user.name}!</span>
                <span className="balance-text">${user.balance || 1000}</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                  {t.login}
                </button>
                <button className="register-btn" onClick={() => setShowRegisterModal(true)}>
                  {t.register}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main>
        {renderCurrentPage()}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PlayChaCha.net</h3>
            <p>The ultimate sports betting experience</p>
            <div className="footer-social">
              <a href="https://twitter.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                🐦
              </a>
              <a href="https://instagram.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                📸
              </a>
              <a href="https://facebook.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                📘
              </a>
              <a href="https://youtube.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                📺
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <button onClick={() => setCurrentPage('sports')}>Sports</button>
            <button onClick={() => setCurrentPage('live')}>Live Betting</button>
            <button onClick={() => setCurrentPage('myBets')}>My Bets</button>
            <button onClick={() => setShowGuideModal(true)}>How to Play</button>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <button onClick={() => alert('Help center coming soon!')}>Help Center</button>
            <button onClick={() => alert('Contact form coming soon!')}>Contact Us</button>
            <button onClick={() => alert('Terms coming soon!')}>Terms of Service</button>
            <button onClick={() => alert('Privacy policy coming soon!')}>Privacy Policy</button>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <p>Powered by <a href="https://visnec.com" target="_blank" rel="noopener noreferrer">Visnec</a></p>
            <p>Licensed & Regulated</p>
            <p>© 2025 PlayChaCha.net</p>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />

      <VideoModal 
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />

      <UserGuideModal 
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />
    </div>
  );
}

// Wrap App with AuthProvider
const AppWithAuth = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuth;

