import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Home from "../views/List.vue";
import Main from "../views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/all",
    name: "AllList",
    component: () => import("../views/AllList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
