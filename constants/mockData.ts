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
  { id: '1', name: '食費', type: 'expense', icon: '🍽️', color: '#FF9800' },
  { id: '2', name: '交通費', type: 'expense', icon: '🚃', color: '#2196F3' },
  { id: '3', name: '日用品', type: 'expense', icon: '🧴', color: '#9C27B0' },
  { id: '4', name: '光熱費', type: 'expense', icon: '💡', color: '#FF5722' },
  { id: '5', name: '医療費', type: 'expense', icon: '🏥', color: '#E91E63' },
  { id: '6', name: '娯楽', type: 'expense', icon: '🎮', color: '#3F51B5' },
  
  // 収入カテゴリ
  { id: '7', name: '給与', type: 'income', icon: '💰', color: '#4CAF50' },
  { id: '8', name: '副業', type: 'income', icon: '💻', color: '#8BC34A' },
  { id: '9', name: 'その他', type: 'income', icon: '➕', color: '#CDDC39' },
]

export const mockTransactions: Transaction[] = [
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