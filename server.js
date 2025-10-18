const express = require('express');
const redis = require('redis');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

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

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Visitor counter endpoint - increment and return count
app.get('/api/visitors', async (req, res) => {
    try {
        // Increment the visitor count
        const count = await redisClient.incr('page_visitors');
        
        res.json({
            success: true,
            count: count,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update visitor count'
        });
    }
});

// Get current count without incrementing
app.get('/api/visitors/count', async (req, res) => {
    try {
        const count = await redisClient.get('page_visitors');
        
        res.json({
            success: true,
            count: parseInt(count) || 0,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error getting visitor count:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get visitor count'
        });
    }
});

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
});

