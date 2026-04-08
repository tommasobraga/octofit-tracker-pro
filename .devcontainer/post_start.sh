#!/bin/bash
# Run on every container start: set port visibility and start both servers.

set -euo pipefail

: "${CODESPACE_NAME:?CODESPACE_NAME not set. This script must run inside a GitHub Codespace.}"

echo "Setting port visibility..."
gh cs ports visibility 8090:public -c "$CODESPACE_NAME"
gh cs ports visibility 3000:public -c "$CODESPACE_NAME"

echo "Starting Django backend on :8090..."
cd /workspaces/octofit-tracker/backend
nohup python manage.py runserver 8090 > /tmp/django.log 2>&1 &

echo "Starting React frontend on :3000..."
cd /workspaces/octofit-tracker/frontend
nohup npm start > /tmp/react.log 2>&1 &

echo "post_start.sh completed. Logs: /tmp/django.log, /tmp/react.log"
