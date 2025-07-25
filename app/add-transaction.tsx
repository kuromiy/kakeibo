import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Card } from "../shared/components/Card";
import { Button } from "../shared/components/Button";
import { AmountInput } from "../features/transaction/components/AmountInput";
import { Calendar } from "../features/calendar/components/Calendar";
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
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["top", "left", "right", "bottom"]}
    >
      <View className="flex-row justify-between items-center px-4 py-2 border-b border-border">
        <Pressable
          onPress={handleCancel}
          className="py-1 px-2 rounded min-w-15 items-center active:opacity-70 active:bg-surface"
        >
          <Text className="text-xl text-textSecondary">←</Text>
        </Pressable>
        <Text className="text-xl font-semibold text-text">新規追加</Text>
        <View className="min-w-15" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* 収入/支出切り替え */}
          <Card className="mx-4 mb-2">
            <Text className="text-xl font-semibold text-text mb-4">
              取引タイプ
            </Text>
            <View className="flex-row bg-background rounded-md p-1">
              <TouchableOpacity
                className="flex-1 py-2 px-4 rounded items-center"
                style={{
                  backgroundColor:
                    transactionType === "expense"
                      ? "#FFA500" // theme.colors.expense
                      : "#1A1A1A", // theme.colors.surface
                }}
                onPress={() => setTransactionType("expense")}
              >
                <Text
                  className={[
                    "text-base font-semibold",
                    transactionType === "expense"
                      ? "text-background"
                      : "text-textSecondary",
                  ].join(" ")}
                >
                  支出
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-2 px-4 rounded items-center"
                style={{
                  backgroundColor:
                    transactionType === "income"
                      ? "#FFD700" // theme.colors.income
                      : "#1A1A1A", // theme.colors.surface
                }}
                onPress={() => setTransactionType("income")}
              >
                <Text
                  className={[
                    "text-base font-semibold",
                    transactionType === "income"
                      ? "text-background"
                      : "text-textSecondary",
                  ].join(" ")}
                >
                  収入
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* 金額入力 */}
          <Card className="mx-4 mb-2">
            <Text className="text-xl font-semibold text-text mb-4">金額</Text>
            <AmountInput
              value={amount}
              onChangeAmount={handleAmountChange}
              placeholder="0"
              error={errors.amount}
            />
          </Card>

          {/* カテゴリ選択 */}
          <Card className="mx-4 mb-2">
            <Text className="text-xl font-semibold text-text mb-4">
              カテゴリ
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {filteredCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className={[
                    "items-center justify-center py-4 px-2 bg-background rounded-md border-2 min-h-20",
                    selectedCategory?.id === category.id
                      ? "border-primary"
                      : "border-transparent",
                    errors.category && !selectedCategory && "border-error",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ width: "30%" }}
                  onPress={() => handleCategoryChange(category)}
                >
                  <Text style={{ fontSize: 24, marginBottom: 4 }}>
                    {category.icon}
                  </Text>
                  <Text className="text-sm text-text text-center font-medium">
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.category && (
              <Text className="text-sm text-error mt-1">{errors.category}</Text>
            )}
          </Card>

          {/* 日付選択 */}
          <Card className="mx-4 mb-2">
            <Text className="text-xl font-semibold text-text mb-4">日付</Text>
            <TouchableOpacity
              className="py-4 px-6 bg-background rounded-md items-center"
              onPress={() => setShowDatePicker(true)}
            >
              <Text className="text-lg text-text">{formatDate(date)}</Text>
            </TouchableOpacity>
          </Card>

          {/* 日付選択モーダル */}
          <Modal
            visible={showDatePicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View className="flex-1 bg-black/50 justify-end">
              <View className="bg-surface rounded-t-lg pb-10">
                <View className="flex-row justify-between items-center px-6 py-4 border-b border-border">
                  <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                    <Text className="text-base text-textSecondary">
                      キャンセル
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-xl font-semibold text-text">
                    日付を選択
                  </Text>
                  <View style={{ width: 60 }} />
                </View>
                <Calendar
                  selectedDate={date}
                  onDateSelect={handleDateChange}
                  className="m-4"
                />
              </View>
            </View>
          </Modal>

          {/* メモ入力 */}
          <Card className="mx-4 mb-2">
            <Text className="text-xl font-semibold text-text mb-4">
              メモ（任意）
            </Text>
            <TextInput
              className={[
                "text-base text-text min-h-20 max-h-30 py-4 px-6 bg-background rounded-md border",
                errors.memo ? "border-error" : "border-border",
              ].join(" ")}
              value={memo}
              onChangeText={handleMemoChange}
              placeholder="メモを入力してください"
              placeholderTextColor="#CCCCCC" // theme.colors.textSecondary
              multiline={true}
              numberOfLines={3}
              maxLength={200}
              textAlignVertical="top"
            />
            <View className="flex-row justify-end mt-1">
              <Text className="text-sm text-textSecondary">
                {memo.length}/200
              </Text>
            </View>
            {errors.memo && (
              <Text className="text-sm text-error mt-1">{errors.memo}</Text>
            )}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <View className="p-4 border-t border-border">
        <Button
          title="保存"
          onPress={handleSave}
          variant={transactionType === "income" ? "income" : "expense"}
          size="lg"
          className="w-full"
          disabled={!isFormValidState}
        />
      </View>
    </SafeAreaView>
  );
}
