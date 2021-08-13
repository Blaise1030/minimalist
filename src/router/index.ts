import store from "@/store";
import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import(/* webpackChunkName: "main" */ "../views/Main.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.fullPath === "/list") {
    if (!store.getters.getUser()) {
      return next("/");
    }
  }
  if (to.fullPath === "/") {
    if (store.getters.getUser()) {
      return next("/list");
    }
  }
  next();
});

export default router;
