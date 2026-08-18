import { mysqlTable, int, varchar, timestamp, text, mysqlEnum } from "drizzle-orm/mysql-core";

export const adminUsers = mysqlTable("admin_users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 191 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type NewAdminUser = typeof adminUsers.$inferInsert;

export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  dialCode: varchar("dial_code", { length: 10 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  countryOfResidence: varchar("country_of_residence", { length: 255 }).notNull(),
  interestedIn: varchar("interested_in", { length: 255 }).notNull(),
  hearAboutUs: varchar("hear_about_us", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "in-progress", "closed"]).notNull().default("new"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
