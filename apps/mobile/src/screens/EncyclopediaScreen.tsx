import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { TimelineCard } from '@/components/TimelineCard';
import { RestorationCard } from '@/components/RestorationCard';
import { BrandAvatar } from '@/components/BrandAvatar';
import { ModelCard } from '@/components/ModelCard';
import { useModels, useBrands, useProjects } from '@/hooks/useApiData';
import { useTheme } from '@/hooks/useTheme';

export const EncyclopediaScreen = () => {
  const { colors, spacing } = useTheme();
  const [search, setSearch] = useState('');

  // Fetch data from API
  const { data: modelsData, loading: modelsLoading } = useModels();
  const { data: brandsData, loading: brandsLoading } = useBrands();
  const { data: projectsData, loading: projectsLoading } = useProjects();

  const encyclopediaModels = modelsData?.encyclopedia || [];
  const brands = brandsData?.data || [];
  const restorationProjects = projectsData?.data || [];
  const timelineEntries = projectsData?.timeline || [];

  const filteredModels = useMemo(() => {
    if (!search) {
      return encyclopediaModels;
    }
    return encyclopediaModels.filter((model: any) =>
      `${model.name} ${model.description}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, encyclopediaModels]);

  const isLoading = modelsLoading || brandsLoading || projectsLoading;

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl }}>
        <View style={{ gap: spacing.lg }}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Encyclopedia</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Discover timelines, restoration guides, and iconic models.
            </Text>
          </View>

          <SearchBar
            value={search}
            placeholder="Search brands or models"
            onChangeText={setSearch}
          />

          {isLoading && (
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <ActivityIndicator size="large" color={colors.accent} />
              <Text style={{ color: colors.textSecondary, marginTop: spacing.md }}>
                Loading encyclopedia...
              </Text>
            </View>
          )}

          {!isLoading && (
            <>

          <View>
            <SectionHeader title="Timeline" actionLabel="View all" />
            <View style={{ marginTop: spacing.sm }}>
              {timelineEntries.map((entry) => (
                <TimelineCard key={entry.id} entry={entry} />
              ))}
            </View>
          </View>

          <View>
            <SectionHeader title="Restoration Projects" actionLabel="View all" />
            <View style={{ marginTop: spacing.md, gap: spacing.md }}>
              {restorationProjects.map((project) => (
                <RestorationCard key={project.id} project={project} />
              ))}
            </View>
          </View>

          <View>
            <SectionHeader title="Brands" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.md }}>
              {brands.map((brand) => (
                <BrandAvatar key={brand.id} brand={brand} />
              ))}
            </ScrollView>
          </View>

          <View>
            <SectionHeader title="Models" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.md }}>
              {filteredModels.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </ScrollView>
            {filteredModels.length === 0 ? (
              <Text style={[styles.empty, { color: colors.textSecondary }]}>
                No models match “{search}”.
              </Text>
            ) : null}
          </View>
            </>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  empty: {
    marginTop: 16,
    fontSize: 13,
  },
});
