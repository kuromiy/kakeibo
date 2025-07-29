import { categoryRepository } from '@/features/category/repositories/categoryRepository';
import type { NewCategory } from './schema';

const defaultCategories: NewCategory[] = [
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
];

export async function seedCategories(): Promise<void> {
  try {
    // 既存のカテゴリをチェック
    const existingCategories = await categoryRepository.findAll();
    
    if (existingCategories.length === 0) {
      console.log('Seeding default categories...');
      await categoryRepository.createMany(defaultCategories);
      console.log('Default categories seeded successfully');
    } else {
      console.log('Categories already exist, skipping seed');
    }
  } catch (error) {
    console.error('Failed to seed categories:', error);
  }
}