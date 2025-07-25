import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../../shared/styles/theme";

interface FABProps {
  onIncomePress: () => void;
  onExpensePress: () => void;
  style?: ViewStyle;
}

export const FAB: React.FC<FABProps> = ({
  onIncomePress,
  onExpensePress,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const insets = useSafeAreaInsets();

  const toggleFAB = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();

    setIsOpen(!isOpen);
  };

  const handleIncomePress = () => {
    onIncomePress();
    toggleFAB();
  };

  const handleExpensePress = () => {
    onExpensePress();
    toggleFAB();
  };

  const incomeTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const expenseTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={[styles.container, { bottom: theme.spacing.lg + insets.bottom }, style]}>
      {/* 背景オーバーレイ */}
      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleFAB}
          activeOpacity={1}
        />
      )}

      {/* 収入ボタン */}
      <Animated.View
        style={[
          styles.subFAB,
          styles.incomeFAB,
          {
            transform: [{ translateY: incomeTranslateY }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.subButton}
          onPress={handleIncomePress}
          activeOpacity={0.8}
        >
          <Text style={styles.subButtonText}>+</Text>
        </TouchableOpacity>
        <Text style={styles.subButtonLabel}>収入</Text>
      </Animated.View>

      {/* 支出ボタン */}
      <Animated.View
        style={[
          styles.subFAB,
          styles.expenseFAB,
          {
            transform: [{ translateY: expenseTranslateY }],
            opacity,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.subButton, styles.expenseButton]}
          onPress={handleExpensePress}
          activeOpacity={0.8}
        >
          <Text style={styles.subButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.subButtonLabel}>支出</Text>
      </Animated.View>

      {/* メインFABボタン */}
      <TouchableOpacity
        style={styles.mainFAB}
        onPress={toggleFAB}
        activeOpacity={0.8}
      >
        <Animated.Text
          style={[styles.mainFABText, { transform: [{ rotate: rotation }] }]}
        >
          +
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: theme.spacing.lg,
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  mainFAB: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.md,
    elevation: 8,
  },
  mainFABText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.background,
  },
  subFAB: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  incomeFAB: {
    bottom: 0,
  },
  expenseFAB: {
    bottom: 0,
  },
  subButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.income,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.sm,
    elevation: 4,
    marginBottom: theme.spacing.md,
  },
  expenseButton: {
    backgroundColor: theme.colors.expense,
  },
  subButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.background,
  },
  subButtonLabel: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.text,
    fontWeight: "600",
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    ...theme.shadows.sm,
  },
});
