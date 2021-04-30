<template>
  <div class="template">
    <div class="container-fluid text-center">
      <h1>
        <b-icon
          icon="bookmark-check-fill"
          class="rounded-circle bg-success p-2"
          variant="light"
        ></b-icon>
        Shopping Templates
      </h1>
    </div>
    <hr />

    <b-container>
      <div v-for="plan in plans" :key="plan.id">
        <b-row>
          <b-col cols="8">
            <b-icon icon="archive" scale="1.8"></b-icon>
            <span class="plan-name">{{ plan.name }}</span>
          </b-col>
          <b-col cols="4" class="btns">
            <b-button
              @click="newPlan(plan)"
              class="btn"
              pill
              variant="outline-success"
              style="font-size:15px"
            >
              New Plan
            </b-button>
            <b-button
              @click="cancelTemplate(plan)"
              pill
              variant="outline-dark"
              size="sm"
              style="font-size:15px"
              class="btn"
              >Cancel Template</b-button
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
                <span>
                  <b-icon icon="dot" font-scale="1.5"></b-icon>
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
        this.$bind("plans", db.collection("plans").where("uid", "==", user.uid).where("isTemplate", "==", true));
      },
    },
  },

  methods: {
    newPlan: function(plan) {
      const stores = plan.stores;
      const name = plan.name;

      for (var s in stores) {
        for (var i in stores[s]["items"]) {
          stores[s]["items"][i]["isBought"] = false;
        }
      }

      const newPlanObj = {
        name: name,
        stores: stores,
        isTemplate: false,
        isDone: false,
        uid: this.user.uid,
        date: "",
      };

      db.collection("plans")
        .add(newPlanObj)
        .then((docRef) => {
          this.$router.push({ name: "Plan", params: { id: docRef.id } });
        });
    },

    cancelTemplate: function(plan) {
      db.collection("plans")
        .doc(plan.id)
        .update({ isTemplate: false });
    }
  }
};
</script>

<style scoped>
.template {
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
