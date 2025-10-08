import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SettingsItem } from '@/components/SettingsItem';
import { useTheme } from '@/hooks/useTheme';

export const SettingsScreen = () => {
  const { colors, spacing } = useTheme();

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xl, gap: spacing.lg }}>
        <View>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Manage your account, preferences, and support.
          </Text>
        </View>

        <View>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Account</Text>
          <View style={{ marginTop: spacing.md }}>
            <SettingsItem icon="person-circle-outline" title="Profile" subtitle="Edit your profile information" />
            <SettingsItem icon="star-outline" title="Subscription" subtitle="Manage your subscription" />
          </View>
        </View>

        <View>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Preferences</Text>
          <View style={{ marginTop: spacing.md }}>
            <SettingsItem icon="notifications-outline" title="Notifications" subtitle="Customize your notifications" />
            <SettingsItem icon="options-outline" title="App Configuration" subtitle="Adjust app settings" />
          </View>
        </View>

        <View>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Support</Text>
          <View style={{ marginTop: spacing.md }}>
            <SettingsItem icon="help-circle-outline" title="Help Center" subtitle="Get help and support" />
            <SettingsItem icon="mail-outline" title="Contact Us" subtitle="Reach out for assistance" />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  sectionLabel: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
