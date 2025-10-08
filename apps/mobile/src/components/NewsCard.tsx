import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { NewsArticle } from '@/data/mockData';

interface NewsCardProps {
  article: NewsArticle;
  compact?: boolean;
}

export const NewsCard = ({ article, compact }: NewsCardProps) => {
  const { colors, spacing, radii } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.elevated,
          padding: compact ? spacing.sm : spacing.md,
          borderRadius: radii.md,
        },
      ]}
    >
      <View style={[styles.row, { gap: spacing.md }]}>
        <Image source={{ uri: article.image }} style={[styles.image, compact && styles.imageCompact]} />
        <View style={{ flex: 1, gap: spacing.xs }}>
          <Text style={[styles.category, { color: colors.accent }]}>{article.category}</Text>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={compact ? 2 : 3}>
            {article.title}
          </Text>
          <Text style={[styles.summary, { color: colors.textSecondary }]} numberOfLines={compact ? 2 : 3}>
            {article.summary}
          </Text>
          <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{article.publishedAt}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 18,
  },
  imageCompact: {
    width: 72,
    height: 72,
  },
  category: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  summary: {
    fontSize: 13,
    lineHeight: 18,
  },
  timestamp: {
    marginTop: 4,
    fontSize: 12,
  },
});
