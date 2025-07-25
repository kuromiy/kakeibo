import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Card } from "../shared/components/Card";
import { Button } from "../shared/components/Button";
import { AmountInput } from "../features/transaction/components/AmountInput";
import { Calendar } from "../features/calendar/components/Calendar";
import { theme } from "../shared/styles/theme";
import {
  mockCategories,
  Category,
  addTransaction,
} from "../shared/constants/mockData";
import { useTransactionValidation } from "../features/transaction/hooks/useTransactionValidation";

type TransactionType = "income" | "expense";

export default function AddTransactionScreen() {
  const { type } = useLocalSearchParams();
  const initialType =
    type === "income" || type === "expense" ? type : "expense";
  const [transactionType, setTransactionType] =
    useState<TransactionType>(initialType);
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [memo, setMemo] = useState("");

  // バリデーション
  const {
    errors,
    validateFieldAndUpdate,
    validateAll,
    isValid: isFormValid,
  } = useTransactionValidation();

  const filteredCategories = mockCategories.filter(
    (category) => category.type === transactionType,
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleAmountChange = (newAmount: string) => {
    setAmount(newAmount);
    validateFieldAndUpdate("amount", newAmount);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    validateFieldAndUpdate("category", category.id);
  };

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowDatePicker(false);
    validateFieldAndUpdate("date", selectedDate);
  };

  const handleMemoChange = (newMemo: string) => {
    setMemo(newMemo);
    validateFieldAndUpdate("memo", newMemo);
  };

  const handleSave = async () => {
    const formData = {
      amount,
      categoryId: selectedCategory?.id || "",
      date,
      memo,
    };

    const { isValid: validationPassed } = validateAll(formData);

    if (!validationPassed) {
      // バリデーションエラーがある場合は保存しない
      return;
    }

    try {
      // データ保存処理
      const transactionData = {
        amount: parseInt(amount),
        type: transactionType,
        category: selectedCategory?.name || "",
        date: date.toISOString().split("T")[0],
        memo: memo.trim() || undefined,
      };

      // トランザクションを追加
      addTransaction(transactionData);

      // 成功通知
      Alert.alert("保存完了", "取引を保存しました", [
        {
          text: "OK",
          onPress: () => {
            // フォームをリセット
            resetForm();
            // ホーム画面に戻る
            router.back();
          },
        },
      ]);
    } catch (error) {
      // エラーハンドリング
      Alert.alert(
        "エラー",
        "取引の保存に失敗しました。もう一度お試しください。",
        [{ text: "OK" }],
      );
      console.error("Transaction save error:", error);
    }
  };

  // フォームリセット関数
  const resetForm = () => {
    setAmount("");
    setSelectedCategory(null);
    setDate(new Date());
    setMemo("");
    // バリデーションエラーもクリア
    // エラーは自動的にクリアされるため、明示的な処理は不要
  };

  // フォームの有効性をチェック
  const isFormValidState =
    selectedCategory &&
    isFormValid({
      amount,
      categoryId: selectedCategory.id,
      date,
      memo,
    });

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <Pressable
          onPress={handleCancel}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.headerButtonPressed,
          ]}
        >
          <Text style={styles.cancelButton}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>新規追加</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* 収入/支出切り替え */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>取引タイプ</Text>
          <View style={styles.typeToggle}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === "expense" && styles.typeButtonActive,
                {
                  backgroundColor:
                    transactionType === "expense"
                      ? theme.colors.expense
                      : theme.colors.surface,
                },
              ]}
              onPress={() => setTransactionType("expense")}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "expense" && styles.typeButtonTextActive,
                ]}
              >
                支出
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === "income" && styles.typeButtonActive,
                {
                  backgroundColor:
                    transactionType === "income"
                      ? theme.colors.income
                      : theme.colors.surface,
                },
              ]}
              onPress={() => setTransactionType("income")}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "income" && styles.typeButtonTextActive,
                ]}
              >
                収入
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* 金額入力 */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>金額</Text>
          <AmountInput
            value={amount}
            onChangeAmount={handleAmountChange}
            placeholder="0"
            error={errors.amount}
          />
        </Card>

        {/* カテゴリ選択 */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>カテゴリ</Text>
          <View style={styles.categoriesGrid}>
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory?.id === category.id &&
                    styles.categoryItemSelected,
                  errors.category &&
                    !selectedCategory &&
                    styles.categoryItemError,
                ]}
                onPress={() => handleCategoryChange(category)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </Card>

        {/* 日付選択 */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>日付</Text>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{formatDate(date)}</Text>
          </TouchableOpacity>
        </Card>

        {/* 日付選択モーダル */}
        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDatePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.datePickerButton}>キャンセル</Text>
                </TouchableOpacity>
                <Text style={styles.datePickerTitle}>日付を選択</Text>
                <View style={styles.datePickerHeaderSpacer} />
              </View>
              <Calendar
                selectedDate={date}
                onDateSelect={handleDateChange}
                style={styles.calendarContainer}
              />
            </View>
          </View>
        </Modal>

        {/* メモ入力 */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>メモ（任意）</Text>
          <TextInput
            style={[styles.memoInput, errors.memo && styles.memoInputError]}
            value={memo}
            onChangeText={handleMemoChange}
            placeholder="メモを入力してください"
            placeholderTextColor={theme.colors.textSecondary}
            multiline={true}
            numberOfLines={3}
            maxLength={200}
            textAlignVertical="top"
          />
          <View style={styles.memoFooter}>
            <Text style={styles.memoCharCount}>{memo.length}/200</Text>
          </View>
          {errors.memo && <Text style={styles.errorText}>{errors.memo}</Text>}
        </Card>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title="保存"
          onPress={handleSave}
          variant={transactionType === "income" ? "income" : "expense"}
          size="lg"
          style={styles.saveButtonFull}
          disabled={!isFormValidState}
        />
      </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    minWidth: 60,
    alignItems: "center",
  },
  headerButtonPressed: {
    opacity: 0.7,
    backgroundColor: theme.colors.surface,
  },
  cancelButton: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontSize: 20,
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
  card: {
    margin: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  typeToggle: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.xs,
  },
  typeButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: "center",
  },
  typeButtonActive: {},
  typeButtonText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  typeButtonTextActive: {
    color: theme.colors.background,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.spacing.sm,
  },
  categoryItem: {
    width: "30%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: "transparent",
  },
  categoryItemSelected: {
    borderColor: theme.colors.primary,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  categoryName: {
    ...theme.typography.caption,
    color: theme.colors.text,
    textAlign: "center",
  },
  dateSelector: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
  },
  dateText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontSize: 18,
  },
  memoInput: {
    ...theme.typography.body,
    color: theme.colors.text,
    minHeight: 80,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    textAlignVertical: "top",
  },
  memoInputError: {
    borderColor: theme.colors.error,
  },
  memoFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: theme.spacing.xs,
  },
  memoCharCount: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  categoryItemError: {
    borderColor: theme.colors.error,
    borderWidth: 2,
  },
  errorText: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  buttonContainer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  saveButtonFull: {
    width: "100%",
  },
  // 日付選択モーダルのスタイル
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  datePickerContainer: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
    paddingBottom: 40,
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  datePickerButton: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  datePickerConfirm: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  datePickerTitle: {
    ...theme.typography.h3,
    color: theme.colors.text,
  },
  datePickerHeaderSpacer: {
    width: 60, // キャンセルボタンと同じ幅でバランスを取る
  },
  calendarContainer: {
    margin: theme.spacing.md,
  },
});
