import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const positioningRequests = pgTable("positioning_requests", {
  id: serial("id").primaryKey(),
  workDescription: text("work_description").notNull(),
  service: text("service").notNull(),
  transformation: text("transformation").notNull(),
  audience: text("audience").notNull(),
  painPoints: text("pain_points").notNull(),
  misunderstanding: text("misunderstanding"),
  createdAt: text("created_at").notNull(),
  downloadedDoc: boolean("downloaded_doc").default(false),
  sentEmail: boolean("sent_email").default(false),
  email: text("email")
});

export const positioningStatements = pgTable("positioning_statements", {
  id: serial("id").primaryKey(),
  requestId: integer("request_id").notNull(),
  type: text("type").notNull(), // type: "website_headline", "social_bio", "cta", "summary"
  content: text("content").notNull(),
});

export const insertPositioningRequestSchema = z.object({
  workDescription: z.string().min(1, "Please describe what you do"),
  service: z.string().min(1, "Please describe your service or offer"),
  transformation: z.string().min(1, "Please describe the transformation you deliver"),
  audience: z.string().min(1, "Please describe your target audience"),
  painPoints: z.string().min(1, "Please describe common pain points"),
  misunderstanding: z.string().optional(),
  email: z.string().email().optional(),
  downloadedDoc: z.boolean().optional().default(false),
  sentEmail: z.boolean().optional().default(false),
});

export const insertPositioningStatementSchema = createInsertSchema(positioningStatements).pick({
  requestId: true,
  type: true,
  content: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPositioningRequest = z.infer<typeof insertPositioningRequestSchema>;
export type PositioningRequest = typeof positioningRequests.$inferSelect;

export type InsertPositioningStatement = z.infer<typeof insertPositioningStatementSchema>;
export type PositioningStatement = typeof positioningStatements.$inferSelect;
