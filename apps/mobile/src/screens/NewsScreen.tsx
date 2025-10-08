import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/ScreenContainer';
import { TagPill } from '@/components/TagPill';
import { NewsCard } from '@/components/NewsCard';
import { newsArticles, newsCategories, NewsCategory } from '@/data/mockData';
import { useTheme } from '@/hooks/useTheme';

export const NewsScreen = () => {
  const { colors, spacing } = useTheme();
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('All');

  const articles =
    activeCategory === 'All'
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeCategory);

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
              onPress={() => setActiveCategory(category)}
            />
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md, paddingBottom: spacing.xl }}>
          {articles.map((article) => (
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
