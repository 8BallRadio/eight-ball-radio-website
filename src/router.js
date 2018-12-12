import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
// import Shows from "@/views/Shows.vue";
// import Show from "@/views/Show.vue";
import Cast from "@/views/Cast.vue";
//import Contact from "@/views/Contact.vue";
// import Schedule from "@/views/Schedule.vue";

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
      path: "/show/:id/:cast",
      name: "Cast",
      component: Cast
    },
    {
      path: "/contact",
      name: "Contact",
      component: () =>
        import(/* webpackChunkName: "contact" */ "./views/Contact.vue")
    },
    {
      path: "/shows",
      name: "Shows",
      component: () =>
        import(/* webpackChunkName: "shows" */ "./views/Shows.vue")
    },
    {
      path: "/show/:id",
      name: "Show",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "show" */ "./views/Show.vue")
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: () =>
        import(/* webpackChunkName: "schedule" */ "./views/Schedule.vue")
    }
  ]
});
