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
                :id="'btn'+index"
                @click="showSchedule(index, $event)"
                :class="{ 'active': btn.isActive }"
              >{{btn.name}}</button>
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
        { name: "SUNDAY" },
        { name: "MONDAY" },
        { name: "TUESDAY" },
        { name: "WEDNESDAY" },
        { name: "THURSDAY" },
        { name: "FRIDAY" },
        { name: "SATURDAY" }
      ]
    };
  },
  methods: {
    showSchedule(btn, evt) {
      console.log(evt.target.id);
      this.daysButtons.forEach((day, index) => {
        day.isActive = "btn" + index === "btn" + btn;
        console.log(day.isActive, "btn" + btn);
      });
    }
  }
};
</script>
