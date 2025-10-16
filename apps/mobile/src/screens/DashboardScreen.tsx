import { useCallback, useMemo } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionHeader } from '@/components/SectionHeader';
import { NewsCard } from '@/components/NewsCard';
import { ModelCard } from '@/components/ModelCard';
import { QuickLinkCard } from '@/components/QuickLinkCard';
import { quickLinks } from '@/data/mockData';
import { useNews, useModels } from '@/hooks/useApiData';
import { useTheme } from '@/hooks/useTheme';
import { RootStackParamList } from '@/navigation/types';

export const DashboardScreen = () => {
  const { colors, spacing, radii, typography } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Fetch data from API
  const { data: newsData, loading: newsLoading, error: newsError } = useNews();
  const { data: modelsData, loading: modelsLoading, error: modelsError } = useModels();

  const newsArticles = newsData?.data || [];
  const featuredModels = modelsData?.featured || [];
  const popularArticle = useMemo(() => newsArticles[0], [newsArticles]);

  const handleQuickLinkPress = useCallback(
    (route: string) => {
      if (route === 'FindDealerships') {
        navigation.navigate('FindDealerships');
        return;
      }
      navigation.getParent()?.navigate(route as never);
    },
    [navigation],
  );

  const handleSettingsPress = useCallback(() => {
    navigation.getParent()?.navigate('Settings' as never);
  }, [navigation]);

  // Show loading state
  const isLoading = newsLoading || modelsLoading;
  const hasError = newsError || modelsError;

  return (
    <ScreenContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        {isLoading && (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <ActivityIndicator size="large" color={colors.accent} />
            <Text style={{ color: colors.textSecondary, marginTop: spacing.md }}>
              Loading dashboard...
            </Text>
          </View>
        )}

        {hasError && (
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <Ionicons name="alert-circle-outline" size={48} color={colors.error || '#ff4444'} />
            <Text style={{ color: colors.textSecondary, marginTop: spacing.md, textAlign: 'center' }}>
              Failed to load data. Please check your connection.
            </Text>
          </View>
        )}

        {!isLoading && !hasError && (
          <>
        <View style={[styles.headerRow, { marginBottom: spacing.lg }]}>
          <View>
            <Text style={[styles.caption, { color: colors.textSecondary }]}>Welcome to</Text>
            <Text style={[styles.title, { color: colors.text, ...typography.title }]}>Dashboard</Text>
          </View>
          <Ionicons
            name="settings-outline"
            size={22}
            color={colors.textSecondary}
            onPress={handleSettingsPress}
          />
        </View>

        <View style={{ marginBottom: spacing.lg }}>
          <SectionHeader title="Popular News" />
          <ImageBackground
            source={{ uri: popularArticle.image }}
            style={{ height: 200, marginTop: spacing.sm }}
            imageStyle={{ borderRadius: radii.lg }}
          >
            <View style={[styles.overlay, { borderRadius: radii.lg }]}>
              <Text style={[styles.overlayCategory, { color: colors.accent }]}>
                {popularArticle.category}
              </Text>
              <Text style={[styles.overlayTitle, { color: colors.text }]}>{popularArticle.title}</Text>
              <Text style={[styles.overlaySummary, { color: colors.textSecondary }]} numberOfLines={2}>
                {popularArticle.summary}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={{ marginBottom: spacing.lg }}>
          <SectionHeader title="Featured Models" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredModels.map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </ScrollView>
        </View>

        <View style={{ marginBottom: spacing.lg }}>
          <SectionHeader title="Quick Links" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickLinks.map((link) => (
              <QuickLinkCard
                key={link.id}
                link={link}
                onPress={() => handleQuickLinkPress(link.route)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ gap: spacing.md }}>
          <SectionHeader title="Latest News" actionLabel="See all" onPressAction={() => navigation.getParent()?.navigate('News' as never)} />
          {newsArticles.slice(1, 4).map((article) => (
            <NewsCard key={article.id} article={article} compact />
          ))}
        </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  caption: {
    fontSize: 13,
    marginBottom: 4,
  },
  title: {
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    backgroundColor: 'rgba(6,12,27,0.55)',
  },
  overlayCategory: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  overlaySummary: {
    fontSize: 13,
    lineHeight: 18,
  },
});
