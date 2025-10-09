<template>
  <main id="maincontent">
    <section id="schedule">
      <h2>
        <span class="title__left">
          <img src="../assets/content/wave-gray-left.svg" alt>
        </span>
        LIVE SCHEDULE
        <span class="title__right">
          <img src="../assets/content/wave-gray-right.svg" alt>
        </span>
      </h2>
      <div v-if="errored" class="error__msg">
        We're sorry, we're not able to retrieve this information at the moment,
        please try back later
      </div>
      <div v-else class="schedule__container">
        <div v-if="loading">
          Loading...
        </div>
        <div v-else class="day__select">
          <div v-for="(btn, index) in days" :key="index">
            <button
              :id="btn.name"
              class="btn"
              :class="[btn.name == currentDay ? 'active' : '']"
              @click="getCurrentDaySchedule(btn.name)"
            >
              {{ btn.name.toUpperCase().trim() }}
            </button>
          </div>
          <!-- Remove :day when we get the real data -->
        </div>
        <day-schedule :shows="dayShows" :day="currentDay" />
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import DaySchedule from "@/components/DaySchedule.vue";

export default {
  components: {
    "day-schedule": DaySchedule
  },
  data() {
    return {
      currentDay: this.getWeekday(),
      days: [
        { name: "monday", isActive: true },
        { name: "tuesday" },
        { name: "wednesday" },
        { name: "thursday" },
        { name: "friday" },
        { name: "saturday" },
        { name: "sunday" }
      ],
      week: null,
      dayShows: null,
      loading: true,
      errored: false
    };
  },
  mounted() {
    window.scroll(0, 0);
    axios
      .get("//eightball.airtime.pro/api/week-info")
      .then(response => this.getSchedule(response.data))
      .catch(error => {
        console.log(error), (this.errored = true);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getSchedule(res) {
      this.week = res;
      this.getCurrentDaySchedule(this.currentDay);
    },
    getCurrentDaySchedule(currentDay) {
      this.currentDay = currentDay;
      this.dayShows = this.week[this.currentDay];
    },
    getWeekday() {
      var weekday = new Array(7);
      var d = new Date();
      weekday[0] = "sunday";
      weekday[1] = "monday";
      weekday[2] = "tuesday";
      weekday[3] = "wednesday";
      weekday[4] = "thursday";
      weekday[5] = "friday";
      weekday[6] = "saturday";
      return weekday[d.getDay()];
    }
  }
};
</script>
