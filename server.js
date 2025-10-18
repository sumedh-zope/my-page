const express = require('express');
const redis = require('redis');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (CSS, images, etc.) - but NOT HTML
app.use(express.static(__dirname, {
    index: false // Don't serve index.html automatically
}));

// Redis client setup
const redisConfig = {
    socket: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379
    }
};

// Add password if provided
if (process.env.REDIS_PASSWORD) {
    redisConfig.password = process.env.REDIS_PASSWORD;
}

const redisClient = redis.createClient(redisConfig);

// Connect to Redis
redisClient.connect().catch(console.error);

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis successfully');
});

// Health check endpoint (internal only - not exposed publicly)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main route - serve HTML with embedded visitor count (no API calls needed)
app.get('/', async (req, res) => {
    try {
        // Increment the visitor count
        const count = await redisClient.incr('page_visitors');
        
        // Read the HTML template
        const htmlTemplate = await fs.readFile(path.join(__dirname, 'index.html'), 'utf-8');
        
        // Replace placeholder with actual count
        const html = htmlTemplate.replace('{{VISITOR_COUNT}}', count.toLocaleString());
        
        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (error) {
        console.error('Error serving page:', error);
        res.status(500).send('Error loading page');
    }
});

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});

