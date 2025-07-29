import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import type { Category } from "../../database/schema";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategorySelect: (category: Category) => void;
  style?: ViewStyle;
  numColumns?: number;
  className?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  style,
  numColumns = 3,
  className,
}) => {
  const renderCategoryItem = (category: Category) => {
    const isSelected = selectedCategory?.id === category.id;

    // カテゴリアイテムのクラス
    const categoryItemClassName = [
      "items-center justify-center py-4 px-2 rounded-md border-2 min-h-20",
      isSelected 
        ? "border-primary bg-background" 
        : "border-transparent bg-surface",
    ].join(" ");

    // アイコンコンテナのクラス
    const iconContainerClassName = "w-10 h-10 rounded-full items-center justify-center mb-1";

    // カテゴリ名のクラス
    const categoryNameClassName = [
      "text-sm text-center font-medium",
      isSelected ? "text-primary" : "text-text",
    ].join(" ");

    return (
      <TouchableOpacity
        key={category.id}
        className={categoryItemClassName}
        style={{ width: `${100 / numColumns - 2}%` }}
        onPress={() => onCategorySelect(category)}
        activeOpacity={0.7}
      >
        <View
          className={iconContainerClassName}
          style={{
            backgroundColor: isSelected
              ? category.color
              : "#0A0A0A", // theme.colors.background
          }}
        >
          <Text style={{ fontSize: 20 }}>{category.icon}</Text>
        </View>
        <Text className={categoryNameClassName}>
          {category.name}
        </Text>
      </TouchableOpacity>
    );
  };

  // コンテナクラス
  const containerClassName = [
    "w-full",
    className,
  ].filter(Boolean).join(" ");

  // グリッドクラス
  const categoriesGridClassName = "flex-row flex-wrap justify-between gap-2";

  return (
    <View className={containerClassName} style={style}>
      <View className={categoriesGridClassName}>
        {categories.map(renderCategoryItem)}
      </View>
    </View>
  );
};
