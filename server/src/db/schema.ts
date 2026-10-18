import { integer, pgTable, varchar, timestamp, date, unique, check, index,  } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
});

export const categoryTable = pgTable("categories", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  name: varchar({ length: 30 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
},
  (table) => [
    unique("categories_user_name_unique").on(
      table.userId,
      table.name
    ),
  ])

export const expenseTable = pgTable("expenses", {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id').references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
  categoryId: integer('category_id').references(() => categoryTable.id).notNull(),
  amount: integer().notNull(),
  description: varchar({ length: 500 }),
  date: date("date", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdateFn(() => new Date()),
},
  (table) => [
    check("expenses_amount_positive", sql`${table.amount} > 0`),

    index("expenses_user_date_idx").on(
      table.userId,
      table.date
    ),

    index("expenses_user_category_date_idx").on(
      table.userId,
      table.categoryId,
      table.date
    ),
  ])