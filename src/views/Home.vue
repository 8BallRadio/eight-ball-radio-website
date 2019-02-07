<template>
  <main id="maincontent">
    <section id="main-slide">
      <ul class="slideshow">
        <li>
          <a href="https://www.facebook.com/events/254262142165362/" target="_blank" rel="noopener">
            <img
              alt="8-Ball Radio x Mood Ring"
              src="https://res.cloudinary.com/dbr2fzfuh/image/upload/radio/front-page/8ball_Mood.jpg"
              class="slideshow__image"
            >
          </a>
        </li>
      </ul>
    </section>
    <section id="latest-shows">
      <h2>
        <span class="title__left">
          <img src="../assets/content/stick-left.svg" alt>
        </span>
        LATEST SHOWS
        <span class="title__right">
          <img src="../assets/content/stick-right.svg" alt>
        </span>
      </h2>
      <div
        v-if="errored"
        class="error__msg"
      >We're sorry, we're not able to retrieve this information at the moment, please try back later</div>
      <div class="latest-shows__container" v-else>
        <div v-if="loading">Loading...</div>
        <latest-shows :shows="shows" v-else></latest-shows>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import LatestShows from "@/components/LatestShows.vue";

export default {
  name: "home",
  components: {
    "latest-shows": LatestShows
  },
  data() {
    return {
      shows: null,
      loading: true,
      errored: false
    };
  },
  mounted() {
    window.scroll(0, 0);
    axios
      .get("//api.mixcloud.com/8ballradio/cloudcasts/?limit=6")
      .then(response => this.getShows(response.data))
      .catch(error => {
        console.log(error), (this.errored = true);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getShows(res) {
      this.shows = res.data;
    }
  }
};
</script>
