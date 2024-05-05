# HOHOJIA

## How to run

Run with Docker:
```bash
sudo docker-compose up -d --build
```

Run without Docker:
```bash
npm start
```

RDS connection
```bash 
mysql -u admin -p -h database-1.chgewsci2ke5.ap-southeast-2.rds.amazonaws.com
```

## How to deploy
- 用 [github action 的 bump-vesion 來升版本，就會觸發 deployment](docs/release_flow.md)