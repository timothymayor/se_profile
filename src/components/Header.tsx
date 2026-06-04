import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavClick: (sect: string) => void;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export default function Header({ onNavClick, darkMode, setDarkMode }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Case Studies', id: 'cases' },
    { label: 'Services', id: 'services' },
    { label: 'AI Agent', id: 'ai-agent' },
    { label: 'Skills', id: 'skills' },
    { label: 'Insights', id: 'insights' },
    { label: 'Testimonials', id: 'testimonials' },
  ];

  return (
    <header
      id="main-nav-bar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FCFBF9]/95 dark:bg-[#121214]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo Brand - Stylized text akin to Tania Rascia's signature header */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
          >
            <div>
              <span className="text-base sm:text-lg font-sans font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                Alex Mercer
              </span>
              <span className="inline-block w-2.5 h-2.5 bg-teal-600 dark:bg-teal-400 rounded-full ml-1.5 animate-pulse shrink-0"></span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono block font-medium uppercase tracking-widest leading-tight">
                Systems & AI Advisor
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavClick(item.id)}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer relative"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Core Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Interactive Theme Toggle - Clean and understated text/icon format */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-850/50 hover:text-teal-600 dark:hover:text-teal-400 transition-all cursor-pointer focus:outline-none"
              title="Toggle Color Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Subtle Strategy Session Booking Link Button */}
            <button
              id="header-cta-btn"
              onClick={() => onNavClick('booking')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-teal-600/30 dark:border-teal-400/30 bg-teal-50/50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-400 dark:hover:text-zinc-950 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Strategy Session</span>
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 px-2 text-xs font-mono rounded text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
            >
              {darkMode ? 'DARK' : 'LIGHT'}
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-zinc-800 dark:text-zinc-100 hover:text-teal-600 p-1"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div id="mobile-navigation-drawer" className="md:hidden bg-[#FCFBF9] dark:bg-[#121214] border-b border-zinc-200 dark:border-zinc-800 px-6 pt-3 pb-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onNavClick(item.id);
                  setMobileOpen(false);
                }}
                className="text-left py-2.5 px-3 rounded-md hover:bg-teal-50 dark:hover:bg-teal-950/40 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <button
              id="mobile-header-cta-btn"
              onClick={() => {
                onNavClick('booking');
                setMobileOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-medium bg-teal-600 hover:bg-teal-700 text-white dark:bg-teal-500 dark:hover:bg-teal-600 dark:text-zinc-950 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Strategy Session</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
