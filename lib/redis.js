import Redis from "ioredis";

// Use Redis connection string or local Redis instance
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

export default redis;
