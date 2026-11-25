import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import expenseRoutes from "./routes/expense.routes";
import redisClient from "./config/redis";
import { flushData } from "./services/redis.services";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.json({
    msg: "healthy",
  });
});
app.get("/", (req: Request, res: Response) => {
  return res.json({
    msg: "Welcome to Expenxo!",
  });
});
app.use("/api/v1", authRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", expenseRoutes);
app.post("/api/v1/flush-redis", async (req, res) => {
  try {
    const returning = await flushData();
    return res.status(200).json({
        msg: "Redis data flushed"
    });
  } catch (error) {
    console.error("Error while flushing data of redis:", error);
    return res.status(500).json({
        msg: "Failed to flush Redis data",
      });

  }

});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
