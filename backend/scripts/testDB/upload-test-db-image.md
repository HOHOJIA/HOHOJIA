# Test DB

## Using test DB from docker

```
docker run -d --pull always -p 3307:3306 nccusoftware/testing-db
```

## Upload test DB image to docker hub

1. Run `export-from-AWS-db.sh` to generate current `schema.sql`
```sh
cd backend/scripts/testDB/
sh export-from-AWS-db.sh
```

2. Login docker
```sh
docker login --username nccusoftware 
```

3. **Modify the password in command**. Then build image and push
```sh
docker buildx build --build-arg MYSQL_ROOT_PASSWORD=[PASSWORD_HERE] \
 --platform linux/amd64,linux/arm64 --push  -t nccusoftware/testing-db:latest -f Dockerfile .
```
