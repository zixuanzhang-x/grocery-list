<template>
  <div class="recipe">
    <div class="container text-center">
      <h1>
        <b-icon
          icon="brightness-high"
          class="rounded-circle bg-warning p-2"
        ></b-icon>
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
            <b-button v-b-modal="'modal-' + index" variant="primary" block
              >Add All Ingredients to plan</b-button
            >
            <b-modal
              :id="'modal-' + index"
              title="Add ingredients to a store in a plan"
              hide-footer
            >
              <b-form @submit.prevent="addIngredients(recipe.ingredients, index)">
                <b-form-group
                  id="plan-select-label"
                  label="Select Plan:"
                  label-for="plan-select"
                >
                  <b-form-select
                    id="plan-select"
                    v-model="selectedPlanId"
                    :options="planOptions"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group
                  id="store-select-label"
                  v-if="selectedPlanId"
                  label="Select Store:"
                  label-for="store-select"
                >
                  <b-form-select
                    id="store-select"
                    v-if="selectedPlanId"
                    v-model="selectedStore"
                    :options="storeOptions"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
              </b-form>
            </b-modal>
          </b-card-body>
        </b-card>
      </div>
    </b-card-group>
  </div>
</template>

<script>
import recipesJson from "@/assets/recipes.json";

import { db } from "../firebaseConfig.js";

const plans = db.collection("plans");

export default {
  name: "Recipe",
  props: ["user"],
  data() {
    return {
      recipes: recipesJson,
      plans: null,
      selectedPlanId: "",
      selectedStore: "",
    };
  },
  computed: {
    planOptions() {
      let options = [];
      if (this.plans) {
        options = this.plans.map((plan) => {
          return {
            value: plan.id,
            text: plan.name,
          };
        });
      }
      return options;
    },
    storeOptions() {
      let options = [];
      if (this.selectedPlanId && this.plans) {
        const stores = this.plans.filter(plan => plan.id == this.selectedPlanId)[0].stores;
        for (const store in stores) {
          options.push({
            value: store,
            text: store,
          });
        }
      }
      return options;
    },
  },
  methods: {
    addIngredients(ingredients, index) {
      // console.log(ingredients)
      const plan = this.plans.filter(plan => plan.id == this.selectedPlanId)[0];

      ingredients.forEach((ingredient) => {
        plan.stores[this.selectedStore].items[ingredient] = {
          quantity: 1,
          isBought: false,
        }
      })
      
      db.collection("plans").doc(this.selectedPlanId).set(plan)

      this.$bvModal.hide('modal-' + index)
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        if (user) {
          this.$bind("plans", plans.where("uid", "==", user.uid).where("isDone", "==", false));
        }
      },
    },
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
