<template>
  <main id="maincontent">
    <section id="inside-show">
      <div class="back">
        <router-link to="/shows" class="btn back__btn"
          >BACK TO LIST</router-link
        >
      </div>
      <div class="show__image">
        <img v-bind:src="showImage" @error="imageLoadError" />
      </div>
      <div class="show__info">
        <h3>{{ this.name.toUpperCase() }}</h3>
        <p class="show__description">{{ description }}</p>
        <div class="show__tags" v-if="tags.length >= 1">
          <h4>TAGS:</h4>
          <ul>
            <li v-for="(tag, index) in tags" :key="index">
              <div class="triangle left"></div>
              <span>{{ tag.toUpperCase().trim() }}</span>
              <div class="triangle right"></div>
            </li>
          </ul>
        </div>
      </div>
      <h2>
        <span class="title__left">
          <img src="../assets/content/stick-left.svg" alt />
        </span>
        SHOWS ARCHIVES
        <span class="title__right">
          <img src="../assets/content/stick-right.svg" alt />
        </span>
      </h2>
      <ul class="archive-shows">
        <li class="show" v-for="(value, key) in this.casts" :key="key">
          <button class="btn show__btn" @click="selectShow(value.slug)">
            <svg
              class="play__icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 600"
            >
              <title>Play</title>
              <g
                id="_x33_--Hidden-_x28_closing-up_x29_-"
                transform="translate(-772 -385)"
              >
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
          <img :src="value.pictures['320wx320h']" :alt="value.name" />
        </li>
      </ul>
      <div class="more-archives">
        <a
          :href="`https://www.mixcloud.com/8ballradio/playlists/${slug}`"
          class="btn more__btn"
          target="_blank"
          rel="noopener"
          >MORE ARCHIVES</a
        >
      </div>
    </section>
  </main>
</template>

<script>
// TODO: Play button sizing from window size

// TODO: pictures from cloudinary - Just for the big one, or maybe Airtime can be used for this as well
// TODO: genre tags from Airtime - or Mixcloud?
// TODO: Archives from Mixcloud
// TODO: name from Mixcloud -  or Airtitme?

import axios from "axios";
import { mapActions } from "vuex";
import ShowsService from "@/../services/ShowsService";

export default {
  name: "Show",
  methods: {
    ...mapActions(["showSelected"]),
    selectShow: function(slug) {
      this.showSelected(slug);
    },
    imageLoadError: function() {
      console.log("Loading alternative header image");
      this.showImage = require("../assets/show.png");
    },
    async getShows() {
      const response = await ShowsService.fetchShows();
      return response.data.shows;
    },
    async getShowPage() {
      const response = await ShowsService.fetchShowPage();
      return response.data.pages;
    },
    async getCloudcasts(id) {
      const response = await axios.get(
        "https://api.mixcloud.com/8ballradio/playlists/" +
          id +
          "/cloudcasts/?limit=100"
      );
      return response.data.data;
    }
  },
  data() {
    return {
      casts: null,
      name: "",
      slug: "",
      description: "",
      showImage: "",
      altShowImage: "../assets/show.png",
      tags: [], //Temporal tags array,
      exists: false
    };
  },
  mounted() {
    // Does show exist?
    let route_param_id = this.$route.params.id;
    this.getShows().then(res => {
      for (var show in res) {
        if (Object.values(res[show]).includes(route_param_id)) {
          // get cloudcasts + cloudinary image + description
          this.getShowPage().then(res => {
            for (var show in res) {
              if (res[show].slug === route_param_id) {
                this.description = res[show].description;
                this.showImage = res[show].img;
                this.name = res[show].name;
                this.exists = true;
              }
            }
          });
          this.getCloudcasts(route_param_id).then(res => {
            console.log(res);
            let tempShowTags = [];
            res.forEach(show => {
              show["tags"].forEach(tag => {
                tempShowTags.push(tag["name"]);
              });
            });

            // Calculates mostCommonTags
            // Taken from: https://stackoverflow.com/questions/22010520/sort-by-number-of-occurrencecount-in-javascript-array
            var s = tempShowTags.reduce(function(m, v) {
              m[v] = (m[v] || 0) + 1;
              return m;
            }, {});
            var mostCommonTags = [];
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

            this.tags = mostCommonTags;
            this.casts = res;
          });
        }
      }
    });
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
