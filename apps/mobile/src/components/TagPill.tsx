import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface TagPillProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const TagPill = ({ label, active, onPress }: TagPillProps) => {
  const { colors, spacing } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: active ? colors.primary : colors.elevated,
          borderColor: active ? colors.primary : colors.border,
          paddingHorizontal: spacing.md,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Text style={[styles.label, { color: active ? colors.text : colors.textSecondary }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
});
