export const colors = {
  background: '#060C1B',
  surface: '#0F172A',
  elevated: '#121D33',
  primary: '#2F80ED',
  primaryMuted: '#1D4ED8',
  text: '#F1F5FF',
  textSecondary: '#9BA5C0',
  border: '#1D2945',
  accent: '#38BDF8',
  success: '#34D399',
  warning: '#F59E0B',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radii = {
  sm: 12,
  md: 16,
  lg: 24,
  pill: 999,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: '600' as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
};

export const theme = {
  colors,
  spacing,
  radii,
  typography,
};

export type Theme = typeof theme;
