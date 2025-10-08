import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChangeText: (value: string) => void;
}

export const SearchBar = ({ value, placeholder, onChangeText }: SearchBarProps) => {
  const { colors, spacing, radii } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.elevated,
          paddingHorizontal: spacing.md,
          borderRadius: radii.md,
        },
      ]}
    >
      <Ionicons name="search" size={18} color={colors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={[styles.input, { color: colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  input: {
    flex: 1,
    height: '100%',
  },
});
