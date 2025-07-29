import { useEffect, useState, useCallback } from 'react';
import { balanceService } from '../services/balanceService';

interface Balance {
  income: number;
  expense: number;
  balance: number;
}

export function useTodayBalance() {
  const [balance, setBalance] = useState<Balance>({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBalance = useCallback(async () => {
    try {
      setLoading(true);
      const data = await balanceService.getTodayBalance();
      setBalance(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load today balance'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return { balance, loading, error, refetch: loadBalance };
}

export function useMonthlyBalance() {
  const [balance, setBalance] = useState<Balance>({ income: 0, expense: 0, balance: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadBalance = useCallback(async () => {
    try {
      setLoading(true);
      const data = await balanceService.getMonthlyBalance();
      setBalance(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load monthly balance'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBalance();
  }, [loadBalance]);

  return { balance, loading, error, refetch: loadBalance };
}