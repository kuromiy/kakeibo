import { db } from '@/features/database';
import { categories } from '@/features/database/schema';
import { eq } from 'drizzle-orm';
import type { Category, NewCategory } from '@/features/database/schema';

export const categoryRepository = {
  async findAll(): Promise<Category[]> {
    return await db.select().from(categories);
  },

  async findByType(type: 'income' | 'expense'): Promise<Category[]> {
    return await db.select().from(categories).where(eq(categories.type, type));
  },

  async findByName(name: string): Promise<Category | undefined> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.name, name))
      .limit(1);
    return result[0];
  },

  async findById(id: string): Promise<Category | undefined> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    return result[0];
  },

  async create(data: NewCategory): Promise<Category> {
    const result = await db.insert(categories).values(data).returning();
    return result[0];
  },

  async createMany(data: NewCategory[]): Promise<void> {
    await db.insert(categories).values(data);
  },

  async update(id: string, data: Partial<NewCategory>): Promise<Category | undefined> {
    const result = await db
      .update(categories)
      .set(data)
      .where(eq(categories.id, id))
      .returning();
    return result[0];
  },

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result.changes > 0;
  },
};