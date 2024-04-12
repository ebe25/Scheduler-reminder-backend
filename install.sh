#!/bin/bash

# Install Docker
if ! command -v docker &> /dev/null
then
    echo "Docker is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
fi

# Add the current user to the Docker group
sudo usermod -aG docker $USER

echo "Docker installation complete!"