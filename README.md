# Marques' Recipes 🍽️

A personal recipe collection app built with React. Browse and manage your favourite recipes with ease.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
git clone https://github.com/marques-batoon/marques-recipes.git
cd marques-recipes
npm install
npm start
```
The app will open at `http://localhost:3000`.

---

## ➕ How to Add a New Recipe

Recipes are managed entirely through code — open `src/data/recipes.js` and append a new object to the `recipes` array. Follow this template:

```js
{
  id: 2,                          // Unique number — increment from the last
  title: "Your Recipe Title",     // Name of the dish
  chineseTitle: "菜名",           // Optional — set to null if not applicable
  category: "Main Course",        // e.g. Appetizer, Main Course, Side Dish, Dessert, Snack, Soup, Breakfast
  cuisine: "Chinese",             // Cuisine type
  prepTime: "10 mins",
  cookTime: "30 mins",
  servings: 4,
  difficulty: "Easy",             // Easy | Medium | Hard
  description: "A short description of the recipe.",
  coverImage: "https://your-image-url.com/image.jpg",  // URL or imported local image (see below)

  ingredients: [
    "500g chicken breast",
    "2 tbsp soy sauce",
    "1 tsp garlic powder",
    // Add more ingredients...
  ],

  steps: [
    {
      phase: "Marinate",                        // Section/phase grouping label
      title: "Marinate the chicken",
      description: "Mix soy sauce and garlic powder, coat the chicken, and let it rest for 20 minutes.",
      image: "https://your-image-url.com/step1.jpg",  // Optional — URL or imported local image
      tip: "Marinating overnight makes the flavour much deeper."  // Optional tip, or null
    },
    {
      phase: "Cook",
      title: "Cook the chicken",
      description: "Heat oil in a pan over medium-high heat. Cook for 6–8 minutes per side.",
      image: null,  // Set to null if no photo for this step
      tip: null
    }
    // Add more steps...
  ],

  notes: "Serve with steamed rice and a side salad.",  // Optional
  source: "https://original-recipe-source.com"         // Optional credit
}
```

---

## 📸 Adding Local Photos

Place your images in `src/photos/`, then import them at the top of `recipes.js` and reference them in your recipe object.

**Step 1 — Add your image to `src/photos/`:**
```
src/photos/my-dish.jpeg
```

**Step 2 — Import it at the top of `recipes.js`:**
```js
import myDishImage from '../photos/my-dish.jpeg';
```

**Step 3 — Use the imported variable in your recipe:**
```js
coverImage: myDishImage,

// or inside a step:
image: myDishImage,
```

> You can also use a plain external URL string instead of a local import — just paste the URL directly as the value.

---

## 🗂️ Project Structure

```
marques-recipes/
├── public/
│   └── index.html
├── src/
│   ├── photos/                  ← Drop local images here
│   ├── components/
│   │   ├── Navbar.js            ← Top navigation bar
│   │   └── Footer.js            ← Footer with social links
│   ├── data/
│   │   └── recipes.js           ← ⭐ All recipe data lives here
│   ├── pages/
│   │   ├── HomePage.js          ← Landing page with recipe list
│   │   └── RecipePage.js        ← Individual recipe detail view
│   ├── App.js
│   ├── App.css                  ← Global styles & design tokens
│   └── index.js
├── .gitignore
├── package.json
└── README.md
```

---

## 🛠️ Built With
- [React 18](https://react.dev/)
- [React Router v6](https://reactrouter.com/)
- Google Fonts (Playfair Display + Nunito Sans)

---

## 👤 Author

**Marques Batoon**
- GitHub: [@marques-batoon](https://github.com/marques-batoon)
- Instagram: [@batoonworld](https://www.instagram.com/batoonworld/)
