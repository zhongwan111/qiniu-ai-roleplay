<template>
  <div class="home-container">
    <!-- 视频背景 -->
    <video
      class="video-background"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
    >
      <source src="/videos/qiniu_cover.mp4" type="video/mp4" />
      您的浏览器不支持视频播放
    </video>

    <!-- 内容覆盖层 -->
    <div class="content-overlay">
      <h1>七牛 AI 角色扮演</h1>
      <p>欢迎来到 AI 角色扮演平台</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PcHome",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.home-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  // 视频背景样式
  .video-background {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translate(-50%, -50%);
    z-index: -1;
    object-fit: cover;

    background-color: #000;
  }

  // 内容覆盖层
  .content-overlay {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;

    background: rgba(0, 0, 0, 0.3);
    color: white;

    h1 {
      font-size: 48px;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
      font-weight: bold;
    }

    p {
      font-size: 24px;
      margin: 0;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
