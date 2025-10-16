import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import ConnectButton from '@/components/wallet/ConnectButton';
import NetworkSwitcher from '@/components/wallet/NetworkSwitcher';
import ThemeToggle from '@/components/common/ThemeToggle';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Deployments', href: '/deployments' },
  { name: 'Batch Transfer', href: '/batch-transaction' },
  { name: 'History', href: '/history' },
  { name: 'Analytics', href: '/analytics' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark/80 backdrop-blur-lg border-b border-light dark:border-dark">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center group-hover:shadow-purple-glow transition-shadow">
              <Zap size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              ChainManager
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'
                    : 'text-light-secondary dark:text-dark-secondary hover:text-light dark:hover:text-dark hover:bg-light-secondary dark:hover:bg-dark-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden md:block">
              <NetworkSwitcher />
            </div>
            <ConnectButton />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-light-secondary dark:hover:bg-dark-secondary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-light dark:border-dark bg-white dark:bg-dark animate-slide-in">
          <div className="container-custom py-4 space-y-2">
            {/* Mobile Network Switcher */}
            <div className="mb-4">
              <NetworkSwitcher />
            </div>
            
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400'
                    : 'text-light-secondary dark:text-dark-secondary hover:text-light dark:hover:text-dark hover:bg-light-secondary dark:hover:bg-dark-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;