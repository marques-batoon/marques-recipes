import React from 'react';
import { useNavigate } from 'react-router-dom';
import recipes from '../data/recipes';

const GITHUB_AVATAR = 'https://media.licdn.com/dms/image/v2/D5603AQFeGHlJ1XaRQA/profile-displayphoto-scale_200_200/B56ZvM39LLGQAY-/0/1768668779870?e=1777507200&v=beta&t=ALX-J3k2ZqffbkvxdCi8P7E6QnHE99pjpMY_NBty_98';

function RecipeCard({ recipe, onClick, delay }) {
  return (
    <div
      className="recipe-card"
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="recipe-card-img-wrap">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="recipe-card-img"
          loading="lazy"
        />
        <div className="recipe-card-overlay" />
        <span className="recipe-card-badge">{recipe.difficulty}</span>
      </div>
      <div className="recipe-card-body">
        <div className="recipe-card-cuisine">{recipe.cuisine}</div>
        <div className="recipe-card-title">{recipe.title}</div>
        {recipe.chineseTitle && (
          <div className="recipe-card-subtitle">{recipe.chineseTitle}</div>
        )}
        <div className="recipe-card-meta">
          <div className="meta-item">
            <span className="meta-icon">⏱</span>
            {recipe.prepTime} prep
          </div>
          <div className="meta-item">
            <span className="meta-icon">🍳</span>
            {recipe.cookTime} cook
          </div>
          <div className="meta-item">
            <span className="meta-icon">👤</span>
            Serves {recipe.servings}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero / Profile Section */}
      <section className="hero-section">
        <div className="hero-bg-grain" aria-hidden="true" />
        <div className="container">
          <div className="hero-inner">
            {/* Avatar */}
            <div className="profile-card">
              <div className="profile-avatar-wrap">
                <div className="profile-avatar-ring" aria-hidden="true" />
                <img
                  src={GITHUB_AVATAR}
                  alt="Marques Batoon"
                  className="profile-avatar"
                />
              </div>
            </div>

            {/* Welcome text */}
            <div className="welcome-block">
              <div className="welcome-eyebrow">Welcome</div>
              <h1 className="welcome-title">
                Hi, I&apos;m <em>Marques</em>
              </h1>
              <p className="welcome-message">
                Hello! These are recipes I have saved to make it easier to access for myself.
                Feel free to try them out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe List */}
      <section>
        <div className="container">
          <div className="section-divider">
            <div className="section-divider-line" />
            <h2 className="section-divider-label">My Recipes</h2>
            <div className="section-divider-line" />
          </div>

          <div className="recipe-grid">
            {recipes.map((recipe, i) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                delay={i * 80}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
