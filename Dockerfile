# 1. AŞAMA: Bağımlılıkları Yükle
FROM node:20-alpine AS deps
# Prisma için gerekli sistem kütüphanelerini yükle
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. AŞAMA: Uygulamayı Derle
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Veritabanı istemcisini oluştur
RUN npx prisma generate

# Uygulamayı build et
# Build sırasında veritabanı bağlantısı gerekmemesi için ortam değişkeni
ENV NEXT_App_BUILD_ID=1 
RUN npm run build

# 3. AŞAMA: Çalıştır
FROM node:20-alpine AS runner
# Çalıştırma aşamasında da OpenSSL gerekli
RUN apk add --no-cache openssl

WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]