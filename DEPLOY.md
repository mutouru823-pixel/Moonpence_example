# 🚀 Railway 部署详细指南

## 📋 前提条件

- ✅ GitHub 账户（已fork Moonpence仓库）
- ✅ DeepSeek API密钥（从 https://platform.deepseek.com/ 获取）
- ✅ Railway 账户

---

## 🎯 第一步：部署后端到Railway

### 步骤1：创建Railway账户

1. 访问 https://railway.app
2. 点击 "Sign Up" 使用 GitHub 账户登录
3. 完成验证（可能需要邮箱验证）

### 步骤2：创建新项目并部署

1. 在Railway控制面板，点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 搜索并选择你的 `Moonpence` 仓库
4. 点击 **"Deploy now"**

### 步骤3：配置环境变量

1. 在Railway项目页面，点击你的服务
2. 点击 **"Variables"** 标签页
3. 点击 **"New Variable"** 添加以下变量：

```
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxx
```

**重要：** 将 `sk-xxxxxxxxxxxx` 替换为你真实的 DeepSeek API 密钥！

### 步骤4：配置构建命令（如果需要）

1. 点击 **"Settings"** 标签页
2. 找到 **"Build Command"** 并设置为：
   ```
   npm install && npm run build
   ```
3. 找到 **"Start Command"** 并设置为：
   ```
   npm run server
   ```

### 步骤5：等待部署完成

- Railway会自动开始部署
- 等待几分钟，直到看到绿色的 **"Successful"** 标志
- 部署过程中可以点击 **"Logs"** 查看实时日志

### 步骤6：获取你的API地址

1. 部署成功后，在 **"Deployments"** 或 **"Settings"** 页面
2. 找到 **"Domains"** 或 **"Public Networking"** 部分
3. 复制你的服务URL，格式类似：
   ```
   https://moonpencedemo-production.up.railway.app
   ```

✅ **后端部署完成！** 这个URL就是你的API服务器地址！

---

## 🌐 第二步：部署前端到Netlify

### 步骤1：在Netlify创建新站点

1. 访问 https://app.netlify.com
2. 点击 **"Add new site"** → **"Import an existing project"**
3. 选择你的 GitHub 仓库
4. Netlify会自动检测到 `netlify.toml` 配置文件

### 步骤2：配置环境变量

1. 点击 **"Site settings"** → **"Environment variables"**
2. 点击 **"Add a variable"**
3. 添加以下变量：
   ```
   VITE_API_URL=https://moonpencedemo-production.up.railway.app
   ```
   **注意：** 将URL替换为你刚才从Railway获取的实际地址！

### 步骤3：部署

1. 点击 **"Deploy site"**
2. 等待1-2分钟，部署就完成了！
3. 你会得到一个类似 `https://moonpence-demo.netlify.app` 的地址

✅ **前端部署完成！**

---

## 🧪 测试部署

### 1. 测试后端API

访问你的Railway地址，例如：
```
https://moonpencedemo-production.up.railway.app/api/health
```

应该看到响应：
```json
{
  "status": "ok",
  "message": "Moonpence server is running"
}
```

### 2. 测试前端

访问你的Netlify地址，应该能看到：
- 初始设置页面
- 作家选择器
- 完整的应用界面

尝试润色一段文本，看看是否正常工作！

---

## ⚙️ 自定义域名（可选）

### Railway 自定义域名

1. 在Railway的 **"Settings"** → **"Domains"**
2. 点击 **"Custom Domain"**
3. 输入你的域名，例如 `api.yourdomain.com`
4. 按提示配置DNS记录

### Netlify 自定义域名

1. 在Netlify的 **"Site settings"** → **"Domain management"**
2. 点击 **"Add custom domain"**
3. 输入你的域名，例如 `www.yourdomain.com`
4. 按提示配置DNS记录

---

## 💰 成本说明

### Railway 免费额度
- 每月 **500 小时** 的免费运行时间
- 如果你不一直开着，完全够个人使用
- 超过免费额度后才会收费

### Netlify 免费额度
- 每月 **100GB** 带宽
- **300分钟** 构建时间
- 完全够个人项目使用！

---

## 🔧 常见问题

### Q1: 部署失败怎么办？
**A:** 检查以下几点：
1. `package.json` 存在
2. `server.js` 文件存在
3. 环境变量 `DEEPSEEK_API_KEY` 已正确配置
4. 查看 Railway 日志，找错误信息

### Q2: API请求失败，显示CORS错误
**A:** 我们已经添加了CORS支持！确保重新部署了最新的代码。

### Q3: 如何更新应用？
**A:** 很简单！
1. 将代码推送到 GitHub
2. Railway 会自动检测并重新部署
3. Netlify 也会自动检测并重新部署

### Q4: 我可以关闭服务省钱吗？
**A:** 可以！
- 在Railway可以手动暂停服务
- 也可以配置自动休眠（Railway免费计划会自动休眠）

---

## 📚 更多资源

- **Railway文档：** https://docs.railway.app
- **Netlify文档：** https://docs.netlify.com
- **DeepSeek API：** https://platform.deepseek.com

---

## 🎉 完成了！

现在你拥有一个完整的全栈应用了！
- 🚀 后端：Railway
- 🎨 前端：Netlify
- 🤖 AI：DeepSeek API

尽情享受你的AI文本润色工具吧！
