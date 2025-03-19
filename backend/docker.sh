#!/bin/bash
node server.js &
PID=$!
sleep 10
kill $PID
node server.js