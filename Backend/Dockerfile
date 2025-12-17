# Backend/Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application source
COPY . .

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "Server.js"]