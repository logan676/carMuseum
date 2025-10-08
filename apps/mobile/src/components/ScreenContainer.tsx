import { PropsWithChildren } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';

type ScreenContainerProps = PropsWithChildren<
  SafeAreaViewProps & {
    noPadding?: boolean;
  }
>;

export const ScreenContainer = ({ children, style, noPadding, ...rest }: ScreenContainerProps) => {
  const { colors, spacing } = useTheme();

  const edges = noPadding ? (['top', 'left', 'right'] as const) : (['top', 'right', 'bottom', 'left'] as const);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />
      <SafeAreaView
        edges={edges}
        style={[
          styles.container,
          { paddingHorizontal: noPadding ? 0 : spacing.md },
          style,
        ]}
        {...rest}
      >
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
