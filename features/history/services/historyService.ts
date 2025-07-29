import { transactionService } from '@/features/transaction/services/transactionService';
import type { Transaction } from '@/features/database/schema';

export const historyService = {
  async getTransactionHistory(): Promise<Transaction[]> {
    return await transactionService.getAllTransactions();
  },

  async getTransactionsByMonth(year: number, month: number): Promise<Transaction[]> {
    const startDate = new Date(year, month, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];
    
    return await transactionService.getTransactionsByDateRange(startDate, endDate);
  },

  groupTransactionsByDate(transactions: Transaction[]): Map<string, Transaction[]> {
    const grouped = new Map<string, Transaction[]>();
    
    transactions.forEach(transaction => {
      const date = transaction.date;
      if (!grouped.has(date)) {
        grouped.set(date, []);
      }
      grouped.get(date)!.push(transaction);
    });
    
    return grouped;
  },

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekDay = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    
    return `${month}月${day}日(${weekDay})`;
  },
};