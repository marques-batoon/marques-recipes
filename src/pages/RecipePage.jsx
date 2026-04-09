import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadRecipes } from '../data/recipes';

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const all = loadRecipes();
    const found = all.find((r) => r.id === id);
    if (!found) navigate('/');
    else setRecipe(found);
  }, [id, navigate]);

  if (!recipe) return null;

  // Flatten steps to get a global step counter
  let stepCounter = 0;

  return (
    <div className="recipe-detail page-transition">
      {/* Hero image */}
      <div className="recipe-hero">
        {recipe.coverImage ? (
          <img src={recipe.coverImage} alt={recipe.title} />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--bg-elevated)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
            }}
          >
            🍽️
          </div>
        )}
        <div className="recipe-hero-overlay" />
        <div className="recipe-hero-content">
          <div className="container">
            <p className="recipe-hero-category">🍳 {recipe.category}</p>
            <h1 className="recipe-hero-title">{recipe.title}</h1>
            {recipe.description && (
              <p className="recipe-hero-desc">{recipe.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="recipe-body">
        <div className="container">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Recipes
          </button>

          <div className="recipe-layout">
            {/* ── Main content ── */}
            <div className="recipe-main">
              {/* Steps */}
              {recipe.stepGroups && recipe.stepGroups.length > 0 && (
                <>
                  <div className="recipe-steps-header">
                    <h2 className="recipe-steps-title">Instructions</h2>
                    <div className="steps-divider" />
                  </div>

                  {recipe.stepGroups.map((group, gi) => (
                    <div className="step-group" key={gi}>
                      {group.groupTitle && (
                        <h3 className="step-group-title">{group.groupTitle}</h3>
                      )}
                      {group.steps.map((step, si) => {
                        stepCounter++;
                        const num = stepCounter;
                        const isLast =
                          gi === recipe.stepGroups.length - 1 &&
                          si === group.steps.length - 1;
                        return (
                          <div className="step-item" key={si}>
                            <div className="step-number-wrap">
                              <div className="step-number">{num}</div>
                              {!isLast && <div className="step-line" />}
                            </div>
                            <div className="step-content-block">
                              <p className="step-text">{step.text}</p>
                              {step.tip && (
                                <div className="step-tip">
                                  <span>💡</span>
                                  <span>{step.tip}</span>
                                </div>
                              )}
                              {step.images && step.images.length > 0 && (
                                <div
                                  className={
                                    step.images.length > 1
                                      ? 'step-photos'
                                      : 'step-img'
                                  }
                                >
                                  {step.images.map((src, ii) => (
                                    <div
                                      key={ii}
                                      className={
                                        step.images.length > 1 ? 'step-img' : ''
                                      }
                                    >
                                      <img src={src} alt={`Step ${num} — photo ${ii + 1}`} loading="lazy" />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </>
              )}

              {/* Notes */}
              {recipe.notes && recipe.notes.length > 0 && (
                <div className="notes-card">
                  <h3>📌 Notes</h3>
                  <ul className="notes-list">
                    {recipe.notes.map((note, i) => (
                      <li key={i}>
                        <span className="note-num">{i + 1}.</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Source */}
              {recipe.source && (
                <p
                  style={{
                    marginTop: '24px',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  Original recipe:{' '}
                  <a
                    href={recipe.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--amber)', textDecoration: 'underline' }}
                  >
                    {recipe.source}
                  </a>
                </p>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="recipe-sidebar">
              {/* Stats */}
              <div className="sidebar-card">
                <div className="sidebar-card-header">⏱ Time & Servings</div>
                <div className="sidebar-stats">
                  {recipe.prepTime && (
                    <div className="stat-item">
                      <div className="stat-icon">🥄</div>
                      <div className="stat-value">{recipe.prepTime}</div>
                      <div className="stat-label">Prep</div>
                    </div>
                  )}
                  {recipe.cookTime && (
                    <div className="stat-item">
                      <div className="stat-icon">🔥</div>
                      <div className="stat-value">{recipe.cookTime}</div>
                      <div className="stat-label">Cook</div>
                    </div>
                  )}
                  {recipe.totalTime && (
                    <div className="stat-item">
                      <div className="stat-icon">⏳</div>
                      <div className="stat-value">{recipe.totalTime}</div>
                      <div className="stat-label">Total</div>
                    </div>
                  )}
                  {recipe.servings && (
                    <div className="stat-item">
                      <div className="stat-icon">🍽️</div>
                      <div className="stat-value">{recipe.servings}</div>
                      <div className="stat-label">Servings</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Ingredients */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="sidebar-card ingredients-card">
                  <div className="sidebar-card-header">🧂 Ingredients</div>
                  <ul className="ingredient-list">
                    {recipe.ingredients.map((ing, i) => (
                      <li className="ingredient-item" key={i}>
                        <span className="ingredient-bullet">●</span>
                        {ing.amount && (
                          <span className="ingredient-amount">{ing.amount}</span>
                        )}
                        <span className="ingredient-name">{ing.name}</span>
                      </li>
                    ))}
                  </ul>

                  {recipe.nutrition && (
                    <div style={{ padding: '0 24px 20px' }}>
                      <span className="nutrition-chip">
                        🔢 ~{recipe.nutrition.calories} kcal /{' '}
                        {recipe.nutrition.servingSize}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
