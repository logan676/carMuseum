import { Ionicons } from '@expo/vector-icons';
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { QuickLink } from '@/data/mockData';

interface QuickLinkCardProps {
  link: QuickLink;
  onPress?: (event: GestureResponderEvent) => void;
}

export const QuickLinkCard = ({ link, onPress }: QuickLinkCardProps) => {
  const { colors, radii, spacing } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.elevated,
          borderRadius: radii.md,
          padding: spacing.md,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
        <Ionicons name={link.icon as any} size={20} color={colors.accent} />
      </View>
      <Text style={[styles.label, { color: colors.text }]}>{link.label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 16,
    gap: 16,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
