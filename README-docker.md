WELCOME TO THIS ADMIN DASHBOARD PROJECT !


# DEV - LINUX VERSION

Build the image :
```
docker build -t nest-dev-backend-linux -f backend-dev-linux.Dockerfile .
```

Run the container :
```
docker compose -f docker-compose-dev-linux.yml up -d
```

# API

```
docker build -t python-api -f api.Dockerfile .
```