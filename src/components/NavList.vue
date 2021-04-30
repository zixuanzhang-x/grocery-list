<template>
  <div>
    <b-list-group flush>
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
      <b-list-group-item>
        <b-icon icon="cart3"></b-icon>
        Shopping Plans
        <b-icon
          v-if="visible"
          v-b-toggle.collapse-plan
          icon="chevron-down"
        ></b-icon>
        <b-icon v-else v-b-toggle.collapse-plan icon="chevron-left"></b-icon>
        <p></p>
        <b-collapse id="collapse-plan" v-model="visible">
          <b-list-group flush v-for="plan in plans" :key="plan.id">
            <b-list-group-item v-if="!plan.isDone" :to="'/plan/' + plan.id">{{ plan.name }}</b-list-group-item>
          </b-list-group>
          <b-list-group flush>
            <b-list-group-item to="/add-plan" pill>
            <b-icon icon="journal-plus"></b-icon>
            Add Plan</b-list-group-item>
          </b-list-group>
        </b-collapse>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

export default {
  name: "NavList",
  props: ["user"],
  data() {
    return {
      visible: true,
      plans: [],
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.$bind("plans", db.collection("plans").where("uid", "==", user.uid));
      }
    }
  }
};
</script>

<style></style>
