#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Fitness App Deployment...${NC}"

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Creating .env from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo -e "${YELLOW}⚠️  Please update the .env file with your configuration${NC}"
        exit 1
    else
        echo -e "${RED}❌ .env.example not found either!${NC}"
        exit 1
    fi
fi

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest code...${NC}"
git pull

# Build and deploy
echo -e "${YELLOW}🔨 Building containers...${NC}"
docker-compose build

echo -e "${YELLOW}⬆️  Starting services...${NC}"
docker-compose up -d

echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 10

# Check if services are running
echo -e "${YELLOW}🔍 Checking service status...${NC}"
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✅ All services are running!${NC}"
    
    # Show container status
    echo -e "\n${YELLOW}📊 Container Status:${NC}"
    docker-compose ps
    
    # Show URLs
    echo -e "\n${YELLOW}🌐 Application URLs:${NC}"
    echo "Frontend: http://localhost:3000"
    echo "Backend API: http://localhost:5000"
    echo "MongoDB: localhost:27017"
    
    # Show logs
    echo -e "\n${YELLOW}📋 Recent logs:${NC}"
    docker-compose logs --tail=10
    
else
    echo -e "${RED}❌ Some services failed to start!${NC}"
    docker-compose logs
    exit 1
fi

echo -e "\n${GREEN}🎉 Deployment completed successfully!${NC}"