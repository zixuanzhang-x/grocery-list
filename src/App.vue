<template>
  <div id="app">
    <Navbar />
    <div class="row">
      <div class="col-4">
        <Sidebar />
      </div>
      <div>
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
    };
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

<style></style>
