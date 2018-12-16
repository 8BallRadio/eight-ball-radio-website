<template>
  <tbody>
    <tr v-for="(show,index) in shows" :key="index">
      <td>{{show.starts | showTime}}-{{show.ends | showTime}}</td>
      <td colspan="3">Show #{{index + 1}} {{day}} - {{show.name}}</td>
      <td colspan="3">Talk, Indie, Psychdelic</td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: {
    shows: {
      type: Array,
      required: true
    },
    day: {
      //temporal var. Remove it when we get the real data
      type: String
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
