<template>
  <div id="app">
    <div class="row">
      <div v-if="user" class="col-12">
        <Navbar />
      </div>
      <div v-if="user" class="col-4">
        <Sidebar />
      </div>
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

import { auth } from "@/firebaseConfig.js";

export default {
  name: "App",
  components: { Navbar, Sidebar },
  data() {
    return {
      user: null,
    }
  },
  beforeCreate() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
