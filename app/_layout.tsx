import { Slot } from 'expo-router';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { ThemeProvider, useThemeContext } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function InnerLayout() {
  const { dark } = useThemeContext();

  const theme = dark ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      {/* Status bar combinando com o tema */}
      <StatusBar style={dark ? 'light' : 'dark'} />

      <Slot />
    </PaperProvider>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <InnerLayout />
    </ThemeProvider>
  );
}