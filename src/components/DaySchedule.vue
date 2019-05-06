<template>
  <tbody>
    <tr v-if="shows.length == 0">
      <td colspan="7" class="no-schedule">No Schedule Available</td>
    </tr>
    <tr v-for="(show, index) in shows" :key="index" v-else>
      <td>{{ show.starts | showTime }}-{{ show.ends | showTime }}</td>
      <td colspan="6">Show #{{ index + 1 }} - {{ show.name }}</td>
      <!-- Temporaly removed tags -->
      <!-- <td colspan="3">Talk, Indie, Psychdelic</td>  -->
    </tr>
  </tbody>
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
