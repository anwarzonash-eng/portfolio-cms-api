FROM node:alpine

COPY . /app
WORKDIR /app

RUn npm install

CMD npm run dev


