import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    slug: ""
  },
  getters: {
    getShowSlug: state => {
      return state.slug;
    }
  },
  mutations: {
    SHOW_SELECTED: (state, slug) => {
      state.slug = slug;
    },
    REMOVE_SLUG: state => {
      state.slug = "";
    }
  },
  actions: {
    showSelected: (context, slug) => {
      context.commit("SHOW_SELECTED", slug);
    },
    removeSlug: context => {
      context.commit("REMOVE_SLUG");
    }
  }
});
