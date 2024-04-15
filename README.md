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
# start API and DB with docker compose
$ docker compose -f .\docker-compose-dev-linux.yml up -d

# development + watch mode
$ npm run start:dev

# development + watch mode for tailwind changes
$ npx tailwindcss -i ./assets/tailwind.css -o ./public/css/main.css --watch
```

```bash
# stop docker containers
$ docker compose -f .\docker-compose-dev-linux.yml down
```

## Admin credentials

```
email: admin@admin
password: admin
```