import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPaletteSchema, insertGradientSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Palette routes
  app.get("/api/palettes", async (req, res) => {
    try {
      const palettes = await storage.getPalettes();
      res.json(palettes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch palettes" });
    }
  });

  app.get("/api/palettes/trending", async (req, res) => {
    try {
      const trendingPalettes = await storage.getTrendingPalettes();
      res.json(trendingPalettes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending palettes" });
    }
  });

  app.get("/api/palettes/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const palette = await storage.getPalette(id);
      if (!palette) {
        return res.status(404).json({ message: "Palette not found" });
      }
      res.json(palette);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch palette" });
    }
  });

  app.post("/api/palettes", async (req, res) => {
    try {
      const validatedData = insertPaletteSchema.parse(req.body);
      const palette = await storage.createPalette(validatedData);
      res.status(201).json(palette);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid palette data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create palette" });
    }
  });

  app.post("/api/palettes/:id/use", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.updatePaletteUsage(id);
      res.json({ message: "Usage updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update usage" });
    }
  });

  // Gradient routes
  app.get("/api/gradients", async (req, res) => {
    try {
      const gradients = await storage.getGradients();
      res.json(gradients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gradients" });
    }
  });

  app.get("/api/gradients/trending", async (req, res) => {
    try {
      const trendingGradients = await storage.getTrendingGradients();
      res.json(trendingGradients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trending gradients" });
    }
  });

  app.get("/api/gradients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const gradient = await storage.getGradient(id);
      if (!gradient) {
        return res.status(404).json({ message: "Gradient not found" });
      }
      res.json(gradient);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gradient" });
    }
  });

  app.post("/api/gradients", async (req, res) => {
    try {
      const validatedData = insertGradientSchema.parse(req.body);
      const gradient = await storage.createGradient(validatedData);
      res.status(201).json(gradient);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid gradient data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create gradient" });
    }
  });

  app.post("/api/gradients/:id/use", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.updateGradientUsage(id);
      res.json({ message: "Usage updated" });
    } catch (error) {
      res.status(500).json({ message: "Failed to update usage" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
