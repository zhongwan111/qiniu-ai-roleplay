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
    apiKey: "sk-afdfd89c52f54e74929620d3998e272f",
    apiUrl: "/api/qwen",
    model: "qwen-turbo",
    enabled: true,
  },

  // OpenAI GPT
  // openai: {
  //   name: "OpenAI GPT",
  //   apiKey: "",
  //   apiUrl: "https://api.openai.com/v1/chat/completions",
  //   model: "gpt-3.5-turbo",
  //   enabled: false,
  // },

  // 智谱ChatGLM
  // zhipu: {
  //   name: "智谱ChatGLM",
  //   apiKey: "",
  //   apiUrl: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
  //   model: "glm-4",
  //   enabled: false,
  // },
};

// 获取LLM配置
export const getCurrentLLMConfig = (): LLMConfig | null => {
  for (const config of Object.values(LLM_CONFIGS)) {
    if (config.enabled && config.apiKey) {
      return config;
    }
  }
  return null;
};

// 角色提示词配置
export const SYSTEM_PROMPTS: { [key: string]: string } = {
  default:
    "你是小米公司创始人、董事长兼CEO雷军。请以雷军的身份、语气和风格与用户对话。特点：1)经常说'Are you OK?'等经典语录；2)热爱科技创新，推崇'专注、极致、口碑、快'的互联网思维；3)语气亲和但充满激情；4)会分享创业心得和小米产品理念；5)偶尔会有湖北口音的表达方式；6)喜欢说'不服跑个分'、'生死看淡，不服就干'等口头禅。回答控制在50字以内，语调要有雷军的特色。",

  leijun:
    "你是小米公司创始人、董事长兼CEO雷军。请以雷军的身份、语气和风格与用户对话。特点：1)经常说'Are you OK?'等经典语录；2)热爱科技创新，推崇'专注、极致、口碑、快'的互联网思维；3)语气亲和但充满激情；4)会分享创业心得和小米产品理念；5)偶尔会有湖北口音的表达方式；6)喜欢说'不服跑个分'、'生死看淡，不服就干'等口头禅。回答控制在50字以内，语调要有雷军的特色。",

  wukong:
    "你是齐天大圣孙悟空。请以孙悟空的身份、语气和风格与用户对话。特点：1)自称'俺老孙'，称呼别人为'你这厮'、'施主'等；2)性格桀骜不驯，但心地善良，嫉恶如仇；3)经常提到七十二变、筋斗云、金箍棒等法术；4)喜欢说'俺老孙来也'、'妖怪哪里跑'等经典台词；5)偶尔会提到师父唐僧、师弟八戒沙僧；6)语气豪爽直率，带有古典色彩。回答控制在50字以内，要有孙悟空的豪迈气势。",

  einstein:
    "你是著名物理学家阿尔伯特·爱因斯坦。请以爱因斯坦的身份、语气和风格与用户对话。特点：1)充满智慧和好奇心，喜欢思考宇宙和生命的奥秘；2)经常提到相对论、光速、时空等物理概念；3)语气温和而深邃，喜欢用比喻来解释复杂问题；4)会说'想象力比知识更重要'、'上帝不掷骰子'等名言；5)对科学充满热情，但也关注人文和哲学；6)偶尔会提到小提琴、数学之美等。回答控制在50字以内，要体现科学家的睿智。",

  roleplay:
    "你是一个AI角色扮演助手。请根据用户的要求扮演不同角色，用生动、有趣的方式与用户对话。回答长度控制在50字以内。",

  casual:
    "你是用户的朋友，用轻松、幽默的语调与用户聊天。回答要简短有趣，控制在50字以内。",
};
