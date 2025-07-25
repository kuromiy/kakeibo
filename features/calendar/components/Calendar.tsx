import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { theme } from "../../../shared/styles/theme";
import { useCalendar, CalendarDay } from "../hooks/useCalendar";

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  style?: ViewStyle;
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  style,
}) => {
  const {
    calendarDays,
    weekDays,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    getMonthName,
  } = useCalendar(selectedDate);

  const handleDatePress = (day: CalendarDay) => {
    selectDate(day.date);
    onDateSelect(day.date);
  };

  const renderDay = (day: CalendarDay, index: number) => {
    const dayStyle = [
      styles.dayCell,
      !day.isCurrentMonth && styles.dayOutsideMonth,
      day.isToday && styles.dayToday,
      day.isSelected && styles.daySelected,
    ];

    const textStyle = [
      styles.dayText,
      !day.isCurrentMonth && styles.dayTextOutsideMonth,
      day.isToday && styles.dayTextToday,
      day.isSelected && styles.dayTextSelected,
    ];

    return (
      <TouchableOpacity
        key={index}
        style={dayStyle}
        onPress={() => handleDatePress(day)}
        activeOpacity={0.7}
      >
        <Text style={textStyle}>{day.day}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {/* ヘッダー（月名と前/次ボタン） */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={goToPrevMonth}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>←</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.monthButton}
          onPress={goToToday}
          activeOpacity={0.7}
        >
          <Text style={styles.monthText}>{getMonthName()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={goToNextMonth}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* 曜日ヘッダー */}
      <View style={styles.weekDaysHeader}>
        {weekDays.map((weekDay, index) => (
          <View key={index} style={styles.weekDayCell}>
            <Text
              style={[
                styles.weekDayText,
                index === 0 && styles.weekDaySunday, // 日曜日
                index === 6 && styles.weekDaySaturday, // 土曜日
              ]}
            >
              {weekDay}
            </Text>
          </View>
        ))}
      </View>

      {/* カレンダーグリッド */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => renderDay(day, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontSize: 18,
  },
  monthButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  monthText: {
    ...theme.typography.h3,
    color: theme.colors.text,
    fontWeight: "bold",
  },
  weekDaysHeader: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  weekDayCell: {
    flex: 1,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  weekDayText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontWeight: "600",
  },
  weekDaySunday: {
    color: "#FF6B6B", // 日曜日は赤色
  },
  weekDaySaturday: {
    color: "#4DABF7", // 土曜日は青色
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    width: "14.28%", // 7分の1
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borderRadius.sm,
  },
  dayOutsideMonth: {
    opacity: 0.3,
  },
  dayToday: {
    backgroundColor: theme.colors.primary,
  },
  daySelected: {
    backgroundColor: theme.colors.income,
  },
  dayText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontSize: 16,
  },
  dayTextOutsideMonth: {
    color: theme.colors.textSecondary,
  },
  dayTextToday: {
    color: theme.colors.background,
    fontWeight: "bold",
  },
  dayTextSelected: {
    color: theme.colors.background,
    fontWeight: "bold",
  },
});
