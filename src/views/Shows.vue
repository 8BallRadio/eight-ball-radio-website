<template>
  <main id="maincontent">
    <section id="shows">
      <h2>
        <span class="title__left">
          <img src="../assets/content/stick-left.svg" alt>
        </span>
        8 BALL SHOWS
        <span class="title__right">
          <img src="../assets/content/stick-right.svg" alt>
        </span>
      </h2>
      <ul class="shows__list">
        <li class="show">
          <img
            src="https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/a/6/9/4/13b2-ef57-4fd8-910d-f66253cf7da8"
            alt="show name"
          >
          <div class="show__info">
            <span class="show__time">2 pm</span>
            <h3 class="show__name">MAGIC MARMALADE</h3>
            <p class="show__day">MONDAYS</p>
            <p class="show__tags">HIP-HOP - BEATS - JAZZ</p>
          </div>
        </li>
        <li class="show">
          <img
            src="https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/a/6/9/4/13b2-ef57-4fd8-910d-f66253cf7da8"
            alt="show name"
          >
          <div class="show__info">
            <span class="show__time">2 pm</span>
            <h3 class="show__name">MAGIC MARMALADE</h3>
            <p class="show__day">MONDAYS</p>
            <p class="show__tags">HIP-HOP - BEATS - JAZZ</p>
          </div>
        </li>
        <li class="show">
          <img
            src="https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/a/6/9/4/13b2-ef57-4fd8-910d-f66253cf7da8"
            alt="show name"
          >
          <div class="show__info">
            <span class="show__time">2 pm</span>
            <h3 class="show__name">MAGIC MARMALADE</h3>
            <p class="show__day">MONDAYS</p>
            <p class="show__tags">HIP-HOP - BEATS - JAZZ</p>
          </div>
        </li>
        <li class="show">
          <img
            src="https://thumbnailer.mixcloud.com/unsafe/320x320/profile/6/a/5/b/ef32-0a28-481b-928c-2be8447aeb0d"
            alt="show name"
          >
          <div class="show__info">
            <span class="show__time">2 pm</span>
            <h3 class="show__name">MAGIC MARMALADE</h3>
            <p class="show__day">MONDAYS</p>
            <p class="show__tags">HIP-HOP - BEATS - JAZZ</p>
          </div>
        </li>
        <li class="show">
          <img
            src="https://thumbnailer.mixcloud.com/unsafe/320x320/extaudio/a/6/9/4/13b2-ef57-4fd8-910d-f66253cf7da8"
            alt="show name"
          >
          <div class="show__info">
            <span class="show__time">2 pm</span>
            <h3 class="show__name">MAGIC MARMALADE</h3>
            <p class="show__day">MONDAYS</p>
            <p class="show__tags">HIP-HOP - BEATS - JAZZ</p>
          </div>
        </li>
        <li class="show">
          <img
            src="https://thumbnailer.mixcloud.com/unsafe/320x320/profile/6/a/5/b/ef32-0a28-481b-928c-2be8447aeb0d"
            alt="show name"
          >
          <div class="show__info">
            <span class="show__time">2 pm</span>
            <h3 class="show__name">MAGIC MARMALADE</h3>
            <p class="show__day">MONDAYS</p>
            <p class="show__tags">HIP-HOP - BEATS - JAZZ</p>
          </div>
        </li>
      </ul>
      <div class="arrows">
        <span class="arrow">&#60;</span>
        <span class="arrow">&#62;</span>
      </div>
      <div v-if="!loading" class="content">
        <ul id="example">
          <li v-for="item in info" v-bind:key="item.slug">
            <router-link :to="{ path: '/show/' + item.slug, params: {id: 'item.slug', name: 'item.name'}}">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
// Temporaly commented. Issues with CORS

// FOR NOW
// We can use the Mixcloud playlists to come up with all the shows
// Airtime won't let us showcase archived shows
// Photos can come from Airtime? or Mixcloud? Cloudinary?

// TODO: Get shows working + arrow buttons working

import axios from "axios";
import EventEmitter from "events";

export default {
  name: "Shows",
  data() {
    return {
      loading: true,
      info: null,
      error: null
    };
  },
  beforeRouteEnter(to, from, next) {
    // Initialize variables/objects
    const showsEmitter = new EventEmitter();
    let showLinks = [];

    // Request function
    const getShows = show => {
      try {
        return axios.get(show);
      } catch (error) {
        console.error(error);
      }
    };

    // Emitter receives asynchronous returns
    showsEmitter.on("update", function() {
      let pageData = showsEmitter.data["data"];
      let newRequest = showsEmitter.data["paging"]["next"];
      showLinks.push(pageData);

      // If the data returns with a "paging" field, then we keep making requests
      if (
        showsEmitter.data.hasOwnProperty("paging") &&
        typeof newRequest !== "undefined"
      ) {
        getShows(newRequest).then(response => {
          showsEmitter.data = response.data;
          showsEmitter.emit("update");
        });
        // If the data has no more "paging"
        // Process and set data for show name list
      } else {
        console.log(showLinks);
        let showNames = [];
        let info = [];
        let unwrap = ({ name, slug }) => ({ name, slug });
        showLinks.forEach(showList =>
          showList.forEach(shows => showNames.push(shows))
        );
        info = showNames.map(show => unwrap(show));
        next(vm => {
          vm.info = info;
          vm.loading = false;
        });
      }
    });

    // Initial function for starting asynchronous requests
    const startSearch = async () => {
      let firstRequest = "https://api.mixcloud.com/8ballradio/playlists/";

      // We make this request first to start using emitter
      getShows(firstRequest).then(response => {
        showsEmitter.data = response.data;
        showsEmitter.emit("update");
      });
    };

    startSearch();
  }
};
</script>
