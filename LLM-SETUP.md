# 🤖 LLM 服务配置指南

## 🎯 推荐服务（免费额度对比）

| 服务                    | 免费额度         | 优势                   | 获取地址                                                         |
| ----------------------- | ---------------- | ---------------------- | ---------------------------------------------------------------- |
| **通义千问** ⭐⭐⭐⭐⭐ | 100 万 tokens/月 | 国内访问稳定，中文优秀 | [bailian.console.aliyun.com](https://bailian.console.aliyun.com) |
| **OpenAI GPT** ⭐⭐⭐⭐ | $5 新用户额度    | 效果最好，生态完善     | [platform.openai.com](https://platform.openai.com)               |
| **智谱 ChatGLM** ⭐⭐⭐ | 18 元新用户额度  | 性价比高，长文本支持   | [open.bigmodel.cn](https://open.bigmodel.cn)                     |

## 🚀 快速配置步骤

### 方案一：通义千问（推荐）

**1. 注册账号**

- 访问：https://bailian.console.aliyun.com
- 使用阿里云账号登录
- 开通百炼大模型服务

**2. 获取 API Key**

- 进入控制台 → API-KEY 管理
- 创建新的 API Key
- 复制 API Key

**3. 配置项目**

```typescript
// 编辑 src/config/llm-config.ts
export const LLM_CONFIGS = {
  qwen: {
    name: "通义千问",
    apiKey: "sk-your-api-key-here", // 粘贴您的API Key
    apiUrl:
      "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation",
    model: "qwen-turbo",
    enabled: true, // 设置为true启用
  },
};
```

### 方案二：OpenAI GPT

**1. 注册账号**

- 访问：https://platform.openai.com
- 注册并验证手机号
- 获得$5 免费额度

**2. 获取 API Key**

- 进入 API Keys 页面
- 创建新的 Secret Key
- 复制 API Key

**3. 配置项目**

```typescript
// 编辑 src/config/llm-config.ts
export const LLM_CONFIGS = {
  openai: {
    name: "OpenAI GPT",
    apiKey: "sk-your-api-key-here", // 粘贴您的API Key
    apiUrl: "https://api.openai.com/v1/chat/completions",
    model: "gpt-3.5-turbo",
    enabled: true, // 设置为true启用
  },
};
```

### 方案三：智谱 ChatGLM

**1. 注册账号**

- 访问：https://open.bigmodel.cn
- 注册账号并实名认证
- 获得免费额度

**2. 获取 API Key**

- 进入 API 管理页面
- 创建新的 API Key
- 复制 API Key

**3. 配置项目**

```typescript
// 编辑 src/config/llm-config.ts
export const LLM_CONFIGS = {
  zhipu: {
    name: "智谱ChatGLM",
    apiKey: "your-api-key-here", // 粘贴您的API Key
    apiUrl: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
    model: "glm-4",
    enabled: true, // 设置为true启用
  },
};
```

## ✅ 测试配置

配置完成后：

1. **重启开发服务器**

```bash
npm run serve
```

2. **测试语音对话**

- 打开浏览器访问 http://localhost:8080
- 点击"进入体验"
- 点击麦克风按钮开始语音对话

3. **查看控制台**

- 如果配置正确，会看到 API 调用成功的日志
- 如果有错误，会显示具体的错误信息

## 🔧 高级配置

### 自定义系统提示词

```typescript
// 在 src/config/llm-config.ts 中修改
export const SYSTEM_PROMPTS = {
  default: "你是一个专业的客服助手...",
  roleplay: "你是一个角色扮演助手...",
  casual: "你是用户的朋友...",
};
```

### 调整模型参数

```typescript
// 在 src/services/llm-service.ts 中修改
parameters: {
  temperature: 0.7,  // 创造性 (0-1)
  top_p: 0.8,       // 多样性 (0-1)
  max_tokens: 150   // 最大回答长度
}
```

## ❓ 常见问题

**Q: API 调用失败怎么办？**
A: 检查 API Key 是否正确，网络是否正常，余额是否充足

**Q: 回答太长或太短？**
A: 修改 system prompt 中的字数限制，或调整 max_tokens 参数

**Q: 想切换不同的 LLM 服务？**
A: 在配置文件中设置对应服务的 enabled 为 true，其他为 false

**Q: 如何查看 API 使用量？**
A: 登录对应服务的控制台查看用量统计

## 💰 费用估算

- **通义千问**: qwen-turbo 约 ¥0.0008/1K tokens
- **OpenAI**: gpt-3.5-turbo 约 $0.002/1K tokens
- **智谱**: glm-4 约 ¥0.1/1K tokens

**估算**: 普通对话每轮约 100-200 tokens，免费额度可支持数千轮对话。
