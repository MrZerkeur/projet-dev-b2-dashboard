FROM node:21.7-alpine3.18
RUN npm i -g @nestjs/cli
# RUN chown -R root:root /dist