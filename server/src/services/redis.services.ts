import redisClient from "../config/redis";

export const getCache = async (key: string) => {
  const data = await redisClient.get(key);
  if (!data) return null;
  return JSON.parse(data);
};

export const setCache = async (key: string, value: unknown, ttl = 300) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttl,
  });
};

export const deleteCache = async (key: string) => {
  await redisClient.del(key);
};

export const flushData = async () => {
  await redisClient.flushAll();
};
