import { useNavigate } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div className="recipe-card animate-fade-up">
      <div
        className="recipe-card-inner"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && navigate(`/recipe/${recipe.id}`)}
      >
        <div className="recipe-card-img">
          {recipe.coverImage ? (
            <img src={recipe.coverImage} alt={recipe.title} loading="lazy" />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--bg-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
              }}
            >
              🍽️
            </div>
          )}
          <div className="recipe-card-img-overlay" />
          <span className="recipe-card-category">{recipe.category}</span>
        </div>

        <div className="recipe-card-body">
          <h3 className="recipe-card-title">{recipe.title}</h3>
          <p className="recipe-card-desc">{recipe.description}</p>

          <div className="recipe-card-meta">
            {recipe.prepTime && (
              <span className="meta-item">
                <span className="meta-icon">⏱</span> Prep: {recipe.prepTime}
              </span>
            )}
            {recipe.cookTime && (
              <span className="meta-item">
                <span className="meta-icon">🔥</span> Cook: {recipe.cookTime}
              </span>
            )}
          </div>
        </div>

        <div className="recipe-card-footer">
          <span className="view-recipe-btn">
            View Recipe <span>→</span>
          </span>
          {recipe.servings && (
            <span className="recipe-servings">Serves {recipe.servings}</span>
          )}
        </div>
      </div>
    </div>
  );
}
