<template>
  <div class="history">
    <div class="container-fluid text-center">
      <h1>
        <b-icon
          icon="card-checklist"
          class="rounded-circle bg-danger p-2"
          variant="light"
        ></b-icon>
        Shopping Histories
      </h1>
    </div>
    <hr />

    <b-container>
      <div v-for="plan in plans" :key="plan.id">
        <b-row>
          <b-col cols="8">
            <b-icon icon="check-square" scale="1.8"></b-icon>
            <span class="plan-name">{{ plan.name }}</span>
            <span v-if="plan.date" class="plan-date"
              >shopped on {{ plan.date }}</span
            >
          </b-col>
          <b-col class="template-btn">
            <b-button
              v-if="plan.isTemplate == false"
              @click="markTemplate(plan)"
              class="btn"
              pill
              variant="outline-info"
              >Mark as Template</b-button
            >
            <b-button
              v-if="plan.isTemplate == true"
              @click="cancelTemplate(plan)"
              class="btn"
              pill
              variant="outline-dark"
              >Cancel Template</b-button
            >
          </b-col>
        </b-row>
        <b-row class="store-cards">
          <b-card-group columns>
            <b-card
              v-for="(storeInfo, store) in plan.stores"
              :key="store"
              border-variant="secondary"
              header-border-variant="secondary"
              align="left"
            >
              <b-card-title>
                <h5>{{ store }}</h5>
              </b-card-title>
              <hr />
              <b-card-text>
                <b-row
                  v-for="(itemsInfo, item) in storeInfo.items"
                  :key="item"
                  class="items"
                >
                  <b-icon icon="dot" font-scale="1.5"></b-icon>
                  <span>{{ item }}</span>
                  {{ " " }}
                  <b-badge variant="success">{{itemsInfo.quantity + " unit"}}</b-badge>
                </b-row>
              </b-card-text>
            </b-card>
          </b-card-group>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";

export default {
  name: "History",
  data() {
    return {
      plans: [],
    };
  },

  firestore: {
    plans: db.collection("plans").where("isDone", "==", true),
  },

  methods: {
    markTemplate: function(plan) {
      db.collection("plans")
        .doc(plan.id)
        .update({ isTemplate: true });
    },

    cancelTemplate: function(plan) {
      db.collection("plans")
        .doc(plan.id)
        .update({ isTemplate: false });
    },
  },
};
</script>

<style scoped>
.history {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}

.plan-name {
  /* border: 1px solid green; */
  margin-left: 20px;
  font-size: 36px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}

.plan-date {
  /* border: 1px solid purple; */
  margin-left: 10px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: gray;
  font-style: italic;
}

.template-btn {
  /* border: 1px solid blue; */
  /* vertical-align: text-bottom; */
}

.store-cards {
  /* border: 1px solid red; */
  margin-top: 10px;
  margin-bottom: 30px;
}

h5 {
  /* text-align: center; */
  /* border: 1px solid blue; */
  text-align: center;
}

b-card-title {
  padding-top: 0;
}

.items {
  /* border: 1px solid red; */
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-bottom: 5px;
}

@media screen and (min-width: 2400px) {
  .b-card {
    max-width: 50%;
    padding: 10px;
  }
}
</style>
