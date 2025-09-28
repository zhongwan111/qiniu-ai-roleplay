// 角色配置文件
export interface CharacterConfig {
  id: string;
  name: string;
  displayName: string;
  description: string;
  avatar: string;
  videos: {
    idle: string;
    speaking: string;
  };
  promptKey: string;
  color: string;
}

// 角色选择
export const CHARACTERS: CharacterConfig[] = [
  {
    id: "leijun",
    name: "雷军",
    displayName: "雷总",
    description: "小米创始人，科技企业家",
    avatar: "",
    videos: {
      idle: "/videos/leijun.mp4",
      speaking: "/videos/leijun_speak.mp4",
    },
    promptKey: "leijun",
    color: "#FF6900", // 小米橙色
  },
  {
    id: "wukong",
    name: "孙悟空",
    displayName: "大圣",
    description: "齐天大圣，斗战胜佛",
    avatar: "",
    videos: {
      idle: "/videos/wukong.mp4",
      speaking: "/videos/wukong_speak.mp4",
    },
    promptKey: "wukong",
    color: "#FFD700",
  },
  {
    id: "einstein",
    name: "爱因斯坦",
    displayName: "爱因斯坦",
    description: "著名物理学家，相对论创立者",
    avatar: "",
    videos: {
      idle: "/videos/Einstein.mp4",
      speaking: "/videos/Einstein_speak.mp4",
    },
    promptKey: "einstein",
    color: "#4A90E2",
  },
];

// 获取角色配置
export const getCharacterById = (id: string): CharacterConfig | undefined => {
  return CHARACTERS.find((char) => char.id === id);
};

// 获取默认角色
export const getDefaultCharacter = (): CharacterConfig => {
  return CHARACTERS[0]; // 默认雷军
};
