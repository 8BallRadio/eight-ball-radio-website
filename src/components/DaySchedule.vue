<template>
  <div v-if="shows !== null && shows.length < 1">
    No Schedule Available
  </div>
  <div v-else class="show__list">
    <div class="show__slot" v-for="(show, index) in shows" :key="index">
      <div>
        {{ show.starts | showTime }} - {{ show.ends | showTime }}
        {{ show.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shows: {
      type: Array,
      required: true
    }
  },
  filters: {
    showTime: function(value) {
      if (!value) return "";
      return value
        .split(" ")[1]
        .split(":")
        .slice(0, 2)
        .join(":");
    }
  }
};
</script>
