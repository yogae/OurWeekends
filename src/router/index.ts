import Vue from "vue";
import VueRouter from "vue-router";
import ListingPage from "../views/ListingPage.vue"
import FocusedPage from "../views/FocusedPage.vue"

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: '/', component: ListingPage },
    { path: '/listing', component: ListingPage },
    { path: '/focused', component: FocusedPage },
  ]
});