#!/bin/bash
# Run once after container creation: install dependencies and copy welcome message.

set -euo pipefail

sudo apt-get update -q
sudo apt-get install -y python3-venv

# Backend dependencies
cd /workspaces/octofit-tracker/backend
pip install -r requirements.txt

# Frontend dependencies
cd /workspaces/octofit-tracker/frontend
npm install

# Welcome message
sudo mkdir -p /usr/local/etc/vscode-dev-containers
sudo cp --force /workspaces/octofit-tracker/.devcontainer/welcome-message.txt \
    /usr/local/etc/vscode-dev-containers/first-run-notice.txt
