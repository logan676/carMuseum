import { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScreenContainer } from "@/components/ScreenContainer";
import { SearchBar } from "@/components/SearchBar";
import { MapComponent } from "@/components/MapComponent";
import { useDealerships } from "@/hooks/useApiData";
import { useTheme } from "@/hooks/useTheme";

export const MapScreen = () => {
  const { colors, spacing, radii } = useTheme();
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  // Fetch dealerships from API
  const { data, loading } = useDealerships();
  const dealerships = data?.data || [];

  const region = useMemo(
    () => ({
      latitude: 37.78,
      longitude: -122.43,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05,
    }),
    []
  );

  const primaryDealership = dealerships[0];

  if (loading) {
    return (
      <ScreenContainer>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={{ color: colors.textSecondary, marginTop: spacing.md }}>
            Loading dealerships...
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer noPadding>
      <View style={{ flex: 1 }}>
        <MapComponent
          dealerships={dealerships}
          colors={colors}
          spacing={spacing}
          region={region}
        />

        <View style={[styles.header, { paddingTop: spacing.lg }]}>
          <View
            style={[
              styles.headerBar,
              { backgroundColor: colors.background, borderRadius: radii.md },
            ]}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={colors.text}
              onPress={() => navigation.goBack()}
            />
            <Text style={[styles.headerTitle, { color: colors.text }]}>
              Find Dealerships
            </Text>
            <View style={{ width: 22 }} />
          </View>
          <View style={{ marginTop: spacing.sm }}>
            <SearchBar
              value={query}
              placeholder="Search for a dealership"
              onChangeText={setQuery}
            />
          </View>
        </View>

        <View
          style={[
            styles.bottomCard,
            { backgroundColor: colors.background, padding: spacing.md },
          ]}
        >
          <Text style={[styles.bottomTitle, { color: colors.text }]}>
            {primaryDealership.name}
          </Text>
          <Text
            style={[styles.bottomSubtitle, { color: colors.textSecondary }]}
          >
            {primaryDealership.address}
          </Text>
          <View style={styles.bottomActions}>
            <View
              style={[
                styles.actionIcon,
                { backgroundColor: colors.primaryMuted },
              ]}
            >
              <Ionicons name="navigate" size={18} color={colors.text} />
            </View>
            <Text style={[styles.actionLabel, { color: colors.text }]}>
              Directions
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  headerBar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  bottomCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  bottomSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  bottomActions: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
