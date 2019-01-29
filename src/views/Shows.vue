<template>
  <main id="maincontent">
    <section id="shows" class="shows">
      <h2>
        <span class="title__icon">
          <img src="../assets/content/triangle.svg" alt>
        </span>
        8 BALL SHOWS
        <span class="title__icon">
          <img src="../assets/content/triangle.svg" alt>
        </span>
      </h2>
      <div v-if="!loading">
        <ul class="shows__list">
          <li v-for="show in displayedShows" v-bind:key="show.slug" class="show">
            <router-link
              :to="{ path: '/show/' + show.slug, params: {id: 'show.slug', name: 'show.name'}}"
            >
              <img :src="show.picture" :alt="show.name" @error="show.picture = show.mixcloud_picture">
              <div class="show__info">
                <!-- span class="show__time">2 pm</span> -->
                <h3 class="show__name">{{show.name}}</h3>
                <!-- <p class="show__day">MONDAYS</p> -->
                <p class="show__tags">{{show.tags.join(" - ")}}</p>
              </div>
            </router-link>
          </li>
        </ul>
        <div class="arrows">
          <button type="button" class="btn arrow" v-if="page != 1" @click="page--">&#60;</button>
          <button type="button" class="btn arrow" @click="page++" v-if="page < pages.length">&#62;</button>
        </div>
      </div>
      <div v-else>
        <h1>Loading...</h1>
      </div>
    </section>
  </main>
</template>

<script>
// FOR NOW
// We can use the Mixcloud playlists to come up with all the shows
// since Airtime won't let us showcase archived shows
// Photos come from FIRST MIXCLOUD SHOW

// TODO: CSS Formatting - in progress
// TODO: Image replacements? - The idea is to use Mixcloud images
// TODO: Add show's tags from 'https://api.mixcloud.com/8ballradio/playlists/{slug}/cloudcasts/'
// TODO: Get show's time from AirtimePro?
// TODO: Pagination - fix weird behavior when next page is clicked

import axios from "axios";
import EventEmitter from "events";

export default {
  name: "Shows",
  data() {
    return {
      loading: true,
      showInfo: null,
      error: null,
      page: 1,
      perPage: 6,
      pages: []
    };
  },
  beforeUpdate() {
    console.log("updated");
  },
  beforeRouteEnter(to, from, next) {
    // Initialize variables/objects
    const showsEmitter = new EventEmitter();
    let showLinks = [];

    // Request Shows function
    const getShows = async show => {
      try {
        return axios.get(show);
      } catch (error) {
        console.error(error);
      }
    };

    // Request for first Mixcloud show image
    const getPictureDate = async showObj => {
      try {
        return axios.get(
          "//api.mixcloud.com/8ballradio/playlists/" +
            showObj["slug"] +
            "/cloudcasts/?limit=100"
        );
      } catch (error) {
        console.error(error);
      }
    };

    // Fischer-Yates Shuffle: https://bost.ocks.org/mike/shuffle/
    const shuffleArray = array => {
      let m = array.length;
      while (m) {
        let i = Math.floor(Math.random() * m--);

        let t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
    };

    // Functions for parsing dates and finding latest shows
    const parseISOString = s => {
      var b = s.split(/\D+/);
      return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    };

    const numDaysBetween = (d1, d2) => {
      var diff = Math.abs(d1.getTime() - d2.getTime());
      return diff / (1000 * 60 * 60 * 24);
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
        let cutOffDate = new Date();
        cutOffDate.setDate(cutOffDate.getDate() - 30);

        // Condense all shows into a single array
        showLinks.forEach(showList =>
          showList.forEach(shows => showNames.push(shows))
        );
        showInfo = showNames.map(show => unwrap(show));

        // For each show, find first show in Mixcloud image
        showInfo.forEach(show => {
          show["current_show_flag"] = false;

          let request = Promise.resolve(getPictureDate(show));
          request.then(function(value) {
            let tempTags = [];

            // Store all tags for a show AND
            // If we find a cast that has broadcasted within 30 days
            // Set "current_show_flag" to true
            // Otherwise, we have not detected a recent broadcast in Mixcloud
            value["data"]["data"].forEach(cast => {
              cast["tags"].forEach(tag => {
                tempTags.push(tag["name"]);
              });
              let daysBetween = numDaysBetween(
                parseISOString(cast["created_time"]),
                cutOffDate
              );
              if (daysBetween < 30) {
                show["current_show_flag"] = true;
              }
            });

            // Calculates mostCommonTags
            // Taken from: https://stackoverflow.com/questions/22010520/sort-by-number-of-occurrencecount-in-javascript-array
            const s = tempTags.reduce(function(m, v) {
              m[v] = (m[v] || 0) + 1;
              return m;
            }, {});
            let mostCommonTags = [];
            for (let k in s) mostCommonTags.push({ k: k, n: s[k] });
            mostCommonTags.sort(function(mostCommonTags, b) {
              return b.n - mostCommonTags.n;
            });
            mostCommonTags = mostCommonTags.map(function(mostCommonTags) {
              return mostCommonTags.k;
            });

            // If mostCommonTags contains 'Mixlr', remove it
            if (mostCommonTags.indexOf("Mixlr") != -1) {
              mostCommonTags.splice(mostCommonTags.indexOf("Mixlr"), 1);
            }

            // Set show tags
            show["tags"] = mostCommonTags.splice(0, 3);

            // Set picture
            show["mixcloud_picture"] =
              value.data["data"][0]["pictures"]["320wx320h"];
            show["picture"] =
              "https://res.cloudinary.com/dbr2fzfuh/image/upload/" +
              "c_scale,h_320,w_320/v1548740802/radio/shows-page-image/" +
              show["slug"] +
              ".jpg";

            // If the show hasn't broadcasted in 30 days, cut it
            if (show["current_show_flag"] != true) {
              showInfo.splice(
                showInfo.findIndex(showIndex => showIndex === show),
                1
              );
            }
          });
        });

        // Shuffle array before setting variable
        // shuffleArray(showInfo);

        next(vm => {
          vm.showInfo = showInfo;
          vm.loading = false;
        });
      }
    });
    startSearch();
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.showInfo.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(shows) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return shows.slice(from, to);
    },
    imageLoadError: function(show) {
      console.log("didn't work");
      show["picture"] = show["mixcloud_picture"];
    }
  },
  watch: {
    showInfo() {
      this.setPages();
    }
  },
  computed: {
    displayedShows() {
      return this.paginate(this.showInfo);
    }
  }
};
</script>
