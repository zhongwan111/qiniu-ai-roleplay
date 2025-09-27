<template>
  <div class="voice-chat-container">
    <!-- 背景视频 - 雷军形象 -->
    <video
      ref="backgroundVideo"
      class="background-video"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
    >
      <source :src="currentVideoSrc" type="video/mp4" />
    </video>

    <!-- 语音对话界面 -->
    <div class="voice-interface">
      <!-- 对话状态显示 -->
      <div class="status-display">
        <div v-if="isListening" class="status-item listening">
          <div class="pulse-animation"></div>
          <span>正在聆听...</span>
        </div>
        <div v-else-if="isProcessing" class="status-item processing">
          <div class="loading-spinner"></div>
          <span>雷总思考中...</span>
        </div>
        <div v-else-if="isSpeaking" class="status-item speaking">
          <div class="sound-wave"></div>
          <span>雷总回答中...</span>
        </div>
        <div v-else class="status-item idle">
          <span>点击下方按钮，与雷总对话</span>
        </div>
      </div>

      <!-- 对话内容显示 -->
      <div class="conversation-display">
        <div
          v-for="(message, index) in conversation"
          :key="index"
          :class="['message', message.type]"
        >
          <div class="message-content">
            <span class="speaker">{{ message.speaker }}:</span>
            <span class="text">{{ message.text }}</span>
          </div>
        </div>
      </div>

      <!-- 语音控制按钮 -->
      <div class="voice-controls">
        <button
          class="voice-button"
          :class="{
            listening: isListening,
            disabled: isProcessing || isSpeaking,
          }"
          @click="toggleVoiceRecording"
          :disabled="isProcessing || isSpeaking"
        >
          <svg
            v-if="!isListening"
            class="mic-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
              fill="currentColor"
            />
            <path
              d="M19 10V12C19 16.42 15.42 20 11 20H9V22H15V20H19V18H15C18.31 18 21 15.31 21 12V10H19Z"
              fill="currentColor"
            />
            <path
              d="M5 10V12C5 15.31 7.69 18 11 18H13V20H7V22H17V20H13C8.58 20 5 16.42 5 12V10H5Z"
              fill="currentColor"
            />
          </svg>
          <svg
            v-else
            class="stop-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="1"
              fill="currentColor"
            />
          </svg>
        </button>
        <span class="button-label">
          {{ isListening ? "停止录音" : "与雷总对话" }}
        </span>
      </div>

      <!-- 错误提示 -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { LLMService } from "@/services/llm-service";

interface Message {
  type: "user" | "ai";
  speaker: string;
  text: string;
  timestamp: number;
}

// 简化的类型声明，避免与浏览器内置类型冲突
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default defineComponent({
  name: "VoiceChat",
  setup() {
    // 状态管理
    const isListening = ref(false);
    const isProcessing = ref(false);
    const isSpeaking = ref(false);
    const errorMessage = ref("");
    const conversation = reactive<Message[]>([]);

    // 视频切换相关
    const backgroundVideo = ref<HTMLVideoElement | null>(null);
    const currentVideoSrc = ref("/videos/leijun.mp4"); // 默认静默状态

    // 视频文件路径配置
    const videoSources = {
      idle: "/videos/leijun.mp4", // 静默状态视频
      speaking: "/videos/leijun_speak.mp4", // 讲话状态视频
    };

    // 语音识别相关
    let recognition: any = null;
    let synthesis: any = null;

    // 视频切换方法
    const switchVideo = (state: "idle" | "speaking") => {
      const newSrc = videoSources[state];
      if (currentVideoSrc.value !== newSrc) {
        currentVideoSrc.value = newSrc;

        // 等待下一帧更新视频元素
        nextTick(() => {
          if (backgroundVideo.value) {
            backgroundVideo.value.load(); // 重新加载视频
            backgroundVideo.value.play().catch((error) => {
              console.warn("视频自动播放失败:", error);
            });
          }
        });
      }
    };

    // 初始化语音功能
    const initSpeechAPIs = () => {
      // 检查浏览器支持
      if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
      ) {
        errorMessage.value = "您的浏览器不支持语音识别功能";
        return false;
      }

      if (!("speechSynthesis" in window)) {
        errorMessage.value = "您的浏览器不支持语音合成功能";
        return false;
      }

      // 初始化语音识别
      const SpeechRecognitionClass =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognitionClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "zh-CN";

      // 初始化语音合成
      synthesis = window.speechSynthesis;

      // 设置识别事件
      recognition.onstart = () => {
        console.log("语音识别开始");
        isListening.value = true;
        errorMessage.value = "";
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          console.log("识别结果:", finalTranscript);
          addMessage("user", "用户", finalTranscript);
          processUserInput(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("语音识别错误:", event.error);
        errorMessage.value = `语音识别错误: ${event.error}`;
        isListening.value = false;
      };

      recognition.onend = () => {
        console.log("语音识别结束");
        isListening.value = false;
      };

      return true;
    };

    // 添加对话消息
    const addMessage = (type: "user" | "ai", speaker: string, text: string) => {
      conversation.push({
        type,
        speaker,
        text,
        timestamp: Date.now(),
      });
    };

    // 切换录音状态
    const toggleVoiceRecording = () => {
      if (isListening.value) {
        stopListening();
      } else {
        startListening();
      }
    };

    // 开始录音
    const startListening = () => {
      if (!recognition) {
        errorMessage.value = "语音识别未初始化";
        return;
      }

      try {
        recognition.start();
      } catch (error) {
        console.error("启动语音识别失败:", error);
        errorMessage.value = "启动语音识别失败，请重试";
      }
    };

    // 停止录音
    const stopListening = () => {
      if (recognition && isListening.value) {
        recognition.stop();
      }
    };

    // 处理用户输入（调用LLM）
    const processUserInput = async (text: string) => {
      isProcessing.value = true;
      errorMessage.value = "";

      try {
        // 使用统一的LLM服务，默认使用雷军人设
        const aiResponse = await LLMService.chat(text);
        addMessage("ai", "雷军", aiResponse);
        speakText(aiResponse);
      } catch (error) {
        console.error("处理用户输入失败:", error);
        const errorMsg = (error as Error).message;

        if (errorMsg.includes("配置") || errorMsg.includes("启用")) {
          // 配置问题，显示具体错误信息
          errorMessage.value = errorMsg;
        } else {
          errorMessage.value = "AI处理失败，请重试";
        }

        // 降级到模拟响应
        const fallbackResponse = `Are you OK？AI服务暂时不可用，不过我听到您说的是："${text}"。等会儿我们再聊聊小米的黑科技！`;
        addMessage("ai", "雷军", fallbackResponse);
        speakText(fallbackResponse);
      } finally {
        isProcessing.value = false;
      }
    };

    // 语音播放
    const speakText = (text: string) => {
      if (!synthesis) {
        errorMessage.value = "语音合成不可用";
        return;
      }

      isSpeaking.value = true;

      // 切换到讲话状态视频
      switchVideo("speaking");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 0.8;

      utterance.onend = () => {
        isSpeaking.value = false;
        // 切换回静默状态视频
        switchVideo("idle");
      };

      utterance.onerror = (event) => {
        console.error("语音合成错误:", event);
        errorMessage.value = "语音播放失败";
        isSpeaking.value = false;
        // 出错时也切换回静默状态
        switchVideo("idle");
      };

      synthesis.speak(utterance);
    };

    // 组件挂载
    onMounted(() => {
      if (!initSpeechAPIs()) {
        console.error("语音API初始化失败");
      }
    });

    // 组件卸载清理
    onUnmounted(() => {
      if (recognition) {
        recognition.abort();
      }
      if (synthesis) {
        synthesis.cancel();
      }
    });

    return {
      isListening,
      isProcessing,
      isSpeaking,
      errorMessage,
      conversation,
      toggleVoiceRecording,
      backgroundVideo,
      currentVideoSrc,
    };
  },
});
</script>

<style lang="less" scoped>
.voice-chat-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 0;
  object-fit: cover;
  opacity: 0.7;
}

.voice-interface {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.status-display {
  text-align: center;
  padding: 20px;
  margin-top: 60px;

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    font-size: 16px;

    span {
      margin-top: 12px;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }

    &.listening {
      color: #ff6b6b;
    }

    &.processing {
      color: #4ecdc4;
    }

    &.speaking {
      color: #45b7d1;
    }

    &.idle {
      color: #ffffff;
      opacity: 0.8;
    }
  }
}

.pulse-animation {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ff6b6b;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(78, 205, 196, 0.3);
  border-top: 3px solid #4ecdc4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.sound-wave {
  width: 40px;
  height: 40px;
  background: #45b7d1;
  border-radius: 50%;
  animation: soundWave 1s ease-in-out infinite alternate;
}

@keyframes soundWave {
  0% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1.1);
  }
}

.conversation-display {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  max-height: 40vh;

  .message {
    margin-bottom: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    backdrop-filter: blur(10px);

    &.user {
      background: rgba(69, 183, 209, 0.2);
      border: 1px solid rgba(69, 183, 209, 0.3);
      margin-left: 20px;
    }

    &.ai {
      background: rgba(78, 205, 196, 0.2);
      border: 1px solid rgba(78, 205, 196, 0.3);
      margin-right: 20px;
    }

    .message-content {
      color: white;
      font-size: 14px;
      line-height: 1.4;

      .speaker {
        font-weight: bold;
        margin-right: 8px;
      }

      .text {
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }
    }
  }
}

.voice-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .voice-button {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

    &:hover:not(.disabled) {
      transform: scale(1.05);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    }

    &.listening {
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
      animation: pulse 2s infinite;
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .mic-icon,
    .stop-icon {
      width: 32px;
      height: 32px;
    }
  }

  .button-label {
    margin-top: 12px;
    color: white;
    font-size: 14px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
}

.error-message {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 107, 107, 0.9);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

// 响应式适配
@media (max-width: 480px) {
  .voice-interface {
    padding: 15px;
  }

  .status-display {
    margin-top: 40px;
    padding: 15px;

    .status-item span {
      font-size: 14px;
    }
  }

  .conversation-display {
    max-height: 35vh;
    padding: 15px 0;

    .message .message-content {
      font-size: 13px;
    }
  }

  .voice-controls .voice-button {
    width: 70px;
    height: 70px;

    .mic-icon,
    .stop-icon {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
