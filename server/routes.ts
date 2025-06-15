import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import tattooAIRouter from "./tattoo-ai.js";

export async function registerRoutes(app: Express): Promise<Server> {
  // Register tattoo AI generation routes
  app.use("/api", tattooAIRouter);
  
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
