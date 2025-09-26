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

    <!-- 应用页面 -->
    <div v-if="!showMask" class="app-content">
      <div class="main-content">
        <h2>应用主界面</h2>
        <p>这里是应用的主要内容区域</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import EntranceMask from "@/components/mobile/EntranceMask.vue";

export default defineComponent({
  name: "MobileHome",
  components: {
    EntranceMask,
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

  // 应用主内容
  .app-content {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    display: flex;
    align-items: center;
    justify-content: center;

    .main-content {
      text-align: center;
      padding: 40px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 28px;
        color: #333;
        margin-bottom: 16px;
      }

      p {
        font-size: 16px;
        color: #666;
        line-height: 1.6;
      }
    }
  }
}

// 移动端竖屏适配
@media (orientation: portrait) and (max-width: 768px) {
  .mobile-home-container .app-content .main-content {
    padding: 30px;
    margin: 20px;

    h2 {
      font-size: 24px;
    }

    p {
      font-size: 14px;
    }
  }
}

// 超小屏幕适配
@media (max-width: 360px) {
  .mobile-home-container .app-content .main-content {
    padding: 20px;
    margin: 15px;

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 13px;
    }
  }
}
</style>
