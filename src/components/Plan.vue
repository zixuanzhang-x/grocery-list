<template>
  <div class="plan">
    <!-- display name, date -->
    <b-container class="plan-head">
      <b-row>
        <b-col cols="8">
          <p>{{ plan.name }}</p>
        </b-col>
        <b-col cols="4">
          <b-form-datepicker
            id="datepicker-dateformat1"
            v-model="plan.date"
            locale="en"
            :min="new Date()"
            @input="setDate"
          ></b-form-datepicker>
        </b-col>
        <b-progress
          :value="boughtItemsCount"
          :max="allItemsCount"
          class="w-25"
          variant="success"
          striped="striped"
          animated
        ></b-progress>
        <b-button variant="success" @click="completePlan"
          >Mark as Completed</b-button
        >
      </b-row>
    </b-container>

    <!-- store tabs and ingredients -->
    <div class="plan-body">
      <b-tabs content-class="mt-3">
        <!-- Existing stores -->
        <div
          v-for="(storeInfo, store, index) in plan.stores"
          :key="store"
          class="existing-stores"
        >
          <b-tab :title="store" :active="index == 0">
            <!-- progress bar -->

            <b-container>
              <b-row>
                <!-- unchecked items -->
                <b-col>
                  <h4>Need to Buy</h4>
                  <div v-for="(itemInfo, item) in storeInfo.items" :key="item">
                    <b-form-checkbox
                      v-if="!itemInfo.isBought"
                      @change="checkItem(store, item)"
                      checked="false"
                    >
                      <span>{{ item }}</span>
                      {{ " " }}
                      <b-badge variant="success">{{
                        itemInfo.quantity + " unit"
                      }}</b-badge>
                    </b-form-checkbox>
                  </div>
                </b-col>

                <!-- checked items -->
                <b-col>
                  <h4>Completed</h4>
                  <div v-for="(itemInfo, item) in storeInfo.items" :key="item">
                    <b-form-checkbox
                      v-if="itemInfo.isBought"
                      @change="checkItem(store, item)"
                      checked="true"
                    >
                      <span class="bought">{{ item }}</span>
                      {{ " " }}
                      <b-badge>{{ itemInfo.quantity + " unit" }}</b-badge>
                    </b-form-checkbox>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-tab>
        </div>

        <div>
          <b-tab v-if="plan.stores" title="Add Store"> </b-tab>
        </div>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

const plans = db.collection("plans");

export default {
  name: "Plan",
  props: ["id"],
  data() {
    return {
      plan: { name: "" },
      allItemsCount: 0,
      boughtItemsCount: 0,
    };
  },
  methods: {
    checkItem(store, item) {
      this.plan.stores[store].items[item].isBought = !this.plan.stores[store]
        .items[item].isBought;
      db.collection("plans")
        .doc(this.plan.id)
        .set(this.plan);
    },
    setDate() {
      db.collection("plans")
        .doc(this.plan.id)
        .set(this.plan);
    },
    completePlan() {
      this.plan.isDone = true;
      db.collection("plans")
        .doc(this.plan.id)
        .set(this.plan);
      this.$router.push({ path: '/history' })
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(id) {
        this.$bind("plan", plans.doc(id));
      },
    },
    plan: {
      immediate: true,
      handler(plan) {
        // update progress bar
        let allItemsCount = 0;
        let boughtItemsCount = 0;
        for (const store in plan.stores) {
          for (const item in plan.stores[store].items) {
            allItemsCount++;
            if (plan.stores[store].items[item].isBought) {
              boughtItemsCount++;
            }
          }
        }
        this.allItemsCount = allItemsCount;
        this.boughtItemsCount = boughtItemsCount;
      },
    },
  },
};
</script>

<style scoped>
.plan {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}

.plan-head {
  /* border: 1px solid green; */
  margin-left: 20px;
}

.plan-head p {
  font-size: 30px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}

.plan-body {
  /* border: 1px solid red; */
  margin-top: 5px;
}

.bought {
  text-decoration: line-through;
  color: grey;
}
</style>
