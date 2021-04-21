<template>
  <div id="app">
    <Navbar v-if="user" @signOut="user = null" />
    <div class="row">
      <Sidebar />
      <div
        v-if="user && windowWidth >= 768"
        class="col"
        id="menu-container"
      >
        <Menu />
      </div>
      <div class="col">
        <router-view :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Menu from "@/components/Menu";

import { auth } from "@/firebaseConfig.js";

export default {
  name: "App",
  components: { Navbar, Sidebar, Menu },
  data() {
    return {
      user: null,
      windowWidth: window.innerWidth,
    };
  },
  beforeCreate() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
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

#menu-container {
  max-width: 320px;
  min-width: 320px;
  padding-right: 0px;
}

.pac-item {
  padding: 6px;
  font-size: 14px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 14px;
}
</style>
