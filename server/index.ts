import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleStatus, handleDetail, handleDeactivate } from "./routes/vas";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.get("/api/vas/status", handleStatus);
  app.get("/api/vas/detail", handleDetail);
  app.get("/api/vas/deactivate", handleDeactivate);

  return app;
}
