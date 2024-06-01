FROM node:20.4-alpine

ARG NEXT_PUBLIC_API_DOMAIN

ENV NEXT_PUBLIC_API_DOMAIN=$NEXT_PUBLIC_API_DOMAIN

RUN echo $NEXT_PUBLIC_API_DOMAIN

WORKDIR /app

COPY . .

RUN npm install && npm run no-lint-build

CMD npm run start