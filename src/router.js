import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Shows from "@/views/Shows.vue";
import Show from "@/views/Show.vue";
import Contact from "@/views/Contact.vue";
import Schedule from "@/views/Schedule.vue";
import OffSite from "@/views/OffSite.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact
    },
    {
      path: "/shows",
      name: "Shows",
      component: Shows
    },
    {
      path: "/show/:id",
      name: "Show",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Show,
      props: true
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: Schedule
    },
    {
      path: "/offsite",
      name: "OffSite",
      component: OffSite
    }
  ]
});
