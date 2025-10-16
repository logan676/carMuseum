import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ScreenContainer';
import { TagPill } from '@/components/TagPill';
import { NewsCard } from '@/components/NewsCard';
import { NewsCategory } from '@/data/mockData';
import { useNews } from '@/hooks/useApiData';
import { useTheme } from '@/hooks/useTheme';

export const NewsScreen = () => {
  const { colors, spacing } = useTheme();
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');

  // Fetch news from API
  const { data, loading, error } = useNews(activeCategory);

  const articles = data?.data || [];
  const newsCategories = data?.availableCategories || ['All'];

  return (
    <ScreenContainer>
      <View style={{ flex: 1 }}>
        <View style={[styles.header, { marginBottom: spacing.lg }]}>
          <Ionicons name="menu" size={24} color={colors.textSecondary} />
          <Text style={[styles.title, { color: colors.text }]}>News</Text>
          <Ionicons name="search" size={22} color={colors.textSecondary} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.sm }}
          style={{ marginBottom: spacing.md }}
        >
          {newsCategories.map((category) => (
            <TagPill
              key={category}
              label={category}
              active={category === activeCategory}
              onPress={() => setActiveCategory(category as NewsCategory)}
            />
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}>
          {loading && (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={{ color: colors.textSecondary, marginTop: spacing.md }}>
                Loading news...
              </Text>
            </View>
          )}

          {error && (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Ionicons name="alert-circle-outline" size={48} color={colors.error || '#ff4444'} />
              <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
                Failed to load news. Please try again.
              </Text>
            </View>
          )}

          {!loading && !error && articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </ScrollView>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
});
