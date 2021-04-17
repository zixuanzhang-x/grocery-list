<template>
  <div>
    <b-list-group flush>
      <b-list-group-item to="/search">
        <b-icon icon="search"></b-icon>
        Search
      </b-list-group-item>
      <b-list-group-item to="/recipe">
        <b-icon icon="book"></b-icon>
        Recipe
      </b-list-group-item>
      <b-list-group-item to="/history">
        <b-icon icon="clock"></b-icon>
        History
      </b-list-group-item>
      <b-list-group-item to="/calendar">
        <b-icon icon="calendar2-date"></b-icon>
        Calendar
      </b-list-group-item>
      <b-list-group-item to="/template">
        <b-icon icon="collection"></b-icon>
        Template
      </b-list-group-item>
      <b-list-group-item to="/store">
        <b-icon icon="house-door"></b-icon>
        Store
      </b-list-group-item>
      <b-list-group-item>
        <b-icon icon="cart3"></b-icon>
        Shopping Plans
        <b-icon v-if="visible" v-b-toggle.collapse-plan icon="chevron-down"></b-icon>
        <b-icon v-else v-b-toggle.collapse-plan icon="chevron-left"></b-icon>
        <p></p>
        <b-collapse id="collapse-plan" v-model="visible">
          <b-list-group flush>
            <b-list-group-item>My Shopping Plan 1</b-list-group-item>
            <b-list-group-item>Plan 2</b-list-group-item>
            <b-list-group-item>Plan 3</b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
    name: "NavList",
    data() {
        return {
            visible: true
        }
    }
};
</script>

<style></style>
