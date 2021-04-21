<template>
  <div class="plan">
    <!-- display plan_name, date -->
    <b-container class="plan-head">
      <b-row>
        <b-col cols="8">
          <p>{{ plan.plan_name }}</p>
        </b-col>
        <b-col cols="4">
          <b-form-datepicker
            id="datepicker-dateformat1"
            v-model="planDate"
            locale="en"
          ></b-form-datepicker>
        </b-col>
      </b-row>
    </b-container>

    <!-- store tabs and ingredients -->
    <div class="plan-body">
      <b-tabs content-class="mt-3" align="center">
        <!-- Existing stores -->
        <div v-for="store in stores" :key="store.id" class="existing-stores">
          <b-tab :title="store.store_name" @click="switchStore(store)" active>
            <!-- progress bar -->
            <b-progress
              :value="checkedItems.length"
              :max="items.length"
              class="w-25"
              variant="success"
              striped="striped"
              animated="animate"
            ></b-progress>

            <b-container>
              <b-row>
                <!-- unchecked items -->
                <b-col>
                  <h4>Items Not Buy</h4>
                  <div v-for="item in uncheckedItems" :key="item.id">
                    <b-form-checkbox
                      @change="updateStatus(item)"
                      checked="false"
                    >
                      <span>{{ item.item_name }}</span>
                    </b-form-checkbox>
                  </div>
                </b-col>

                <!-- checked items -->
                <b-col>
                  <h4>Items Already Bought</h4>
                  <div v-for="item in checkedItems" :key="item.id">
                    <b-form-checkbox
                      @change="updateStatus(item)"
                      checked="true"
                    >
                      <span class="bought">{{ item.item_name }}</span>
                    </b-form-checkbox>
                  </div>
                </b-col>
              </b-row>
            </b-container>
          </b-tab>
        </div>

        <!-- New store -->
        <template #tabs-end>
          <b-nav-item role="presentation" :to="'/plan/'+planId+'/store'"
            ><b>Find New</b></b-nav-item
          >
        </template>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig.js";

export default {
  name: "Plan",
  data() {
    return {
      planId: this.$route.params.id,
      plan: null,
      planDate: null,
      stores: [],
      storeName: "",
      storeId: null,
      items: [],
      checkedItems: [],
      uncheckedItems: [],
      itemId: null,
    };
  },


  methods: {
    switchStore: function(store) {
      this.storeName = store.store_name;
      this.storeId = store.id;
    },

    updateStatus: function(item) {
      const itemRef = db
        .collection("plans")
        .doc(this.planId)
        .collection("stores")
        .doc(this.storeId)
        .collection("items")
        .doc(item.id);

      if (item.item_status == false) {
        itemRef.update({ item_status: true });
        this.items = [];
      } else {
        itemRef.update({ item_status: false });
        this.items = [];
      }
    },
  },


  watch: {
    $route: {
      immediate: true,
      handler: function(r) {
        this.planId = r.params.id;

        //read the selected plan
        db.collection("plans").onSnapshot((snapPlan) => {
          snapPlan.forEach((docPlan) => {
            var p = docPlan.data();
            if (docPlan.id == this.planId) {
              p.id = docPlan.id;
              this.plan = p;
              this.stores = [];
              this.planDate = p.plan_date;
            }
          });
        });

        // read all stores for this plan -> store tabs
        db.collection("plans")
          .doc(this.planId)
          .collection("stores")
          .onSnapshot((snapStore) => {
            snapStore.forEach((docStore) => {
              var s = docStore.data();
              s.id = docStore.id;
              this.stores.push(s);
            });
          });
      },
    },

    storeId: {
      immediate: true,
      handler: function() {
        this.items = [];
        db.collection("plans")
          .doc(this.planId)
          .collection("stores")
          .doc(this.storeId)
          .collection("items")
          .onSnapshot((snapItem) => {
            snapItem.forEach((docItem) => {
              var i = docItem.data();
              i.id = docItem.id;
              this.items.push(i);
            });
          });
      },
    },

    planDate: function(date) {
      db.collection("plans")
        .doc(this.planId)
        .update({ plan_date: date });
    },

    items: function(vals) {
      this.checkedItems = [];
      this.uncheckedItems = [];
      for (var i = 0; i < vals.length; i++) {
        if (vals[i].item_status == false) {
          this.checkedItems.push(vals[i]);
        } else {
          this.uncheckedItems.push(vals[i]);
        }
      }
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
  height: 300px;
}

.bought {
  text-decoration: line-through;
  color: grey;
}
</style>
