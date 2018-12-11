<template>
    <div class="shows">
      <div class="loading" v-if="loading">
        Loading...
      </div>

      <div v-if="error" class="error">
        {{ error }}
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
    </div>
</template>

<script>
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
