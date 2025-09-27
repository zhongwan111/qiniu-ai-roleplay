<template>
  <div class="mobile-home-container">
    <!-- 首次进入遮罩层 -->
    <EntranceMask
      :visible="showMask"
      :video-src="videoSrc"
      title="七牛 AI角色对话"
      description="欢迎来到 AI 角色对话平台"
      button-text="进入体验"
      @enter="enterApp"
    />

    <!-- 应用页面 - 语音对话界面 -->
    <VoiceChat v-if="!showMask" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EntranceMask from "@/components/mobile/EntranceMask.vue";
import VoiceChat from "@/components/mobile/VoiceChat.vue";

export default defineComponent({
  name: "MobileHome",
  components: {
    EntranceMask,
    VoiceChat,
  },
  setup() {
    // 控制遮罩层显示状态
    const showMask = ref(true);

    // 视频源路径 - 使用public目录中的文件
    const videoSrc = "/videos/qiniu_cover.mp4";

    // 进入应用的方法
    const enterApp = () => {
      showMask.value = false;
    };

    return {
      showMask,
      videoSrc,
      enterApp,
    };
  },
});
</script>

<style lang="less" scoped>
.mobile-home-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
