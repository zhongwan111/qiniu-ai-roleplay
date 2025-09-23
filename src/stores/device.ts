import { defineStore } from "pinia";
import { getDeviceType } from "../utils/device";

// 定义设备状态接口
interface DeviceState {
  deviceType: "pc" | "mobile";
  isMobile: boolean;
}

// 创建设备状态存储
export const useDeviceStore = defineStore("device", {
  // 状态
  state: (): DeviceState => ({
    deviceType: getDeviceType(),
    isMobile: getDeviceType() === "mobile",
  }),

  // getters
  getters: {
    // 是否为PC端
    isPc(): boolean {
      return this.deviceType === "pc";
    },
  },

  // actions
  actions: {
    // 更新设备类型
    updateDeviceType() {
      const newDeviceType = getDeviceType();
      this.deviceType = newDeviceType;
      this.isMobile = newDeviceType === "mobile";
    },
  },
});
