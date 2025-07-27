import { transactionRepository } from '../repositories/transactionRepository';
import { generateId } from '@/shared/utils/generateId';
import type { Transaction, NewTransaction } from '@/features/database/schema';

export const transactionService = {
  async getRecentTransactions(limit: number = 5): Promise<Transaction[]> {
    try {
      return await transactionRepository.findRecent(limit);
    } catch (error) {
      console.error('Failed to get recent transactions:', error);
      return [];
    }
  },

  async getTransactionsByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    try {
      return await transactionRepository.findByDateRange(startDate, endDate);
    } catch (error) {
      console.error('Failed to get transactions by date range:', error);
      return [];
    }
  },

  async getAllTransactions(): Promise<Transaction[]> {
    try {
      return await transactionRepository.findAll();
    } catch (error) {
      console.error('Failed to get all transactions:', error);
      return [];
    }
  },

  async addTransaction(data: {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    date: string;
    memo?: string;
  }): Promise<Transaction | null> {
    try {
      const newTransaction: NewTransaction = {
        id: generateId(),
        amount: data.amount,
        type: data.type,
        category: data.category,
        date: data.date,
        memo: data.memo || undefined,
      };

      return await transactionRepository.create(newTransaction);
    } catch (error) {
      console.error('Failed to add transaction:', error);
      return null;
    }
  },

  async updateTransaction(id: string, data: Partial<NewTransaction>): Promise<Transaction | null> {
    try {
      const result = await transactionRepository.update(id, data);
      return result || null;
    } catch (error) {
      console.error('Failed to update transaction:', error);
      return null;
    }
  },

  async deleteTransaction(id: string): Promise<boolean> {
    try {
      return await transactionRepository.delete(id);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
      return false;
    }
  },

  // 収支計算用のヘルパーメソッド
  calculateBalance(transactions: Transaction[]): { income: number; expense: number; balance: number } {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expense, balance: income - expense };
  },

  // 金額フォーマット用のヘルパーメソッド
  formatAmount(amount: number): string {
    return amount.toLocaleString('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
    });
  },
};