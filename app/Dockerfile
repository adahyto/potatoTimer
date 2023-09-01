FROM node:alpine3.14 AS build

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm cache clean --force
RUN npm i

COPY . .

EXPOSE 3008

CMD ["node", "server.js"]