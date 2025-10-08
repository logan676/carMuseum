import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useMemo } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { EncyclopediaScreen } from '@/screens/EncyclopediaScreen';
import { NewsScreen } from '@/screens/NewsScreen';
import { MyGarageScreen } from '@/screens/MyGarageScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import { MapScreen } from '@/screens/MapScreen';
import { MainTabParamList, RootStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 70,
          paddingBottom: 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof MainTabParamList, string> = {
            Dashboard: 'home-outline',
            Encyclopedia: 'book-outline',
            News: 'newspaper-outline',
            MyGarage: 'car-sport-outline',
            Settings: 'settings-outline',
          };
          return <Ionicons name={iconMap[route.name] as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Encyclopedia" component={EncyclopediaScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="MyGarage" component={MyGarageScreen} options={{ title: 'My Garage' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const theme = useTheme();
  const navigationTheme = useMemo<NavigationTheme>(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background,
        card: theme.colors.surface,
        border: theme.colors.border,
        text: theme.colors.text,
        primary: theme.colors.primary,
      },
    }),
    [theme],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="FindDealerships" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
