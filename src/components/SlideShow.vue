<template>
  <div class="diy-slideshow">
    <figure :class="{'show': current == key}" v-for="(collection, key) in collections" :key="key">
      <img :alt="collection.alt" :src="collection.url" class="slideshow__image" width="100%">
    </figure>
    <span class="prev" @click="moveSlide('prev')">&laquo;</span>
    <span class="next" @click="moveSlide('next')">&raquo;</span>
  </div>
</template>
<script>
export default {
  props: {
    collections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: 0,
      totalImages: this.collections.length
    };
  },
  methods: {
    moveSlide: function(direction) {
      if (direction == "prev") {
        this.current--;
      } else {
        this.current++;
      }
      this.current = Math.abs(this.current % this.totalImages);
    }
  }
};
</script>
<style lang="scss" scoped>
.diy-slideshow {
  position: relative;
  display: block;
  overflow: hidden;
  max-width: 840px;
  margin: auto;
}
figure {
  position: absolute;
  opacity: 0;
  transition: 1s opacity;
  margin: 0;
}
figure.show {
  opacity: 1;
  position: static;
  transition: 1s opacity;
}
.next,
.prev {
  color: map-get($colors, primary);
  position: absolute;
  background: map-get($colors, dark-gray);
  top: 50%;
  z-index: 1;
  font-size: $font-size-xxxx-large;
  margin-top: -0.75em;
  opacity: 0.2;
  user-select: none;
  font-family: $font-family-display;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
}
.next {
  right: 0;
  padding: 4px 16px 8px 16px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.prev {
  left: 0;
  padding: 4px 16px 8px 16px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
