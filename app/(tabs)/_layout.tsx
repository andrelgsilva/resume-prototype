import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, Text } from 'react-native-paper';

const { Navigator, Screen } = createMaterialTopTabNavigator();
const MaterialTopTabs = withLayoutContext(Navigator);

const LABELS: Record<string, string> = {
  index: 'Home',
  projetos: 'Projetos',
  experiencia: 'Experiências',
  formacao: 'Formação',
  sobre: 'Sobre',
};

export default function Layout() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <MaterialTopTabs
      tabBarPosition="bottom"
      screenOptions={({ route }: any) => ({
        swipeEnabled: true,
        tabBarStyle: {
          paddingBottom: insets.bottom,
          backgroundColor: theme.colors.surface,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary,
          top: 0,
        },
        tabBarLabel: ({ color }: any) => (
          <Text style={{ color, fontSize: 11 }}>
            {LABELS[route.name] ?? route.name}
          </Text>
        ),
      })}
    >
      <Screen name="index" />
      <Screen name="formacao" />
      <Screen name="projetos" />
      <Screen name="experiencia" />
      <Screen name="sobre" />
    </MaterialTopTabs>
  );
}