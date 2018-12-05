<template>
  <header>
    <a href="#maincontent" class="skip-main">skip to main content</a>
    <section id="header-top">
      <div class="top">
        <h4 class="top__onair">
          <img src="../../assets/header/wave-left.svg" class="wave__left" alt>
          ON - AIR
          <img src="../../assets/header/wave-right.svg" class="wave__right" alt>
        </h4>
        <div class="top__player">
          <div class="player__controls">
            <button class="control__play"></button>
            <button class="btn control__volume">
              <img src="../../assets/header/volume.svg" alt="volume control">
            </button>
          </div>
          <div class="player__info">
            <div class="info__top">Now Playing</div>
            <div class="info__ticker">
              <div class="ticker-wrapper">
                <div class="ticker">
                  <div class="ticker__item">MAGIC MARMALADE - EPISODE 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top__social">
          <a href="https://www.facebook.com/eightballradio/" target="_blank">
            <img
              class="social__icon"
              src="../../assets/header/facebook.svg"
              onerror="this.src='../../assets/header/facebook.png'"
              alt="Facebook Fan Page"
            >
          </a>
          <a href="https://www.instagram.com/8ballradio/" target="_blank">
            <img
              class="social__icon"
              src="../../assets/header/instagram.svg"
              onerror="this.src='../../assets/header/instagram.png'"
              alt="Instagram"
            >
          </a>
          <a href="https://www.mixcloud.com/8ballradio/" target="_blank">
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
          <img
            class="logo"
            src="../../assets/header/logo.svg"
            onerror="this.src='../../assets/header/logo.png'"
            alt="8 Ball Radio"
          >
        </h1>
        <nav class="nav">
          <ul>
            <li>
              <a href class="nav__link">EVENTS</a>
            </li>
            <li>
              <a href class="nav__link">ABOUT</a>
            </li>
            <li>
              <a href class="nav__link">8-BALL FAMILY</a>
            </li>
            <li>
              <a href class="nav__link">SHOP</a>
            </li>
          </ul>
        </nav>
        <a href class="btn btn-donate" target="_blank">DONATE</a>
      </div>
    </section>
    <section id="header-bottom">
      <div class="quick-access">
        <p class="info">
          WE ARE A COMMUNITY RADIO STATION PART OF A 501c3 NON-PROFIT ::
          SUPPORT US!
        </p>
        <div class="access">
          <a href class="btn btn-access">SHOWS</a>
          <a href class="btn btn-access">SCHEDULE</a>
        </div>
      </div>
    </section>
    <app-mobile-menu></app-mobile-menu>
  </header>
</template>
<script>
import AppMobileMenu from "./AppMobileMenu.vue";
export default {
  name: "header",
  data() {
    return {
      isSideBarOpen: false
    };
  },
  components: {
    "app-mobile-menu": AppMobileMenu
  },
  methods: {
    openMenu() {
      this.$emit("openMenu");
      this.isSideBarOpen = true;
      document.querySelector("#mobile-menu").className += " active";
      document.body.style.overflow = "hidden";
    }
  }
};
</script>
