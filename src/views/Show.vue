<template>
  <main id="maincontent">
    <section id="inside-show">
      <div class="back">
        <router-link to="/shows" class="btn back__btn">BACK TO LIST</router-link>
      </div>
      <div class="show__image">
        <img src="../assets/show.png">
      </div>
      <div class="show__info">
        <h3>{{this.name.toUpperCase()}}</h3>
        <p
          class="show__description"
        > {{ description }} </p>
        <div class="show__tags">
          <h4>TAGS:</h4>
          <ul>
            <li v-for="(tag, index) in tags" :key="index">
              <div class="triangle left"></div>
              <span>{{tag.toUpperCase().trim()}}</span>
              <div class="triangle right"></div>
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <span class="title__left">
          <img src="../assets/content/stick-left.svg" alt>
        </span>
        SHOWS ARCHIVES
        <span class="title__right">
          <img src="../assets/content/stick-right.svg" alt>
        </span>
      </h2>
      <ul class="archive-shows">
        <li class="show" v-for="(value, key) in this.casts" :key="key">
          <button class="btn show__btn" @click="selectShow(value.slug)">
            <svg class="play__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
              <title>Play</title>
              <g id="_x33_--Hidden-_x28_closing-up_x29_-" transform="translate(-772 -385)">
                <g id="Drawer" transform="translate(0 43)">
                  <g id="_x32_" transform="translate(18)">
                    <path
                      id="play"
                      d="M1260.4 651.3L882.8 861.2c-4.4 2.4-8.2 2.7-11.2 1-3.1-1.7-4.6-5.1-4.6-10.2V433.2c0-4.8 1.5-8.2 4.6-10.2 3.1-2 6.8-1.7 11.2 1l377.6 210c4.4 2.4 6.6 5.3 6.6 8.7 0 3.3-2.2 6.2-6.6 8.6z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <img :src="value.pictures['320wx320h']" :alt="value.name">
        </li>
      </ul>
      <div class="more-archives">
        <a
          href="https://www.mixcloud.com/8ballradio/"
          class="btn more__btn"
          target="_blank"
          rel="noopener"
        >MORE ARCHIVES</a>
      </div>
    </section>
  </main>
</template>

<script>
// TODO: algorithm showing most recently broadcasted? Yes, only the latest 12 episodes
// TODO: Play button sizing from window size

// TODO: pictures from cloudinary - Just for the big one, or maybe Airtime can be used for this as well
// TODO: Descriptions from Airtime
// TODO: genre tags from Airtime - or Mixcloud?
// TODO: Archives from Mixcloud
// TODO: name from Mixcloud -  or Airtitme?

import axios from "axios";
import EventEmitter from "events";
import { mapActions } from "vuex";

export default {
  name: "Show",
  methods: {
    ...mapActions(["showSelected"]),
    selectShow: function(slug) {
      this.showSelected(slug);
    }
  },
  data() {
    return {
      casts: null,
      name: "",
      slug: null,
      description: null,
      tags: ["jazz", "soul", "dub", "kevin lyons"] //Temporal tags array
    };
  },
  mounted() {
    let showInfoAPI = "https://eightball.airtime.pro/api/shows";

    const getStreamInfo = async info => {
      try {
        return axios.get(info);
      } catch (error) {
        console.error(error);
      }
    };

    let streamInfo = Promise.resolve(getStreamInfo(showInfoAPI));
    streamInfo.then(val => {
      val.data.forEach(show => {
        if (show["name"].toLowerCase() === this.name.toLowerCase()) {
          this.description = show["description"];
        } else {
          this.description =
            "Empower communities, paradigm corporate social responsibility we must stand up natural resources dynamic rubric. Changemaker co-creation, vibrant technology agile thought leadership blended value. Effective save the world, radical framework targeted.";
        }
      });
    });
  },
  beforeRouteEnter(to, from, next) {
    // Initialize variables/objects
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
      let unwrap = ({ key, name, slug, pictures }) => ({
        key,
        name,
        slug,
        pictures
      });

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
<style lang="scss" scoped>
.show__btn {
  width: 100%;
  height: 100%;
  padding: 0;
  position: absolute;
  z-index: 1;
  &:hover {
    background-color: #323232e6;
    .play__icon {
      fill: white;
    }
  }
  @media screen and (min-width: $break-small) {
    width: 93%;
  }
}

.show {
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  @media screen and (min-width: $break-small) {
    margin-bottom: 0;
  }
}

.play__icon {
  fill: transparent;
  height: 63px;
}
</style>
