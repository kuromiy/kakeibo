import { TransactionItem } from "@/features/home/components/TransactionItem";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactionHistory } from "../features/history/hooks/useHistory";
import { historyService } from "../features/history/services/historyService";
import { balanceService } from "../features/home/services/balanceService";
import { Card } from "../shared/components/Card";
export default function HistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { groupedTransactions, loading, error, refetch } =
    useTransactionHistory();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading && !refreshing) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#10B981" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-error text-lg mb-4">エラーが発生しました</Text>
        <TouchableOpacity
          onPress={refetch}
          className="bg-primary px-4 py-2 rounded"
        >
          <Text className="text-background font-semibold">再試行</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* ヘッダー */}
      <View className="p-4 border-b border-border">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={handleBack}
            className="py-1 px-2 rounded min-w-15 items-center active:opacity-70 active:bg-surface"
          >
            <Text className="text-xl text-textSecondary">←</Text>
          </Pressable>
          <Text className="text-xl font-bold text-text">取引履歴</Text>
          <View className="w-12" />
        </View>
      </View>

      {/* 取引履歴 */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#10B981"
          />
        }
      >
        <View className="p-4">
          {Array.from(groupedTransactions).length === 0 ? (
            <View className="items-center py-8">
              <Text className="text-textSecondary text-lg">
                取引履歴がありません
              </Text>
            </View>
          ) : (
            Array.from(groupedTransactions).map(([date, transactions]) => {
              // 日別の収支計算
              const income = transactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0);
              const expense = transactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0);
              const balance = income - expense;

              return (
                <Card key={date} className="mb-4">
                  <View className="border-b border-border pb-2 mb-2">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-lg font-bold text-text">
                        {historyService.formatDate(date)}
                      </Text>
                      <Text
                        className={`text-base font-bold ${
                          balance >= 0 ? "text-income" : "text-expense"
                        }`}
                      >
                        {balance >= 0 ? "+" : ""}
                        {balanceService.formatAmount(balance)}
                      </Text>
                    </View>
                  </View>
                  {transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))}
                </Card>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
