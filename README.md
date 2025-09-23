# 七牛 AI 角色扮演

这是一个基于 Vue 3 + TypeScript 的项目，实现了 PC 端和 H5 端分离的响应式设计。

## 项目特点

- 基于 Vue 3 + TypeScript + Vite 构建
- PC 端和 H5 端分离，根据设备自动选择合适的页面
- 使用 Pinia 进行状态管理
- 使用 Vue Router 进行路由管理
- 使用 Less 作为 CSS 预处理器

## 项目结构

```
src/
├── assets/            # 静态资源
├── components/        # 组件
│   ├── pc/            # PC端组件
│   └── mobile/        # 移动端组件
├── router/            # 路由配置
│   ├── pc/            # PC端路由
│   └── mobile/        # 移动端路由
├── stores/            # Pinia状态存储
├── utils/             # 工具函数
│   └── device.ts      # 设备检测工具
├── views/             # 页面视图
│   ├── pc/            # PC端页面
│   └── mobile/        # 移动端页面
├── App.vue            # 应用入口组件
└── main.ts            # 应用入口文件
```

## 设备检测逻辑

项目通过`src/utils/device.ts`中的工具函数检测当前设备类型（PC 或移动端），并根据设备类型自动选择对应的路由和组件。

设备检测的判断依据：

- 用户代理（User Agent）检测
- 屏幕宽度（<=768px 视为移动端）
- 触摸事件支持检测

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
