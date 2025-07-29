import React from 'react';
import { View, Text } from 'react-native';
import { useCategoryByName } from '@/features/category/hooks/useCategories';
import { balanceService } from '@/features/home/services/balanceService';
import type { Transaction } from '@/features/database/schema';

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { category } = useCategoryByName(transaction.category);

  return (
    <View className="flex-row justify-between items-center py-2 border-b border-border">
      <View className="flex-row items-center flex-1">
        {category && (
          <View
            className="w-9 h-9 rounded-full items-center justify-center mr-2"
            style={{ backgroundColor: category.color }}
          >
            <Text style={{ fontSize: 18 }}>{category.icon}</Text>
          </View>
        )}
        <View className="flex-1">
          <Text className="text-base text-text font-semibold">
            {transaction.category}
          </Text>
          <Text className="text-sm text-textSecondary mt-0.5">
            {transaction.memo || ''}
          </Text>
        </View>
      </View>
      <Text
        className={`text-lg font-bold ${
          transaction.type === 'income' ? 'text-income' : 'text-expense'
        }`}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {balanceService.formatAmount(transaction.amount)}
      </Text>
    </View>
  );
}