<template>
  <aside id="mobile-menu" class="mobile-menu">
    <div class="overlay"></div>
    <div class="nav-content">
      <button class="close-menu btn" @click="closeMenu">CLOSE X</button>
      <nav class="nav__items">
        <router-link :to="{ path: '/shows'}">
          <div class="nav__link">
            SHOWS
          </div>
        </router-link>
        <!-- <a href class="nav__link">SHOWS</a> -->
        <a href class="nav__link">SCHEDULE</a>
        <a href class="nav__link">EVENTS</a>
        <a href class="nav__link">ABOUT</a>
        <a href class="nav__link">8-BALL FAMILY</a>
        <a href class="nav__link">SHOP</a>
      </nav>
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
      document.querySelector("#mobile-menu").className = document
        .querySelector("#mobile-menu")
        .className.replace("active", "");
      document.body.style.overflow = "unset";
    }
  }
};
</script>
