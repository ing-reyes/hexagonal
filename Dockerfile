# Etapa de construcción
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Etapa de producción
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev --production

ENV NODE_ENV=production
EXPOSE 8000

CMD ["node", "dist/main.js"]