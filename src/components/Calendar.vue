<template>
  <div class="calendar">
    <div class="container text-center">
      <h1>
        <b-icon
          icon="calendar2-date"
          class="rounded-circle bg-primary p-2"
          variant="light"
        ></b-icon>
        Calendar
      </h1>
    </div>
    <hr />
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";

import { db } from "../firebaseConfig.js";

const plans = db.collection("plans");

export default {
  props: ["user"],
  components: {
    FullCalendar,
  },
  data() {
    return {
      plans: null,
    };
  },
  computed: {
    calendarOptions() {
      let events = [];
      if (this.plans) {
        events = this.plans.map((plan) => {
          return {
            title: plan.name,
            start: plan.date,
          };
        });
      }
      return {
        plugins: [dayGridPlugin],
        initialView: "dayGridMonth",
        events: events
      }
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.$bind("plans", plans.where("uid", "==", user.uid));
        this.events = this.plans.map((plan) => {
          return {
            title: plan.name,
            start: plan.date,
          };
        });
      },
    },
  },
};
</script>

<style scoped>
.calendar {
  margin: 15px;
  padding: 30px;
  border-radius: 15px;
  background-color: white;
}
</style>
