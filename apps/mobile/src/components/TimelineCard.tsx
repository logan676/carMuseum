import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { TimelineEntry } from '@/data/mockData';

interface TimelineCardProps {
  entry: TimelineEntry;
}

export const TimelineCard = ({ entry }: TimelineCardProps) => {
  const { colors, radii, spacing } = useTheme();

  return (
    <ImageBackground
      source={{ uri: entry.image }}
      style={styles.image}
      imageStyle={{ borderRadius: radii.lg }}
    >
      <LinearGradient
        colors={['rgba(6,12,27,0.1)', 'rgba(6,12,27,0.85)']}
        style={[styles.overlay, { borderRadius: radii.lg, padding: spacing.md }]}
      >
        <Text style={[styles.period, { color: colors.text }]}>{entry.period}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{entry.title}</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {entry.description}
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 180,
    justifyContent: 'flex-end',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  period: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
  },
});
