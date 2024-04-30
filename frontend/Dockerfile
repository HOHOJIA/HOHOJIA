FROM node:20.4-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm run no-lint-build

CMD npm run start