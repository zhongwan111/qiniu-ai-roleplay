import { defineStore } from "pinia";
import { getDeviceType } from "../utils/device";

interface DeviceState {
  deviceType: "pc" | "mobile";
  isMobile: boolean;
}

// 设备状态存储
export const useDeviceStore = defineStore("device", {
  state: (): DeviceState => ({
    deviceType: getDeviceType(),
    isMobile: getDeviceType() === "mobile",
  }),

  getters: {
    //PC
    isPc(): boolean {
      return this.deviceType === "pc";
    },
  },

  actions: {
    //设备类型
    updateDeviceType() {
      const newDeviceType = getDeviceType();
      this.deviceType = newDeviceType;
      this.isMobile = newDeviceType === "mobile";
    },
  },
});
