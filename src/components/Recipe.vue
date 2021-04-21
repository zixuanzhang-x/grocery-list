<template>
  <div class="recipe">
    <div class="container text-center">
      <h1>
        <b-icon icon="brightness-high" class="rounded-circle bg-warning p-2"></b-icon>
        Eureka!
      </h1>
    </div>
    <hr />
    <b-card-group deck>
      <div v-for="(recipe, index) in recipes" :key="index" class="b-card">
        <b-card no-body :img-src="recipe.image" img-alt="Image" img-top>
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
import recipesJson from "@/assets/recipes.json";

export default {
  name: "Recipe",
  data() {
    return {
      recipes: recipesJson,
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
    padding: 10px;
  }
}
</style>
