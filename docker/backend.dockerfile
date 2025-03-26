FROM node:buster-slim

ARG SEARXNG_API_URL
ENV SEARXNG_API_URL=${SEARXNG_API_URL}

WORKDIR /home/futuresearch/backend

COPY backend/ ./  

# 替换配置
RUN sed -i "s|SEARXNG = \".*\"|SEARXNG = \"${SEARXNG_API_URL}\"|g" ./config.toml

# 如果使用 pnpm:
# ✅ 安装 pnpm
RUN npm install -g pnpm

# ✅ 使用 pnpm 安装
RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "start"]
