import { generateId } from '../utils/generateId';

export interface Transaction {
  id: string
  amount: number
  type: 'income' | 'expense'
  category: string
  date: string
  memo?: string
}

export interface Category {
  id: string
  name: string
  type: 'income' | 'expense'
  icon: string
  color: string
}

export const mockCategories: Category[] = [
  // 支出カテゴリ
  { id: 'exp_food', name: '食費', type: 'expense', icon: '🍽️', color: '#FF9800' },
  { id: 'exp_transport', name: '交通費', type: 'expense', icon: '🚃', color: '#2196F3' },
  { id: 'exp_daily', name: '日用品', type: 'expense', icon: '🧴', color: '#9C27B0' },
  { id: 'exp_utilities', name: '光熱費', type: 'expense', icon: '💡', color: '#FF5722' },
  { id: 'exp_medical', name: '医療費', type: 'expense', icon: '🏥', color: '#E91E63' },
  { id: 'exp_entertainment', name: '娯楽', type: 'expense', icon: '🎮', color: '#3F51B5' },
  { id: 'exp_housing', name: '住居費', type: 'expense', icon: '🏠', color: '#795548' },
  { id: 'exp_communication', name: '通信費', type: 'expense', icon: '📱', color: '#607D8B' },
  { id: 'exp_insurance', name: '保険・税金', type: 'expense', icon: '📋', color: '#455A64' },
  { id: 'exp_education', name: '教育費', type: 'expense', icon: '📚', color: '#FF7043' },
  { id: 'exp_beauty', name: '美容・健康', type: 'expense', icon: '💄', color: '#EC407A' },
  { id: 'exp_clothing', name: '衣服', type: 'expense', icon: '👕', color: '#AB47BC' },
  { id: 'exp_social', name: '交際費', type: 'expense', icon: '🍻', color: '#FFAB40' },
  { id: 'exp_hobby', name: '趣味', type: 'expense', icon: '🎨', color: '#29B6F6' },
  { id: 'exp_misc', name: '雑費', type: 'expense', icon: '📦', color: '#8D6E63' },
  
  // 収入カテゴリ
  { id: 'inc_salary', name: '給与', type: 'income', icon: '💰', color: '#4CAF50' },
  { id: 'inc_side_job', name: '副業', type: 'income', icon: '💻', color: '#8BC34A' },
  { id: 'inc_bonus', name: 'ボーナス', type: 'income', icon: '🎁', color: '#689F38' },
  { id: 'inc_allowance', name: 'お小遣い', type: 'income', icon: '💵', color: '#7CB342' },
  { id: 'inc_investment', name: '投資・配当', type: 'income', icon: '📈', color: '#558B2F' },
  { id: 'inc_refund', name: '返金', type: 'income', icon: '↩️', color: '#9CCC65' },
  { id: 'inc_sales', name: '売上', type: 'income', icon: '🏪', color: '#66BB6A' },
  { id: 'inc_other', name: 'その他', type: 'income', icon: '➕', color: '#AED581' },
]

// トランザクションデータをミュータブルな配列として定義
export let mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 350000,
    type: 'income',
    category: '給与',
    date: '2025-01-25',
    memo: '1月分給与'
  },
  {
    id: '2',
    amount: 1200,
    type: 'expense',
    category: '食費',
    date: '2025-01-25',
    memo: 'ランチ'
  },
  {
    id: '3',
    amount: 300,
    type: 'expense',
    category: '交通費',
    date: '2025-01-25',
    memo: '電車代'
  },
  {
    id: '4',
    amount: 2500,
    type: 'expense',
    category: '食費',
    date: '2025-01-24',
    memo: '夕食'
  },
  {
    id: '5',
    amount: 15000,
    type: 'expense',
    category: '日用品',
    date: '2025-01-24',
    memo: '洗剤など'
  },
  {
    id: '6',
    amount: 800,
    type: 'expense',
    category: '食費',
    date: '2025-01-23',
    memo: 'コーヒー'
  },
  {
    id: '7',
    amount: 5000,
    type: 'expense',
    category: '娯楽',
    date: '2025-01-23',
    memo: '映画'
  },
  {
    id: '8',
    amount: 25000,
    type: 'income',
    category: '副業',
    date: '2025-01-22',
    memo: 'フリーランス報酬'
  },
]

// 今日の日付を取得
const today = new Date().toISOString().split('T')[0]

// 今月の日付範囲を取得
const getCurrentMonthRange = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  
  const startOfMonth = new Date(year, month, 1).toISOString().split('T')[0]
  const endOfMonth = new Date(year, month + 1, 0).toISOString().split('T')[0]
  
  return { startOfMonth, endOfMonth }
}

// 今日の収支を計算
export const getTodayBalance = () => {
  const todayTransactions = mockTransactions.filter(t => t.date === today)
  
  const income = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
    
  const expense = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
    
  return { income, expense, balance: income - expense }
}

// 今月の収支を計算
export const getMonthlyBalance = () => {
  const { startOfMonth, endOfMonth } = getCurrentMonthRange()
  
  const monthlyTransactions = mockTransactions.filter(t => 
    t.date >= startOfMonth && t.date <= endOfMonth
  )
  
  const income = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
    
  const expense = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
    
  return { income, expense, balance: income - expense }
}

// 最近の取引を取得（最新5件）
export const getRecentTransactions = (limit: number = 5) => {
  return mockTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// 金額をフォーマット
export const formatAmount = (amount: number) => {
  return amount.toLocaleString('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
  })
}

// 新しいトランザクションを追加する関数
export const addTransaction = (transactionData: {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  memo?: string;
}): Transaction => {
  const newTransaction: Transaction = {
    id: generateId(),
    amount: transactionData.amount,
    type: transactionData.type,
    category: transactionData.category,
    date: transactionData.date,
    memo: transactionData.memo || undefined,
  };

  // 配列の先頭に追加（最新が最初に表示されるように）
  mockTransactions.unshift(newTransaction);
  
  return newTransaction;
};

// トランザクションを削除する関数（将来の機能拡張用）
export const removeTransaction = (id: string): boolean => {
  const index = mockTransactions.findIndex(transaction => transaction.id === id);
  if (index !== -1) {
    mockTransactions.splice(index, 1);
    return true;
  }
  return false;
};

// トランザクションを更新する関数（将来の機能拡張用）
export const updateTransaction = (id: string, updatedData: Partial<Transaction>): Transaction | null => {
  const index = mockTransactions.findIndex(transaction => transaction.id === id);
  if (index !== -1) {
    mockTransactions[index] = { ...mockTransactions[index], ...updatedData };
    return mockTransactions[index];
  }
  return null;
};

// カテゴリ名からカテゴリオブジェクトを取得する関数
export const getCategoryByName = (categoryName: string): Category | null => {
  return mockCategories.find(category => category.name === categoryName) || null;
};