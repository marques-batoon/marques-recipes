import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultStep = () => ({ phase: '', title: '', description: '', image: '', tip: '' });

export default function AddRecipePage() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([defaultStep()]);
  const [ingredients, setIngredients] = useState(['']);
  const [submitted, setSubmitted] = useState(false);

  const addStep = () => setSteps((s) => [...s, defaultStep()]);
  const removeStep = (i) => setSteps((s) => s.filter((_, idx) => idx !== i));
  const updateStep = (i, field, value) =>
    setSteps((s) => s.map((step, idx) => (idx === i ? { ...step, [field]: value } : step)));

  const addIngredient = () => setIngredients((ing) => [...ing, '']);
  const removeIngredient = (i) => setIngredients((ing) => ing.filter((_, idx) => idx !== i));
  const updateIngredient = (i, value) =>
    setIngredients((ing) => ing.map((v, idx) => (idx === i ? value : v)));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 24 }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--cream)', marginBottom: 16 }}>
          Recipe Ready to Save!
        </h2>
        <p style={{ color: 'var(--cream-dim)', maxWidth: 480, margin: '0 auto 32px', lineHeight: 1.7 }}>
          To permanently save this recipe, add it to <code style={{ color: 'var(--gold)', background: 'rgba(212,160,64,0.1)', padding: '2px 6px', borderRadius: 4 }}>src/data/recipes.js</code> following the format in the README. This form is a UI preview — check the README for the full guide.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className="back-btn" onClick={() => setSubmitted(false)}>← Edit Again</button>
          <button className="nav-add-btn" onClick={() => navigate('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="add-page-header">
        <div className="container">
          <h1 className="add-page-title">Add a New Recipe</h1>
          <p className="add-page-subtitle">
            Fill in the details below. See the README for how to save it permanently.
          </p>
        </div>
      </div>

      <div className="container">
        <form className="add-form" onSubmit={handleSubmit}>

          {/* Basic Info */}
          <div className="form-section">
            <div className="form-section-title">📋 Basic Info</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Recipe Title *</label>
                <input className="form-input" placeholder="e.g. Sweet and Sour Ribs" required />
              </div>
              <div className="form-group">
                <label className="form-label">Chinese / Other Title</label>
                <input className="form-input" placeholder="e.g. 糖醋排骨 (optional)" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" placeholder="A short description of the dish..." rows={3} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Cuisine</label>
                <input className="form-input" placeholder="e.g. Chinese, Italian, Filipino" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option value="">Select category</option>
                  <option>Appetizer</option>
                  <option>Main Course</option>
                  <option>Side Dish</option>
                  <option>Dessert</option>
                  <option>Snack</option>
                  <option>Soup</option>
                  <option>Breakfast</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prep Time</label>
                <input className="form-input" placeholder="e.g. 15 mins" />
              </div>
              <div className="form-group">
                <label className="form-label">Cook Time</label>
                <input className="form-input" placeholder="e.g. 1 hr 10 mins" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Servings</label>
                <input className="form-input" type="number" placeholder="e.g. 4" min={1} />
              </div>
              <div className="form-group">
                <label className="form-label">Difficulty</label>
                <select className="form-select">
                  <option value="">Select</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cover Photo */}
          <div className="form-section">
            <div className="form-section-title">📸 Cover Photo</div>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input className="form-input" placeholder="https://example.com/photo.jpg" />
            </div>
            <div className="form-group">
              <label className="form-label">— or —  Upload a local file</label>
              <input
                className="form-input"
                type="file"
                accept="image/*"
                style={{ paddingTop: 10 }}
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="form-section">
            <div className="form-section-title">🧂 Ingredients</div>
            {ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <input
                  className="form-input"
                  placeholder={`Ingredient ${i + 1} — e.g. 700g pork ribs`}
                  value={ing}
                  onChange={(e) => updateIngredient(i, e.target.value)}
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    className="step-remove-btn"
                    onClick={() => removeIngredient(i)}
                    style={{ flexShrink: 0 }}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="add-step-btn" onClick={addIngredient}>
              + Add Ingredient
            </button>
          </div>

          {/* Steps */}
          <div className="form-section">
            <div className="form-section-title">👨‍🍳 Steps</div>
            {steps.map((step, i) => (
              <div key={i} className="step-builder-item">
                <div className="step-builder-num">Step {i + 1}</div>
                {steps.length > 1 && (
                  <button type="button" className="step-remove-btn" onClick={() => removeStep(i)}>
                    Remove
                  </button>
                )}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phase / Section</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Blanch the Ribs"
                      value={step.phase}
                      onChange={(e) => updateStep(i, 'phase', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Step Title</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Blanch and drain the ribs"
                      value={step.title}
                      onChange={(e) => updateStep(i, 'title', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Instruction</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe what to do in this step..."
                    rows={3}
                    value={step.description}
                    onChange={(e) => updateStep(i, 'description', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Step Photo URL (optional)</label>
                    <input
                      className="form-input"
                      placeholder="https://..."
                      value={step.image}
                      onChange={(e) => updateStep(i, 'image', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tip (optional)</label>
                    <input
                      className="form-input"
                      placeholder="A helpful tip for this step"
                      value={step.tip}
                      onChange={(e) => updateStep(i, 'tip', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button type="button" className="add-step-btn" onClick={addStep}>
              + Add Step
            </button>
          </div>

          {/* Notes & Source */}
          <div className="form-section">
            <div className="form-section-title">📝 Notes & Source</div>
            <div className="form-group">
              <label className="form-label">Notes / Tips (optional)</label>
              <textarea
                className="form-textarea"
                placeholder="Storage tips, serving suggestions, variations..."
                rows={3}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Source URL (optional)</label>
                <input className="form-input" placeholder="https://original-recipe.com" />
              </div>
              <div className="form-group">
                <label className="form-label">Source Credit (optional)</label>
                <input className="form-input" placeholder="e.g. Red House Spice by Wei Guo" />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Preview Recipe
          </button>
          <p className="form-note">
            After submitting, copy the generated data into <strong>src/data/recipes.js</strong> to save it permanently. See the README for details.
          </p>
        </form>
      </div>
    </div>
  );
}
