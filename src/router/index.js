import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Home.vue";
import Recipe from "@/components/Recipe.vue";
import Store from "@/components/Store.vue";
import Plan from "@/components/Plan.vue";

import { auth } from "@/firebaseConfig.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/recipe",
    name: "Recipe",
    component: Recipe,
  },
  {
    path: "/store",
    name: "Store",
    component: Store,
  },
  {
    path: "/plan",
    name: "Plan",
    component: Plan,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// this makes the router check each change in routes -- if their "meta" says it requires auth, it will check for auth.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    next("/");
  } else if (!requiresAuth && auth.currentUser) {
    next("/store");
  } else {
    next();
  }
});

export default router;
