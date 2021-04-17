<template>
  <div class="recipe">
    <b-card-group deck>
      <div v-for="(recipe, index) in recipes" :key="index" class="b-card">
        <b-card
          no-body
          img-src="https://images.unsplash.com/photo-1579887829114-282b4fa31072?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          img-alt="Image"
          img-top
        >
          <b-card-body>
            <b-card-title>{{ recipe.name }}</b-card-title>
            <b-card-sub-title class="mb-2">{{
              recipe.comments
            }}</b-card-sub-title>
            <b-card-text>
              Tags:
              <span v-for="tag in recipe.tags" :key="tag">
                <b-badge>{{ tag }}</b-badge>
                {{ " " }}
              </span>
            </b-card-text>
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle="'accordion-' + index + '-1'"
                    variant="outline-primary"
                    >Ingredients</b-button
                  >
                </b-card-header>
                <b-collapse
                  :id="'accordion-' + index + '-1'"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-card-text>
                      <ul>
                        <li
                          v-for="ingredient in recipe.ingredients"
                          :key="ingredient"
                        >
                          {{ ingredient }}
                        </li>
                      </ul>
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle="'accordion-' + index + '-2'"
                    variant="outline-primary"
                    >Instructions</b-button
                  >
                </b-card-header>
                <b-collapse
                  :id="'accordion-' + index + '-2'"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-card-text>{{ recipe.instructions }}</b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button
                    block
                    v-b-toggle="'accordion-' + index + '-3'"
                    variant="outline-primary"
                    >Nutrition Facts</b-button
                  >
                </b-card-header>
                <b-collapse
                  :id="'accordion-' + index + '-3'"
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <b-card-text>
                      "calories": 0, "fat": 0, "satfat": 0, "carbs": 0, "fiber":
                      0, "sugar": 0, "protein": 0,
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </b-card-body>

          <b-card-body>
            <b-button variant="primary" block
              >Add All Ingredients to plan</b-button
            >
          </b-card-body>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "Recipe",
  data() {
    return {
      recipes: [
        {
          name: "Baked Shrimp Scampi",
          source: "Ina Garten: Barefoot Contessa Back to Basics",
          comments:
            "Modified by reducing butter and salt.  Substituted frozen shrimp instead of fresh 12-15 count (butterflied, tails on).",
          calories: 2565,
          fat: 159,
          satfat: 67,
          carbs: 76,
          fiber: 4,
          sugar: 6,
          protein: 200,
          instructions:
            "Preheat the oven to 425 degrees F.\r\n\r\nDefrost shrimp by putting in cold water, drain. Place the shrimp in serving dish (9x13 or 2 quart casserole) and toss gently with the olive oil, wine, 1 teaspoons salt, and 1 teaspoon pepper. Allow to sit at room temperature while you make the butter and garlic mixture.\r\n\r\nIn a small bowl, mash the softened butter with the garlic, shallots, parsley, rosemary, red pepper flakes, lemon zest, lemon juice, egg yolk, panko, 1/2 teaspoon salt, and 1/4 teaspoon of pepper until combined.\r\n\r\nSpread the butter mixture evenly over the shrimp. Bake for 10 to 12 minutes until hot and bubbly. If you like the top browned, place under a broiler for 1-3 minutes (keep an eye on it). Serve with lemon wedges and French bread.\r\n\r\nNote: if using fresh shrimp, arrange for presentation. Starting from the outer edge of a 14-inch oval gratin dish, arrange the shrimp in a single layer cut side down with the tails curling up and towards the center of the dish. Pour the remaining marinade over the shrimp. ",
          ingredients: [
            "2/3 cup panko\r",
            "1/4 teaspoon red pepper flakes\r",
            "1/2 lemon, zested and juiced\r",
            "1 extra-large egg yolk\r",
            "1 teaspoon rosemary, minced\r",
            "3 tablespoon parsley, minced\r",
            "4 clove garlic, minced\r",
            "1/4 cup shallots, minced\r",
            "8 tablespoon unsalted butter, at room temperature\r",
            "2 tablespoon dry white wine\r",
            "Freshly ground black pepper\r",
            "Kosher salt\r",
            "3 tablespoon olive oil\r",
            "2 pound frozen shrimp",
          ],
          tags: ["seafood", "shrimp", "main"],
        },
        {
          name: "Baked Shrimp Scampi 2",
          source: "Ina Garten: Barefoot Contessa Back to Basics",
          comments:
            "Modified by reducing butter and salt.  Substituted frozen shrimp instead of fresh 12-15 count (butterflied, tails on).",
          calories: 2565,
          fat: 159,
          satfat: 67,
          carbs: 76,
          fiber: 4,
          sugar: 6,
          protein: 200,
          instructions:
            "Preheat the oven to 425 degrees F.\r\n\r\nDefrost shrimp by putting in cold water, drain. Place the shrimp in serving dish (9x13 or 2 quart casserole) and toss gently with the olive oil, wine, 1 teaspoons salt, and 1 teaspoon pepper. Allow to sit at room temperature while you make the butter and garlic mixture.\r\n\r\nIn a small bowl, mash the softened butter with the garlic, shallots, parsley, rosemary, red pepper flakes, lemon zest, lemon juice, egg yolk, panko, 1/2 teaspoon salt, and 1/4 teaspoon of pepper until combined.\r\n\r\nSpread the butter mixture evenly over the shrimp. Bake for 10 to 12 minutes until hot and bubbly. If you like the top browned, place under a broiler for 1-3 minutes (keep an eye on it). Serve with lemon wedges and French bread.\r\n\r\nNote: if using fresh shrimp, arrange for presentation. Starting from the outer edge of a 14-inch oval gratin dish, arrange the shrimp in a single layer cut side down with the tails curling up and towards the center of the dish. Pour the remaining marinade over the shrimp. ",
          ingredients: [
            "2/3 cup panko\r",
            "1/4 teaspoon red pepper flakes\r",
            "1/2 lemon, zested and juiced\r",
            "1 extra-large egg yolk\r",
            "1 teaspoon rosemary, minced\r",
            "3 tablespoon parsley, minced\r",
            "4 clove garlic, minced\r",
            "1/4 cup shallots, minced\r",
            "8 tablespoon unsalted butter, at room temperature\r",
            "2 tablespoon dry white wine\r",
            "Freshly ground black pepper\r",
            "Kosher salt\r",
            "3 tablespoon olive oil\r",
            "2 pound frozen shrimp",
          ],
          tags: ["seafood", "shrimp", "main"],
        },
      ],
    };
  },
};
</script>

<style scoped>
.recipe {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}
@media screen and (min-width: 1100px) {
  .b-card {
    max-width: 50%;
  }
}
</style>
