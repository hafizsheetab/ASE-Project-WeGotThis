# Instruction
1. `bash build.sh`
2. `docker compose up` \
2 profiles for multiple purposes
1. backend: only the backend will run  `docker compose -p backend up` helps with development of frontend
2. infra: prepare the infrastructure required for backend development `docker compose -p infra up` helps with development of backend
