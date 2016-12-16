FROM node:7.0.0

MAINTAINER pokemon-yellow

ENV appdir /usr/src/app/

RUN mkdir -p $appdir

WORKDIR $appdir

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "."]