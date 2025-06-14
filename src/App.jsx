import React, { useState, useEffect, createContext, useContext } from 'react';

// Enhanced CSS with hero background images and improved styling
const enhancedStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

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

.login-btn, .register-btn, .guest-btn {
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

.guest-btn {
  background: #2ecc71;
  color: white;
  border: 2px solid transparent;
  font-size: 0.9rem;
}

.guest-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(46, 204, 113, 0.3);
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

/* Hero Section with Background Images */
.hero-section {
  background: 
    linear-gradient(135deg, rgba(102, 126, 234, 0.85) 0%, rgba(118, 75, 162, 0.85) 100%),
    url('https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80') center/cover,
    url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=2093&q=80') center/cover;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
  animation: heroAnimation 20s ease-in-out infinite;
}

@keyframes heroAnimation {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
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
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
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
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
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

/* Live Matches Ticker */
.live-ticker {
  background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
  color: white;
  padding: 1rem 0;
  overflow: hidden;
  position: relative;
  border-top: 3px solid rgba(255, 255, 255, 0.3);
  border-bottom: 3px solid rgba(255, 255, 255, 0.3);
}

.live-ticker-content {
  display: flex;
  animation: scroll 30s linear infinite;
  white-space: nowrap;
}

@keyframes scroll {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.live-match {
  margin-right: 3rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Live Events Section - Enhanced */
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

/* Events Grid */
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

.event-card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sport-tag {
  font-weight: 600;
  font-size: 0.9rem;
}

.live-indicator {
  background: #2ecc71;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  animation: pulse 2s infinite;
}

.event-card-content {
  padding: 1.5rem;
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

/* How-to Guide Section */
.how-to-section {
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}

.how-to-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.how-to-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
}

.how-to-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.how-to-step {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.how-to-step::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.how-to-step:hover {
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

/* Affiliate Section */
.affiliate-section {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  text-align: center;
}

.affiliate-content {
  max-width: 800px;
  margin: 0 auto;
}

.affiliate-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.affiliate-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 3rem;
}

.affiliate-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.affiliate-feature {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.affiliate-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.affiliate-feature h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.affiliate-cta {
  padding: 1rem 2rem;
  background: white;
  color: #2ecc71;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.affiliate-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
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

/* Payment Methods */
.payment-section {
  padding: 4rem 2rem;
  background: white;
}

.payment-content {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.payment-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.payment-method {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 15px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.payment-method:hover {
  border-color: #667eea;
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
}

.payment-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #667eea;
}

.payment-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.payment-description {
  color: #666;
  font-size: 0.9rem;
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

.success-message {
  background: #2ecc71;
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

/* Location Banner */
.location-banner {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  padding: 0.75rem 2rem;
  text-align: center;
  font-weight: 500;
  position: relative;
}

.location-banner button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  margin-left: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.location-banner button:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* AdSense Container */
.adsense-container {
  margin: 2rem 0;
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  border: 1px solid #e1e5e9;
}

.adsense-label {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
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
  
  .how-to-steps {
    grid-template-columns: 1fr;
  }
  
  .social-links {
    flex-direction: column;
    align-items: center;
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
  
  .payment-methods {
    grid-template-columns: 1fr;
  }
  
  .affiliate-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 4rem 1rem;
  }
  
  .live-events-section, .how-to-section, .social-section, .payment-section, .affiliate-section {
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

// AuthContext with enhanced features and guest access
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  const API_BASE = 'https://48xhpiqc8wkx.manus.space/api';

  const loginAsGuest = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@playchacha.net',
      balance: 1000,
      isGuest: true
    };
    setUser(guestUser);
    setIsGuest(true);
    localStorage.setItem('guestUser', JSON.stringify(guestUser));
    return { success: true };
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      // Simulate successful login for demo purposes
      const mockUser = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        balance: 1000,
        isGuest: false
      };
      
      setUser(mockUser);
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError('Login successful! (Demo mode)');
      // Still login for demo
      const mockUser = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email,
        balance: 1000,
        isGuest: false
      };
      setUser(mockUser);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    setError('');
    try {
      // Simulate successful registration for demo purposes
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        balance: 1000,
        isGuest: false
      };
      
      setUser(mockUser);
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError('Registration successful! (Demo mode)');
      // Still register for demo
      const mockUser = {
        id: Date.now(),
        name: name,
        email: email,
        balance: 1000,
        isGuest: false
      };
      setUser(mockUser);
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      // Simulate Google OAuth for demo
      const mockUser = {
        id: 'google-' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        balance: 1000,
        isGuest: false,
        provider: 'google'
      };
      
      setUser(mockUser);
      localStorage.setItem('token', 'google-token-' + Date.now());
      localStorage.setItem('user', JSON.stringify(mockUser));
      return { success: true };
    } catch (err) {
      setError('Google login successful! (Demo mode)');
      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsGuest(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('guestUser');
  };

  const placeBet = async (eventId, betType, amount, odds) => {
    if (!user) return { success: false, error: 'Please login first' };
    
    if (user.balance < amount) {
      return { success: false, error: 'Insufficient balance' };
    }
    
    // Simulate bet placement
    const newBalance = user.balance - amount;
    const updatedUser = { ...user, balance: newBalance };
    setUser(updatedUser);
    
    if (user.isGuest) {
      localStorage.setItem('guestUser', JSON.stringify(updatedUser));
    } else {
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return { success: true, bet: { id: Date.now(), eventId, betType, amount, odds } };
  };

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedGuestUser = localStorage.getItem('guestUser');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else if (savedGuestUser) {
      setUser(JSON.parse(savedGuestUser));
      setIsGuest(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user, login, register, logout, placeBet, loading, error, setError,
      isGuest, loginAsGuest, googleLogin
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

// Geolocation and Translation Hook
const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          
          try {
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            const data = await response.json();
            setCountry(data.countryCode);
          } catch (error) {
            console.log('Could not get country from coordinates');
          }
        },
        (error) => {
          console.log('Geolocation error:', error);
        }
      );
    }
  }, []);

  return { location, country };
};

// Enhanced Sports API with more realistic data
const useSportsAPI = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRealSportsData = async () => {
    setLoading(true);
    try {
      // Enhanced mock data with more realistic sports events
      const enhancedEvents = [
        {
          id: 1,
          sport: 'NFL',
          homeTeam: 'Kansas City Chiefs',
          awayTeam: 'Buffalo Bills',
          homeScore: 21,
          awayScore: 17,
          status: '3rd Quarter - 8:42',
          isLive: true,
          odds: { home: 1.85, away: 2.1 }
        },
        {
          id: 2,
          sport: 'NBA',
          homeTeam: 'Los Angeles Lakers',
          awayTeam: 'Golden State Warriors',
          homeScore: 89,
          awayScore: 92,
          status: '4th Quarter - 2:15',
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
        },
        {
          id: 4,
          sport: 'NHL',
          homeTeam: 'Toronto Maple Leafs',
          awayTeam: 'Boston Bruins',
          homeScore: 3,
          awayScore: 2,
          status: '2nd Period - 12:30',
          isLive: true,
          odds: { home: 1.95, away: 1.85 }
        },
        {
          id: 5,
          sport: 'MLB',
          homeTeam: 'New York Yankees',
          awayTeam: 'Boston Red Sox',
          homeScore: 7,
          awayScore: 4,
          status: '8th Inning',
          isLive: true,
          odds: { home: 1.65, away: 2.25 }
        },
        {
          id: 6,
          sport: 'Tennis',
          homeTeam: 'Novak Djokovic',
          awayTeam: 'Rafael Nadal',
          homeScore: 2,
          awayScore: 1,
          status: 'Set 4 - 3-2',
          isLive: true,
          odds: { home: 1.75, away: 2.05 }
        },
        {
          id: 7,
          sport: 'Soccer',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          homeScore: 0,
          awayScore: 1,
          status: '45th Minute',
          isLive: true,
          odds: { home: 2.2, draw: 3.1, away: 2.8 }
        },
        {
          id: 8,
          sport: 'NBA',
          homeTeam: 'Miami Heat',
          awayTeam: 'Boston Celtics',
          homeScore: 78,
          awayScore: 82,
          status: '3rd Quarter - 5:30',
          isLive: true,
          odds: { home: 1.9, away: 1.95 }
        }
      ];

      setEvents(enhancedEvents);
    } catch (error) {
      console.error('Sports API error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealSportsData();
    const interval = setInterval(fetchRealSportsData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { events, loading, refetch: fetchRealSportsData };
};

// AdSense Component
const AdSenseAd = ({ slot, format = 'auto', responsive = true }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className="adsense-container">
      <div className="adsense-label">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6074565478510564"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

// LoginModal Component
const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleLogin, loading, error, setError } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      onClose();
      setEmail('');
      setPassword('');
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    if (result.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Login to PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="success-message">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <button type="button" className="btn-google full-width" onClick={handleGoogleLogin}>
            <div className="google-icon">G</div>
            Sign in with Google
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
  const { register, googleLogin, loading, error, setError } = useAuth();

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

  const handleGoogleRegister = async () => {
    const result = await googleLogin();
    if (result.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Join PlayChaCha</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {error && <div className="success-message">{error}</div>}
        
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

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [betMessage, setBetMessage] = useState('');
  const [showLocationBanner, setShowLocationBanner] = useState(true);

  // Custom hooks
  const { location, country } = useGeolocation();
  const { events, loading: eventsLoading } = useSportsAPI();

  // Inject enhanced styles and AdSense script
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = enhancedStyles;
    document.head.appendChild(styleElement);
    
    // Add AdSense script
    const adsenseScript = document.createElement('script');
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6074565478510564';
    adsenseScript.crossOrigin = 'anonymous';
    adsenseScript.async = true;
    document.head.appendChild(adsenseScript);
    
    return () => {
      document.head.removeChild(styleElement);
      if (document.head.contains(adsenseScript)) {
        document.head.removeChild(adsenseScript);
      }
    };
  }, []);

  // Auto-detect language based on location
  useEffect(() => {
    if (country) {
      const countryLanguageMap = {
        'US': 'en', 'CA': 'en', 'GB': 'en', 'AU': 'en',
        'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',
        'BR': 'pt', 'PT': 'pt',
        'FR': 'fr', 'BE': 'fr', 'CH': 'fr',
        'DE': 'de', 'AT': 'de',
        'CN': 'zh', 'TW': 'zh', 'HK': 'zh',
        'KE': 'sw', 'TZ': 'sw', 'UG': 'sw'
      };
      
      const detectedLanguage = countryLanguageMap[country] || 'en';
      if (detectedLanguage !== currentLanguage) {
        setCurrentLanguage(detectedLanguage);
      }
    }
  }, [country]);

  const languages = {
    en: { flag: '🇺🇸', name: 'EN' },
    es: { flag: '🇪🇸', name: 'ES' },
    pt: { flag: '🇧🇷', name: 'PT' },
    fr: { flag: '🇫🇷', name: 'FR' },
    de: { flag: '🇩🇪', name: 'DE' },
    zh: { flag: '🇨🇳', name: '中文' },
    sw: { flag: '🇰🇪', name: 'SW' }
  };

  const translations = {
    en: {
      home: 'Home',
      sports: 'Sports',
      live: 'LIVE',
      myBets: 'My Bets',
      login: 'Login',
      register: 'Register',
      guestAccess: 'Try as Guest',
      heroTitle: 'The Ultimate Sports Betting Experience',
      heroSubtitle: 'Join millions of players worldwide and experience the thrill of live sports betting with real-time odds and instant payouts.',
      startBetting: 'Start Betting Now',
      watchDemo: 'Watch Demo',
      liveEvents: 'Live Events',
      viewAllSports: 'View All Sports',
      howToTitle: 'How to Get Started',
      step1Title: 'Create Account',
      step1Desc: 'Sign up with email or Google for instant access',
      step2Title: 'Add Funds',
      step2Desc: 'Deposit money using cards, PayPal, or crypto',
      step3Title: 'Place Bets',
      step3Desc: 'Click any odds button to place your first bet',
      joinCommunity: 'Join Our Community',
      followUs: 'Follow us for betting tips, live updates, and exclusive promotions',
      globalPayments: 'Global Payment Methods',
      locationDetected: 'Location detected:',
      affiliateTitle: 'Earn with PlayChaCha Affiliate Program',
      affiliateSubtitle: 'Join thousands of partners earning up to 40% commission on every referral'
    },
    es: {
      home: 'Inicio',
      sports: 'Deportes',
      live: 'EN VIVO',
      myBets: 'Mis Apuestas',
      login: 'Iniciar Sesión',
      register: 'Registrarse',
      guestAccess: 'Probar como Invitado',
      heroTitle: 'La Experiencia Definitiva de Apuestas Deportivas',
      heroSubtitle: 'Únete a millones de jugadores en todo el mundo y experimenta la emoción de las apuestas deportivas en vivo.',
      startBetting: 'Comenzar a Apostar',
      watchDemo: 'Ver Demo',
      liveEvents: 'Eventos en Vivo',
      viewAllSports: 'Ver Todos los Deportes',
      howToTitle: 'Cómo Empezar',
      step1Title: 'Crear Cuenta',
      step1Desc: 'Regístrate con email o Google para acceso instantáneo',
      step2Title: 'Agregar Fondos',
      step2Desc: 'Deposita dinero usando tarjetas, PayPal o crypto',
      step3Title: 'Hacer Apuestas',
      step3Desc: 'Haz clic en cualquier cuota para hacer tu primera apuesta',
      joinCommunity: 'Únete a Nuestra Comunidad',
      followUs: 'Síguenos para consejos de apuestas, actualizaciones en vivo y promociones exclusivas',
      globalPayments: 'Métodos de Pago Globales',
      locationDetected: 'Ubicación detectada:',
      affiliateTitle: 'Gana con el Programa de Afiliados PlayChaCha',
      affiliateSubtitle: 'Únete a miles de socios que ganan hasta 40% de comisión por cada referido'
    },
    pt: {
      home: 'Início',
      sports: 'Esportes',
      live: 'AO VIVO',
      myBets: 'Minhas Apostas',
      login: 'Entrar',
      register: 'Cadastrar',
      guestAccess: 'Experimentar como Convidado',
      heroTitle: 'A Experiência Definitiva em Apostas Esportivas',
      heroSubtitle: 'Junte-se a milhões de jogadores em todo o mundo e experimente a emoção das apostas esportivas ao vivo.',
      startBetting: 'Começar a Apostar',
      watchDemo: 'Ver Demo',
      liveEvents: 'Eventos ao Vivo',
      viewAllSports: 'Ver Todos os Esportes',
      howToTitle: 'Como Começar',
      step1Title: 'Criar Conta',
      step1Desc: 'Cadastre-se com email ou Google para acesso instantâneo',
      step2Title: 'Adicionar Fundos',
      step2Desc: 'Deposite dinheiro usando cartões, PayPal ou crypto',
      step3Title: 'Fazer Apostas',
      step3Desc: 'Clique em qualquer odd para fazer sua primeira aposta',
      joinCommunity: 'Junte-se à Nossa Comunidade',
      followUs: 'Siga-nos para dicas de apostas, atualizações ao vivo e promoções exclusivas',
      globalPayments: 'Métodos de Pagamento Globais',
      locationDetected: 'Localização detectada:',
      affiliateTitle: 'Ganhe com o Programa de Afiliados PlayChaCha',
      affiliateSubtitle: 'Junte-se a milhares de parceiros ganhando até 40% de comissão por indicação'
    },
    fr: {
      home: 'Accueil',
      sports: 'Sports',
      live: 'EN DIRECT',
      myBets: 'Mes Paris',
      login: 'Connexion',
      register: 'S\'inscrire',
      guestAccess: 'Essayer en tant qu\'Invité',
      heroTitle: 'L\'Expérience Ultime de Paris Sportifs',
      heroSubtitle: 'Rejoignez des millions de joueurs dans le monde entier et découvrez le frisson des paris sportifs en direct.',
      startBetting: 'Commencer à Parier',
      watchDemo: 'Voir la Démo',
      liveEvents: 'Événements en Direct',
      viewAllSports: 'Voir Tous les Sports',
      howToTitle: 'Comment Commencer',
      step1Title: 'Créer un Compte',
      step1Desc: 'Inscrivez-vous avec email ou Google pour un accès instantané',
      step2Title: 'Ajouter des Fonds',
      step2Desc: 'Déposez de l\'argent en utilisant des cartes, PayPal ou crypto',
      step3Title: 'Placer des Paris',
      step3Desc: 'Cliquez sur n\'importe quelle cote pour placer votre premier pari',
      joinCommunity: 'Rejoignez Notre Communauté',
      followUs: 'Suivez-nous pour des conseils de paris, des mises à jour en direct et des promotions exclusives',
      globalPayments: 'Méthodes de Paiement Mondiales',
      locationDetected: 'Localisation détectée:',
      affiliateTitle: 'Gagnez avec le Programme d\'Affiliation PlayChaCha',
      affiliateSubtitle: 'Rejoignez des milliers de partenaires gagnant jusqu\'à 40% de commission par parrainage'
    },
    de: {
      home: 'Startseite',
      sports: 'Sport',
      live: 'LIVE',
      myBets: 'Meine Wetten',
      login: 'Anmelden',
      register: 'Registrieren',
      guestAccess: 'Als Gast versuchen',
      heroTitle: 'Das Ultimative Sportwetten-Erlebnis',
      heroSubtitle: 'Schließen Sie sich Millionen von Spielern weltweit an und erleben Sie den Nervenkitzel von Live-Sportwetten.',
      startBetting: 'Jetzt Wetten',
      watchDemo: 'Demo Ansehen',
      liveEvents: 'Live-Events',
      viewAllSports: 'Alle Sportarten Anzeigen',
      howToTitle: 'Wie Sie Anfangen',
      step1Title: 'Konto Erstellen',
      step1Desc: 'Melden Sie sich mit E-Mail oder Google für sofortigen Zugang an',
      step2Title: 'Geld Einzahlen',
      step2Desc: 'Zahlen Sie Geld mit Karten, PayPal oder Krypto ein',
      step3Title: 'Wetten Platzieren',
      step3Desc: 'Klicken Sie auf eine beliebige Quote, um Ihre erste Wette zu platzieren',
      joinCommunity: 'Treten Sie Unserer Gemeinschaft Bei',
      followUs: 'Folgen Sie uns für Wetttipps, Live-Updates und exklusive Aktionen',
      globalPayments: 'Globale Zahlungsmethoden',
      locationDetected: 'Standort erkannt:',
      affiliateTitle: 'Verdienen Sie mit dem PlayChaCha Affiliate-Programm',
      affiliateSubtitle: 'Schließen Sie sich Tausenden von Partnern an, die bis zu 40% Provision pro Empfehlung verdienen'
    },
    zh: {
      home: '首页',
      sports: '体育',
      live: '直播',
      myBets: '我的投注',
      login: '登录',
      register: '注册',
      guestAccess: '游客试用',
      heroTitle: '终极体育博彩体验',
      heroSubtitle: '加入全球数百万玩家，体验实时体育博彩的刺激。',
      startBetting: '开始投注',
      watchDemo: '观看演示',
      liveEvents: '直播赛事',
      viewAllSports: '查看所有体育项目',
      howToTitle: '如何开始',
      step1Title: '创建账户',
      step1Desc: '使用邮箱或Google注册即可立即访问',
      step2Title: '充值',
      step2Desc: '使用银行卡、PayPal或加密货币充值',
      step3Title: '下注',
      step3Desc: '点击任何赔率按钮进行首次投注',
      joinCommunity: '加入我们的社区',
      followUs: '关注我们获取投注技巧、实时更新和独家促销',
      globalPayments: '全球支付方式',
      locationDetected: '检测到位置:',
      affiliateTitle: '通过PlayChaCha联盟计划赚钱',
      affiliateSubtitle: '加入数千名合作伙伴，每次推荐可获得高达40%的佣金'
    },
    sw: {
      home: 'Nyumbani',
      sports: 'Michezo',
      live: 'MOJA KWA MOJA',
      myBets: 'Kubeti Zangu',
      login: 'Ingia',
      register: 'Jisajili',
      guestAccess: 'Jaribu kama Mgeni',
      heroTitle: 'Uzoefu wa Kubeti Michezo wa Juu',
      heroSubtitle: 'Jiunge na mamilioni ya wachezaji duniani kote na upate furaha ya kubeti michezo moja kwa moja.',
      startBetting: 'Anza Kubeti',
      watchDemo: 'Ona Onyesho',
      liveEvents: 'Matukio ya Moja kwa Moja',
      viewAllSports: 'Ona Michezo Yote',
      howToTitle: 'Jinsi ya Kuanza',
      step1Title: 'Tengeneza Akaunti',
      step1Desc: 'Jisajili kwa barua pepe au Google kwa ufikiaji wa haraka',
      step2Title: 'Ongeza Fedha',
      step2Desc: 'Weka fedha kwa kutumia kadi, PayPal au crypto',
      step3Title: 'Weka Kubeti',
      step3Desc: 'Bonyeza kitufe chochote cha uwezekano kuweka kubeti yako ya kwanza',
      joinCommunity: 'Jiunge na Jumuiya Yetu',
      followUs: 'Tufuate kwa vidokezo vya kubeti, masasisho ya moja kwa moja na matangazo maalum',
      globalPayments: 'Njia za Malipo za Kimataifa',
      locationDetected: 'Mahali pamegundulika:',
      affiliateTitle: 'Pata Pesa na Mpango wa Ushirika wa PlayChaCha',
      affiliateSubtitle: 'Jiunge na maelfu ya washirika wanaopata hadi 40% ya kamisheni kwa kila rufaa'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const { user, logout, placeBet, loginAsGuest } = useAuth();

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

  const getCountryName = (countryCode) => {
    const countryNames = {
      'US': 'United States', 'CA': 'Canada', 'GB': 'United Kingdom',
      'ES': 'Spain', 'MX': 'Mexico', 'BR': 'Brazil', 'PT': 'Portugal',
      'FR': 'France', 'DE': 'Germany', 'CN': 'China', 'KE': 'Kenya'
    };
    return countryNames[countryCode] || countryCode;
  };

  const liveEvents = events.filter(e => e.isLive);

  const renderLiveTicker = () => (
    <div className="live-ticker">
      <div className="live-ticker-content">
        {liveEvents.map(event => (
          <div key={event.id} className="live-match">
            <div className="live-dot"></div>
            <span>{event.homeTeam} {event.homeScore} - {event.awayScore} {event.awayTeam}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHomePage = () => (
    <>
      {showLocationBanner && country && (
        <div className="location-banner">
          {t.locationDetected} {getCountryName(country)} 🌍
          <button onClick={() => setShowLocationBanner(false)}>×</button>
        </div>
      )}

      {liveEvents.length > 0 && renderLiveTicker()}

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
            <div className="stat-item">
              <span className="stat-number">{liveEvents.length}</span>
              <span className="stat-label">Live Events</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => user ? setCurrentPage('sports') : setShowLoginModal(true)}>
              {t.startBetting}
            </button>
            <button className="btn-secondary" onClick={() => alert('Demo video coming soon!')}>
              {t.watchDemo}
            </button>
          </div>
        </div>
      </section>

      <AdSenseAd slot="1234567890" />

      <section className="how-to-section">
        <div className="how-to-content">
          <h2 className="how-to-title">{t.howToTitle}</h2>
          <div className="how-to-steps">
            <div className="how-to-step">
              <div className="step-number">1</div>
              <h3 className="step-title">{t.step1Title}</h3>
              <p className="step-description">{t.step1Desc}</p>
            </div>
            <div className="how-to-step">
              <div className="step-number">2</div>
              <h3 className="step-title">{t.step2Title}</h3>
              <p className="step-description">{t.step2Desc}</p>
            </div>
            <div className="how-to-step">
              <div className="step-number">3</div>
              <h3 className="step-title">{t.step3Title}</h3>
              <p className="step-description">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="live-events-section">
        <div className="section-header">
          <h2>
            {t.liveEvents} {liveEvents.length} <span className="live-badge">LIVE</span>
          </h2>
          <button className="view-all-btn" onClick={() => setCurrentPage('sports')}>
            {t.viewAllSports}
          </button>
        </div>
        
        <div className="events-grid">
          {events.slice(0, 6).map(event => (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <span className="sport-tag">{event.sport}</span>
                {event.isLive && <span className="live-indicator">LIVE</span>}
              </div>
              <div className="event-card-content">
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
                    {event.homeTeam} {event.odds.home?.toFixed(2)}
                  </button>
                  {event.odds.draw && (
                    <button 
                      className="odds-btn"
                      onClick={() => handleBetClick(event, 'draw', event.odds.draw)}
                    >
                      Draw {event.odds.draw.toFixed(2)}
                    </button>
                  )}
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'away', event.odds.away)}
                  >
                    {event.awayTeam} {event.odds.away?.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSenseAd slot="9876543210" />

      <section className="affiliate-section">
        <div className="affiliate-content">
          <h2 className="affiliate-title">{t.affiliateTitle}</h2>
          <p className="affiliate-subtitle">{t.affiliateSubtitle}</p>
          
          <div className="affiliate-features">
            <div className="affiliate-feature">
              <div className="affiliate-icon">💰</div>
              <h4>Up to 40% Commission</h4>
              <p>Earn the highest rates in the industry</p>
            </div>
            <div className="affiliate-feature">
              <div className="affiliate-icon">📊</div>
              <h4>Real-time Analytics</h4>
              <p>Track your performance with detailed reports</p>
            </div>
            <div className="affiliate-feature">
              <div className="affiliate-icon">🎯</div>
              <h4>Marketing Tools</h4>
              <p>Professional banners, links, and materials</p>
            </div>
            <div className="affiliate-feature">
              <div className="affiliate-icon">💳</div>
              <h4>Weekly Payouts</h4>
              <p>Get paid every week, no minimum threshold</p>
            </div>
          </div>
          
          <button className="affiliate-cta" onClick={() => alert('Affiliate program registration coming soon!')}>
            Join Affiliate Program
          </button>
        </div>
      </section>

      <section className="payment-section">
        <div className="payment-content">
          <h2 className="payment-title">{t.globalPayments}</h2>
          <div className="payment-methods">
            <div className="payment-method">
              <div className="payment-icon">💳</div>
              <div className="payment-name">Credit Cards</div>
              <div className="payment-description">Visa, Mastercard, Amex</div>
            </div>
            <div className="payment-method">
              <div className="payment-icon">📱</div>
              <div className="payment-name">Mobile Money</div>
              <div className="payment-description">M-Pesa, Airtel Money</div>
            </div>
            <div className="payment-method">
              <div className="payment-icon">🏦</div>
              <div className="payment-name">Bank Transfer</div>
              <div className="payment-description">PIX, SPEI, SEPA</div>
            </div>
            <div className="payment-method">
              <div className="payment-icon">₿</div>
              <div className="payment-name">Cryptocurrency</div>
              <div className="payment-description">Bitcoin, Ethereum, USDT</div>
            </div>
            <div className="payment-method">
              <div className="payment-icon">💰</div>
              <div className="payment-name">Digital Wallets</div>
              <div className="payment-description">PayPal, Skrill, Neteller</div>
            </div>
            <div className="payment-method">
              <div className="payment-icon">🎁</div>
              <div className="payment-name">Gift Cards</div>
              <div className="payment-description">iTunes, Google Play</div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-section">
        <div className="social-content">
          <h2 className="social-title">{t.joinCommunity}</h2>
          <p className="social-subtitle">{t.followUs}</p>
          
          <div className="social-links">
            <a href="https://twitter.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter social-icon"></i>
              <span>Twitter</span>
            </a>
            <a href="https://instagram.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram social-icon"></i>
              <span>Instagram</span>
            </a>
            <a href="https://facebook.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook social-icon"></i>
              <span>Facebook</span>
            </a>
            <a href="https://youtube.com/playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-youtube social-icon"></i>
              <span>YouTube</span>
            </a>
            <a href="https://tiktok.com/@playchacha" className="social-link" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok social-icon"></i>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );

  const renderSportsPage = () => (
    <div className="sports-page">
      {liveEvents.length > 0 && renderLiveTicker()}
      
      <section className="live-events-section">
        <div className="section-header">
          <h2>All Sports Events {eventsLoading && '(Loading...)'}</h2>
        </div>
        
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <span className="sport-tag">{event.sport}</span>
                {event.isLive && <span className="live-indicator">LIVE</span>}
              </div>
              <div className="event-card-content">
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
                    {event.homeTeam} {event.odds.home?.toFixed(2)}
                  </button>
                  {event.odds.draw && (
                    <button 
                      className="odds-btn"
                      onClick={() => handleBetClick(event, 'draw', event.odds.draw)}
                    >
                      Draw {event.odds.draw.toFixed(2)}
                    </button>
                  )}
                  <button 
                    className="odds-btn"
                    onClick={() => handleBetClick(event, 'away', event.odds.away)}
                  >
                    {event.awayTeam} {event.odds.away?.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <AdSenseAd slot="5555555555" />
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
            <p style={{fontSize: '1.2rem', marginBottom: '1rem'}}>
              Welcome {user.name}! {user.isGuest && '(Guest Mode)'}
            </p>
            <p style={{fontSize: '1.1rem', marginBottom: '2rem'}}>Balance: ${user.balance || 1000}</p>
            <p>Your betting history will appear here.</p>
            {user.isGuest && (
              <div style={{marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '10px'}}>
                <p style={{marginBottom: '1rem'}}>You're in guest mode. Create an account to save your bets!</p>
                <button className="btn-primary" onClick={() => setShowRegisterModal(true)}>
                  Create Account
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{textAlign: 'center', padding: '2rem'}}>
            <p style={{marginBottom: '2rem'}}>Please login to view your bets.</p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button className="btn-primary" onClick={() => setShowLoginModal(true)}>
                Login
              </button>
              <button className="guest-btn" onClick={loginAsGuest}>
                {t.guestAccess}
              </button>
            </div>
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
        return renderSportsPage();
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
                <span className="welcome-text">
                  Welcome, {user.name}! {user.isGuest && '(Guest)'}
                </span>
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
                <button className="guest-btn" onClick={loginAsGuest}>
                  {t.guestAccess}
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
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://youtube.com/playchacha" className="footer-social-link" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <button onClick={() => setCurrentPage('sports')}>Sports</button>
            <button onClick={() => setCurrentPage('live')}>Live Betting</button>
            <button onClick={() => setCurrentPage('myBets')}>My Bets</button>
            <button onClick={() => alert('Affiliate program coming soon!')}>Affiliate Program</button>
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

