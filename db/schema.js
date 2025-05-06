import {
  pgTable,
  varchar,
  serial,
  integer,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  amount: varchar("amount").notNull(),
  icon: varchar("icon"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // createdBy: varchar("createdBy").notNull(),
});

export const expenses = pgTable("expenses", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  amount: numeric("amount").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  budgetId: integer("budgetId").references(() => budgets.id, {
    onDelete: "CASCADE",
  }),
  // createdBy: varchar("createdBy").notNull(),
});
