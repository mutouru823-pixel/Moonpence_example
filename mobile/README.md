# 移动端配置（迁移自 Moonpence Python 原型）

本目录下的文件原属于 `mutouru823-pixel/Moonpence`（早期 Streamlit/Python 原型「文风溯源」）的
Capacitor / APK / PWA 移动端打包配置。于 2026-08-07 合并 Moonpence 与 Moonpence_example 两个
重复仓库时，迁移至此，作为 Moonpence TypeScript 全栈版（主仓库）的移动端能力参考资产。

## 文件说明
- `capacitor.config.json` — Capacitor 原生打包配置（Android）
- `package.json` — 移动端 Capacitor 依赖与脚本（`npx cap ...`）
- `manifest.json` — PWA Web App Manifest
- `APK_BUILD_GUIDE.md` — APK 打包三种方案（WebViewGold / Capacitor / Hermit）
- `EASY_APK_GUIDE.md` — 5 分钟在线打包 APK 简易指南
- `PWA_README.md` — PWA 手机端部署与「添加到主屏幕」指南

## 在 Moonpence_example（React/Vite）上启用移动端
原配置按 Streamlit 单页应用设定（`webDir: "."`）。若要在本全栈项目中启用 Capacitor：
1. 先 `npm run build` 生成 `dist/`
2. 将 `capacitor.config.json` 的 `webDir` 改为 `dist`，或把 `server.url` 指向已部署的前端地址
3. `npx cap add android` → `npx cap sync` → 用 Android Studio 构建

> 注：Python 原型仓库 `mutouru823-pixel/Moonpence` 已归档（archived），保留历史记录但只读。
