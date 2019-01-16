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
      <div v-if="!loading" class="content">
        <ul id="example">
          <li v-for="show in showInfo" v-bind:key="show.slug">
            <router-link :to="{ path: '/show/' + show.slug, params: {id: 'show.slug', name: 'show.name'}}">
              <img :src="show.picture" :alt="show.name">
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <h1> Loading... </h1>
      </div>
    </section>
  </main>
</template>

<script>
// FOR NOW
// We can use the Mixcloud playlists to come up with all the shows
// since Airtime won't let us showcase archived shows
// Photos come from FIRST MIXCLOUD SHOW

// TODO: CSS Formatting
// TODO: Image replacements?
// TODO: Randomizing array + shows

import axios from "axios";
import EventEmitter from "events";

export default {
  name: "Shows",
  data() {
    return {
      loading: true,
      showInfo: null,
      error: null
    };
  },
  beforeUpdate() {
    console.log("updated");
  },
  beforeRouteEnter(to, from, next) {
    // Initialize variables/objects
    const showsEmitter = new EventEmitter();
    let showLinks = [];

    // Request function
    const getShows = async show => {
      try {
        return axios.get(show);
      } catch (error) {
        console.error(error);
      }
    };

    const getPicture = async showObj => {
      try {
        return axios.get(
          "//api.mixcloud.com/8ballradio/playlists/" +
            showObj["slug"] +
            "/cloudcasts/"
        );
      } catch (error) {
        console.error(error);
      }
    };

    // Initial function for starting asynchronous requests
    const startSearch = async () => {
      let firstRequest = "https://api.mixcloud.com/8ballradio/playlists/";

      // We make this request first to start using emitter
      getShows(firstRequest).then(res => {
        showsEmitter.data = res.data;
        showsEmitter.emit("update");
      });
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
        let showNames = [];
        let showInfo = [];
        let unwrap = ({ name, slug, picture }) => ({ name, slug, picture });

        // Condense all shows into a single array
        showLinks.forEach(showList =>
          showList.forEach(shows => showNames.push(shows))
        );
        showInfo = showNames.map(show => unwrap(show));

        // For each show, find first show in Mixcloud image
        showInfo.forEach(show => {
          let image = Promise.resolve(getPicture(show));
          image.then(function(value) {
            show["picture"] = value.data["data"][0]["pictures"]["320wx320h"];
          });
        });
        next(vm => {
          vm.showInfo = showInfo;
          vm.loading = false;
        });
      }
    });
    startSearch();
  }
};
</script>
