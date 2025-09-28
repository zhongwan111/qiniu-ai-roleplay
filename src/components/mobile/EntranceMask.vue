<template>
  <div v-if="visible" class="entrance-mask">
    <!-- 视频背景 -->
    <video
      class="video-background"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      webkit-playsinline
    >
      <source :src="videoSrc" type="video/mp4" />
      您的浏览器不支持视频播放
    </video>

    <!-- 内容覆盖层 -->
    <div class="content-overlay">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <!-- 进入按钮 -->
      <button class="enter-button" @click="handleEnter">
        <span>{{ buttonText }}</span>
        <svg
          class="arrow-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EntranceMask",
  props: {
    // 控制遮罩层显示/隐藏
    visible: {
      type: Boolean,
      default: true,
    },
    // 视频源路径
    videoSrc: {
      type: String,
      required: true,
    },
    // 标题文字
    title: {
      type: String,
      default: "七牛 AI角色对话",
    },
    // 描述文字
    description: {
      type: String,
      default: "欢迎来到 AI 角色对话平台",
    },
    // 按钮文字
    buttonText: {
      type: String,
      default: "进入体验",
    },
  },
  emits: ["enter"],
  setup(props, { emit }) {
    const handleEnter = () => {
      emit("enter");
    };

    return {
      handleEnter,
    };
  },
});
</script>

<style lang="less" scoped>
// 入场遮罩层
.entrance-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: all 0.6s ease-in-out;

  // 视频背景样式 - 移动端
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

    // 移动端特定优化
    pointer-events: none;
  }

  // 内容覆盖层
  .content-overlay {
    position: absolute;
    bottom: 5%;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
    padding: 20px;

    background: rgba(0, 0, 0, 0.2);
    color: white;

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      font-weight: bold;
      line-height: 1.2;
    }

    p {
      font-size: 20px;
      margin: 0 0 30px 0;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      line-height: 1.4;
    }

    // 进入按钮样式
    .enter-button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50px;
      color: white;
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
      }

      &:active {
        transform: translateY(0);
      }

      .arrow-icon {
        width: 20px;
        height: 20px;
        transition: transform 0.3s ease;
      }

      &:hover .arrow-icon {
        transform: translateX(4px);
      }
    }
  }
}

// 移动端竖屏适配
@media (orientation: portrait) and (max-width: 768px) {
  .entrance-mask .content-overlay {
    h1 {
      font-size: 32px;
    }

    p {
      font-size: 18px;
    }

    .enter-button {
      font-size: 16px;
      padding: 14px 28px;
    }
  }
}

// 移动端横屏适配
@media (orientation: landscape) and (max-height: 500px) {
  .entrance-mask .content-overlay {
    bottom: 15%;

    h1 {
      font-size: 28px;
      margin-bottom: 15px;
    }

    p {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .enter-button {
      font-size: 16px;
      padding: 12px 24px;
    }
  }
}

// 超小屏幕适配
@media (max-width: 360px) {
  .entrance-mask .content-overlay {
    padding: 15px;

    h1 {
      font-size: 28px;
    }

    p {
      font-size: 16px;
    }

    .enter-button {
      font-size: 14px;
      padding: 12px 20px;

      .arrow-icon {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
