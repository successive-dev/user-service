FROM node:current-alpine

WORKDIR /app

COPY package.json /app
COPY build/. /app

ENV PORT 9000
ENV URL https://dev-852100-admin.okta.com
ENV API_TOKEN 00qvr3UjiKWzTKyHUBpSiFN3kYmnExBSN6gei1FO8M

RUN apk add python2
RUN npm install

CMD [ "npm run deploy" ]