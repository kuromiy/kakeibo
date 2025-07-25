import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Card } from "../shared/components/Card";
import { theme } from "../shared/styles/theme";
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
        style={[
          styles.transactionItem,
          index < array.length - 1 && styles.transactionItemBorder,
        ]}
      >
        <View style={styles.transactionLeft}>
          {category && (
            <View
              style={[
                styles.categoryIconContainer,
                { backgroundColor: category.color },
              ]}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
            </View>
          )}
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionCategory}>
              {transaction.category}
            </Text>
            {transaction.memo && (
              <Text style={styles.transactionMemo}>{transaction.memo}</Text>
            )}
          </View>
        </View>
        <Text
          style={[
            styles.transactionAmount,
            transaction.type === "income"
              ? styles.incomeAmount
              : styles.expenseAmount,
          ]}
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
      <View key={date} style={styles.dateGroup}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateText}>{formatDateHeader(date)}</Text>
          <View style={styles.dailyBalanceContainer}>
            <Text style={styles.dailyBalanceText}>
              収入:{" "}
              <Text style={styles.incomeAmount}>
                {formatAmount(dailyBalance.income)}
              </Text>
            </Text>
            <Text style={styles.dailyBalanceText}>
              支出:{" "}
              <Text style={styles.expenseAmount}>
                {formatAmount(dailyBalance.expense)}
              </Text>
            </Text>
          </View>
        </View>
        <Card style={styles.transactionCard}>
          {transactions.map(renderTransactionItem)}
        </Card>
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
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>取引履歴</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* 総収支サマリー */}
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>総収支</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>総収入</Text>
              <Text style={[styles.summaryAmount, styles.incomeAmount]}>
                {formatAmount(totalBalance.income)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>総支出</Text>
              <Text style={[styles.summaryAmount, styles.expenseAmount]}>
                {formatAmount(totalBalance.expense)}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>残高</Text>
              <Text
                style={[
                  styles.summaryAmount,
                  totalBalance.income - totalBalance.expense >= 0
                    ? styles.incomeAmount
                    : styles.expenseAmount,
                ]}
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
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>取引履歴がありません</Text>
          </Card>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    minWidth: 60,
  },
  backButtonText: {
    fontSize: 20,
    color: theme.colors.textSecondary,
  },
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  headerSpacer: {
    minWidth: 60,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    margin: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  summaryTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  summaryAmount: {
    ...theme.typography.h3,
    fontWeight: "bold",
  },
  dateGroup: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  dateText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
  },
  dailyBalanceContainer: {
    flexDirection: "row",
    gap: theme.spacing.md,
  },
  dailyBalanceText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  transactionCard: {
    paddingVertical: theme.spacing.xs,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.sm,
  },
  categoryIcon: {
    fontSize: 18,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCategory: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "500",
  },
  transactionMemo: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  transactionAmount: {
    ...theme.typography.body,
    fontWeight: "bold",
    marginLeft: theme.spacing.md,
  },
  incomeAmount: {
    color: theme.colors.income,
  },
  expenseAmount: {
    color: theme.colors.expense,
  },
  emptyCard: {
    margin: theme.spacing.md,
    alignItems: "center",
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  bottomSpacer: {
    height: theme.spacing.lg,
  },
});
