FROM node:22-alpine

RUN npm install -g ts-node pm2

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

ENV NODE_ENV=production

EXPOSE 8000

CMD ["npm", "start"]