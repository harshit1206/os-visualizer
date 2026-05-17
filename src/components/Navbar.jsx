import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cpu, Moon, Sun, Menu, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'CPU Scheduling', path: '/cpu-scheduling' },
    { name: 'Disk Scheduling', path: '/disk-scheduling' },
  ];

  const mobileNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'CPU Scheduling', path: '/cpu-scheduling' },
    { name: 'Disk Scheduling', path: '/disk-scheduling' },
    { name: 'Memory Management', path: '/memory-management' },
    { name: 'Deadlock Detection', path: '/deadlock-detection' },
    { name: 'Page Replacement', path: '/page-replacement' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass rounded-none border-t-0 border-l-0 border-r-0 border-b border-card-border h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <Cpu className="text-accent-primary w-8 h-8" />
            <Link to="/" className="text-xl font-bold tracking-tight text-text-primary">
              OS Visualizer
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-accent-primary bg-accent-primary/10'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-bg-secondary text-text-secondary hover:text-accent-primary transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-full hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors hidden sm:block"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary focus:outline-none"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass rounded-none border-t border-card-border bg-bg-surface shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 overflow-y-auto max-h-[70vh]">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-accent-primary bg-accent-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-secondary sm:hidden"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
