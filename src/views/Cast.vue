<template>
    <div class="cast">
        {{ $route.params.id }}
        {{ key }}
      <div>
        <Mixcloud />
      </div>
    </div>
</template>

<script>
// TODO: get mixcloud widget working

import EventEmitter from "events";
import axios from "axios";
import Mixcloud from "../components/layout/Mixcloud.vue";

export default {
  name: "Cast",
  data() {
    return {
      key: null
    };
  },
  components: {
    Mixcloud
  },
  beforeRouteEnter(to, from, next) {
    // Initialize variables/objects
    const showsEmitter = new EventEmitter();
    let slugCheck = to.params.cast;
    let showLinks = [];
    let showKey = null;

    // Request function
    const getRequest = show => {
      try {
        return axios.get(show);
      } catch (error) {
        console.error(error);
      }
    };

    // Need to see if show exists
    // Keep appending shows to a list
    // After hitting the end, if show is not in list,
    // send them to 404
    // else, save show key and load into iframe
    showsEmitter.on("update", function() {
      if (showsEmitter.data["error"]) {
        console.log("Show does not exist");
      }

      let pageData = showsEmitter.data["data"];
      showLinks.push(pageData);

      // If there is a "paging" field with "next", send another request
      if (showsEmitter.data.hasOwnProperty("paging").hasOwnProperty("next")) {
        getRequest(showsEmitter.data["paging"]["next"]).then(response => {
          showsEmitter.data = response.data;
          showsEmitter.emit("update");
        });
        // Otherwise, look through all cloudcasts for the given "key"
      } else {
        let cloudcasts = [];
        showLinks.forEach(showList =>
          showList.forEach(shows => cloudcasts.push(shows))
        );
        for (let i = 0; i < cloudcasts.length; i++) {
          if (cloudcasts[i]["slug"] === slugCheck) {
            showKey = cloudcasts[i]["key"];
            console.log("found it!!!");
          }
        }
        if (showKey === null) {
          console.log("couldn't find it ):");
          next(false);
        } else {
          next(vm => (vm.key = showKey));
        }
      }
    });

    // Initial function for starting asynchronous requests
    const startSearch = async () => {
      let firstPage =
        "https://api.mixcloud.com/8ballradio/playlists/" +
        to.params.id +
        "/cloudcasts/";

      // We make this request first to start using emitter
      getRequest(firstPage).then(response => {
        showsEmitter.data = response.data;
        showsEmitter.emit("update");
      });
    };

    startSearch();
  }
};
</script>
