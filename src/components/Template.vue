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
          <b-col class="template-btn">
            <b-button
              @click="newPlan(plan)"
              class="btn"
              pill
              variant="outline-success"
            >
              New Plan
            </b-button>
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
                  ><b-icon icon="dot" font-scale="1.5"></b-icon
                  >
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
    plans: db.collection("plans").where("isTemplate", "==", true),
},

    methods: {
      newPlan: function(plan) {
          const stores = plan.stores
          const name = plan.name
          
          // FIXME:alter all items' isBought to false
          for (var i=0; i<stores.length; i++) {
              console.log('##', stores[i].items)
              const items = stores[i].items
              for (var j=0; j<items.length; j++) {
                  console.log('###', stores[i][j])
                  items[j]['isBought'] = false
              }
          }

          const newPlanObj = {
              "name": name,
              "stores": stores,
              "isTemplate": false,
              "isDone": false,
              "date": ''
          }

          db.collection('plans').add(newPlanObj).then((docRef) => {
            this.$router.push({name: 'Plan', params: {id: docRef.id}})
        })


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

.btn {
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
</style>
