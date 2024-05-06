FROM mysql:8.0

ARG MYSQL_ROOT_PASSWORD

ENV MYSQL_DATABASE=hohoja
ENV MYSQL_ROOT_PASSWORD $MYSQL_ROOT_PASSWORD
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD $MYSQL_ROOT_PASSWORD

ADD schema.sql /docker-entrypoint-initdb.d

EXPOSE 3306

LABEL org.opencontainers.image.source https://github.com/hohojia/hohojia