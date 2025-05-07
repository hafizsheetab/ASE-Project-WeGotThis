#!/bin/bash
node server.js --docker &
PID=$!
sleep 10
kill $PID
node server.js --docker