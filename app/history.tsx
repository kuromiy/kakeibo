import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Card } from "../shared/components/Card";
import {
  Transaction,
  mockTransactions,
  formatAmount,
  getCategoryByName,
} from "../shared/constants/mockData";

// 日付でトランザクションをグループ化する関数
const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped = transactions.reduce(
    (acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    },
    {} as Record<string, Transaction[]>,
  );

  // 日付の降順でソート
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return sortedDates.map((date) => ({
    date,
    transactions: grouped[date],
  }));
};

// 日付をフォーマットする関数
const formatDateHeader = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // 今日かどうかチェック
  if (date.toDateString() === today.toDateString()) {
    return "今日";
  }
  // 昨日かどうかチェック
  if (date.toDateString() === yesterday.toDateString()) {
    return "昨日";
  }

  // それ以外は日付を表示
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });
};

// 日別の収支を計算する関数
const calculateDailyBalance = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expense, balance: income - expense };
};

export default function HistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [transactionGroups, setTransactionGroups] = useState(() =>
    groupTransactionsByDate(mockTransactions),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // 実際のアプリではここでデータを再取得
    setTimeout(() => {
      setTransactionGroups(groupTransactionsByDate(mockTransactions));
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleBack = () => {
    router.back();
  };

  const renderTransactionItem = (
    transaction: Transaction,
    index: number,
    array: Transaction[],
  ) => {
    const category = getCategoryByName(transaction.category);

    return (
      <View
        key={transaction.id}
        className={[
          "flex-row justify-between items-center py-2 px-1",
          index < array.length - 1 && "border-b border-border",
        ]
          .filter(Boolean)
          .join(" ")}
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
            <Text className="text-base text-text font-medium">
              {transaction.category}
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

  const renderDateGroup = ({
    date,
    transactions,
  }: {
    date: string;
    transactions: Transaction[];
  }) => {
    const dailyBalance = calculateDailyBalance(transactions);

    return (
      <View key={date} className="mx-4 mb-4">
        <View className="flex-row justify-between items-center mb-2 px-1">
          <Text className="text-base text-text font-semibold">
            {formatDateHeader(date)}
          </Text>
          <View className="flex-row gap-4">
            <Text className="text-sm text-textSecondary">
              収入:{" "}
              <Text className="text-income">
                {formatAmount(dailyBalance.income)}
              </Text>
            </Text>
            <Text className="text-sm text-textSecondary">
              支出:{" "}
              <Text className="text-expense">
                {formatAmount(dailyBalance.expense)}
              </Text>
            </Text>
          </View>
        </View>
        <Card className="py-1">{transactions.map(renderTransactionItem)}</Card>
      </View>
    );
  };

  // 総収支を計算
  const totalBalance = mockTransactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right", "bottom"]}
    >
      <View className="flex-row items-center justify-between px-4 py-2 border-b border-border">
        <TouchableOpacity onPress={handleBack} className="py-1 px-2 min-w-15">
          <Text className="text-xl text-textSecondary">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-text">取引履歴</Text>
        <View className="min-w-15" />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFD700" // theme.colors.primary
            colors={["#FFD700"]} // theme.colors.primary
          />
        }
      >
        {/* 総収支サマリー */}
        <Card className="mx-4 mb-2">
          <Text className="text-xl font-semibold text-text mb-4">総収支</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">総収入</Text>
              <Text className="text-xl font-bold text-income">
                {formatAmount(totalBalance.income)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">総支出</Text>
              <Text className="text-xl font-bold text-expense">
                {formatAmount(totalBalance.expense)}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-sm text-textSecondary mb-1">残高</Text>
              <Text
                className={[
                  "text-xl font-bold",
                  totalBalance.income - totalBalance.expense >= 0
                    ? "text-income"
                    : "text-expense",
                ].join(" ")}
              >
                {formatAmount(totalBalance.income - totalBalance.expense)}
              </Text>
            </View>
          </View>
        </Card>

        {/* 日別の取引履歴 */}
        {transactionGroups.length > 0 ? (
          transactionGroups.map(renderDateGroup)
        ) : (
          <Card className="mx-4 items-center py-8">
            <Text className="text-base text-textSecondary">
              取引履歴がありません
            </Text>
          </Card>
        )}

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
