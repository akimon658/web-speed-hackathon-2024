FROM node:20.11.1-alpine

WORKDIR /usr/src/app

RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime

RUN --mount=type=cache,target=/var/cache/apk,sharing=locked \
    apk add jemalloc
ENV LD_PRELOAD=/usr/lib/libjemalloc.so.2

COPY . .
RUN corepack enable pnpm
RUN --mount=type=cache,target=/usr/src/app/node_modules,sharing=locked \
    pnpm install
RUN pnpm build

ENV PORT 8000
EXPOSE 8000

ENTRYPOINT ["pnpm"]
CMD ["start"]
