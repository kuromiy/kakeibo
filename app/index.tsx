import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Card } from "../shared/components/Card";
import { FAB } from "../features/home/components/FAB";
import {
  getTodayBalance,
  getMonthlyBalance,
  getRecentTransactions,
  formatAmount,
  getCategoryByName,
  Transaction,
} from "../shared/constants/mockData";

export default function HomeScreen() {
  const todayBalance = getTodayBalance();
  const monthlyBalance = getMonthlyBalance();
  const recentTransactions = getRecentTransactions(5);

  const handleAddIncome = () => {
    router.push("/add-transaction?type=income");
  };

  const handleAddExpense = () => {
    router.push("/add-transaction?type=expense");
  };

  const renderTransactionItem = (transaction: Transaction) => {
    const category = getCategoryByName(transaction.category);

    return (
      <View
        key={transaction.id}
        className="flex-row justify-between items-center py-2 border-b border-border"
      >
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
              {transaction.date}
            </Text>
            {transaction.memo && (
              <Text className="text-sm text-textSecondary mt-0.5">
                {transaction.memo}
              </Text>
            )}
          </View>
        </View>
        <Text
          className={[
            "text-base font-bold ml-4",
            transaction.type === "income" ? "text-income" : "text-expense",
          ].join(" ")}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatAmount(transaction.amount)}
        </Text>
      </View>
    );
  };

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
                {formatAmount(todayBalance.income)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">支出</Text>
              <Text className="text-xl font-bold text-expense">
                {formatAmount(todayBalance.expense)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">残高</Text>
              <Text
                className={[
                  "text-xl font-bold",
                  todayBalance.balance >= 0 ? "text-income" : "text-expense",
                ].join(" ")}
              >
                {formatAmount(todayBalance.balance)}
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
                {formatAmount(monthlyBalance.income)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">支出</Text>
              <Text className="text-xl font-bold text-expense">
                {formatAmount(monthlyBalance.expense)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">残高</Text>
              <Text
                className={[
                  "text-xl font-bold",
                  monthlyBalance.balance >= 0 ? "text-income" : "text-expense",
                ].join(" ")}
              >
                {formatAmount(monthlyBalance.balance)}
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
              {recentTransactions.map(renderTransactionItem)}
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
