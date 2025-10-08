import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
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

export const MapComponent = ({ dealerships, region }: MapComponentProps) => {
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
};
