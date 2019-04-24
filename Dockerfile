FROM node:11

WORKDIR /app

COPY package.json /app

COPY build/. /app

ENV PORT 9000
# ENV NODE_ENV dev
# ENV MONGO_URL mongodb://localhost:27017/user-service
# ENV SECRET secret_key@1234

RUN npm install