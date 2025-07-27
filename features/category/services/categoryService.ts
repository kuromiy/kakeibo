import { categoryRepository } from '../repositories/categoryRepository';
import type { Category } from '@/features/database/schema';

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    try {
      return await categoryRepository.findAll();
    } catch (error) {
      console.error('Failed to get all categories:', error);
      return [];
    }
  },

  async getCategoriesByType(type: 'income' | 'expense'): Promise<Category[]> {
    try {
      return await categoryRepository.findByType(type);
    } catch (error) {
      console.error(`Failed to get ${type} categories:`, error);
      return [];
    }
  },

  async getCategoryByName(name: string): Promise<Category | null> {
    try {
      const category = await categoryRepository.findByName(name);
      return category || null;
    } catch (error) {
      console.error(`Failed to get category by name ${name}:`, error);
      return null;
    }
  },

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const category = await categoryRepository.findById(id);
      return category || null;
    } catch (error) {
      console.error(`Failed to get category by id ${id}:`, error);
      return null;
    }
  },
};