import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core"

export const content = pgTable("content", {
  key: text("key").primaryKey(),
  data: jsonb("data").notNull(),
  updated_at: timestamp("updated_at").defaultNow(),
})

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  image: text("image").notNull(),
  sort_order: integer("sort_order").notNull().default(0),
})

export const rooms = pgTable("rooms", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category_id: text("category_id")
    .notNull()
    .references(() => categories.id),
  description: text("description").notNull(),
  images: jsonb("images").$type<{ src: string; alt: string }[]>().notNull(),
  colors: jsonb("colors").$type<{ name: string; color: string }[]>().notNull(),
  sort_order: integer("sort_order").notNull().default(0),
})

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  password_hash: text("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow(),
})

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  project_type: text("project_type"),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"),
  created_at: timestamp("created_at").defaultNow(),
})
