import type { NextFunction, Request, Response } from "express";
import redisClient from "../config/redis";

const MAX_REQUESTS = 5;
const WINDOW_SECONDS = 15 * 60;
export async function loginRateLimit(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ip = req.ip || "unknows";
    const key = `login:rate-limit:${ip}`;

    // increment the request counter
    const attempts = await redisClient.incr(key);
    if (attempts === 1) {
      await redisClient.expire(key, WINDOW_SECONDS);
    }

    // reject requests exceeding the limit
    if (attempts > MAX_REQUESTS) {
      const ttl = await redisClient.ttl(key);
      res.setHeader("Retry-After", String(ttl > 0 ? ttl : WINDOW_SECONDS));
      return res.status(429).json({
        msg: "Too many login attempts. Please try again later.",
      });
    }

    return next();
  } catch (error) {
    console.error("Login rate limiter failed:", error);
    return res.status(503).json({
      msg: "Login service temporarily unavailable. Please try again later.",
    });
  }
}
