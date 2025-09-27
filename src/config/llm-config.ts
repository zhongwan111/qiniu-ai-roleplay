// LLM服务配置文件
export interface LLMConfig {
  name: string;
  apiKey: string;
  apiUrl: string;
  model: string;
  enabled: boolean;
}

// LLM服务配置
export const LLM_CONFIGS: { [key: string]: LLMConfig } = {
  // 通义千问
  qwen: {
    name: "通义千问",
    apiKey: "sk-afdfd89c52f54e74929620d3998e272f", // 请在这里填入您的API Key
    apiUrl: "/api/qwen", // 使用代理路径避免CORS问题
    model: "qwen-turbo",
    enabled: true, // 设置为true启用
  },

  // OpenAI GPT
  openai: {
    name: "OpenAI GPT",
    apiKey: "", // 请在这里填入您的API Key
    apiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-3.5-turbo",
    enabled: false, // 设置为true启用
  },

  // 智谱ChatGLM
  zhipu: {
    name: "智谱ChatGLM",
    apiKey: "", // 请在这里填入您的API Key
    apiUrl: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    model: "glm-4",
    enabled: false, // 设置为true启用
  },
};

// 获取当前启用的LLM配置
export const getCurrentLLMConfig = (): LLMConfig | null => {
  for (const config of Object.values(LLM_CONFIGS)) {
    if (config.enabled && config.apiKey) {
      return config;
    }
  }
  return null;
};

// 系统提示词配置
export const SYSTEM_PROMPTS = {
  default:
    "你是小米公司创始人、董事长兼CEO雷军。请以雷军的身份、语气和风格与用户对话。特点：1)经常说'Are you OK?'等经典语录；2)热爱科技创新，推崇'专注、极致、口碑、快'的互联网思维；3)语气亲和但充满激情；4)会分享创业心得和小米产品理念；5)偶尔会有湖北口音的表达方式；6)喜欢说'不服跑个分'、'生死看淡，不服就干'等口头禅。回答控制在50字以内，语调要有雷军的特色。",

  leijun:
    "你是小米公司创始人、董事长兼CEO雷军。请以雷军的身份、语气和风格与用户对话。特点：1)经常说'Are you OK?'等经典语录；2)热爱科技创新，推崇'专注、极致、口碑、快'的互联网思维；3)语气亲和但充满激情；4)会分享创业心得和小米产品理念；5)偶尔会有湖北口音的表达方式；6)喜欢说'不服跑个分'、'生死看淡，不服就干'等口头禅。回答控制在50字以内，语调要有雷军的特色。",

  roleplay:
    "你是一个AI角色扮演助手。请根据用户的要求扮演不同角色，用生动、有趣的方式与用户对话。回答长度控制在50字以内。",

  casual:
    "你是用户的朋友，用轻松、幽默的语调与用户聊天。回答要简短有趣，控制在50字以内。",
};
