# 🌙 Moonpence

### 开启您的文学实验室

一个基于AI的文本润色与风格混合工具。

## 📋 项目概述

Moonpence 是一个全栈Web应用，让用户能够：
- 使用著名作家的风格润色文本
- 调整风格强度级别
- 分析文本特征
- 混合不同的写作风格
- 查看详细的风格分析报告
- 保存润色历史记录

## 🛠️ 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion（动画）
- Material Symbols（图标）

### 后端
- Node.js
- Express.js
- DeepSeek API（已集成）

## 🚀 快速开始

### 环境要求
- Node.js v18 或更高版本
- npm 或 yarn

### 安装步骤

1. 安装依赖：
```bash
npm install
```

2. 配置API密钥：
```bash
# 创建环境变量文件
cp .env.example .env

# 编辑 .env 文件，添加你的 DeepSeek API 密钥
# API密钥可以从 https://platform.deepseek.com/ 获取
```

3. 启动应用：

#### 方式一：同时启动前端和后端（推荐）
```bash
npm run dev:full
```

#### 方式二：分开启动
```bash
# 终端1 - 前端开发服务器
npm run dev

# 终端2 - 后端服务器
npm run server
```

#### 方式三：生产构建
```bash
# 构建前端
npm run build

# 启动后端服务器（同时提供API和前端）
npm run server
```

### 访问应用

- **前端（开发模式）:** http://localhost:3000
- **后端API:** http://localhost:3001
- **API健康检查:** http://localhost:3001/api/health

## 📦 部署指南

### Netlify 部署（仅前端）

Moonpence 的前端可以部署到 Netlify，但需要注意：

**⚠️ 重要提示：** Netlify 是一个静态网站托管平台，**无法运行 Express 后端服务器**。

如果你只想部署前端，请按以下步骤操作：

1. **Fork 本仓库到你的 GitHub 账户**

2. **在 Netlify 上创建新站点：**
   - 访问 https://app.netlify.com
   - 点击 "Add new site" → "Import an existing project"
   - 选择你的 GitHub 仓库
   - Netlify 会自动检测到 `netlify.toml` 配置文件

3. **添加环境变量：**
   - 在 Netlify 站点设置中，添加以下环境变量：
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```
   - 将 `https://your-backend-url.railway.app` 替换为你部署的后端地址

4. **部署完成！**

### 部署后端（Railway 推荐的免费方案）

后端需要部署到一个支持 Node.js 的平台，推荐使用 **Railway**（免费额度充足）：

1. **注册 Railway 账户：** https://railway.app

2. **创建新项目：**
   - 点击 "New Project" → "Deploy from GitHub repo"
   - 选择 Moonpence 仓库

3. **配置环境变量：**
   - 在 Railway 项目设置中添加：
   ```
   DEEPSEEK_API_KEY=sk-xxxxxxxxxxxx
   PORT=3001
   ```

4. **获取API地址：**
   - Railway 会为你分配一个URL，格式类似：
   - `https://moonpencedemo-production.up.railway.app`

5. **更新前端配置：**
   - 在 Netlify 环境变量中设置：
   ```
   VITE_API_URL=https://moonpencedemo-production.up.railway.app
   ```

### 一键部署按钮

（稍后添加一键部署按钮）

## 📡 API 接口

### `POST /api/polish`
使用指定风格和强度润色文本。

**请求示例：**
```json
{
  "text": "在这里输入你的文本",
  "author": "江南",
  "intensity": 70,
  "mode": "Plain"
}
```

**响应示例：**
```json
{
  "polishedText": "润色后的文本...",
  "styleProfile": {
    "rhythm": 88,
    "lexical": 75,
    "emotional": 92,
    "depth": 85
  },
  "analysis": [
    {"title": "句式韵律", "description": "..."},
    {"title": "词汇选择", "description": "..."},
    {"title": "氛围营造", "description": "..."}
  ],
  "tags": ["热血", "奇幻", "青春", "重度风格化"]
}
```

### `POST /api/mix-styles`
混合多种写作风格。

### `GET /api/authors`
获取所有可用作家列表。

### `GET /api/health`
健康检查接口。

## 📚 可用作家

目前支持 **16 位中外著名作家**：

### 中国作家
- **江南** - 热血奇幻，宏大叙事，少年意气
- **村上春树** - 孤独哲学，隐喻丰富，超现实元素
- **陀思妥耶夫斯基** - 深刻心理，存在主义探讨，灵魂拷问
- **三毛** - 浪漫漂泊，异域风情，生命感悟
- **余秋雨** - 文化散文，历史感怀，诗意表达
- **余华** - 深刻苦难，宿命感，黑色幽默
- **老舍** - 京味十足，幽默讽刺，世态炎凉
- **鲁迅** - 深刻批判，思想启蒙，冷峻犀利
- **金庸** - 武侠宗师，家国情怀，江湖侠义
- **王小波** - 黑色幽默，智性思考，自由精神

### 外国作家
- **海明威** - 简洁有力，冰山原则，硬汉精神
- **川端康成** - 物哀美学，细腻婉约，古典优雅
- **马尔克斯** - 魔幻现实主义，时间循环，家族史诗
- **博尔赫斯** - 哲学幻想，迷宫隐喻，宇宙玄思
- **卡尔维诺** - 轻盈智慧，童话寓言，后现代实验
- **塞林格** - 青春叛逆，纯真守护，疏离孤独

## 📁 项目结构

```
/workspace
├── src/
│   ├── components/
│   │   ├── SetupPage.tsx      # 初始设置页面
│   │   ├── EditorPage.tsx     # 文本编辑器
│   │   ├── ResultPage.tsx     # 结果展示
│   │   ├── LabPage.tsx        # 风格实验室
│   │   ├── HistoryPage.tsx    # 润色历史
│   │   ├── AuthorSelector.tsx # 作家选择器
│   │   └── BottomNav.tsx      # 底部导航
│   ├── context/
│   │   └── AppContext.tsx     # 全局状态管理
│   ├── services/
│   │   └── api.ts             # API客户端
│   ├── App.tsx                # 应用入口
│   ├── main.tsx               # React入口
│   └── index.css              # 全局样式
├── server.js                  # Express后端服务器
├── vite.config.ts            # Vite配置
├── netlify.toml              # Netlify部署配置
├── tsconfig.json             # TypeScript配置
├── package.json
└── .env.example              # 环境变量示例
```

## 🎨 功能特性

1. **设置页面** - 配置API密钥
2. **润色编辑器** - 
   - 文本输入（支持字符/词数统计）
   - 作家风格选择（16位中外作家）
   - 风格强度滑块（10%-100%）
   - 输出模式选择
3. **成果展示** - 
   - 润色文本显示
   - 多维度风格档案
   - 详细风格分析
   - 一键复制功能
4. **风格实验室** - 
   - 风格混合调配
   - 自定义风格保存
   - 风格雷达图分析
5. **润色历史** - 
   - 自动保存润色记录
   - 查看历史详情
   - 复用历史参数

## 🔧 配置说明

### 环境变量

在 `.env` 文件中配置：

```env
# DeepSeek API 密钥（必需）
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxx

# 服务器端口（可选，默认3001）
PORT=3001
```

### Vite 代理配置

开发模式下，前端会自动将 `/api` 请求代理到后端服务器。在生产环境中，前端会向 `VITE_API_URL` 环境变量指定的地址发送请求。

## 📝 注意事项

- **DeepSeek API 获取：** https://platform.deepseek.com/
- **免费额度：** DeepSeek 提供充足的免费调用额度
- **后端必需：** 本应用需要后端服务器才能正常运行AI润色功能
- **数据存储：** 历史记录保存在浏览器本地存储中

## 📄 License

MIT License - 欢迎贡献和改进！

---

**🌟 如果觉得有用，请给项目点个 Star！**
