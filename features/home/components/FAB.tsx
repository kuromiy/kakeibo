import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FABProps {
  onIncomePress: () => void;
  onExpensePress: () => void;
  style?: ViewStyle;
  className?: string;
}

export const FAB: React.FC<FABProps> = ({
  onIncomePress,
  onExpensePress,
  style,
  className,
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

  // Tailwindクラス定義
  const containerClassName = [
    "absolute items-center",
    className,
  ].filter(Boolean).join(" ");

  const overlayClassName = "absolute bg-black/30";
  
  const mainFABClassName = "w-20 h-20 rounded-full bg-primary justify-center items-center shadow-md";
  
  const mainFABTextClassName = "text-3xl font-bold text-background";
  
  const subFABClassName = "absolute items-center bottom-0";
  
  const subButtonClassName = "w-14 h-14 rounded-full justify-center items-center shadow-sm mb-4";
  
  const incomeButtonClassName = `${subButtonClassName} bg-income`;
  const expenseButtonClassName = `${subButtonClassName} bg-expense`;
  
  const subButtonTextClassName = "text-xl font-bold text-background";
  
  const subButtonLabelClassName = "text-sm text-text font-semibold bg-surface px-2 py-1 rounded shadow-sm";

  return (
    <View 
      className={containerClassName}
      style={[{ bottom: 24 + insets.bottom, right: 24 }, style]}
    >
      {/* 背景オーバーレイ */}
      {isOpen && (
        <TouchableOpacity
          className={overlayClassName}
          style={{
            top: -1000,
            left: -1000,
            right: -1000,
            bottom: -1000,
          }}
          onPress={toggleFAB}
          activeOpacity={1}
        />
      )}

      {/* 収入ボタン */}
      <Animated.View
        className={subFABClassName}
        style={{
          transform: [{ translateY: incomeTranslateY }],
          opacity,
        }}
      >
        <TouchableOpacity
          className={incomeButtonClassName}
          onPress={handleIncomePress}
          activeOpacity={0.8}
        >
          <Text className={subButtonTextClassName}>+</Text>
        </TouchableOpacity>
        <Text className={subButtonLabelClassName}>収入</Text>
      </Animated.View>

      {/* 支出ボタン */}
      <Animated.View
        className={subFABClassName}
        style={{
          transform: [{ translateY: expenseTranslateY }],
          opacity,
        }}
      >
        <TouchableOpacity
          className={expenseButtonClassName}
          onPress={handleExpensePress}
          activeOpacity={0.8}
        >
          <Text className={subButtonTextClassName}>-</Text>
        </TouchableOpacity>
        <Text className={subButtonLabelClassName}>支出</Text>
      </Animated.View>

      {/* メインFABボタン */}
      <TouchableOpacity
        className={mainFABClassName}
        onPress={toggleFAB}
        activeOpacity={0.8}
      >
        <Animated.Text
          className={mainFABTextClassName}
          style={{ transform: [{ rotate: rotation }] }}
        >
          +
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};
