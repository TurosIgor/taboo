FROM mongo:8.0.1-noble

COPY * /docker-entrypoint-initdb.d/

RUN chmod +x /docker-entrypoint-initdb.d/init.sh

RUN chmod +rwx /docker-entrypoint-initdb.d/taboo.json

CMD [ "./docker-entrypoint-initdb.d/init.sh" ]