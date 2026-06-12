import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AudienceModeToggle from '../ui/AudienceModeToggle';

const navItems = [
  { name: 'Home', href: '#home', type: 'anchor' },
  { name: 'Systems', href: '#systems', type: 'anchor' },
  { name: 'Simulator', href: '#simulator', type: 'anchor' },
  { name: 'Skills', href: '#skills', type: 'anchor' },
  { name: 'Cases', href: '#projects', type: 'anchor' },
  { name: 'Research', href: '#research', type: 'anchor' },
  { name: 'Assistant', href: '#assistant', type: 'anchor' },
  { name: 'Beyond', href: '/beyond-tech', type: 'link' },
  { name: 'Blog', href: '/blog', type: 'link' },
  { name: 'Contact', href: '#contact', type: 'anchor' },
];

const Navigation = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      return undefined;
    }

    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.type === 'anchor')
        .map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (!element) continue;
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToAnchor = (href) => {
    const targetId = href.substring(1);
    const scroll = () => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(scroll, 80);
    } else {
      scroll();
    }
    setIsMobileMenuOpen(false);
  };

  const baseClass =
    'px-3 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300';

  const renderItem = (item) => {
    const isActive = location.pathname === '/' && activeSection === item.href.substring(1);
    const className = `${baseClass} ${
      isActive
        ? 'text-cyan-200'
        : 'text-slate-300 hover:bg-white/5 hover:text-white'
    }`;

    if (item.type === 'link') {
      return (
        <Link
          key={item.name}
          to={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`${baseClass} ${
            location.pathname === item.href
              ? 'text-cyan-200'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          {item.name}
        </Link>
      );
    }

    return (
      <button
        key={item.name}
        type="button"
        onClick={() => scrollToAnchor(item.href)}
        className={className}
      >
        {item.name}
      </button>
    );
  };

  return (
    <>
      <nav className="hidden items-center gap-1 lg:flex">{navItems.map(renderItem)}</nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute left-0 right-0 top-full border-y border-white/10 bg-slate-950 p-3 shadow-2xl shadow-black/50 md:hidden"
          >
            <div className="grid gap-1">
              <div className="px-3 py-2 xl:hidden">
                <AudienceModeToggle compact />
              </div>
              {navItems.map(renderItem)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
