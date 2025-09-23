/**
 * 设备检测工具函数
 */

// 判断是否为移动设备
export const isMobile = (): boolean => {
  if (typeof navigator === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileRegex =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;

  return (
    mobileRegex.test(userAgent) ||
    window.innerWidth <= 768 ||
    "ontouchstart" in window
  );
};

// 获取当前设备类型
export const getDeviceType = (): "mobile" | "pc" => {
  return isMobile() ? "mobile" : "pc";
};

// 监听设备类型变化（窗口大小改变时）
export const listenDeviceChange = (
  callback: (deviceType: "mobile" | "pc") => void
): (() => void) => {
  const handleResize = () => {
    callback(getDeviceType());
  };

  window.addEventListener("resize", handleResize);

  // 返回取消监听的函数
  return () => {
    window.removeEventListener("resize", handleResize);
  };
};
