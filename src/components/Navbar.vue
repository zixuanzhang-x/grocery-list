<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <b-button v-b-toggle.sidebar-backdrop size="sm">
          <b-icon icon="list"></b-icon>
        </b-button>
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-button @click.prevent="signOut" size="sm">
          <b-icon icon="box-arrow-in-left"></b-icon>
          Sign out
        </b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig.js";

export default {
  methods: {
    signOut() {
      auth
        .signOut()
        .then(() => {
          this.user = null;
          this.$emit("signOut")
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped></style>
