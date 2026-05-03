import { ScrollView, View } from 'react-native';
import { Text, Card, Chip, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { Platform, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://express-resume.vercel.app';

function withOpacity(color: string, opacity: number): string {
  if (color.startsWith('rgb')) {
    return color.replace(/[\d.]+\)$/, `${opacity})`).replace('rgb(', 'rgba(');
  }
  let hex = color.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default function DetalhesProjeto() {
  // const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const accent = theme.colors.primary;

  const [projeto, setProjeto] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/projetos/${id}`)
      .then((r) => r.json())
      .then(setProjeto)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!projeto || projeto.error) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Projeto não encontrado.
        </Text>
        <Button mode="text" onPress={() => router.push('/(tabs)/projetos')} style={{ marginTop: 12 }}>
          Voltar
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ 
        padding: 20, 
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 20 : 60, 
        paddingBottom: 48 
      }}
    >
      
      {/* ── TÍTULO ── */}
      <Text
        variant="headlineMedium"
        style={{ fontWeight: 'bold', marginBottom: 8, color: theme.colors.onBackground }}
      >
        {projeto.nome}
      </Text>

      {/* ── DESCRIÇÃO ── */}
      <Card style={{ marginBottom: 20 }}>
        <Card.Content>
          <Text
            variant="titleSmall"
            style={{ fontWeight: 'bold', marginBottom: 8, color: accent }}
          >
            Sobre o projeto
          </Text>
          <Text style={{ lineHeight: 24, color: theme.colors.onSurface }}>
            {projeto.descricao}
          </Text>
        </Card.Content>
      </Card>

      {/* ── BOTÕES ── */}
      <Button
        mode="outlined"
        onPress={() => router.push('/(tabs)/projetos')}
        style={{ marginTop: 8 }}
      >
        Voltar para Projetos
      </Button>
    </ScrollView>
  );
}