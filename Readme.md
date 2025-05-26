# WeGotThis
This platform lets people post “help wanted” offers (e.g. dog-walking, childcare, errands) with location, details and time slots. Volunteers browse these tasks, propose their own fee, agree on terms, then complete the job—giving busy users flexible assistance while helping others earn money.

## Overview
All detailed design, architecture, and API information is maintained in this repo’s [wiki](https://github.com/hafizsheetab/ASE-Project-WeGotThis/wiki).  

## Quick Start 
### Run the demo locally
```bash
git clone https://github.com/hafizsheetab/ASE-Project-WeGotThis.git
```
```bash
cd ASE-Project-WeGotThis
```
```bash
docker compose -f docker-compose.review.yml up -d
```
### Development
1. `bash build.sh`
2. `docker compose up` 
### Profiles (Development)
1. backend: only the backend will run  `docker compose --profile backend up` helps with development of frontend
2. infra: prepare the infrastructure required for backend development `docker compose --profile infra up` helps with development of backend

## Urls
* Backend Url: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)
* Frontend Url: [http://localhost:5173](http://localhost:5173)
* MailDev Url: [http://localhost:1080](http://localhost:1080)
* Github Repo Url: [https://github.com/hafizsheetab/ASE-Project-WeGotThis](https://github.com/hafizsheetab/ASE-Project-WeGotThis)

### Docker Hub images
Ready-made containers from a public Docker Hub namespace:

| Service   | Image name                                                       |
|-----------|------------------------------------------------------------------|
| Frontend | `docker.io/eldaneil/wegotthis-frontend`                   |
| Backend  | `docker.io/eldaneil/wegotthis-backend:latest`                    |

Example:

```bash
# run the API locally
docker run --rm -p 8000:8000 eldaniel/wegotthis-backend:latest
