<template>
  <header>
    <a href="#maincontent" class="skip-main">skip to main content</a>
    <section id="header-top">
      <div class="top">
        <h4 class="top__onair">
          <img src="../../assets/header/wave-left.svg" class="wave__left" alt>
          {{onAirText}}
          <img
            src="../../assets/header/wave-right.svg"
            class="wave__right"
            alt
          >
        </h4>
        <div class="top__player">
          <div class="player__controls" v-show="isStreaming">
            <button class="control__play" :class="{paused: playing }" @click.prevent="toggleStream"></button>
            <button class="btn control__volume" @click.prevent="mute">
              <img src="../../assets/header/volume.svg" alt="volume control">
            </button>
          </div>
          <div class="player__info">
            <div class="info__top">NOW PLAYING</div>
            <div class="info__ticker">
              <div class="ticker">
                <div class="ticker__item">{{ showName }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="top__social">
          <a href="https://www.facebook.com/eightballradio/" target="_blank" rel="noopener">
            <img
              class="social__icon"
              src="../../assets/header/facebook.svg"
              onerror="this.src='../../assets/header/facebook.png'"
              alt="Facebook Fan Page"
            >
          </a>
          <a href="https://www.instagram.com/8ballradio/" target="_blank" rel="noopener">
            <img
              class="social__icon"
              src="../../assets/header/instagram.svg"
              onerror="this.src='../../assets/header/instagram.png'"
              alt="Instagram"
            >
          </a>
          <a href="https://www.mixcloud.com/8ballradio/" target="_blank" rel="noopener">
            <img
              class="social__icon"
              src="../../assets/header/mixcloud.svg"
              onerror="this.src='../../assets/header/mixcloud.png'"
              alt="Mixcloud"
            >
          </a>
        </div>
      </div>
    </section>
    <section id="header-middle">
      <div class="main-menu">
        <button class="open-menu btn" id="btn-menu" @click="openMenu">MENU</button>
        <h1>
          <router-link to="/">
            <img
              class="logo"
              src="../../assets/header/logo.svg"
              onerror="this.src='../../assets/header/logo.png'"
              alt="8 Ball Radio"
            >
          </router-link>
        </h1>
        <nav class="nav">
          <ul>
            <li>
              <a href="https://8ballcommunity.club/" target="_blank" class="nav__link">EVENTS</a>
            </li>
            <li>
              <a href class="nav__link">ABOUT</a>
            </li>
            <li>
              <a href class="nav__link">8-BALL FAMILY</a>
            </li>
            <li>
              <a href="https://8ballcommunity.bigcartel.com/" target="_blank" class="nav__link">SHOP</a>
            </li>
          </ul>
        </nav>
        <a
          href="https://www.fracturedatlas.org/site/fiscal/profile?id=14927"
          class="btn btn-donate"
          target="_blank"
          rel="noopener"
        >DONATE</a>
      </div>
    </section>
    <section id="header-bottom">
      <div class="quick-access">
        <p class="info">
          WE ARE A COMMUNITY RADIO STATION PART OF A 501c3 NON-PROFIT ::
          SUPPORT US!
        </p>
        <div class="access">
          <router-link to="/offsite" class="btn btn-access">Off-Site Channel</router-link>
        </div>
        <br>
        <div class="access">
          <router-link to="/shows" class="btn btn-access">SHOWS</router-link>
          <router-link to="/schedule" class="btn btn-access">SCHEDULE</router-link>
        </div>
      </div>
    </section>
    <app-mobile-menu></app-mobile-menu>
  </header>
</template>
<script>
import AppMobileMenu from "./AppMobileMenu.vue";
import axios from "axios";

export default {
  name: "top",
  data() {
    return {
      isSideBarOpen: false,
      stream: new Audio("http://eightball.out.airtime.pro:8000/eightball_a"),
      showName: "",
      playing: false,
      volume: 100,
      previousVolume: 35,
      isStreaming: false,
      onAirText: "OFF - AIR"
    };
  },
  components: {
    "app-mobile-menu": AppMobileMenu
  },
  mounted() {
    let streamAPI = "https://eightball.airtime.pro/api/live-info";

    const getStreamInfo = async info => {
      try {
        return axios.get(info);
      } catch (error) {
        console.error(error);
      }
    };

    this.$nextTick(() => {
      let streamInfo = Promise.resolve(getStreamInfo(streamAPI));
      streamInfo.then(val => {
        if (
          val.data["currentShow"] === undefined ||
          val.data["currentShow"].length === 0
        ) {
          console.log("No show currently playing");
          this.showName = "No show currently playing";
          this.isStreaming = false;
          this.onAirText = "OFF - AIR";
        } else {
          console.log(val.data["currentShow"][0]["name"]);
          this.showName = val.data["currentShow"][0]["name"];
          this.isStreaming = true;
          this.onAirText = "ON - AIR";
        }
      });
      // window.setInterval(() => {
      // }, 10000);
    });
  },
  computed: {
    muted() {
      return this.volume / 100 === 0;
    }
  },
  watch: {
    volume() {
      this.stream.volume = this.volume / 100;
    }
  },
  methods: {
    openMenu() {
      this.$emit("openMenu");
      this.isSideBarOpen = true;
      document.querySelector("#mobile-menu").className += " active";
      document.body.style.overflow = "hidden";
    },
    playStream() {
      this.playing = true;
      this.stream.play();
    },
    pauseStream() {
      this.playing = false;
      this.stream.pause();
    },
    toggleStream() {
      if (!this.playing) {
        this.playStream();
      } else {
        this.pauseStream();
      }
    },
    mute() {
      console.log("mute!!", this.muted);
      if (this.muted) {
        return (this.volume = this.previousVolume);
      }

      this.previousVolume = this.volume;
      this.volume = 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.btn-access {
  background-image: url(../../assets/header/btn-pattern.svg);
}
</style>
