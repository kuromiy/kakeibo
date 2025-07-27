import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  amount: integer('amount').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
  category: text('category').notNull(),
  date: text('date').notNull(),
  memo: text('memo'),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
});

export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
});

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;