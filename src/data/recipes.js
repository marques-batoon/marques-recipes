import ribsImage from '../photos/ribs.jpeg';
import boilDown from '../photos/boilDown.jpeg';
import sear from '../photos/sear.jpeg';

const recipes = [
  {
    id: 1,
    title: "Sweet and Sour Ribs",
    chineseTitle: "糖醋排骨",
    category: "Main Course",
    cuisine: "Chinese",
    prepTime: "2 mins",
    cookTime: "1 hr 10 mins",
    servings: 3,
    difficulty: "Easy",
    description:
      "A beginner-friendly recipe for Chinese sweet and sour ribs. It provides a well-balanced condiment ratio, an approachable cooking method and delivers a restaurant-standard result. No deep-frying required!",
    coverImage:
      ribsImage,
    ingredients: [
      "pork ribs chopped into short pieces if possible",
      "cooking oil",
      "5-10 cloves garlic",
      "1 thumb-sized piece of ginger",
      "2 stalks green onion, cut into halves",
      "5 tablespoons white sugar (or 70g / 2½ oz rock sugar)",
      "4 tablespoons black rice vinegar (Chinkiang vinegar), divided",
      "1 tablespoon light soy sauce",
      "1 teaspoon dark soy sauce",
      "salt",
      "Toasted sesame seeds, for garnish",
      "Green onion chopped, finely chopped, for garnish",
    ],
    steps: [
      {
        phase: "Blanch the Ribs",
        title: "Rinse and blanch the pork ribs",
        description:
          "Cut the pork ribs into small pieces (can be easily picked up with chopsticks). Put the cut ribs in a big pot and fill with cold water. Bring the water to a boil. This will clean any impurities and remove any overly meaty aromas.",
        //image:
        //  "https://redhousespice.com/wp-content/uploads/2022/02/pouring-water-over-ribs-scaled.jpg",
        //tip: "Unlike blanching vegetables, always start with cold water — not boiling — when blanching meat.",
      },
      {
        phase: "Blanch the Ribs",
        title: "Remove the foam",
        description:
          "Remove the grey foam with a spoon that will raise to the top. Drain the ribs into a strainer after 3-5 minutes.",
        //image:
        //  "https://redhousespice.com/wp-content/uploads/2022/02/skimming-off-foam-scaled.jpg",
        tip: null,
      },
      {
        phase: "Braise the Ribs",
        title: "Pan-fry the ribs with aromatic ingredients",
        description:
          "Heat oil in a pan until it smokes. Add the garlic, ginger, and green onion pieces into the oil. Once the oil is flavored after a minute, add the ribs and pan-fry until the ribs are golden brown colored.",
        image:
          sear,
        tip: "Chinese black vinegar is very acidic so don't use cast iron it will damage the pan.",
      },
      {
        phase: "Braise the Ribs",
        title: "Add condiments and water",
        description:
          "Add 5 tablespoons sugar, 4 tablespoons of the black rice vinegar, 1 tablespoon of light soy sauce, 1 teaspoon of dark soy sauce, and salt. Pour in hot water to cover the ribs and bring the water to boil.",
        //image:
        //  "https://redhousespice.com/wp-content/uploads/2022/02/adding-water-to-ribs-scaled.jpg",
        tip: "The ideal sugar to vinegar ratio is 5:4 by volume for a perfectly balanced sweet-sour flavour.",
      },
      {
        phase: "Braise the Ribs",
        title: "Simmer the ribs",
        description:
          "When the water reaches boiling point, cover with a lid and change the heat to low. Let it simmer for 50 minutes.",
        //image:
        //  "https://redhousespice.com/wp-content/uploads/2022/02/covering-wok-with-lid-scaled.jpg",
        tip: "If you lid doesn't fit well then the water level might fall too low. Add some water if this happens.",
      },
      {
        phase: "Reduce the Sauce",
        title: "Boil down the broth",
        description:
          "When the time is up, try to remove all the garlic, ginger, and scallions if you can. I leave some garlic sometimes it's no big deal. Add 1 more tablespoon of Chinese black vinegar and stir. Turn the heat up to high. Stir while it is boiling.",
        image:
          boilDown,
        tip: "We add extra vinegar now because the vinegar's flavor goes away during the simmering. This introduces it back into the dish.",
      },
      {
        phase: "Reduce the Sauce",
        title: "Stop at the perfect consistency",
        description:
          "At the perfect time take it off the heat and place in a bowl. You want it at the perfect consistency. Take it out too early and the sauce is too watery and won't stick to the ribs. Take it out too late and it will overcook and the sugar will burn and taste bad.",
        //image:
        //  "https://redhousespice.com/wp-content/uploads/2022/02/ribs-with-a-sticky-sauce-scaled.jpg",
        tip: "The sauce thickens as it cools, so turn off the heat just before it looks perfect.",
      },
      {
        phase: "Garnish & Serve",
        title: "Plate and garnish",
        description:
          "Sprinkle toasted sesame seeds and chopped green onions on top. Serve warm or at room temperature alongside steamed rice and a fresh vegetable dish.",
        image:
          ribsImage,
        tip: null,
      },
    ]
  },
];

export default recipes;
