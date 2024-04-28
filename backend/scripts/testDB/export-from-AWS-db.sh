echo "Dumping schema from AWS RDS..."
mysqldump -h  database-1.chgewsci2ke5.ap-southeast-2.rds.amazonaws.com -u admin -p --no-data hohoja > schema.sql
