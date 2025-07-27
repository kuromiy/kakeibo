import { useEffect, useState, useCallback } from 'react';
import { historyService } from '../services/historyService';
import type { Transaction } from '@/features/database/schema';

export function useTransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await historyService.getTransactionHistory();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load transaction history'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const groupedTransactions = historyService.groupTransactionsByDate(transactions);

  return {
    transactions,
    groupedTransactions,
    loading,
    error,
    refetch: loadHistory,
  };
}

export function useMonthlyHistory(year: number, month: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const data = await historyService.getTransactionsByMonth(year, month);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load monthly history'));
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const groupedTransactions = historyService.groupTransactionsByDate(transactions);

  return {
    transactions,
    groupedTransactions,
    loading,
    error,
  };
}