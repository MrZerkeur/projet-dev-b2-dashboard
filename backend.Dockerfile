FROM node:21.7
RUN apt update -y
RUN npm i -g @nestjs/cli