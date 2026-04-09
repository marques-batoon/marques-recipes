import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveRecipe, makeId, CATEGORIES } from '../data/recipes';

const emptyIngredient = () => ({ amount: '', name: '' });
const emptyStep = () => ({ text: '', tip: '', imageUrl: '' });
const emptyGroup = () => ({ groupTitle: '', steps: [emptyStep()] });

export default function AddRecipePage() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  // Basic info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Other');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [totalTime, setTotalTime] = useState('');
  const [servings, setServings] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [source, setSource] = useState('');

  // Ingredients
  const [ingredients, setIngredients] = useState([emptyIngredient()]);

  // Step groups
  const [stepGroups, setStepGroups] = useState([emptyGroup()]);

  // Notes
  const [notes, setNotes] = useState(['']);

  /* ── Ingredient helpers ── */
  const updateIngredient = (i, field, val) =>
    setIngredients((prev) => prev.map((ing, idx) => (idx === i ? { ...ing, [field]: val } : ing)));
  const addIngredient = () => setIngredients((prev) => [...prev, emptyIngredient()]);
  const removeIngredient = (i) =>
    setIngredients((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)));

  /* ── Step group helpers ── */
  const updateGroupTitle = (gi, val) =>
    setStepGroups((prev) => prev.map((g, i) => (i === gi ? { ...g, groupTitle: val } : g)));

  const updateStep = (gi, si, field, val) =>
    setStepGroups((prev) =>
      prev.map((g, i) =>
        i !== gi
          ? g
          : {
              ...g,
              steps: g.steps.map((s, j) => (j !== si ? s : { ...s, [field]: val })),
            }
      )
    );

  const addStep = (gi) =>
    setStepGroups((prev) =>
      prev.map((g, i) => (i !== gi ? g : { ...g, steps: [...g.steps, emptyStep()] }))
    );

  const removeStep = (gi, si) =>
    setStepGroups((prev) =>
      prev.map((g, i) =>
        i !== gi
          ? g
          : { ...g, steps: g.steps.length === 1 ? g.steps : g.steps.filter((_, j) => j !== si) }
      )
    );

  const addGroup = () => setStepGroups((prev) => [...prev, emptyGroup()]);
  const removeGroup = (gi) =>
    setStepGroups((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== gi)));

  /* ── Note helpers ── */
  const updateNote = (i, val) =>
    setNotes((prev) => prev.map((n, idx) => (idx === i ? val : n)));
  const addNote = () => setNotes((prev) => [...prev, '']);
  const removeNote = (i) =>
    setNotes((prev) => (prev.length === 1 ? prev : prev.filter((_, idx) => idx !== i)));

  /* ── Submit ── */
  const handleSubmit = () => {
    if (!title.trim()) { alert('Please enter a recipe title.'); return; }

    const recipe = {
      id: makeId(title),
      title: title.trim(),
      description: description.trim(),
      category,
      prepTime: prepTime.trim(),
      cookTime: cookTime.trim(),
      totalTime: totalTime.trim(),
      servings: servings ? Number(servings) : null,
      coverImage: coverImage.trim(),
      source: source.trim(),
      ingredients: ingredients.filter((ing) => ing.name.trim()),
      stepGroups: stepGroups
        .filter((g) => g.steps.some((s) => s.text.trim()))
        .map((g) => ({
          groupTitle: g.groupTitle.trim(),
          steps: g.steps
            .filter((s) => s.text.trim())
            .map((s) => ({
              text: s.text.trim(),
              tip: s.tip.trim() || null,
              images: s.imageUrl.trim() ? [s.imageUrl.trim()] : [],
            })),
        })),
      notes: notes.filter((n) => n.trim()),
      createdAt: new Date().toISOString().split('T')[0],
    };

    const ok = saveRecipe(recipe);
    if (ok) {
      setSaved(true);
      setTimeout(() => navigate(`/recipe/${recipe.id}`), 1600);
    } else {
      alert('Could not save the recipe. Please try again.');
    }
  };

  return (
    <div className="add-recipe-page page-transition">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Add a New Recipe</h1>
          <p className="page-subtitle">Fill in the details below — only the title is required.</p>
        </div>

        <div className="recipe-form">
          {saved && (
            <div className="success-banner">
              ✅ Recipe saved! Redirecting…
            </div>
          )}

          {/* ── BASIC INFO ── */}
          <div className="form-section">
            <h2 className="form-section-title">Basic Information</h2>

            <div className="form-group">
              <label className="form-label">Recipe Title *</label>
              <input
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Classic Beef Tacos"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Short Description</label>
              <textarea
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of this recipe…"
                style={{ minHeight: 80 }}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Servings</label>
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  placeholder="e.g. 4"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Prep Time</label>
                <input className="form-input" value={prepTime} onChange={(e) => setPrepTime(e.target.value)} placeholder="e.g. 15 mins" />
              </div>
              <div className="form-group">
                <label className="form-label">Cook Time</label>
                <input className="form-input" value={cookTime} onChange={(e) => setCookTime(e.target.value)} placeholder="e.g. 30 mins" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Total Time</label>
                <input className="form-input" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} placeholder="e.g. 45 mins" />
              </div>
              <div className="form-group">
                <label className="form-label">Source URL</label>
                <input className="form-input" value={source} onChange={(e) => setSource(e.target.value)} placeholder="https://..." />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Cover Photo URL</label>
              <input
                className="form-input"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/photo.jpg"
              />
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover preview"
                  style={{ marginTop: 12, height: 160, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border)' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
            </div>
          </div>

          {/* ── INGREDIENTS ── */}
          <div className="form-section">
            <h2 className="form-section-title">Ingredients</h2>
            <div className="dynamic-list">
              {ingredients.map((ing, i) => (
                <div className="dynamic-item" key={i}>
                  <div className="dynamic-item-inputs">
                    <input
                      className="form-input"
                      value={ing.amount}
                      onChange={(e) => updateIngredient(i, 'amount', e.target.value)}
                      placeholder="Amount (e.g. 2 tbsp)"
                      style={{ flex: '0 0 160px' }}
                    />
                    <input
                      className="form-input"
                      value={ing.name}
                      onChange={(e) => updateIngredient(i, 'name', e.target.value)}
                      placeholder="Ingredient name"
                    />
                  </div>
                  <button className="remove-btn" onClick={() => removeIngredient(i)} title="Remove">×</button>
                </div>
              ))}
            </div>
            <button className="add-item-btn" onClick={addIngredient}>+ Add Ingredient</button>
          </div>

          {/* ── STEPS ── */}
          <div className="form-section">
            <h2 className="form-section-title">Instructions</h2>
            {stepGroups.map((group, gi) => (
              <div key={gi} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                  <input
                    className="form-input"
                    value={group.groupTitle}
                    onChange={(e) => updateGroupTitle(gi, e.target.value)}
                    placeholder={`Section title (e.g. "Step 1 — Prep the Sauce")`}
                    style={{ flex: 1 }}
                  />
                  {stepGroups.length > 1 && (
                    <button className="remove-btn" onClick={() => removeGroup(gi)} title="Remove section">×</button>
                  )}
                </div>

                <div className="dynamic-list">
                  {group.steps.map((step, si) => (
                    <div key={si} className="step-item-form">
                      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div className="form-group">
                            <label className="form-label">Step {si + 1} Instructions</label>
                            <textarea
                              className="form-textarea"
                              value={step.text}
                              onChange={(e) => updateStep(gi, si, 'text', e.target.value)}
                              placeholder="Describe what to do in this step…"
                              style={{ minHeight: 80 }}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Tip (optional)</label>
                            <input
                              className="form-input"
                              value={step.tip}
                              onChange={(e) => updateStep(gi, si, 'tip', e.target.value)}
                              placeholder="💡 Any helpful tip for this step…"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Step Photo URL (optional)</label>
                            <input
                              className="form-input"
                              value={step.imageUrl}
                              onChange={(e) => updateStep(gi, si, 'imageUrl', e.target.value)}
                              placeholder="https://example.com/step-photo.jpg"
                            />
                            {step.imageUrl && (
                              <img
                                src={step.imageUrl}
                                alt="Step preview"
                                style={{ marginTop: 8, height: 100, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--border)' }}
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            )}
                          </div>
                        </div>
                        {group.steps.length > 1 && (
                          <button className="remove-btn" onClick={() => removeStep(gi, si)} style={{ marginTop: 28 }} title="Remove step">×</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="add-item-btn" onClick={() => addStep(gi)} style={{ marginTop: 10 }}>+ Add Step</button>
              </div>
            ))}
            <button className="add-item-btn" onClick={addGroup} style={{ marginTop: 4 }}>+ Add Section</button>
          </div>

          {/* ── NOTES ── */}
          <div className="form-section">
            <h2 className="form-section-title">Notes (optional)</h2>
            <div className="dynamic-list">
              {notes.map((note, i) => (
                <div className="dynamic-item" key={i}>
                  <input
                    className="form-input"
                    value={note}
                    onChange={(e) => updateNote(i, e.target.value)}
                    placeholder="e.g. Can substitute chicken for pork"
                    style={{ flex: 1 }}
                  />
                  <button className="remove-btn" onClick={() => removeNote(i)} title="Remove">×</button>
                </div>
              ))}
            </div>
            <button className="add-item-btn" onClick={addNote}>+ Add Note</button>
          </div>

          {/* ── SUBMIT ── */}
          <button className="form-submit-btn" onClick={handleSubmit} disabled={saved}>
            {saved ? '✅ Saved!' : '💾 Save Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
}
