# Docker run project

# -----The best command-------

```
docker compose up -d
docker-compose up --build -d
docker compose down
```

# --- Client------

```
docker build -t booking_client .
docker tag booking_client:latest tanmos/booking_client:latest
docker push tanmos/booking_client:latest
```

# --- Server------

```
docker compose up -d
docker compose stop
docker-compose pull
```

# --- Other------

```
docker logs -f --until=2s containerName
certbot
systemctl restart nginx
```
