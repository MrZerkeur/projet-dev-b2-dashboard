# Projet Dev B2 - Tableau de bord administrateur centralisé

## Installation

```bash
$ npm install
$ npm install express-session
```

Create a .env file
```bash
SESSION_SECRET=<secret-key>
SESSION_MAX_AGE=10800000
SESSION_RESAVE=false
SESSION_SAVE_UNINITIALIZED=false
DATABASE_HOST=<database_host>
DATABASE_PORT=<database_port>
DATABASE_USERNAME=<database_username>
DATABASE_PASSWORD=<database_password>
DATABASE_NAME=<database_name>
```

## Running the app

```bash
# start back-end (Admin dashboard, API and database) with docker compose
$ docker compose -f .\docker-compose-dev-linux.yml up -d --build
```

```bash
# start a website (both website and tcp server in a signle container) with docker compose
$ docker compose -f .\docker-compose-site1.yml up -d --build
```

```bash
# stop docker containers
$ docker compose -f .\docker-compose-dev-linux.yml down
```

## Admin credentials

```
email: admin@admin
password: 8ook5E@qgmA>~Q1wP7s_
```