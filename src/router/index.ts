import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import List from "../views/List.vue";
import Main from "../views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/list",
    name: "list",
    component: List,
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
