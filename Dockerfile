FROM node:11

WORKDIR /app

# COPY package.json /app

# COPY build/. /app
COPY src /app

# ENV PORT 9000
# ENV URL https://dev-852100-admin.okta.com
# ENV API_TOKEN 00qvr3UjiKWzTKyHUBpSiFN3kYmnExBSN6gei1FO8M

# RUN npm install
# 
# 