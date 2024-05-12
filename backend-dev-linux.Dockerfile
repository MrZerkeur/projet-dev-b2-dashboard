# Stage 1: Build environment
FROM node:18.18.2 AS build

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY project/package*.json ./
RUN npm install

COPY project .

RUN npm rebuild bcrypt --build-from-source

# Stage 2: Production environment
FROM node:18.18.2-alpine
WORKDIR /app

COPY --from=build /app .

CMD ["npm", "run", "start:dev"]