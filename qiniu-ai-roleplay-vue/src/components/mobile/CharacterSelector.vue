<template>
  <div class="character-selector">
    <!-- 角色切换按钮 -->
    <div class="selector-toggle" @click="toggleSelector">
      <div class="current-character" :style="{ color: currentCharacter.color }">
        <span class="character-avatar">{{ currentCharacter.avatar }}</span>
        <span class="character-name">{{ currentCharacter.displayName }}</span>
      </div>
      <div class="toggle-icon" :class="{ active: isOpen }">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 8l4-4H2l4 4z" />
        </svg>
      </div>
    </div>

    <!-- 角色选择面板 -->
    <transition name="selector-slide">
      <div v-if="isOpen" class="selector-panel">
        <div class="panel-header">
          <span>选择AI角色</span>
        </div>
        <div class="character-list">
          <div
            v-for="character in characters"
            :key="character.id"
            class="character-item"
            :class="{ active: character.id === currentCharacter.id }"
            :style="{ borderColor: character.color }"
            @click="selectCharacter(character)"
          >
            <div class="character-info">
              <span class="character-avatar">{{ character.avatar }}</span>
              <div class="character-details">
                <div class="character-name">{{ character.name }}</div>
                <div class="character-desc">{{ character.description }}</div>
              </div>
            </div>
            <div
              v-if="character.id === currentCharacter.id"
              class="check-icon"
              :style="{ color: character.color }"
            >
              ✓
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 遮罩层 -->
    <div v-if="isOpen" class="selector-overlay" @click="closeSelector"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { CHARACTERS, getDefaultCharacter } from "@/config/character-config";
import type { CharacterConfig } from "@/config/character-config";

export default defineComponent({
  name: "CharacterSelector",
  emits: ["character-change"],
  setup(_, { emit }) {
    // 状态管理
    const isOpen = ref(false);
    const currentCharacterId = ref(getDefaultCharacter().id);

    // 计算属性
    const characters = computed(() => CHARACTERS);
    const currentCharacter = computed(() => {
      return (
        CHARACTERS.find((char) => char.id === currentCharacterId.value) ||
        getDefaultCharacter()
      );
    });

    // 方法
    const toggleSelector = () => {
      isOpen.value = !isOpen.value;
    };

    const closeSelector = () => {
      isOpen.value = false;
    };

    const selectCharacter = (character: CharacterConfig) => {
      if (character.id !== currentCharacterId.value) {
        currentCharacterId.value = character.id;
        emit("character-change", character);
      }
      closeSelector();
    };

    return {
      isOpen,
      characters,
      currentCharacter,
      toggleSelector,
      closeSelector,
      selectCharacter,
    };
  },
});
</script>

<style lang="less" scoped>
.character-selector {
  position: relative;
  z-index: 100;
}

.selector-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .current-character {
    display: flex;
    align-items: center;
    gap: 8px;

    .character-avatar {
      font-size: 18px;
      line-height: 1;
    }

    .character-name {
      font-size: 14px;
      font-weight: 500;
      color: white;
    }
  }

  .toggle-icon {
    transition: transform 0.3s ease;
    color: rgba(255, 255, 255, 0.7);

    &.active {
      transform: rotate(180deg);
    }
  }
}

.selector-panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  .panel-header {
    padding: 16px;
    text-align: center;
    color: white;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .character-list {
    padding: 8px;
  }

  .character-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    margin-bottom: 4px;
    border: 2px solid transparent;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: rgba(255, 255, 255, 0.1);
      border-color: currentColor;
    }

    .character-info {
      display: flex;
      align-items: center;
      gap: 12px;

      .character-avatar {
        font-size: 20px;
        line-height: 1;
      }

      .character-details {
        .character-name {
          color: white;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .character-desc {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
        }
      }
    }

    .check-icon {
      font-size: 16px;
      font-weight: bold;
    }
  }
}

.selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: transparent;
}

// 动画效果
.selector-slide-enter-active,
.selector-slide-leave-active {
  transition: all 0.3s ease;
  transform-origin: top center;
}

.selector-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}

.selector-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px) scaleY(0.8);
}
</style>
