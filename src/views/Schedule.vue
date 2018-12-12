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
      <table class="schedule__table">
        <thead>
          <tr>
            <th v-for="(btn, index) in daysButtons" :key="index">
              <button
                class="btn"
                :id="btn.name"
                @click="showSchedule(btn.name, $event)"
                :class="{ 'active': btn.isActive }"
              >{{btn.name.toUpperCase().trim()}}</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>12 noon</td>
            <td colspan="3">Show #1 - Name of show</td>
            <td colspan="3">Talk, Indie, Psychdelic</td>
          </tr>
          <tr>
            <td>2pm-4pm</td>
            <td colspan="3">Show #2 - Name of show</td>
            <td colspan="3">Ambient, Folk, Drone</td>
          </tr>
          <tr>
            <td>4pm-6pm</td>
            <td colspan="3">Show #3 - Name of show</td>
            <td colspan="3">Hip Hop, Beats, Jazz</td>
          </tr>
          <tr>
            <td>6pm-8pm</td>
            <td colspan="3">Show #4 - Name of show</td>
            <td colspan="3">Ambient, Folk, Drone</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      currentDay: 0,
      daysButtons: [
        { name: "sunday", isActive: true },
        { name: "monday" },
        { name: "tuesday" },
        { name: "wednesday" },
        { name: "thursday" },
        { name: "friday" },
        { name: "saturday" }
      ]
    };
  },
  methods: {
    showSchedule(btn, evt) {
      evt.preventDefault();
      this.daysButtons.forEach(day => {
        document.getElementById(day.name).classList.remove("active");
      });
      evt.currentTarget.className += " active";
    }
  }
};
</script>
