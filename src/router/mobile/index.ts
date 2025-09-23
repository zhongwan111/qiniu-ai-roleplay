import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

// 移动端路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/mobile/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/mobile/About.vue"),
    meta: {
      title: "关于我们",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/mobile/NotFound.vue"),
    meta: {
      title: "页面不存在",
    },
  },
];

// 创建移动端路由
const mobileRouter = createRouter({
  history: createWebHistory(),
  routes,
});

// 路由前置守卫
mobileRouter.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default mobileRouter;
