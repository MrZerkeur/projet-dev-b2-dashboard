FROM debian:12-slim

WORKDIR /app

RUN apt-get update && apt-get install nodejs npm -y

COPY /websites/site-1/package*.json ./

RUN npm install

COPY /websites/site-1/ .

RUN npm run build

EXPOSE 8001

RUN apt-get install python3 -y
RUN apt-get install python3-pip -y
RUN apt-get install python3-requests -y

COPY /tcp-server/tcp-server-12345.py ./

EXPOSE 12345