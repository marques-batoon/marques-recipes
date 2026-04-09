import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipes from '../data/recipes';

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r) => r.id === parseInt(id));
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  if (!recipe) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream)', marginBottom: 16 }}>
          Recipe not found
        </h2>
        <button className="back-btn" onClick={() => navigate('/')}>← Back to recipes</button>
      </div>
    );
  }

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Group steps by phase
  const phases = recipe.steps.reduce((acc, step, i) => {
    const phaseKey = step.phase || 'Steps';
    if (!acc[phaseKey]) acc[phaseKey] = [];
    acc[phaseKey].push({ ...step, globalIndex: i + 1 });
    return acc;
  }, {});

  return (
    <div>
      {/* Hero */}
      <div className="recipe-detail-hero">
        <img
          src={recipe.coverImage}
          alt={recipe.title}
          className="recipe-detail-hero-img"
        />
        <div className="recipe-detail-hero-overlay" />
        <div className="recipe-detail-hero-content container">
          <span className="recipe-detail-cuisine-tag">{recipe.cuisine}</span>
          <h1 className="recipe-detail-title">{recipe.title}</h1>
          {recipe.chineseTitle && (
            <div className="recipe-detail-chinese">{recipe.chineseTitle}</div>
          )}
          <p className="recipe-detail-description">{recipe.description}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="recipe-stats-bar">
        <div className="container recipe-stats-inner">
          <div className="stat-item">
            <div className="stat-value">{recipe.prepTime}</div>
            <div className="stat-label">Prep Time</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{recipe.cookTime}</div>
            <div className="stat-label">Cook Time</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{recipe.servings}</div>
            <div className="stat-label">Servings</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{recipe.difficulty}</div>
            <div className="stat-label">Difficulty</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{recipe.category}</div>
            <div className="stat-label">Category</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="recipe-detail-body">
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to recipes
          </button>

          <div className="recipe-layout">
            {/* Ingredients sidebar */}
            <aside className="ingredients-sidebar">
              <div className="sidebar-card">
                <div className="sidebar-title">
                  🧂 Ingredients
                </div>
                <ul className="ingredient-list">
                  {recipe.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className={`ingredient-item ${checkedIngredients.includes(i) ? 'checked' : ''}`}
                      onClick={() => toggleIngredient(i)}
                    >
                      <div className="ingredient-check">
                        {checkedIngredients.includes(i) && (
                          <span className="ingredient-check-inner">✓</span>
                        )}
                      </div>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              {recipe.notes && (
                <div className="recipe-notes" style={{ marginTop: 20 }}>
                  <div className="recipe-notes-title">📝 Notes</div>
                  <p>{recipe.notes}</p>
                  {recipe.source && (
                    <div className="source-link">
                      Source:{' '}
                      <a href={recipe.source} target="_blank" rel="noopener noreferrer">
                        {recipe.sourceCredit || recipe.source}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </aside>

            {/* Steps */}
            <div className="steps-section">
              <h2 className="steps-title">👨‍🍳 Instructions</h2>
              {Object.entries(phases).map(([phaseName, steps]) => (
                <div key={phaseName} className="phase-group">
                  <div className="phase-label">{phaseName}</div>
                  {steps.map((step) => (
                    <div key={step.globalIndex} className="step-card">
                      <div className="step-card-header">
                        <div className="step-number">{step.globalIndex}</div>
                        <div className="step-title">{step.title}</div>
                      </div>
                      {step.image && (
                        <img
                          src={step.image}
                          alt={step.title}
                          className="step-img"
                          loading="lazy"
                        />
                      )}
                      <div className="step-body">
                        <p className="step-description">{step.description}</p>
                        {step.tip && (
                          <div className="step-tip">
                            <span>💡</span>
                            <span>{step.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
