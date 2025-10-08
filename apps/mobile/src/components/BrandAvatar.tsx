import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Brand } from '@/data/mockData';

interface BrandAvatarProps {
  brand: Brand;
}

export const BrandAvatar = ({ brand }: BrandAvatarProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.surface }]}>
      <Image source={{ uri: brand.image }} style={styles.image} />
      <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>
        {brand.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 72,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    textAlign: 'center',
  },
});
