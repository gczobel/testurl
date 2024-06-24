FROM node:16-alpine

WORKDIR /

#COPY package*.json ./
#RUN npm install

COPY get_page.js get_page.js

CMD [ "node", "get_page.js" ]