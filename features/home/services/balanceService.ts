import { transactionService } from '@/features/transaction/services/transactionService';

export const balanceService = {
  async getTodayBalance() {
    const today = new Date().toISOString().split('T')[0];
    const transactions = await transactionService.getTransactionsByDateRange(today, today);
    return transactionService.calculateBalance(transactions);
  },

  async getMonthlyBalance() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const startOfMonth = new Date(year, month, 1).toISOString().split('T')[0];
    const endOfMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];
    
    const transactions = await transactionService.getTransactionsByDateRange(startOfMonth, endOfMonth);
    return transactionService.calculateBalance(transactions);
  },

  formatAmount(amount: number): string {
    return transactionService.formatAmount(amount);
  },
};