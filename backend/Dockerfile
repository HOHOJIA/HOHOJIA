# FROM node:20.4-alpine
FROM node:20.4

WORKDIR /app

COPY . .

RUN npm install --production

EXPOSE 3000

# CMD ["npm", "run", "start"]
CMD node ./bin/www