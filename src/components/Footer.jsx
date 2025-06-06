import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Users
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl gradient-text">Play ChaCha</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The world's premier peer-to-peer sports betting platform. 
              Bet against other users on real sports events globally with 
              secure escrow and instant payouts.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/betting" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  to="/sports" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Sports Events
                </Link>
              </li>
              <li>
                <Link 
                  to="/help" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/responsible-gambling" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Responsible Gambling
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/compliance" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Compliance
                </Link>
              </li>
              <li>
                <Link 
                  to="/licenses" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a 
                  href="mailto:support@playchacha.net" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  support@playchacha.net
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a 
                  href="tel:+1-800-CHACHA" 
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                >
                  +1 (800) CHACHA
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  123 Betting Street<br />
                  Gaming District<br />
                  Las Vegas, NV 89101
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="py-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-sm">SSL Secured</div>
                <div className="text-xs text-muted-foreground">256-bit encryption</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Award className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-sm">Licensed & Regulated</div>
                <div className="text-xs text-muted-foreground">Multiple jurisdictions</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="h-6 w-6 text-primary" />
              <div className="text-left">
                <div className="font-semibold text-sm">1M+ Users</div>
                <div className="text-xs text-muted-foreground">Trusted globally</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Play ChaCha. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Part of the Visnec Nexus ecosystem</span>
              <a 
                href="https://visnec.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-200"
              >
                visnec.ai
              </a>
            </div>
          </div>
        </div>

        {/* Age Verification Notice */}
        <div className="py-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              You must be 18+ to use this service. Gambling can be addictive. 
              Please play responsibly. If you need help, visit{' '}
              <a 
                href="https://www.begambleaware.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors duration-200"
              >
                BeGambleAware.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

