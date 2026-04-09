# Marques' Recipes 🍽️

A personal recipe collection app built with React. Browse, add, and manage your favourite recipes with ease.

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

Recipes are stored in `src/data/recipes.js`. To add a new recipe, open that file and append a new object to the `recipes` array following this template:

```js
{
  id: 2,                          // Unique number — increment from the last
  title: "Your Recipe Title",     // Name of the dish
  category: "Main Course",        // e.g. Appetizer, Main Course, Dessert, Snack
  cuisine: "Chinese",             // Cuisine type
  prepTime: "10 mins",
  cookTime: "30 mins",
  servings: 4,
  difficulty: "Easy",             // Easy | Medium | Hard
  description: "A short description of the recipe.",
  coverImage: "https://your-image-url.com/image.jpg",  // URL or local path

  ingredients: [
    "500g chicken breast",
    "2 tbsp soy sauce",
    "1 tsp garlic powder",
    // Add more ingredients...
  ],

  steps: [
    {
      title: "Marinate the chicken",
      description: "Mix soy sauce and garlic powder, coat the chicken, and let it rest for 20 minutes.",
      image: "https://your-image-url.com/step1.jpg",  // Optional step photo
      tip: "Marinating overnight makes the flavour much deeper."  // Optional tip
    },
    {
      title: "Cook the chicken",
      description: "Heat oil in a pan over medium-high heat. Cook for 6–8 minutes per side.",
      image: null  // Set to null if no photo for this step
    }
    // Add more steps...
  ],

  notes: "Serve with steamed rice and a side salad.",  // Optional notes
  source: "https://original-recipe-source.com"         // Optional credit
}
```

### 📸 Adding Photos

**For step images**, you can use:
- **External URLs** – paste in any public image URL from the web.
- **Local images** – place your `.jpg` or `.png` files in `src/assets/images/` and reference them like:
  ```js
  image: require("../assets/images/my-step-photo.jpg")
  ```

**For the cover image**, do the same — either a URL or a local `require()`.

---

## 🗂️ Project Structure

```
marques-recipes/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── images/          ← Drop local images here
│   ├── components/
│   │   ├── Navbar.js        ← Top navigation bar
│   │   └── Footer.js        ← Footer with social links
│   ├── data/
│   │   └── recipes.js       ← ⭐ All recipe data lives here
│   ├── pages/
│   │   ├── HomePage.js      ← Landing page with recipe list
│   │   ├── RecipePage.js    ← Individual recipe detail view
│   │   └── AddRecipePage.js ← Form to add a new recipe (UI)
│   ├── App.js
│   ├── App.css              ← Global styles & design tokens
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
# marques-recipes
