<template>
  <header>
    <a href="#maincontent" class="skip-main">skip to main content</a>
    <section id="header-top">
      <div class="top">
        <h4 class="top__onair">
          <img
            src="../../assets/header/wave-left.svg"
            class="wave__left blink-animation"
            alt
          />
          {{ onAirText }}
          <img
            src="../../assets/header/wave-right.svg"
            class="wave__right blink-animation"
            alt
          />
        </h4>
        <div class="top__player">
          <div class="player__controls" v-show="isStreaming">
            <button
              class="control__play"
              :class="{ paused: playing }"
              @click.prevent="toggleStream"
            >
              <span class="sr-only">play channel 1</span>
            </button>
            <button class="btn control__volume" @click.prevent="mute">
              <img src="../../assets/header/volume.svg" alt="volume control" />
            </button>
          </div>
          <div class="player__info">
            <p class="info__top">Now Playing In Channel 1</p>
            <div class="info__ticker">
              <div class="ticker-wrapper">
                <div class="ticker">
                  <div class="ticker__item">{{ showName }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top__social">
          <a
            href="https://www.facebook.com/eightballradio/"
            target="_blank"
            rel="noopener"
          >
            <img
              class="social__icon"
              src="../../assets/header/facebook.svg"
              onerror="this.src='../../assets/header/facebook.png'"
              alt="Facebook Fan Page"
            />
          </a>
          <a
            href="https://www.instagram.com/8ballradio/"
            target="_blank"
            rel="noopener"
          >
            <img
              class="social__icon"
              src="../../assets/header/instagram.svg"
              onerror="this.src='../../assets/header/instagram.png'"
              alt="Instagram"
            />
          </a>
          <a
            href="https://www.mixcloud.com/8ballradio/"
            target="_blank"
            rel="noopener"
          >
            <img
              class="social__icon"
              src="../../assets/header/mixcloud.svg"
              onerror="this.src='../../assets/header/mixcloud.png'"
              alt="Mixcloud"
            />
          </a>
        </div>
        <router-link to="/offsite" class="btn btn-channel">
          <img
            src="../../assets/header/wave-left-color.svg"
            class="wave__left"
            alt
          />
          OFF-SITE CHANNEL
          <img
            src="../../assets/header/wave-right-color.svg"
            class="wave__right"
            alt
          />
        </router-link>
      </div>
    </section>
    <section id="header-middle" class="header-menu">
      <div class="main-menu">
        <h1>
          <router-link to="/">
            <img
              class="logo"
              src="../../assets/header/logo.svg"
              onerror="this.src='../../assets/header/logo.png'"
              alt="8 Ball Radio"
            />
          </router-link>
        </h1>
        <nav class="nav">
          <ul>
            <li>
              <a
                href="https://8ballcommunity.club/"
                target="_blank"
                rel="noopener"
                class="nav__link"
                >EVENTS</a
              >
            </li>
            <li>
              <a
                href="https://www.mixcloud.com/8ballradio/uploads/?order=oldest"
                target="_blank"
                rel="noopener"
                class="nav__link"
                >ARCHIVE</a
              >
            </li>
            <li>
              <button class="btn dropbtn" @click.prevent="showDropDown">
                8-BALL FAMILY
              </button>
              <div class="dropdown-content" id="family-dropdown">
                <a
                  href="http://8balltv.club/"
                  target="_blank"
                  rel="noopener"
                  class="dropdown__link"
                  >8 Ball TV</a
                >
              </div>
            </li>
            <li>
              <a
                href="https://8ballcommunity.bigcartel.com/"
                target="_blank"
                rel="noopener"
                class="nav__link"
                >SHOP</a
              >
            </li>
            <li>
              <router-link to="/showsubmission" class="nav__link" rel="noopener"
                >SHOW SUBMISSON
              </router-link>
            </li>
          </ul>
        </nav>
        <a
          href="https://www.fracturedatlas.org/site/fiscal/profile?id=14927"
          class="btn btn-donate"
          target="_blank"
          rel="noopener"
          >DONATE</a
        >
        <button class="open-menu btn" id="btn-menu" @click="openMenu">
          MENU
        </button>
      </div>
    </section>
    <section id="header-bottom">
      <div class="quick-access">
        <p class="info">
          WE ARE A COMMUNITY RADIO STATION PART OF A 501c3 NON-PROFIT :: SUPPORT
          US!
        </p>
        <div class="access">
          <router-link to="/shows" class="btn btn-access">SHOWS</router-link>
          <router-link to="/schedule" class="btn btn-access"
            >SCHEDULE</router-link
          >
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
      stream: null,
      showName: "",
      playing: false,
      volume: 100,
      previousVolume: 35,
      isStreaming: false,
      onAirText: "OFF - AIR",
      media_item_played: null,
      load_stream: false
    };
  },
  components: {
    "app-mobile-menu": AppMobileMenu
  },
  mounted() {
    this.$root.$on("streamMixcloud", () => {
      this.pauseStream();
    });
    // Attach event listener to the root vue element
    document.addEventListener("click", this.onClick);

    let streamAPI = "https://eightball.airtime.pro/api/live-info";

    const getStreamInfo = async info => {
      try {
        return axios.get(info);
      } catch (error) {
        console.error(error);
      }
    };

    let streamInfo = Promise.resolve(getStreamInfo(streamAPI));
    streamInfo.then(val => {
      if (
        val.data["currentShow"] === undefined ||
        val.data["currentShow"].length === 0
      ) {
        this.showName = "No show currently playing";
        this.isStreaming = false;
        this.onAirText = "OFF - AIR";
      } else {
        // showName is the text that will be displayed on header
        // media_item_played checks for liveDJ status

        let showName = val.data["currentShow"][0]["name"];
        let trackName = val.data["current"]["name"];
        this.media_item_played = val.data["current"]["media_item_played"];

        // if there is NO liveDJ, then a media item is being played
        // Need to crop date and file extension if they exist
        if (this.media_item_played) {
          // Date checking function
          var isDate = function(date) {
            return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
          };

          // Cut .mp3 from string if it exists
          let ext = trackName.split(".").pop();
          if (ext == "mp3") {
            trackName = trackName.slice(0, -4);
          }

          // If the beginning substring is a date
          // meaning file is a mixlr archive file
          // set showName to nameTest

          let dateTest = trackName.substring(0, 11);
          let nameTest = trackName.substring(13, trackName.length);

          if (isDate(dateTest)) {
            trackName = nameTest;
          }

          // If it's From the Vault, display it
          if (showName.toLowerCase() == "From the Vault".toLowerCase()) {
            trackName = showName + " " + trackName;
          }

          // set showName to trackName
          showName = trackName;
        }
        this.showName = showName;
        this.isStreaming = true;
        this.onAirText = "ON - AIR";
      }
    });

    this.$nextTick(() => {
      window.setInterval(() => {
        let streamInfo = Promise.resolve(getStreamInfo(streamAPI));
        streamInfo.then(val => {
          if (
            val.data["currentShow"] === undefined ||
            val.data["currentShow"].length === 0
          ) {
            this.showName = "No show currently playing";
            this.isStreaming = false;
            this.onAirText = "OFF - AIR";
          } else {
            // showName is the text that will be displayed on header
            // media_item_played checks for liveDJ status

            let showName = val.data["currentShow"][0]["name"];
            let trackName = val.data["current"]["name"];
            this.media_item_played = val.data["current"]["media_item_played"];

            // if there is NO liveDJ, then a media item is being played
            // Need to crop date and file extension if they exist
            if (this.media_item_played) {
              // Date checking function
              var isDate = function(date) {
                return (
                  new Date(date) !== "Invalid Date" && !isNaN(new Date(date))
                );
              };

              // Cut .mp3 from string if it exists
              let ext = trackName.split(".").pop();
              if (ext == "mp3") {
                trackName = trackName.slice(0, -4);
              }

              // If the beginning substring is a date
              // meaning file is a mixlr archive file
              // set showName to nameTest

              let dateTest = trackName.substring(0, 11);
              let nameTest = trackName.substring(13, trackName.length);

              if (isDate(dateTest)) {
                trackName = nameTest;
              }

              // If it's From the Vault, display it
              if (showName.toLowerCase() == "From the Vault".toLowerCase()) {
                trackName = showName + " " + trackName;
              }

              // set showName to trackName
              showName = trackName;
            }
            this.showName = showName;
            this.isStreaming = true;
            this.onAirText = "ON - AIR";
          }
        });
      }, 30000);
    });
  },
  beforeDestroy: function() {
    document.removeEventListener("click", this.onClick);
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
      if (!this.firstPlay) {
        this.firstPlay = true;
        this.stream = new Audio(
          "http://eightball.out.airtime.pro:8000/eightball_a"
        );
      }
      if (!this.playing) {
        this.$root.$emit("streamChannel1");
        this.playStream();
      } else {
        this.pauseStream();
      }
    },
    mute() {
      if (this.muted) {
        return (this.volume = this.previousVolume);
      }

      this.previousVolume = this.volume;
      this.volume = 0;
    },
    showDropDown() {
      document.querySelector("#family-dropdown").classList.toggle("show");
    },
    onClick: function(ev) {
      if (!ev.target.matches(".dropbtn")) {
        const familyDropdown = document.querySelector("#family-dropdown");
        if (familyDropdown.classList.contains("show")) {
          familyDropdown.classList.remove("show");
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header-menu {
  background-image: url(../../assets/header/menu-pattern.svg);
}
.btn-access {
  background-image: url(../../assets/header/btn-pattern.svg);
}
</style>
