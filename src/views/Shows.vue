<template>
  <main id="maincontent">
    <section id="shows" class="shows">
      <h2>
        <span class="title__icon">
          <img src="../assets/content/triangle.svg" alt />
        </span>
        8 BALL SHOWS
        <span class="title__icon">
          <img src="../assets/content/triangle.svg" alt />
        </span>
      </h2>
      <button class="btn btn__sort" @click="mergeSort(showInfo)">
        &#9654; SORT ALPHABETICALLY &#9664;
      </button>
      <div v-if="loading" class="loading">
        Loading...
      </div>
      <div v-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="shows-container">
        <ul class="shows__list">
          <li v-for="show in showInfo" v-bind:key="show.slug" class="show">
            <router-link
              :to="{
                path: '/show/' + show.slug,
                params: { id: 'show.slug', name: 'show.name' }
              }"
            >
              <LazyImage
                :src="show.pictures.thumbnail"
                :lazy-src="show.pictures.large"
                :lazy-srcset="show.pictures.large"
              />
              <div class="show__info">
                <!-- span class="show__time">2 pm</span> -->
                <h3 class="show__name">{{ show.name }}</h3>
                <!-- <p class="show__day">MONDAYS</p> -->
                <p class="show__tags">{{ show.tags }}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
// TODO: Get show's time from AirtimePro?
// TODO: Pagination - fix weird behavior when next page is clicked

import ShowsService from "@/../services/ShowsService";
import LazyImage from "@/components/LazyImage";

export default {
  name: "Shows",
  components: {
    LazyImage
  },
  data() {
    return {
      loading: true,
      showInfo: null,
      error: null,
      page: 1,
      perPage: 9,
      pages: [],
      sortFlag: false
    };
  },
  beforeUpdate() {
    console.log("updated");
  },
  mounted() {
    this.getShows();
  },
  methods: {
    async getShows() {
      const response = await ShowsService.fetchShows();
      const shuffledShows = this.shuffleShows(response.data.shows);
      this.showInfo = shuffledShows;
      this.loading = false;
    },
    shuffleShows(array) {
      // Fischer-Yates Shuffle: https://bost.ocks.org/mike/shuffle/
      let temp = array;
      let m = array.length;
      while (m) {
        let i = Math.floor(Math.random() * m--);
        let t = temp[m];
        temp[m] = temp[i];
        temp[i] = t;
      }
      return temp;
    },
    imageLoadError: function(show) {
      show["picture"] = show["mixcloud_picture"];
    },
    mergeSort(shows) {
      let merge = (leftArr, rightArr) => {
        var sortedArr = [];
        while (leftArr.length && rightArr.length) {
          var order = this.sortFlag ? -1 : 1;
          if (leftArr[0]["name"].localeCompare(rightArr[0]["name"]) == order) {
            sortedArr.push(leftArr[0]);
            leftArr = leftArr.slice(1);
          } else {
            sortedArr.push(rightArr[0]);
            rightArr = rightArr.slice(1);
          }
        }
        while (leftArr.length) {
          sortedArr.push(leftArr.shift());
        }
        while (rightArr.length) {
          sortedArr.push(rightArr.shift());
        }
        return sortedArr;
      };

      function mergeSortHelper(shows) {
        if (shows.length < 2) {
          return shows;
        } else {
          let midpoint = parseInt(shows.length / 2);
          let leftArray = shows.slice(0, midpoint);
          let rightArray = shows.slice(midpoint, shows.length);
          let mergedArray = merge(
            mergeSortHelper(leftArray),
            mergeSortHelper(rightArray)
          );
          return mergedArray;
        }
      }

      /*
       sortFlag is init to false
       Click of button sets to true, false accordingly
       This allows swapping sorting from increasing to decreasing
       */

      this.sortFlag = !this.sortFlag;
      this.showInfo = mergeSortHelper(shows);
    }
  }
};
</script>
