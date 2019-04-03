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
      <div
        v-if="errored"
        class="error__msg"
      >We're sorry, we're not able to retrieve this information at the moment, please try back later</div>
      <div class="schedule__container" v-else>
        <div v-if="loading">Loading...</div>
        <table class="schedule__table" v-else>
          <thead>
            <tr>
              <th v-for="(btn, index) in days" :key="index">
                <button
                  class="btn"
                  :id="btn.name"
                  @click="getCurrentDaySchedule(btn.name)"
                  :class="[btn.name == currentDay ? 'active' : '']"
                >{{btn.name.toUpperCase().trim()}}</button>
              </th>
            </tr>
          </thead>
          <!-- Remove :day when we get the real data -->
          <day-schedule :shows="dayShows" :day="currentDay"></day-schedule>
        </table>
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
      weekday[0] = "monday";
      weekday[1] = "tuesday";
      weekday[2] = "wednesday";
      weekday[3] = "thursday";
      weekday[4] = "friday";
      weekday[5] = "saturday";
      weekday[6] = "sunday";
      return weekday[d.getDay()];
    }
  }
};
</script>
