import { useEffect, useState, useCallback } from 'react';
import { transactionService } from '../services/transactionService';
import type { Transaction } from '@/features/database/schema';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await transactionService.getAllTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load transactions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const addTransaction = async (data: {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    memo?: string;
  }) => {
    const newTransaction = await transactionService.addTransaction(data);
    if (newTransaction) {
      await loadTransactions(); // Reload to maintain sort order
    }
    return newTransaction;
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    const updated = await transactionService.updateTransaction(id, data);
    if (updated) {
      await loadTransactions();
    }
    return updated;
  };

  const deleteTransaction = async (id: string) => {
    const result = await transactionService.deleteTransaction(id);
    if (result) {
      await loadTransactions();
    }
    return result;
  };

  return {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    refetch: loadTransactions,
  };
}

export function useRecentTransactions(limit: number = 5) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await transactionService.getRecentTransactions(limit);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load recent transactions'));
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return { transactions, loading, error, refetch: loadTransactions };
}