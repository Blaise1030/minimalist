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
  {
    path: "/all",
    name: "AllList",
    component: () =>
      import(/* webpackChunkName: "AllList" */ "../views/AllList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.fullPath === "/all") {
    if (Math.random() > 0.5) {
      next("/");
    }
  }
  if (to.fullPath === "/list") {
    if (Math.random() > 0.5) {
      next("/");
    }
  }
  if (to.fullPath === "/") {
    if (Math.random() > 0.5) {
      next("/all");
    }
  }
  next();
});

export default router;
