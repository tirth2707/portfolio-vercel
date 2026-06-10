import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { profile } from '../../data/profile';
import Navigation from './Navigation';
import AudienceModeToggle from '../ui/AudienceModeToggle';
import ThemeToggle from '../ui/ThemeToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goHome = (event) => {
    event.preventDefault();
    navigate('/');
    window.setTimeout(() => {
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/82 text-white backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a
            href="/"
            onClick={goHome}
            className="inline-flex h-10 w-10 items-center justify-center border border-cyan-300/40 bg-cyan-300/10 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/15"
            aria-label="Tirth Shah home"
          >
            {profile.initials}
          </a>

          <Navigation
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <div className="flex items-center gap-2">
            <div className="hidden xl:block">
              <AudienceModeToggle />
            </div>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-slate-200 transition hover:bg-white/5 md:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
