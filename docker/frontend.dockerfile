FROM node:buster-slim

ARG NEXT_PUBLIC_WS_URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/futuresearch

COPY frontend/ ./

# ✅ 安装 pnpm
RUN npm install -g pnpm

# ✅ 使用 pnpm 安装
RUN pnpm install
RUN pnpm run build

CMD ["pnpm", "start"]