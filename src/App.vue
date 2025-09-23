<template>
  <div id="app" :class="{ 'mobile-app': isMobileDevice }">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import { getDeviceType, listenDeviceChange } from "./utils/device";

export default defineComponent({
  name: "App",
  setup() {
    const isMobileDevice = ref(getDeviceType() === "mobile");
    let unlistenDeviceChange: (() => void) | null = null;

    onMounted(() => {
      // 监听设备类型变化
      unlistenDeviceChange = listenDeviceChange((deviceType) => {
        isMobileDevice.value = deviceType === "mobile";
      });
    });

    onUnmounted(() => {
      // 取消监听
      if (unlistenDeviceChange) {
        unlistenDeviceChange();
      }
    });

    return {
      isMobileDevice,
    };
  },
});
</script>

<style lang="less">
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  height: 100%;

  &.mobile-app {
    max-width: 100%;
    overflow-x: hidden;
    font-size: 14px;
  }
}
</style>
