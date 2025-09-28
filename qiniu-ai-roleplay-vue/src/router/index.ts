import { Router } from "vue-router";
import { getDeviceType } from "@/utils/device";
import pcRouter from "./pc";
import mobileRouter from "./mobile";

// 根据设备类型获取对应的路由
const getRouter = (): Router => {
  const deviceType = getDeviceType();
  return deviceType === "mobile" ? mobileRouter : pcRouter;
};

export default getRouter();
