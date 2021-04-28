import Vue from "vue";
import VueRouter from "vue-router";


import Home from "@/components/Home.vue";
import Recipe from "@/components/Recipe.vue";
import Calendar from "@/components/Calendar.vue";
import History from "@/components/History.vue";
import Plan from "@/components/Plan.vue";
import AddPlan from "@/components/AddPlan.vue";

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
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/history",
    name: "History",
    component: History,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/plan/:id",
    name: "Plan",
    component: Plan,
    props: true,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/add-plan",
    name: "AddPlan",
    component: AddPlan,
    meta: {
      requiresAuth: true,
    }
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
    next("/recipe");
  } else {
    next();
  }
});

export default router;
