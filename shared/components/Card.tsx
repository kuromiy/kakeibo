import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { theme } from "../styles/theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  className?: string; // NativeWind対応
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = "md",
  className,
}) => {
  return (
    <View 
      style={[styles.card, { padding: theme.spacing[padding] }, style]}
      className={className}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
});
