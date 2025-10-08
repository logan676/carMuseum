import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onPressAction?: () => void;
}

export const SectionHeader = ({ title, actionLabel, onPressAction }: SectionHeaderProps) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.sm }]}>
      <Text style={[styles.title, { color: colors.text, ...typography.subtitle }]}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onPressAction} hitSlop={8}>
          <Text style={[styles.action, { color: colors.accent }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    letterSpacing: 0.2,
  },
  action: {
    fontSize: 13,
    fontWeight: '600',
  },
});
