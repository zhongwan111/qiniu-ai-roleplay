import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { getDeviceType, listenDeviceChange } from "./utils/device";

// 创建应用实例
const app = createApp(App);

// 使用Pinia状态管理
app.use(createPinia());

// 使用路由
app.use(router);

// 挂载应用
app.mount("#app");

// 在控制台显示当前设备类型（仅开发环境）
if (process.env.NODE_ENV === "development") {
  console.log(`当前设备类型: ${getDeviceType()}`);

  // 监听设备类型变化
  listenDeviceChange((deviceType) => {
    console.log(`设备类型变更为: ${deviceType}`);
    // 设备类型变化时刷新页面以加载对应的路由
    window.location.reload();
  });
}
