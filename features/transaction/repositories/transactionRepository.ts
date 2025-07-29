import { db } from '@/features/database';
import { transactions } from '@/features/database/schema';
import { eq, desc, and, gte, lte } from 'drizzle-orm';
import type { Transaction, NewTransaction } from '@/features/database/schema';

export const transactionRepository = {
  async findAll(): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .orderBy(desc(transactions.date), desc(transactions.createdAt));
  },

  async findByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .where(
        and(
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        )
      )
      .orderBy(desc(transactions.date), desc(transactions.createdAt));
  },

  async findRecent(limit: number): Promise<Transaction[]> {
    return await db
      .select()
      .from(transactions)
      .orderBy(desc(transactions.date), desc(transactions.createdAt))
      .limit(limit);
  },

  async findById(id: string): Promise<Transaction | undefined> {
    const result = await db
      .select()
      .from(transactions)
      .where(eq(transactions.id, id))
      .limit(1);
    return result[0];
  },

  async create(data: NewTransaction): Promise<Transaction> {
    const result = await db.insert(transactions).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewTransaction>): Promise<Transaction | undefined> {
    const result = await db
      .update(transactions)
      .set({
        ...data,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(transactions.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(transactions).where(eq(transactions.id, id));
    return result.changes > 0;
  },
};