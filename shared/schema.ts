import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const palettes = pgTable("palettes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  colors: json("colors").$type<string[]>().notNull(),
  tags: json("tags").$type<string[]>().default([]),
  usageCount: integer("usage_count").default(0),
  isTrending: boolean("is_trending").default(false),
});

export const gradients = pgTable("gradients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  colors: json("colors").$type<{color: string, position: number}[]>().notNull(),
  direction: integer("direction").default(135),
  type: text("type").default("linear"),
  usageCount: integer("usage_count").default(0),
  isTrending: boolean("is_trending").default(false),
});

export const insertPaletteSchema = createInsertSchema(palettes).omit({
  id: true,
  usageCount: true,
  isTrending: true,
});

export const insertGradientSchema = createInsertSchema(gradients).omit({
  id: true,
  usageCount: true,
  isTrending: true,
});

export type InsertPalette = z.infer<typeof insertPaletteSchema>;
export type Palette = typeof palettes.$inferSelect;

export type InsertGradient = z.infer<typeof insertGradientSchema>;
export type Gradient = typeof gradients.$inferSelect;

export type User = {
  id: number;
  username: string;
  password: string;
};

export type InsertUser = {
  username: string;
  password: string;
};
