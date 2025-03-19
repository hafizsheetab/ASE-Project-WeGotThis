#!/bin/bash
docker buildx build -t wegotthis/backend --load ./backend/
docker buildx build -t wegotthis/frontend --load ./frontend/
