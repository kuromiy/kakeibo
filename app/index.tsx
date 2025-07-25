import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Card } from "../shared/components/Card";
import { FAB } from "../features/home/components/FAB";
import { theme } from "../shared/styles/theme";
import {
  getTodayBalance,
  getMonthlyBalance,
  getRecentTransactions,
  formatAmount,
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

  const renderTransactionItem = (transaction: Transaction) => (
    <View key={transaction.id} style={styles.transactionItem}>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
        <Text style={styles.transactionDate}>{transaction.date}</Text>
        {transaction.memo && (
          <Text style={styles.transactionMemo}>{transaction.memo}</Text>
        )}
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

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>家計簿</Text>
        </View>

        {/* 今日の収支 */}
        <Card style={styles.balanceCard}>
          <Text style={styles.cardTitle}>今日の収支</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>収入</Text>
              <Text style={[styles.balanceAmount, styles.incomeAmount]}>
                {formatAmount(todayBalance.income)}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>支出</Text>
              <Text style={[styles.balanceAmount, styles.expenseAmount]}>
                {formatAmount(todayBalance.expense)}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>残高</Text>
              <Text
                style={[
                  styles.balanceAmount,
                  todayBalance.balance >= 0
                    ? styles.incomeAmount
                    : styles.expenseAmount,
                ]}
              >
                {formatAmount(todayBalance.balance)}
              </Text>
            </View>
          </View>
        </Card>

        {/* 今月の収支 */}
        <Card style={styles.balanceCard}>
          <Text style={styles.cardTitle}>今月の収支</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>収入</Text>
              <Text style={[styles.balanceAmount, styles.incomeAmount]}>
                {formatAmount(monthlyBalance.income)}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>支出</Text>
              <Text style={[styles.balanceAmount, styles.expenseAmount]}>
                {formatAmount(monthlyBalance.expense)}
              </Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>残高</Text>
              <Text
                style={[
                  styles.balanceAmount,
                  monthlyBalance.balance >= 0
                    ? styles.incomeAmount
                    : styles.expenseAmount,
                ]}
              >
                {formatAmount(monthlyBalance.balance)}
              </Text>
            </View>
          </View>
        </Card>

        {/* 最近の取引履歴 */}
        <Card style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.cardTitle}>最近の取引</Text>
            <TouchableOpacity
              onPress={() => router.push("/history")}
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllButtonText}>すべて見る →</Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.length > 0 ? (
            <View style={styles.transactionList}>
              {recentTransactions.map(renderTransactionItem)}
            </View>
          ) : (
            <Text style={styles.emptyText}>取引履歴がありません</Text>
          )}
        </Card>
      </ScrollView>

      {/* フローティングアクションボタン */}
      <FAB onIncomePress={handleAddIncome} onExpensePress={handleAddExpense} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.md,
    paddingTop: theme.spacing.lg,
  },
  headerTitle: {
    ...theme.typography.h1,
    color: theme.colors.text,
    textAlign: "center",
  },
  balanceCard: {
    margin: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  cardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceItem: {
    flex: 1,
    alignItems: "center",
  },
  balanceLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  balanceAmount: {
    ...theme.typography.h3,
    fontWeight: "bold",
  },
  incomeAmount: {
    color: theme.colors.income,
  },
  expenseAmount: {
    color: theme.colors.expense,
  },
  historyCard: {
    margin: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  viewAllButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  viewAllButtonText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  transactionList: {
    gap: theme.spacing.sm,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionCategory: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: "600",
  },
  transactionDate: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
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
  emptyText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: "center",
    paddingVertical: theme.spacing.lg,
  },
});
