docker stop wegotthis/backend
docker stop wegotthis/frontend
docker rm wegotthis/backend
docker rm wegotthis/frontend
docker image rm wegotthis/backend
docker image rm wegotthis/frontend
docker network rm wegotthis-network
docker stop redis/redis-stack
docker rm redis/redis-stack
docker stop localstack/localstack
docker rm localstack/localstack