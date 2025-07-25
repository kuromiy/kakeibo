import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { theme } from "../../../shared/styles/theme";
import { Category } from "../../../shared/constants/mockData";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category) => void;
  style?: ViewStyle;
  numColumns?: number;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  style,
  numColumns = 3,
}) => {
  const renderCategoryItem = (category: Category) => {
    const isSelected = selectedCategory?.id === category.id;

    return (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoryItem,
          { width: `${100 / numColumns - 2}%` },
          isSelected && styles.categoryItemSelected,
        ]}
        onPress={() => onCategorySelect(category)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: isSelected
                ? category.color
                : theme.colors.background,
            },
          ]}
        >
          <Text style={styles.categoryIcon}>{category.icon}</Text>
        </View>
        <Text
          style={[
            styles.categoryName,
            isSelected && { color: theme.colors.primary },
          ]}
        >
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.categoriesGrid}>
        {categories.map(renderCategoryItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: theme.spacing.sm,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: "transparent",
    minHeight: 80,
  },
  categoryItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.background,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xs,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    ...theme.typography.caption,
    color: theme.colors.text,
    textAlign: "center",
    fontWeight: "500",
  },
});
