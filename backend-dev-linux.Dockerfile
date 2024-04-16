FROM node:21.7-alpine3.18
RUN npm i -g @nestjs/cli

COPY project /project

WORKDIR /project

RUN npm install

# RUN chown -R root:root /dist