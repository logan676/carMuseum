import { Platform, StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Dealership } from "@/data/mockData";

interface MapComponentProps {
  dealerships: Dealership[];
  colors: any;
  spacing: any;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

export const MapComponent = ({
  dealerships,
  colors,
  spacing,
  region,
}: MapComponentProps) => {
  if (Platform.OS === "web") {
    // Web version: Show list of dealerships
    return (
      <ScrollView
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}
      >
        <View style={{ padding: spacing.lg, paddingTop: 100 }}>
          <Text
            style={[
              styles.webTitle,
              { color: colors.text, marginBottom: spacing.lg },
            ]}
          >
            Find Dealerships
          </Text>
          {dealerships.map((dealer: Dealership) => (
            <View
              key={dealer.id}
              style={[
                styles.dealerCard,
                {
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  marginBottom: spacing.md,
                },
              ]}
            >
              <Text style={[styles.dealerName, { color: colors.text }]}>
                {dealer.name}
              </Text>
              <Text
                style={[styles.dealerAddress, { color: colors.textSecondary }]}
              >
                {dealer.address}
              </Text>
              <View style={styles.dealerActions}>
                <View
                  style={[
                    styles.actionIcon,
                    { backgroundColor: colors.primaryMuted },
                  ]}
                >
                  <Ionicons name="navigate" size={18} color={colors.text} />
                </View>
                <Text style={[styles.actionLabel, { color: colors.text }]}>
                  Get Directions
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }

  // Native version: Import and use MapView dynamically
  try {
    const MapView = require("react-native-maps").default;
    const Marker = require("react-native-maps").Marker;

    return (
      <MapView style={StyleSheet.absoluteFill} initialRegion={region}>
        {dealerships.map((dealer: Dealership) => (
          <Marker
            key={dealer.id}
            coordinate={{
              latitude: dealer.latitude,
              longitude: dealer.longitude,
            }}
            title={dealer.name}
            description={dealer.address}
          />
        ))}
      </MapView>
    );
  } catch (error) {
    // Fallback if react-native-maps is not available
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colors.surface,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: colors.text }}>
          Map not available on this platform
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  webTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  dealerCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  dealerName: {
    fontSize: 18,
    fontWeight: "600",
  },
  dealerAddress: {
    fontSize: 14,
    marginTop: 4,
  },
  dealerActions: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
});
