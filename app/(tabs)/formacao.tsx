import { ScrollView, View } from 'react-native';
import { Text, Card, useTheme, ActivityIndicator } from 'react-native-paper';
import { SectionTitle } from '../../components/SectionTitle';
import { useEffect, useState } from 'react';

const BASE_URL = 'https://express-resume.vercel.app';
const USUARIO_ID = 1;

export default function Formacao() {
  const theme = useTheme();
  const accent = theme.colors.primary;
  const [formacoes, setFormacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/formacoes`)
      .then((r) => r.json())
      .then((data) => setFormacoes(data.filter((f: any) => f.usuario_id === USUARIO_ID)))
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
      <SectionTitle title="Experiência Acadêmica" />

      {formacoes.length === 0 && (
        <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 13 }}>
          Nenhuma formação cadastrada.
        </Text>
      )}

      {formacoes.map((form) => (
        <Card key={form.id} style={{ marginBottom: 12 }}>
          <Card.Content style={{ paddingVertical: 14 }}>
            <Text variant="titleSmall" style={{ fontWeight: 'bold' }}>
              {form.curso}
            </Text>
            <Text style={{ color: accent, fontSize: 13, marginTop: 2 }}>
              {form.instituicao}
            </Text>
            {form.nivel && (
              <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }}>
                {form.nivel}
              </Text>
            )}
            <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 2 }}>
              {new Date(form.data_inicio).toLocaleDateString('pt-BR')} —{' '}
              {form.data_fim ? new Date(form.data_fim).toLocaleDateString('pt-BR') : 'Em andamento'}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}