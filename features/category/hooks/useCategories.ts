import { useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';
import type { Category } from '@/features/database/schema';

export function useCategories(type?: 'income' | 'expense') {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = type
          ? await categoryService.getCategoriesByType(type)
          : await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load categories'));
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [type]);

  return { categories, loading, error };
}

export function useCategoryByName(name: string) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      if (!name) {
        setCategory(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await categoryService.getCategoryByName(name);
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load category'));
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [name]);

  return { category, loading, error };
}