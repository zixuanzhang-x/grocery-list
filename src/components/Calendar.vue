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
    <div ref="calendar"></div>
  </div>
</template>

<script>
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default {
  data() {
    return {
      calendar: null,
    };
  },
  mounted() {
    this.calendar = new Calendar(this.$refs.calendar, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: "dayGridMonth",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,listWeek",
      },
    });
    this.calendar.render();
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
