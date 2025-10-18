# Use Node.js Alpine for a lightweight image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install --production

# Copy application files
COPY server.js ./
COPY index.html ./
COPY style.css ./
COPY sumedh.jpg ./

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
