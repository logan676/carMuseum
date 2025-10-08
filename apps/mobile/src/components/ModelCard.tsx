import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { CarModel } from '@/data/mockData';

interface ModelCardProps {
  model: CarModel;
}

export const ModelCard = ({ model }: ModelCardProps) => {
  const { colors, radii, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.elevated,
          borderRadius: radii.lg,
          padding: spacing.md,
        },
      ]}
    >
      <Image source={{ uri: model.image }} style={styles.image} />
      <Text style={[styles.title, { color: colors.text }]}>{model.name}</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{model.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 18,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
  },
});
