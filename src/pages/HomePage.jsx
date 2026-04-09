import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { loadRecipes, CATEGORIES } from '../data/recipes';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    setRecipes(loadRecipes());
  }, []);

  const filtered =
    activeCategory === 'All'
      ? recipes
      : recipes.filter((r) => r.category === activeCategory);

  const usedCategories = ['All', ...new Set(recipes.map((r) => r.category))];

  return (
    <div className="page-transition">
      {/* ── HERO ─────────────────────────────── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />

        <div className="container">
          <div className="hero-content">
            {/* Text */}
            <div className="hero-text-block">
              <p className="hero-eyebrow animate-fade-up">Personal Collection</p>

              <h1 className="hero-heading animate-fade-up-delay">
                Marques<em>'</em> <br />
                Recipes
              </h1>

              <p className="hero-tagline animate-fade-up-delay-2">
                Hello! These are recipes I have saved to make it easier to access
                for myself. Feel free to try them out.
              </p>

              <div className="hero-cta animate-fade-up-delay-3">
                <button
                  className="btn-primary"
                  onClick={() =>
                    document
                      .getElementById('recipes')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  Browse Recipes ↓
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => navigate('/add')}
                >
                  + Add a Recipe
                </button>
              </div>
            </div>

            {/* Profile card */}
            <div className="profile-card-wrapper animate-fade-in">
              <div className="profile-card">
                <div className="profile-deco profile-deco-1" />
                <div className="profile-deco profile-deco-2" />
                <div className="profile-card-inner">
                  <div className="profile-img-container">
                    <img
                      src="https://github.com/marques-batoon.png"
                      alt="Marques Batoon"
                      loading="eager"
                    />
                    <div className="profile-img-overlay" />
                  </div>
                  <div className="profile-card-body">
                    <h2 className="profile-name">Marques Batoon</h2>
                    <div className="profile-divider" />
                    <p className="profile-message">
                      "Hello! These are recipes I have saved to make it easier
                      to access for myself. Feel free to try them out."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECIPE LIST ─────────────────────── */}
      <section className="recipes-section" id="recipes">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">🍳 The Collection</p>
              <h2 className="section-title">All Recipes</h2>
            </div>
            <button className="btn-primary" onClick={() => navigate('/add')}>
              + Add Recipe
            </button>
          </div>

          {/* Category filter */}
          {usedCategories.length > 1 && (
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '36px',
              }}
            >
              {usedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '7px 18px',
                    borderRadius: '20px',
                    border: `1px solid ${activeCategory === cat ? 'var(--amber)' : 'var(--border)'}`,
                    background:
                      activeCategory === cat
                        ? 'rgba(232,164,68,0.12)'
                        : 'transparent',
                    color:
                      activeCategory === cat
                        ? 'var(--amber)'
                        : 'var(--text-muted)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Grid */}
          <div className="recipe-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🍽️</div>
                <h3>No recipes yet</h3>
                <p>Add your first recipe to get started!</p>
              </div>
            ) : (
              filtered.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
