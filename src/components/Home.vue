<template>
  <div class="home">
    <b-jumbotron
      header="Grocery List"
      lead="Make your grocery shopping eaiser!"
    >
      <p>Sign in to use this app!</p>
      <b-button variant="primary" @click.prevent="signInWithGoogle">Sign in with Google</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import { auth, provider } from "@/firebaseConfig.js";

export default {
  methods: {
    signInWithGoogle() {
      auth
        .signInWithRedirect(provider)
        .then(() => {
          // this.user = response.user;
          this.$router.push("recipe")
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.home {
  margin: 100px;
}
</style>
