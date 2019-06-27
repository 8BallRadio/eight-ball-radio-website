import Vue from "vue";
import Router from "vue-router";

// Import for code-splitting

const Home = () => import("@/views/Home");
const Shows = () => import("@/views/Shows");
const Show = () => import("@/views/Show");
const Contact = () => import("@/views/Contact");
const Schedule = () => import("@/views/Schedule");
const OffSite = () => import("@/views/OffSite");
const ShowSubmission = () => import("@/views/ShowSubmission");

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
    },
    {
      path: "/showsubmission",
      name: "ShowSubmission",
      component: ShowSubmission
    }
  ]
});
