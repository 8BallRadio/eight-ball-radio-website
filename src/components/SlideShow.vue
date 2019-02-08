<template>
  <ul class="slideshow">
    <li v-for="(collection, key) in collections" :key="key">
      {{collection.url}}
      <img :alt="collection.alt" :src="collection.url" class="slideshow__image">
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    collections: {
      type: Array,
      required: true
    }
  }
};
</script>
