#!/bin/bash -eux
mongod --bind_ip_all &

mongoimport --uri="mongodb://localhost:27017/tabooDB" --collection words --file /docker-entrypoint-initdb.d/taboo.json --jsonArray

rm -f /docker-entrypoint-initdb.d/taboo.json

wait