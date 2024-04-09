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
```

## Running the app

```bash
# development + watch mode
$ npm run start:dev

# development + watch mode for tailwind changes
$ npx tailwindcss -i ./assets/tailwind.css -o ./public/css/main.css --watch
```
