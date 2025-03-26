# 🔍 AI Search - 开源 AI 搜索引擎方案

**AI Search（AI搜索）** 是一个开源的多模态 AI 搜索项目，结合 **大语言模型（LLM）+ 多源搜索引擎 + 多 Agent 架构**，打造新一代的智能问答式搜索体验。让你从 Web、学术、视频、帖子讨论、图片等多渠道获取信息，并由 AI 自动融合、总结与重写，真正实现“提问即答案”的未来搜索模式。

✨ **为 AI 架构爱好者、开发者、科研人员提供一套可部署、可扩展、可进化的 AI 搜索系统解决方案！**

---

## 🌐 项目演示

![demo](./public/ai-search-demo.gif)

---

## 🌍 联系我

如果你对 AI Search 感兴趣，随时联系我！💬

📧 **Email**：[gejialun88@gmail.com](mailto:gejialun88@gmail.com)  
🐦 **Twitter**：[gejialun88](https://x.com/gejialun88)  
🌐 **个人网站**：[我的网站](https://gegarron.com)  
💬 **微信**：gegarron


## 🚀 核心功能

### 🧠 **AI 搜索增强系统**

- **搜索请求自动改写**：GPT 对用户原始问题重构，提升搜索精度。
- **智能多源搜索**：支持 Web、学术、帖子，讨论、视频、图像等多模态信息源。
- **AI 内容融合 & 总结**：通过 GPT + cosine 相似度 rerank 得出最佳答案。
- **引用来源追踪**：提供答案出处，保障内容可溯源，提升可信度。

### 🧑‍💼 **多 Agent 搜索协作**

- **模块化搜索 Agent**：每类搜索封装为独立 Agent，支持自定义接入新源。
- **并行搜索调度**：后端支持多 Agent 并发协作，高效响应复杂请求。
- **统一响应合成**：最终响应由 LLM 统一总结，保持语义连贯和风格一致。

### 💬 **流式实时 UI 体验**

- **WebSocket 流式响应**：消息边生成边展示，提问体验媲美 ChatGPT。
- **引用、复制、重写**：便于二次处理信息，适配多种内容消费方式。
- **图像 / 视频嵌入**：原生支持视频/图像搜索结果可视化显示。

### 🛠️ **高级用户功能（可扩展）**

- **搜索设置 & 参数面板**：自定义 Agent 启用状态、语言、请求方式等。
- **搜索历史记录管理**：保存和回顾曾经的提问/响应，增强记忆能力。
- **用户体系 & 数据记忆（规划中）**：可集成 Supabase 实现个性化 AI 搜索。

---

## 🧱 技术架构

### 前端技术栈（Next.js + React）

- **Next.js 15 + App Router**
- **React 19 + Suspense**
- **Tailwind CSS + Shadcn/UI + Lucide Icons**
- **Zustand 状态管理**
- **markdown 渲染 AI 答案**
- **Turbopack 加速开发体验**

### 后端技术栈（Node + LangChain）

- **Node.js 构建服务**
- **WebSocket + REST API 并存**
- **LangChain Agents 架构**
- **SearXNG 作为本地 Web 搜索引擎**
- **向量相似度 rerank + GPT 汇总输出**
- **可扩展 Agent 插件系统（规划中）**

---

## 🧪 快速开始

### 环境要求

- ✅ Node.js >= 18.x
- ✅ Docker（用于运行 SearXNG 容器）
- ✅ OpenAI API Key

### 一键部署（推荐）

```bash
git clone https://github.com/geallenboy/ai-search.git
cd ai-search

# 构建并运行 SearXNG（Web 搜索引擎）
cd docker
docker compose up -d

# 启动前端
cd ../frontend
pnpm install
pnpm run dev

# 启动后端
cd ../backend
pnpm install
pnpm run dev

```



## 目录结构
```
- backend(后端)
- docker(存放docker配置文件)
- frontend(前端)
```