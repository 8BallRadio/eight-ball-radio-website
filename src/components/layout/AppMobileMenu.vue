<template>
  <aside id="mobile-menu" class="mobile-menu">
    <div class="overlay" @click.prevent="closeMenu"></div>
    <div class="nav-content">
      <button class="close-menu btn" @click.prevent="closeMenu">CLOSE X</button>
      <nav class="nav__items">
        <router-link to="/offsite" class="nav__link btn__channel" @click.native="closeMenu">
          <img src="../../assets/header/wave-left-color.svg" class="wave__left blink-animation" alt>
          OFF-SITE
          <img
            src="../../assets/header/wave-right-color.svg"
            class="wave__right blink-animation"
            alt
          >
        </router-link>
        <a
          href="https://www.fracturedatlas.org/site/fiscal/profile?id=14927"
          class="nav__link btn-donate"
          target="_blank"
          rel="noopener"
        >DONATE</a>
        <router-link :to="{ path: '/shows'}" class="nav__link" @click.native="closeMenu">SHOWS</router-link>
        <router-link to="/schedule" class="nav__link" @click.native="closeMenu">SCHEDULE</router-link>
        <a
          href="https://8ballcommunity.club/"
          target="_blank"
          rel="noopener"
          class="nav__link"
        >EVENTS</a>
        <a
          href="https://www.mixcloud.com/8ballradio/uploads/?order=oldest"
          target="_blank"
          rel="noopener"
          class="nav__link"
        >ARCHIVE</a>
        <a href class="nav__link">8-BALL FAMILY</a>
        <a
          href="https://8ballcommunity.bigcartel.com/"
          target="_blank"
          rel="noopener"
          class="nav__link"
        >SHOP</a>
      </nav>
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
  </aside>
</template>
<script>
export default {
  data() {
    return {
      isSideBarOpen: false
    };
  },
  props: {
    isOpen: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu");
      this.isSideBarOpen = false;
      document.querySelector("#mobile-menu").classList.remove("active");
      document.body.style.overflow = "unset";
    }
  }
};
</script>
