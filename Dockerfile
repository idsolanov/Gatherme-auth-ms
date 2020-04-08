#base image based in node.js
FROM node:current-slim

WORKDIR /source/controllers/acount.js
COPY package.json .
RUN npm install

EXPOSE 3001
CMD [ "npm","index.js"]

COPY . .