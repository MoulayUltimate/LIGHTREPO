import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: text("role").default("admin"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const orders = sqliteTable("orders", {
    id: text("id").primaryKey(),
    stripePaymentIntentId: text("stripe_payment_intent_id").unique(),
    amount: integer("amount").notNull(), // in cents
    status: text("status").default("pending"), // pending, paid, failed
    customerEmail: text("customer_email"),
    metadata: text("metadata"), // JSON string
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const visitors = sqliteTable("visitors", {
    id: text("id").primaryKey(),
    sessionId: text("session_id"),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    deviceType: text("device_type"),
    country: text("country"),
    city: text("city"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const pageViews = sqliteTable("page_views", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id").references(() => visitors.id),
    path: text("path").notNull(),
    referrer: text("referrer"),
    duration: integer("duration"),
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const contactMessages = sqliteTable("contact_messages", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    subject: text("subject"),
    message: text("message").notNull(),
    status: text("status").default("new"), // new, read, replied
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});

export const externalClicks = sqliteTable("external_clicks", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    visitorId: text("visitor_id"), // Optional: link to visitors table if available
    linkUrl: text("link_url").notNull(),
    location: text("location").notNull(), // 'hero', 'showcase', 'banner', etc.
    createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(strftime('%s', 'now'))`),
});
