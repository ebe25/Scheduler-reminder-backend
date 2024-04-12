#!/bin/bash

# Download Docker Desktop installer
echo "Downloading Docker Desktop installer..."
curl -Lo docker-desktop-installer.exe https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe

# Install Docker Desktop
echo "Installing Docker Desktop..."
start /wait docker-desktop-installer.exe install --quiet

# Remove the installer file
echo "Cleaning up..."
rm docker-desktop-installer.exe

# Add the current user to the docker-users group
echo "Adding current user to the docker-users group..."
net localgroup docker-users "$ENV:UserName" /add

echo "Docker Desktop installation complete!"