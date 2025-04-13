import { createClient } from 'redis';
import { envs } from "../../common/config/envs.config"
import { logger } from '../../common/logging/logger';

const redisClient = createClient({
    url: envs.REDIS_URL, 
});

(async () => {
    try {
        await redisClient.connect();
        logger.log("Redis Connected", "redisClient")
    } catch (error) {
        logger.error("Error Connected to Redis", "redisClient")
        console.error("Error connecting to Redis:", error);
    }

})();

export { redisClient };
