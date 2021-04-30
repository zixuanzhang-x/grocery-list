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
          <b-col cols="4" class="btns">
            <b-button
              v-if="plan.isTemplate == false"
              @click="markTemplate(plan)"
              pill
              variant="outline-info"
              size="sm"
              style="font-size:15px"
              class="btn"
              >Mark as Template</b-button
            >
            <b-button
              v-if="plan.isTemplate == true"
              @click="cancelTemplate(plan)"
              pill
              variant="outline-dark"
              size="sm"
              style="font-size:15px"
              class="btn"
              >Cancel Template</b-button
            >
            <b-button
              @click="delPlan(plan)"
              pill
              variant="outline-danger"
              size="sm"
              style="font-size:15px"
              class="btn"
              >Delete Plan</b-button
            >
          </b-col>
        </b-row>
        <b-row class="store-cards">
          <b-card
            v-for="(storeInfo, store) in plan.stores"
            :key="store"
            border-variant="secondary"
            header-border-variant="secondary"
            align="left"
            class="b-card"
            no-body
          >
            <b-card-title class="card-title">
              {{ store }}
            </b-card-title>
            <b-card-text class="card-text">
              <b-row
                v-for="(itemsInfo, item) in storeInfo.items"
                :key="item"
                class="items"
              >
                <span
                  ><b-icon icon="dot" font-scale="1.5"></b-icon>
                  {{ item }}
                  <div class="badge">
                    <b-badge variant="success">{{
                      itemsInfo.quantity + " unit"
                    }}</b-badge>
                  </div></span
                >
              </b-row>
            </b-card-text>
          </b-card>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";

export default {
  name: "History",
  props: ["user"],
  data() {
    return {
      plans: [],
    };
  },


  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.$bind("plans", db.collection("plans").where("uid", "==", user.uid).where("isDone", "==", true));
      },
    },
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

    delPlan: function(plan) {
      db.collection("plans")
        .doc(plan.id)
        .delete();
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
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
}

.plan-date {
  /* border: 1px solid purple; */
  margin-left: 10px;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  color: gray;
  font-style: italic;
}

.btn {
  margin-left: 5px;
}

.store-cards {
  /* border: 1px solid red; */
  margin-top: 10px;
  margin-bottom: 30px;
}

.card-title {
  font-size: 25px;
  text-align: center;
  padding-top: 20px;
}

.card-text {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 15px;
}

.items {
  /* border: 1px solid red; */
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-bottom: 5px;
}

.badge {
  margin-left: 2px;
  font-size: 10px;
}

@media screen and (min-width: 1200px) {
  .b-card {
    max-width: 30%;
    margin-left: 8px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 1200px) and (min-width: 900px) {
  .b-card {
    max-width: 45%;
    margin-left: 5px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 900px) {
  .b-card {
    max-width: 100%;
    margin-bottom: 10px;
  }
}
</style>
