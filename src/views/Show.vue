<template>
    <div class="show">
      <div class="content">
        {{ name }}
        <ul id="example">
          <li v-for="cast in casts" v-bind:key="cast.key">
            <router-link :to="{ path: '/show/' + slug + '/' + cast.slug, params: {id: 'cast.slug', name: 'cast.name'}}">
              {{ cast.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
// TODO: 404 from incorrect show
// TODO: algorithm showing most recently broadcasted

import axios from "axios";
import EventEmitter from "events";

export default {
  name: "Show",
  data() {
    return {
      casts: null,
      name: null,
      slug: null
    };
  },
  beforeRouteEnter(to, from, next) {
    // Initialize variables
    const showsEmitter = new EventEmitter();
    let cloudcasts = [];
    let showName = null;
    let showSlug = null;

    // Request function
    const getRequest = show => {
      try {
        return axios.get(show);
      } catch (error) {
        console.error(error);
      }
    };

    // Cloudcast request formatting
    showsEmitter.on("update", function() {
      let pageData = showsEmitter.data["data"];
      let newRequest = "";
      let unwrap = ({ key, name, slug }) => ({ key, name, slug });

      console.log("Searching for cloudcasts...");
      pageData = pageData.map(item => unwrap(item));
      for (const x in pageData) {
        cloudcasts.push(pageData[x]);
      }

      // If the data has a "paging" field,
      // then there are more than 20+ cloudcasts
      if (showsEmitter.data.hasOwnProperty("paging")) {
        let pagingData = showsEmitter.data["paging"];
        // If the "paging" field has no "next"
        // there are no more cloudcasts
        if (!pagingData.hasOwnProperty("next")) {
          console.log("No more cloudcasts!!");
          next(vm => {
            vm.name = showName;
            vm.slug = showSlug;
            vm.casts = cloudcasts;
          });

          // Otherwise, take the "next" value
          // make new request to keep searching
        } else {
          console.log("Keep searching for cloudcasts");
          newRequest = showsEmitter.data["paging"]["next"];
          getRequest(newRequest).then(response => {
            showsEmitter.data = response.data;
            showsEmitter.emit("update");
          });
        }
        // If there is no "paging" field
        // there are <20 cloudcasts, so we're done
      } else {
        console.log("No more cloudcasts!!");
        next(vm => {
          vm.name = showName;
          vm.slug = showSlug;
          vm.casts = cloudcasts;
        });
      }
    });

    // Checking for show existence
    showsEmitter.on("check", function() {
      let pageData = showsEmitter.data;
      let newRequest = "";

      // If the response data has an error, then the show DNE
      // Otherwise, make request to find cloudcasts
      if (pageData.hasOwnProperty("error")) {
        next(false);
      } else {
        newRequest =
          "https://api.mixcloud.com/8ballradio/playlists/" +
          to.params.id +
          "/cloudcasts/";
        showName = pageData["name"];
        showSlug = pageData["slug"];
        getRequest(newRequest).then(response => {
          showsEmitter.data = response.data;
          showsEmitter.emit("update");
        });
      }
    });

    // Initial function for starting asynchronous requests
    const startSearch = async () => {
      let playlistPage =
        "https://api.mixcloud.com/8ballradio/playlists/" + to.params.id + "/";

      // We make this request first to start using emitter
      getRequest(playlistPage).then(response => {
        showsEmitter.data = response.data;
        showsEmitter.emit("check");
      });
    };

    startSearch();
  }
};
</script>
