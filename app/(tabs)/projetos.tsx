import { ScrollView, View } from 'react-native';
import { Text, Card, Chip, useTheme, ActivityIndicator } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SectionTitle } from '../../components/SectionTitle';
import { getProjetos } from '../../services/api';
import { useEffect, useState } from 'react';

function withOpacity(color: string, opacity: number): string {
  let hex = color.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default function Projetos() {
  const theme = useTheme();
  const router = useRouter();
  const accent = theme.colors.primary;
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjetos()
      .then(setProjetos)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
    >
      <SectionTitle title="Projetos" />

      {projetos.map((projeto) => (
        <Card
          key={projeto.id}
          style={{ marginBottom: 12 }}
          onPress={() =>
            router.push({ pathname: '/projeto/[id]', params: { id: projeto.id } })
          }
        >
          <Card.Content style={{ paddingVertical: 14 }}>
            <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>
              {projeto.nome}
            </Text>
            <Text style={{
              color: theme.colors.onSurfaceVariant,
              fontSize: 13,
              marginTop: 4,
              marginBottom: 10,
              lineHeight: 19,
            }}>
              {projeto.descricao}
            </Text>
            <Text style={{ color: accent, fontSize: 12, marginTop: 4 }}>
              Ver detalhes
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}