FROM node:18.18.2-alpine

WORKDIR /app

COPY /websites/site-1/package*.json ./

RUN npm install

COPY /websites/site-1/ .

EXPOSE 8001

CMD ["npm", "run", "dev"]