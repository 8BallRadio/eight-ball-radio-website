<template>
  <div>
    <ul class="latest-shows">
      <li class="show" v-for="(value, key) in shows" :key="key">
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
        <div class="show__info">
          <h3 class="show__name">{{value.name}}</h3>
          <p class="show__tags">{{ printTags(value.tags).toString() }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  props: {
    shows: {
      type: Array,
      required: true
    }
  },
  methods: {
    ...mapActions(["showSelected"]),
    selectShow: function(slug) {
      this.showSelected(slug);
    },
    printTags(tags) {
      let tempShowTags = [];
      tags.forEach(tag => {
        tempShowTags.push(tag["name"]);
      });

      // Remove Mixlr tags
      if (tempShowTags.indexOf("Mixlr") != -1) {
        tempShowTags.splice(tempShowTags.indexOf("Mixlr"), 1);
      }
      return tempShowTags.splice(0, 3);
    }
  }
};
</script>
<style lang="scss" scoped>
.latest-shows {
  @media screen and (min-width: $break-small) {
    @supports (display: grid) {
      & {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 20px;
      }
    }
  }
  @media screen and (min-width: $break-large) {
    @supports (display: grid) {
      & {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 40px;
      }
    }
  }
}

.show {
  padding: 0;
  margin: 2rem auto;
  max-width: 250px;
  position: relative;
  @media screen and (min-width: $break-small) {
    margin-bottom: 0;
  }
}

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
}

.play__icon {
  fill: transparent;
  height: 64px;
}

img {
  max-width: 250px;

  @media screen and (min-width: $break-small) {
    max-width: 250px;
  }
}

.show__info {
  position: absolute;
  bottom: 15px;
  background-color: map-get($colors, primary);
  width: 92%;
  margin-left: 13px;
  text-align: left;
  padding-left: 5px;
}
.show__name {
  line-height: 1.2;
  padding-top: 5px;
  text-transform: uppercase;
  font-size: $font-size-regular;
  letter-spacing: 2px;
}

.show__tags {
  margin-bottom: 4px;
  font-size: $font-size-small;
  font-family: $font-family-text;
}
</style>
