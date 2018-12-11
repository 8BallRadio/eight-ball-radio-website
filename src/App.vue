<template>
  <div id="app">
    <app-header></app-header>
    <!-- Routing guide temporaly -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>
<script>
// @ is an alias to /src
import AppHeader from "./components/layout/AppHeader.vue";
import AppFooter from "./components/layout/AppFooter.vue";

export default {
  name: "Eight-Ball-Radio",
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter
  }
};
</script>
<style lang="scss">
#app {
  font-family: $font-family-text;
  color: #000000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
