# qiniu-ai-roleplay
"无名小队" 为七牛云校招实战项目议题二开发的AI角色扮演网站。本项目旨在利用AI技术，为用户提供沉浸式的、可自定义角色的对话体验。
**（尊敬的评人人员您好，本项目main分支代码为最后一天所有功能实现完成后从dev-ui分支合并过来，期间的代码提交记录在dev-ui分支上，并非最后一天一次提交全部代码）**
# 七牛 AI 角色扮演
代码位于qiniu-ai-roleplay-vue目录下（最终版本，即演示视频实现）

这是一个基于 Vue 3 + TypeScript 的项目，实现了 PC 端和 H5 端分离的响应式设计，使用浏览器语音识别和语音合成API，接入阿里通义LLM，使用纯前端代码完成所有项目功能，目前仅在移动端实现h5页面功能。

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run serve
```

### 构建生产版本

```bash
npm run build
```

### 代码规范检查

```bash
npm run lint
```

## 如何添加新页面

1. 在`src/views/pc/`或`src/views/mobile/`中添加新的页面组件
2. 在`src/router/pc/index.ts`或`src/router/mobile/index.ts`中添加新的路由配置

## 状态管理

项目使用 Pinia 进行状态管理，状态存储文件位于`src/stores/`目录下：

- `device.ts`: 设备状态存储
- `user.ts`: 用户状态存储（示例）

可以根据需要添加更多的状态存储。

# 架构设计（当前最终实现版为**石诗凡**独立设计并完成）

## 核心技术栈
- 基于 Vue 3 + TypeScript + Vite 构建
- PC 端和 H5 端分离，根据设备自动选择合适的页面
- 使用 Pinia 进行状态管理
- 使用 Vue Router 进行路由管理
- 使用 Less 作为 CSS 预处理器
- 语音识别：Web Speech API (SpeechRecognition)
- LLM调用：通义千问 API
- 语音合成：Web Speech API (SpeechSynthesis)

## 项目结构
```
src/
├── components/          # 组件库
│   ├── mobile/         # 移动端组件
│   │   ├── EntranceMask.vue      # 入口遮罩组件
│   │   ├── VoiceChat.vue         # 语音对话主组件
│   │   └── CharacterSelector.vue # 角色选择器
│   └── pc/             # PC端组件
├── views/              # 页面视图
│   ├── mobile/         # 移动端页面
│   └── pc/             # PC端页面
├── config/             # 配置文件
│   ├── llm-config.ts   # LLM服务配置
│   └── character-config.ts # 角色配置
├── services/           # 服务层
│   └── llm-service.ts  # LLM API服务
├── stores/             # 状态管理
├── utils/              # 工具函数
└── router/             # 路由配置
```
## 核心模块设计
1. 角色管理模块：实现多角色配置与管理
   支持角色：雷军（小米创始人，科技企业家）；
            孙悟空（齐天大圣，古典神话角色）；
            爱因斯坦（物理学家，科学思想家）；
2. LLM集成模块 
3. 语音交互模块：实现语音识别、语音合成、对话管理
4. 视频管理模块：实现多角色静默/讲话字体视频背景平滑切换

## 核心工作流程
1. 应用启动流程：设备检测 → 路由选择 → 遮罩层显示 → 用户点击进入 → 主界面加载
2. 角色切换流程：用户选择角色 → 更新角色配置 → 切换视频背景 → 更新LLM提示词 → 界面主题更新
3. 语音对话流程：用户点击录音 → 语音识别开始 → 识别完成 → 调用LLM API → 获取AI回复 → 语音合成播放 → 视频状态切换
4. 视频切换流程：触发切换事件 → 预加载目标视频 → 等待加载完成 → 切换视频索引 → CSS动画平滑过渡切换

## 项目分工
- 石诗凡：完成本次议题项目最终实现版的产品需求设计、项目技术架构设计和所有代码编写、功能测试优化工作；
- 张家俊：完成初始设计架构思路-前后端分离版(最终实现未采用)
  
以下为张家俊设计的初始架构思路：
qiniu-ai-roleplay/ 
#### 你的项目根目录
│

├── 📂 client/  # 【前端负责】所有前端代码都在这里 (React/Vue)

│   ├── public/

│   └── src/

│       ├── components/   # 可复用的UI组件 (如按钮, 头像)

│       ├── pages/        # 页面 (如角色选择页, 聊天页)

│       ├── services/     # 专门处理与后端通信的文件

│       │   ├── api.js          # 封装所有HTTP REST API请求

│       │   └── websocket.js    # 封装WebSocket连接与消息处理

│       └── App.js        # 主应用组件

│

├── 📂 server/  # 【你负责】所有后端代码都在这里 (Python/FastAPI)

│   ├── api/            # 存放所有REST API路由

│   │   └── characters.py # 角色相关的API (如获取角色列表)

│   ├── core/           # 核心业务逻辑

│   │   ├── asr.py        # 封装RealtimeSTT的语音识别逻辑

│   │   ├── llm.py        # 封装LLM的调用和Prompt工程

│   │   └── tts.py        # 封装TTS的调用逻辑

│   ├── websocket/      # 存放WebSocket相关逻辑

│   │   ├── connection_manager.py # 管理所有活跃的WebSocket连接

│   │   └── handler.py      # 核心处理器，处理收到的音频流并返回结果

│   ├── main.py         # FastAPI应用的主入口文件

│   └── .env            # ❗ 存放API密钥等敏感信息 (绝不能上传到GitHub!)

│

├── .gitignore        # Git忽略配置 (必须包含 .env 和 node_modules/)

└── README.md         # 项目说明文档

1. 大致思路：核心工作流程 (The Core Workflow)
   这是我们应用从用户说话到AI回复的完整生命周期，共10步：
   【前端】连接建立：用户在前端页面选择一个角色（如哈利·波特）后，前端立即与后端建立一个 WebSocket 连接。这个连接将贯穿整个对话过程。
   【前端】开始说话：用户按住“说话”按钮，浏览器开始捕获麦克风的音频。
   【前端 -> 后端】音频流传输：前端不是等用户说完再上传，而是将捕获到的音频实时切成小数据块 (chunks)，通过 WebSocket 流式传输给后端。
   【后端】接收并处理音频：后端的 websocket/handler.py 接收到这些音频块，立即将它们喂给 core/asr.py 中初始化的 RealtimeSTT 实例。
   【后端】语音转文字：RealtimeSTT 内部的 VAD (语音活动检测) 监测到用户一句话说完后，faster-whisper 引擎完成最终识别，返回完整的文本结果（例如：“给我讲讲你第一次抓到金色飞贼的故事吧”）。
   【后端】调用大模型：core/llm.py 拿到识别出的文本，并结合当前角色的设定（例如“你是哈利·波特，请用第一人称...”）构造一个精巧的 Prompt，然后发送给七牛云的 LLM API。
   【后端】生成AI回复：LLM 返回符合角色设定的文本回复（例如：“哦，那次啊！我当时紧张得心都快跳出来了...”）。
   【后端】文字转语音：core/tts.py 拿到 LLM 返回的文本，调用 TTS 服务（无论是云服务API还是本地开源方案），将其转换成音频数据。
   【后端 -> 前端】返回音频结果：后端将生成的音频（可以是一个可播放的 URL，或直接是音频的二进制数据）通过同一个 WebSocket 连接推送回前端。
   【前端】播放声音：前端的 websocket.js 接收到音频数据后，立即通过浏览器的 <audio> 元素进行播放。用户就听到了 AI 角色的声音。
