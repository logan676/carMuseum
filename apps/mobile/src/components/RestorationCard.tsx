import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { RestorationProject } from '@/data/mockData';

interface RestorationCardProps {
  project: RestorationProject;
}

export const RestorationCard = ({ project }: RestorationCardProps) => {
  const { colors, radii, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.elevated,
          borderRadius: radii.md,
          padding: spacing.md,
        },
      ]}
    >
      <View style={styles.row}>
        <Image source={{ uri: project.image }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: colors.text }]}>{project.title}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
            {project.description}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Text style={[styles.link, { color: colors.accent }]}>Full Guide</Text>
        <View style={styles.divider} />
        <Text style={[styles.link, { color: colors.accent }]}>Gallery</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});
