import { ActivityIndicator, ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ScreenContainer';
import { VehicleCard } from '@/components/VehicleCard';
import { useGarage } from '@/hooks/useApiData';
import { useTheme } from '@/hooks/useTheme';

export const MyGarageScreen = () => {
  const { colors, spacing, radii } = useTheme();

  // Fetch garage data from API
  const { data, loading } = useGarage();
  const garageVehicles = data?.vehicles || [];

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1617815896214-3be0b5a69344?auto=format&fit=crop&w=400&q=80',
            }}
            style={{ width: 120, height: 120, borderRadius: 60, marginBottom: spacing.md }}
          />
          <Text style={[styles.title, { color: colors.text }]}>My Garage</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Track your vehicles</Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: colors.primary,
              borderRadius: radii.md,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Ionicons name="add" size={20} color={colors.text} />
          <Text style={[styles.buttonLabel, { color: colors.text }]}>Add Vehicle</Text>
        </Pressable>

        <View style={{ marginTop: spacing.lg }}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>My Vehicles</Text>
          {loading && (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <ActivityIndicator size="large" color={colors.accent} />
            </View>
          )}
          {!loading && (
            <View style={{ marginTop: spacing.md }}>
              {garageVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
