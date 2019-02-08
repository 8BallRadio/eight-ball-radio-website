<template>
  <main id="maincontent">
    <section id="main-slide">
      <div
        v-if="errored"
        class="error__msg"
      >We're sorry, we're not able to retrieve this information at the moment, please try back later</div>
      <div v-else>
        <div v-if="loading">Loading...</div>
        <slide-show :collections="collections" v-else></slide-show>
      </div>
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
import cloudinary from "cloudinary-core";
import LatestShows from "@/components/LatestShows.vue";
import SlideShow from "@/components/SlideShow.vue";

export default {
  name: "home",
  components: {
    LatestShows,
    SlideShow
  },
  data() {
    return {
      shows: null,
      loading: true,
      errored: false,
      collections: [],
      cloudinary: null
    };
  },
  created() {
    this.cloudinary = cloudinary.Cloudinary.new({
      cloud_name: "dbr2fzfuh"
    });
  },
  mounted() {
    window.scroll(0, 0);
    // Requests will be executed in parallel...
    axios
      .all([
        axios.get("https://res.cloudinary.com/dbr2fzfuh/image/list/slide.json"),
        axios.get("//api.mixcloud.com/8ballradio/cloudcasts/?limit=6")
      ])
      .then(
        axios.spread((imageResponse, showsResponse) => {
          //... but this callback will be executed only when both requests are complete.
          this.getShows(showsResponse.data);
          this.getImagesData(imageResponse.data);
        })
      )
      .catch(error => {
        console.log(error), (this.errored = true);
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    getShows(res) {
      this.shows = res.data;
    },
    getImagesData(collection) {
      let imageData = [];
      collection.resources.forEach(image => {
        imageData.push({
          url: this.cloudinary.url(image.public_id + ".jpg"),
          alt: image.context.custom.caption
        });
      });
      this.collections = imageData;
    }
  }
};
</script>
