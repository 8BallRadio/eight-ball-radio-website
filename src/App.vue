<template>
  <div id="app">
    <app-header />
    <!-- Routing guide temporaly -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
    <app-footer />
  </div>
</template>
<script>
// @ is an alias to /src
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";

export default {
  name: "EightBallRadio",
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
  },
};
</script>
<style lang="scss">
@use "@/styles/setup/_common.scss" as *;
@use "@/styles/setup/_variables.scss" as *;
@use "@/styles/setup/_typography.scss" as *;
#app {
  font-family: $font-family-text;
  color: #000000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
