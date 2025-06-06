# PlayChaCha Frontend

A modern, responsive React application for the PlayChaCha peer-to-peer sports betting platform. Built with Vite, React, and Tailwind CSS for optimal performance and user experience.

## 🚀 Features

- **Global Sports Betting**: Real-time sports events and live betting
- **Multi-Language Support**: 7 languages with auto-detection
- **Responsive Design**: Optimized for desktop and mobile
- **Real-Time Updates**: Live scores and event updates
- **Geolocation Detection**: Automatic language and region detection
- **Modern UI**: Professional design with smooth animations

## 🌍 Global Coverage

- **Languages**: English, Spanish, French, German, Portuguese, Chinese, Japanese
- **Regions**: North America, Europe, Asia-Pacific, Latin America, Africa
- **Sports**: NFL, NBA, Premier League, La Liga, Champions League, and more

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite with optimizations
- **Deployment**: Vercel-optimized

## 📦 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/playchacha/frontend.git
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file:
```env
VITE_API_URL=https://api.playchacha.net
VITE_API_VERSION=v1
VITE_APP_NAME=PlayChaCha
VITE_APP_ENVIRONMENT=production
```

## 🚀 Deployment

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/playchacha/frontend)

### Manual Deployment
```bash
# Build for production
npm run build

# Preview build
npm run preview
```

## 🌐 Multi-Region Support

The application automatically detects user location and adjusts:
- **Language**: Based on geographic location
- **Currency**: Regional currency preferences  
- **Sports**: Regional sports and leagues
- **Time Zones**: Local time display

## 🎨 Design System

- **Colors**: Blue (#1E40AF), Orange (#FF6B35), Purple (#7C3AED)
- **Typography**: Inter font family
- **Components**: Reusable, accessible components
- **Animations**: Smooth transitions and hover effects

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Optimization**: Touch-friendly interactions
- **Performance**: Optimized for mobile networks
- **PWA Ready**: Progressive Web App capabilities

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code

### Project Structure
```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── translations/  # Language files
├── assets/        # Static assets
└── App.jsx        # Main application
```

## 🌟 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: Optimized with code splitting
- **Load Time**: <2 seconds globally
- **SEO**: Optimized for search engines

## 🔒 Security

- **Content Security Policy**: Comprehensive CSP headers
- **XSS Protection**: Built-in XSS prevention
- **HTTPS**: SSL/TLS encryption everywhere
- **Input Validation**: Client-side validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: [docs.playchacha.net](https://docs.playchacha.net)
- **Issues**: [GitHub Issues](https://github.com/playchacha/frontend/issues)
- **Email**: support@playchacha.net

## 🏆 Powered by Visnec

PlayChaCha is part of the [Visnec Nexus](https://visnec.ai) ecosystem, providing enterprise-grade sports betting solutions globally.

