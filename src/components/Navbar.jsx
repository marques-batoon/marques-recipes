import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <Link to="/" className="navbar-brand">
        <div className="navbar-logo">🍽️</div>
        <span className="navbar-title">
          Marques<span>'</span> Recipes
        </span>
      </Link>

      <button
        className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`navbar-links${menuOpen ? ' open' : ''}`}>
        <Link to="/" className={`nav-link${isActive('/') ? ' active' : ''}`}>
          Home
        </Link>
        <Link to="/add" className="nav-add-btn">
          + Add Recipe
        </Link>
      </div>
    </nav>
  );
}
