<template>
  <footer id="footer">
    <div class="footer-wrapper">
      <section class="footer__col about">
        <h3>8 BALL RADIO</h3>
        <p>
          Voted listeners’ Choice Best Online Radio Station in North America -
          Mixcloud Online Radio Awards 2018.
        </p>
        <p>© 2018 8 BALL COMMUNITY All rights reserved.</p>
      </section>
      <section class="footer__col contact">
        <h3>CONTACT</h3>
        <p class="contact__title">General Inquiries + Show submissions:</p>
        <router-link to="/contact" class="contact__link">Drop us a line HERE</router-link>
        <p class="visit">Visit Us:</p>
        <p class="visit__text">327 Canal St.</p>
        <p class="visit__text">New York, NY</p>
        <p class="visit__text">Noon to 6pm - Everyday</p>
      </section>
      <section class="footer__col community">
        <h3>8 BALL FAMILY</h3>
        <a href="http://8balltv.club/" class="family__link" target="_blank">8 BALL TV</a>
        <a href="https://8ballcommunity.bigcartel.com/" class="family__link" target="_blank">MERCH (SUPPORT US)</a>
      </section>
    </div>
    <div class="mixcloud-player" v-if="slug">
      <mixcloud></mixcloud>
      <button id="btn close-player" class="close-player__btn" @click="removeSlugs">X</button>
    </div>
  </footer>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Mixcloud from "@/components/layout/Mixcloud.vue";

export default {
  components: {
    mixcloud: Mixcloud
  },
  computed: {
    ...mapState(["slug"])
  },
  methods: {
    ...mapActions(["removeSlug"]),
    removeSlugs: function() {
      this.removeSlug();
    }
  }
};
</script>
<style lang="scss" scoped>
.mixcloud-player {
  position: fixed;
  width: 100%;
  bottom: -5px;
  z-index: 5;
  display: flex;
  background-color: #fcfcfc;
}
.close-player__btn {
  width: 80px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  background-color: #fcfcfc;
  border: none;
  border-left: 1px solid #b3b3b3;
  border-right: 1px solid #b3b3b3;
  color: #000;

  &:hover {
    background-color: map-get($colors, dark-green);
  }
}
</style>
