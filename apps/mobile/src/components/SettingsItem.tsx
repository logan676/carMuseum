import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export const SettingsItem = ({ icon, title, subtitle, onPress }: SettingsItemProps) => {
  const { colors, spacing, radii } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.elevated,
          padding: spacing.md,
          borderRadius: radii.md,
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
          <Ionicons name={icon as any} size={20} color={colors.accent} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
          ) : null}
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
  },
});
