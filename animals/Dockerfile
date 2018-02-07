FROM node:8.9.4

MAINTAINER Kunal Mangaraj <mangaraj.kunal@gmail.com>

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json ./

COPY src ./src

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]