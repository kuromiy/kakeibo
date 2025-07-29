import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";
import { Card } from "../shared/components/Card";
import { FAB } from "../features/home/components/FAB";
import {
  useTodayBalance,
  useMonthlyBalance,
} from "../features/home/hooks/useBalance";
import { useRecentTransactions } from "../features/transaction/hooks/useTransactions";
import { TransactionItem } from "../features/home/components/TransactionItem";
import { balanceService } from "../features/home/services/balanceService";
export default function HomeScreen() {
  const {
    balance: todayBalance,
    loading: todayLoading,
    refetch: refetchToday,
  } = useTodayBalance();
  const {
    balance: monthlyBalance,
    loading: monthlyLoading,
    refetch: refetchMonthly,
  } = useMonthlyBalance();
  const {
    transactions: recentTransactions,
    loading: transactionsLoading,
    refetch: refetchTransactions,
  } = useRecentTransactions(5);

  // 画面がフォーカスされたときにデータを更新
  useFocusEffect(
    React.useCallback(() => {
      refetchToday();
      refetchMonthly();
      refetchTransactions();
    }, [refetchToday, refetchMonthly, refetchTransactions]),
  );

  const handleAddIncome = () => {
    router.push("/add-transaction?type=income");
  };

  const handleAddExpense = () => {
    router.push("/add-transaction?type=expense");
  };

  if (todayLoading || monthlyLoading || transactionsLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View className="p-4 pt-6">
          <Text className="text-3xl font-bold text-text text-center">
            家計簿
          </Text>
        </View>

        {/* 今日の収支 */}
        <Card className="mx-4 mb-2">
          <Text className="text-xl font-semibold text-text mb-4">
            今日の収支
          </Text>
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">収入</Text>
              <Text className="text-xl font-bold text-income">
                {balanceService.formatAmount(todayBalance.income)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">支出</Text>
              <Text className="text-xl font-bold text-expense">
                {balanceService.formatAmount(todayBalance.expense)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">残高</Text>
              <Text
                className={`text-xl font-bold ${
                  todayBalance.balance >= 0 ? "text-income" : "text-expense"
                }`}
              >
                {balanceService.formatAmount(todayBalance.balance)}
              </Text>
            </View>
          </View>
        </Card>

        {/* 今月の収支 */}
        <Card className="mx-4 mt-2">
          <Text className="text-xl font-semibold text-text mb-4">
            今月の収支
          </Text>
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">収入</Text>
              <Text className="text-xl font-bold text-income">
                {balanceService.formatAmount(monthlyBalance.income)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">支出</Text>
              <Text className="text-xl font-bold text-expense">
                {balanceService.formatAmount(monthlyBalance.expense)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">残高</Text>
              <Text
                className={`text-xl font-bold ${
                  monthlyBalance.balance >= 0 ? "text-income" : "text-expense"
                }`}
              >
                {balanceService.formatAmount(monthlyBalance.balance)}
              </Text>
            </View>
          </View>
        </Card>

        {/* 最近の取引履歴 */}
        <Card className="mx-4 mt-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold text-text">最近の取引</Text>
            <TouchableOpacity
              onPress={() => router.push("/history")}
              className="py-1 px-2"
            >
              <Text className="text-sm text-primary font-semibold">
                すべて見る →
              </Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.length > 0 ? (
            <View className="gap-2">
              {recentTransactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </View>
          ) : (
            <Text className="text-base text-textSecondary text-center py-6">
              取引履歴がありません
            </Text>
          )}
        </Card>
      </ScrollView>

      {/* フローティングアクションボタン */}
      <FAB onIncomePress={handleAddIncome} onExpensePress={handleAddExpense} />
    </SafeAreaView>
  );
}
