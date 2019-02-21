<template>
  <div class="mixcloud__container">
    <iframe
      id="mixcloud"
      width="100%"
      height="60"
      :src="url+slug+'%2F'"
      frameborder="0"
      allow="autoplay"
    ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Mixcloud",
  data: function() {
    return {
      url:
        "//www.mixcloud.com/widget/iframe/?hide_cover=1&autoplay=1&light=1&feed=%2F8ballradio%2F"
    };
  },
  mounted() {
    this.$root.$emit("streamMixcloud");
  },
  computed: {
    ...mapState(["slug"])
  }
};
</script>
<style lang="scss" scoped>
.mixcloud__container {
  width: 100%;
}
</style>
