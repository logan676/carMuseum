import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { GarageVehicle } from '@/data/mockData';

interface VehicleCardProps {
  vehicle: GarageVehicle;
  onPress?: () => void;
}

export const VehicleCard = ({ vehicle, onPress }: VehicleCardProps) => {
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
          opacity: pressed ? 0.9 : 1,
        },
      ]}
    >
      <View style={styles.row}>
        <Image source={{ uri: vehicle.image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={[styles.name, { color: colors.text }]}>{vehicle.name}</Text>
          <Text style={[styles.year, { color: colors.textSecondary }]}>{vehicle.year}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
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
  image: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  year: {
    marginTop: 2,
    fontSize: 13,
  },
});
