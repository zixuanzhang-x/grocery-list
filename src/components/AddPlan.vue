<template>
  <div class="add-plan">
    <b-form @submit.prevent="addPlan">
      <b-form-group
        id="input-group-name"
        label="Plan Name:"
        label-for="input-name"
        required
      >
        <b-form-input
          id="input-name"
          v-model="name"
          placeholder="Enter a plan name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-date"
        label="Plan Date:"
        label-for="input-date"
        description="You can change it later."
      >
        <b-form-datepicker
          id="input-date"
          v-model="date"
          class="mb-2"
          :min="new Date()"
          required
        ></b-form-datepicker>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      {{ " " }}
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

export default {
  name: "AddPlan",
  props: ["user"],
  data() {
    return {
      name: "",
      date: new Date().toISOString().split("T")[0],
    };
  },
  methods: {
    addPlan() {
      const vue = this;
      db.collection("plans")
        .add({
          name: this.name,
          date: this.date,
          isDone: false,
          isTemplate: false,
          uid: this.user.uid,
          stores: {},
        })
        .then(function(docRef) {
          vue.$router.push({ path: `/plan/${docRef.id}` })
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
  },
};
</script>

<style>
.add-plan {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}
</style>
