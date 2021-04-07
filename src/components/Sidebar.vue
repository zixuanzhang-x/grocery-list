<template>
  <div class="sidebar">
    <div class="bg-light border-right" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Search</router-link
        >
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Recipe</router-link
        >
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >History</router-link
        >
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Calendar</router-link
        >
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Template</router-link
        >
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Store</router-link
        >
        <p>My Grocery Lists</p>
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Shopping Plan 1</router-link
        >
        <router-link
          to="/"
          class="list-group-item list-group-item-action"
          >Shopping Plan 2</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.sidebar {
  border-radius: 10px;
  padding: 5px 10px;
  margin: 30px;
  background-color: white;
  font-size: 16px;
}


</style>
