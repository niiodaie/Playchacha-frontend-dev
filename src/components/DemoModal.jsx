import React from 'react';

const DemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">PlayChaCha Demo</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl"
            >
              ×
            </button>
          </div>

          <div className="demo-content">
            {/* Demo Video Placeholder */}
            <div className="demo-video mb-6">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">▶️</div>
                  <h3 className="text-2xl font-bold mb-2">PlayChaCha Platform Demo</h3>
                  <p className="text-lg opacity-90">See how peer-to-peer betting works</p>
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="demo-features grid md:grid-cols-2 gap-6 mb-6">
              <div className="feature-demo">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2">🔐</span>
                  Secure Betting Process
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Funds held in secure escrow</li>
                  <li>• Automated payout system</li>
                  <li>• Transparent odds calculation</li>
                  <li>• Real-time bet matching</li>
                </ul>
              </div>

              <div className="feature-demo">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2">🌍</span>
                  Global Sports Coverage
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• NFL, NBA, MLB, NHL</li>
                  <li>• Premier League, La Liga</li>
                  <li>• Tennis Grand Slams</li>
                  <li>• International tournaments</li>
                </ul>
              </div>

              <div className="feature-demo">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2">⚡</span>
                  Lightning Fast Payouts
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Instant win notifications</li>
                  <li>• Automatic fund transfers</li>
                  <li>• Multiple payment methods</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>

              <div className="feature-demo">
                <h4 className="text-xl font-bold mb-3 flex items-center">
                  <span className="mr-2">📱</span>
                  Mobile Optimized
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Responsive design</li>
                  <li>• Touch-friendly interface</li>
                  <li>• Offline bet tracking</li>
                  <li>• Push notifications</li>
                </ul>
              </div>
            </div>

            {/* Demo Steps */}
            <div className="demo-steps mb-6">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <div className="steps-grid grid md:grid-cols-4 gap-4">
                <div className="step-card text-center p-4 bg-blue-50 rounded-lg">
                  <div className="step-number">1</div>
                  <h4 className="font-bold mb-2">Sign Up</h4>
                  <p className="text-sm text-gray-600">Create your account in seconds</p>
                </div>
                <div className="step-card text-center p-4 bg-green-50 rounded-lg">
                  <div className="step-number">2</div>
                  <h4 className="font-bold mb-2">Choose Event</h4>
                  <p className="text-sm text-gray-600">Browse live and upcoming games</p>
                </div>
                <div className="step-card text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="step-number">3</div>
                  <h4 className="font-bold mb-2">Place Bet</h4>
                  <p className="text-sm text-gray-600">Set your amount and confirm</p>
                </div>
                <div className="step-card text-center p-4 bg-purple-50 rounded-lg">
                  <div className="step-number">4</div>
                  <h4 className="font-bold mb-2">Get Paid</h4>
                  <p className="text-sm text-gray-600">Instant payouts when you win</p>
                </div>
              </div>
            </div>

            {/* Demo Stats */}
            <div className="demo-stats bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-center">Platform Statistics</h3>
              <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">1.2M+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">$50M+</div>
                  <div className="text-sm text-gray-600">Monthly Volume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">94.7%</div>
                  <div className="text-sm text-gray-600">Payout Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">99.9%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="demo-cta text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Betting?</h3>
              <p className="text-gray-600 mb-6">Join thousands of users already winning on PlayChaCha</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="btn btn-primary px-8 py-3"
                  onClick={onClose}
                >
                  Sign Up Now
                </button>
                <button 
                  className="btn btn-secondary px-8 py-3"
                  onClick={onClose}
                >
                  Browse Sports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModal;

